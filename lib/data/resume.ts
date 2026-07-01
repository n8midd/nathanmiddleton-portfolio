export interface CareerSubRole {
  title: string;
  startDate: string;
  endDate: string;
}

export interface CareerRole {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  highlights: string[];
  technologies?: string[];
  subRoles?: CareerSubRole[];
}

export interface ResumeSkillGroup {
  label: string;
  items: string[];
}

export interface ResumeEducation {
  degree: string;
  school: string;
  location: string;
  date: string;
}

export interface ResumeCertification {
  name: string;
  status?: string;
}

export const resumeSummary =
  "Software developer engineer in test with 17+ years of experience in quality assurance and test automation. Expertise in designing enterprise-level testing frameworks and implementing quality engineering best practices. Demonstrated success in improving application quality through innovative solutions and effective leadership of cross-functional teams.";

export const resumeSkillGroups: ResumeSkillGroup[] = [
  {
    label: "Programming languages",
    items: ["TypeScript", "JavaScript", "Java", "Python", "C#", "SQL", "Bash"],
  },
  {
    label: "Test automation",
    items: [
      "Framework development",
      "Selenium",
      "Playwright",
      "API testing",
      "Contract testing",
      "Page Object Model",
      "Data-driven testing",
      "BDD",
      "Cucumber",
    ],
  },
  {
    label: "CI/CD and DevOps",
    items: ["GitHub Actions", "CI/CD pipelines", "AWS"],
  },
  {
    label: "Testing tools",
    items: ["Postman", "Jira", "Zephyr"],
  },
  {
    label: "QA leadership",
    items: ["Test strategy design", "Test planning", "Root cause analysis", "Shift-left testing"],
  },
];

export const resumeEducation: ResumeEducation = {
  degree: "Associate's Degree — Software Application and Programming",
  school: "ITT Tech",
  location: "Grand Rapids, MI",
  date: "May 2008",
};

export const resumeCertifications: ResumeCertification[] = [
  { name: "Salesforce Certified Administrator" },
  { name: "Informatica Cloud Data Integration Specialist" },
  { name: "Learning Go", status: "In progress" },
];

export const careerRoles: CareerRole[] = [
  {
    id: "sirona-medical",
    company: "Sirona Medical",
    title: "Sr QA SDET",
    location: "United States",
    startDate: "Oct 2025",
    endDate: "Jun 2026",
    summary:
      "Senior quality engineering role focused on test automation, framework reliability, and cross-functional delivery in a healthcare technology environment.",
    highlights: [
      "Lead test automation strategy and execution for product releases.",
      "Design and maintain scalable automated test suites with clear ownership and triage practices.",
      "Partner with engineering and product to shift testing left and improve release confidence.",
      "Designed internal tooling integrating Zephyr and Jira data into a unified, reportable format for regulatory documentation and audit readiness.",
      "Drive continuous improvement in test stability, reporting visibility, and framework maintainability.",
    ],
    technologies: ["Playwright", "TypeScript", "CI/CD", "API testing", "Zephyr"],
  },
  {
    id: "ncino-principal",
    company: "nCino, Inc.",
    title: "Principal Software Engineer",
    location: "Wilmington, United States",
    startDate: "Jul 2023",
    endDate: "May 2025",
    summary:
      "Led enterprise-wide quality automation initiatives as technical architect and subject-matter expert for a cloud banking platform.",
    highlights: [
      "Modernized and streamlined the automation framework using Page Object Model, improving maintainability, scalability, and onboarding efficiency.",
      "Increased automated test reliability and execution success rates from the mid-80% range to over 95%, reducing false failures.",
      "Developed actionable metrics, dashboards, and reporting mechanisms for test health, coverage, and release readiness.",
      "Collaborated with Engineering, Product, and Compliance to align testing strategies with business and regulatory requirements.",
      "Drove continuous improvement in test stability, framework architecture, reporting automation, and operational efficiency.",
    ],
    technologies: ["Playwright", "TypeScript", "Cucumber", "Java", "Jira", "BDD", "AWS"],
  },
  {
    id: "ncino-senior",
    company: "nCino, Inc.",
    title: "Senior Product Integration Developer",
    location: "Wilmington, United States",
    startDate: "Dec 2016",
    endDate: "Jun 2023",
    summary:
      "Led quality assurance initiatives and automation framework development while fostering cross-team collaboration on a enterprise SaaS platform.",
    highlights: [
      "Led enterprise-wide quality automation initiatives and maintained a comprehensive testing framework serving multiple development teams.",
      "Established standardized quality engineering practices and implemented metrics collection across platforms.",
      "Increased automation test creation by 250% within one year by enhancing the framework and streamlining onboarding.",
      "Led implementation of coding standards and best practices, improving team productivity and software reliability.",
      "Specialized in third-party integration validation and implementation of quality metrics.",
      "Engineered a robust automation framework for validating third-party integrations, reducing defect rates within six months.",
      "Provided technical support for enterprise clients, resolving framework implementation challenges.",
    ],
    technologies: ["Playwright", "TypeScript", "Cucumber", "Java", "API testing", "Jira"],
  },
  {
    id: "dell-sdet",
    company: "Dell",
    title: "Software Developer Engineer in Test",
    location: "Round Rock, TX",
    startDate: "Feb 2014",
    endDate: "Dec 2016",
    summary:
      "Led end-to-end quality assurance initiatives and developed automated testing solutions for enterprise software applications.",
    highlights: [
      "Spearheaded implementation of innovative testing frameworks and quality improvement strategies.",
      "Transformed the testing process with a comprehensive reporting system, improving visibility and stakeholder decision-making.",
      "Drove a collaborative approach to quality assurance, improving project delivery timelines and team efficiency.",
      "Developed automated testing solutions for enterprise software applications at scale.",
    ],
    technologies: ["Selenium", "Java", "C#", "TestNG"],
  },
  {
    id: "intellectual-ventures",
    company: "Intellectual Ventures",
    title: "Software Engineer / QA Engineer",
    location: "Bellevue, WA",
    startDate: "Jun 2009",
    endDate: "Jan 2014",
    summary:
      "Progressive career from intern QA through software engineering, building automation solutions and maintaining business-critical applications.",
    highlights: [
      "Developed a comprehensive test automation solution that enabled team members to execute tests with minimal training.",
      "Implemented automated DVT tests that cut regression testing time almost in half.",
      "Implemented a quality transformation strategy that elevated code quality and promoted continuous improvement.",
      "Maintained applications end-to-end, partnering with business stakeholders on defects and enhancements.",
      "Triaged defects and enhancement requests with business owners to ensure work delivered true business value.",
      "Mentored other QA engineers on running and developing automation.",
    ],
    technologies: ["C#", "Selenium", "Manual testing", "Test planning"],
    subRoles: [
      {
        title: "Software Engineer",
        startDate: "Jan 2012",
        endDate: "Jan 2014",
      },
      {
        title: "Associate Software Engineer",
        startDate: "Jun 2010",
        endDate: "Jan 2012",
      },
      {
        title: "Software Quality Assurance Engineer",
        startDate: "Jan 2010",
        endDate: "Jun 2010",
      },
      {
        title: "Associate Software Quality Assurance Engineer",
        startDate: "Oct 2008",
        endDate: "Jan 2010",
      },
      {
        title: "Intern Software Quality Assurance Engineer",
        startDate: "Jun 2009",
        endDate: "Jan 2010",
      },
    ],
  },
];

export function formatDateRange(startDate: string, endDate: string | null): string {
  if (!endDate) {
    return `${startDate} – Present`;
  }
  return `${startDate} – ${endDate}`;
}

export function getRoleById(id: string): CareerRole | undefined {
  return careerRoles.find((role) => role.id === id);
}
