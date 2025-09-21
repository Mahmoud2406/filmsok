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
