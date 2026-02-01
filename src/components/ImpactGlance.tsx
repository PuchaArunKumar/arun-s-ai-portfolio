import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Folder, Target, Layers } from 'lucide-react';

const metrics = [
  {
    icon: FileText,
    value: '1',
    label: 'Publication',
    sublabel: 'Scopus-Indexed',
  },
  {
    icon: Folder,
    value: '5+',
    label: 'ML Projects',
    sublabel: 'End-to-End',
  },
  {
    icon: Target,
    value: '85%+',
    label: 'Accuracy',
    sublabel: 'Medical AI Models',
  },
  {
    icon: Layers,
    value: '3',
    label: 'Domains',
    sublabel: 'CV • NLP • 3D Gen',
  },
];

const ImpactGlance = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="py-12 md:py-16" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            Impact at a Glance
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group p-6 rounded-xl bg-card border border-border text-center card-hover"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <metric.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                {metric.value}
              </div>
              <div className="font-medium text-foreground">{metric.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{metric.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactGlance;
