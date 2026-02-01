import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, BookOpen, Target, Award } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    title: 'M.Tech @ IIT Kharagpur',
    description: 'AI/ML specialization with CGPA 7.48',
  },
  {
    icon: Award,
    title: 'Published Researcher',
    description: 'Scopus-indexed paper at ICRRCE-2025',
  },
  {
    icon: Target,
    title: 'Industry Experience',
    description: 'ML Engineer Intern at Aegion Dynamic Solutions',
  },
  {
    icon: BookOpen,
    title: 'Research Focus',
    description: 'Medical AI & Assistive Technology',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Passionate About{' '}
            <span className="gradient-text">AI Innovation</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            As an M.Tech student at IIT Kharagpur, I combine rigorous academic 
            training with hands-on industry experience to build intelligent systems 
            that solve real-world problems.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 rounded-xl bg-card border border-border card-hover"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Building the Future with AI
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                My journey in AI/ML began during my B.Tech, where I developed 
                a strong foundation in computer science with a CGPA of 8.37. 
                This led me to pursue advanced studies at IIT Kharagpur, one 
                of India's premier technical institutions.
              </p>
              <p>
                I specialize in Deep Learning, Natural Language Processing, 
                and Computer Vision. My work spans from developing retinal 
                disease detection systems to building AI-driven 3D blueprint 
                generators—always with a focus on practical, impactful applications.
              </p>
              <p>
                My research interests lie at the intersection of assistive 
                technology and medical AI, where I believe AI can make the 
                most meaningful difference in people's lives.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Academic Stats */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <h4 className="font-semibold mb-4">Academic Background</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">M.Tech - IIT Kharagpur</span>
                  <span className="text-primary font-medium">CGPA: 7.48</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full w-[74.8%] rounded-full bg-gradient-to-r from-primary to-teal-300" />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-muted-foreground">B.Tech - GVP College</span>
                  <span className="text-primary font-medium">CGPA: 8.37</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full w-[83.7%] rounded-full bg-gradient-to-r from-primary to-teal-300" />
                </div>
              </div>
            </div>

            {/* Core Expertise */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <h4 className="font-semibold mb-4">Core Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {['Deep Learning', 'NLP', 'Computer Vision', 'Model Optimization', 'MLOps', 'Research'].map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
