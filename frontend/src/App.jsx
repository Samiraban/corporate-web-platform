import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PublicLayout from './layouts/PublicLayout';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import WhoWeAre from './pages/about/WhoWeAre';
import OurValues from './pages/about/OurValues';
import HowWeWork from './pages/about/HowWeWork';
import OurNetwork from './pages/about/OurNetwork';
import Companies from './pages/Companies';
import CompanyDetail from './pages/CompanyDetail';
import Industries from './pages/Industries';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import { News, NewsDetail } from './pages/News';
import Team from './pages/Team';
import TeamCulture from './pages/TeamCulture';
import Careers from './pages/Careers';
import JobDetail from './pages/JobDetail';
import Documents from './pages/Documents';
import Contact from './pages/Contact';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';

import AdminLogin from './admin/pages/Login';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import CompaniesAdmin from './admin/pages/CompaniesAdmin';
import ServicesAdmin from './admin/pages/ServicesAdmin';
import ProjectsAdmin from './admin/pages/ProjectsAdmin';
import BlogAdmin from './admin/pages/BlogAdmin';
import NewsAdmin from './admin/pages/NewsAdmin';
import CareersAdmin from './admin/pages/CareersAdmin';
import DocumentsAdmin from './admin/pages/DocumentsAdmin';
import MediaAdmin from './admin/pages/MediaAdmin';
import InquiriesAdmin from './admin/pages/InquiriesAdmin';
import UsersAdmin from './admin/pages/UsersAdmin';
import AuditLogAdmin from './admin/pages/AuditLogAdmin';
import SimpleModulesAdmin from './admin/pages/SimpleModulesAdmin';
import CustomCursor from './components/CustomCursor';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function withLayout(Component) {
  return (
    <PublicLayout>
      <PageTransition>
        <Component />
      </PageTransition>
    </PublicLayout>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <Preloader />
<CustomCursor />
{!isAdmin && <ScrollProgress />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public site */}
          <Route path="/" element={withLayout(Home)} />
          <Route path="/about" element={<Navigate to="/about/who-we-are" replace />} />
          <Route path="/about/who-we-are" element={withLayout(WhoWeAre)} />
          <Route path="/about/our-values" element={withLayout(OurValues)} />
          <Route path="/about/how-we-work" element={withLayout(HowWeWork)} />
          <Route path="/about/our-network" element={withLayout(OurNetwork)} />
          <Route path="/companies" element={withLayout(Companies)} />
          <Route path="/companies/:slug" element={withLayout(CompanyDetail)} />
          <Route path="/industries" element={withLayout(Industries)} />
          <Route path="/services" element={withLayout(Services)} />
          <Route path="/services/:slug" element={withLayout(ServiceDetail)} />
          <Route path="/projects" element={withLayout(Projects)} />
          <Route path="/projects/:slug" element={withLayout(ProjectDetail)} />
          <Route path="/blog" element={withLayout(Blog)} />
          <Route path="/blog/:slug" element={withLayout(BlogDetail)} />
          <Route path="/news" element={withLayout(News)} />
          <Route path="/news/:slug" element={withLayout(NewsDetail)} />
          <Route path="/team" element={withLayout(Team)} />
          <Route path="/team/culture" element={withLayout(TeamCulture)} />
          <Route path="/careers" element={withLayout(Careers)} />
          <Route path="/careers/:slug" element={withLayout(JobDetail)} />
          <Route path="/documents" element={withLayout(Documents)} />
          <Route path="/contact" element={withLayout(Contact)} />
          <Route path="/search" element={withLayout(SearchPage)} />

          {/* Admin panel — no page-transition wrapper, kept snappy for data work */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="companies" element={<CompaniesAdmin />} />
            <Route path="services" element={<ServicesAdmin />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="news" element={<NewsAdmin />} />
            <Route path="careers" element={<CareersAdmin />} />
            <Route path="documents" element={<DocumentsAdmin />} />
            <Route path="media" element={<MediaAdmin />} />
            <Route path="inquiries" element={<InquiriesAdmin />} />
            <Route path="industries" element={<SimpleModulesAdmin module="industries" />} />
            <Route path="awards" element={<SimpleModulesAdmin module="awards" />} />
            <Route path="partners" element={<SimpleModulesAdmin module="partners" />} />
            <Route path="testimonials" element={<SimpleModulesAdmin module="testimonials" />} />
            <Route path="faqs" element={<SimpleModulesAdmin module="faqs" />} />
            <Route path="team" element={<SimpleModulesAdmin module="team" />} />
            <Route path="users" element={<ProtectedRoute roles={['admin']}><UsersAdmin /></ProtectedRoute>} />
            <Route path="audit-logs" element={<ProtectedRoute roles={['admin']}><AuditLogAdmin /></ProtectedRoute>} />
          </Route>

          <Route path="*" element={withLayout(NotFound)} />
        </Routes>
      </AnimatePresence>
    </>
  );
}