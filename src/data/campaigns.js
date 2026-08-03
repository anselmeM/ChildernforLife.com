import cleanEnergy from '../assets/clean_energy.jpg';
import cleanWater from '../assets/clean_water.jpg';
import ugirlsGraduation from '../assets/ugirls_graduation.jpg';
import cleanEnergyCard from '../assets/clean_energy.card.webp';
import cleanWaterCard from '../assets/clean_water.card.webp';
import ugirlsGraduationCard from '../assets/ugirls_graduation.card.webp';

// Fundraising campaigns. `goal` and `raised` are USD and are updated by the
// organization as donations come in (Stripe can sum by campaign metadata once
// live). Progress bars render on /campaigns and /campaigns/:slug. Add a new
// campaign by appending an entry here — no component changes needed.
export const campaigns = [
  {
    slug: 'solar-powered-futures',
    name: 'Solar-Powered Futures',
    tagline: 'Light up a home, a classroom, a future.',
    goal: 40000,
    raised: 26500,
    img: cleanEnergy,
    imgCard: cleanEnergyCard,
    body: [
      'Kerosene lamps are dim, expensive, and dangerous — and they steal study hours from children every single night. Our solar initiative installs safe lighting and small solar systems in children\'s homes and schools across our program areas.',
      'With reliable light, children can revise after dark, families stop spending scarce income on fuel, and schools can run evening classes. Each installation is maintained by trained local technicians so the light stays on.',
      'Your gift powers a child\'s study hours today — and the skills of the community technicians who keep the systems running for years.',
    ],
  },
  {
    slug: 'clean-water-schools',
    name: 'Clean Water for Schools',
    tagline: 'Clean water. More children in class.',
    goal: 25000,
    raised: 18200,
    img: cleanWater,
    imgCard: cleanWaterCard,
    body: [
      'For many schools, the day begins with a long walk to collect water — often dirty water. Time spent fetching and time lost to waterborne illness keeps children out of the classroom.',
      'We install solar-powered water filtration systems directly on school grounds, trained locally for maintenance. In Morogoro, absenteeism and waterborne disease dropped by 90% within the first year.',
      'Help us bring that result to the next school: every system serves hundreds of children for a decade or more.',
    ],
  },
  {
    slug: 'girls-stem-scholarships',
    name: 'Girls in STEM Scholarships',
    tagline: 'When girls learn, whole communities rise.',
    goal: 60000,
    raised: 31750,
    img: ugirlsGraduation,
    imgCard: ugirlsGraduationCard,
    body: [
      'Across our program areas, girls are still the first to lose out when families must choose who attends school. The U-GIRLS initiative changes that math with scholarships, mentoring, and STEM-focused support.',
      'Scholarships cover tuition, materials, and transport, while mentors — women working in science and technology — give recipients the guidance and confidence to stay the course.',
      'Every scholarship sends one more girl toward the lab, the workshop, or the classroom — and one more visible proof point for the generation behind her.',
    ],
  },
];

export const campaignBySlug = (slug) => campaigns.find((c) => c.slug === slug);
