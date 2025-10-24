const siteData = {
  meta: {
    title: "Yannick Deetman — Communicatiestudent (HvA), vibecoding front end, fotografie",
    description: "eerstejaars communicatie student aan de HvA. Houd van strak en gestructureerd werken en dingen die echt werkelijk goed afgemaakt zijn.",
    url: "https://yannickdeetman.com/",
    image: "https://yannickdeetman.com/assets/meta/og-image.svg"
  },
  owner: {
    name: "Yannick Deetman",
    tagline: "Communicatiestudent (HvA), vibecoding front end, fotografie",
    location: "Amsterdam en Alkmaar, NL",
    email: "yannick.deetman@icloud.com",
    github: "https://github.com/DitIsIK",
    linkedin: "https://share.google/hWghw0HQni8dMEci6",
    letterboxd: "https://letterboxd.com/Yannick__/"
  },
  hero: {
    typed: [
      "Communicatiestudent (HvA)",
      "Vibecoding front end",
      "Fotografie & filmreviews"
    ],
    ctas: {
      projects: "#projects",
      cv: "assets/cv/Yannick_Deetman_CV.pdf"
    }
  },
  bio: {
    short:
      "Ik ben Yannick, eerstejaars Communicatiestudent aan de HvA. Ik hou van strak en gestructureerd werken en dingen die écht af zijn. Overdag in de productie bij Sympafix; ’s avonds bouw ik simpele webapps die gewoon werken.",
    long: "(nog een placeholder)"
  },
  currentFocus: [
    "Onderzoek naar digitale storytelling",
    "React componenten strakker maken",
    "Fotografie portfolio ordenen"
  ],
  skills: {
    primary: [
      "HTML",
      "CSS/Tailwind",
      "JavaScript",
      "React/Next.js",
      "UX writing",
      "Communicatieonderzoek"
    ],
    secondary: [
      "shadcn/ui",
      "Figma/Canva",
      "Notion",
      "Supabase (basis)",
      "Git"
    ]
  },
  experience: {
    timeline: [
      {
        title: "Sympafix — Productie & Simple Apps",
        period: "2024 — heden",
        body:
          "Werk in de productie en bouw interne tools voor Sympafix. Focus op nette UI’s, snelle deploys en praktische oplossingen.",
        bullets: [
          "Spijkerwijzer: compatibiliteitstool",
          "Volume Calculator: Excel-logica naar web"
        ],
        future: false
      },
      {
        title: "Toekomstige rol",
        period: "2025 — …",
        body:
          "Ruimte voor stage of part-time werk in communicatie, front-end of content.",
        bullets: [],
        future: true
      }
    ]
  },
  projects: [
    {
      title: "Sympafix Volume Calculator",
      year: "2025",
      role: "Front-end & UX",
      oneLiner: "Adhesive-volume calculator voor chemische ankers.",
      highlights: [
        "React + Tailwind UI in wit-grijs, strak en snel",
        "Dropdowns met producttypes en diameter-mappings",
        "Exacte Excel-logica geport naar web"
      ],
      tech: ["React", "Next.js", "Tailwind"],
      links: {
        demo: "https://sympafix-volumecalculator.netlify.app/",
        github: ""
      },
      cover: "assets/projects/sympafix-volume-calculator.svg"
    },
    {
      title: "Sympafix Spijkerwijzer",
      year: "2025",
      role: "Front-end",
      oneLiner: "Snelle tool met modern UI om compatibele tools/ankers te vinden.",
      highlights: [
        "Zero-dependency, snelle load",
        "Heldere states en kleurgebruik (groen = geschikt)",
        "Netlify deploy + assets fix (logo paths)"
      ],
      tech: ["HTML", "CSS", "JavaScript"],
      links: {
        demo: "https://spijkerwijzer.netlify.app/#mode=home",
        github: ""
      },
      cover: "assets/projects/sympafix-spijkerwijzer.svg"
    }
  ],
  interests: [
    "PR",
    "social media management",
    "fotografie",
    "filmreviews",
    "hockey"
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/DitIsIK", icon: "bx bxl-github" },
    { label: "LinkedIn", url: "https://share.google/hWghw0HQni8dMEci6", icon: "bx bxl-linkedin" },
    { label: "Email", url: "mailto:yannick.deetman@icloud.com", icon: "bx bx-envelope" },
    { label: "Letterboxd", url: "https://letterboxd.com/Yannick__/", icon: "bx bx-camera" }
  ]
};
