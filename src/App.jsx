// src/App.jsx

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

const sampleProject = {
  title: "Squarespace Website",
  description: "Squarespace is an all-in-one online platform for building beautiful websites and establishing online presence. In my role on the front site team (squarespace.com), I focused on product design, art direction, user experience, and product strategy. My contributions included a complete overhaul of the homepage, product tour pages, company pages, marketing blogs, and the design system, ensuring a cohesive and scalable design approach.",
  company: "Squarespace",
  services: "Brand, System Design, Product",
  websiteLink: "#",
};

const testimonialsData = [
  { name: "Maitreya Meshram", title: "Software Engineer, Digital Alliance", quote: "My passion for design and typography started when I was 15, doing large-scale mural and typographic art. It gave me a deep, hands-on understanding of form." },
  { name: "Arabellas Barkow", title: "Project Manager, Bespoke Boheme", quote: "Patrick's attention to detail is unmatched. He has a unique ability to translate complex business requirements into elegant and intuitive user experiences." },
  { name: "John Doe", title: "CEO, Startup Inc.", quote: "Working with Patrick was a game-changer for our brand. His strategic insights and design leadership directly contributed to our product's success in the market." },
  { name: "Jane Smith", title: "Marketing Director, Creative Co.", quote: "He is a true professional. The design system he built for us was scalable, easy to use, and has dramatically improved our team's efficiency." }
];

function App() {
  const [currentPage, setCurrentPage] = useState('work');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  const handleModalNav = (page) => {
    setSelectedProject(null);
    setCurrentPage(page);
  };

  return (
    <div className={`relative min-h-screen ${currentPage === 'work' ? 'bg-light-background' : 'bg-dark-background'}`}>
      <Header />
      
      {!selectedProject && (
        <>
          <main>
            {currentPage === 'work' ? <WorkPage onProjectSelect={setSelectedProject} /> : <AboutPage setCurrentPage={setCurrentPage} />}
          </main>
          <div className="bg-dark-background pt-1 pb-24">
            <ContactSection />
            <Footer setCurrentPage={setCurrentPage} />
          </div>
          <BottomToggle currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
      )}
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)}
          onNav={handleModalNav}
        />
      )}
    </div>
  );
}

// =================================================================================
// SHARED COMPONENTS
// =================================================================================

const Header = () => (
  <header className="bg-dark-background flex items-center h-[88px] max-mobile:h-auto max-mobile:py-4">
    <div className="max-w-container w-full mx-auto px-4 lg:px-[110px] flex justify-between items-center max-mobile:flex-col max-mobile:justify-center max-mobile:gap-4">
      <p className="font-body text-base lg:text-lg text-white text-center">
        Patrick East <span className="text-primary-button">|</span> <span className="text-accent">Creative Lead & Product Designer</span>
      </p>
      <a href="#contact-section" className="max-xs:hidden">
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
    const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
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
    <section id="contact-section" className="bg-dark-background py-20 text-text-light">
      <div className="max-w-container mx-auto px-4 lg:px-[110px]">
        <h2 className="text-h2 font-heading text-center font-bold">Get in Touch</h2>
        <div className="w-20 h-1 bg-accent mx-auto mt-4 mb-8" />
        <div className="max-w-[576px] mx-auto">
            <p className="text-gray-400 mb-16 text-xl text-left">
                Have a project in mind or just want to say hello? I'd love to hear from you. Fill out the form below and I'll get back to you as soon as possible.
            </p>
        </div>
        <div className="grid grid-cols-2 gap-16 max-tablet:grid-cols-1 max-tablet:gap-8">
          <div className="bg-med-background p-10 rounded-card text-text-dark max-lg:p-6 max-w-[576px] mx-auto w-full">
            <h3 className="font-heading font-bold text-h3 mb-4">Contact Information</h3>
            <p className="text-text-secondary mb-8">Feel free to reach out using any of the following methods.</p>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4 shrink-0"><Mail className="w-6 h-6 text-dark-background"/></div>
                <div><p className="font-bold">Email</p><p className="text-text-secondary">info@prizmpix.com</p></div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4 shrink-0"><Phone className="w-6 h-6 text-dark-background"/></div>
                <div><p className="font-bold">Phone</p><p className="text-text-secondary">4377786388</p></div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4 shrink-0"><MapPin className="w-6 h-6 text-dark-background"/></div>
                <div><p className="font-bold">Location</p><p className="text-text-secondary">Toronto, ON. Canada</p></div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-300">
               <p className="font-bold mb-4">Connect with me</p>
               <div className="flex space-x-4">
                  <Instagram className="w-8 h-8 text-text-secondary hover:text-text-dark cursor-pointer"/><Facebook className="w-8 h-8 text-text-secondary hover:text-text-dark cursor-pointer"/><Linkedin className="w-8 h-8 text-text-secondary hover:text-text-dark cursor-pointer"/>
               </div>
            </div>
          </div>
          <div className="bg-med-background p-10 rounded-card text-text-dark flex flex-col justify-center max-lg:p-6 max-w-[576px] mx-auto w-full">
             <h3 className="font-heading font-bold text-h3 mb-4">Contact Form</h3>
             <form onSubmit={onSubmit} className="w-full mt-4 space-y-4">
                <input type="text" name="name" required placeholder="Your Name" className="w-full p-3 rounded-md border border-gray-300 text-text-dark"/>
                <input type="email" name="email" required placeholder="Your Email" className="w-full p-3 rounded-md border border-gray-300 text-text-dark"/>
                <textarea name="message" required placeholder="Your Message" rows="5" className="w-full p-3 rounded-md border border-gray-300 text-text-dark" />
                <button type="submit" className="w-full bg-primary-button text-white font-bold py-3 rounded-md hover:bg-opacity-75">Submit Form</button>
             </form>
             <span className="mt-4 text-center text-text-dark font-bold">{result}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setCurrentPage, onNav }) => {
  const handleNav = onNav || setCurrentPage;
  return (
    <footer className="bg-dark-background text-text-light border-t border-gray-700">
      <div className="max-w-container mx-auto px-4 lg:px-[110px] py-16 grid grid-cols-1 tablet:grid-cols-6 gap-8 text-center tablet:text-left">
          <div className="tablet:col-span-3">
              <h4 className="font-heading font-bold text-2xl mb-4">Patrick East</h4>
              <p className="text-gray-400 max-w-md mx-auto tablet:mx-0">A passionate and results-driven creative lead with a deep understanding of form, composition, and user-centric design.</p>
          </div>
          <div className="tablet:col-span-2">
              <h4 className="font-heading font-bold text-2xl mb-4">Quick Links</h4>
              <ul className="text-gray-400 space-y-2">
                  <li><button onClick={() => handleNav('work')} className="hover:text-primary-button">My Work</button></li>
                  <li><button onClick={() => handleNav('about')} className="hover:text-primary-button">About Me</button></li>
                  <li><a href="#contact-section" className="hover:text-primary-button">Contact</a></li>
              </ul>
          </div>
          <div className="tablet:text-right">
              <p className="text-gray-400">All right reserved 2025</p>
          </div>
      </div>
    </footer>
  );
};

const BottomToggle = ({ currentPage, setCurrentPage }) => {
  const isWork = currentPage === 'work';
  const activeClass = "bg-white text-primary-button";
  const inactiveClass = "bg-transparent text-white";
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center bg-primary-button p-1 rounded-lg border-2 border-primary-button shadow-lg">
        <button onClick={() => setCurrentPage('work')} className={`px-10 py-2 font-nav font-bold text-lg rounded-md transition-colors duration-300 ${isWork ? activeClass : inactiveClass}`}>Work</button>
        <button onClick={() => setCurrentPage('about')} className={`px-10 py-2 font-nav font-bold text-lg rounded-md transition-colors duration-300 ${!isWork ? activeClass : inactiveClass}`}>About</button>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose, onNav }) => {
  return (
    <div className="fixed inset-0 z-40 bg-white overflow-y-auto">
      <Header />
      <button onClick={onClose} className="fixed top-6 right-6 z-[60] w-12 h-12 bg-gray-300 bg-opacity-50 rounded-full flex items-center justify-center text-gray-800 hover:bg-opacity-75 transition-colors">
        <X size={24} />
      </button>
      <div className="max-w-container mx-auto px-4 lg:px-[110px] py-24">
        <section className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
          <div><h1 className="text-h1 font-heading font-bold text-text-dark max-lg:text-h2">{project.title}</h1><a href={project.websiteLink} className="text-body underline mt-4 inline-block text-text-secondary hover:text-text-dark">Website link</a></div>
          <p className="text-xl text-text-secondary">{project.description}</p>
        </section>
        <section className="mt-16 pt-8 border-t border-gray-200 grid grid-cols-2 gap-16 max-lg:grid-cols-1 max-lg:gap-8">
          <div><h5 className="font-bold text-xl text-text-dark">Company</h5><p className="text-text-secondary text-lg">{project.company}</p></div>
          <div><h5 className="font-bold text-xl text-text-dark">Services</h5><p className="text-text-secondary text-lg">{project.services}</p></div>
        </section>
        <section className="mt-20 space-y-10">
          <div className="bg-dark-background rounded-card p-10 flex items-center justify-center"><div className="w-1/2 h-48 bg-gray-800 flex items-center justify-center rounded-md"><p className="text-white text-center">Placeholder for<br/>Squarespace Logo</p></div></div>
          <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
            <div className="bg-med-background rounded-card h-[400px] max-lg:h-[300px]"></div>
            <div>
              <h3 className="text-h3 font-heading font-bold text-text-dark">Modular Component Design</h3>
              <p className="text-xl text-text-secondary mt-4">Each content block was crafted as a modular component, guaranteeing a cohesive and scalable design approach.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
            <div className="max-lg:order-last">
              <h3 className="text-h3 font-heading font-bold text-text-dark">Unified Design Strategy</h3>
              <p className="text-xl text-text-secondary mt-4">The website was developed using a design system that ensures a unified and adaptable design strategy.</p>
            </div>
            <div className="bg-med-background rounded-card h-[400px] max-lg:h-[300px]"></div>
          </div>
          <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
            <div className="bg-med-background rounded-card h-[800px] max-lg:h-[600px]" />
            <div className="bg-med-background rounded-card h-[800px] max-lg:h-[600px]" />
          </div>
        </section>
        <section className="mt-20 pt-10 border-t border-gray-200">
           <h4 className="font-bold text-2xl text-text-dark mb-4">Contributors</h4>
           <div className="text-text-secondary text-lg space-y-2">
              <p><span className="font-bold text-text-dark">Mclane Teitel</span> - Lead designer</p>
              <p><span className="font-bold text-text-dark">Andrea Kim</span> - Designer</p>
              <p><span className="font-bold text-text-dark">Cody wall, Cornelia Chow, Crystal Liu</span> - Developers</p>
           </div>
        </section>
      </div>
      <div className="bg-dark-background">
        <ContactSection />
        <Footer onNav={onNav} />
      </div>
    </div>
  );
};

const WorkPage = ({ onProjectSelect }) => {
  return (
    <div className="max-w-container mx-auto px-4 lg:px-[110px] py-20 text-text-dark">
      <WorkSection title="DESIGN" onProjectSelect={onProjectSelect} />
      <WorkSection title="BRAND" textAlign="right" onProjectSelect={onProjectSelect} />
      <WorkSection title="STRATEGY" onProjectSelect={onProjectSelect} />
      <div className="mt-20">
        <div className="max-w-[576px] mx-auto text-center">
            <h3 className="text-h3 font-bold font-heading">Patrick East</h3>
            <p className="mt-4 text-text-secondary text-xl text-left">
              My passion for design and typography started when I was 15, doing large-scale mural and typographic art. It gave me a deep, hands-on understanding of form, composition, and letter structure that I didn’t have a name for back then. It’s where I first learned to master the craft and earn respect. I’ve spent my entire professional career, from graphic design to UX, refining that same passion.
            </p>
        </div>
      </div>
    </div>
  );
};

const WorkSection = ({ title, textAlign = 'left', onProjectSelect }) => (
  <section className={`mb-16 ${textAlign === 'right' ? 'text-right' : 'text-left'} max-lg:text-center`}>
    <h1 className={`text-h1-huge font-heading font-bold leading-none max-xl:text-[150px] max-tablet:text-[120px] max-mobile:text-[80px] ${textAlign === 'left' ? '-ml-[10px]' : '-mr-[10px]'} max-lg:mx-0`}>
      {title}
    </h1>
    <div className={`grid grid-cols-2 gap-[71px] mt-8 max-lg:grid-cols-1 max-lg:gap-8 max-lg:place-items-center ${textAlign === 'right' ? 'justify-end' : ''}`}>
      <ProjectCard onSelect={onProjectSelect} />
      <ProjectCard onSelect={onProjectSelect} />
    </div>
  </section>
);

const ProjectCard = ({ onSelect }) => {
  return (
    <div onClick={() => onSelect(sampleProject)} className="group relative cursor-pointer transition-transform duration-300 hover:-translate-y-4 w-full max-w-[576px]">
      <div className="w-full h-[400px] bg-med-background rounded-card" />
      <div className="absolute bottom-[10px] left-[10px] right-[10px] p-3 bg-primary-button text-white rounded-card flex justify-between items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <h4 className="font-nav font-bold text-xl">Case Study Title</h4><ArrowUpRight size={28} />
      </div>
    </div>
  );
};

const AboutPage = ({ setCurrentPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => { /* ... */ };
  const handleNext = () => { /* ... */ };

  return (
    <div className="text-text-light">
      <section className="relative max-w-container mx-auto px-4 lg:px-[110px] py-12 tablet:py-24 grid grid-cols-2 gap-16 items-center max-tablet:grid-cols-1 max-tablet:text-center">
        <div className="max-tablet:order-last">
          <p className="font-nav text-primary-button bg-primary-button/50 px-4 py-2 rounded-full inline-block mb-4 max-tablet:hidden">UX/UI Design</p>
          <div className="max-w-2xl mx-auto">
            <h1 className="text-h1 font-heading font-bold leading-tight max-sm:text-h2 text-left max-tablet:text-center">I'm Patrick East <br/> Creative Lead & Marketing Specialist</h1>
            <p className="text-gray-400 mt-6 text-xl text-left">Hands-on creative lead who designs for results—I specialize in building everything from brand campaigns to pixel-perfect web apps, all focused on creating intuitive user experiences that deliver.</p>
          </div>
          <button onClick={() => setCurrentPage('work')} className="mt-8 bg-primary-button text-white font-nav font-bold text-xl px-8 py-3 rounded-md transition-transform duration-300 hover:scale-105 hidden tablet:inline-block xs:hidden">View My Work</button>
          <a href="#contact-section" className="mt-8 bg-primary-button text-white font-nav font-bold text-xl px-8 py-3 rounded-md transition-transform duration-300 hover:scale-105 hidden xs:inline-block tablet:hidden">Get In Touch</a>
        </div>
        <div className="relative w-full max-w-[500px] h-[500px] mx-auto">
          <img src="/hero.png" alt="Patrick East" className="w-full h-full object-cover rounded-card"/>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-background to-transparent rounded-card" />
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-full flex-col items-center justify-center tablet:hidden hidden max-xs:flex">
             <a href="#contact-section" className="bg-primary-button text-white font-nav font-bold text-xl px-8 py-3 rounded-md transition-transform duration-300 hover:scale-105">Get In Touch</a>
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-full flex justify-center tablet:hidden max-xs:hidden">
            <button onClick={() => setCurrentPage('work')} className="bg-primary-button text-white font-nav font-bold text-xl px-8 py-3 rounded-md transition-transform duration-300 hover:scale-105">View My Work</button>
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="max-w-container mx-auto px-4 lg:px-[110px]">
          <h2 className="text-h2 font-heading text-center font-bold">My Skills</h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4 mb-8" />
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-400 mb-16 text-xl text-left">I've cultivated a diverse set of skills throughout my career. Here's an overview of some of my technical expertise and competencies.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-8 max-tablet:grid-cols-1">
            <SkillBar skill="UI/UX Design" percentage={90} /><SkillBar skill="React.js" percentage={80} /><SkillBar skill="Graphic Design" percentage={95} /><SkillBar skill="Tailwind CSS" percentage={80} /><SkillBar skill="Figma" percentage={85} /><SkillBar skill="Javascript" percentage={85} /><SkillBar skill="Video" percentage={75} /><SkillBar skill="Marketing" percentage={75} />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-container mx-auto px-4 lg:px-[110px]">
          <h2 className="text-h2 font-heading text-center font-bold">What Clients and Colleagues Say</h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4 mb-8" />
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-400 mb-16 text-xl text-left">Don't just take my word for it. Here's what clients have to say about working with me on their projects.</p>
          </div>
          <div className="relative">
            <button onClick={handlePrev} className="absolute left-[-60px] top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:scale-110 transition-all duration-300 max-lg:left-[-20px]"><ChevronLeft size={32} /></button>
            <div className="grid grid-cols-2 gap-16 w-full max-tablet:grid-cols-1 max-tablet:gap-8 max-w-[576px] tablet:max-w-none mx-auto">
              <TestimonialCard name={testimonialsData[currentIndex].name} title={testimonialsData[currentIndex].title} quote={testimonialsData[currentIndex].quote} />
              <div className="max-tablet:hidden">
                <TestimonialCard name={testimonialsData[currentIndex + 1].name} title={testimonialsData[currentIndex + 1].title} quote={testimonialsData[currentIndex + 1].quote} />
              </div>
            </div>
            <button onClick={handleNext} className="absolute right-[-60px] top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:scale-110 transition-all duration-300 max-lg:right-[-20px]"><ChevronRight size={32} /></button>
          </div>
        </div>
      </section>

      <div className="bg-dark-background py-20">
        <div className="max-w-2xl mx-auto text-center px-4">
            <h3 className="text-h2 font-bold font-heading text-white">Patrick East</h3>
            <p className="mt-4 text-gray-400 text-xl text-left">My passion for design and typography started when I was 15, doing large-scale mural and typographic art. It gave me a deep, hands-on understanding of form, composition, and letter structure that I didn’t have a name for back then. It’s where I first learned to master the craft and earn respect. I’ve spent my entire professional career, from graphic design to UX, refining that same passion.</p>
        </div>
      </div>
    </div>
  );
};


const SkillBar = ({ skill, percentage }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1 font-bold text-h5"><span>{skill}</span><span className="text-accent">{percentage}%</span></div>
      <div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-accent h-2.5 rounded-full" style={{ width: `${percentage}%` }} /></div>
    </div>
  );
};

const TestimonialCard = ({ name, title, quote }) => {
  return (
    <div className="bg-med-background text-text-dark p-8 rounded-card">
      <div className="flex items-center mb-4"><img src="https://i.imgur.com/5N2gL11.png" alt={name} className="w-16 h-16 rounded-full mr-4"/><div><h4 className="font-bold font-heading text-xl">{name}</h4><p className="text-text-secondary">{title}</p></div></div>
      <p className="text-text-secondary text-xl">"{quote}"</p>
    </div>
  );
};

export default App;