import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Brain, Database, Settings } from 'lucide-react';

const skillCategories = [
  {
    icon: Code,
    title: 'Programming & Frameworks',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Keras', 'Hugging Face'],
  },
  {
    icon: Brain,
    title: 'ML Expertise',
    skills: ['Deep Learning', 'NLP', 'Computer Vision', 'Neural Networks', 'Model Optimization', 'Transformers'],
  },
  {
    icon: Database,
    title: 'Data Science',
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'EDA', 'Data Preprocessing'],
  },
  {
    icon: Settings,
    title: 'MLOps & Tools',
    skills: ['FastAPI', 'MLflow', 'Docker', 'SQL', 'Vector Databases', 'Git', 'Azure'],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding bg-card border-y border-border" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Technical Skills
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Tools of the <span className="gradient-text">Trade</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit spanning the entire ML pipeline—from data 
            preprocessing to production deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-xl bg-card border border-border card-hover"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-xl">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="skill-tag"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 p-6 rounded-xl bg-card border border-border"
        >
          <h4 className="font-semibold text-center mb-6">Additional Competencies</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Reinforcement Learning',
              'Generative AI',
              'DALL·E',
              'Stable Diffusion',
              'Grad-CAM',
              'BERT',
              'RoBERTa',
              'CLIP',
              'ResNet',
              'DenseNet',
              'LSTM',
              'Neural Radiance Fields',
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 text-sm rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
