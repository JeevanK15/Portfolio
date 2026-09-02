import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "pycheck",
    name: "PyCheck",
    tagline: "Fix the code, not the logic.",
    description:
      "PyCheck is a Python code checking and correction tool designed to help beginners identify and correct Python coding errors without changing the intended logic of their code.",
    problem:
      "Beginners often struggle to diagnose Python errors without unintentionally rewriting their intended logic.",
    solution:
      "PyCheck focuses on correcting code while preserving the user's intended logic rather than rewriting decisions independently.",
    status: "Partially working / requires improvement",
    githubUrl: "",
    liveUrl: "",
    technologies: ["Python", "Flask", "HTML", "CSS", "Bootstrap", "JavaScript"],
    frontend: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    backend: ["Python", "Flask"],
    features: [
      "Python code validation support",
      "Error correction workflow",
      "Logic-preserving code adjustments",
      "Beginner-friendly debugging experience",
    ],
    isPublic: false,
    gallery: ["/images/projects/pycheck-placeholder.svg", "/images/projects/pycheck-editor.svg"],
  },
  {
    id: "trickbills",
    name: "TrickBills",
    tagline: "Smart Bill Analysis Web Application",
    description:
      "TrickBills is a full-stack web application designed to extract and analyze bill information using OCR and NLP techniques. It helps automate bill categorization and generate expense insights to improve expense tracking.",
    problem:
      "Managing and understanding personal expenses from bills can be time-consuming and difficult to organize.",
    solution:
      "The application extracts bill information and uses OCR and NLP to categorize and summarize expense data for better tracking.",
    status: "Partially working / ongoing improvements",
    githubUrl: "https://github.com/jeevank15/TrickBills",
    liveUrl: "",
    technologies: ["Python", "HTML", "CSS", "JavaScript", "SQLAlchemy", "OCR", "NLP"],
    frontend: ["HTML", "CSS", "JavaScript"],
    backend: ["Python"],
    database: ["SQLAlchemy"],
    features: [
      "Bill extraction using OCR",
      "Expense analysis and categorization",
      "NLP-based processing for bill understanding",
      "Expense insight generation",
    ],
    isPublic: true,
    gallery: ["/images/projects/trickbills-placeholder.svg", "/images/projects/trickbills-dashboard.svg"],
  },
];
