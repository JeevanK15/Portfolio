import { achievements } from "@/data/achievements";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

export function getAskJeevanAnswer(question: string): string {
  const normalizedQuestion = question.trim().toLowerCase();

  if (!normalizedQuestion) {
    return "I can answer questions about Jeevan's portfolio, projects, skills, education, and contact details.";
  }

  if (
    normalizedQuestion.includes("who is jeevan") ||
    normalizedQuestion.includes("who is he") ||
    normalizedQuestion.includes("tell me about jeevan")
  ) {
    return "Jeevan K is a final-year B.Tech Artificial Intelligence and Data Science student focused on Full Stack Development, Data Analytics, and UI/UX. He enjoys learning by building practical projects and improving through real work.";
  }

  if (
    normalizedQuestion.includes("what technologies") ||
    normalizedQuestion.includes("what does jeevan know") ||
    normalizedQuestion.includes("skills")
  ) {
    const skills = skillGroups.flatMap((group) => group.items).slice(0, 12);
    return `Jeevan works with ${skills.join(", ")}, with especially strong focus on Python, HTML, CSS, and Figma.`;
  }

  if (normalizedQuestion.includes("pycheck")) {
    return "PyCheck is a Python code checking and correction tool designed to help beginners identify and correct coding errors without changing the intended logic. It is not an AI/ML project, and it is a partially working team project that still needs improvement.";
  }

  if (normalizedQuestion.includes("trickbills")) {
    return "TrickBills is a smart bill analysis web application that uses OCR and NLP techniques to extract and analyze bill data, automate categorization, and generate expense insights. It is still partially working and under ongoing improvement.";
  }

  if (
    normalizedQuestion.includes("where did jeevan intern") ||
    normalizedQuestion.includes("intern") ||
    normalizedQuestion.includes("experience")
  ) {
    const internships = experiences
      .map((item) => `${item.role} at ${item.company} (${item.startDate} – ${item.endDate})`)
      .join("; ");

    return `Jeevan has interned at ${internships}.`;
  }

  if (
    normalizedQuestion.includes("what is jeevan studying") ||
    normalizedQuestion.includes("education") ||
    normalizedQuestion.includes("cgpa") ||
    normalizedQuestion.includes("college")
  ) {
    return `Jeevan is pursuing ${education.degree} at ${education.institution}, affiliated with ${education.university}, from ${education.startYear} to ${education.endYear}. His CGPA is ${education.cgpa}.`;
  }

  if (
    normalizedQuestion.includes("how can i contact") ||
    normalizedQuestion.includes("contact") ||
    normalizedQuestion.includes("email") ||
    normalizedQuestion.includes("phone")
  ) {
    return `You can reach Jeevan at ${profile.email} or call ${profile.phone}. He is based in ${profile.location}.`;
  }

  if (normalizedQuestion.includes("projects")) {
    return `Jeevan has two main projects: ${projects.map((project) => project.name).join(" and ")}.`;
  }

  if (normalizedQuestion.includes("achievement") || normalizedQuestion.includes("award")) {
    return `Jeevan received Academic Excellence recognition for securing Second Rank in the department and the Visionary Innovators Award at Hack Fest 2K25.`;
  }

  if (normalizedQuestion.includes("certification") || normalizedQuestion.includes("certificate")) {
    return `Jeevan has completed a Web Development certification from George Academy (2024) and the Fundamentals of Agile Methodology with DevOps Integration certification from L&T EduTech (2025).`;
  }

  if (normalizedQuestion.includes("leadership") || normalizedQuestion.includes("ai-nex")) {
    return "Jeevan serves as President of AI-NEX, the department association.";
  }

  if (normalizedQuestion.includes("what are my achievements") || normalizedQuestion.includes("academic excellence")) {
    return achievements[0].description;
  }

  return "I can answer only questions about Jeevan’s portfolio, skills, projects, education, experience, certifications, leadership, and contact details. If you want more information about a specific topic, ask about one of those areas.";
}
