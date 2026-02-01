import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Award, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'AI-Driven 3D Blueprint Generator',
    description: 'End-to-end generative AI pipeline for text-to-3D manufacturing. Published at ICRRCE-2025 (Scopus-indexed).',
    achievement: 'Automated CAD workflow via FreeCAD + Blender APIs',
    metrics: [
      { label: 'Pipeline', value: 'Text → Image → 3D → CAD' },
      { label: 'Ablation', value: 'NeRF vs 3DGS: 3DGS 2x faster' },
    ],
    techStack: ['DALL·E 3', 'Stable Diffusion XL', 'Neural Radiance Fields', '3D Gaussian Splatting'],
    featured: true,
    badge: 'Published Research',
  },
  {
    title: 'Retinal Disease Detection System',
    description: 'Clinical-grade diabetic retinopathy grading with explainable AI. Tested on APTOS 2019 (3,662 real fundus images).',
    achievement: '85.45% accuracy | 0.92 Quadratic Weighted Kappa',
    metrics: [
      { label: 'vs Baseline', value: 'DenseNet alone: 81% → Fusion: 85.45%' },
      { label: 'Explainability', value: 'Grad-CAM heatmaps for clinicians' },
    ],
    techStack: ['CLIP', 'DenseNet-121', 'Grad-CAM', 'PyTorch'],
    featured: true,
    badge: 'Medical AI',
  },
  {
    title: 'Skin Disease Classification',
    description: 'Hybrid CNN with feature fusion, OOD detection, and uncertainty estimation across 22 dermatological conditions.',
    achievement: '79.11% accuracy with production safety mechanisms',
    metrics: [
      { label: 'Dataset', value: '5,000+ dermoscopy images' },
      { label: 'Safety', value: 'OOD rejection for unknown conditions' },
    ],
    techStack: ['ResNet50', 'DenseNet121', 'Grad-CAM', 'TensorFlow'],
    featured: true,
    badge: 'Healthcare AI',
  },
  {
    title: 'Fake News Detection with BERT',
    description: 'Custom transformer architecture trained on Fakeddit multimodal dataset (180k+ samples with text + images).',
    achievement: '84% accuracy | 0.83 F1-score',
    metrics: [
      { label: 'Dataset', value: 'Fakeddit: 180k multimodal samples' },
      { label: 'Approach', value: 'Fine-tuned BERT + contextual embeddings' },
    ],
    techStack: ['PyTorch', 'BERT', 'Transformers', 'NLP'],
    featured: false,
  },
  {
    title: 'Code Completion with Residual RNNs',
    description: 'Novel architecture combining residual connections with LSTM for improved gradient flow in code prediction.',
    achievement: '+1.22% accuracy | -8.08% perplexity',
    metrics: [
      { label: 'vs Vanilla LSTM', value: 'Perplexity: 45.2 → 41.5' },
      { label: 'Innovation', value: 'Skip connections between LSTM layers' },
    ],
    techStack: ['PyTorch', 'RNN', 'LSTM', 'Residual Networks'],
    featured: false,
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Featured Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Projects & <span className="gradient-text">Research</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From cutting-edge research to production-ready systems—each project 
            demonstrates my commitment to impactful AI solutions.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="project-card p-6 md:p-8"
            >
              {/* Badge */}
              {project.badge && (
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {project.badge}
                  </span>
                </div>
              )}

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>

              {/* Achievement */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground font-medium">{project.achievement}</span>
              </div>

              {/* Metrics/Ablations */}
              {project.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="p-2 rounded-lg bg-secondary/50 text-xs">
                      <span className="text-muted-foreground">{metric.label}: </span>
                      <span className="text-foreground">{metric.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className="absolute -inset-px rounded-xl opacity-0 pointer-events-none"
                animate={{
                  opacity: hoveredIndex === index ? 0.1 : 0,
                }}
                style={{
                  background: 'linear-gradient(135deg, hsl(174 72% 46%), hsl(199 89% 48%))',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="project-card p-6"
            >
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
              
              <div className="flex items-center gap-2 text-sm text-primary mb-3">
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium">{project.achievement}</span>
              </div>

              {/* Metrics for non-featured */}
              {project.metrics && (
                <div className="space-y-1 mb-4 text-xs">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="text-muted-foreground">
                      <span className="text-primary">→</span> {metric.label}: {metric.value}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded bg-secondary text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/PuchaArunKumar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
