import sallyStory from '../assets/sally_story.png';
import monthlyGiving from '../assets/monthly_giving.png';
import heroStudents from '../assets/hero_students.png';
import ugirlsGraduation from '../assets/ugirls_graduation.png';
import cleanEnergy from '../assets/clean_energy.png';
import cleanWater from '../assets/clean_water.png';

// News & updates. To publish a new article, add an entry here — no component
// changes needed. `body` is an array of paragraphs rendered on /news/:slug.
export const newsItems = [
  {
    slug: 'communique-update-tanzania-programs',
    title: 'Communiqué: Update on Tanzania Programs',
    tag: 'Policy',
    date: 'June 22, 2026',
    img: sallyStory,
    excerpt: 'A summary of recent program adjustments and commitments in Tanzania.',
    body: [
      'Children for Life has issued a communiqué updating partners and supporters on the status of its programs in Tanzania. The update reaffirms the organization\'s commitment to transparency as program teams align activities with community priorities.',
      'Program leaders continue to engage district authorities and community representatives to ensure services reach the children and families who need them most. Further details will be shared through the organization\'s regular reporting channels.',
    ],
  },
  {
    slug: 'supporters-reaffirm-clean-development',
    title: 'Supporters Reaffirm Commitment to Clean Development',
    tag: 'Fundraising',
    date: 'June 10, 2026',
    img: monthlyGiving,
    excerpt: 'Monthly donors step up to power sustainable energy and WASH projects.',
    body: [
      'A growing circle of monthly supporters has reaffirmed its commitment to clean development, funding solar installations and safe water systems across our program areas.',
      'Their recurring gifts allow communities to plan beyond short-term cycles, and enable our teams to maintain and repair equipment long after installation. Thank you to every donor who makes this possible.',
    ],
  },
  {
    slug: 'civil-society-rallies-ahead-global-justice-forums',
    title: 'Civil Society Rallies Ahead of Global Justice Forums',
    tag: 'Advocacy',
    date: 'June 3, 2026',
    img: heroStudents,
    excerpt: 'Partner organizations coordinate positions ahead of upcoming international forums.',
    body: [
      'Civil society organizations are rallying ahead of a series of global justice forums, coordinating positions on children\'s rights, climate resilience, and inclusive development.',
      'Children for Life is contributing field evidence from its programs to help ensure the voices of communities in East and Central Africa are represented in these conversations.',
    ],
  },
  {
    slug: 'what-supporters-want-executive-board-to-know',
    title: 'What Our Supporters Want the Executive Board to Know',
    tag: 'Opinion',
    date: 'May 25, 2026',
    img: ugirlsGraduation,
    excerpt: 'Supporters share priorities and feedback ahead of the board\'s planning cycle.',
    body: [
      'Ahead of the executive board\'s next planning cycle, supporters shared what matters most to them: long-term impact, honest reporting, and a focus on the most vulnerable children.',
      'The board will use this feedback as it reviews strategic priorities and resource allocation for the coming year.',
    ],
  },
  {
    slug: 'from-communities-to-stage-leadership-reflects',
    title: 'From Communities to the Stage: Leadership Reflects',
    tag: 'Profile',
    date: 'May 14, 2026',
    img: cleanEnergy,
    excerpt: 'A conversation with program leaders who began their journey in the communities they now serve.',
    body: [
      'Many of our program leaders began their journeys in the very communities they now serve. In this profile, they reflect on what that perspective means for their work.',
      'From navigating local languages to understanding family economics, their backgrounds shape how programs are designed — and how trust is built.',
    ],
  },
  {
    slug: 'long-term-assistance-remote-clinics',
    title: 'Ensuring Long-Term Assistance for Remote Clinics',
    tag: 'WASH',
    date: 'May 2, 2026',
    img: cleanWater,
    excerpt: 'Solar-powered water systems keep remote clinics and schools running.',
    body: [
      'Remote clinics and schools often struggle to maintain clean water access. Our WASH team is partnering with communities to install and service solar-powered systems that can be maintained locally.',
      'Early results show reduced waterborne illness and improved attendance — proof that durable infrastructure, not one-off aid, changes outcomes.',
    ],
  },
  {
    slug: 'listening-and-learning-sustainable-development',
    title: 'Listening and Learning: Sustainable Development Journeys',
    tag: 'Partnership',
    date: 'April 28, 2026',
    img: heroStudents,
    excerpt: 'Partners reflect on what makes development efforts last.',
    body: [
      'In a series of conversations with partners, one theme recurs: development lasts when communities lead. Listening comes before planning, and learning continues after projects close.',
      'We are applying these insights as we design the next generation of programs with local partners.',
    ],
  },
  {
    slug: 'mission-over-politics-capacity-building',
    title: 'Mission Over Politics: Why Capacity Building Matters',
    tag: 'Insight',
    date: 'April 15, 2026',
    img: sallyStory,
    excerpt: 'Investing in local capacity keeps programs grounded in mission.',
    body: [
      'Programs that endure are the ones built on local capacity. By investing in training, systems, and local leadership, we keep our mission — not external politics — at the center of decision-making.',
      'Capacity building is slower than delivering aid, but it is what allows communities to continue long after external funding ends.',
    ],
  },
  {
    slug: 'strategic-plan-launch-approaching-highlights',
    title: 'Strategic Plan Launch Approaching: Highlights',
    tag: 'Strategy',
    date: 'March 30, 2026',
    img: ugirlsGraduation,
    excerpt: 'A preview of priorities as the organization prepares its next strategic plan.',
    body: [
      'As the launch of our next strategic plan approaches, we are sharing highlights: deeper investment in girls\' education, climate-resilient programming, and stronger local partnerships.',
      'The full plan will be published alongside our accountability and annual reporting materials.',
    ],
  },
];

export const newsTags = ['All', ...new Set(newsItems.map((n) => n.tag))];

export function getNewsBySlug(slug) {
  return newsItems.find((n) => n.slug === slug);
}
