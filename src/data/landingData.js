import { BarChart, CardSim, Globe } from "lucide-react";

export const FEATURES = [
  { icon: CardSim, titleKey: "features.cards.title", descKey: "features.cards.desc" },
  { icon: BarChart, titleKey: "features.progress.title", descKey: "features.progress.desc" },
  { icon: Globe, titleKey: "features.offline.title", descKey: "features.offline.desc" },
];

export const STEPS = [
  { step: "01", titleKey: "steps.create.title", descKey: "steps.create.desc" },
  { step: "02", titleKey: "steps.learn.title",  descKey: "steps.learn.desc"  },
  { step: "03", titleKey: "steps.track.title",  descKey: "steps.track.desc"  },
];

export const TESTIMONIALS = [
    {
    name: "Sarah Johnson",
    role: "Medical Student",
    image: "https://picsum.photos/id/494/100/100",
    rating: 5,
    text: "EFFLearn transformed how I study for medical school. The spaced repetition system helped me retain complex information much better than traditional methods."
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    image: "https://picsum.photos/id/507/100/100",
    rating: 5,
    text: "As a developer learning new technologies, EFFLearn's structured approach helped me master React and TypeScript in just 3 months."
  },
  {
    name: "Emma Rodriguez",
    role: "Language Learner",
    image: "https://picsum.photos/id/548/100/100",
    rating: 5,
    text: "I've tried many language learning apps, but EFFLearn's methodology helped me become conversational in Spanish faster than I ever imagined."
  }
]