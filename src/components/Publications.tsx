import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, ExternalLink, Award, FileText } from 'lucide-react';

const Publications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="publications" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Academic Contributions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Publications & <span className="gradient-text">Research</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Publication Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative p-8 rounded-xl bg-card border border-border overflow-hidden"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-teal-300 to-cyan-400" />
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    Scopus-Indexed Publication
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold">
                  AI-Driven 3D Blueprint Generator for Personalized Product Design
                </h3>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-muted-foreground">
                This research presents an innovative end-to-end generative AI pipeline that 
                transforms textual descriptions into manufacturable 3D models, bridging the 
                gap between creative vision and industrial production.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Conference</span>
                  <p className="font-medium">ICRRCE-2025</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Publisher</span>
                  <p className="font-medium">Bentham Books</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Generative AI', 'DALL·E 3', 'Stable Diffusion XL', 'Neural Radiance Fields', '3D Gaussian Splatting', 'CAD Automation'].map((tag) => (
                <span key={tag} className="skill-tag">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Research Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 p-6 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Research Interests</h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                'Assistive Technology',
                'Medical AI Applications',
                'Explainable AI (XAI)',
                'Computer Vision for Healthcare',
                'Generative Models',
                'Natural Language Understanding',
              ].map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-lg bg-primary/5 border border-primary/20 text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
