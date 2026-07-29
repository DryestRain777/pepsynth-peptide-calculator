PEPSYNTH LABS — BRAND ASSETS
============================

Drop your logo files in THIS folder:

  Desktop/pepsynth-peptide-calculator/assets/

Then just refresh the page. No code changes needed — the site auto-detects
the files and swaps out the placeholder wordmark automatically.


REQUIRED / RECOMMENDED FILES
----------------------------

  logo.svg              Main logo. Used in the header, age gate, and footer.
                        SVG preferred (sharpest at any size). PNG/WEBP/JPG
                        also work — see "Accepted formats" below.
                        Should be light-colored or white, since it sits on a
                        dark navy background.
                        Ideal: horizontal lockup, ~600 x 150 px if raster.

  logo-footer.svg       OPTIONAL. A separate footer variant if you want one
                        (e.g. stacked instead of horizontal). If this file is
                        missing, the footer automatically uses logo.svg.

  favicon.png           Browser tab icon. 32 x 32 px or 48 x 48 px.

  apple-touch-icon.png  Icon when saved to an iPhone/iPad home screen.
                        180 x 180 px. No transparency — use a solid
                        background, ideally the navy #0A1628.

  og-image.png          Social sharing preview card (iMessage, Facebook,
                        LinkedIn, X). 1200 x 630 px.


ACCEPTED FORMATS
----------------
For logo.svg / logo-footer.svg, any of these extensions will be picked up
automatically, checked in this order:

  .svg  →  .png  →  .webp  →  .jpg  →  .jpeg

So if you only have a PNG, just name it "logo.png" and drop it in.
Keep the base filename exactly as listed above.


NOTES
-----
- The logo displays at 32px tall in the header, 44px in the age gate, and
  36px in the footer. It scales by height and keeps its aspect ratio, so any
  reasonably wide horizontal logo will look correct.
- Transparent backgrounds are strongly recommended for the logo files.
- If a file is missing or fails to load, the site falls back to the built-in
  CSS wordmark. Nothing will break.


BRAND COLORS CURRENTLY IN USE
-----------------------------
These are approximations pulled from pepsynthlabs.com. If you have the exact
brand hex values, send them over and I'll update them in styles.css — they're
all defined as CSS variables at the top of that file, so it's a one-line
change per color.

  --navy      #0A1628    page background
  --navy-2    #0F1F38    card background
  --panel     #132844    input / tile background
  --blue      #2E9BFF    primary accent, buttons, links
  --blue-dk   #1668C8    gradient end, ticker bar
  --cyan      #5FD8FF    highlights, labels, section headers
  --txt       #EAF2FF    body text
  --muted     #94AECC    secondary text
