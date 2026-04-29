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
    name: "testimonials.users.0.name",
    role: "testimonials.users.0.role",
    image: "https://picsum.photos/id/494/100/100",
    rating: 5,
    text: "testimonials.users.0.feedback"
  },
  {
    name: "testimonials.users.1.name",
    role: "testimonials.users.1.role",
    image: "https://picsum.photos/id/507/100/100",
    rating: 5,
    text: "testimonials.users.1.feedback"
  },
  {
    name: "testimonials.users.2.name",
    role: "testimonials.users.2.role",
    image: "https://picsum.photos/id/548/100/100",
    rating: 5,
    text: "testimonials.users.2.feedback"
  }
]