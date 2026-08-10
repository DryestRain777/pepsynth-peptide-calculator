/* Pepsynth Labs — Peptide Calculator logic */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);

  /* ---------- AGE GATE ---------- */
  const gate = $('gate');
  if (sessionStorage.getItem('psl_gate') === '1') gate.hidden = true;
  $('gateOk').addEventListener('click', () => {
    sessionStorage.setItem('psl_gate', '1');
    gate.hidden = true;
  });

  /* ---------- ELEMENTS ---------- */
  const el = {
    pep: $('pep'), vial: $('vial'), vialOptions: $('vialOptions'),
    vialLabel: $('vialLabel'), vialUnit: $('vialUnit'),
    bacRow: $('bacRow'), syrRow: $('syrRow'), freqRow: $('freqRow'),
    bac: $('bac'), dose: $('dose'),
    doseUnit: $('doseUnit'), syr: $('syr'), freq: $('freq'),
    doseConv: $('doseConv'), blendNote: $('blendNote'),
    resInj: $('resInj'), resCap: $('resCap'),
    rUnits: $('rUnits'), rMl: $('rMl'), rConc: $('rConc'),
    rPer: $('rPer'), rDoses: $('rDoses'), rLast: $('rLast'),
    cCount: $('cCount'), cCountLbl: $('cCountLbl'), cDoseEq: $('cDoseEq'),
    cStr: $('cStr'), cDose: $('cDose'), cPerBottle: $('cPerBottle'), cLast: $('cLast'),
    warn: $('warn'), sFill: $('sFill'), sTicks: $('sTicks')
  };

  /* ---------- VIAL SIZES ----------
     Every strength offered across the Pepsynth Labs catalog, plus common
     research sizes. Rendered into a <datalist> so users can either pick
     from the dropdown OR type a custom value into the same field. */
  const ALL_VIAL_SIZES = [0.25, 0.5, 1, 2, 2.5, 3, 5, 7.5, 10, 12, 15, 20, 25, 30,
    40, 50, 60, 70, 75, 80, 100, 150, 200, 250, 500, 600, 750, 1000, 1500];

  function buildVialOptions(p) {
    el.vialOptions.innerHTML = '';
    const seen = {};
    const push = (v, label) => {
      if (seen[v]) return;
      seen[v] = 1;
      const o = document.createElement('option');
      o.value = String(v);
      o.label = label || (v < 1 ? v * 1000 + ' mcg' : v + ' mg');
      el.vialOptions.appendChild(o);
    };
    if (p && p.vials && p.vials.length) {
      p.vials.forEach((v) => push(v, (v < 1 ? v * 1000 + ' mcg' : v + ' mg') + ' — available for ' + p.n));
    }
    ALL_VIAL_SIZES.forEach((v) => push(v));
  }

  /* ---------- POPULATE SELECT ---------- */
  PEPTIDES.slice().sort((a, b) => a.n.localeCompare(b.n)).forEach((p) => {
    const o = document.createElement('option');
    o.value = p.n;
    o.textContent = p.n;
    el.pep.appendChild(o);
  });

  const byName = (n) => PEPTIDES.find((p) => p.n === n);

  /* ---------- EVIDENCE TIERS ----------
     How well-established the cited range actually is. This drives the label
     shown under the dose meter so the tool never implies more certainty than
     the underlying data supports.
       approved  = FDA-approved product; range taken from the prescribing label
       trial     = active/completed human clinical trials; dosing not finalized
       limited   = human data exists but is small, old, or non-Western regulatory
       preclinical = animal/in-vitro data only; no established human dosing
       halted    = development stopped for safety reasons                        */
  const EVIDENCE = {
    approved: {
      label: 'FDA-approved dosing',
      note: 'Range reflects the approved prescribing label for this molecule.',
      cls: 'ev-approved'
    },
    trial: {
      label: 'Clinical trial dosing',
      note: 'Range reflects published human trial protocols. Not an approved product.',
      cls: 'ev-trial'
    },
    limited: {
      label: 'Limited human data',
      note: 'Some human data exists, but it is small-scale, dated, or from non-US regulatory contexts.',
      cls: 'ev-limited'
    },
    preclinical: {
      label: 'No established human dosing',
      note: 'Animal or in-vitro data only. Any circulating range is extrapolated, not evidence-based.',
      cls: 'ev-preclinical'
    },
    halted: {
      label: 'Development halted for safety',
      note: 'Human trials were stopped due to adverse findings. No defensible dose range exists.',
      cls: 'ev-halted'
    }
  };

  const EV_MAP = {
    // FDA-approved molecules — ranges come from the prescribing label
    'Semaglutide': 'approved', 'Tirzepatide': 'approved', 'Liraglutide': 'approved',
    'Tesamorelin': 'approved', 'PT-141 (Bremelanotide)': 'approved',
    'Oxytocin': 'approved', 'Sermorelin': 'approved', 'Glutathione': 'approved',
    'Pentosan Polysulfate': 'approved',
    // In active or completed human trials
    'Retatrutide': 'trial', 'Cagrilintide': 'trial', 'Survodutide': 'trial',
    'Mazdutide': 'trial', 'SS-31 (Elamipretide)': 'trial', 'MOTS-c': 'trial',
    'Thymosin Alpha-1': 'trial', 'Larazotide': 'trial', 'Tesofensine': 'trial',
    'MK-677 (Ibutamoren)': 'trial', 'AOD-9604': 'trial', 'Kisspeptin-10': 'trial',
    'Follistatin-344': 'trial',
    // Limited / regional / dated human data
    'Semax': 'limited', 'Selank': 'limited', 'Cerebrolysin': 'limited',
    'Epitalon (Epithalon)': 'limited', 'Thymalin': 'limited', 'Pinealon': 'limited',
    'Thymulin': 'limited', 'VIP (Vasoactive Intestinal Peptide)': 'limited',
    'NAD+': 'limited', 'DSIP (Delta Sleep-Inducing Peptide)': 'limited',
    'GHRP-2': 'limited', 'GHRP-6': 'limited', 'Hexarelin': 'limited',
    'CJC-1295 DAC': 'limited', 'CJC-1295 (no DAC / Mod GRF 1-29)': 'limited',
    'Ipamorelin': 'limited', 'Melanotan II': 'limited', 'GHK-Cu': 'limited',
    // Preclinical only — no established human dosing
    'BPC-157': 'preclinical', 'TB-500 (Thymosin Beta-4)': 'preclinical',
    'KPV': 'preclinical', 'LL-37': 'preclinical', 'Dihexa': 'preclinical',
    'P21': 'preclinical', 'Humanin': 'preclinical', 'IGF-1 LR3': 'preclinical',
    'YK-11 (Myostatin Inhibitor)': 'preclinical', '5-Amino-1MQ': 'preclinical',
    'BAM15': 'preclinical', 'SLUPP-332': 'preclinical',
    'Snap-8 (Acetyl Octapeptide-3)': 'preclinical',
    'Matrixyl (Palmitoyl Pentapeptide-4)': 'preclinical',
    'BPC-157 + TB-500 Blend (10mg each)': 'preclinical',
    'GLOW Blend (GHK-Cu / BPC-157 / TB-500)': 'preclinical',
    'KLOW Blend (GHK-Cu / KPV / BPC-157 / TB-500)': 'preclinical',
    'CJC-1295 / Ipamorelin Blend (5mg/5mg)': 'limited',
    'Tesamorelin/Ipamorelin Blend': 'limited',
    'Tesamorelin/CJC/Ipamorelin Tri-Blend': 'limited',
    'Tirzepatide/Retatrutide Blend': 'trial',
    // Halted for safety
    'ACE-031': 'halted', 'Adipotide (FTPP)': 'halted'
  };

  const evidenceFor = (p) => EVIDENCE[EV_MAP[p.n] || 'preclinical'];

  /* ---------- HELPERS ---------- */
  const num = (v) => { const n = parseFloat(v); return isFinite(n) && n > 0 ? n : 0; };
  const fmt = (n, d) => {
    if (!isFinite(n)) return '—';
    const s = n.toFixed(d === undefined ? 2 : d);
    return s.indexOf('.') > -1 ? s.replace(/\.?0+$/, '') : s;
  };
  const plural = (n, w) => fmt(n, 0) + ' ' + w + (Math.round(n) === 1 ? '' : 's');
  const esc = (s) => String(s).replace(/[&<>"'`/]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
       "'": '&#39;', '`': '&#96;', '/': '&#47;' }[c]));

  function doseInMg() {
    const v = num(el.dose.value);
    if (!v) return 0;
    const u = el.doseUnit.value;
    if (u === 'mcg') return v / 1000;
    if (u === 'mg') return v;
    if (u === 'IU') {
      // IU only maps to mass when the active peptide provides iuPerMg
      const p = activePeptide;
      if (p && p.iuPerMg) return v / p.iuPerMg;
      return 0;
    }
    return v;
  }

  function setVial(v) { el.vial.value = v; }

  /* ---------- SYRINGE TICKS ---------- */
  let lastCap = null;
  function drawTicks(cap) {
    if (cap === lastCap) return;
    lastCap = cap;
    const step = cap <= 30 ? 3 : 5;
    const n = Math.round(cap / step);
    el.sTicks.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const t = document.createElement('i');
      if ((i + 1) % 2 === 0) t.className = 'major';
      el.sTicks.appendChild(t);
    }
  }

  /* ---------- CAPSULE / INJECTION MODE TOGGLE ---------- */
  function setMode(p) {
    const capsule = !!(p && p.form === 'capsule');
    el.resInj.hidden = capsule;
    el.resCap.hidden = !capsule;
    el.bacRow.style.display = capsule ? 'none' : '';
    el.syrRow.style.display = capsule ? 'none' : '';
    // vial-strength label + unit adapt for capsule mode
    if (capsule) {
      el.vialLabel.innerHTML = 'Capsule Strength <small>(per capsule)</small>';
      el.vialUnit.textContent = p.capsuleUnit || 'mg';
    } else {
      el.vialLabel.innerHTML = 'Vial Strength <small>(type or choose)</small>';
      el.vialUnit.textContent = 'mg';
    }
  }

  /* ---------- DOSE CONVERSION HELPER ---------- */
  function updateDoseConv() {
    const v = num(el.dose.value);
    const u = el.doseUnit.value;
    const p = activePeptide;
    const parts = [];
    if (v) {
      if (u === 'mcg') parts.push('<b>' + fmt(v, 3) + ' mcg</b> = ' + fmt(v / 1000, 4) + ' mg');
      else if (u === 'mg') parts.push('<b>' + fmt(v, 4) + ' mg</b> = ' + fmt(v * 1000, 1) + ' mcg');
      else if (u === 'IU') {
        if (p && p.iuPerMg) {
          const mg = v / p.iuPerMg;
          parts.push('<b>' + fmt(v, 2) + ' IU</b> = ' + fmt(mg * 1000, 2) + ' mcg (' + fmt(mg, 5) + ' mg)');
          parts.push('Conversion factor: 1 mg ' + p.n + ' = ' + p.iuPerMg + ' IU (so 1 IU ≈ ' + fmt(1000 / p.iuPerMg, 3) + ' mcg)');
        } else {
          parts.push('IU is only meaningful when the compound has a published IU/mg factor. Switch to mcg or mg.');
        }
      }
    }
    if (parts.length) {
      el.doseConv.innerHTML = parts.join('<br>');
      el.doseConv.hidden = false;
    } else {
      el.doseConv.hidden = true;
    }
  }

  /* ---------- CORE CALC ---------- */
  function calc() {
    updateDoseConv();
    const p = activePeptide;
    const capsuleMode = !!(p && p.form === 'capsule');

    if (capsuleMode) { calcCapsule(p); updateMeter(); return; }

    const vial = num(el.vial.value);
    const bac = num(el.bac.value);
    const dmg = doseInMg();
    const cap = parseInt(el.syr.value, 10);
    const perDay = parseFloat(el.freq.value);

    drawTicks(cap);

    if (!vial || !bac || !dmg) {
      ['rUnits', 'rMl', 'rConc', 'rPer', 'rDoses', 'rLast'].forEach((k) => { el[k].textContent = '—'; });
      el.sFill.style.width = '0%';
      el.warn.hidden = true;
      updateMeter();
      return;
    }

    const conc = vial / bac;          // mg/mL
    const ml = dmg / conc;            // mL to draw
    const units = ml * 100;           // U-100 units
    const perUnitMg = conc / 100;     // mg per insulin unit
    const doses = vial / dmg;
    const days = doses * perDay;

    el.rUnits.textContent = units < 10 ? fmt(units, 2) : fmt(units, 1);
    el.rMl.textContent = fmt(ml, 3) + ' mL';
    el.rConc.textContent = conc >= 1 ? fmt(conc, 2) + ' mg/mL' : fmt(conc * 1000, 0) + ' mcg/mL';
    el.rPer.textContent = perUnitMg >= 1 ? fmt(perUnitMg, 2) + ' mg' : fmt(perUnitMg * 1000, 1) + ' mcg';
    el.rDoses.textContent = fmt(doses, doses < 10 ? 1 : 0);
    el.rLast.textContent = days >= 60 ? plural(days / 7, 'week') : plural(days, 'day');

    el.sFill.style.width = Math.min(100, (units / cap) * 100) + '%';

    /* warnings */
    let msg = '';
    let danger = false;
    if (units > cap) {
      msg = 'This dose is ' + fmt(units, 1) + ' units — larger than your ' + cap +
        '-unit syringe. Use less bacteriostatic water, split into multiple administrations, or select a larger syringe.';
      danger = true;
    } else if (units < 3) {
      msg = 'Only ' + fmt(units, 2) + ' units. Measurement error at this volume is significant — add more bacteriostatic water to improve accuracy.';
    } else if (units < 6) {
      msg = 'Small draw volume (' + fmt(units, 2) + ' units). Consider more diluent for easier, more accurate measurement.';
    } else if (bac > 5) {
      msg = 'Volumes above 5 mL may exceed the capacity of a standard vial. Confirm your vial can hold this volume.';
    }

    if (msg) {
      el.warn.textContent = msg;
      el.warn.className = danger ? 'warn danger' : 'warn';
      el.warn.hidden = false;
    } else {
      el.warn.hidden = true;
    }

    updateMeter();
  }

  /* ---------- CAPSULE CALC ---------- */
  function calcCapsule(p) {
    // vial input reused as "capsule strength"; user can override
    const capMg = (p.capsuleUnit === 'mcg' ? num(el.vial.value) / 1000 : num(el.vial.value));
    const doseMg = doseInMg();
    const perDay = parseFloat(el.freq.value) || 1;
    const bottle = p.capsulesPerBottle || 30;

    if (!capMg || !doseMg) {
      ['cCount','cDoseEq','cStr','cDose','cPerBottle','cLast'].forEach(k => { el[k].textContent = '—'; });
      el.warn.hidden = true;
      return;
    }
    const nCaps = doseMg / capMg;
    el.cCount.textContent = fmt(nCaps, nCaps < 10 ? 2 : 1);
    el.cCountLbl.textContent = Math.abs(nCaps - 1) < 0.05 ? 'capsule' : 'capsules';
    el.cStr.textContent = (p.capsuleUnit === 'mcg' ? fmt(capMg * 1000, 0) + ' mcg' : fmt(capMg, 3) + ' mg');
    el.cDose.textContent = doseMg >= 1 ? fmt(doseMg, 3) + ' mg' : fmt(doseMg * 1000, 1) + ' mcg';
    el.cDoseEq.textContent = '= ' + el.cDose.textContent + ' per dose';
    el.cPerBottle.textContent = bottle;
    // capsules used per day = nCaps * (1/perDay days-per-dose)
    const capsPerDay = nCaps / perDay;
    const daysBottle = bottle / capsPerDay;
    el.cLast.textContent = daysBottle >= 60 ? plural(daysBottle / 7, 'week') : plural(daysBottle, 'day');

    let msg = '';
    let danger = false;
    if (Math.abs(nCaps - Math.round(nCaps)) > 0.05 && Math.abs(nCaps - 0.5) > 0.05) {
      msg = 'This dose requires ' + fmt(nCaps, 2) + ' capsules — not a clean whole or half count. Consider adjusting to ' +
        Math.max(1, Math.round(nCaps)) + ' capsule(s) (' + fmt(Math.round(nCaps) * capMg, 3) + ' mg total).';
    }
    if (nCaps > 10) { msg = 'That dose requires ' + fmt(nCaps, 1) + ' capsules — check the capsule strength on your bottle.'; danger = true; }
    if (msg) { el.warn.textContent = msg; el.warn.className = danger ? 'warn danger' : 'warn'; el.warn.hidden = false; }
    else { el.warn.hidden = true; }
  }

  /* ---------- DOSE RANGE METER ----------
     Maps the entered dose onto a three-zone bar:
       0–22%   below the cited starting dose
       22–78%  within the commonly cited range
       78–100% above the cited ceiling                                        */
  const rangeBox = $('rangeBox');
  let activePeptide = null;

  function fmtDose(v, unit) {
    if (unit === 'mcg' && v >= 1000) return fmt(v / 1000, 2) + ' mg';
    return fmt(v, v < 1 ? 3 : 2) + ' ' + unit;
  }

  /* Convert the user's entered dose into the peptide's native unit. */
  function doseInPeptideUnit(p) {
    const v = num(el.dose.value);
    if (!v) return 0;
    const entered = el.doseUnit.value;            // 'mcg' | 'mg' | 'IU'
    if (entered === p.unit) return v;
    if (entered === 'mcg' && p.unit === 'mg') return v / 1000;
    if (entered === 'mg' && p.unit === 'mcg') return v * 1000;
    // IU ↔ mass conversions via peptide.iuPerMg (Oxytocin etc.)
    if (p.iuPerMg) {
      if (entered === 'IU' && p.unit === 'mg') return v / p.iuPerMg;
      if (entered === 'IU' && p.unit === 'mcg') return (v / p.iuPerMg) * 1000;
      if (entered === 'mg' && p.unit === 'IU') return v * p.iuPerMg;
      if (entered === 'mcg' && p.unit === 'IU') return (v / 1000) * p.iuPerMg;
    }
    return v;                                     // unit not comparable
  }

  function meterPosition(v, low, high) {
    if (v <= 0) return 0;
    if (v < low) return Math.max(0, 22 * (v / low));
    if (v > high) {
      const over = (v - high) / high;             // 100% over ceiling = far right
      return 78 + Math.min(22, 22 * Math.min(1, over));
    }
    if (high === low) return 50;
    return 22 + 56 * ((v - low) / (high - low));
  }

  function updateMeter() {
    const p = activePeptide;
    if (!p) { rangeBox.hidden = true; return; }

    const comparable = ['mcg', 'mg'].indexOf(p.unit) > -1 || (p.unit === 'IU' && p.iuPerMg);
    rangeBox.hidden = false;

    // Preset button labels
    $('pLow').textContent = fmtDose(p.low, p.unit);
    $('pMid').textContent = fmtDose(p.mid, p.unit);
    $('pHigh').textContent = fmtDose(p.high, p.unit);
    $('sLow').textContent = fmtDose(p.low, p.unit);
    $('sHigh').textContent = fmtDose(p.high, p.unit);

    // Evidence badge
    const ev = evidenceFor(p);
    const badge = $('evBadge');
    badge.textContent = ev.label;
    badge.className = 'ev-badge ' + ev.cls;
    $('evNote').textContent = ev.note;

    const needle = $('needle');
    const status = $('meterStatus');

    if (!comparable) {
      needle.style.display = 'none';
      status.textContent = 'This compound is dosed in ' + p.unit +
        ' — enter the dose in its native unit to compare against the range.';
      status.className = 'meter-status';
      return;
    }
    needle.style.display = '';

    const v = doseInPeptideUnit(p);
    if (!v) {
      needle.style.left = '0%';
      status.textContent = 'Enter a dose to see where it sits in the range.';
      status.className = 'meter-status';
      return;
    }

    needle.style.left = meterPosition(v, p.low, p.high) + '%';

    // Mark the closest preset as active
    document.querySelectorAll('.preset').forEach((b) => {
      b.classList.toggle('on', Math.abs(p[b.dataset.k] - v) < v * 0.001);
    });

    if (v < p.low) {
      const pct = Math.round((1 - v / p.low) * 100);
      status.textContent = pct + '% below the cited starting dose of ' + fmtDose(p.low, p.unit) + '.';
      status.className = 'meter-status s-under';
    } else if (v > p.high) {
      const pct = Math.round((v / p.high - 1) * 100);
      status.textContent = pct + '% above the cited ceiling of ' + fmtDose(p.high, p.unit) + '.';
      status.className = 'meter-status s-over';
    } else {
      status.textContent = 'Within the commonly cited range of ' +
        fmtDose(p.low, p.unit) + ' – ' + fmtDose(p.high, p.unit) + '.';
      status.className = 'meter-status s-in';
    }
  }

  /* Preset buttons set the dose directly */
  $('presets').addEventListener('click', (e) => {
    const b = e.target.closest('.preset');
    if (!b || !activePeptide) return;
    const p = activePeptide;
    if (['mcg', 'mg', 'IU'].indexOf(p.unit) > -1) el.doseUnit.value = p.unit;
    el.dose.value = p[b.dataset.k];
    calc();
  });
  /* ---------- REFERENCE CARD ---------- */
  const refCard = $('refCard');
  function showRef(p) {
    if (!p) { refCard.hidden = true; return; }
    refCard.hidden = false;
    $('refName').textContent = p.n;
    $('refCat').textContent = p.cat;
    const range = (p.low === p.high ? p.low : p.low + '–' + p.high) + ' ' + p.unit;
    $('refSpec').innerHTML = [
      ['Evidence Level', evidenceFor(p).label],
      ['Molecular Weight', p.mw],
      ['Half-life', p.half],
      ['Route', p.route],
      ['Frequency', p.freq],
      ['Reference Range', range],
      ['Common Vial Sizes', p.vials.join(', ') + ' mg'],
      ['Diluent', p.solvent],
      ['Suggested BAC Water', p.bac ? p.bac + ' mL' : 'N/A']
    ].map((r) => '<div><span>' + esc(r[0]) + '</span><b>' + esc(r[1]) + '</b></div>').join('');
    $('refTitr').textContent = p.titr;
    $('refStore').textContent = p.storage;
    $('refNotes').textContent = (p.blendNote ? p.blendNote + '\n\n' : '') + p.notes;
    $('refStack').textContent = p.stack;
  }

  /* ---------- AUTOFILL ---------- */
  function autofill() {
    const p = byName(el.pep.value);
    activePeptide = p || null;
    showRef(p);
    buildVialOptions(p);
    setMode(p);

    // Blend note (only shown when the compound is a multi-peptide blend)
    if (p && p.blendNote) {
      el.blendNote.textContent = p.blendNote;
      el.blendNote.hidden = false;
    } else {
      el.blendNote.hidden = true;
    }

    if (!p) { rangeBox.hidden = true; calc(); return; }

    if (p.form === 'capsule') {
      // vial input = per-capsule strength
      setVial(p.capsuleStrength);
    } else {
      setVial(p.vials[Math.min(1, p.vials.length - 1)]);
      if (p.bac) el.bac.value = p.bac;
    }

    // Dose unit: if the peptide has a native mcg/mg/IU unit we support, use it
    if (p.unit === 'mcg' || p.unit === 'mg') {
      el.doseUnit.value = p.unit;
      el.dose.value = p.mid;
    } else if (p.unit === 'IU' && p.iuPerMg) {
      el.doseUnit.value = 'IU';
      el.dose.value = p.mid;
    }

    const f = p.freq.toLowerCase();
    if (f.indexOf('once weekly') > -1 || f === 'weekly') el.freq.value = '7';
    else if (f.indexOf('2× weekly') > -1 || f.indexOf('twice weekly') > -1) el.freq.value = '3.5';
    else if (f.indexOf('2–3× weekly') > -1 || f.indexOf('3× weekly') > -1) el.freq.value = '2.33';
    else if (f.indexOf('other day') > -1 || f.indexOf('eod') > -1) el.freq.value = '2';
    else if (f.indexOf('3× daily') > -1 || f.indexOf('4× daily') > -1) el.freq.value = '0.333';
    else if (f.indexOf('2× daily') > -1 || f.indexOf('twice daily') > -1) el.freq.value = '0.5';
    else if (f.indexOf('every 2') > -1) el.freq.value = '7';
    else el.freq.value = '1';

    calc();
  }

  /* ---------- LIBRARY ---------- */
  const cats = ['All'].concat(PEPTIDES.map((p) => p.cat).filter((c, i, a) => a.indexOf(c) === i));
  let activeCat = 'All';
  let query = '';
  const chips = $('chips');

  cats.forEach((c) => {
    const b = document.createElement('button');
    b.className = 'chip' + (c === 'All' ? ' on' : '');
    b.type = 'button';
    b.textContent = c;
    b.addEventListener('click', () => {
      activeCat = c;
      Array.prototype.forEach.call(chips.children, (x) => x.classList.toggle('on', x === b));
      renderLib();
    });
    chips.appendChild(b);
  });

  const libList = $('libList');
  function renderLib() {
    const q = query.trim().toLowerCase();
    const list = PEPTIDES.filter((p) =>
      (activeCat === 'All' || p.cat === activeCat) &&
      (!q || p.n.toLowerCase().indexOf(q) > -1 ||
        p.cat.toLowerCase().indexOf(q) > -1 ||
        p.notes.toLowerCase().indexOf(q) > -1)
    ).sort((a, b) => a.n.localeCompare(b.n));

    if (!list.length) {
      libList.innerHTML = '<p class="empty">No compounds match that search.</p>';
      return;
    }

    libList.innerHTML = list.map((p) => {
      const range = (p.low === p.high ? p.low : p.low + '–' + p.high) + ' ' + p.unit;
      return '<details>' +
        '<summary><span>' + esc(p.n) + '</span><em>' + esc(p.cat) + '</em></summary>' +
        '<div class="lib-body"><div class="kv">' +
        kv('Reference Range', range) +
        kv('Evidence Level', evidenceFor(p).label) +
        kv('Frequency', p.freq) +
        kv('Half-life', p.half) +
        kv('Route', p.route) +
        kv('Mol. Weight', p.mw) +
        kv('Vial Sizes', p.vials.join(' / ') + ' mg') +
        kv('Diluent', p.solvent) +
        kv('Suggested BAC', p.bac ? p.bac + ' mL' : 'N/A') +
        '</div>' +
        '<h4>Titration</h4><p>' + esc(p.titr) + '</p>' +
        '<h4>Storage</h4><p>' + esc(p.storage) + '</p>' +
        '<h4>Research Notes</h4><p>' + esc(p.notes) + '</p>' +
        '<h4>Commonly Studied Alongside</h4><p>' + esc(p.stack) + '</p>' +
        '<button type="button" class="use-btn" data-pep="' + esc(p.n) + '">Load into calculator ↑</button>' +
        '</div></details>';
    }).join('');
  }
  function kv(k, v) { return '<div><span>' + esc(k) + '</span><b>' + esc(v) + '</b></div>'; }

  libList.addEventListener('click', (e) => {
    const b = e.target.closest('.use-btn');
    if (!b) return;
    el.pep.value = b.dataset.pep;
    autofill();
    $('calc').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  $('search').addEventListener('input', (e) => { query = e.target.value; renderLib(); });

  /* ---------- ACTIONS ---------- */
  $('copyBtn').addEventListener('click', async () => {
    const p = activePeptide;
    const capsule = !!(p && p.form === 'capsule');
    const lines = ['PEPSYNTH LABS — ' + (capsule ? 'Dosing' : 'Reconstitution') + ' Summary'];
    if (el.pep.value) lines.push('Compound: ' + el.pep.value);
    if (capsule) {
      lines.push('Capsule strength: ' + el.cStr.textContent);
      lines.push('Dose per administration: ' + el.cDose.textContent);
      lines.push('Take: ' + el.cCount.textContent + ' ' + el.cCountLbl.textContent);
      lines.push('Capsules per bottle: ' + el.cPerBottle.textContent);
      lines.push('Bottle lasts: ' + el.cLast.textContent);
    } else {
      lines.push('Vial: ' + el.vial.value + ' mg');
      lines.push('BAC water: ' + el.bac.value + ' mL');
      lines.push('Concentration: ' + el.rConc.textContent);
      lines.push('Dose: ' + el.dose.value + ' ' + el.doseUnit.value);
      lines.push('Draw: ' + el.rUnits.textContent + ' units (' + el.rMl.textContent + ')');
      lines.push('Doses per vial: ' + el.rDoses.textContent);
      lines.push('Vial lasts: ' + el.rLast.textContent);
    }
    lines.push('', 'For laboratory research use only. Not for human consumption.');
    const txt = lines.join('\n');
    const btn = $('copyBtn');
    try {
      await navigator.clipboard.writeText(txt);
      const o = btn.textContent;
      btn.textContent = 'Copied ✓';
      setTimeout(() => { btn.textContent = o; }, 1600);
    } catch (err) {
      window.prompt('Copy summary:', txt);
    }
  });

  $('resetBtn').addEventListener('click', () => {
    el.pep.value = '';
    activePeptide = null;
    rangeBox.hidden = true;
    el.blendNote.hidden = true;
    buildVialOptions(null);
    setMode(null);
    setVial(10);
    el.bac.value = 2;
    el.dose.value = 250;
    el.doseUnit.value = 'mcg';
    el.syr.value = '100';
    el.freq.value = '1';
    showRef(null);
    calc();
  });

  /* ---------- FAB ---------- */
  const fab = $('fab');
  const calcSection = $('calc');
  window.addEventListener('scroll', () => {
    fab.classList.toggle('show', calcSection.getBoundingClientRect().bottom < 0);
  }, { passive: true });

  /* ---------- BIND ---------- */
  ['vial', 'bac', 'dose', 'doseUnit', 'syr', 'freq'].forEach((k) => {
    el[k].addEventListener('input', calc);
    el[k].addEventListener('change', calc);
  });
  el.pep.addEventListener('change', autofill);

  renderLib();
  buildVialOptions(null);
  setMode(null);
  calc();
})();
