# CV og ansøgning

Kildefiler til CV og ansøgning, bygget i samme designsprog som portfolioen — samme tokens,
samme typografi (`Instrument Serif` / `Hanken Grotesk` / `JetBrains Mono`), A4, én side hver.

| Fil | Hvad |
|---|---|
| `CV.dc.html` | CV, én A4-side |
| `Ansøgning FUTBIN.dc.html` | Ansøgning til FUTBIN / Better Collective |
| `doc-page.js`, `support.js` | Runtime — skal ligge i samme mappe, ellers renderer filerne ikke |

Åbn `.dc.html`-filerne direkte i en browser. De er print-klare: browserens print-dialog giver
en ren A4-side uden dato- og URL-chrome.

## Til agenten

Disse filer er **ikke** en del af sitet, og skal ikke bygges om til React-komponenter.
De ligger her af to grunde:

1. De viser designsproget anvendt på et trykt format, hvis du får brug for en reference.
2. Hvis CV'et skal kunne downloades fra sitet (se README §11 — endnu ikke besluttet), er det
   `CV.pdf` eksporteret herfra, der skal lægges i `/public`. Spørg Benjamin om PDF'en frem for
   at generere din egen.

PDF-versionerne ligger ikke i denne mappe — de eksporteres manuelt fra `.dc.html`-filerne.
