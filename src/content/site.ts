/*
  All of the site's copy lives here. Components only lay it out.

  House rule for this file: every number is the one the code logged, on the
  split it was scored on, and team or coursework projects say so. Where the
  scoring split also chose the checkpoint, the result is marked optimistic.
  Before adding a result, check it against the repo's notebook output, not its
  README. Spelling is British throughout.
*/

export type Link = { label: string; href: string };

export const person = {
  name: 'Pucha Arun Kumar',
  email: 'puchaarunkumar@gmail.com',
  resume: 'https://drive.google.com/file/d/1kVWQbNOb9Y_d1s4M69ZXnpxNp7epa4RS/view?usp=sharing',
  github: 'https://github.com/PuchaArunKumar',
  linkedin: 'https://www.linkedin.com/in/arun-kumar-pucha-77aa63293/',
  kaggle: 'https://www.kaggle.com/arunkumarpucha',
  source: 'https://github.com/PuchaArunKumar/arun-s-ai-portfolio',
};

export const nav: Link[] = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Building', href: '#building' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  // Rendered as: {before}<em>{emphasis}</em>
  headline: { before: 'Models that show their ', emphasis: 'working.' },
  subhead: 'Medical AI at IIT Kharagpur. Open to ML engineering and applied-research roles from 2027.',
  intro: [
    'I’m Arun, an M.Tech student in Artificial Intelligence, working mostly on medical AI — where a confident wrong answer is the expensive kind. My thesis, still in progress, is a clinical decision-support system designed to rank diagnoses from three kinds of evidence, say how sure it is, and defer to a clinician when it isn’t sure enough.',
    'Before that: medical imaging models, benchmarks of retrieval for medical question answering, language models for legal contracts, and a text-to-CAD pipeline that began as my ICRRCE 2025 paper.',
  ],
  portrait: {
    label: 'Portrait of Pucha Arun Kumar, drawn as a 3D point cloud',
  },
  facts: [
    { key: 'Now', value: 'M.Tech in Artificial Intelligence, IIT Kharagpur (2025–2027)' },
    { key: 'Thesis', value: 'Explainable clinical decision support, with Prof. Plaban Kumar Bhowmick' },
    { key: 'Teaching', value: 'Teaching assistant, Essentials of Machine Learning' },
    { key: 'Building', value: 'Abilitiverse, an assistive-tech community (prototype)' },
    { key: 'Open to', value: 'ML engineering and applied-research roles from 2027' },
  ],
};

export type Project = {
  title: string;
  body: string;
  result?: { key: string; value: string };
  caveat?: string;
  meta: string[];
  live?: boolean;
  links: Link[];
};

export const work = {
  heading: { before: 'Clinical AI, medical imaging and ', emphasis: 'text-to-CAD.' },
  intro:
    'Each number comes from a logged run and names the split it was scored on; where that split also chose the checkpoint, the result is marked optimistic. Team and course projects say so.',
  projects: [
    {
      title: 'A diagnosis ranker built to defer to clinicians',
      body: 'My M.Tech thesis, in progress. A clinical note goes in; evidence for each candidate diagnosis comes from three channels — similar past patients, a medical knowledge graph and diagnostic checklists. A calibrated fusion layer is designed to rank the diagnoses and pass uncertain cases to a clinician; a frozen local LLM (Qwen3-14B) only writes up the decision. Most components are built and measured on their own, but the full pipeline has not yet run end to end. I commit my predictions before each experiment and report the ones that fail.',
      result: {
        key: 'So far',
        value: 'Adding retrieval cost 3.7 points on MedMCQA (4,183 questions, McNemar p < 10⁻⁷) and made no significant difference on MedQA.',
      },
      meta: ['2026 – now', 'Medical NLP', 'GraphRAG', 'Calibration'],
      live: true,
      links: [],
    },
    {
      title: 'Text in, engineering drawing out',
      body: 'A prompt becomes an editable design spec, then multi-view images from Stable Diffusion, then a 3D mesh (silhouette carving, TripoSR or Shap-E). The app draws an A3 orthographic blueprint and exports GLB, OBJ, STL, STEP and BLEND files through headless Blender and FreeCAD. The idea began as a paper I presented at ICRRCE 2025 as first author; the 2025 code was an unfinished prototype, so in 2026 I rebuilt it as a full application with a tested FastAPI backend.',
      result: { key: 'Runs', value: 'locally, peaking at ~4.3 GB of a 6.1 GB GPU' },
      caveat: 'Carving cannot recover concave shapes, the views are separate diffusion samples, and STEP output is a faceted mesh rather than parametric CAD. The README lists these up front.',
      meta: ['2025 paper', '2026 app', 'FastAPI', 'React + Three.js', 'Built with Claude Code'],
      links: [{ label: 'Code', href: 'https://github.com/PuchaArunKumar/AI-driven-3D-blueprint-generator' }],
    },
    {
      title: 'Grading diabetic retinopathy from fundus photos, with Grad-CAM',
      body: 'With Charan Teja Pampana. We fused CLIP ViT-B/32 image embeddings with DenseNet-121 features to grade fundus photographs into five severity levels, on 2,930 APTOS 2019 images. Grad-CAM on the DenseNet branch shows which regions drove each grade. I led the method and the write-up.',
      result: { key: 'Result', value: '84.3% accuracy · QWK 0.91 · macro-F1 0.69 on a 440-image stratified validation split' },
      caveat: 'There is no separate test set: the same split chose the checkpoint, so read these as optimistic. Severe cases are the weak spot (recall 0.30); they were the rarest class in training.',
      meta: ['2025', 'Medical imaging', 'PyTorch', 'Team of two'],
      links: [{ label: 'Code', href: 'https://github.com/PuchaArunKumar/Retinal-Disease-Detection' }],
    },
    {
      title: 'Classifying skin conditions from clinical photos',
      body: 'Team course project. We fused ResNet-50 and DenseNet-121 features into one classifier over 22 classes (21 conditions plus normal skin), trained on 13,898 of 15,444 clinical images, and added Mahalanobis-distance and one-class SVM novelty scores meant to flag inputs the model should not classify.',
      result: { key: 'Result', value: '79.1% accuracy · macro-F1 0.77 on the 1,546-image test split, vs 76.2% for DenseNet-121 alone' },
      caveat: 'That split also served as validation: it picked the checkpoint and drove the learning-rate schedule, so read 79.1% as optimistic. The novelty scores were only run on in-distribution images, so they are untested as an out-of-distribution guard.',
      meta: ['2025', 'Medical imaging', 'PyTorch', 'Team'],
      // The repo's notebooks contain a teammate's Kaggle API key. Relink once it is revoked and scrubbed.
      links: [],
    },
    {
      title: 'Memory in the wiring: an interactive explainer',
      body: 'With Arkoti Charan Teja, for DataForge 2026 (Pathway track). One interactive page showing that a fixed-size Hebbian synapse matrix, read with a cue, computes linear attention over the key–value pairs stored in it. Controls let you store more pairs than there are neurons and watch recall fail, or make the keys overlap and watch it fail sooner. The page ends by locating the mechanism in Pathway’s Dragon Hatchling (BDH) architecture.',
      result: { key: 'Built', value: 'one HTML file, no dependencies, maths unit-tested against the shipped code' },
      meta: ['2026', 'Explainer', 'JavaScript', 'Team of two', 'Built with Claude Code'],
      links: [
        { label: 'Open it', href: 'https://puchaarunkumar.github.io/memory-in-the-wiring/' },
        { label: 'Code', href: 'https://github.com/PuchaArunKumar/memory-in-the-wiring' },
      ],
    },
  ] satisfies Project[],
  smaller: {
    heading: 'Smaller things',
    items: [
      {
        title: 'Fake-news classification with BERT',
        body: 'NLP coursework. Wrote BERT encoder blocks from scratch in PyTorch (shape-checked, not trained), then fine-tuned pretrained bert-base-uncased to label Fakeddit post titles as fake or real: 84.1% accuracy, F1 0.84 on a 4,000-title test split from a 20,000-title class-balanced sample.',
        meta: '2025 · Coursework',
        links: [] as Link[],
      },
      {
        title: 'Residual connections for code completion',
        body: 'Coursework. Token-level code completion with RNN, LSTM and residual-RNN models; the residual RNN reached 83.6% top-5 accuracy and perplexity 5.46, against 82.6% and 5.94 for the plain RNN.',
        meta: '2025 · Coursework',
        links: [{ label: 'Code', href: 'https://github.com/PuchaArunKumar/Building_mini_copilot' }],
      },
      {
        title: 'A part-of-speech tagger without libraries',
        body: 'A hidden Markov model and Viterbi decoder written from first principles.',
        meta: '2025 · NLP',
        links: [{ label: 'Code', href: 'https://github.com/PuchaArunKumar/parts_of_speech_tagging_nlp' }],
      },
    ],
  },
};

export const building = {
  heading: { before: 'Abilitiverse: one place for ', emphasis: 'assistive technology.' },
  body: [
    'People with disabilities, the developers building tools for them, and the mentors and funders who could help rarely meet. Abilitiverse is my attempt to change that: a community where people report the problems they live with, and builders can find them.',
  ],
  builtLabel: 'Built in code so far',
  built: [
    'A structured problem repository — reports by disability type, category and severity, with voting, moderation, full-text search and duplicate suggestions',
    'Feed, jobs, learning and opportunities sections, and a member directory',
    'Accessibility settings built in: text size, high contrast, reduced motion and a dyslexia-friendly font, with automated accessibility tests',
    'Email and Google sign-in with two-factor authentication, and row-level security on every table',
  ],
  planned: 'An AI companion and matchmaking between founders, mentors and users are planned, not built. The problem repository is built but not yet live on the hosted prototype, and the platform has not yet been usability-tested with people with disabilities.',
  ask: 'If you work in assistive technology and want to help shape it, I would like to hear from you.',
  meta: 'Prototype · React, TypeScript, Supabase · built with Lovable',
  links: [
    { label: 'Visit the prototype', href: 'https://abiliverse-connect.lovable.app/' },
    { label: 'Code', href: 'https://github.com/PuchaArunKumar/abiliverse-connect' },
  ] satisfies Link[],
};

export type Role = {
  title: string;
  org: string;
  when: string;
  body: string;
  links?: Link[];
};

export const experience: Role[] = [
  {
    title: 'Research intern',
    org: 'Department of AI, IIT Kharagpur',
    when: 'May–Jul 2026',
    body: 'With Prof. Plaban Kumar Bhowmick. Re-ran two published medical graph-retrieval QA systems, AMG-RAG and RGAR, and compared them with a no-retrieval Qwen3-14B baseline. Built the evaluation harness (FAISS and BGE retrieval, per-dataset scoring) that scored the baseline on 6,456 MedQA, MedMCQA and PubMedQA questions and that my thesis now reuses.',
  },
  {
    title: 'Teaching assistant, Essentials of Machine Learning',
    org: 'IIT Kharagpur',
    when: 'Jul 2026 – now',
    body: 'With Prof. Somdyuti Paul. Support tutorials, grade assignments and run question-and-answer sessions for students on the course.',
  },
  {
    title: 'Machine learning engineer intern',
    org: 'Aegion Dynamic Solutions, Visakhapatnam',
    when: 'May–Aug 2024',
    body: 'Benchmarked BERT, RoBERTa and DeBERTa on natural-language inference (MultiNLI, SNLI and a legal NLI set) to choose a model for legal-contract analysis, built topic clustering over the contract corpus, and contributed to the frontend of the Nimbus document-analysis platform.',
    links: [{ label: 'Certificate', href: 'https://drive.google.com/file/d/1Gq8FQU3VvlE8drmSuLtaPSpz-UD3__Y-/view?usp=sharing' }],
  },
];

export const education = {
  degrees: [
    {
      title: 'M.Tech, Artificial Intelligence',
      org: 'Indian Institute of Technology Kharagpur',
      when: '2025–2027',
      body: 'Thesis on explainable clinical decision support. Coursework in machine learning, deep learning, NLP, visual computing, reinforcement learning and optimisation.',
    },
    {
      title: 'B.Tech, Computer Science & Engineering',
      org: 'Gayatri Vidya Parishad College for Degree and PG Courses',
      when: '2021–2025',
      body: '',
    },
  ],
  paper: {
    title: 'AI-Driven 3D Blueprint Generator for Personalized Product Design',
    venue: 'Presented at ICRRCE 2025',
    detail: 'First author, guided by Prof. Bh. Padma',
  },
};

export const toolkit: { group: string; items: string[] }[] = [
  { group: 'Modelling', items: ['PyTorch', 'Hugging Face Transformers', 'scikit-learn'] },
  { group: 'Vision', items: ['ResNet', 'DenseNet', 'CLIP', 'Grad-CAM', 'Stable Diffusion (diffusers)', 'TripoSR', 'Shap-E'] },
  { group: 'Language & retrieval', items: ['BERT / RoBERTa / DeBERTa', 'RAG', 'FAISS', 'BGE embeddings', 'Neo4j', 'scispaCy + UMLS linking', 'Qwen3, 4-bit NF4'] },
  { group: 'Evaluation', items: ['Calibration (Platt, ECE, Brier)', 'Significance testing', 'Pre-registered predictions', 'Ablations'] },
  { group: 'Engineering', items: ['Python', 'FastAPI', 'SQL', 'Git', 'Linux', 'React + TypeScript', 'Three.js', 'Streamlit', 'Blender / FreeCAD scripting'] },
];

export const contact = {
  heading: { before: 'Hiring for ML engineering or applied research? ', emphasis: 'Email me.' },
  body: 'I finish my M.Tech in 2027 and am looking for full-time ML engineering or applied-research roles, especially in medical AI.',
  links: [
    { key: 'Email', value: 'puchaarunkumar@gmail.com', href: 'mailto:puchaarunkumar@gmail.com' },
    { key: 'LinkedIn', value: 'linkedin.com/in/arun-kumar-pucha-77aa63293', href: person.linkedin },
    { key: 'GitHub', value: 'github.com/PuchaArunKumar', href: person.github },
    { key: 'Kaggle', value: 'kaggle.com/arunkumarpucha', href: person.kaggle },
    { key: 'Résumé', value: 'One page, PDF', href: person.resume },
  ],
};
