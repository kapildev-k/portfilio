'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Github,
  Linkedin,
  Mail,
  Menu,
} from 'lucide-react';

type Concept = 'editorial' | 'bento' | 'case-study';
type PreviewSize = 'desktop' | 'mobile';

type Project = {
  name: string;
  period: string;
  summary: string;
  contribution: string;
  technologies: string[];
  flow: string[];
};

const concepts: { id: Concept; name: string; description: string }[] = [
  {
    id: 'editorial',
    name: 'A · Editorial',
    description: 'Typographic, spacious, and linear: let the engineering story read like a series of project chapters.',
  },
  {
    id: 'bento',
    name: 'B · Bento',
    description: 'A varied modular grid: one lead system, supporting work, and career context with clearly different weights.',
  },
  {
    id: 'case-study',
    name: 'C · Case study',
    description: 'A technical project index and deep-dive layout: problem, architecture, contribution, challenges, and outcomes.',
  },
];

const projects: Project[] = [
  {
    name: 'Cloud Attack Path Engine / CNAPP',
    period: 'Feb 2026 – Present',
    summary: 'AWS resource relationships, identity permissions, network reachability, and graph-based attack-path analysis.',
    contribution: 'Resource inventory and enrichment, activity data integration, Apache AGE graph modeling, and explainable findings.',
    technologies: ['AWS', 'Python', 'PostgreSQL', 'Apache AGE'],
    flow: ['AWS inventory', 'Identity + network relationships', 'PostgreSQL + AGE analysis', 'Findings + attack stories'],
  },
  {
    name: 'Nethra Endpoint Compliance',
    period: 'Current work',
    summary: 'Cross-platform endpoint posture collection and compliance reporting across Windows, Linux, and macOS.',
    contribution: 'Native Go agent, enrollment, cross-platform checks, updater lifecycle, rollback, tamper protection, and GPG release verification.',
    technologies: ['Go', 'Windows', 'Linux', 'macOS'],
    flow: ['Windows · Linux · macOS', 'Native Go agent', 'HTTPS ingestion', 'Policy + reporting'],
  },
  {
    name: 'JEDAI Monitoring Module',
    period: 'Nov 2026 – Present',
    summary: 'Container log collection, classification, secret redaction, storage, and alerting workflows.',
    contribution: 'Read-only log collection, redaction and event processing, batch ingestion, PostgreSQL, and Teams alert flow.',
    technologies: ['Docker', 'HTTPS API', 'PostgreSQL', 'Microsoft Teams'],
    flow: ['Containers', 'Read-only logs', 'Agent', 'Redaction', 'HTTPS API', 'PostgreSQL', 'Teams alerts'],
  },
  {
    name: 'Private Contextual RAG System',
    period: 'Feb 2025 – Dec 2025',
    summary: 'Private document question-answering with hybrid keyword and vector retrieval and local LLM inference.',
    contribution: 'Document ingestion, chunking, BM25 and vector indexing, hybrid retrieval, and local Ollama inference.',
    technologies: ['Python', 'FastAPI', 'BM25', 'ChromaDB', 'Ollama'],
    flow: ['Document ingestion', 'BM25 + ChromaDB', 'Hybrid retrieval', 'Local Ollama'],
  },
  {
    name: 'Tally-Based Supermarket Management Application',
    period: 'Jan 2026 – Feb 2026',
    summary: 'Retail workflows for billing, inventory, purchases, sales reporting, and role-based access.',
    contribution: 'React + Capacitor client, FastAPI API, scoped JWT roles, and PostgreSQL data storage.',
    technologies: ['React', 'FastAPI', 'PostgreSQL', 'Capacitor'],
    flow: ['React + Capacitor', 'FastAPI', 'JWT + RBAC', 'PostgreSQL'],
  },
];

const skillGroups = [
  { title: 'Languages', items: 'Python · Go · SQL · Java · JavaScript' },
  { title: 'Cloud & infrastructure', items: 'AWS · Kubernetes · Docker · Linux · CloudTrail · VPC Flow Logs' },
  { title: 'Backend & data', items: 'FastAPI · REST APIs · PostgreSQL · Apache AGE · MongoDB · MySQL' },
  { title: 'Operations & AI', items: 'Grafana · Observability · BM25 · ChromaDB · Ollama · Vector Search' },
];

const career = [
  { period: '2023', title: 'B.E. Mechanical Engineering', detail: 'Arasu Engineering College' },
  { period: 'Mar 2023 – May 2024', title: 'R&D / Quality Control Engineer', detail: 'AquaSub Engineering Pvt. Ltd.' },
  { period: 'Feb 2025 – Present', title: 'Research Intern — Software Engineering', detail: 'Intuitive Objects Services Pvt. Ltd.' },
];

function FlowDiagram({ project, isMobile }: { project: Project; isMobile: boolean }) {
  return (
    <div
      className={`flex ${isMobile ? 'flex-col' : 'flex-row'} flex-wrap items-stretch gap-2`}
      aria-label={`${project.name} system flow`}
    >
      {project.flow.map((step, index) => (
        <div className={`flex ${isMobile ? 'w-full' : 'min-w-0 flex-1'} items-center gap-2`} key={step}>
          <div className="min-h-12 flex-1 rounded-lg border border-[#304155] bg-[#0c1726] px-3 py-2.5">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="mt-1 block text-xs font-medium leading-4 text-slate-100">{step}</span>
          </div>
          {index < project.flow.length - 1 && (
            isMobile
              ? <ArrowDown aria-hidden="true" size={14} className="mx-auto shrink-0 text-sky-400" />
              : <ArrowRight aria-hidden="true" size={14} className="shrink-0 text-sky-400" />
          )}
        </div>
      ))}
    </div>
  );
}

function TechnologyList({ items }: { items: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {items.map((technology) => (
        <span key={technology} className="rounded-full border border-[#304155] px-2.5 py-1 text-[10px] text-slate-300">
          {technology}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  isMobile,
  compact = false,
}: {
  project: Project;
  isMobile: boolean;
  compact?: boolean;
}) {
  return (
    <article className={`rounded-2xl border border-[#29394d] bg-[#0d1725] ${compact ? 'p-4' : 'p-5'}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="max-w-[42rem] text-base font-semibold leading-6 text-white">{project.name}</h3>
        <span className="text-[11px] text-slate-400">{project.period}</span>
      </div>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{project.summary}</p>
      {!compact && (
        <p className="mt-2 max-w-3xl text-xs leading-5 text-slate-400">
          <span className="font-semibold text-slate-300">Contribution:</span> {project.contribution}
        </p>
      )}
      <div className="mt-4 rounded-xl border border-[#233449] bg-[#09111d] p-3">
        <FlowDiagram project={project} isMobile={isMobile} />
      </div>
      <TechnologyList items={project.technologies} />
    </article>
  );
}

function PreviewHeader({ isMobile, editorial = false }: { isMobile: boolean; editorial?: boolean }) {
  return (
    <header className="flex items-center justify-between border-b border-[#29394d] px-5 py-4">
      <a href="#preview-home" className={`font-semibold text-white ${editorial ? 'font-serif text-lg' : 'text-sm'}`}>
        Kapildev K<span className="ml-1 text-sky-400">.</span>
      </a>
      {isMobile ? (
        <details className="group relative">
          <summary aria-label="Open preview navigation" className="list-none cursor-pointer rounded-lg border border-[#304155] p-2 text-slate-300 [&::-webkit-details-marker]:hidden">
            <Menu size={16} />
          </summary>
          <nav aria-label="Preview navigation" className="absolute right-0 top-full z-20 mt-2 grid min-w-36 gap-3 rounded-xl border border-[#304155] bg-[#0b1321] p-4 text-xs text-slate-300 shadow-xl">
            <a href="#preview-projects" className="hover:text-white">Work</a>
            <a href="#preview-skills" className="hover:text-white">Skills</a>
            <a href="#preview-experience" className="hover:text-white">Experience</a>
            <a href="#preview-contact" className="hover:text-white">Contact</a>
            <a href="/resume.pdf" download="Kapildev_K_Resume.pdf" className="hover:text-white">Resume</a>
          </nav>
        </details>
      ) : (
        <nav className="flex items-center gap-5 text-xs text-slate-300" aria-label="Preview navigation">
          <a href="#preview-projects" className="hover:text-white">Work</a>
          <a href="#preview-skills" className="hover:text-white">Skills</a>
          <a href="#preview-experience" className="hover:text-white">Experience</a>
          <a href="#preview-contact" className="hover:text-white">Contact</a>
          <a href="/resume.pdf" download="Kapildev_K_Resume.pdf" className="rounded-md border border-[#3b5068] px-3 py-1.5 text-slate-100">
            Resume
          </a>
        </nav>
      )}
    </header>
  );
}

function Portrait({ isMobile, rounded = false }: { isMobile: boolean; rounded?: boolean }) {
  return (
    <div className={`relative mx-auto overflow-hidden border border-[#3b5068] bg-[#111c2d] ${rounded ? 'rounded-full' : 'rounded-2xl'} ${isMobile ? 'h-24 w-24' : 'h-52 w-44'}`}>
      <Image
        src="/profile-photo.png"
        alt="Professional portrait of Kapildev K"
        width={440}
        height={586}
        sizes={isMobile ? '96px' : '176px'}
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

function SectionHeading({ eyebrow, title, isMobile }: { eyebrow: string; title: string; isMobile: boolean }) {
  return (
    <div className={isMobile ? 'mb-5' : 'mb-7'}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">{eyebrow}</p>
      <h2 className={`mt-2 font-semibold leading-tight text-white ${isMobile ? 'text-2xl' : 'text-3xl'}`}>{title}</h2>
    </div>
  );
}

function SkillSection({ isMobile, bento = false }: { isMobile: boolean; bento?: boolean }) {
  return (
    <section id="preview-skills" className={bento ? '' : 'border-t border-[#29394d] px-5 py-10'}>
      {!bento && <SectionHeading eyebrow="Technical toolkit" title="Tools for the work" isMobile={isMobile} />}
      <div className={`grid ${isMobile ? 'grid-cols-1' : bento ? 'grid-cols-2' : 'grid-cols-2'} gap-2`}>
        {skillGroups.map((group) => (
          <div className="rounded-xl border border-[#29394d] bg-[#0d1725] p-3.5" key={group.title}>
            <h3 className="text-xs font-semibold text-white">{group.title}</h3>
            <p className="mt-2 text-[11px] leading-5 text-slate-400">{group.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection({ isMobile, compact = false }: { isMobile: boolean; compact?: boolean }) {
  return (
    <section id="preview-experience" className={compact ? '' : 'border-t border-[#29394d] px-5 py-10'}>
      {!compact && <SectionHeading eyebrow="Career timeline" title="Quality engineering to software systems" isMobile={isMobile} />}
      <ol className={`space-y-3 ${compact ? '' : 'border-l border-[#36506a] pl-4'}`}>
        {career.map((item) => (
          <li key={item.title} className={`relative rounded-xl border border-[#29394d] bg-[#0d1725] ${compact ? 'p-3' : 'p-4'}`}>
            {!compact && <span className="absolute -left-[1.35rem] top-5 h-2 w-2 rounded-full bg-sky-400 ring-4 ring-[#09111d]" />}
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-300">{item.period}</p>
            <h3 className="mt-1 text-sm font-semibold text-white">{item.title}</h3>
            <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ContactSection({ isMobile, compact = false }: { isMobile: boolean; compact?: boolean }) {
  return (
    <section id="preview-contact" className={compact ? '' : 'border-t border-[#29394d] px-5 py-10'}>
      {!compact && <SectionHeading eyebrow="Contact" title="Let’s talk about systems" isMobile={isMobile} />}
      <div className={`rounded-2xl border border-[#35516b] bg-[#0d1a2a] ${compact ? 'p-4' : 'p-5'}`}>
        <p className="text-sm leading-6 text-slate-300">
          Cloud security, backend engineering, DevOps, SRE, monitoring, and engineering challenges.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="mailto:kapilkochi@gmail.com" className="inline-flex items-center gap-2 rounded-lg bg-sky-400 px-3 py-2 text-xs font-semibold text-slate-950">
            <Mail size={14} /> Email
          </a>
          <a href="https://github.com/kapildev-k" className="inline-flex items-center gap-2 rounded-lg border border-[#3b5068] px-3 py-2 text-xs text-slate-200">
            <Github size={14} /> GitHub
          </a>
          <a href="https://linkedin.com/in/kapildev-k-69ab1a26b" className="inline-flex items-center gap-2 rounded-lg border border-[#3b5068] px-3 py-2 text-xs text-slate-200">
            <Linkedin size={14} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section className="border-t border-[#29394d] px-5 py-9">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">About</p>
      <p className={`mt-3 max-w-3xl leading-7 text-slate-300 ${isMobile ? 'text-sm' : 'text-base'}`}>
        I’m a software engineer working across cloud security, backend systems, endpoint compliance, and observability. My earlier mechanical engineering and quality-control experience shapes a systems-minded, evidence-focused approach.
      </p>
    </section>
  );
}

function EditorialPreview({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <PreviewHeader isMobile={isMobile} editorial />
      <main>
        <section id="preview-home" className={`grid items-center gap-7 px-5 py-10 ${isMobile ? 'grid-cols-1' : 'grid-cols-[1.2fr_0.8fr] px-10 py-14'}`}>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-sky-300">Software Engineer · Thanjavur, India</p>
            <h1 className={`mt-4 font-serif leading-[1.08] tracking-tight text-white ${isMobile ? 'text-4xl' : 'text-6xl'}`}>
              Engineering secure cloud systems and reliable software.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
              Cloud security, backend engineering, endpoint compliance, and observability—explained through the systems I work on.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <a href="#preview-projects" className="rounded-lg bg-sky-400 px-4 py-2.5 font-semibold text-slate-950">Selected work <ArrowRight className="ml-1 inline" size={14} /></a>
              <a href="/resume.pdf" download="Kapildev_K_Resume.pdf" className="rounded-lg border border-[#3b5068] px-4 py-2.5 text-slate-200">Download résumé</a>
            </div>
          </div>
          <div className={`flex items-center gap-4 rounded-2xl border border-[#29394d] bg-[#0d1725] p-4 ${isMobile ? 'flex-row' : 'flex-col'}`}>
            <Portrait isMobile={isMobile} rounded={isMobile} />
            <div>
              <p className="text-sm font-semibold text-white">Kapildev K</p>
              <p className="mt-1 text-xs text-slate-400">Cloud Security · Backend · DevOps &amp; SRE</p>
            </div>
          </div>
        </section>

        <AboutSection isMobile={isMobile} />
        <section id="preview-projects" className="border-t border-[#29394d] px-5 py-10">
          <SectionHeading eyebrow="Selected engineering work" title="Systems, not screenshots" isMobile={isMobile} />
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-[3rem_1fr]'}`} key={project.name}>
                <span className="pt-4 font-mono text-xs text-sky-300">0{index + 1}</span>
                <ProjectCard project={project} isMobile={isMobile} />
              </div>
            ))}
          </div>
        </section>
        <section className="border-t border-[#29394d] px-5 py-10">
          <SectionHeading eyebrow="Project detail" title="Cloud Attack Path Engine / CNAPP" isMobile={isMobile} />
          <div className="grid gap-4 rounded-2xl border border-[#29394d] bg-[#0d1725] p-5">
            <p className="text-sm leading-6 text-slate-300"><strong className="text-white">Problem.</strong> Cloud risk spans identity, network reachability, and related AWS resources; analyzing those links requires a connected model.</p>
            <div className="rounded-xl border border-[#233449] bg-[#09111d] p-3">
              <FlowDiagram project={projects[0]} isMobile={isMobile} />
            </div>
            <p className="text-xs leading-5 text-slate-400"><strong className="text-slate-200">Engineering focus:</strong> AWS inventory and activity data, graph relationships, Apache AGE path analysis, and explainable findings. Diagram is a project-scope schematic, not live AWS data.</p>
          </div>
        </section>
        <SkillSection isMobile={isMobile} />
        <ExperienceSection isMobile={isMobile} />
        <ContactSection isMobile={isMobile} />
      </main>
    </>
  );
}

function BentoPreview({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <PreviewHeader isMobile={isMobile} />
      <main id="preview-home" className="p-4 sm:p-5">
        <section className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-4'}`}>
          <div className={`rounded-2xl border border-[#35516b] bg-[#0d1a2a] p-5 ${isMobile ? '' : 'col-span-3'}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">Software Engineer · Thanjavur, India</p>
            <h1 className={`mt-3 max-w-3xl font-semibold leading-tight text-white ${isMobile ? 'text-3xl' : 'text-5xl'}`}>
              I build secure cloud and backend systems.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Cloud security · endpoint compliance · backend engineering · DevOps &amp; SRE</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href="#preview-projects" className="rounded-lg bg-sky-400 px-4 py-2 text-xs font-semibold text-slate-950">Explore projects</a>
              <a href="/resume.pdf" download="Kapildev_K_Resume.pdf" className="rounded-lg border border-[#3b5068] px-4 py-2 text-xs text-slate-200">Résumé</a>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-2xl border border-[#29394d] bg-[#0d1725] p-4">
            <Portrait isMobile={isMobile} />
          </div>

          <div id="preview-projects" className={`rounded-2xl border border-sky-800/70 bg-[#0d1a2a] p-4 ${isMobile ? '' : 'col-span-2 row-span-2 p-5'}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">Featured · Cloud security</p>
            <h2 className="mt-2 text-lg font-semibold text-white">Cloud Attack Path Engine / CNAPP</h2>
            <p className="mt-2 text-xs leading-5 text-slate-300">{projects[0].summary}</p>
            <div className="mt-4 rounded-xl border border-[#233449] bg-[#09111d] p-3"><FlowDiagram project={projects[0]} isMobile={isMobile} /></div>
            <TechnologyList items={projects[0].technologies} />
            <p className="mt-3 text-[11px] leading-5 text-slate-400">Graph relationships and attack-path analysis · project-scope schematic, not live cloud data.</p>
          </div>
          <div className={`rounded-2xl border border-[#29394d] bg-[#0d1725] p-4 ${isMobile ? '' : 'col-span-2'}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">Endpoint security</p>
            <h2 className="mt-2 text-base font-semibold text-white">{projects[1].name}</h2>
            <p className="mt-2 text-xs leading-5 text-slate-300">{projects[1].contribution}</p>
            <TechnologyList items={projects[1].technologies} />
          </div>
          <div className={`rounded-2xl border border-[#29394d] bg-[#0d1725] p-4 ${isMobile ? '' : 'col-span-2'}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">Observability</p>
            <h2 className="mt-2 text-base font-semibold text-white">{projects[2].name}</h2>
            <p className="mt-2 text-xs leading-5 text-slate-300">{projects[2].summary}</p>
            <div className="mt-3 rounded-xl border border-[#233449] bg-[#09111d] p-3"><FlowDiagram project={projects[2]} isMobile={isMobile} /></div>
          </div>
          <div className={`rounded-2xl border border-[#29394d] bg-[#0d1725] p-4 ${isMobile ? '' : 'col-span-2'}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">Private AI · simulated example</p>
            <h2 className="mt-2 text-base font-semibold text-white">{projects[3].name}</h2>
            <p className="mt-2 text-xs leading-5 text-slate-300">{projects[3].summary}</p>
            <div className="mt-3 rounded-xl border border-[#233449] bg-[#09111d] p-3"><FlowDiagram project={projects[3]} isMobile={isMobile} /></div>
            <p className="mt-2 text-[10px] text-amber-300">Query examples are simulated, not live retrieval.</p>
          </div>
          <div className={`rounded-2xl border border-[#29394d] bg-[#0d1725] p-4 ${isMobile ? '' : 'col-span-2'}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">Retail · simulated example</p>
            <h2 className="mt-2 text-base font-semibold text-white">{projects[4].name}</h2>
            <div className="mt-3 rounded-xl border border-[#233449] bg-[#09111d] p-3"><FlowDiagram project={projects[4]} isMobile={isMobile} /></div>
            <p className="mt-2 text-[10px] text-amber-300">Sample Owner, Supervisor, and Counter Staff views are simulated.</p>
          </div>
          <div className={`rounded-2xl border border-[#29394d] bg-[#0d1725] p-4 ${isMobile ? '' : 'col-span-2'}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">Technical toolkit</p>
            <div className="mt-3"><SkillSection isMobile={isMobile} bento /></div>
          </div>
          <div className={`rounded-2xl border border-[#29394d] bg-[#0d1725] p-4 ${isMobile ? '' : 'col-span-2'}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">Career</p>
            <div className="mt-3"><ExperienceSection isMobile={isMobile} compact /></div>
          </div>
          <div className={isMobile ? '' : 'col-span-4'}>
            <ContactSection isMobile={isMobile} compact />
          </div>
        </section>
      </main>
    </>
  );
}

function CaseStudyPreview({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <PreviewHeader isMobile={isMobile} />
      <main id="preview-home" className="px-5 py-8">
        <section className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">Engineering portfolio · Thanjavur, India</p>
          <h1 className={`mt-3 max-w-4xl font-semibold leading-tight text-white ${isMobile ? 'text-3xl' : 'text-5xl'}`}>
            Systems work, documented from problem to outcome.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Cloud security, backend engineering, endpoint compliance, and observability—grounded in project architecture and implementation.
          </p>
        </section>

        <div id="preview-projects" className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-[14rem_minmax(0,1fr)]'}`}>
          <aside className={isMobile ? '' : 'self-start rounded-xl border border-[#29394d] bg-[#0d1725] p-4'}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">Project index</p>
            <nav aria-label="Case study project index" className={`mt-3 ${isMobile ? 'flex flex-wrap gap-2' : 'space-y-2'}`}>
              {projects.map((project, index) => (
                <a
                  key={project.name}
                  href={`#case-${index + 1}`}
                  className={`block rounded-lg border border-[#29394d] text-xs text-slate-300 hover:border-sky-600 hover:text-white ${isMobile ? 'px-3 py-2' : 'px-3 py-2.5'}`}
                >
                  <span className="mr-2 font-mono text-sky-300">0{index + 1}</span>{project.name}
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-6">
            <article id="case-1" className="rounded-2xl border border-[#29394d] bg-[#0d1725] p-5">
              <div className={`flex items-start gap-4 ${isMobile ? 'flex-col' : 'justify-between'}`}>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">Cloud security · {projects[0].period}</p>
                  <h2 className={`mt-2 font-semibold text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>{projects[0].name}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{projects[0].summary}</p>
                </div>
                <span className="rounded-lg border border-[#3b5068] px-3 py-2 text-[11px] text-slate-300">Case study 01</span>
              </div>
              <div className={`mt-5 grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div className="rounded-xl border border-[#29394d] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300">Problem</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">Cloud risk crosses resource, identity, and network boundaries; disconnected inventory makes multi-stage paths difficult to assess.</p>
                </div>
                <div className="rounded-xl border border-[#29394d] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300">My contribution</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{projects[0].contribution}</p>
                </div>
              </div>
              <div className="mt-3 rounded-xl border border-[#233449] bg-[#09111d] p-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300">Architecture · project-scope schematic</p>
                <FlowDiagram project={projects[0]} isMobile={isMobile} />
              </div>
              <div className={`mt-3 grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div className="rounded-xl border border-[#29394d] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300">Challenges</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">Connect identity permissions and network reachability across resource relationships while keeping findings explainable.</p>
                </div>
                <div className="rounded-xl border border-[#29394d] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300">Outcome</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">Graph-based attack-path analysis with findings, attack stories, risk, and remediation context. No unsupported performance metrics.</p>
                </div>
              </div>
              <TechnologyList items={projects[0].technologies} />
            </article>

            {projects.slice(1).map((project, index) => (
              <article id={`case-${index + 2}`} key={project.name} className="scroll-mt-6">
                <ProjectCard project={project} isMobile={isMobile} />
                {project.name.includes('RAG') && <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-amber-300">Sample query/retrieval views are simulated, not live data.</p>}
                {project.name.includes('Supermarket') && <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-amber-300">Sample role views are simulated, not a live retail system.</p>}
              </article>
            ))}
          </div>
        </div>
        <div className="mt-9"><SkillSection isMobile={isMobile} /></div>
        <ExperienceSection isMobile={isMobile} />
        <ContactSection isMobile={isMobile} />
      </main>
    </>
  );
}

export default function DesignStudyPage() {
  const [concept, setConcept] = useState<Concept>('editorial');
  const [previewSize, setPreviewSize] = useState<PreviewSize>('desktop');
  const selectedConcept = concepts.find((item) => item.id === concept) ?? concepts[0];
  const isMobile = previewSize === 'mobile';

  return (
    <div className="min-h-screen bg-[#080d18] px-3 py-6 text-slate-100 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">Design exploration · isolated preview</p>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Portfolio directions</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Compare three 2D-first treatments using the existing portfolio facts. This study does not change the homepage.
            </p>
          </div>
          <a href="/" className="inline-flex items-center gap-1.5 rounded-lg border border-[#304155] px-3 py-2 text-xs text-slate-300 hover:text-white">
            Return to current portfolio <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="mb-5 grid gap-2 md:grid-cols-3" role="tablist" aria-label="Design concepts">
          {concepts.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`concept-tab-${item.id}`}
              aria-selected={concept === item.id}
              aria-controls="concept-preview"
              onClick={() => setConcept(item.id)}
              className={`rounded-xl border p-3 text-left transition ${concept === item.id ? 'border-sky-500 bg-[#102033]' : 'border-[#29394d] bg-[#0b1321] hover:border-[#49627d]'}`}
            >
              <span className="block text-sm font-semibold text-white">{item.name}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">{item.description}</span>
            </button>
          ))}
        </div>

        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-slate-200">{selectedConcept.name} preview</p>
            <p className="mt-1 text-[11px] text-slate-500">Prototype content only · no changes to the current portfolio</p>
          </div>
          <div className="inline-flex rounded-lg border border-[#29394d] bg-[#0b1321] p-1" aria-label="Preview viewport">
            {(['desktop', 'mobile'] as const).map((size) => (
              <button
                type="button"
                key={size}
                aria-pressed={previewSize === size}
                onClick={() => setPreviewSize(size)}
                className={`rounded-md px-3 py-1.5 text-xs capitalize ${previewSize === size ? 'bg-sky-400 font-semibold text-slate-950' : 'text-slate-300'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div
          id="concept-preview"
          role="tabpanel"
          aria-labelledby={`concept-tab-${concept}`}
          className={`mx-auto overflow-hidden border border-[#304155] bg-[#080d18] shadow-2xl ${isMobile ? 'max-w-[390px] rounded-[1.75rem]' : 'w-full rounded-2xl'}`}
        >
          <div className="flex items-center gap-1.5 border-b border-[#29394d] bg-[#0b1321] px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#415064]" />
            <span className="h-2 w-2 rounded-full bg-[#415064]" />
            <span className="h-2 w-2 rounded-full bg-[#415064]" />
            <span className="ml-2 truncate font-mono text-[10px] text-slate-500">
              {isMobile ? '390px mobile preview' : 'Desktop preview'} · {selectedConcept.name}
            </span>
          </div>
          <div className={isMobile ? 'max-h-[78vh] overflow-y-auto' : ''}>
            {concept === 'editorial' && <EditorialPreview isMobile={isMobile} />}
            {concept === 'bento' && <BentoPreview isMobile={isMobile} />}
            {concept === 'case-study' && <CaseStudyPreview isMobile={isMobile} />}
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-[#29394d] bg-[#0b1321] p-4">
            <p className="text-xs font-semibold text-white">Professional foundation</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">Mechanical engineering education, R&amp;D / Quality Control experience, and software engineering work remain visible in all concepts.</p>
          </div>
          <div className="rounded-xl border border-[#29394d] bg-[#0b1321] p-4">
            <p className="text-xs font-semibold text-white">Engineering evidence</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">All five projects stay present, with readable 2D system flows and contribution-focused summaries rather than decorative 3D scenes.</p>
          </div>
          <div className="rounded-xl border border-[#29394d] bg-[#0b1321] p-4">
            <p className="text-xs font-semibold text-white">Honest examples</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">RAG query/retrieval content and Retail role views are labelled simulated. No new metrics or live integrations are implied.</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#29394d] pt-5 text-xs text-slate-400">
          <BriefcaseBusiness size={15} className="text-sky-300" />
          <span>Current site preserved. Choose a concept before any final redesign work.</span>
          <a href="mailto:kapilkochi@gmail.com" className="ml-auto inline-flex items-center gap-1 text-sky-300 hover:text-white">Send feedback <Mail size={13} /></a>
        </div>
      </div>
    </div>
  );
}
