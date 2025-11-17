// src/App.jsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// All case studies live here.

const CASE_STUDIES = [
  {
    id: "cs1",
    heading: "DESIGN",
    title: "Designing a Cohesive Digital Presence",
    cardLabel: "Brand & Web · Portfolio Web App",
    description:
      "A modern, responsive portfolio experience built to showcase my work as a Creative Lead and UX/UI designer. The project focuses on clear information hierarchy, reusable components, and a cohesive visual system that ties together brand, layout, and interactions.",
    company: "Personal Project",
    services: "Brand, UX/UI Design, Front-End Development",
    websiteLink: "#", // update with your live URL
    thumbnail: "/PortThumb.png",
    images: {
      main: "/PortThumb.png",
      brand: "/PortGuides.png",
      components: "/PortComponentGuides.png",
      workPage: "/PortWorkPage.jpg",
      aboutPage: "/PortAboutPage.jpg",
      coding: "/Coding.png",
    },
  },
  {
    id: "cs2",
    heading: "BRAND",
    title: "Simplifying a Complex Registration Flow",
    cardLabel: "Product / Experience · Registration Platform",
    description:
      "A complete rethink of a complex multi-enrollment flow for a global meditation organization. I aligned the experience with existing design standards, introduced an accessible visual system, and worked closely with DevOps to ship a pixel-perfect, maintainable build.",
    company: "Global Meditation Organization",
    services:
      "UX Design, Interaction Design, Design Systems, Cross-functional Collaboration",
    websiteLink: "#", // update if you have a live link
    thumbnail: "/Desktop.jpg",
    prototypeUrl:
      "https://www.figma.com/proto/HUQaGQTnjLwtaBC14GS83y/DR-Confirm-Page?node-id=61-41&p=f&viewport=283%2C42%2C0.09&t=o0YVhBp1YL1VhDWG-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=69%3A1663&show-proto-sidebar=1",
    images: {
      main: "/Desktop.jpg", // desktop “after” hero
      before: "/BeforeDR.jpg",
      after: "/320px Multi-Enroll. Expanded.jpg",
      orgStandards: "/Dhammaorg Design Standards.jpg",
      guides: "/DRConfirmComponentGuide.png",
      grid: "/GridGuide.png",
      dev1: "/Working w Jeremy 1.png",
      dev2: "/Working w Jeremy 2.png",
      userFlow: "/userflow prototype.png", // you can rename if needed
    },
  },
  {
    id: "cs3",
    heading: "IMPACT",
    title: "Launching a Flagship PC Cable Line",
    cardLabel: "E-commerce · Product Creative & Growth",
    description:
      "Creative direction and growth strategy for linkup’s custom-colour braided power cables—one of the brand’s best-selling products. I helped spearhead the idea, led the visual identity, photography and video, and supported ongoing performance marketing across YouTube, Amazon and social.",
    company: "linkup",
    services:
      "Creative Direction, Photography, Video, Brand, Performance Marketing",
    websiteLink: "#", // add a product / Amazon / site link if you have one
    thumbnail: "/Linkup1.png", // hero cable shot
    videoUrl: "https://www.youtube.com/embed/KM4oH3tTYPY", // embed URL
    images: {
      main: "/Linkup1.png", // hero product shot
      brand1: "/Linkup2.jpg", // brand content variation
      brand2: "/Linkup3.jpg", // another variation

      // Marketing images – replace these with real file names when ready
      marketing1: "/linkup-marketing-1.jpg",
      marketing2: "/linkup-marketing-2.jpg",
      marketing3: "/linkup-marketing-3.jpg",
      marketing4: "/linkup-marketing-4.jpg",
    },
  },
];



const OTHER_WORK_GALLERY = [
  {
    id: "ow1",
    title: "Product 3D & Packaging Explorations",
    role: "Industrial / Visual Design",
    thumbnail: "/gallery-3d-product.jpg", // replace with your image
  },
  {
    id: "ow2",
    title: "Motion Graphics & Title Sequences",
    role: "After Effects / Video",
    thumbnail: "/gallery-motion.jpg",
  },
  {
    id: "ow3",
    title: "Print Collateral & On-Location Signage",
    role: "Print / Environmental",
    thumbnail: "/gallery-print-signage.jpg",
  },
];


const testimonialsData = [
  {
    name: "Maitreya Meshram",
    title: "Software Engineer, Digital Alliance",
    quote:
      "My passion for design and typography started when I was 15, doing large-scale mural and typographic art. It gave me a deep, hands-on understanding of form.",
  },
  {
    name: "Arabellas Barkow",
    title: "Project Manager, Bespoke Boheme",
    quote:
      "Patrick's attention to detail is unmatched. He has a unique ability to translate complex business requirements into elegant and intuitive user experiences.",
  },
  {
    name: "John Doe",
    title: "CEO, Startup Inc.",
    quote:
      "Working with Patrick was a game-changer for our brand. His strategic insights and design leadership directly contributed to our product's success in the market.",
  },
  {
    name: "Jane Smith",
    title: "Marketing Director, Creative Co.",
    quote:
      "He is a true professional. The design system he built for us was scalable, easy to use, and has dramatically improved our team's efficiency.",
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState("work");
  const [selectedProject, setSelectedProject] = useState(null);

  // introPhase: "start" -> "overshoot" -> "settled"
  const [introPhase, setIntroPhase] = useState("start");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // Scroll to top when switching pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Drive the intro timeline
  useEffect(() => {
    // Only run intro on the Work page
    if (currentPage !== "work") {
      setIntroPhase("settled");
      return;
    }

    setIntroPhase("start");

    const t1 = setTimeout(() => setIntroPhase("overshoot"), 150); // scale up
    const t2 = setTimeout(() => setIntroPhase("settled"), 1600);  // settle + open row 1

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentPage]);

  const handleModalNav = (page) => {
    setSelectedProject(null);
    setCurrentPage(page);
  };

  const isWork = currentPage === "work";

  return (
    <motion.div
      className="relative min-h-screen"
      initial={{ backgroundColor: "#262626" }}
      animate={{
        backgroundColor:
          introPhase === "start" || introPhase === "overshoot"
            ? "#262626"
            : isWork
            ? "#FFFFFF"
            : "#262626",
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Header fades in only when intro is finished */}
      <Header hidden={introPhase !== "settled"} />

      {!selectedProject && (
        <>
          <main>
            {isWork ? (
              <WorkPage
                introPhase={introPhase}
                onProjectSelect={setSelectedProject}
              />
            ) : (
              <AboutPage setCurrentPage={setCurrentPage} />
            )}
          </main>

          <div className="bg-dark-background pt-1 pb-24">
            <ContactSection />
            <Footer setCurrentPage={setCurrentPage} />
          </div>

          <BottomToggle
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onNav={handleModalNav}
        />
      )}
    </motion.div>
  );
}

// =================================================================================
// SHARED COMPONENTS
// =================================================================================

const Header = ({ hidden = false }) => (
  <header
    className={`
      bg-dark-background flex items-center h-[88px]
      max-mobile:h-auto max-mobile:py-4
      transition-opacity duration-500
      ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}
    `}
  >
    <div className="max-w-container w-full mx-auto px-4 lg:px-[110px] flex justify-between items-center max-mobile:flex-col max-mobile:justify-center max-mobile:gap-4">
      <p className="font-body text-base lg:text-lg text-white text-center">
        Patrick East <span className="text-primary-button">|</span>{" "}
        <span className="text-accent">Creative Lead & Product Designer</span>
      </p>

      {/* Get In Touch hidden below tablet (850px) */}
      <a href="#contact-section" className="hidden tablet:inline-block">
        <button className="px-6 py-2 rounded-md font-nav font-bold bg-white text-primary-button border-4 border-primary-button transition-all duration-300 hover:bg-primary-button hover:text-white">
          Get In Touch
        </button>
      </a>
    </div>
  </header>
);

const ContactSection = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "f1e833d4-3caf-4ecc-a5ac-4e2cb5781408");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully!");
      event.target.reset();
      setTimeout(() => setResult(""), 5000);
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

    return (
    <motion.section
      id="contact-section"
      className="bg-dark-background py-20 text-text-light"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-container mx-auto px-4 lg:px-[110px]">
        {/* everything inside here can stay exactly as you had it */}
        <h2 className="text-h2 font-heading text-center font-bold">
          Get in Touch
        </h2>
        <div className="w-20 h-1 bg-accent mx-auto mt-4 mb-8" />

        <div className="max-w-[576px] mx-auto">
          <p className="text-gray-400 mb-16 text-xl text-left">
            Have a project in mind or just want to say hello? I'd love to hear
            from you. Fill out the form below and I'll get back to you as soon as
            possible.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-16 max-tablet:grid-cols-1 max-tablet:gap-8">
          <div className="bg-med-background p-10 rounded-card text-text-dark max-lg:p-6 max-w-[576px] mx-auto w-full">
            <h3 className="font-heading font-bold text-h3 mb-4">
              Contact Information
            </h3>
            <p className="text-text-secondary mb-8">
              Feel free to reach out using any of the following methods.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4 shrink-0">
                  <Mail className="w-6 h-6 text-dark-background" />
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-text-secondary">info@prizmpix.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4 shrink-0">
                  <Phone className="w-6 h-6 text-dark-background" />
                </div>
                <div>
                  <p className="font-bold">Phone</p>
                  <p className="text-text-secondary">4377786388</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4 shrink-0">
                  <MapPin className="w-6 h-6 text-dark-background" />
                </div>
                <div>
                  <p className="font-bold">Location</p>
                  <p className="text-text-secondary">Toronto, ON. Canada</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-top border-gray-300 border-t">
              <p className="font-bold mb-4">Connect with me</p>
              <div className="flex space-x-4">
                <Instagram className="w-8 h-8 text-text-secondary hover:text-text-dark cursor-pointer" />
                <Facebook className="w-8 h-8 text-text-secondary hover:text-text-dark cursor-pointer" />
                <Linkedin className="w-8 h-8 text-text-secondary hover:text-text-dark cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="bg-med-background p-10 rounded-card text-text-dark flex flex-col justify-center max-lg:p-6 max-w-[576px] mx-auto w-full">
            <h3 className="font-heading font-bold text-h3 mb-4">
              Contact Form
            </h3>

            <form onSubmit={onSubmit} className="w-full mt-4 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-bold text-text-secondary"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full p-3 rounded-md border border-gray-300 text-text-dark"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-bold text-text-secondary"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full p-3 rounded-md border border-gray-300 text-text-dark"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 text-sm font-bold text-text-secondary"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  className="w-full p-3 rounded-md border border-gray-300 text-text-dark"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-button text-white font-bold py-3 rounded-md hover:bg-opacity-75"
              >
                Submit Form
              </button>
            </form>

            <span className="mt-4 text-center text-text-dark font-bold">
              {result}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Footer = ({ setCurrentPage, onNav }) => {
  const handleNav = onNav || setCurrentPage;

  return (
    <footer className="bg-dark-background text-text-light border-t border-gray-700">
      <div className="max-w-container mx-auto px-4 lg:px-[110px] py-16 grid grid-cols-1 tablet:grid-cols-3 gap-8 items-start text-center tablet:text-left">
        {/* Left column */}
        <div>
          <h4 className="font-heading font-bold text-2xl mb-4">Patrick East</h4>
          <p className="text-gray-400 max-w-md mx-auto tablet:mx-0">
            A passionate and results-driven creative lead with a deep
            understanding of form, composition, and user-centric design.
          </p>
        </div>

        {/* Middle column */}
        <div>
          <h4 className="font-heading font-bold text-2xl mb-4">Quick Links</h4>
          <ul className="text-gray-400 space-y-2">
            <li>
              <button
                onClick={() => handleNav("work")}
                className="hover:text-primary-button"
              >
                My Work
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav("about")}
                className="hover:text-primary-button"
              >
                About Me
              </button>
            </li>
            <li>
              <a href="#contact-section" className="hover:text-primary-button">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right column */}
        <div className="tablet:text-right flex flex-col justify-center tablet:items-end items-center">
          <p className="text-gray-400">All right reserved 2025</p>
        </div>
      </div>
    </footer>
  );
};


// =================================================================================
// BOTTOM TOGGLE – white pill, primary background
// =================================================================================

const BottomToggle = ({ currentPage, setCurrentPage }) => {
  const [hovered, setHovered] = useState(null); // 'work' | 'about' | null
  const visualTarget = hovered || currentPage;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="relative flex items-center bg-primary-button p-1 rounded-lg border border-primary-button shadow-lg overflow-hidden">
        {/* Sliding highlight pill */}
        <motion.div
          className="absolute inset-y-1 w-1/2 bg-white rounded-md border border-primary-button"
          initial={{ left: "0.25rem" }}
          animate={{ left: visualTarget === "work" ? "0.25rem" : "50%" }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
        />

        <button
          onClick={() => setCurrentPage("work")}
          onMouseEnter={() => setHovered("work")}
          onMouseLeave={() => setHovered(null)}
          className={`relative z-10 px-10 py-2 font-nav font-bold text-lg rounded-md transition-colors duration-300 ${
            visualTarget === "work" ? "text-primary-button" : "text-white"
          }`}
        >
          Work
        </button>

        <button
          onClick={() => setCurrentPage("about")}
          onMouseEnter={() => setHovered("about")}
          onMouseLeave={() => setHovered(null)}
          className={`relative z-10 px-10 py-2 font-nav font-bold text-lg rounded-md transition-colors duration-300 ${
            visualTarget === "about" ? "text-primary-button" : "text-white"
          }`}
        >
          About
        </button>
      </div>
    </div>
  );
};

// =================================================================================
// PROJECT MODAL – sticky close button, blinds rows
// =================================================================================

// =================================================================================
// PROJECT MODAL – sticky close button, blinds rows
// =================================================================================

const ProjectModal = ({ project, onClose, onNav }) => {
  if (!project) return null;

  const overviewAnimation = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  // Blinds-style reveal that waits until the row is properly in view
  const RowReveal = ({ children, delay = 0 }) => (
    <motion.div
      className="overflow-hidden origin-top"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{
        once: true,
        amount: 0.75, // waits until ~75% of the row is in view
      }}
      transition={{
        duration: 0.9,
        ease: [0.2, 0.8, 0.3, 1],
        delay,
      }}
      style={{ transformOrigin: "top" }}
    >
      <div className="will-change-transform">{children}</div>
    </motion.div>
  );

  return (
    <div className="fixed inset-x-0 bottom-0 top-[88px] z-40 bg-black/40 flex justify-center items-stretch">
      <motion.div
        className="relative bg-white w-full max-h-full overflow-y-auto"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {/* Sticky close strip */}
        <div className="sticky top-0 z-[60] flex justify-end bg-white/80 backdrop-blur-sm px-4 lg:px-[110px] pt-4 pb-2">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-300 bg-opacity-60 rounded-full flex items-center justify-center text-gray-800 hover:bg-opacity-80 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* MAIN CASE STUDY CONTENT */}
        <div className="max-w-container mx-auto px-4 lg:px-[110px] pt-8 pb-24">
          {/* Overview (hero copy) */}
          <motion.section
            className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8"
            {...overviewAnimation}
          >
            <div>
              <h1 className="text-h1 font-heading font-bold text-text-dark max-lg:text-h2">
                {project.title}
              </h1>
              {project.websiteLink && (
                <a
                  href={project.websiteLink}
                  className="text-body underline mt-4 inline-block text-text-secondary hover:text-text-dark"
                  target="_blank"
                  rel="noreferrer"
                >
                  Website link
                </a>
              )}
            </div>
            <p className="text-xl text-text-secondary">{project.description}</p>
          </motion.section>

          <div className="mt-20 space-y-10">
            {/* Shared hero image */}
            {project.images?.main && (
              <div className="bg-dark-background rounded-card p-6">
                <img
                  src={project.images.main}
                  alt={`${project.title} main visual`}
                  className="w-full h-auto block rounded-md shadow-lg"
                />
              </div>
            )}

            {/* ============================================================
               CS1 – Portfolio / personal site
               ============================================================ */}
            {project.id === "cs1" && (
              <>
                {/* Brand / style guides */}
                {project.images?.brand && (
                  <RowReveal>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.brand}
                          alt={`${project.title} brand / style guides`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Brand Development & Style Guides
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          I started by defining the visual language for the
                          portfolio—type hierarchy, spacing, and colour rules
                          designed to feel bold but minimal. These guides keep
                          the experience consistent as new pages and case
                          studies are added over time.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Component library */}
                {project.images?.components && (
                  <RowReveal>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:order-last max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Component Library & Layout System
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          The UI is built from a small, reusable component
                          system: hero layouts, project cards, testimonials, and
                          call-to-actions. That makes it easy to scale the site
                          without redesigning every screen, and keeps the
                          codebase clean and predictable.
                        </p>
                      </div>

                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.components}
                          alt={`${project.title} component library`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Coding / implementation view (VS Code) */}
                {project.images?.coding && (
                  <RowReveal>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.coding}
                          alt={`${project.title} code in VS Code`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Designed and Built in Code
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          The portfolio is hand-built in React with Framer
                          Motion driving the hero animations and project
                          transitions. I treated the codebase like a design
                          system—clean file structure, reusable helpers, and
                          animation primitives—so it&apos;s easy to extend for
                          new work and experiments.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Tall wireframes / page designs */}
                {(project.images?.workPage || project.images?.aboutPage) && (
                  <RowReveal>
                    <div className="grid grid-cols-2 gap-16 items-start max-lg:grid-cols-1 max-lg:gap-8">
                      {project.images?.workPage && (
                        <div className="bg-white rounded-card p-4 border border-gray-200">
                          <img
                            src={project.images.workPage}
                            alt={`${project.title} work page`}
                            className="w-full h-auto block rounded-md"
                          />
                        </div>
                      )}

                      {project.images?.aboutPage && (
                        <div className="bg-white rounded-card p-4 border border-gray-200">
                          <img
                            src={project.images.aboutPage}
                            alt={`${project.title} about page`}
                            className="w-full h-auto block rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </RowReveal>
                )}
              </>
            )}

            {/* ============================================================
               CS2 – Registration flow / meditation org
               ============================================================ */}
            {project.id === "cs2" && (
              <>
                {/* Before / After comparison */}
                {(project.images?.before || project.images?.after) && (
                  <RowReveal>
                    <div className="grid grid-cols-2 gap-16 items-start max-lg:grid-cols-1 max-lg:gap-8">
                      {project.images?.before && (
                        <div className="bg-white rounded-card p-4 border border-gray-200">
                          <img
                            src={project.images.before}
                            alt={`${project.title} – legacy multi-enrollment flow`}
                            className="w-full h-auto block rounded-md"
                          />
                          <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                            <span className="font-bold">Before:</span> the
                            original confirmation and enrollment management
                            screen (“BeforeDR.jpg”) was dense, visually dated,
                            and only loosely aligned with the organization&apos;s
                            design standards. Core actions were hard to spot,
                            forcing users to hunt through multiple controls just
                            to confirm or update their status.
                          </p>
                        </div>
                      )}

                      {project.images?.after && (
                        <div className="bg-white rounded-card p-4 border border-gray-200">
                          <img
                            src={project.images.after}
                            alt={`${project.title} – redesigned multi-enrollment flow (mobile)`}
                            className="w-full h-auto block rounded-md"
                          />
                          <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                            <span className="font-bold">After (mobile):</span>{" "}
                            the updated 320px multi-enroll screen (“320px
                            Multi-Enroll. Expanded.jpg”) introduces a clear
                            primary CTA, calmer hierarchy, and obvious
                            affordances. The desktop version of this redesign
                            (“Desktop.jpg”) mirrors the same structure and lives
                            in the hero image at the top of this case study.
                          </p>
                        </div>
                      )}
                    </div>
                  </RowReveal>
                )}

                {/* Design standards & alignment with the org */}
                {(project.images?.orgStandards || project.images?.guides) && (
                  <RowReveal delay={0.08}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      {project.images?.orgStandards && (
                        <div className="bg-white rounded-card p-4 border border-gray-200">
                          <img
                            src={project.images.orgStandards}
                            alt={`${project.title} – organization design standards`}
                            className="w-full h-auto block rounded-md"
                          />
                        </div>
                      )}

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Working Within a Global Design System
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          The organization already had a strong visual identity.
                          My job wasn&apos;t to reinvent it, but to apply it
                          correctly to a complex registration context. That
                          meant respecting locked trademarks, typography rules,
                          and colour usage while still making the interface feel
                          clearer and more modern.
                        </p>
                        <p className="text-xl text-text-secondary mt-4">
                          In fast-paced working sessions (often 15 minutes at a
                          time) with the design standards team and DevOps, I
                          walked stakeholders through why certain conventions
                          mattered—like keeping the logo lockup intact to avoid
                          diluting the brand and ensuring the system felt
                          cohesive across touchpoints.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Accessibility, colour, type & 8pt grid */}
                {(project.images?.guides || project.images?.grid) && (
                  <RowReveal delay={0.16}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:order-last max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Accessibility & Pixel-Perfect Structure
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          Every decision was grounded in usability:
                          left-aligned paragraph text for easier scanning and
                          reduced cognitive load, an explicit hierarchy of
                          primary and secondary CTAs to guide decisions, and
                          colour selections checked for contrast and
                          colour-blind accessibility.
                        </p>
                        <p className="text-xl text-text-secondary mt-4">
                          I specified an 8-point grid system and precise
                          spacing to make the handoff predictable for
                          engineering. Rather than &quot;approximate&quot; the
                          layout, the build team had a clear, repeatable pattern
                          for every padding, margin, and interaction state.
                        </p>
                      </div>

                      <div className="space-y-6">
                        {project.images?.guides && (
                          <div className="bg-white rounded-card p-4 border border-gray-200">
                            <img
                              src={project.images.guides}
                              alt={`${project.title} – component, colour, and typography guides`}
                              className="w-full h-auto block rounded-md"
                            />
                          </div>
                        )}
                        {project.images?.grid && (
                          <div className="bg-white rounded-card p-4 border border-gray-200">
                            <img
                              src={project.images.grid}
                              alt={`${project.title} – 8pt grid layout guide`}
                              className="w-full h-auto block rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Collaboration with DevOps / engineering */}
                {(project.images?.dev1 || project.images?.dev2) && (
                  <RowReveal delay={0.24}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-white rounded-card p-4 border border-gray-200 space-y-4">
                        {project.images?.dev1 && (
                          <img
                            src={project.images.dev1}
                            alt={`${project.title} – collaborating with DevOps (1)`}
                            className="w-full h-auto block rounded-md"
                          />
                        )}
                        {project.images?.dev2 && (
                          <img
                            src={project.images.dev2}
                            alt={`${project.title} – collaborating with DevOps (2)`}
                            className="w-full h-auto block rounded-md"
                          />
                        )}
                      </div>

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Fast, Cross-functional Delivery
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          I partnered closely with the registration DevOps team
                          to make sure the design was technically feasible and
                          easy to maintain. We iterated in short working
                          sessions, reviewing builds against the grid and
                          component specs until the implementation matched the
                          design one-to-one.
                        </p>
                        <p className="text-xl text-text-secondary mt-4">
                          These sessions weren&apos;t just about pixels—they
                          were about aligning on why each convention existed, so
                          engineers and designers were making the same
                          tradeoffs for the same reasons.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* User flow visual */}
                {project.images?.userFlow && (
                  <RowReveal delay={0.28}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.userFlow}
                          alt={`${project.title} – user flow prototype`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>
                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Mapping the End-to-End User Flow
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          I captured the full multi-enrollment journey in a
                          clickable prototype, focusing on how features like
                          rideshare, waitlist notifications, document uploads
                          and multiple enrollments show up in the right order
                          for the user—without overwhelming them with controls.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Figma prototype link */}
                {project.prototypeUrl && (
                  <RowReveal delay={0.32}>
                    <div className="bg-med-background p-8 rounded-card text-text-dark flex flex-col items-start gap-4">
                      <h3 className="text-h3 font-heading font-bold text-text-dark">
                        Interactive Prototype
                      </h3>
                      <p className="text-xl text-text-secondary">
                        An interactive Figma prototype made it easy to walk
                        stakeholders through the new flow in short, high-impact
                        sessions. Instead of debating static screens, we could
                        click through confirmations, cancellations and edge
                        cases exactly as users would experience them.
                      </p>
                      <a
                        href={project.prototypeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary-button text-white font-nav font-bold text-base hover:bg-opacity-90 transition-colors"
                      >
                        View Figma Prototype
                        <ArrowUpRight size={18} />
                      </a>
                    </div>
                  </RowReveal>
                )}
              </>
            )}

            {/* ============================================================
               CS3 – Linkup braided PC cables / flagship product
               ============================================================ */}
            {project.id === "cs3" && (
              <>
                {/* Brand / photography style */}
                {(project.images?.brand1 || project.images?.brand2) && (
                  <RowReveal>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="space-y-6">
                        {project.images?.brand1 && (
                          <div className="bg-white rounded-card p-4 border border-gray-200">
                            <img
                              src={project.images.brand1}
                              alt={`${project.title} – branded product photography 1`}
                              className="w-full h-auto block rounded-md"
                            />
                          </div>
                        )}
                        {project.images?.brand2 && (
                          <div className="bg-white rounded-card p-4 border border-gray-200">
                            <img
                              src={project.images.brand2}
                              alt={`${project.title} – branded product photography 2`}
                              className="w-full h-auto block rounded-md"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Building a Gaming-Ready Visual Language
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          I led the visual direction for linkup&apos;s braided
                          power cable line—shooting the hero photography and
                          working with an editing team to establish a consistent
                          look that fit comfortably alongside gaming and custom
                          PC brands.
                        </p>
                        <p className="text-xl text-text-secondary mt-4">
                          The goal was to position linkup as a serious option
                          for builders: bold colour, clean lighting, and a
                          repeatable style guide we could apply across Amazon,
                          the website, social, and future product launches.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Product video + logo animation */}
                {project.videoUrl && (
                  <RowReveal delay={0.08}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="aspect-video w-full bg-black rounded-card overflow-hidden">
                        <iframe
                          src={project.videoUrl}
                          title={`${project.title} product video`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          From Logo Animation to Launch Video
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          I partnered with a motion designer to create the
                          opening logo animation, then shot the product footage
                          myself and directed the edit, script and music
                          selection for this flagship video.
                        </p>
                        <p className="text-xl text-text-secondary mt-4">
                          The video became a key asset for product pages and
                          social campaigns, helping explain the value of custom
                          braided cables in a way that static images alone
                          couldn&apos;t.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Marketing image grid / performance angle */}
                {(project.images?.marketing1 ||
                  project.images?.marketing2 ||
                  project.images?.marketing3 ||
                  project.images?.marketing4) && (
                  <RowReveal delay={0.16}>
                    <div className="grid grid-cols-2 gap-16 max-lg:grid-cols-1 max-lg:gap-8 items-start">
                      <div className="grid grid-cols-2 gap-4 bg-white rounded-card p-4 border border-gray-200">
                        {project.images?.marketing1 && (
                          <img
                            src={project.images.marketing1}
                            alt={`${project.title} – marketing image 1`}
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                        {project.images?.marketing2 && (
                          <img
                            src={project.images.marketing2}
                            alt={`${project.title} – marketing image 2`}
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                        {project.images?.marketing3 && (
                          <img
                            src={project.images.marketing3}
                            alt={`${project.title} – marketing image 3`}
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                        {project.images?.marketing4 && (
                          <img
                            src={project.images.marketing4}
                            alt={`${project.title} – marketing image 4`}
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                      </div>

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Turning Creative into a Flagship Product
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          Beyond the visuals, I managed the YouTube channel,
                          Instagram, Facebook presence, Google Analytics and
                          Amazon PPC campaigns around this product line—helping
                          turn it into one of linkup&apos;s best sellers.
                        </p>
                        <p className="text-xl text-text-secondary mt-4">
                          The braided cable line became a flagship for the
                          brand: a clear example of how cohesive creative,
                          strong product positioning, and performance marketing
                          can combine to put a previously quiet hardware brand
                          on the radar for custom PC builders.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}
              </>
            )}
          </div>
        </div>

        {/* Global contact + footer at bottom of modal */}
        <div className="bg-dark-background">
          <ContactSection />
          <Footer onNav={onNav} />
        </div>
      </motion.div>
    </div>
  );
};




// =================================================================================
// WORK PAGE – headings animated on first load, blinds tied to intro
// =================================================================================

const WorkPage = ({ onProjectSelect, introPhase }) => {
  return (
    <div className="max-w-container mx-auto px-4 lg:px-[110px] py-12 text-text-dark">
      {/* Row 1 – DESIGN · Case Study 1 */}
      <WorkSection
        index={0}
        title="DESIGN"
        introPhase={introPhase}
        project={CASE_STUDIES[0]}
        onProjectSelect={onProjectSelect}
      />

      {/* Row 2 – BRAND · Case Study 2 */}
      <WorkSection
        index={1}
        title="BRAND"
        textAlign="right"
        introPhase={introPhase}
        project={CASE_STUDIES[1]}
        onProjectSelect={onProjectSelect}
      />

      {/* Row 3 – IMPACT · Case Study 3 */}
      <WorkSection
        index={2}
        title="IMPACT"
        introPhase={introPhase}
        project={CASE_STUDIES[2]}
        onProjectSelect={onProjectSelect}
      />

      {/* Bio block below case studies */}
      <div className="mt-16">
        <div className="max-w-[576px] mx-auto text-center">
          <h3 className="text-h3 font-bold font-heading">Patrick East</h3>
          <p className="mt-4 text-text-secondary text-xl text-left">
            My passion for design and typography started when I was 15, doing
            large-scale mural and typographic art. It gave me a deep, hands-on
            understanding of form, composition, and letter structure that I
            didn’t have a name for back then. It’s where I first learned to
            master the craft and earn respect. I’ve spent my entire professional
            career, from graphic design to UX, refining that same passion.
          </p>
        </div>
      </div>
    </div>
  );
};


const WorkSection = ({
  title,
  index,
  textAlign = "left",
  introPhase,
  project,
  onProjectSelect,
}) => {
  const isFirstRow = index === 0;

  // All three headings visible & clustered during intro
  const startOffsets = [-40, 0, 40];

  // Big overshoot: DESIGN high, BRAND middle, IMPACT lower
  const overshootOffsets = [-260, -540, -820];

  const headingVariants = {
    start: (i) => ({
      opacity: 0,
      scale: 0.45,
      y: startOffsets[i],
      color: "#FFFFFF",
    }),
    overshoot: (i) => ({
      opacity: 1,
      scale: 1.7,
      y: overshootOffsets[i],
      color: "#FFFFFF",
    }),
    settled: {
      opacity: 1,
      scale: 1,
      y: 0,
      color: "#262626", // text-text-dark
    },
  };

  const currentHeadingState =
    introPhase === "start" || introPhase === "overshoot"
      ? introPhase
      : "settled";

  const headingAnimate =
    currentHeadingState === "settled"
      ? headingVariants.settled
      : headingVariants[currentHeadingState](index);

  // Single-card row that stretches across the old 2-col space
  const gridClasses = `
    grid grid-cols-1
    mt-3
    max-tablet:mt-4
  `;

  return (
    <section
      className={`
        pt-4 mb-12
        ${textAlign === "right" ? "text-right" : "text-left"}
        max-lg:text-center
      `}
    >
      {/* Animated heading */}
      <motion.h1
        className={`
          text-h1-huge font-heading font-bold leading-none
          max-xl:text-[150px]
          max-tablet:text-[120px]
          max-mobile:text-[80px]
          tracking-[-0.06em]
        `}
        style={{ transformOrigin: "center center" }}
        custom={index}
        initial={headingVariants.start(index)}
        animate={headingAnimate}
        transition={{
          duration: introPhase === "overshoot" ? 1.0 : 0.8,
          ease: [0.2, 0.8, 0.3, 1],
        }}
      >
        {title}
      </motion.h1>

      {/* Cards / blinds */}
      {isFirstRow ? (
        // Row 1: tied to intro timeline — opens once headings settle
        <motion.div
          className={gridClasses}
          style={{ transformOrigin: "top" }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={
            introPhase === "settled"
              ? { opacity: 1, scaleY: 1 }
              : { opacity: 0, scaleY: 0 }
          }
          transition={{
            duration: 0.9,
            delay: introPhase === "settled" ? 0.15 : 0,
            ease: [0.2, 0.8, 0.3, 1],
          }}
        >
          <ProjectCard project={project} onSelect={onProjectSelect} />
        </motion.div>
      ) : (
        // Rows 2 & 3: blind-style open, no stretch/fade of content itself
        <motion.div
          className={gridClasses}
          style={{ transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{
            once: true,
            amount: 0.8, // waits until most of the row is visible
          }}
          transition={{
            duration: 1.1,
            delay: 0.45,
            ease: [0.2, 0.8, 0.3, 1],
          }}
        >
          <ProjectCard project={project} onSelect={onProjectSelect} />
        </motion.div>
      )}
    </section>
  );
};

const ProjectCard = ({ project, onSelect }) => {
  return (
    <motion.div
      className="group relative cursor-pointer w-full max-w-[1200px] mx-auto"
      whileHover={{ y: -6 }} // card lift
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={() => onSelect && onSelect(project)}
    >
      {/* Card container is the positioning context */}
      <div className="relative w-full h-[520px] bg-med-background rounded-3xl overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* CTA pill – same inset (24px) on left, right, and bottom */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect && onSelect(project);
          }}
          className="
            absolute left-6 right-6 bottom-6
            translate-y-full opacity-0
            group-hover:translate-y-0 group-hover:opacity-100
            bg-primary-button text-white rounded-card
            flex items-center justify-between gap-4
            px-6 py-3 shadow-lg
            transition-all duration-300
          "
        >
          <div className="text-left">
            <p className="font-nav font-bold text-lg leading-tight">
              {project.title}
            </p>
            {project.cardLabel && (
              <p className="text-sm opacity-80 mt-0.5">
                {project.cardLabel}
              </p>
            )}
          </div>
          <ArrowUpRight size={28} />
        </button>
      </div>
    </motion.div>
  );
};


// =================================================================================
// ABOUT PAGE
// =================================================================================

const AboutPage = ({ setCurrentPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialsData.length - 2 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= testimonialsData.length - 2 ? 0 : prev + 1
    );
  };

  const sectionAnimation = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div className="text-text-light">
      {/* HERO */}
      <motion.section
        className="relative max-w-container mx-auto px-4 lg:px-[110px] py-12 tablet:py-24 grid grid-cols-2 gap-16 items-center max-tablet:grid-cols-1"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* TEXT COLUMN */}
        <div className="max-tablet:order-last">
          <p className="font-nav text-primary-button bg-primary-button/50 px-4 py-2 rounded-full inline-block mb-4 max-tablet:hidden">
            UX/UI Design
          </p>

          <div className="max-w-2xl mx-auto">
            <h1 className="font-heading font-bold leading-tight text-left">
              <span className="block text-h2 max-sm:text-h3">
                I'm <span className="text-h1 max-sm:text-h2">Patrick East</span>
              </span>
              <span className="block text-h2 max-sm:text-h3">
                Creative Lead & Marketing Specialist
              </span>
            </h1>

            <p className="text-gray-400 mt-6 text-xl text-left">
              Hands-on creative lead who designs for results—I specialize in
              building everything from brand campaigns to pixel-perfect web
              apps, all focused on creating intuitive user experiences that
              deliver.
            </p>
          </div>

          {/* Desktop / tablet CTA */}
          <button
            onClick={() => setCurrentPage("work")}
            className="mt-8 bg-primary-button text-white font-nav font-bold text-xl px-8 py-3 rounded-md transition-transform duration-300 hover:scale-105 hidden tablet:inline-block"
          >
            View My Work
          </button>
        </div>

        {/* HERO IMAGE WITH MOBILE GET IN TOUCH OVERLAY */}
        <div className="relative w-full max-w-[500px] h-[500px] mx-auto tablet:max-w-[680px] tablet:h-[520px] lg:max-w-[720px] lg:h-[540px] max-tablet:-mt-8">
          <img
            src="/hero.png"
            alt="Patrick East"
            className="w-full h-full object-cover object-[60%_center] rounded-card"
          />

          <div
            className="
              absolute inset-0 rounded-card
              bg-gradient-to-t from-dark-background/40 via-dark-background/15 to-transparent
              tablet:bg-gradient-to-r tablet:from-dark-background/40 tablet:via-dark-background/15 tablet:to-transparent
              pointer-events-none
            "
          />

          {/* Mobile Get In Touch pinned to bottom of hero image */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-full flex items-center justify-center tablet:hidden">
            <a
              href="#contact-section"
              className="bg-primary-button text-white font-nav font-bold text-xl px-8 py-3 rounded-md shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </motion.section>

      {/* SKILLS */}
      <section className="py-16">
        <div className="max-w-container mx-auto px-4 lg:px-[110px]">
          <h2 className="text-h2 font-heading text-center font-bold">My Skills</h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4 mb-8" />

          <div className="max-w-[576px] mx-auto">
            <p className="text-gray-400 mb-16 text-xl text-left">
              I've cultivated a diverse set of skills throughout my career.
              Here's an overview of some of my technical expertise and
              competencies.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-x-16 gap-y-8 max-tablet:grid-cols-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SkillBar skill="UI/UX Design" percentage={90} />
            <SkillBar skill="Graphic Design" percentage={95} />
            <SkillBar skill="Figma" percentage={85} />
            <SkillBar skill="Adobe Creative Suite" percentage={90} />
            <SkillBar skill="Marketing" percentage={75} />
            <SkillBar skill="Video" percentage={75} />
            <SkillBar
              skill="Project Management / Coordination"
              percentage={85}
            />
            <SkillBar
              skill="Brand Strategy / Brand Development"
              percentage={80}
            />
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <motion.section className="py-16" {...sectionAnimation}>
        <div className="max-w-container mx-auto px-4 lg:px-[110px]">
          <h2 className="text-h2 font-heading text-center font-bold">
            What Clients and Colleagues Say
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4 mb-8" />

          <div className="max-w-[576px] mx-auto">
            <p className="text-gray-400 mb-16 text-xl text-left">
              Don't just take my word for it. Here's what clients have to say
              about working with me on their projects.
            </p>
          </div>

          <div className="relative">
            {/* Desktop arrows */}
            <button
              onClick={handlePrev}
              className="hidden xl:flex absolute left-[-60px] top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft size={36} strokeWidth={6} />
            </button>

            <div className="grid grid-cols-2 gap-16 w-full max-tablet:grid-cols-1 max-tablet:gap-8 max-w-[576px] tablet:max-w-none mx-auto">
              <TestimonialCard
                name={testimonialsData[currentIndex].name}
                title={testimonialsData[currentIndex].title}
                quote={testimonialsData[currentIndex].quote}
              />
              <div className="max-tablet:hidden">
                {testimonialsData[currentIndex + 1] && (
                  <TestimonialCard
                    name={testimonialsData[currentIndex + 1].name}
                    title={testimonialsData[currentIndex + 1].title}
                    quote={testimonialsData[currentIndex + 1].quote}
                  />
                )}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="hidden xl:flex absolute right-[-60px] top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:scale-110 transition-all duration-300"
            >
              <ChevronRight size={36} strokeWidth={6} />
            </button>
          </div>

          {/* Arrows below cards for < xl */}
          <div className="mt-6 flex justify-center gap-10 xl:hidden">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft size={32} strokeWidth={6} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:scale-110 transition-all duration-300"
            >
              <ChevronRight size={32} strokeWidth={6} />
            </button>
          </div>
        </div>
      </motion.section>

            {/* Other Selected Work – small gallery to show breadth */}
      <motion.section className="py-16" {...sectionAnimation}>
        <div className="max-w-container mx-auto px-4 lg:px-[110px]">
          <h2 className="text-h2 font-heading text-center font-bold">
            Other Selected Work
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4 mb-8" />

          <div className="max-w-[576px] mx-auto">
            <p className="text-gray-400 mb-10 text-xl text-left">
              Beyond UX and web, I’ve led campaign creative, motion, and
              physical collateral—supporting launches, events, and ongoing
              marketing efforts.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-tablet:grid-cols-2 max-mobile:grid-cols-1">
            {OTHER_WORK_GALLERY.map((item) => (
              <motion.div
                key={item.id}
                className="bg-med-background rounded-card overflow-hidden text-text-dark cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="w-full h-[220px] overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-4">
                  <p className="font-heading font-bold text-base leading-snug">
                    {item.title}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    {item.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


      {/* CLOSING BLOCK */}
      <motion.div
        className="bg-dark-background py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-[576px] mx-auto text-center">
          <h3 className="text-h2 font-bold font-heading text-white">
            Patrick East
          </h3>
          <p className="mt-4 text-gray-400 text-xl text-left">
            My passion for design and typography started when I was 15, doing
            large-scale mural and typographic art. It gave me a deep, hands-on
            understanding of form, composition, and letter structure that I
            didn’t have a name for back then. It’s where I first learned to
            master the craft and earn respect. I’ve spent my entire professional
            career, from graphic design to UX, refining that same passion.
          </p>
        </div>
      </motion.div>
    </div>
  );
};


// =================================================================================
// SMALL SHARED PIECES
// =================================================================================

const SkillBar = ({ skill, percentage }) => (
  <div>
    <div className="flex justify-between items-center mb-1 font-bold text-h5">
      <span>{skill}</span>
      <span className="text-accent">{percentage}%</span>
    </div>

    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
      <motion.div
        className="bg-accent h-2.5 rounded-full"
        initial={{ width: "0%" }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  </div>
);


const TestimonialCard = ({ name, title, quote }) => (
  <div className="bg-med-background text-text-dark p-8 rounded-card">
    <div className="flex items-center mb-4">
      <img
        src="https://i.imgur.com/5N2gL11.png"
        alt={name}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h4 className="font-bold font-heading text-xl">{name}</h4>
        <p className="text-text-secondary">{title}</p>
      </div>
    </div>
    <p className="text-text-secondary text-xl">"{quote}"</p>
  </div>
);

export default App;
