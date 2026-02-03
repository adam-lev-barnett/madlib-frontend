# Madlib Machine — Frontend
  
## Overview  

This repository contains the frontend for *Madlib Machine*, a web application that transforms user-submitted text into an interactive madlib.

Users submit any text up to **10,000 characters**, are prompted to replace a user-defined number of nouns, verbs, adjectives, and receive a completed madlib with the replaced text.

- The app is available via browser [here](https://madlib-frontend-deploy.vercel.app/)
- The backend code is available [here](https://github.com/adam-lev-barnett/MadlibMachine-web)
- The original CLI file-based version is available [here](https://github.com/adam-lev-barnett/madlib-machine)

---

## Instructions
1. Enter text you wish to madlibify.
2. Enter how many madlibifiable words you would like to skip.1, 2
3. The Machine returns a new text with various madlibifiable words replaced by their respective parts of speech
4. The Machine prompts you to enter replacement words for each removed word based on their parts of speech
5. Voila! You now have a silly madlib to share with everyone you know and/or don't know!

---

## Future updates

- **Layout and design are still in-progress**: the app will _look_ much more exciting than it is currently
- **Improved formatting**:
  - New lines in completed madlib will be preserved in future versions.
  - LLM used for determining parts of speech assumes most capitalized words are proper nouns and does not blank them accordingly
- **Madlib saving and sharing** will take longer to implement but will be available in coming versions
___
## Tech stack
**Frontend**: React, TypeScript, Vite, CSS  
**Backend**: Java, Spring Boot, Maven, Stanford CoreNLP, Junit Jupiter

---

## Running app locally

### Requirements
- Node.js 18+
- A running instance of the Spring Boot backend

### Install

```bash
npm install
```

```bash
npm run dev
```

The app will be available at the URL printed in the console.

---

## Notable packages

- _src/components/forms_: separate components for form fields and a general form template used for source text submission and entering replacement words
- _src/pages_: the landing page, which holds and controls the display and state of the layouts defined in ReplacementWordForm and SourceTextSubmit
- _src/MadlibPhase.tsx_: The type that determines the madlib's state used by LandingPage.tsx

Details for the various files and components are included in the code itself

---
**License**  
Educational and portfolio use only.