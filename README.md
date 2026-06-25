# Imperial Restaurant

Mehrsprachige, statisch gebaute Restaurant-Landingpage mit Astro.

## Entwicklung

```bash
npm install
npm run dev
```

Der Production-Build wird mit `npm run build` erzeugt und liegt anschließend in `dist/`.

## Inhalte anpassen

- Kontaktdaten und Adresse: `src/data/site.ts`
- Übersetzungen, Seitentexte, Events und Öffnungszeiten: `src/data/content.ts`
- Design: `src/styles/global.css`
- Bildmotive und Wappen: `src/assets/`
- Downloadbare Speisekarte: `public/menu.pdf`
- PDF-Generator: `scripts/generate_menu_pdf.py`

Die Reservierungsanfrage öffnet eine voradressierte E-Mail. Die `.example`-Adressen müssen vor der Veröffentlichung ersetzt werden.

## GitHub Pages

Der Workflow `.github/workflows/deploy-pages.yml` baut und veröffentlicht die Seite automatisch bei jedem Push auf `main`. `SITE_URL` und `BASE_PATH` werden aus dem GitHub-Repository abgeleitet, damit Bilder, SVG-Flaggen und PDF-Downloads auch unter einer Project-Pages-URL funktionieren.
