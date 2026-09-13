import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding bg-card border-y border-border" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Professional Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative pl-8 md:pl-0">
            {/* Timeline line for mobile */}
            <div className="md:hidden absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent" />
            
            {/* Experience Card */}
            <div className="relative md:flex gap-8">
              {/* Timeline for desktop */}
              <div className="hidden md:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                <div className="w-0.5 flex-1 bg-gradient-to-b from-primary to-transparent" />
              </div>

              {/* Mobile timeline dot */}
              <div className="md:hidden absolute left-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />

              <div className="flex-1 pb-12">
                <div className="p-6 md:p-8 rounded-xl bg-card border border-border card-hover">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">Machine Learning Engineer Intern</h3>
                      <p className="text-primary font-medium">Aegion Dynamic Solutions</p>
                    </div>
                    <div className="flex flex-col text-sm text-muted-foreground gap-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>May 2024 - August 2024</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Visakhapatnam, India</span>
                      </div>
                      <a 
                        href="https://drive.google.com/file/d/1Gq8FQU3VvlE8drmSuLtaPSpz-UD3__Y-/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs mt-1"
                      >
                        View Certificate →
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4 mb-6">
                    <p className="text-muted-foreground">
                      Developed NLP inference models for legal contract analysis as part of the 
                      Nimbus SaaS platform architecture, focusing on enterprise-grade solutions.
                    </p>
                    
                    <ul className="space-y-3">
                      {[
                        'Built and benchmarked multiple transformer architectures (BERT, RoBERTa, DeBERTa) for Natural Language Inference',
                        'Evaluated model performance across diverse NLI datasets including MultiNLI, Legal-NLI, and SNLI',
                        'Contributed to the development of Nimbus SaaS platform for automated legal document processing',
                        'Optimized inference pipelines for production deployment',
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {['Transformers', 'BERT', 'RoBERTa', 'DeBERTa', 'MultiNLI', 'Legal-NLI', 'SNLI', 'Python'].map((tech) => (
                      <span key={tech} className="skill-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Looking for opportunities - Refined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-8"
        >
          <div className="p-6 rounded-xl bg-gradient-to-r from-primary/[0.06] to-transparent border border-primary/20">
            <div className="flex items-start gap-4">
              <Briefcase className="w-8 h-8 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-3">Open to Opportunities</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Roles I'm Seeking:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• ML Engineer (NLP / CV / GenAI)</li>
                      <li>• Applied Scientist / Research Engineer</li>
                      <li>• AI Product Engineer at early-stage startups</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">What I Bring:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Published research + production experience</li>
                      <li>• Full-stack ML: data → training → deployment</li>
                      <li>• Strong fundamentals from IIT Kharagpur</li>
                    </ul>
                  </div>
                </div>

                <a 
                  href="mailto:puchaarunkumar@gmail.com" 
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-4"
                >
                  📧 puchaarunkumar@gmail.com
                </a>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    ✓ Available July 2025
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    Remote / Hybrid / Onsite
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    India / International
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
