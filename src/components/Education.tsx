import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';

const education = [
  {
    degree: 'Master of Technology (M.Tech)',
    field: 'Artificial Intelligence & Machine Learning',
    institution: 'Indian Institute of Technology, Kharagpur',
    year: 'Expected 2027',
    cgpa: '7.48/10',
    coursework: ['Advanced AI', 'Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning'],
    current: true,
  },
  {
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science & Engineering',
    institution: 'Gayatri Vidya Parishad College of Engineering',
    year: '2021 - 2025',
    cgpa: '8.37/10',
    coursework: ['Data Structures', 'Algorithms', 'Machine Learning', 'Database Systems'],
    current: false,
  },
];

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="section-padding bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Academic Background
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10" />

                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="p-6 rounded-xl bg-card border border-border card-hover">
                    {/* Current badge */}
                    {edu.current && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Currently Pursuing
                      </span>
                    )}

                    {/* Degree */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{edu.degree}</h3>
                        <p className="text-primary text-sm">{edu.field}</p>
                      </div>
                    </div>

                    {/* Institution */}
                    <p className="text-foreground font-medium mb-2">{edu.institution}</p>

                    {/* Year & CGPA */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{edu.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">CGPA:</span>
                        <span className="text-primary font-medium">{edu.cgpa}</span>
                      </div>
                    </div>

                    {/* Coursework */}
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Key Coursework</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="px-2 py-1 text-xs rounded bg-secondary text-muted-foreground"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for timeline alignment */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
