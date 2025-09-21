# FilmSøk

En lettvekts webapp for å søke etter filmer via et uoffisielt IMDB-endepunkt (`https://imdb.iamidiotareyoutoo.com`).

## ✨ Funksjoner
- Direkte søk med debounce (automatisk etter et kort øyeblikk)
- Enter for umiddelbart søk
- Håndtering av uvanlige feltnavn (`#TITLE`, `#YEAR`, `#IMG_POSTER`)
- Lastestatus / feil / tom visning
- Tastaturnavigasjon mellom kort (piltaster, Home/End, Escape)
- ARIA-live oppdateringer og fokusvennlig design
- Responsivt rutenett og mørkt UI
- Enkel in-memory caching av søk

## 🚀 Kom i gang
1. Klon eller last ned prosjektet.
2. Åpne `index.html` i en nettleser (ingen byggesteg nødvendig).
3. Søk etter en film – f.eks. `spider`, `matrix`, `titanic`.

## 📁 Struktur
```
index.html
style.css
javascript/
  main.js
```

## 🌐 GitHub Pages
Denne appen kan deployes automatisk til GitHub Pages via workflowen `.github/workflows/pages.yml`.

### Aktivering første gang
1. Push koden til repo (`main` eller `master`).
2. Gå til: Repository → Settings → Pages.
3. Under Build and deployment: *(skal automatisk stå på GitHub Actions)*.
4. Første workflow-kjøring: Se fanen Actions → "Deploy to GitHub Pages" → vent til grønn hake.
5. Siden blir tilgjengelig på:
   - `https://<brukernavn>.github.io/<repo-navn>/` (eks: `https://mahmoud2406.github.io/filmsok/`).

### Manuell deploy uten workflow (alternativ)
Opprett en branch `gh-pages` og legg inn filene der, slå på Pages med den branchen. Workflowen er likevel anbefalt.

### Base path hensyn
Fordi appen ligger under en undermappe (`/<repo-navn>/`), bruk relative stier (slik som nå). Unngå absolute `/` i lenker.

## 🔧 Videre forbedringer (forslag)
- Modal med detaljer når man klikker et kort
- Favoritter lagret i LocalStorage
- Filtrering per år eller sjanger (krever mer data)
- Paginering dersom API støtter det
- TypeScript + byggesystem (Vite) om ønskelig

## ⚠ Merk
Dette bruker et uoffisielt API; stabilitet og tilgjengelighet kan variere. Bruk kun til læring / demo.

## 📝 Lisens
Velg fritt: Du kan legge til en lisens senere (MIT er ofte nok for slike prosjekter).

---
Opprettet automatisk. God hacking! 🎬
