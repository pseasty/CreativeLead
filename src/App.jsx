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

const sampleProject = {
  title: "My Portfolio Web App",
  description:
    "A modern, responsive portfolio experience built to showcase my work as a Creative Lead and UX/UI designer. The project focuses on clear information hierarchy, reusable components, and a cohesive visual system that ties together brand, layout, and interactions.",
  company: "Personal Project",
  services: "UI/UX Design, Brand, Front-End Development",
  websiteLink: "#",
};

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

const ProjectModal = ({ project, onClose, onNav }) => {
  const overviewAnimation = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  // Blinds-style reveal (no stretching) for each row
  const RowReveal = ({ children, delay = 0 }) => (
    <motion.div
      className="overflow-hidden origin-top"
      initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}   // hidden from bottom
      whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }} // revealed
      viewport={{
        once: true,
        amount: 0.3, // triggers when ~30% of row is visible
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.2, 0.8, 0.3, 1],
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
        {/* Sticky close button strip */}
        <div className="sticky top-0 z-[60] flex justify-end bg-white/80 backdrop-blur-sm px-4 lg:px-[110px] pt-4 pb-2">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-300 bg-opacity-60 rounded-full flex items-center justify-center text-gray-800 hover:bg-opacity-80 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <div className="max-w-container mx-auto px-4 lg:px-[110px] pt-8 pb-24">
          {/* Overview (simple fade/slide, no blinds) */}
          <motion.section
            className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8"
            {...overviewAnimation}
          >
            <div>
              <h1 className="text-h1 font-heading font-bold text-text-dark max-lg:text-h2">
                {project.title}
              </h1>
              <a
                href={project.websiteLink}
                className="text-body underline mt-4 inline-block text-text-secondary hover:text-text-dark"
              >
                Website link
              </a>
            </div>
            <p className="text-xl text-text-secondary">{project.description}</p>
          </motion.section>

          {/* CASE STUDY ROWS */}
          <div className="mt-20 space-y-10">
            {/* Main splash image */}
            <RowReveal delay={0.05}>
              <div className="bg-dark-background rounded-card p-6">
                <img
                  src="/PortThumb.png"
                  alt="My Portfolio Web App homepage"
                  className="w-full h-auto block rounded-md shadow-lg"
                />
              </div>
            </RowReveal>

            {/* Brand / style guides */}
            <RowReveal delay={0.15}>
              <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                <div className="bg-white rounded-card p-4 border border-gray-200">
                  <img
                    src="/PortGuides.png"
                    alt="Portfolio brand style guides"
                    className="w-full h-auto block rounded-md"
                  />
                </div>

                <div className="flex flex-col justify-center h-full">
                  <h3 className="text-h3 font-heading font-bold text-text-dark">
                    Brand Development & Style Guides
                  </h3>
                  <p className="text-xl text-text-secondary mt-4">
                    The visual system was built from a tight set of typography,
                    color, and spacing rules. These guides ensure the portfolio
                    feels consistent across every page and future case study.
                  </p>
                </div>
              </div>
            </RowReveal>

            {/* Component guide */}
            <RowReveal delay={0.25}>
              <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                <div className="max-lg:order-last flex flex-col justify-center h-full">
                  <h3 className="text-h3 font-heading font-bold text-text-dark">
                    Component Library & Layout System
                  </h3>
                  <p className="text-xl text-text-secondary mt-4">
                    A reusable component library powers the layout—from hero
                    sections and cards to testimonials and calls-to-action—so
                    new pages can be added quickly without sacrificing
                    consistency.
                  </p>
                </div>

                <div className="bg-white rounded-card p-4 border border-gray-200">
                  <img
                    src="/PortComponentGuides.png"
                    alt="Component guide for portfolio web app"
                    className="w-full h-auto block rounded-md"
                  />
                </div>
              </div>
            </RowReveal>

            {/* Tall wireframes */}
            <RowReveal delay={0.35}>
              <div className="grid grid-cols-2 gap-16 items-start max-lg:grid-cols-1 max-lg:gap-8">
                <div className="bg-white rounded-card p-4 border border-gray-200">
                  <img
                    src="/PortWorkPage.jpg"
                    alt="Wireframes of the Work page"
                    className="w-full h-auto block rounded-md"
                  />
                </div>
                <div className="bg-white rounded-card p-4 border border-gray-200">
                  <img
                    src="/PortAboutPage.jpg"
                    alt="Wireframes of the About page"
                    className="w-full h-auto block rounded-md"
                  />
                </div>
              </div>
            </RowReveal>
          </div>

          {/* Contributors */}
          <RowReveal delay={0.45}>
            <section className="mt-20 pt-10 border-t border-gray-200">
              <h4 className="font-bold text-2xl text-text-dark mb-4">
                Contributors
              </h4>
              <div className="text-text-secondary text-lg space-y-2">
                <p>
                  <span className="font-bold text-text-dark">Patrick East</span>{" "}
                  - Creative Lead, UX/UI Designer, Front-End Developer
                </p>
              </div>
            </section>
          </RowReveal>
        </div>

        {/* Contact + footer inside modal scroll */}
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
      <WorkSection
        index={0}
        title="DESIGN"
        introPhase={introPhase}
        onProjectSelect={onProjectSelect}
      />
      <WorkSection
        index={1}
        title="BRAND"
        textAlign="right"
        introPhase={introPhase}
        onProjectSelect={onProjectSelect}
      />
      <WorkSection
        index={2}
        title="IMPACT"
        introPhase={introPhase}
        onProjectSelect={onProjectSelect}
      />

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
  onProjectSelect,
  introPhase,
}) => {
  const isFirstRow = index === 0;

  // Where each heading sits during the clustered intro (all on screen)
  const startOffsets = [-40, 0, 40];

  // Where they go in the big “overshoot” state
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
    // Final layout: NO positional offset, so headings line up
    // perfectly with the cards in the resting state.
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

  // Shared classes for the cards grid: tight spacing under heading
  const gridClasses = `
    grid grid-cols-2 gap-[40px]
    mt-3 pt-3
    max-tablet:mt-5
    max-tablet:grid-cols-1 
    max-tablet:gap-8 
    max-tablet:place-items-center
    ${textAlign === "right" ? "justify-end" : ""}
  `;

  return (
    <section
      className={`
        pt-4 mb-14
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
        <div className="relative overflow-visible">
          <motion.div
            className={gridClasses}
            style={{ transformOrigin: "top" }}
            // Blinds open DOWN: content hidden by bottom edge, revealed downward
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={
              introPhase === "settled"
                ? { clipPath: "inset(0% 0% 0% 0%)" }
                : { clipPath: "inset(0% 0% 100% 0%)" }
            }
            transition={{
              duration: 1.0,
              delay: introPhase === "settled" ? 0.2 : 0,
              ease: [0.2, 0.8, 0.3, 1],
            }}
          >
            <ProjectCard onSelect={onProjectSelect} />
            <ProjectCard onSelect={onProjectSelect} />
          </motion.div>
        </div>
      ) : (
        // Rows 2 & 3: scroll-triggered blinds (no stretching)
        <div className="relative overflow-visible">
          <motion.div
            className={gridClasses}
            style={{ transformOrigin: "top" }}
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{
              once: true,
              amount: 0.8, // wait until most of the row is in view
            }}
            transition={{
              duration: 1.0,
              delay: 0.3,
              ease: [0.2, 0.8, 0.3, 1],
            }}
          >
            <ProjectCard onSelect={onProjectSelect} />
            <ProjectCard onSelect={onProjectSelect} />
          </motion.div>
        </div>
      )}
    </section>
  );
};



const ProjectCard = ({ onSelect }) => {
  return (
    <motion.div
      onClick={() => onSelect(sampleProject)}
      className="group relative cursor-pointer w-full max-w-[576px] z-20"
      whileHover={{ y: -12 }}                    // quicker lift
      transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
    >
      {/* Card shell */}
      <div className="w-full h-[560px] bg-med-background rounded-3xl overflow-hidden flex items-center justify-center">
        {/* Image zooms slightly on hover – no vertical stretch */}
        <img
          src="/PortThumb.png"
          alt="My Portfolio Web App thumbnail"
          className="w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
        />
      </div>

      {/* Button overlay */}
      <div className="absolute bottom-[10px] left-[10px] right-[10px] p-3 bg-primary-button text-white rounded-card flex justify-between items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <h4 className="font-nav font-bold text-xl">My Portfolio Web App</h4>
        <ArrowUpRight size={28} />
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
