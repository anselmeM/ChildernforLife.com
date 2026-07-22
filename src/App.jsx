import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const Donate = lazy(() => import('./pages/Donate'));
const DonateSuccess = lazy(() => import('./pages/DonateSuccess'));
const Login = lazy(() => import('./pages/Login'));
const Placements = lazy(() => import('./pages/actions/Placements'));
const Volunteer = lazy(() => import('./pages/actions/Volunteer'));
const VolunteerFAQ = lazy(() => import('./pages/actions/VolunteerFAQ'));
const Alumni = lazy(() => import('./pages/actions/Alumni'));
const DonateMonthly = lazy(() => import('./pages/actions/DonateMonthly'));
const DonateStocks = lazy(() => import('./pages/actions/DonateStocks'));
const Fundraise = lazy(() => import('./pages/actions/Fundraise'));
const LeaveLegacy = lazy(() => import('./pages/actions/LeaveLegacy'));
const TributeGifts = lazy(() => import('./pages/actions/TributeGifts'));
const BecomePartner = lazy(() => import('./pages/actions/BecomePartner'));
const Volunteering = lazy(() => import('./pages/programs/Volunteering'));
const GenderEquality = lazy(() => import('./pages/programs/GenderEquality'));
const EconomicResilience = lazy(() => import('./pages/programs/EconomicResilience'));
const ClimateAction = lazy(() => import('./pages/programs/ClimateAction'));
const StrategicPlan = lazy(() => import('./pages/programs/StrategicPlan'));
const WhoWeAre = lazy(() => import('./pages/about/WhoWeAre'));
const Competencies = lazy(() => import('./pages/about/Competencies'));
const Team = lazy(() => import('./pages/about/Team'));
const Board = lazy(() => import('./pages/about/Board'));
const Leadership = lazy(() => import('./pages/about/Leadership'));
const Careers = lazy(() => import('./pages/about/Careers'));
const SallyStory = lazy(() => import('./pages/misc/SallyStory'));
const ImpactStories = lazy(() => import('./pages/misc/ImpactStories'));
const News = lazy(() => import('./pages/misc/News'));
const Publications = lazy(() => import('./pages/misc/Publications'));
const Accountability = lazy(() => import('./pages/misc/Accountability'));
const AtAGlance = lazy(() => import('./pages/regions/AtAGlance'));
const WhereWeWork = lazy(() => import('./pages/regions/WhereWeWork'));
const CountryPage = lazy(() => import('./pages/regions/CountryPage'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#005c7a] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function LazyPage({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

function SkipLink() {
  return (
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#005c7a] focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:font-bold focus:outline-none focus:ring-2 focus:ring-[#ffc72c]">
      Skip to main content
    </a>
  );
}

function Layout({ children }) {
  return (
    <>
      <SkipLink />
      <Navbar />
      <ErrorBoundary>
        <main id="main-content">{children}</main>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><LazyPage><Home /></LazyPage></Layout>} />
      <Route path="/login" element={<Layout><LazyPage><Login /></LazyPage></Layout>} />
      <Route path="/donate" element={<Layout><LazyPage><Donate /></LazyPage></Layout>} />
      <Route path="/donate/monthly" element={<Layout><LazyPage><DonateMonthly /></LazyPage></Layout>} />
      <Route path="/donate/stocks" element={<Layout><LazyPage><DonateStocks /></LazyPage></Layout>} />
      <Route path="/donate/success" element={<Layout><LazyPage><DonateSuccess /></LazyPage></Layout>} />
      <Route path="/placements" element={<Layout><LazyPage><Placements /></LazyPage></Layout>} />
      <Route path="/volunteer" element={<Layout><LazyPage><Volunteer /></LazyPage></Layout>} />
      <Route path="/volunteer-faq" element={<Layout><LazyPage><VolunteerFAQ /></LazyPage></Layout>} />
      <Route path="/alumni" element={<Layout><LazyPage><Alumni /></LazyPage></Layout>} />
      <Route path="/fundraise" element={<Layout><LazyPage><Fundraise /></LazyPage></Layout>} />
      <Route path="/leave-legacy" element={<Layout><LazyPage><LeaveLegacy /></LazyPage></Layout>} />
      <Route path="/tribute-gifts" element={<Layout><LazyPage><TributeGifts /></LazyPage></Layout>} />
      <Route path="/partner" element={<Layout><LazyPage><BecomePartner /></LazyPage></Layout>} />
      <Route path="/programs/volunteering" element={<Layout><LazyPage><Volunteering /></LazyPage></Layout>} />
      <Route path="/programs/gender" element={<Layout><LazyPage><GenderEquality /></LazyPage></Layout>} />
      <Route path="/programs/economic" element={<Layout><LazyPage><EconomicResilience /></LazyPage></Layout>} />
      <Route path="/programs/climate" element={<Layout><LazyPage><ClimateAction /></LazyPage></Layout>} />
      <Route path="/programs/strategic" element={<Layout><LazyPage><StrategicPlan /></LazyPage></Layout>} />
      <Route path="/about/who" element={<Layout><LazyPage><WhoWeAre /></LazyPage></Layout>} />
      <Route path="/about/competencies" element={<Layout><LazyPage><Competencies /></LazyPage></Layout>} />
      <Route path="/about/team" element={<Layout><LazyPage><Team /></LazyPage></Layout>} />
      <Route path="/about/board" element={<Layout><LazyPage><Board /></LazyPage></Layout>} />
      <Route path="/about/leadership" element={<Layout><LazyPage><Leadership /></LazyPage></Layout>} />
      <Route path="/about/careers" element={<Layout><LazyPage><Careers /></LazyPage></Layout>} />
      <Route path="/stories/sally" element={<Layout><LazyPage><SallyStory /></LazyPage></Layout>} />
      <Route path="/impact-stories" element={<Layout><LazyPage><ImpactStories /></LazyPage></Layout>} />
      <Route path="/news" element={<Layout><LazyPage><News /></LazyPage></Layout>} />
      <Route path="/publications" element={<Layout><LazyPage><Publications /></LazyPage></Layout>} />
      <Route path="/accountability" element={<Layout><LazyPage><Accountability /></LazyPage></Layout>} />
      <Route path="/regions/glance" element={<Layout><LazyPage><AtAGlance /></LazyPage></Layout>} />
      <Route path="/regions/where" element={<Layout><LazyPage><WhereWeWork /></LazyPage></Layout>} />
      <Route path="/regions/:slug" element={<Layout><LazyPage><CountryPage /></LazyPage></Layout>} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/ChildernforLife.com">
      <AppRoutes />
    </BrowserRouter>
  );
}
