import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, Search, FlaskConical, BarChart3, Zap, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Identify Gap',
    description: 'Find real-world problems where AI can make measurable impact',
  },
  {
    icon: Search,
    title: 'Literature Review',
    description: 'Study SOTA methods, identify what works and what fails',
  },
  {
    icon: FlaskConical,
    title: 'Hypothesis-Driven',
    description: 'Design experiments with clear, testable hypotheses',
  },
  {
    icon: BarChart3,
    title: 'Rigorous Ablation',
    description: 'Isolate contributions, validate each component',
  },
  {
    icon: Zap,
    title: 'Ship & Iterate',
    description: 'Deploy, measure real impact, improve continuously',
  },
];

const ResearchPhilosophy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Research Approach
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            How I <span className="gradient-text">Think</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I approach problems like a scientist: with hypotheses, controlled experiments, 
            and a relentless focus on measurable outcomes.
          </p>
        </motion.div>

        {/* Process Flow */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="p-6 rounded-xl bg-card border border-border card-hover h-full">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center relative z-10">
                    <step.icon className="w-6 h-6 text-primary" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-center mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">{step.description}</p>
                </div>
                
                {/* Arrow for mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-2 lg:hidden">
                    <ArrowRight className="w-5 h-5 text-primary/50 rotate-90 md:rotate-0" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Case Study Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 p-6 md:p-8 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/20"
        >
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex w-12 h-12 rounded-lg bg-primary/10 items-center justify-center flex-shrink-0">
              <FlaskConical className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Applied Example: Retinal Disease Detection</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="text-primary font-medium">Gap:</span> Diabetic retinopathy screening 
                  requires expert ophthalmologists—scarce in rural India.
                </p>
                <p>
                  <span className="text-primary font-medium">Hypothesis:</span> CLIP embeddings + DenseNet 
                  can outperform single-backbone approaches on the APTOS dataset.
                </p>
                <p>
                  <span className="text-primary font-medium">Ablation:</span> Tested CLIP alone (78% acc), 
                  DenseNet alone (81% acc), fusion approach (85.45% acc, 0.92 QWK).
                </p>
                <p>
                  <span className="text-primary font-medium">Outcome:</span> Clinical-grade explainability 
                  via Grad-CAM, making AI decisions transparent to doctors.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchPhilosophy;
