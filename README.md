# Pucha Arun Kumar — portfolio

Source for [arun-s-ai-portfolio.vercel.app](https://arun-s-ai-portfolio.vercel.app), my personal site. I'm an M.Tech student in Artificial Intelligence at IIT Kharagpur, working on medical AI: models that show their evidence, say how sure they are, and defer when they should.

## What's on the site

| Section | Contents |
| --- | --- |
| Selected work | M.Tech thesis (explainable clinical decision support), a text-to-CAD pipeline, diabetic-retinopathy grading, skin-condition classification, and an interactive explainer on Hebbian memory. Each result sits in the margin with its caveats. |
| Experience | Research intern and teaching assistant at IIT Kharagpur; ML engineering intern at Aegion Dynamic Solutions |
| Building | Abilitiverse, a community platform for assistive technology (prototype) |
| Education | M.Tech (IIT Kharagpur), B.Tech, and the ICRRCE 2025 paper |
| Toolkit | Tools I have used in a project, a course or an internship |

### How results are reported

Every number on the site comes from a logged run and names the split it was scored on. Where that split also chose the checkpoint, the result is marked optimistic. Team projects and coursework are labelled. The test suite fails if certain unsupported claims reappear in the page (see `src/test/site.test.tsx`).

## Stack

- Vite, React 18 and TypeScript
- Tailwind CSS with hand-written editorial components (`src/index.css`)
- Fraunces, Geist and JetBrains Mono, self-hosted via Fontsource
- Light and dark themes via `next-themes`, following the system setting by default
- Vitest, Testing Library and axe-core
- Hosted on Vercel

## Editing content

All copy lives in [`src/content/site.ts`](src/content/site.ts). The section components in `src/components/site/` only lay it out. Before adding a result, check it against the repository's notebook output, not its README.

## Running locally

Requires Node.js 18 or later.

```sh
git clone https://github.com/PuchaArunKumar/arun-s-ai-portfolio.git
cd arun-s-ai-portfolio
npm install
npm run dev        # http://localhost:8080
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest suite |

## Contact

[puchaarunkumar@gmail.com](mailto:puchaarunkumar@gmail.com) · [LinkedIn](https://www.linkedin.com/in/arun-kumar-pucha-77aa63293/) · [GitHub](https://github.com/PuchaArunKumar)

---

© Pucha Arun Kumar. The code is public for reference; please don't reuse the personal content (text, résumé, images) without permission.
