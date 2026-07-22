import heroStudents from '../assets/hero_students.png';
import ugirlsGraduation from '../assets/ugirls_graduation.png';
import sallyStory from '../assets/sally_story.png';
import monthlyGiving from '../assets/monthly_giving.png';
import cleanWater from '../assets/clean_water.png';
import cleanEnergy from '../assets/clean_energy.png';
import tanzaniaTLed from '../assets/tanzania_t_led.png';

const countryData = {
  benin: {
    name: "Benin",
    subtitle: "Advancing gender equality and social inclusion by strengthening the resilience of women, youth and local institutions.",
    stats: { partners: "15", volunteers: "35", trained: "18", lives: "11,820" },
    solutions: [
      { tab: "Strengthening Girls' Secondary Education", title: "Sharing Skills to Improve Girls' Education and Leadership", desc: "Our volunteers partner with local secondary schools to build teacher training workshops, introduce digital learning systems, and deliver girl-focused mentorship." },
      { tab: "Improving Maternal and Child Health", title: "Reinforcing Clinic Capacity and Solar Equipment", desc: "We deploy solar vaccine refrigeration systems and train clinic technicians on equipment upkeep, ensuring secure maternal care." },
      { tab: "Developing Sustainable Livelihoods", title: "Empowering Rural Women's Collectives", desc: "Providing vocational training, agricultural crop tools, and digital accounting systems to boost local farming incomes." }
    ],
    voices: [
      { text: "The solar lights and training helped our teachers prep classes at night, and girls are staying in school longer.", name: "Marie-Therese, School Director" },
      { text: "Through the sanitation program, we built secure toilets that restored safety and dignity for our girls.", name: "Aminata, Student Representative" }
    ],
    bg: cleanWater
  },
  cameroon: {
    name: "Cameroon",
    subtitle: "Empowering rural communities through sustainable agriculture, clean water access, and entrepreneurship.",
    stats: { partners: "22", volunteers: "48", trained: "32", lives: "24,500" },
    solutions: [
      { tab: "Sustainable Agriculture", title: "Climate-Smart Farming & Irrigation Systems", desc: "Training local farming groups on soil conservation, solar drip-irrigation, and secure packaging to protect yields." },
      { tab: "WASH Projects", title: "Delivering Safe Drinking Water", desc: "Constructing handwashing stations and piping clean spring water directly to primary schools and maternity wards." },
      { tab: "Micro-Business Grants", title: "Youth Livelihoods & Technical Workshops", desc: "Supporting youths with solar cell assembly courses, sewing equipment, and basic accounting software." }
    ],
    voices: [
      { text: "Clean spring water at school means our children no longer fall sick from typhoid. Class attendance has doubled.", name: "Principal Joseph, Primary School" },
      { text: "The drip-irrigation training let us harvest vegetables throughout the dry season, tripling our household revenue.", name: "Florence, Cooperative Member" }
    ],
    bg: cleanEnergy
  },
  congo: {
    name: "Democratic Republic of the Congo",
    subtitle: "Enhancing health clinic resilience, emergency WASH installations, and vocational opportunities.",
    stats: { partners: "18", volunteers: "29", trained: "12", lives: "38,900" },
    solutions: [
      { tab: "Emergency WASH Support", title: "Water Sanitation and Hygiene in Vulnerable Zones", desc: "Deploying rapid-response chlorine water filtration blocks and hygiene training in temporary settlements." },
      { tab: "Solar Medical Supplies", title: "Powering Maternity Wards and General Care", desc: "Installing durable solar panels on rural clinic roofs, guaranteeing 24/7 power for deliveries and diagnostics." },
      { tab: "Community Leadership", title: "Developing Local Committee Management", desc: "Training clean water committees to collect utility fees and perform technical pump repairs independently." }
    ],
    voices: [
      { text: "We used to deliver babies under candlelight. Now, the solar lighting gives us constant visibility and safety.", name: "Midwife Beatrice, Clinic Supervisor" },
      { text: "Having a clean water tap in our sector has freed up three hours daily for our children to study.", name: "Alphonse, Community Leader" }
    ],
    bg: ugirlsGraduation
  },
  ethiopia: {
    name: "Ethiopia",
    subtitle: "Improving secondary education access, girls' mentorship, and clean water security in rural highlands.",
    stats: { partners: "26", volunteers: "52", trained: "41", lives: "43,100" },
    solutions: [
      { tab: "Girls' STEM Development", title: "U-GIRLS 2 Science and Mathematics Pipelines", desc: "Providing tablets, libraries, textbooks, and mentoring to help young high-school girls prepare for university entry." },
      { tab: "Water System Repairs", title: "Highland Gravity-Fed Water Pipelines", desc: "Collaborating with local engineers to lay down pipelines sourcing pure water from highland springs down to schools." },
      { tab: "Teacher Development", title: "Gender-Responsive Pedagogy Training", desc: "Training teachers to foster inclusive class environments where girls are encouraged to participate and lead." }
    ],
    voices: [
      { text: "The U-GIRLS 2 program gave me the textbooks and solar study lights I needed. Now, I have been accepted to study Engineering.", name: "Selam, Scholarship Graduate" },
      { text: "Our teachers now encourage girls to sit in front and lead class discussions, boosting self-confidence.", name: "Abebe, Secondary School Principal" }
    ],
    bg: heroStudents
  },
  nigeria: {
    name: "Nigeria",
    subtitle: "Boosting youth vocational employment, digital literacy, and women-led cooperative enterprises.",
    stats: { partners: "31", volunteers: "64", trained: "55", lives: "62,400" },
    solutions: [
      { tab: "Digital Trade Skills", title: "Vocational Mobile App & Technical Training", desc: "Training youth in basic programming, computer repair, and solar microgrid installations to address unemployment." },
      { tab: "Women-Led Agro-Allied", title: "Cassava Processing & Business Consulting", desc: "Providing cooperative food mills and business training to help women farmers process and market agricultural products." },
      { tab: "Sanitation Safety", title: "School Latrines & Sanitation Workshops", desc: "Rebuilding modern latrines with handwashing pods and introducing health monitors inside schools." }
    ],
    voices: [
      { text: "The solar installation course helped me secure an apprenticeship in my home city. I can now support my family.", name: "Tunde, Vocational Graduate" },
      { text: "Our agricultural mill lets us grind cassava in minutes instead of hours, saving time and doubling profits.", name: "Funmi, Cooperative President" }
    ],
    bg: monthlyGiving
  },
  tanzania: {
    name: "Tanzania",
    subtitle: "Advancing educational mentorship, solar power solutions for remote wards, and agricultural resilience.",
    stats: { partners: "35", volunteers: "78", trained: "62", lives: "74,200" },
    solutions: [
      { tab: "Boosting Inclusive Growth for SMEs", title: "Tanzania Local Enterprise Development (T-LED) project", desc: "The T-LED initiative sought to increase sustainable employment for women and men working in small and medium-sized enterprises (SMEs) and improve the delivery of market-driven and gender responsive business development and financial services to SMEs.", img: tanzaniaTLed },
      { tab: "Advancing Gender Equity and Economic Access", title: "Advancing Gender Equity and Economic Access", desc: "Supporting women and youth to gain equal access to employment, entrepreneurship opportunities, and financial resources across various regions in Tanzania.", img: ugirlsGraduation },
      { tab: "Improving Maternal and Child Health Services", title: "Improving Maternal and Child Health Services", desc: "Strengthening rural health systems, training midwives, and deploying solar energy setups to guarantee secure, constant maternity clinic services.", img: cleanEnergy },
      { tab: "Strengthening Gender-Responsive RMNCH and SRHR Services", title: "Strengthening Gender-Responsive RMNCH and SRHR Services", desc: "Improving sexual and reproductive health rights and services through local partnership and community advocacy programs.", img: monthlyGiving },
      { tab: "Fostering inclusive community engagement", title: "Fostering inclusive community engagement", desc: "Mobilizing local leadership, promoting youth-led advocacy, and ensuring that community growth benefits all groups.", img: sallyStory }
    ],
    voices: [
      { text: "The solar microgrid gives our children light to read at night. Their national exam scores have risen dramatically.", name: "Mwalimu Juma, Head Teacher" },
      { text: "Before, we had to travel miles for water. The school rainwater tank has given us water security next door.", name: "Sally, Resident Beneficiary" }
    ],
    bg: sallyStory
  }
};

export function getCountry(slug) {
  return countryData[slug] || countryData.benin;
}

export default countryData;
