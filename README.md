# Pucha Arun Kumar — AI/ML Engineer Portfolio

[![Live Site](https://img.shields.io/badge/Live-arun--s--ai--portfolio.vercel.app-14b8a6?style=for-the-badge&logo=vercel&logoColor=white)](https://arun-s-ai-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

This is the source for my personal portfolio. I'm an AI/ML Engineer and M.Tech (AI & ML) student at **IIT Kharagpur**, working on deep learning, NLP, computer vision, and medical AI.

**🔗 Live:** [arun-s-ai-portfolio.vercel.app](https://arun-s-ai-portfolio.vercel.app)

---

## About Me

- 🎓 **M.Tech, Artificial Intelligence & Machine Learning** at IIT Kharagpur
- 📄 **Published researcher:** *AI-Driven 3D Blueprint Generator for Personalized Product Design* (ICRRCE-2025, Scopus-indexed)
- 💼 **ML Engineer Intern** at Aegion Dynamic Solutions, where I built transformer-based NLI models for legal contract analysis
- 🚀 **Founder of Abilitiverse**, an AI-native platform connecting the assistive technology ecosystem

## Highlighted Work

| Project | Summary | Key Result |
| --- | --- | --- |
| **AI-Driven 3D Blueprint Generator** | Text → Image → 3D → CAD pipeline using DALL·E 3, SDXL, NeRF, and 3D Gaussian Splatting | Published at ICRRCE-2025 |
| **Retinal Disease Detection** | Diabetic retinopathy grading that fuses CLIP and DenseNet-121 features, with Grad-CAM explanations | 85.45% accuracy, 0.92 QWK (APTOS 2019) |
| **Skin Disease Classification** | Hybrid CNN covering 22 conditions, with out-of-distribution detection and uncertainty estimates | 79.11% accuracy |
| **Fake News Detection** | BERT fine-tuned on the Fakeddit multimodal dataset (180k+ samples) | 84% accuracy, 0.83 F1 |
| **Code Completion with Residual RNNs** | LSTM with residual skip connections to improve gradient flow | −8.08% perplexity vs. vanilla LSTM |

## Site Sections

Hero · Impact at a Glance · About · Research Approach · Skills · Projects · Abilitiverse · ML in Production · Experience · Publications · Education · Contact

## Tech Stack

- **Framework:** [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org), bundled with [Vite](https://vitejs.dev)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) with [shadcn/ui](https://ui.shadcn.com) components (Radix UI)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide](https://lucide.dev)
- **Testing:** [Vitest](https://vitest.dev) + Testing Library
- **Hosting:** [Vercel](https://vercel.com)

## Getting Started

**Prerequisites:** Node.js 18+ and npm.

```sh
# Clone the repository
git clone https://github.com/PuchaArunKumar/arun-s-ai-portfolio.git
cd arun-s-ai-portfolio

# Install dependencies
npm install

# Start the dev server at http://localhost:8080
npm run dev
```

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run the test suite |

## Project Structure

```
src/
├── components/        # Portfolio sections (Hero, About, Projects, Experience, ...)
│   └── ui/            # shadcn/ui primitives
├── hooks/             # Shared React hooks
├── lib/               # Utilities
├── pages/             # Route pages (Index, NotFound)
├── App.tsx            # App shell and routing
└── main.tsx           # Entry point
public/                # Static assets (favicon, résumé, robots.txt)
```

Each portfolio section is its own component in `src/components/`, and most keep their content in a data array at the top of the file. To update projects, skills, or experience, edit those arrays.

## Contact

- **Email:** [puchaarunkumar@gmail.com](mailto:puchaarunkumar@gmail.com)
- **LinkedIn:** [arun-kumar-pucha](https://www.linkedin.com/in/arun-kumar-pucha-77aa63293/)
- **Kaggle:** [arunkumarpucha](https://www.kaggle.com/arunkumarpucha)
- **GitHub:** [PuchaArunKumar](https://github.com/PuchaArunKumar)

I'm open to full-time roles as an ML Engineer, Applied Scientist, or Research Engineer, and to collaborations.

---

© Pucha Arun Kumar. All rights reserved. The code is public for reference. Please don't reuse the personal content (text, résumé, images) without permission.
