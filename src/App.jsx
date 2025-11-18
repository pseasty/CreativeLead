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

// =================================================================================
// DATA – CASE STUDIES, OTHER WORK, TESTIMONIALS
// =================================================================================

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
    websiteLink: null, // not needed inside the modal
    githubLink: "https://github.com/pseasty/CreativeLead",
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
    websiteLink: "#", // not needed in the modal right now
    thumbnail: "/CS1Preview.png", // preview card image; hero uses Desktop.jpg

    // 🔹 keep this if you still want the raw prototype link:
    prototypeUrl:
      "https://embed.figma.com/proto/NYZ9iuCMQWSwygezbhkX9W/Flow-for-Portfolio?page-id=0%3A1&node-id=1-190&p=f&viewport=40%2C218%2C0.13&scaling=scale-down&content-scaling=fixed&embed-host=share",
    images: {
      main: "/Desktop.jpg",
      before: "/BeforeDR.jpg",
      after: "/320px Multi-Enroll. Expanded.jpg",
      orgStandards: "/Dhammaorg Design Standards.jpg",
      guides: "/DRConfirmComponentGuide.png",
      grid: "/GridGuide.png",
      dev1: "/Working w Jeremy 1.png",
      dev2: "/Working w Jeremy 2.png",
      userFlow: "/userflow prototype.png",
    },
  },
  {
    id: "cs3",
    heading: "IMPACT",
    title: "Launching a Flagship PC Power Cable Line",
    cardLabel: "Product / Campaign · Linkup Technologies Inc.",
    description:
      "I led the design and marketing for one of Linkup Technologies Inc.'s flagship products—a line of custom-colour braided power cables for PC builders. I defined the visual system, art directed the product photography, and supported the launch across video, social, and marketplace channels. Over several years I also managed the YouTube, Facebook, and Instagram presence, Google Analytics reporting, and a mix of paid campaigns around the product line.",
    company: "Linkup Technologies Inc.",
    services:
      "Art Direction, Product Photography, Brand System, Video, Performance Marketing",
    websiteLink: null,
    githubLink: null,
    thumbnail: "/Linkup1.png",
    images: {
      main: "/Linkup1.png",
      brand: "/Linkup2.jpg",
      components: "/Linkup3.jpg",
      image4: "/Linkup4.png",
      image5: "/Linkup5.jpg",
      image6: "/Linkup6.jpg",
    },
    marketingImages: [
      "/FacbookMarketing.png",
      "/YoutubeAnalytics.png",
      "/GoogleAnalytics.png",
      "/AmazonPPC.png",
    ],
    videoUrl: "https://youtu.be/KM4oH3tTYPY",
  },
];

const OTHER_WORK_GALLERY = [
  {
    id: "ow1",
    title: "Product 3D & Packaging Explorations",
    role: "Industrial / Visual Design",
    thumbnail: "/3DProduct.png",
    expandable: true,           // 🔍 click to expand image
  },
  {
    id: "ow2",
    title: "Motion Graphics & Title Sequences",
    role: "After Effects / Video",
    thumbnail: "/gallery-motion.jpg",
    videoId: "NhL4v8RF-FY",     // or your latest YouTube ID
  },
  {
    id: "ow3",
    title: "Print Collateral",
    role: "Print / Package Design",
    thumbnail: "/package.png",
    expandable: true,           // 🔍 click to expand image
  },
];


const testimonialsData = [
  {
    name: "Maitreya Meshram",
    title: "Senior Software Engineer, LTI - Larsen & Toubro Infotech",
    quote:
      "Having worked with Patrick on web projects at Linkup and on newsletter production, I’ve seen him grow into an exceptional leader, creative problem solver, and team player. As a software engineer, I especially valued his clear communication of complex ideas and his creative, thoughtful approach to technical challenges.",
    photo: "/Testimonials/Maitreya.png",
  },
  {
    name: "Anson Liao",
    title: "President, Linkup Technologies Inc.",
    quote:
      "Because we are a small company, he wore many hats and with every project proved highly capable, dedicated, and quick to grasp technical requirements. He is a self-directed team player who helped pilot projects in line with the company’s vision, and his artistic vision was integral in growing our brand recognition.",
    photo: "/Testimonials/Anson.png",
  },
  {
    name: "Arabellas Barkow",
    title: "Project Manager, Bespoke Boheme",
    quote:
      "Patrick's attention to detail is unmatched. He has a unique ability to translate complex business requirements into elegant and intuitive user experiences.",
    photo: "/Testimonials/Arabella.png",
  },
  {
    name: "Lin Cano",
    title: "Graphic Designer, Linkup Technologies Inc.",
    quote:
      "One of Patrick’s standout qualities is his commitment to team development. He supports the professional growth of his colleagues, offering guidance and mentorship as they stretch into new responsibilities. His calm, focused leadership helps the team navigate tight timelines without losing the quality of the work.",
    photo: "/Testimonials/Lin.png",
  },
  {
    name: "Aaron Weishar",
    title: "Owner, Aaron Tree Services",
    quote:
      "He was responsible for day-to-day problem solving and worked closely with others to navigate the unique challenges that arose. As kitchen operations manager and later president of the board, Patrick chaired numerous meetings—listening actively, asking thoughtful questions, and helping shape dynamic collaboration between many people.",
    photo: "/Testimonials/Aaron.png",
  },
];

// =================================================================================
// APP ROOT
// =================================================================================

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
    if (currentPage !== "work") {
      setIntroPhase("settled");
      return;
    }

    setIntroPhase("start");

    const t1 = setTimeout(() => setIntroPhase("overshoot"), 150);
    const t2 = setTimeout(() => setIntroPhase("settled"), 1600);

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
// SHARED COMPONENTS – HEADER, CONTACT, FOOTER, BOTTOM TOGGLE
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
        <h2 className="text-h2 font-heading text-center font-bold">
          Get in Touch
        </h2>
        <div className="w-20 h-1 bg-accent mx-auto mt-4 mb-8" />

        <div className="max-w-[576px] mx-auto">
          <p className="text-gray-400 mb-16 text-xl text-left">
            Have a project in mind or just want to say hello? I'd love to hear
            from you. Fill out the form below and I'll get back to you as soon
            as possible.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-16 max-tablet:grid-cols-1 max-tablet:gap-8">
          {/* Contact details */}
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

          {/* Contact form */}
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
// PROJECT MODAL – sticky close button, unified blinds reveal
// =================================================================================

// Turn a normal YouTube URL (youtu.be or youtube.com/watch) into an embed URL
function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  try {
    const u = new URL(url);

    // Short youtu.be link: https://youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }

    // Normal YouTube link: https://www.youtube.com/watch?v=VIDEO_ID
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }

    // Fallback – just return original
    return url;
  } catch {
    return url;
  }
}

const ProjectModal = ({ project, onClose, onNav }) => {
  if (!project) return null;

  const [expandedImage, setExpandedImage] = useState(null);

  const overviewAnimation = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

// Blinds-style reveal that opens DOWN, slower, but actually *fires*
const RowReveal = ({ children, delay = 0 }) => (
  <motion.div
    className="overflow-hidden will-change-transform"
    initial={{
      opacity: 0,
      clipPath: "inset(0 0 100% 0)", // hidden from the bottom
      y: 12,                         // small drop so it feels like it falls down
    }}
    whileInView={{
      opacity: 1,
      clipPath: "inset(0 0 0 0)",    // fully revealed
      y: 0,
    }}
    viewport={{
      once: true,
      amount: 0.35,                  // 🔑 triggers when ~35% is in view
    }}
    transition={{
      duration: 1.15,                // still on the slower side
      ease: [0.2, 0.8, 0.3, 1],
      delay: delay + 0.25,           // keeps your “later” feeling
    }}
  >
    {children}
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

           {/* ============================================================
               CS1 – UX / Website
               ============================================================ */}
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
            </div>
            <p className="font-body text-xl text-text-secondary">
              {project.description}
            </p>
          </motion.section>

          <div className="mt-20 space-y-10">
            {/* Main splash image – no dark border */}
            {project.images?.main && (
              <div className="rounded-card overflow-hidden">
                <img
                  src={project.images.main}
                  alt={`${project.title} main visual`}
                  className="w-full h-auto block"
                />
              </div>
            )}

            {/* Brand / style guides  */}
            {project.id === "cs1" && project.images?.brand && (
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
                    <p className="font-body text-xl text-text-secondary mt-4">
                      I started by defining the visual language—type hierarchy,
                      spacing, and colour rules designed to feel bold but
                      minimal. These guides keep the experience consistent as
                      new pages and case studies are added over time.
                    </p>
                  </div>
                </div>
              </RowReveal>
            )}

            {/* Component library */}
            {project.id === "cs1" && project.images?.components && (
              <RowReveal>
                <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                  <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:order-last max-lg:mt-6">
                    <h3 className="text-h3 font-heading font-bold text-text-dark">
                      Component Library & Layout System
                    </h3>
                    <p className="font-body text-xl text-text-secondary mt-4">
                      The UI is built from a small, reusable component system:
                      hero layouts, project cards, testimonials, and
                      call-to-actions. That makes it easy to scale the site
                      without redesigning every screen and keeps the codebase
                      clean and predictable.
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

            {/* Coding / implementation view (used by CS1) */}
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
                      Designed in Figma, Built in Code
                    </h3>
                    <p className="font-body text-xl text-text-secondary mt-4">
                      The portfolio was designed in Figma and then hand-built in
                      React, with Framer Motion driving the hero animations and
                      project transitions. I treated the codebase like a design
                      system—clean file structure, reusable helpers, and
                      animation primitives—so it&apos;s easy to extend for new
                      work and experiments.
                    </p>
                  </div>
                </div>
              </RowReveal>
            )}

            {/* Tall wireframes / page designs (used by cs1/cs2) */}
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

            {/* Creative Lead takeaway – CS1 */}
              {project.id === "cs1" && (
                <RowReveal delay={0.2}>
                  <div className="bg-med-background p-8 rounded-card text-text-dark">
                    <h3 className="text-h3 font-heading font-bold text-text-dark">
                      Why This Matters in a Creative Lead Role
                    </h3>
                    <p className="font-body text-xl text-text-secondary mt-4">
                      This portfolio project isn&apos;t just a personal site—it&apos;s a
                      sandbox for how I think about leading digital work end to end.
                    </p>
                    <ul className="font-body text-xl text-text-secondary mt-4 space-y-2 list-disc list-inside">
                      <li>
                        I defined the visual direction, interaction patterns, and narrative
                        so the experience feels cohesive from hero to footer.
                      </li>
                      <li>
                        I treated the front-end like a design system—components, tokens, and
                        motion primitives that can be reused and extended by a team.
                      </li>
                      <li>
                        I did the hands-on implementation in React and Framer Motion, which
                        helps me give grounded feedback to engineers and move faster together.
                      </li>
                    </ul>
                  </div>
                </RowReveal>
              )}

              {/* ============================================================
                CS2 – Registration flow / meditation org
                Newspaper-style layout + animations
                ============================================================ */}
              {project.id === "cs2" && (
                <>
                  {/* Main two-column “newspaper” grid */}
                  <div className="grid grid-cols-2 gap-16 items-start max-lg:grid-cols-1 max-lg:gap-10">
                    {/* LEFT COLUMN */}
                    <div className="space-y-10">
                      {/* Before – text card */}
                      <motion.div
                        className="bg-med-background p-8 rounded-card text-text-dark"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Before
                        </h3>
                        <p className="text-xl text-text-secondary mt-4">
                          The original confirmation and enrollment management screen (
                          <span className="font-semibold">“BeforeDR.jpg”</span>) was dense,
                          visually dated, and only loosely aligned with the
                          organization&apos;s design standards. Core actions were hard to
                          spot, forcing users to hunt through multiple controls just to
                          confirm or update their status.
                        </p>
                      </motion.div>

                      {/* Before – legacy screen image */}
                      {project.images?.before && (
                        <motion.div
                          className="bg-white rounded-card p-4 border border-gray-200"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                        >
                          <img
                            src={project.images.before}
                            alt={`${project.title} – legacy multi-enrollment flow`}
                            className="w-full h-auto block rounded-md"
                          />
                        </motion.div>
                      )}

                      {/* Working within a global design system – text card */}
                      {project.images?.orgStandards && (
                        <motion.div
                          className="bg-med-background p-8 rounded-card text-text-dark"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                        >
                          <h3 className="text-h3 font-heading font-bold text-text-dark">
                            Working Within a Global Design System
                          </h3>
                          <p className="text-xl text-text-secondary mt-4">
                            The organization already had a strong visual identity. My job
                            wasn&apos;t to reinvent it, but to apply it correctly to a complex
                            registration context. That meant respecting locked trademarks,
                            typography rules, and colour usage while still making the
                            interface feel clearer and more modern.
                          </p>
                          <p className="text-xl text-text-secondary mt-4">
                            In fast-paced working sessions (often 15 minutes at a time) with
                            the design standards team and DevOps, I walked stakeholders
                            through why certain conventions mattered—like keeping the logo
                            lockup intact to avoid diluting the brand and ensuring the system
                            felt cohesive across touchpoints.
                          </p>
                        </motion.div>
                      )}

                      {/* Guides image */}
                      {project.images?.guides && (
                        <motion.div
                          className="bg-white rounded-card p-4 border border-gray-200"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                        >
                          <img
                            src={project.images.guides}
                            alt={`${project.title} – component, colour, and typography guides`}
                            className="w-full h-auto block rounded-md"
                          />
                        </motion.div>
                      )}

                      {/* GridGuide image */}
                      {project.images?.grid && (
                        <motion.div
                          className="bg-white rounded-card p-4 border border-gray-200"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                        >
                          <img
                            src={project.images.grid}
                            alt={`${project.title} – layout measurement overlays`}
                            className="w-full h-auto block rounded-md"
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-10">
                      {/* After – redesigned mobile screen image */}
                      {project.images?.after && (
                        <motion.div
                          className="bg-white rounded-card p-4 border border-gray-200"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <img
                            src={project.images.after}
                            alt={`${project.title} – redesigned multi-enrollment flow (mobile)`}
                            className="w-full h-auto block rounded-md"
                          />
                        </motion.div>
                      )}

                      {/* After (mobile) – text card */}
                      {project.images?.after && (
                        <motion.div
                          className="bg-med-background p-8 rounded-card text-text-dark"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                        >
                          <h3 className="text-h3 font-heading font-bold text-text-dark">
                            After (mobile)
                          </h3>
                          <p className="text-xl text-text-secondary mt-4">
                            The updated 320px multi-enroll screen (
                            <span className="font-semibold">
                              “320px Multi-Enroll. Expanded.jpg”
                            </span>
                            ) introduces a clear primary CTA, calmer hierarchy, and obvious
                            affordances so users can confirm, cancel, or adjust their
                            enrollment without digging through hidden controls.
                          </p>
                          <p className="text-xl text-text-secondary mt-4">
                            The desktop version of this redesign (
                            <span className="font-semibold">“Desktop.jpg”</span>) mirrors the
                            same structure and lives in the hero image at the top of this case
                            study.
                          </p>
                        </motion.div>
                      )}

                      {/* Design standards PDF – tall image */}
                      {project.images?.orgStandards && (
                        <motion.div
                          className="bg-white rounded-card p-4 border border-gray-200"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                        >
                          <img
                            src={project.images.orgStandards}
                            alt={`${project.title} – organization design standards`}
                            className="w-full h-auto block rounded-md"
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Jeremy images LEFT, Fast, Cross-functional Delivery RIGHT (full-width row) */}
                  {(project.images?.dev1 || project.images?.dev2) && (
                    <motion.div
                      className="mt-12"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="grid grid-cols-2 gap-16 max-lg:grid-cols-1 max-lg:gap-10">
                        {/* LEFT: images */}
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

                        {/* RIGHT: text card */}
                        <div className="bg-med-background p-8 rounded-card text-text-dark">
                          <h3 className="text-h3 font-heading font-bold text-text-dark">
                            Fast, Cross-functional Delivery
                          </h3>
                          <p className="text-xl text-text-secondary mt-4">
                            I partnered closely with the registration DevOps team to make sure
                            the design was technically feasible and easy to maintain. We
                            iterated in short working sessions, reviewing builds against the
                            specs until the implementation matched the design one-to-one.
                          </p>
                          <p className="text-xl text-text-secondary mt-4">
                            These sessions weren&apos;t just about pixels—they were about
                            aligning on why each convention existed, so engineers and designers
                            were making the same tradeoffs for the same reasons.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Interactive Prototype (if provided) */}
                  {project.prototypeUrl && (
                    <motion.div
                      className="bg-med-background p-8 rounded-card text-text-dark mt-12"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <h3 className="text-h3 font-heading font-bold text-text-dark">
                        Interactive Prototype
                      </h3>
                      <p className="text-xl text-text-secondary mt-4">
                        An interactive Figma prototype made it easy to walk stakeholders
                        through the new flow in short, high-impact review sessions. Rather
                        than debating static screens, we could click through confirmations,
                        cancellations, and waitlist states the same way users would.
                      </p>

                      <div className="w-full mt-4">
                        <div className="w-full max-w-4xl mx-auto aspect-[16/9] bg-white rounded-card overflow-hidden border border-gray-200">
                          <iframe
                            title="Registration flow prototype"
                            src={project.prototypeUrl}
                            className="w-full h-full"
                            style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Creative Lead sign-off */}
                  <motion.div
                    className="bg-med-background p-8 rounded-card text-text-dark mt-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <h3 className="text-h3 font-heading font-bold text-text-dark">
                      How This Reflects My Leadership Style
                    </h3>
                    <p className="font-body text-xl text-text-secondary mt-4">
                      This project sits at the intersection of UX, visual design, and
                      cross-functional delivery—and represents the kind of work I lead best.
                    </p>
                    <ul className="font-body text-xl text-text-secondary mt-4 space-y-2 list-disc list-inside">
                      <li>
                        I took a legacy, business-critical flow and turned it into something
                        clearer and more humane without breaking existing constraints.
                      </li>
                      <li>
                        I bridged between design standards, stakeholders, and DevOps—keeping
                        the brand intact while moving quickly toward a shippable solution.
                      </li>
                      <li>
                        I documented decisions so future designers and engineers can extend
                        the system instead of reinventing it page by page.
                      </li>
                    </ul>
                  </motion.div>
                </>
              )}


            {/* ============================================================
              CS3 – brand development graphic design
              ============================================================ */}
            {project.id === "cs3" && (
              <>
                {/* Product photography – Linkup4.jpg */}
                {project.images?.image4 && (
                  <RowReveal>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.image4} // /Linkup4.jpg
                          alt={`${project.title} product photography`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Art Direction & Product Photography
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          I led the visual direction for the braided power cable
                          line—planning the shots, lighting, and compositions to
                          make a fairly technical product feel aspirational for
                          PC builders. I shot the photography myself and
                          coordinated a small team to handle retouching and
                          colour consistency across the entire range.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Brand / system shots – Linkup2.jpg */}
                {project.images?.brand && (
                  <RowReveal delay={0.19}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:order-last max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Brand System for the PC Builder Audience
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          Together with the team, I helped define a consistent
                          visual language for Linkup in the PC gaming space:
                          colour palette, tone, and layout patterns that could
                          flex across Amazon listings, the website, social, and
                          video.
                        </p>
                      </div>

                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.brand} // /Linkup2.jpg
                          alt={`${project.title} brand system visuals`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Graphic templates / detail imagery – Linkup3.jpg */}
                {project.images?.components && (
                  <RowReveal delay={0.19}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.components} // /Linkup3.jpg
                          alt={`${project.title} detail product imagery`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>

                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Graphic Templates & Brand System
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          I created a suite of Illustrator templates and a flexible brand
                          system built around consistent typography, colour palettes, and
                          layout patterns. With the core style guides established, it became
                          easier to shape photography, refine delivered assets, and produce
                          campaign-ready collateral that stayed true to the brand while
                          giving contributors clear creative direction.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Extra campaign visual – Linkup5.jpg */}
                {project.images?.image5 && (
                  <RowReveal delay={0.24}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-med-background p-8 rounded-card text-text-dark max-lg:order-last max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Campaign-Ready Visual Variations
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          To support different platforms and formats, I built out alternate
                          crops and compositions of the hero photography. These variations
                          kept the core look intact while adapting to thumbnails, banners,
                          and marketplace image requirements.
                        </p>
                      </div>

                      <div className="bg-white rounded-card p-4 border border-gray-200">
                        <img
                          src={project.images.image5} // /Linkup5.jpg
                          alt={`${project.title} additional campaign visual`}
                          className="w-full h-auto block rounded-md"
                        />
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Video / logo animation card – media LEFT now */}
                {project.videoUrl && (
                  <RowReveal delay={0.28}>
                    <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                      {/* Inline embedded YouTube video */}
                      <div className="bg-dark-background rounded-card overflow-hidden">
                        <div className="w-full aspect-video">
                          <iframe
                            title="Linkup product video"
                            src={getYouTubeEmbedUrl(project.videoUrl)}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      </div>

                      {/* Text card */}
                      <div className="flex flex-col justify-center h-full bg-med-background p-8 rounded-card text-text-dark max-lg:mt-6">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Product Video & Logo Animation
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          I partnered with a motion designer to develop the Linkup logo
                          animation and then directed and shot the flagship product video.
                          I provided the script, music, and overall creative direction, then
                          collaborated on post-production to make sure the final cut matched
                          the brand system.
                        </p>
                        <p className="font-body text-sm text-text-secondary mt-4">
                          Watch the product spot directly in this case study.
                        </p>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Marketing & performance card + expandable thumbnails – media RIGHT */}
                {project.marketingImages && project.marketingImages.length > 0 && (
                  <RowReveal delay={0.32}>
                    <div className="grid grid-cols-2 gap-16 items-start max-lg:grid-cols-1 max-lg:gap-8">
                      <div className="bg-med-background p-8 rounded-card text-text-dark">
                        <h3 className="text-h3 font-heading font-bold text-text-dark">
                          Marketing & Performance
                        </h3>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          Beyond the visuals, I managed day-to-day marketing activity around
                          the product line at Linkup Technologies Inc.—including the YouTube
                          channel, Facebook and Instagram content, Google Analytics
                          reporting for the website, and a range of Amazon PPC and other
                          performance campaigns over several years.
                        </p>
                        <p className="font-body text-xl text-text-secondary mt-4">
                          Having direct access to the numbers meant I could see which
                          creative and formats were working and adjust the stories we told
                          across video, social, and product pages.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <p className="font-body text-sm text-text-secondary">
                          Selected marketing stills – tap to expand:
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {project.marketingImages.map((src, index) => (
                            <button
                              key={`${project.id}-mkt-${index}`}
                              type="button"
                              onClick={() => setExpandedImage(src)}
                              className="group text-left"
                            >
                              <div className="rounded-card overflow-hidden border border-gray-200">
                                <img
                                  src={src}
                                  alt={`${project.title} marketing visual ${index + 1}`}
                                  className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </RowReveal>
                )}

                {/* Creative Lead takeaway – CS3 */}
                {project.id === "cs3" && (
                  <RowReveal delay={0.2}>
                    <div className="bg-med-background p-8 rounded-card text-text-dark">
                      <h3 className="text-h3 font-heading font-bold text-text-dark">
                        What This Shows About Me as a Creative Lead
                      </h3>
                      <p className="font-body text-xl text-text-secondary mt-4">
                        This case study brings together brand, product storytelling, and
                        performance marketing over several years of work.
                      </p>
                      <ul className="font-body text-xl text-text-secondary mt-4 space-y-2 list-disc list-inside">
                        <li>
                          I owned the visual system for a flagship product line, from
                          product photography direction to templates and
                          marketplace-ready assets.
                        </li>
                        <li>
                          I worked closely with stakeholders across marketing and leadership
                          to keep the creative consistent while we experimented with new
                          formats.
                        </li>
                        <li>
                          I tracked performance via analytics and campaigns, using results
                          to refine the creative rather than designing in a vacuum.
                        </li>
                      </ul>
                    </div>
                  </RowReveal>
                )}
              </>
            )}

              {/* GitHub link card – optional, per project */}
              {project.githubLink && (
                <RowReveal delay={0.19}>
                  <div className="mt-10 bg-med-background p-6 rounded-card flex flex-col gap-4 items-start text-text-dark">
                    <div>
                      <h3 className="text-h4 font-heading font-bold">
                        View the Code on GitHub
                      </h3>
                      <p className="font-body text-text-secondary mt-1">
                        This project is also available as a live React codebase,
                        including the animation and layout system used in this
                        case study.
                      </p>
                    </div>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-primary-button text-white font-nav font-bold text-base hover:bg-opacity-90"
                    >
                      Open GitHub Repo
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </RowReveal>
              )}
            </div> {/* end mt-20 space-y-10 */}
          </div>   {/* end max-w-container wrapper */}

          {/* Global contact + footer at bottom of modal */}
          <div className="bg-dark-background">
            <ContactSection />
            <Footer onNav={onNav} />
          </div>

          {/* Big image overlay for expandable thumbnails (cs3 marketing) */}
          {expandedImage && (
            <div
              className="fixed inset-0 z-[70] bg-black/70 flex items-center justify-center px-4"
              onClick={() => setExpandedImage(null)}
            >
              <div
                className="max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={expandedImage}
                  alt="Expanded project visual"
                  className="w-full h-auto rounded-card shadow-2xl"
                />
              </div>
            </div>
          )}
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
      color: "#262626",
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
          style={{ transformOrigin: "top", willChange: "clip-path" }}
          initial={{
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
          }}
          animate={
            introPhase === "settled"
              ? { opacity: 1, clipPath: "inset(0 0 0% 0)" }
              : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
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
        // Rows 2 & 3: blind-style open when they scroll into view
        <motion.div
          className={gridClasses}
          style={{ transformOrigin: "top", willChange: "clip-path" }}
          initial={{
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
          }}
          whileInView={{
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
          }}
          viewport={{
            once: true,
            amount: 0.8,
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
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={() => onSelect && onSelect(project)}
    >
      <div className="relative w-full h-[520px] bg-med-background rounded-3xl overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

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
              <p className="text-sm opacity-80 mt-0.5">{project.cardLabel}</p>
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
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [expandedWorkImage, setExpandedWorkImage] = useState(null);

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
                I'm{" "}
                <span className="text-h1 max-sm:text-h2">Patrick East</span>
              </span>
              <span className="block text-h2 max-sm:text-h3">
                Creative Lead & Product Designer
              </span>
            </h1>

            <p className="text-gray-400 mt-6 text-xl text-left">
              Hands-on creative lead who bridges brand, product, and marketing.
              I plan, design, and ship experiences—from campaigns and
              storytelling to pixel-perfect web apps—working closely with
              engineers and stakeholders to deliver measurable results.
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
          <h2 className="text-h2 font-heading text-center font-bold">
            My Skills
          </h2>
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
                photo={testimonialsData[currentIndex].photo}
              />
              <div className="max-tablet:hidden">
                {testimonialsData[currentIndex + 1] && (
                  <TestimonialCard
                    name={testimonialsData[currentIndex + 1].name}
                    title={testimonialsData[currentIndex + 1].title}
                    quote={testimonialsData[currentIndex + 1].quote}
                    photo={testimonialsData[currentIndex + 1].photo}
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

      {/* OTHER SELECTED WORK */}
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
            {OTHER_WORK_GALLERY.map((item) => {
              const isVideo = !!item.videoId;
              const isExpandableImage = !isVideo && item.expandable;

              // Use YouTube thumbnail for videos, fallback to local image
              const thumbSrc = isVideo
                ? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`
                : item.thumbnail;

              const cardInner = (
                <motion.div
                  className="bg-med-background rounded-card overflow-hidden text-text-dark cursor-pointer group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <img
                      src={thumbSrc}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                          <div className="ml-1 border-l-[14px] border-l-primary-button border-y-[9px] border-y-transparent" />
                        </div>
                      </div>
                    )}
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
              );

              if (isVideo) {
                // open YouTube overlay
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveVideoId(item.videoId)}
                    className="text-left"
                  >
                    {cardInner}
                  </button>
                );
              }

              if (isExpandableImage) {
                // open large image overlay
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setExpandedWorkImage(item.fullImage || item.thumbnail)
                    }
                    className="text-left"
                  >
                    {cardInner}
                  </button>
                );
              }

              // plain non-interactive card
              return <div key={item.id}>{cardInner}</div>;
            })}
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

      {/* VIDEO OVERLAY FOR OW2 */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="w-full max-w-3xl aspect-video bg-black rounded-card overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              title="Motion graphics video"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* IMAGE OVERLAY FOR OW1 / OW3 */}
      {expandedWorkImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          onClick={() => setExpandedWorkImage(null)}
        >
          <div
            className="w-full max-w-5xl bg-black rounded-card overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={expandedWorkImage}
              alt="Expanded work visual"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
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

const TestimonialCard = ({ name, title, quote, photo }) => (
  <div className="bg-med-background text-text-dark p-8 rounded-card">
    <div className="flex items-center mb-4">
      <img
        src={photo || "https://i.imgur.com/5N2gL11.png"}
        alt={name}
        className="w-16 h-16 rounded-full mr-4 object-cover"
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
