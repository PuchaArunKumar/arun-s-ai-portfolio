import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Rocket,
  Users,
  Globe,
  Brain,
  Sparkles,
  Handshake,
  TrendingUp,
  ExternalLink,
  Target,
  Bot,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const aiProducts = [
  {
    icon: Bot,
    name: 'AI Co-Founder',
    description:
      'Converts raw ideas into pitch decks, user personas, and MVPs — powered by community data and startup best practices.',
  },
  {
    icon: ShieldCheck,
    name: 'Accessibility Intelligence Engine',
    description:
      'Scores products for accessibility compliance, identifies gaps, and provides actionable remediation steps.',
  },
  {
    icon: Handshake,
    name: 'Intelligent Matchmaking Engine',
    description:
      'Connects founders with mentors, investors, and developers based on skills, domain, and intent alignment.',
  },
  {
    icon: HeartHandshake,
    name: 'Cognitive AI Companion "Alex"',
    description:
      'Daily routines, gentle nudges, and decision support designed for ADHD, Autism, and memory-related needs.',
  },
];

const seekingItems = [
  { label: 'Co-founders & Developers', icon: Users },
  { label: 'Investors & Grants', icon: TrendingUp },
  { label: 'Mentors & Advisors', icon: Sparkles },
];

const AbiliversePitch = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="abilitiverse" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Abilitiverse Pitch Platform
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-6">
            Building the{' '}
            <span className="gradient-text">Global OS for Assistive Technology</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Abilitiverse is an AI-native platform that unites the entire assistive
            technology ecosystem — builders, startups, investors, mentors, and end
            users — into a single, intelligent community.
          </p>
        </motion.div>

        {/* Problem & Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {/* Problem */}
          <div className="p-6 md:p-8 rounded-xl bg-card border border-border">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-destructive" />
              The Problem
            </h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                Great AT ideas die because builders lack access to real users.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                Startups can't find funding — investors have no dedicated AT deal flow.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                End users with disabilities are excluded from the design process.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                The ecosystem is fragmented — no single platform connects all stakeholders.
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div className="p-6 md:p-8 rounded-xl bg-card border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              The Solution
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              A unified platform combining a community feed, pitch platform, and
              four purpose-built AI products — enabling every stakeholder to
              discover, collaborate, and launch assistive technologies faster.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Community Feed', 'Pitch Platform', '4 AI Products', '45+ Countries'].map(
                (tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {tag}
                  </Badge>
                ),
              )}
            </div>
          </div>
        </motion.div>

        {/* AI Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            4 AI Products Powering the Platform
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                className="group p-5 rounded-xl bg-card border border-border card-hover"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <product.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-2">{product.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact + Stage + Seeking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {/* Impact */}
          <div className="p-6 rounded-xl bg-card border border-border text-center card-hover">
            <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold gradient-text mb-1">1B+</div>
            <div className="font-medium text-foreground text-sm">
              People with Disabilities Globally
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Addressable across 45+ countries. End users are active
              collaborators, not just consumers.
            </p>
          </div>

          {/* Stage */}
          <div className="p-6 rounded-xl bg-card border border-border text-center card-hover">
            <Rocket className="w-8 h-8 text-primary mx-auto mb-3" />
            <Badge className="mb-3 bg-primary/15 text-primary border-primary/30">
              Prototype
            </Badge>
            <div className="font-medium text-foreground text-sm">
              Current Stage
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Freemium → Startup subscriptions → Enterprise / NGO / University
              partnerships + Investor plans.
            </p>
          </div>

          {/* Target Users */}
          <div className="p-6 rounded-xl bg-card border border-border text-center card-hover">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold gradient-text mb-1">5</div>
            <div className="font-medium text-foreground text-sm">
              Stakeholder Groups
            </div>
            <div className="flex flex-wrap justify-center gap-1.5 mt-3">
              {['Founders', 'Developers', 'Investors', 'Mentors', 'End Users'].map(
                (group) => (
                  <span key={group} className="skill-tag text-xs py-1 px-2">
                    {group}
                  </span>
                ),
              )}
            </div>
          </div>
        </motion.div>

        {/* What I'm Looking For + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-6 md:p-8 rounded-xl bg-card border border-primary/20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">What I'm Looking For</h3>
            <p className="text-sm text-muted-foreground">
              Join me in building the future of assistive technology
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {seekingItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://abiliverse-connect.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Abilitiverse
            </a>
            <a
              href="#contact"
              className="btn-outline flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              Let's Collaborate
            </a>
          </div>

          {/* Founder */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Founded by{' '}
              <span className="text-foreground font-medium">
                Arun Kumar Pucha
              </span>{' '}
              · IIT Kharagpur · Entrepreneurship Cell
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AbiliversePitch;
