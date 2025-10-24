(function () {
  "use strict";

  if (typeof siteData === "undefined") {
    throw new Error("siteData is required. Did you forget to include assets/js/site-data.js?");
  }

  const qs = (selector, parent = document) => parent.querySelector(selector);
  const qsa = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  const formatList = (items, className) => {
    const list = document.createElement("ul");
    list.className = className;
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    return list;
  };

  const createBadgeGroup = (items) => {
    const container = document.createElement("div");
    container.className = "badge-group";
    items.forEach((item) => {
      const span = document.createElement("span");
      span.className = "skill-badge";
      span.textContent = item;
      container.appendChild(span);
    });
    return container;
  };

  let moveNavUnderline = () => {};
  const themeBySection = {
    skills: "skills",
    experience: "experience",
    projects: "projects",
    contact: "contact"
  };

  const prefersReducedMotion = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  const typedEffect = (element, strings) => {
    if (!element || !strings || !strings.length) {
      return;
    }

    let index = 0;
    let subIndex = 0;
    let isDeleting = false;
    let frame;

    const step = () => {
      const current = strings[index];
      if (!isDeleting) {
        subIndex += 1;
        if (subIndex === current.length + 1) {
          isDeleting = true;
          frame = setTimeout(step, 1200);
          return;
        }
      } else {
        subIndex -= 1;
        if (subIndex === 0) {
          isDeleting = false;
          index = (index + 1) % strings.length;
        }
      }

      element.textContent = current.slice(0, subIndex);
      const delay = isDeleting ? 60 : 90;
      frame = setTimeout(step, delay);
    };

    frame = setTimeout(step, 400);

    return () => clearTimeout(frame);
  };

  const animateHeroTitle = () => {
    const title = qs(".hero__title");
    if (!title || title.dataset.wordsApplied === "true") {
      return;
    }

    const text = title.textContent?.trim();
    if (!text) {
      return;
    }

    const words = text.split(/\s+/);
    title.textContent = "";

    const spans = words.map((word, index) => {
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = word;
      span.style.setProperty("--word-delay", `${index * 0.06}s`);
      title.appendChild(span);
      if (index < words.length - 1) {
        title.appendChild(document.createTextNode(" "));
      }
      return span;
    });

    title.dataset.wordsApplied = "true";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        spans.forEach((span) => span.classList.add("is-visible"));
      });
    });
  };

  const populateMeta = () => {
    const { meta } = siteData;
    document.title = meta.title;
    const setMeta = (selector, attribute, value) => {
      const element = qs(selector);
      if (element && value) {
        element.setAttribute(attribute, value);
      }
    };

    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:url"]', "content", meta.url);
    setMeta('meta[property="og:image"]', "content", meta.image);
    setMeta('meta[property="og:image:type"]', "content", meta.imageType);
    setMeta('meta[property="og:site_name"]', "content", siteData.owner?.name ?? "");
    setMeta('meta[name="twitter:title"]', "content", meta.title);
    setMeta('meta[name="twitter:description"]', "content", meta.description);
    setMeta('meta[name="twitter:image"]', "content", meta.image);
    setMeta('meta[name="twitter:card"]', "content", meta.card);
    setMeta('link[rel="canonical"]', "href", meta.url);
  };

  const populateHero = () => {
    const { owner, hero, socials } = siteData;
    const nameEl = qs('[data-site="name"]');
    if (nameEl) {
      nameEl.textContent = owner.name;
    }
    const taglineEl = qs('[data-site="tagline"]');
    if (taglineEl) {
      taglineEl.textContent = owner.tagline;
    }
    const heroSummary = qs('[data-site="hero-summary"]');
    if (heroSummary) {
      heroSummary.textContent = siteData.bio.short;
    }
    const typedEl = qs('.typing');
    if (typedEl) {
      typedEffect(typedEl, hero.typed);
    }

    const heroSocials = qs('[data-site="socials"]');
    if (heroSocials) {
      socials.forEach((social) => {
        const link = document.createElement("a");
        link.href = social.url;
        link.className = "social-link";
        link.target = "_blank";
        link.rel = "noreferrer";
        link.innerHTML = `<span class="sr-only">${social.label}</span><i class="${social.icon}" aria-hidden="true"></i>`;
        heroSocials.appendChild(link);
      });
    }

    const projectCta = qs('[data-cta="projects"]');
    if (projectCta) {
      projectCta.setAttribute("href", hero.ctas.projects);
      if (hero.ctaLabels?.projects) {
        projectCta.textContent = hero.ctaLabels.projects;
      }
    }
    const cvCta = qs('[data-cta="cv"]');
    if (cvCta) {
      cvCta.setAttribute("href", hero.ctas.cv);
      if (hero.ctaLabels?.cv) {
        cvCta.textContent = hero.ctaLabels.cv;
      }
    }

    const heroMedia = qs(".hero__media");
    if (heroMedia && !heroMedia.classList.contains("parallax")) {
      heroMedia.classList.add("parallax");
      heroMedia.dataset.parallaxDepth = "0.15";
    }

    animateHeroTitle();
  };

  const populateAbout = () => {
    const { owner, bio, currentFocus, interests } = siteData;
    const shortEl = qs('[data-site="bio-short"]');
    if (shortEl) {
      shortEl.textContent = bio.short;
    }
    const longEl = qs('[data-site="bio-long"]');
    if (longEl) {
      longEl.textContent = bio.long;
    }
    qsa('[data-site="location"]').forEach((node) => {
      node.textContent = owner.location;
    });
    qsa('[data-site="email"]').forEach((node) => {
      if (node instanceof HTMLAnchorElement) {
        node.href = `mailto:${owner.email}`;
      }
      node.textContent = owner.email;
    });
    const currentListTarget = qs('[data-site="current-focus"]');
    if (currentListTarget) {
      currentListTarget.appendChild(formatList(currentFocus, "mini-list"));
    }
    const interestsTarget = qs('[data-site="interests"]');
    if (interestsTarget) {
      interestsTarget.appendChild(createBadgeGroup(interests));
    }
  };

  const populateSkills = () => {
    const { skills } = siteData;
    const primaryHeading = qs('[data-skill="primary-label"]');
    if (primaryHeading) {
      primaryHeading.textContent = skills.primaryLabel;
    }
    const primarySubtitle = qs('[data-skill="primary-note"]');
    if (primarySubtitle) {
      primarySubtitle.textContent = skills.primaryNote;
    }
    const primaryTarget = qs('[data-site="skills-primary"]');
    if (primaryTarget) {
      primaryTarget.appendChild(createBadgeGroup(skills.primary));
    }
    const secondaryHeading = qs('[data-skill="secondary-label"]');
    if (secondaryHeading) {
      secondaryHeading.textContent = skills.secondaryLabel;
    }
    const secondarySubtitle = qs('[data-skill="secondary-note"]');
    if (secondarySubtitle) {
      secondarySubtitle.textContent = skills.secondaryNote;
    }
    const secondaryTarget = qs('[data-site="skills-secondary"]');
    if (secondaryTarget) {
      secondaryTarget.appendChild(createBadgeGroup(skills.secondary));
    }
  };

  const populateExperience = () => {
    const timelineTarget = qs('[data-timeline]');
    if (!timelineTarget) {
      return;
    }

    const items = siteData.experience?.timeline ?? [];
    items.forEach((item) => {
      const entry = document.createElement("article");
      entry.className = "timeline-item";
      if (item.future) {
        entry.classList.add("timeline-item--future");
      }

      const dot = document.createElement("span");
      dot.className = "timeline-dot";
      dot.setAttribute("aria-hidden", "true");
      entry.appendChild(dot);

      const card = document.createElement("div");
      card.className = "timeline-card";
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p class="timeline-card__meta">${item.period}</p>
        <p class="timeline-card__body">${item.body}</p>
      `;

      if (Array.isArray(item.bullets) && item.bullets.length) {
        card.appendChild(formatList(item.bullets, "timeline-card__list"));
      }

      entry.appendChild(card);
      timelineTarget.appendChild(entry);
    });
  };

  const populateProjects = () => {
    const projectsTarget = qs('[data-site="projects"]');
    if (!projectsTarget) {
      return;
    }

    siteData.projects.forEach((project) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.innerHTML = `
        <div class="project-card__image">
          <img src="${project.cover}" alt="Cover voor ${project.title}" loading="lazy" width="960" height="540" />
        </div>
        <div class="project-card__body">
          <header class="project-card__header">
            <p class="project-card__meta">${project.year} · ${project.role}</p>
            <h3>${project.title}</h3>
            <p class="project-card__lead">${project.oneLiner}</p>
          </header>
        </div>
      `;

      const list = formatList(project.highlights, "project-card__list");
      card.querySelector(".project-card__body").appendChild(list);

      const techGroup = createBadgeGroup(project.tech);
      techGroup.classList.add("project-card__tech");
      card.querySelector(".project-card__body").appendChild(techGroup);

      const actions = document.createElement("div");
      actions.className = "project-card__actions";
      if (project.links.demo) {
        const demoLink = document.createElement("a");
        demoLink.href = project.links.demo;
        demoLink.target = "_blank";
        demoLink.rel = "noreferrer";
        demoLink.className = "button button--ghost";
        demoLink.textContent = "Bekijk demo";
        actions.appendChild(demoLink);
      }
      if (project.links.github) {
        const codeLink = document.createElement("a");
        codeLink.href = project.links.github;
        codeLink.target = "_blank";
        codeLink.rel = "noreferrer";
        codeLink.className = "button button--ghost";
        codeLink.textContent = "Bekijk code";
        actions.appendChild(codeLink);
      }
      if (actions.children.length) {
        card.querySelector(".project-card__body").appendChild(actions);
      }

      const shine = document.createElement("span");
      shine.className = "card__shine";
      shine.setAttribute("aria-hidden", "true");
      card.appendChild(shine);

      projectsTarget.appendChild(card);
    });
  };

  const populateContact = () => {
    const { owner, socials } = siteData;
    const findSocial = (label) => socials.find((social) => social.label === label);
    const emailTarget = qs('[data-contact="email"]');
    if (emailTarget) {
      emailTarget.href = `mailto:${owner.email}`;
      emailTarget.textContent = owner.email;
    }
    const githubTarget = qs('[data-contact="github"]');
    if (githubTarget) {
      const github = findSocial("GitHub");
      githubTarget.href = github?.url ?? owner.github;
      githubTarget.textContent = github?.label ?? "GitHub";
    }
    const linkedinTarget = qs('[data-contact="linkedin"]');
    if (linkedinTarget) {
      const linkedin = findSocial("LinkedIn");
      linkedinTarget.href = linkedin?.url ?? owner.linkedin;
      linkedinTarget.textContent = linkedin?.label ?? "LinkedIn";
    }
    const socialList = qs('[data-contact="socials"]');
    if (socialList) {
      const primaryLabels = new Set(["Email", "GitHub", "LinkedIn"]);
      socials
        .filter((social) => !primaryLabels.has(social.label))
        .forEach((social) => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.href = social.url;
          link.target = "_blank";
          link.rel = "noreferrer";
          link.textContent = social.label;
          li.appendChild(link);
          socialList.appendChild(li);
        });
    }

    const form = qs("[data-contact-form]");
    if (form) {
      form.setAttribute("action", `mailto:${owner.email}`);
    }
  };

  const populateFooter = () => {
    const yearTarget = qs('[data-site="year"]');
    if (yearTarget) {
      yearTarget.textContent = new Date().getFullYear();
    }
    const nameTarget = qs('[data-site="footer-name"]');
    if (nameTarget) {
      nameTarget.textContent = siteData.owner.name;
    }
  };

  const applyThemeForSection = (sectionId) => {
    const theme = themeBySection[sectionId];
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  const initScrollSpy = () => {
    const navLinks = qsa('.nav-menu a[href^="#"]');
    if (!navLinks.length) {
      return;
    }

    const sections = navLinks
      .map((link) => qs(link.getAttribute("href")))
      .filter(Boolean);

    const setActiveSection = (targetId) => {
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${targetId}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "true");
          moveNavUnderline(link);
        } else {
          link.removeAttribute("aria-current");
        }
      });
      applyThemeForSection(targetId);
    };

    if (sections.length) {
      setActiveSection(sections[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.15) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.15, 0.6]
      }
    );

    sections.forEach((section) => observer.observe(section));
  };

  const initMobileNav = () => {
    const toggle = qs(".mobile-nav-toggle");
    const nav = qs("nav");
    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("nav-open", !expanded);
    });

    qsa('nav a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("nav-open");
      });
    });
  };

  const enableSmoothScroll = () => {
    qsa('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (targetId && targetId.startsWith("#") && targetId.length > 1) {
          const section = qs(targetId);
          if (section) {
            event.preventDefault();
            section.scrollIntoView({ behavior: "smooth", block: "start" });
            section.focus({ preventScroll: true });
          }
        }
      });
    });
  };

  // reveal-on-scroll animation
  const initSectionReveal = () => {
    const sections = qsa(".reveal");
    if (!sections.length) {
      return;
    }

    const prepareStaggerTargets = (section) => {
      if (!section || !(section instanceof HTMLElement)) {
        return;
      }

      const existing = qsa("[data-stagger]", section);
      if (existing.length) {
        return;
      }

      const container = section.querySelector(".container");
      const scope = container ?? section;
      Array.from(scope.children).forEach((child) => {
        if (child instanceof HTMLElement && !child.hasAttribute("data-stagger")) {
          child.setAttribute("data-stagger", "");
        }
      });

      qsa(
        ".section-header, .about-card, .skills-card, .timeline-item, .timeline-card, .project-card, .contact-card",
        section
      ).forEach((el) => {
        if (!el.hasAttribute("data-stagger")) {
          el.setAttribute("data-stagger", "");
        }
      });
    };

    sections.forEach(prepareStaggerTargets);

    if (prefersReducedMotion.matches) {
      sections.forEach((section) => {
        section.classList.add("show");
        qsa("[data-stagger]", section).forEach((node) => {
          if (node instanceof HTMLElement) {
            node.style.opacity = "1";
            node.style.transform = "none";
            node.style.removeProperty("--stagger-delay");
          }
        });
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.15) {
            entry.target.classList.add("show");
            qsa("[data-stagger]", entry.target).forEach((node, index) => {
              node.style.setProperty("--stagger-delay", `${index * 0.06}s`);
            });
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    sections.forEach((section) => observer.observe(section));
  };

  const initNavUnderline = () => {
    const navMenu = qs(".nav-menu");
    const links = qsa(".nav-menu a");
    if (!navMenu || !links.length) {
      return;
    }

    const underline = document.createElement("span");
    underline.className = "nav-underline";
    navMenu.appendChild(underline);

    let activeLink = links.find((link) => link.classList.contains("is-active")) || links[0];

    const setUnderline = (link, markActive = false) => {
      if (!link) {
        return;
      }
      const linkRect = link.getBoundingClientRect();
      const menuRect = navMenu.getBoundingClientRect();
      const width = linkRect.width;
      const offsetX = linkRect.left - menuRect.left;
      underline.style.width = `${width}px`;
      underline.style.transform = `translateX(${offsetX}px)`;
      if (markActive) {
        underline.classList.add("is-visible");
        activeLink = link;
      }
    };

    moveNavUnderline = (link) => {
      setUnderline(link, true);
    };

    const restoreActive = () => {
      if (activeLink) {
        setUnderline(activeLink, false);
      }
    };

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => setUnderline(link, false));
      link.addEventListener("focus", () => setUnderline(link, false));
      link.addEventListener("mouseleave", restoreActive);
      link.addEventListener("blur", restoreActive);
    });

    navMenu.addEventListener("mouseleave", restoreActive);
    window.addEventListener("resize", () => restoreActive());

    setUnderline(activeLink, true);
  };

  const initProjectCardTilt = () => {
    if (prefersReducedMotion.matches) {
      return;
    }

    const cards = qsa(".project-card");
    if (!cards.length) {
      return;
    }

    const maxTilt = 10;

    const resetCard = (card) => {
      card.style.transform = "translateY(0)";
      card.style.removeProperty("box-shadow");
      const shine = card.querySelector(".card__shine");
      if (shine) {
        shine.style.opacity = "";
        shine.style.removeProperty("background");
      }
    };

    cards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const percentX = (event.clientX - rect.left) / rect.width - 0.5;
        const percentY = (event.clientY - rect.top) / rect.height - 0.5;
        const rotateY = percentX * maxTilt;
        const rotateX = -percentY * maxTilt;
        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
        card.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.18)";

        const shine = card.querySelector(".card__shine");
        if (shine) {
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          shine.style.opacity = "1";
          shine.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.35), transparent 60%)`;
        }
      });

      card.addEventListener("pointerleave", () => resetCard(card));
      card.addEventListener("pointerup", () => resetCard(card));
      card.addEventListener("pointercancel", () => resetCard(card));
    });
  };

  const initParallax = () => {
    if (prefersReducedMotion.matches) {
      return;
    }

    const elements = qsa(".parallax");
    if (!elements.length) {
      return;
    }

    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      elements.forEach((el) => {
        if (!(el instanceof HTMLElement)) {
          return;
        }
        const depth = parseFloat(el.dataset.parallaxDepth || "0.15");
        const offset = scrollY * depth * -1;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    update();
  };

  // scroll progress indicator
  const initScrollProgress = () => {
    const bar = qs(".scroll-progress__bar");
    if (!bar) {
      return;
    }

    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const ratio = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      bar.style.transform = `scaleX(${ratio})`;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    update();
  };

  const init = () => {
    populateMeta();
    populateHero();
    populateAbout();
    populateSkills();
    populateExperience();
    populateProjects();
    populateContact();
    populateFooter();
    initNavUnderline();
    initScrollSpy();
    initMobileNav();
    enableSmoothScroll();
    initSectionReveal();
    initScrollProgress();
    initProjectCardTilt();
    initParallax();
  };

  if (document.readyState !== "loading") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
