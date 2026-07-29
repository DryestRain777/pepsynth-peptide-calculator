/* Pepsynth Labs — Research Peptide Reference Library
 * FOR LABORATORY / IN-VITRO RESEARCH REFERENCE ONLY.
 * Values below are literature-cited research reference ranges, not medical dosing advice.
 */
const PEPTIDES = [
  // ——— METABOLIC / GLP-1 CLASS ———
  {
    n: "Semaglutide", cat: "Metabolic", vials: [2, 5, 10, 15, 20],
    mw: "4113.6 Da", half: "~7 days", route: "Subcutaneous (research model)",
    freq: "Once weekly", unit: "mg",
    low: 0.25, mid: 0.5, high: 2.4,
    titr: "Common protocol: 0.25 mg/wk × 4 wks → 0.5 mg/wk × 4 wks → 1.0 mg → 1.7 mg → 2.4 mg. Escalate no faster than every 4 weeks.",
    solvent: "Bacteriostatic water (0.9% benzyl alcohol)", bac: 2,
    storage: "Lyophilized: 2–8 °C, protect from light. Reconstituted: 2–8 °C, use within 28–56 days. Do not freeze after reconstitution.",
    notes: "GLP-1 receptor agonist. Long half-life via albumin binding (C18 fatty diacid). Sensitive to agitation — swirl, never shake. Nausea/GI signals are the dose-limiting observation in models.",
    stack: "Cagrilintide, Retatrutide (not concurrently), AOD-9604"
  },
  {
    n: "Tirzepatide", cat: "Metabolic", vials: [5, 10, 15, 20, 30, 60],
    mw: "4813.5 Da", half: "~5 days", route: "Subcutaneous",
    freq: "Once weekly", unit: "mg",
    low: 2.5, mid: 5, high: 15,
    titr: "2.5 mg/wk × 4 wks → 5 mg × 4 wks → 7.5 → 10 → 12.5 → 15 mg. 4-week minimum per step.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: −20 °C long term / 2–8 °C short term. Reconstituted: 2–8 °C up to 28 days.",
    notes: "Dual GIP + GLP-1 receptor agonist. Greater observed effect magnitude than GLP-1 mono-agonists at equimolar exposure. Highly sensitive to freeze-thaw once in solution.",
    stack: "Cagrilintide, BPC-157 (GI tolerance), L-Carnitine"
  },
  {
    n: "Retatrutide", cat: "Metabolic", vials: [5, 10, 15, 20, 30, 40],
    mw: "4731 Da", half: "~6 days", route: "Subcutaneous",
    freq: "Once weekly", unit: "mg",
    low: 1, mid: 4, high: 12,
    titr: "1 mg/wk × 2–4 wks → 2 mg → 4 mg → 8 mg → 12 mg. Slow escalation strongly recommended.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: −20 °C. Reconstituted: 2–8 °C, 28 days.",
    notes: "Triple agonist — GIP / GLP-1 / glucagon. Glucagon arm raises energy expenditure and heart-rate signal; the most potent of the incretin class in published models.",
    stack: "Generally run solo during titration"
  },
  {
    n: "Cagrilintide", cat: "Metabolic", vials: [5, 10],
    mw: "3749 Da", half: "~7–8 days", route: "Subcutaneous",
    freq: "Once weekly", unit: "mg",
    low: 0.3, mid: 1.2, high: 4.5,
    titr: "0.3 mg → 0.6 → 1.2 → 2.4 → 4.5 mg, 4 weeks per step.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 28 days.",
    notes: "Long-acting amylin analog. Acts on satiety pathways distinct from GLP-1 — commonly paired with semaglutide (the 'CagriSema' pairing) for additive signal.",
    stack: "Semaglutide, Tirzepatide"
  },
  {
    n: "Liraglutide", cat: "Metabolic", vials: [5, 10],
    mw: "3751 Da", half: "~13 hours", route: "Subcutaneous",
    freq: "Once daily", unit: "mg",
    low: 0.6, mid: 1.8, high: 3.0,
    titr: "0.6 mg/day × 1 wk, increase 0.6 mg weekly to a 3.0 mg ceiling.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "2–8 °C. Reconstituted: 30 days refrigerated.",
    notes: "Short-acting GLP-1 agonist requiring daily administration. Useful where rapid washout is desired versus weekly analogs.",
    stack: "AOD-9604"
  },
  {
    n: "Survodutide", cat: "Metabolic", vials: [5, 10],
    mw: "~4700 Da", half: "~6 days", route: "Subcutaneous",
    freq: "Once weekly", unit: "mg",
    low: 0.6, mid: 2.4, high: 6.0,
    titr: "0.6 mg → 1.2 → 2.4 → 3.6 → 4.8 → 6.0 mg at 2–4 week intervals.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: −20 °C. Reconstituted: 2–8 °C, 28 days.",
    notes: "Dual glucagon/GLP-1 receptor agonist. Strong hepatic fat-reduction signal in published models.",
    stack: "Solo"
  },
  {
    n: "Mazdutide", cat: "Metabolic", vials: [5, 10],
    mw: "~4300 Da", half: "~7 days", route: "Subcutaneous",
    freq: "Once weekly", unit: "mg",
    low: 1.5, mid: 4, high: 9,
    titr: "1.5 mg → 3 mg → 4.5 mg → 6 mg → 9 mg, 4 weeks per step.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: −20 °C. Reconstituted: 2–8 °C, 28 days.",
    notes: "GLP-1/glucagon dual agonist (oxyntomodulin analog).",
    stack: "Solo"
  },
  {
    n: "AOD-9604", cat: "Metabolic", vials: [2, 5, 10],
    mw: "1815 Da", half: "~30 minutes", route: "Subcutaneous",
    freq: "Once daily, fasted", unit: "mcg",
    low: 250, mid: 300, high: 500,
    titr: "Flat dosing — 300 mcg daily is the most-cited reference point. No titration required.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 30 days.",
    notes: "hGH fragment 176-191. Lipolytic signal without the IGF-1 / glucose effects of full-length GH. Administer fasted for best observed response.",
    stack: "CJC-1295, Ipamorelin, Tesamorelin"
  },
  {
    n: "5-Amino-1MQ", cat: "Metabolic", vials: [5, 50, 100],
    mw: "174.2 Da", half: "~4–6 hours", route: "Oral (capsule) / SubQ",
    freq: "Once daily", unit: "mg",
    low: 50, mid: 100, high: 150,
    titr: "50 mg daily × 1 wk → 100 mg daily. Ceiling ~150 mg.",
    solvent: "Bacteriostatic water (if injectable form)", bac: 2,
    storage: "Room temp for capsules; 2–8 °C reconstituted.",
    notes: "Small-molecule NNMT inhibitor — raises intracellular NAD+ and drives adipocyte metabolic activity. Not a true peptide.",
    stack: "NAD+, MOTS-c, Tesofensine"
  },
  {
    n: "BAM15", cat: "Metabolic", vials: [25, 50, 100],
    mw: "302.2 Da", half: "~1.5–2 hours", route: "Oral (capsule)",
    freq: "Once daily", unit: "mg",
    low: 25, mid: 50, high: 100,
    titr: "50 mg daily is the standard capsule strength. Short 4–8 week research blocks.",
    solvent: "N/A — oral capsule", bac: 0,
    storage: "Room temperature, dry, dark. Keep sealed.",
    notes: "Mitochondrial uncoupler that dissipates the proton gradient to raise energy expenditure without increasing heart rate or core temperature — the key distinction from DNP. Not a peptide.",
    stack: "5-Amino-1MQ, MOTS-c"
  },
  {
    n: "SLUPP-332", cat: "Metabolic", vials: [10, 25],
    mw: "~450 Da", half: "~4–6 hours", route: "Oral (capsule)",
    freq: "Once daily", unit: "mcg",
    low: 250, mid: 250, high: 500,
    titr: "250 mcg daily is the standard capsule strength.",
    solvent: "N/A — oral capsule", bac: 0,
    storage: "Room temperature, dry, dark.",
    notes: "Investigational mitochondrial uncoupling agent studied for metabolic rate elevation. Limited published data — conservative, short-duration protocols are standard. Not a peptide.",
    stack: "Solo"
  },
  {
    n: "Tesofensine", cat: "Metabolic", vials: [10],
    mw: "406.8 Da", half: "~220 hours", route: "Oral",
    freq: "Once daily", unit: "mg",
    low: 0.25, mid: 0.5, high: 1.0,
    titr: "0.25 mg daily × 2 wks → 0.5 mg. Very long half-life — accumulates; escalate slowly.",
    solvent: "N/A — oral solution", bac: 0,
    storage: "Room temperature, dry, dark.",
    notes: "Triple monoamine reuptake inhibitor. Strong appetite-suppression signal. Cardiovascular/BP monitoring is standard in research protocols.",
    stack: "Solo"
  },

  // ——— GROWTH HORMONE SECRETAGOGUES ———
  {
    n: "Ipamorelin", cat: "Growth Hormone", vials: [2, 5, 10, 15],
    mw: "711.9 Da", half: "~2 hours", route: "Subcutaneous",
    freq: "1–3× daily", unit: "mcg",
    low: 100, mid: 200, high: 300,
    titr: "200–300 mcg per administration, up to 3×/day (AM fasted, post-training, pre-sleep).",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 30–45 days.",
    notes: "Highly selective GHRP — pulses GH without meaningfully raising cortisol, prolactin, or ACTH. The cleanest of the GHRP family. Administer on an empty stomach (2 hr fast window).",
    stack: "CJC-1295 DAC / Mod GRF 1-29, Tesamorelin"
  },
  {
    n: "CJC-1295 (no DAC / Mod GRF 1-29)", cat: "Growth Hormone", vials: [2, 5, 10],
    mw: "3367 Da", half: "~30 minutes", route: "Subcutaneous",
    freq: "1–3× daily", unit: "mcg",
    low: 100, mid: 100, high: 200,
    titr: "100 mcg per administration, 1–3×/day. Saturation dose is ~1 mcg/kg — more does not increase pulse amplitude.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 30 days.",
    notes: "GHRH analog. Synergistic with a GHRP (Ipamorelin) — the combination produces a supra-additive GH pulse versus either alone.",
    stack: "Ipamorelin, GHRP-2, GHRP-6, Hexarelin"
  },
  {
    n: "CJC-1295 DAC", cat: "Growth Hormone", vials: [2, 5, 10],
    mw: "3647 Da", half: "~6–8 days", route: "Subcutaneous",
    freq: "1–2× weekly", unit: "mcg",
    low: 500, mid: 1000, high: 2000,
    titr: "1000 mcg once or twice weekly; or 2000 mcg weekly split into 2 administrations.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 30 days.",
    notes: "Drug Affinity Complex binds serum albumin, creating a sustained GH 'bleed' rather than a pulse. Elevates IGF-1 baseline — different physiology from no-DAC versions.",
    stack: "Ipamorelin (for pulse restoration)"
  },
  {
    n: "Tesamorelin", cat: "Growth Hormone", vials: [2, 5, 10, 20],
    mw: "5136 Da", half: "~26–38 minutes", route: "Subcutaneous",
    freq: "Once daily, pre-sleep", unit: "mg",
    low: 1, mid: 2, high: 2,
    titr: "1 mg daily × 1 wk → 2 mg daily. 2 mg is the standard reference dose.",
    solvent: "Bacteriostatic water or sterile water", bac: 2,
    storage: "Lyophilized: 2–8 °C, light-protected. Reconstituted: use promptly; 2–8 °C ≤ 14 days.",
    notes: "Stabilized GHRH analog with the strongest published visceral adipose tissue reduction data of any secretagogue. Also studied for cognitive endpoints.",
    stack: "Ipamorelin, AOD-9604"
  },
  {
    n: "Sermorelin", cat: "Growth Hormone", vials: [2, 5, 10],
    mw: "3358 Da", half: "~11–12 minutes", route: "Subcutaneous",
    freq: "Once daily, pre-sleep", unit: "mcg",
    low: 100, mid: 300, high: 500,
    titr: "200–300 mcg nightly; ceiling ~500 mcg.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 30 days.",
    notes: "GHRH (1-29) fragment. Very short half-life produces a tight, physiologic GH pulse. Best administered ≥ 2 hours after the last meal.",
    stack: "GHRP-2, Ipamorelin"
  },
  {
    n: "CJC-1295 / Ipamorelin Blend (5mg/5mg)", cat: "Growth Hormone", vials: [10, 20],
    mw: "Blend", half: "Mixed", route: "Subcutaneous",
    freq: "Once daily, pre-sleep", unit: "mcg",
    low: 200, mid: 300, high: 400,
    titr: "Dose by total labeled mg. A 10 mg vial (5 mg of each component) at 300 mcg total delivers roughly 150 mcg of each per administration.",
    solvent: "Bacteriostatic water", bac: 3,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 30 days.",
    notes: "GHRH analog paired with a selective GHRP in a single vial — the most common secretagogue combination. Calculate against the vial's total mg, not per component.",
    stack: "Standalone blend"
  },
  {
    n: "Tesamorelin/Ipamorelin Blend", cat: "Growth Hormone", vials: [10, 12],
    mw: "Blend", half: "Mixed", route: "Subcutaneous",
    freq: "Once daily, pre-sleep", unit: "mg",
    low: 0.3, mid: 0.5, high: 0.6,
    titr: "Dose the blend by total mg; typical unit contains 5 mg Tesamorelin + 5 mg Ipamorelin.",
    solvent: "Bacteriostatic water", bac: 3,
    storage: "2–8 °C; reconstituted 30 days.",
    notes: "GHRH + GHRP pairing in one vial. Calculate against the total labeled mg on the vial, not per component.",
    stack: "Standalone blend"
  },
  {
    n: "GHRP-2", cat: "Growth Hormone", vials: [5, 10],
    mw: "817.9 Da", half: "~30 minutes", route: "Subcutaneous",
    freq: "2–3× daily", unit: "mcg",
    low: 100, mid: 150, high: 300,
    titr: "100–200 mcg per administration, 2–3×/day.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "2–8 °C; reconstituted 30 days.",
    notes: "Potent GH release with mild prolactin/cortisol elevation at higher doses. Less hunger stimulus than GHRP-6.",
    stack: "CJC-1295 no-DAC"
  },
  {
    n: "GHRP-6", cat: "Growth Hormone", vials: [5, 10],
    mw: "873 Da", half: "~15–60 minutes", route: "Subcutaneous",
    freq: "2–3× daily", unit: "mcg",
    low: 100, mid: 200, high: 300,
    titr: "100–300 mcg per administration.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "2–8 °C; reconstituted 30 days.",
    notes: "Strong ghrelin-mimetic — produces a pronounced appetite signal roughly 20 minutes post-administration. Chosen where hunger stimulation is a desired endpoint.",
    stack: "CJC-1295 no-DAC"
  },
  {
    n: "Hexarelin", cat: "Growth Hormone", vials: [2, 5],
    mw: "887 Da", half: "~55 minutes", route: "Subcutaneous",
    freq: "1–2× daily", unit: "mcg",
    low: 50, mid: 100, high: 200,
    titr: "100 mcg, 1–2×/day. Cycle 4–6 weeks then rest — desensitization is rapid.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "2–8 °C; reconstituted 30 days.",
    notes: "Most potent GHRP for acute GH release, but induces the fastest receptor downregulation. Notable cardioprotective data independent of GH axis.",
    stack: "Mod GRF 1-29 (short cycles)"
  },
  {
    n: "MK-677 (Ibutamoren)", cat: "Growth Hormone", vials: [25, 50],
    mw: "528.7 Da", half: "~24 hours", route: "Oral",
    freq: "Once daily, pre-sleep", unit: "mg",
    low: 10, mid: 15, high: 25,
    titr: "10 mg nightly × 2 wks → 20–25 mg. Cycle 8–12 weeks.",
    solvent: "N/A — oral", bac: 0,
    storage: "Room temperature, dry, dark.",
    notes: "Orally active ghrelin receptor agonist. Sustained 24 hr GH/IGF-1 elevation. Water retention, appetite increase, and reduced insulin sensitivity are the standard observed markers.",
    stack: "Solo or with GHRH analogs"
  },

  // ——— HEALING / REGENERATIVE ———
  {
    n: "BPC-157", cat: "Healing & Repair", vials: [2, 5, 10, 20],
    mw: "1419.5 Da", half: "~4 hours", route: "SubQ (systemic or near-site) / Oral",
    freq: "1–2× daily", unit: "mcg",
    low: 200, mid: 500, high: 1000,
    titr: "250–500 mcg 1–2×/day. Typical research block: 4–8 weeks, then off.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: 2–8 °C (stable at room temp for weeks). Reconstituted: 2–8 °C, 30–60 days. Unusually stable peptide.",
    notes: "Body Protection Compound — pentadecapeptide from gastric juice. Strong angiogenic and tendon/ligament/GI repair signal. Administration near the site of interest is common in research protocols, though systemic delivery shows comparable results.",
    stack: "TB-500, GHK-Cu, KPV"
  },
  {
    n: "TB-500 (Thymosin Beta-4)", cat: "Healing & Repair", vials: [2, 5, 10, 20],
    mw: "4963 Da", half: "~2–3 hours (long tissue residence)", route: "Subcutaneous",
    freq: "2× weekly (loading) → 1× weekly", unit: "mg",
    low: 2, mid: 2.5, high: 5,
    titr: "Loading: 2–2.5 mg twice weekly × 4–6 wks. Maintenance: 2 mg once weekly.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 30 days.",
    notes: "Actin-sequestering peptide driving cell migration, angiogenesis, and reduced fibrosis. Systemic rather than local action — injection site does not need to be near the target tissue.",
    stack: "BPC-157 (the canonical repair pairing)"
  },
  {
    n: "GHK-Cu", cat: "Healing & Repair", vials: [10, 50, 100, 200],
    mw: "340.8 Da (+Cu)", half: "~1 hour", route: "SubQ / Topical",
    freq: "Once daily", unit: "mg",
    low: 1, mid: 2, high: 3,
    titr: "1–2 mg SubQ daily, or 1–2% topical solution. Cycle 4–6 weeks.",
    solvent: "Bacteriostatic water", bac: 5,
    storage: "Lyophilized: 2–8 °C, protect from light. Reconstituted: 2–8 °C, 30 days. Solution is characteristically deep blue.",
    notes: "Copper tripeptide. Upregulates collagen I/III, elastin, and decorin; strong skin remodeling and hair follicle data. Systemic dosing carries copper-load considerations — long uninterrupted runs are avoided in research protocols.",
    stack: "BPC-157, TB-500 (the 'GLOW' combination)"
  },
  {
    n: "KPV", cat: "Healing & Repair", vials: [5, 10, 20],
    mw: "342.4 Da", half: "~1–2 hours", route: "SubQ / Oral / Topical",
    freq: "Once daily", unit: "mcg",
    low: 200, mid: 400, high: 500,
    titr: "250–500 mcg daily. Often run 4–8 weeks.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "2–8 °C; reconstituted 30 days.",
    notes: "C-terminal α-MSH tripeptide with the anti-inflammatory activity but without pigmentation effects. Strong data in gut inflammation and dermatologic models.",
    stack: "BPC-157, LL-37"
  },
  {
    n: "BPC-157 + TB-500 Blend (10mg each)", cat: "Healing & Repair", vials: [10, 20],
    mw: "Blend", half: "Mixed", route: "Subcutaneous",
    freq: "Once daily", unit: "mg",
    low: 0.5, mid: 1, high: 2,
    titr: "Dose by total labeled mg. A 20 mg vial (10 mg each) at 1 mg total delivers roughly 500 mcg of each per administration.",
    solvent: "Bacteriostatic water", bac: 3,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 30–60 days.",
    notes: "The canonical tissue-repair pairing in one vial. BPC-157 drives angiogenesis and local healing while TB-500 acts systemically on cell migration — complementary rather than overlapping mechanisms.",
    stack: "Standalone blend"
  },
  {
    n: "Thymosin Alpha-1", cat: "Immune", vials: [5, 10],
    mw: "3108 Da", half: "~2 hours", route: "Subcutaneous",
    freq: "2–3× weekly", unit: "mg",
    low: 0.45, mid: 1.6, high: 3.2,
    titr: "1.6 mg twice weekly is the standard reference protocol; acute research protocols use 1.6 mg daily × 7 days.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 30 days.",
    notes: "Immunomodulator — restores T-cell function and dendritic cell maturation. Bidirectional regulator rather than a pure stimulant.",
    stack: "LL-37, Thymulin"
  },
  {
    n: "LL-37", cat: "Immune", vials: [5],
    mw: "4493 Da", half: "~1–2 hours", route: "Subcutaneous",
    freq: "Once daily", unit: "mcg",
    low: 100, mid: 200, high: 500,
    titr: "100 mcg daily × 3 days → 200–500 mcg. Short blocks of 2–4 weeks.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: −20 °C preferred. Reconstituted: 2–8 °C, 14–21 days.",
    notes: "Human cathelicidin antimicrobial peptide. Broad antibacterial/antibiofilm plus immunomodulatory action. Injection-site reaction is the most commonly reported observation.",
    stack: "Thymosin Alpha-1, KPV"
  },
  {
    n: "Thymulin", cat: "Immune", vials: [5, 10],
    mw: "~850 Da", half: "~1 hour", route: "Subcutaneous",
    freq: "Once daily", unit: "mcg",
    low: 100, mid: 250, high: 500,
    titr: "100–500 mcg daily in 2–4 week blocks.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "2–8 °C; reconstituted 30 days.",
    notes: "Zinc-dependent thymic nonapeptide; T-cell differentiation and analgesic/anti-inflammatory signaling.",
    stack: "Thymosin Alpha-1"
  },
  {
    n: "VIP (Vasoactive Intestinal Peptide)", cat: "Immune", vials: [5, 10],
    mw: "3325 Da", half: "~1–2 minutes (IV)", route: "Intranasal (primary) / SubQ",
    freq: "4× daily", unit: "mcg",
    low: 50, mid: 50, high: 100,
    titr: "50 mcg intranasally 4×/day is the standard cited protocol.",
    solvent: "Bacteriostatic water / saline for nasal", bac: 5,
    storage: "Lyophilized: −20 °C. Reconstituted: 2–8 °C, 30 days. Very labile — keep cold.",
    notes: "Potent anti-inflammatory neuropeptide. Blood pressure drop is the dose-limiting observation. Nasal route used to reduce systemic hemodynamic effect.",
    stack: "Thymosin Alpha-1"
  },
  {
    n: "Pentosan Polysulfate", cat: "Healing & Repair", vials: [100],
    mw: "~4000–6000 Da", half: "~24 hours (tissue)", route: "SubQ / IM",
    freq: "Weekly", unit: "mg",
    low: 50, mid: 100, high: 250,
    titr: "3 mg/kg weekly × 4 weeks is the common reference course.",
    solvent: "Sterile/bacteriostatic water", bac: 5,
    storage: "2–8 °C; reconstituted 30 days.",
    notes: "Semi-synthetic polysulfated xylan. Cartilage/joint matrix and bladder epithelium research applications. Mild anticoagulant activity — a key interaction consideration.",
    stack: "BPC-157, TB-500"
  },

  // ——— COGNITIVE / NOOTROPIC ———
  {
    n: "Semax", cat: "Cognitive", vials: [5, 10, 20, 30],
    mw: "813.9 Da", half: "~30 min (nasal, CNS effect longer)", route: "Intranasal (primary) / SubQ",
    freq: "1–3× daily", unit: "mcg",
    low: 200, mid: 400, high: 900,
    titr: "300–600 mcg/day split into 2–3 intranasal administrations. Cycle 2–4 weeks.",
    solvent: "Bacteriostatic water or sterile saline", bac: 3,
    storage: "Lyophilized: −20 °C ideal, 2–8 °C acceptable. Reconstituted: 2–8 °C, 30 days.",
    notes: "ACTH(4-7)-Pro-Gly-Pro analog. Elevates BDNF/NGF, modulates dopaminergic and serotonergic tone. Non-hormonal — no HPA activation despite ACTH lineage. N-Acetyl form has higher potency and stability.",
    stack: "Selank, Cerebrolysin, Dihexa"
  },
  {
    n: "Selank", cat: "Cognitive", vials: [5, 10, 20, 30],
    mw: "751.9 Da", half: "~30 minutes", route: "Intranasal / SubQ",
    freq: "1–3× daily", unit: "mcg",
    low: 250, mid: 500, high: 900,
    titr: "250–500 mcg per administration, up to 3×/day. Cycle 2–4 weeks.",
    solvent: "Bacteriostatic water or saline", bac: 3,
    storage: "−20 °C lyophilized; 2–8 °C reconstituted, 30 days.",
    notes: "Tuftsin analog with anxiolytic action via GABA/serotonin modulation and enkephalinase inhibition. Non-sedating and non-dependence-forming in published models.",
    stack: "Semax (the classic anxiolytic + nootropic pairing)"
  },
  {
    n: "Dihexa", cat: "Cognitive", vials: [5, 10, 20],
    mw: "564.7 Da", half: "~10 days (tissue)", route: "Oral / Transdermal",
    freq: "Once daily", unit: "mg",
    low: 5, mid: 10, high: 20,
    titr: "5 mg daily × 1 wk → 10–20 mg. Short cycles (2–4 weeks) due to potency.",
    solvent: "DMSO or oil vehicle (highly lipophilic)", bac: 0,
    storage: "Room temperature, dry, dark.",
    notes: "Angiotensin IV analog; HGF/c-Met potentiator. Reported ~7 orders of magnitude more potent than BDNF at synaptogenesis in vitro. Because it is a general growth-factor amplifier, conservative and time-limited use is standard.",
    stack: "Solo"
  },
  {
    n: "Cerebrolysin", cat: "Cognitive", vials: [5, 10],
    mw: "Peptide mixture (<10 kDa)", half: "Varies", route: "IM / SubQ",
    freq: "Once daily, 5 days/wk", unit: "mL",
    low: 1, mid: 5, high: 10,
    titr: "5 mL daily, 5 days on / 2 off, for 4 weeks; repeat courses quarterly.",
    solvent: "Supplied as sterile solution — do not reconstitute", bac: 0,
    storage: "Room temperature, protect from light. Do not freeze.",
    notes: "Porcine brain-derived neuropeptide preparation with neurotrophic activity. Supplied pre-dissolved in ampoules.",
    stack: "Semax, P21"
  },
  {
    n: "P21", cat: "Cognitive", vials: [5, 10],
    mw: "~1000 Da", half: "~1–2 hours", route: "Intranasal / SubQ",
    freq: "Once daily", unit: "mcg",
    low: 500, mid: 1000, high: 1500,
    titr: "0.5–1 mg daily. 4-week cycles.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "−20 °C lyophilized; 2–8 °C reconstituted.",
    notes: "Ciliary neurotrophic factor mimetic; neurogenesis and BDNF upregulation in hippocampal models.",
    stack: "Semax, Cerebrolysin"
  },
  {
    n: "Pinealon", cat: "Longevity", vials: [5, 10, 20],
    mw: "~340 Da", half: "Short", route: "SubQ / IM / Oral",
    freq: "Once daily", unit: "mg",
    low: 1, mid: 2, high: 5,
    titr: "1–2 mg daily for 10–20 day courses, 2–3 courses per year.",
    solvent: "Bacteriostatic water or saline", bac: 2,
    storage: "2–8 °C; reconstituted 30 days. Highly stable short peptide.",
    notes: "Khavinson bioregulator tripeptide (Glu-Asp-Arg) targeting brain tissue. Peptide bioregulators are conventionally run as short pulsed courses rather than continuously.",
    stack: "Epitalon, Cortagen"
  },
  {
    n: "Epitalon (Epithalon)", cat: "Longevity", vials: [5, 10, 20, 50],
    mw: "390.3 Da", half: "~30 minutes", route: "SubQ / IM / Intranasal",
    freq: "Once daily", unit: "mg",
    low: 5, mid: 10, high: 10,
    titr: "Standard course: 5–10 mg daily × 10–20 days, 2× per year. Alternate: 10 mg every 3 days × 10 doses.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 30 days.",
    notes: "Tetrapeptide (Ala-Glu-Asp-Gly) studied for telomerase activation and melatonin rhythm normalization. Not intended for continuous dosing — pulsed courses are the entire premise of the protocol.",
    stack: "Pinealon, Thymalin, NAD+"
  },
  {
    n: "Thymalin", cat: "Longevity", vials: [10, 20],
    mw: "Peptide complex", half: "Short", route: "IM / SubQ",
    freq: "Once daily", unit: "mg",
    low: 5, mid: 10, high: 10,
    titr: "10 mg daily × 10 days, 2 courses per year.",
    solvent: "Bacteriostatic water or saline", bac: 2,
    storage: "2–8 °C; reconstituted 30 days.",
    notes: "Thymic peptide bioregulator for immune restoration. Frequently paired with Epitalon in longevity research protocols.",
    stack: "Epitalon"
  },
  {
    n: "MOTS-c", cat: "Longevity", vials: [5, 10, 20, 40],
    mw: "2174 Da", half: "~1–2 hours", route: "Subcutaneous",
    freq: "2–3× weekly", unit: "mg",
    low: 5, mid: 10, high: 10,
    titr: "5–10 mg 2–3× weekly × 4–6 weeks, then off.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: −20 °C. Reconstituted: 2–8 °C, 30 days.",
    notes: "Mitochondrial-derived peptide activating AMPK; improves insulin sensitivity and exercise capacity markers in models.",
    stack: "SS-31, Humanin, 5-Amino-1MQ"
  },
  {
    n: "SS-31 (Elamipretide)", cat: "Longevity", vials: [10, 20, 50],
    mw: "639.8 Da", half: "~2 hours", route: "Subcutaneous",
    freq: "Once daily", unit: "mg",
    low: 5, mid: 20, high: 40,
    titr: "5–10 mg daily initially; research protocols use up to 40 mg/day.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: −20 °C. Reconstituted: 2–8 °C, 30 days.",
    notes: "Cardiolipin-binding mitochondrial-targeted tetrapeptide. Restores cristae architecture and reduces mitochondrial ROS.",
    stack: "MOTS-c, NAD+"
  },
  {
    n: "Humanin", cat: "Longevity", vials: [5, 10],
    mw: "2687 Da", half: "~1–2 hours", route: "Subcutaneous",
    freq: "Once daily", unit: "mg",
    low: 1, mid: 3, high: 5,
    titr: "1–5 mg daily in 4-week blocks.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "−20 °C lyophilized; 2–8 °C reconstituted.",
    notes: "Mitochondrial-derived cytoprotective peptide; anti-apoptotic and neuroprotective signaling.",
    stack: "MOTS-c, SS-31"
  },
  {
    n: "NAD+", cat: "Longevity", vials: [100, 200, 500, 750, 1000],
    mw: "663.4 Da", half: "Minutes (rapid conversion)", route: "SubQ / IV / IM",
    freq: "Daily to weekly", unit: "mg",
    low: 50, mid: 100, high: 500,
    titr: "SubQ: 50–100 mg daily. IV: 250–750 mg infused slowly over 1–3 hours.",
    solvent: "Bacteriostatic water or sterile saline", bac: 5,
    storage: "Lyophilized: 2–8 °C, dark. Reconstituted: 2–8 °C, 14–30 days. Light-sensitive.",
    notes: "Rate of administration is the critical variable — rapid delivery produces flushing, chest pressure, and nausea. Slow it down.",
    stack: "MOTS-c, 5-Amino-1MQ, SS-31"
  },

  // ——— PERFORMANCE / MUSCLE ———
  {
    n: "IGF-1 LR3", cat: "Performance", vials: [1],
    mw: "9200 Da", half: "~20–30 hours", route: "SubQ",
    freq: "Once daily", unit: "mcg",
    low: 20, mid: 40, high: 80,
    titr: "20 mcg daily × 1 wk → 40–50 mcg. Cycles of 4 weeks max.",
    solvent: "Bacteriostatic water (0.6% acetic acid for long-term stability)", bac: 1,
    storage: "Lyophilized: −20 °C. Reconstituted: 2–8 °C, 14–20 days in BAC water.",
    notes: "Long R3 analog resists IGFBP binding, giving ~3× potency and dramatically extended half-life versus native IGF-1. Hypoglycemia is the principal acute risk — administer with carbohydrate availability.",
    stack: "Short GH secretagogue cycles"
  },
  {
    n: "Follistatin-344", cat: "Performance", vials: [1],
    mw: "~38 kDa", half: "~30 minutes", route: "SubQ",
    freq: "Once daily", unit: "mcg",
    low: 50, mid: 100, high: 100,
    titr: "100 mcg daily × 10–30 days, then extended off period.",
    solvent: "Bacteriostatic water", bac: 1,
    storage: "Lyophilized: −20 °C. Reconstituted: 2–8 °C, use within 10–14 days.",
    notes: "Myostatin-binding glycoprotein. Large, fragile molecule — never shake; direct the diluent stream against the vial wall.",
    stack: "Short duration, solo"
  },
  {
    n: "ACE-031", cat: "Performance", vials: [1],
    mw: "~76 kDa", half: "~10–15 days", route: "SubQ",
    freq: "Every 2–4 weeks", unit: "mg",
    low: 1, mid: 1, high: 3,
    titr: "1 mg/kg every 2–4 weeks in published protocols.",
    solvent: "Bacteriostatic water", bac: 1,
    storage: "−20 °C lyophilized; 2–8 °C reconstituted, 14 days.",
    notes: "ActRIIB decoy receptor. Broad activin/myostatin blockade — telangiectasia and epistaxis were the trial-limiting observations.",
    stack: "Solo"
  },
  {
    n: "YK-11 (Myostatin Inhibitor)", cat: "Performance", vials: [10],
    mw: "430.5 Da", half: "~6–10 hours", route: "Oral",
    freq: "Once daily", unit: "mg",
    low: 5, mid: 10, high: 15,
    titr: "5 mg daily × 1 wk → 10 mg. Cycles of 4–8 weeks.",
    solvent: "N/A — oral suspension", bac: 0,
    storage: "Room temperature, dry, dark.",
    notes: "Steroidal SARM with follistatin-mediated myostatin suppression. Hepatic and lipid marker monitoring is standard.",
    stack: "Solo"
  },
  {
    n: "Tesamorelin/CJC/Ipamorelin Tri-Blend", cat: "Performance", vials: [15, 20],
    mw: "Blend", half: "Mixed", route: "SubQ",
    freq: "Once daily, pre-sleep", unit: "mg",
    low: 0.3, mid: 0.5, high: 0.75,
    titr: "Dose by total labeled mg of the blend.",
    solvent: "Bacteriostatic water", bac: 3,
    storage: "2–8 °C; reconstituted 30 days.",
    notes: "Combines two GHRH analogs with a selective GHRP. Always calculate from the vial's total mg.",
    stack: "Standalone blend"
  },

  // ——— SEXUAL HEALTH / OTHER ———
  {
    n: "PT-141 (Bremelanotide)", cat: "Sexual Health", vials: [5, 10],
    mw: "1025.2 Da", half: "~2.7 hours", route: "SubQ / Intranasal",
    freq: "As needed, max 1× per 24 hr", unit: "mg",
    low: 0.5, mid: 1, high: 2,
    titr: "Start 0.5 mg to assess response → 1–2 mg. Ceiling 1.75–2 mg; max 8 doses/month.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 30 days.",
    notes: "Melanocortin receptor agonist acting centrally, not vascularly. Administer 45 min–2 hr before the observation window. Nausea and transient blood pressure elevation are dose-dependent.",
    stack: "Solo"
  },
  {
    n: "Melanotan II", cat: "Sexual Health", vials: [10],
    mw: "1024.2 Da", half: "~33 hours", route: "SubQ",
    freq: "Daily (loading) → 2× weekly", unit: "mcg",
    low: 250, mid: 500, high: 1000,
    titr: "Loading: 250 mcg daily, increase gradually to 500–1000 mcg. Maintenance: 500–1000 mcg 2×/week.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 30 days.",
    notes: "Non-selective melanocortin agonist. Nausea, facial flushing, and spontaneous erection are common at initiation — start low. Requires baseline dermatologic mole mapping in responsible research protocols.",
    stack: "Solo"
  },
  {
    n: "Kisspeptin-10", cat: "Sexual Health", vials: [5, 10],
    mw: "1302.5 Da", half: "~4 minutes", route: "SubQ",
    freq: "Once daily or EOD", unit: "mcg",
    low: 100, mid: 200, high: 500,
    titr: "100–500 mcg per administration. Very short half-life; pulsatile delivery preferred.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "−20 °C lyophilized; 2–8 °C reconstituted, 21 days.",
    notes: "Upstream GnRH stimulator — drives endogenous LH/FSH. Continuous exposure desensitizes the axis; pulsed dosing is essential.",
    stack: "Solo"
  },
  {
    n: "Oxytocin", cat: "Sexual Health", vials: [2, 5, 10],
    mw: "1007.2 Da", half: "~3–5 minutes", route: "Intranasal / SubQ",
    freq: "As needed", unit: "IU",
    low: 10, mid: 20, high: 40,
    titr: "10–40 IU intranasally. Effects observed 30–45 min post-administration.",
    solvent: "Sterile saline (nasal) or bacteriostatic water", bac: 2,
    storage: "2–8 °C strictly. Reconstituted: 14–30 days. Degrades quickly at room temp.",
    notes: "Nonapeptide with prosocial and anxiolytic signaling. Extremely short plasma half-life; intranasal route used for CNS access.",
    stack: "Solo"
  },
  {
    n: "Tirzepatide/Retatrutide Blend", cat: "Metabolic", vials: [20, 30],
    mw: "Blend", half: "~5–6 days", route: "SubQ",
    freq: "Once weekly", unit: "mg",
    low: 2, mid: 5, high: 10,
    titr: "Calculate from total labeled mg; escalate at 4-week intervals.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "−20 °C lyophilized; 2–8 °C reconstituted, 28 days.",
    notes: "Multi-agonist blend. Overlapping receptor coverage means GI signal accumulates faster than either compound alone — extra-conservative titration is standard.",
    stack: "Standalone blend"
  },
  {
    n: "KLOW Blend (GHK-Cu / KPV / BPC-157 / TB-500)", cat: "Healing & Repair", vials: [60, 80],
    mw: "Blend", half: "Mixed", route: "SubQ",
    freq: "Once daily", unit: "mg",
    low: 0.5, mid: 1, high: 2,
    titr: "Dose by total labeled mg of the blend.",
    solvent: "Bacteriostatic water", bac: 5,
    storage: "2–8 °C; reconstituted 30 days, protect from light (copper content).",
    notes: "High-mg multi-component repair blend. Because total vial mass is large, reconstitution volume should be scaled up (4–6 mL) to keep injection volumes practical.",
    stack: "Standalone blend"
  },
  {
    n: "GLOW Blend (GHK-Cu / BPC-157 / TB-500)", cat: "Healing & Repair", vials: [50, 70],
    mw: "Blend", half: "Mixed", route: "SubQ",
    freq: "Once daily", unit: "mg",
    low: 0.5, mid: 1, high: 2,
    titr: "Dose by total labeled mg of the blend; 4–6 week research blocks.",
    solvent: "Bacteriostatic water", bac: 5,
    storage: "2–8 °C; reconstituted 30 days. Protect from light — solution will be blue from the copper peptide.",
    notes: "Skin, connective tissue, and systemic repair blend. Use 4–6 mL diluent given the high total peptide mass.",
    stack: "Standalone blend"
  },
  {
    n: "Adipotide (FTPP)", cat: "Metabolic", vials: [2, 5, 10],
    mw: "~2600 Da", half: "~30 minutes", route: "SubQ",
    freq: "Once daily", unit: "mg",
    low: 0.5, mid: 1, high: 2,
    titr: "0.5–1 mg daily for short courses of 7–28 days maximum.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "−20 °C lyophilized; 2–8 °C reconstituted, 14 days.",
    notes: "Pro-apoptotic peptide targeting adipose vasculature. Renal effects were dose-limiting in primate studies — strictly short-course research use.",
    stack: "Solo"
  },
  {
    n: "Snap-8 (Acetyl Octapeptide-3)", cat: "Cosmetic", vials: [10, 50],
    mw: "1075 Da", half: "N/A (topical)", route: "Topical",
    freq: "1–2× daily", unit: "mg",
    low: 5, mid: 10, high: 10,
    titr: "Formulated at 5–10% in a topical base. Not for injection.",
    solvent: "Water/glycerin cosmetic base", bac: 0,
    storage: "2–8 °C; protect from light.",
    notes: "SNARE complex modulator reducing expression-line muscle contraction topically.",
    stack: "GHK-Cu, Matrixyl"
  },
  {
    n: "Matrixyl (Palmitoyl Pentapeptide-4)", cat: "Cosmetic", vials: [10, 50],
    mw: "802.1 Da", half: "N/A (topical)", route: "Topical",
    freq: "1–2× daily", unit: "mg",
    low: 3, mid: 5, high: 8,
    titr: "Formulated at 3–8 ppm in a topical carrier.",
    solvent: "Cosmetic serum base", bac: 0,
    storage: "Room temp, dark; refrigerate for longevity.",
    notes: "Collagen I, III, and fibronectin stimulation via matrikine signaling.",
    stack: "GHK-Cu, Snap-8"
  },
  {
    n: "Glutathione", cat: "Other", vials: [200, 600, 1500],
    mw: "307.3 Da", half: "~10 minutes (IV)", route: "IV / IM / SubQ",
    freq: "2–3× weekly", unit: "mg",
    low: 200, mid: 600, high: 1500,
    titr: "600–1200 mg 1–3× weekly.",
    solvent: "Sterile saline or bacteriostatic water", bac: 5,
    storage: "Lyophilized: 2–8 °C, dark. Reconstituted: 2–8 °C, use within 14 days. Oxidizes readily.",
    notes: "Master endogenous antioxidant tripeptide. Solution should be clear — discoloration indicates oxidation; discard.",
    stack: "NAD+, Vitamin C"
  },
  {
    n: "Larazotide", cat: "Other", vials: [10],
    mw: "723.9 Da", half: "~30 minutes", route: "Oral only",
    freq: "3× daily before meals", unit: "mg",
    low: 0.5, mid: 0.5, high: 1,
    titr: "0.5 mg three times daily, 15 minutes before meals.",
    solvent: "N/A — acts locally in gut lumen", bac: 0,
    storage: "Room temperature, dry.",
    notes: "Tight junction regulator (zonulin antagonist). Acts locally in the intestinal lumen — systemic absorption is negligible and injection defeats the mechanism.",
    stack: "BPC-157, KPV"
  },
  {
    n: "DSIP (Delta Sleep-Inducing Peptide)", cat: "Other", vials: [5, 10],
    mw: "848.8 Da", half: "~7–15 minutes", route: "SubQ / IM",
    freq: "Once daily, pre-sleep", unit: "mcg",
    low: 100, mid: 200, high: 500,
    titr: "100–300 mcg 30–60 minutes before the sleep window.",
    solvent: "Bacteriostatic water", bac: 2,
    storage: "Lyophilized: 2–8 °C. Reconstituted: 2–8 °C, 30 days.",
    notes: "Nonapeptide studied for slow-wave sleep architecture, stress-axis normalization, and pain thresholds.",
    stack: "Epitalon, Selank"
  }
];
