export const FIRM = {
  legalName: "A.G. Assanti & Associates, P.C.",
  shortName: "Bike911",
  tagline: "Trial counsel for riders.",
  industryLine:
    "Protecting riders and businesses in the power sports industry for 30 years.",
  phoneVanity: "877-BIKE-911",
  phoneNumeric: "(877) 245-3911",
  phoneTel: "tel:+18772453911",
  email: "info@assantilaw.com",
  addressLine1: "9841 Irvine Center Drive, Suite 100",
  addressLine2: "Irvine, CA 92618",
  jurisdiction:
    "We handle matters throughout California — from San Diego to the Oregon line.",
  recoveries: "Millions in Client Career Recoveries",
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 4:00 PM" },
    { days: "Saturday", time: "By appointment" },
    { days: "Sunday", time: "Closed" },
  ],
} as const;

export const NAV = [
  { to: "/about" as const, label: "Firm" },
  { to: "/practice" as const, label: "Practice" },
  { to: "/intake" as const, label: "Intake" },
  { to: "/contact" as const, label: "Contact" },
];

export const PRACTICE_AREAS = [
  {
    id: "motorcycle",
    title: "Motorcycle crashes",
    image: "/photos/motorcycle-crash.jpg",
    summary:
      "Left-turn collisions, lane-splitting disputes, and rider-down claims against careless drivers.",
    body: "Motorcycle cases turn on speed, sight lines, and the habits of people who do not see riders. We try these matters, and we ride. From the first call we preserve the bike, the scene, and the electronic data that insurance companies hope you will not ask for.",
  },
  {
    id: "auto",
    title: "Automobile collisions",
    image: "/photos/auto-accident.jpg",
    summary:
      "Multi-vehicle wrecks, commercial trucks, rideshare, and uninsured motorists across California highways.",
    body: "A wreck on a California freeway is rarely simple. We handle liability, medical specials, and underinsured-motorist claims for people who were in cars, on bikes, or standing on the shoulder when someone else failed to look.",
  },
  {
    id: "roadway",
    title: "Roadway defects",
    image: "/photos/roadway-defect.jpg",
    summary:
      "Potholes, uneven pavement, failed drainage, missing signs, and dangerous public property.",
    body: "A rider should not pay for a road that was left to fail. California public-entity claims have short notice windows. We move immediately on Government Claims Act deadlines, inspect the defect, and hold the responsible agency or contractor to account.",
  },
] as const;

export const STATS = [
  { value: "Millions", label: "in Client Career Recoveries" },
  { value: "30 years", label: "in California trial practice" },
  { value: "Statewide", label: "matters throughout California" },
  { value: "The only", label: "trial lawyer with a professional racing background" },
] as const;

export const JOURNAL = [
  {
    src: "/photos/team-plaza.jpg",
    alt: "Counsel outside the Irvine office",
    caption: "Irvine",
  },
  {
    src: "/photos/courthouse-trio.jpg",
    alt: "Counsel conferring at the courthouse",
    caption: "On the record",
  },
  {
    src: "/photos/championships.jpg",
    alt: "Championship number plates",
    caption: "Superbike titles",
  },
  {
    src: "/photos/conference.jpg",
    alt: "Conference room working session",
    caption: "Intake",
  },
] as const;
