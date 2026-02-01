import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Server, Gauge, GitBranch, Shield, Cpu, LineChart } from 'lucide-react';

const productionSkills = [
  {
    icon: Server,
    title: 'API Design',
    description: 'FastAPI endpoints with async inference, request batching, and proper error handling',
    tech: ['FastAPI', 'Pydantic', 'Uvicorn'],
  },
  {
    icon: Gauge,
    title: 'Model Optimization',
    description: 'Quantization, ONNX export, and TensorRT conversion for 3x inference speedup',
    tech: ['ONNX', 'TorchScript', 'Quantization'],
  },
  {
    icon: GitBranch,
    title: 'Experiment Tracking',
    description: 'Version control for models, hyperparameters, and datasets with reproducible pipelines',
    tech: ['MLflow', 'Weights & Biases', 'DVC'],
  },
  {
    icon: Shield,
    title: 'Safety & OOD Detection',
    description: 'Out-of-distribution detection to prevent confident wrong predictions in production',
    tech: ['Uncertainty Estimation', 'Calibration'],
  },
  {
    icon: Cpu,
    title: 'Containerization',
    description: 'Docker images with proper GPU support and reproducible environments',
    tech: ['Docker', 'Docker Compose', 'CUDA'],
  },
  {
    icon: LineChart,
    title: 'Monitoring',
    description: 'Model performance monitoring, drift detection, and alerting systems',
    tech: ['Prometheus', 'Grafana', 'Azure'],
  },
];

const MLProduction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Beyond Notebooks
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            ML in <span className="gradient-text">Production</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Building models is 20% of the job. I focus equally on deployment, 
            monitoring, and the engineering that makes AI reliable at scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productionSkills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border card-hover group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <skill.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{skill.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
              <div className="flex flex-wrap gap-2">
                {skill.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs rounded bg-secondary text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Production Mindset Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20"
        >
          <blockquote className="text-center">
            <p className="text-lg italic text-foreground mb-2">
              "A model in a notebook is a prototype. A model in production is a product."
            </p>
            <footer className="text-sm text-muted-foreground">
              — My approach to ML Engineering
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default MLProduction;
