# Yannick Deetman — Portfolio

Een persoonlijke one-pager voor Yannick Deetman met focus op communicatie, front-end en fotografie. De site draait zonder build-stap en gebruikt enkel statische assets.

## Features

- Dynamische content via één centrale configuratie (`assets/js/site-data.js`).
- Custom hero animatie, projectkaarten en contactformulier dat de mailclient opent.
- Geoptimaliseerde afbeeldingen voor social sharing en projecten.
- Toegankelijke navigatie met skip-link, focus-stijlen en mobiele menu-toggle.

## Ontwikkeling

De site is statisch opgebouwd. Gebruik een eenvoudige server om lokaal te testen, bijvoorbeeld:

```bash
python -m http.server
```

Open vervolgens `http://localhost:8000` in je browser.

## How to edit content

- **Eigenaar & socials:** pas `assets/js/site-data.js` aan. Alle teksten, links, projecten en meta-tags komen uit deze configuratie.
- **Projectcovers & meta-afbeelding:** vind je in `assets/projects/` en `assets/meta/`. De repo gebruikt SVG placeholders; vervang ze door eigen SVG’s (of pas de paden aan in `site-data.js`) om binaire bestanden te vermijden.
- **CV:** bewaar het actuele cv in `assets/cv/Yannick_Deetman_CV.pdf`.
- **Deploy:** Publish directory = . | Build command = (none).

## Licentie

Deze portfolio is open-source onder de [MIT-licentie](LICENSE).
