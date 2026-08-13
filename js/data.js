/* ==========================================================================
   DATA — this is the file you edit day-to-day.
   Add a project, change a skill level, or swap a photo here.
   Nothing in index.html or main.js needs to change for content updates.
   ========================================================================== */

const PROFILE = {
  name: "Buluma Enosi",
  avatar: "images/profile/avatar.jpg", // replace with a real photo, same filename or update this path
  roles: [
    "Computer Science Engineering Student",
    "AI & Machine Learning Enthusiast",
    "Full-Stack Developer",
    "Systems Programming Enthusiast",
    "Future AI Engineer",
  ],
  intro: "I'm a Ugandan Computer Science Engineering student at Ferhat Abbas University – Sétif 1, Algeria. I build secure web applications, explore algorithms, study intelligent systems, and work through hard engineering problems grounded in solid mathematics and a habit of continuous learning.",
  bio: [
    "I'm a Ugandan international student studying Computer Science Engineering at Ferhat Abbas University – Sétif 1, Algeria. My work sits at the intersection of software engineering and applied mathematics, I care as much about why an algorithm works as about shipping the feature that uses it.",
    "My mathematical foundation; linear algebra, calculus, and probability & statistics underpins everything I build, especially as I move deeper into artificial intelligence and machine learning.",
    "Outside of AI/ML, I'm drawn to software engineering, full-stack development, systems programming, operating systems, databases, computer architecture, Linux, and open-source software. I learn best by building real things: secure systems, small tools, and projects that serve real people.",
    "My long-term goal is to become an AI/ML Engineer, developing intelligent systems that solve meaningful, real-world problems.",
  ],
  email: "enositbale@gmail.com",
  github: "https://github.com/Innocebelz",
  linkedin: "https://linkedin.com/in/bulumaenosi",
  location: "Sétif, Algeria",
  cvUrl: "#", // point this at your actual CV file, e.g. "files/Buluma_Enosi_CV.pdf"
  quote: "I believe the future belongs to engineers who understand both the mathematics behind intelligence and the systems that bring it to life.",
};

const ABOUT_HIGHLIGHTS = [
  { icon: "sigma", title: "Mathematics", desc: "Linear Algebra · Calculus · Probability & Statistics", accent: "cyan" },
  { icon: "server", title: "Systems", desc: "OS · Computer Architecture · Databases · Linux", accent: "emerald" },
  { icon: "code-2", title: "Engineering", desc: "Full-Stack Dev · Software Design · Distributed Systems", accent: "cyan" },
  { icon: "git-branch", title: "Open Source", desc: "Git · GitHub · Building in the open", accent: "emerald" },
];

const EDUCATION_DATA = [
  {
    institution: "Ferhat Abbas University – Sétif 1",
    program: "Computer Science Engineering",
    location: "Sétif, Algeria",
    status: "In Progress",
    coursework: [
      "Algorithms", "Data Structures", "Operating Systems", "Computer Architecture",
      "Machine Structure", "Linear Algebra", "Calculus (Analysis)", "Database Systems",
      "Probability", "Software Engineering", "AI Foundations",
    ],
  },
];

const SKILLS_DATA = [
  { title: "Programming Languages", icon: "code", accent: "cyan",
    items: [["Python",75],["JavaScript",70],["TypeScript",65],["C",70],["HTML5",90],["CSS3",85],["SQL",75]] },
  { title: "Frontend", icon: "layout-panel-left", accent: "emerald",
    items: [["React",75],["Vite",70],["Tailwind CSS",85],["Responsive Design",85]] },
  { title: "Backend", icon: "server-cog", accent: "cyan",
    items: [["Node.js",70],["Express.js",65],["REST APIs",75]] },
  { title: "Databases", icon: "database", accent: "emerald",
    items: [["PostgreSQL",75],["Supabase",75],["SQL",75]] },
  { title: "AI & Mathematics", icon: "brain-circuit", accent: "cyan",
    items: [["ML Fundamentals",60],["Linear Algebra",80],["Probability",75],["Statistics",70],["Calculus",78],["NumPy",65]] },
  { title: "OS & Tools", icon: "terminal", accent: "emerald",
    items: [["Linux",70],["Git / GitHub",85],["Docker",40],["Figma",60]] },
];

/*
  PROJECTS_DATA
  - image: path to a real photo/screenshot. Drop your file into images/projects/
    with the same filename and it'll show up automatically — no other edits needed.
    If a file is missing or fails to load, the card falls back to the icon shown.
  - size: "large" (full-width card) or "small" (half-width card)
*/
const PROJECTS_DATA = [
  {
    title: "Uganda Students Electronic Voting System",
    description: "A secure electronic voting platform developed for the Ugandan Students Association in Algeria. Supports OTP authentication, secure voter verification, role-based administration, real-time vote counting, and transparent election management for roughly 600 students.",
    image: "images/projects/voting-system.jpg",
    icon: "vote",
    tech: ["React", "JavaScript", "Supabase", "PostgreSQL", "Tailwind CSS","FastAPI"],
    highlights: ["OTP Authentication", "Secure Voting", "Admin Dashboard", "Real-time Results", "Election Integrity"],
    github: "https://github.com/Innocebelz/usaavotingdemo",
    demo: "https://bulumaenosi-portifolio.vercel.app/",
    size: "large",
  },
  {
    title: "DevLink Chrome Extension",
    description: "A Chrome Extension built on Manifest V3 that improves developer productivity through quick access to essential dev resources and workflows.",
    image: "images/projects/devlink-extension.jpg",
    icon: "puzzle",
    tech: ["JavaScript", "Manifest V3"],
    highlights: [],
    github: "#",
    demo: "#",
    size: "small",
  },
  {
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio showcasing projects, skills, academic journey, and career goals — the very page you're on.",
    image: "images/projects/portfolio-site.jpg",
    icon: "layout-template",
    tech: ["HTML5", "Tailwind CSS", "JavaScript"],
    highlights: [],
    github: "#",
    demo: "#home",
    size: "small",
  },
  {
    title: "Programming & University Projects",
    description: "A running collection of coursework and self-directed practice.",
    image: "images/projects/uni-projects.jpg",
    icon: "terminal-square",
    tech: [],
    highlights: ["Data Structures in C", "Algorithms", "SQL Practice Projects", "Python Automation Scripts", "Linux Utilities"],
    github: "#",
    demo: null,
    size: "large",
    listStyle: true, // renders highlights as a plain checklist instead of badges
  },
];

const LEADERSHIP_DATA = {
  icon: "users",
  title: "Ugandan Students Association",
  description: "Active contributor to the Ugandan Students Association in Algeria, supporting technology initiatives that serve the community. This includes designing digital solutions for student engagement and leading development of the association's electronic voting and election system, built to give roughly 600 students a secure and transparent way to participate in leadership elections.",
};

const LEARNING_DATA = {
  current: ["Advanced Python", "PostgreSQL", "React", "Machine Learning", "Artificial Intelligence", "Data Structures & Algorithms", "Software Design"],
  future: ["Deep Learning", "Computer Vision", "NLP", "Reinforcement Learning", "MLOps", "Distributed Systems", "Quantum Computing"],
};

const ACHIEVEMENTS_DATA = [
  { type: "counter", target: 15, suffix: "+", label: "Personal Projects" },
  { type: "counter", target: 600, suffix: "+", label: "Users Supported" },
  { type: "counter", target: 6, suffix: "+", label: "Languages" },
  { type: "text", value: "AI/ML", label: "Career Focus" },
  { type: "text", value: "∞", label: "Continuous Learner" },
];
