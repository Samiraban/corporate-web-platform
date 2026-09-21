import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import ScrollProgress from './components/ScrollProgress';
import ChatbotMount from './components/ChatbotMount';

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
import ForgotPassword from './admin/pages/ForgotPassword';
import ResetPassword from './admin/pages/ResetPassword';
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

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.16, ease: 'easeOut' },
  },
};

function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-w-0"
    >
      {children}
    </motion.div>
  );
}

function PublicPage({ Component }) {
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
      {!isAdmin && <ScrollProgress />}
      {!isAdmin && <ChatbotMount />}

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PublicPage Component={Home} />} />
          <Route path="/about" element={<Navigate to="/about/who-we-are" replace />} />
          <Route path="/about/who-we-are" element={<PublicPage Component={WhoWeAre} />} />
          <Route path="/about/our-values" element={<PublicPage Component={OurValues} />} />
          <Route path="/about/how-we-work" element={<PublicPage Component={HowWeWork} />} />
          <Route path="/about/our-network" element={<PublicPage Component={OurNetwork} />} />
          <Route path="/companies" element={<PublicPage Component={Companies} />} />
          <Route path="/companies/:slug" element={<PublicPage Component={CompanyDetail} />} />
          <Route path="/industries" element={<PublicPage Component={Industries} />} />
          <Route path="/services" element={<PublicPage Component={Services} />} />
          <Route path="/services/:slug" element={<PublicPage Component={ServiceDetail} />} />
          <Route path="/projects" element={<PublicPage Component={Projects} />} />
          <Route path="/projects/:slug" element={<PublicPage Component={ProjectDetail} />} />
          <Route path="/blog" element={<PublicPage Component={Blog} />} />
          <Route path="/blog/:slug" element={<PublicPage Component={BlogDetail} />} />
          <Route path="/news" element={<PublicPage Component={News} />} />
          <Route path="/news/:slug" element={<PublicPage Component={NewsDetail} />} />
          <Route path="/team" element={<PublicPage Component={Team} />} />
          <Route path="/team/culture" element={<PublicPage Component={TeamCulture} />} />
          <Route path="/careers" element={<PublicPage Component={Careers} />} />
          <Route path="/careers/:slug" element={<PublicPage Component={JobDetail} />} />
          <Route path="/documents" element={<PublicPage Component={Documents} />} />
          <Route path="/contact" element={<PublicPage Component={Contact} />} />
          <Route path="/search" element={<PublicPage Component={SearchPage} />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/reset-password/:token" element={<ResetPassword />} />

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
            <Route
              path="users"
              element={
                <ProtectedRoute roles={['admin']}>
                  <UsersAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="audit-logs"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AuditLogAdmin />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<PublicPage Component={NotFound} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
