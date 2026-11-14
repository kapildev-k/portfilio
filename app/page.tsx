'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import {
  Activity,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  BarChart3,
  BookOpen,
  Boxes,
  Briefcase,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FileSearch,
  GitBranch,
  Github,
  Layers3,
  Linkedin,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const focusAreas = [
  { title: 'Cloud Security Engineering', icon: ShieldCheck },
  { title: 'Backend Development', icon: Code2 },
  { title: 'DevOps & SRE', icon: Server },
  { title: 'Monitoring & Observability', icon: Cpu },
];

const skillGroups = [
  { title: 'Languages', icon: Code2, items: ['Python', 'Go', 'SQL', 'Java', 'JavaScript'] },
  { title: 'Backend Development', icon: Workflow, items: ['FastAPI', 'REST APIs', 'Backend Architecture', 'API Integration', 'Automation'] },
  {
    title: 'Cloud & Infrastructure',
    icon: Boxes,
    items: ['AWS EC2', 'VPC', 'IAM', 'S3', 'EKS', 'ELB', 'CloudWatch', 'CloudTrail', 'VPC Flow Logs', 'Kubernetes', 'RBAC', 'Ingress'],
  },
  { title: 'DevOps & SRE', icon: Activity, items: ['Docker', 'Linux', 'Grafana', 'Monitoring', 'Observability', 'Git', 'GitHub', 'Infrastructure Troubleshooting'] },
  { title: 'Databases & Graph', icon: Database, items: ['PostgreSQL', 'Apache AGE', 'MySQL', 'MongoDB', 'ChromaDB', 'Graph Data Modelling'] },
  { title: 'AI & Frontend', icon: Sparkles, items: ['RAG', 'Ollama', 'BM25', 'Embeddings', 'Vector Search', 'React', 'HTML', 'CSS', 'Capacitor'] },
];

const projectData = [
  {
    kind: 'cnapp',
    category: 'Cloud security · Graph analysis',
    title: 'Cloud Attack Path Engine / CNAPP',
    period: 'February 2026 – Present',
    overview: 'Developed a graph-based cloud security platform to analyze AWS infrastructure, resource relationships, network reachability, identity permissions, findings, and multi-stage attack paths.',
    problem: 'Cloud environments grow in complexity across AWS accounts, VPCs, IAM, EKS, ELBs, and service relationships, making risk analysis difficult without a connected model.',
    contributions: [
      'Built AWS resource inventory collection and enrichment workflows.',
      'Integrated CloudTrail data and VPC Flow Logs for activity analysis.',
      'Tracked resource relationships across EC2, VPC, subnets, route tables, gateways, security groups, IAM, S3, ELB, and EKS.',
      'Used PostgreSQL and Apache AGE to model relationships and perform graph-based attack-path analysis.',
      'Built findings, attack-story workflows, risk scoring, blast radius context, and dashboarding for operational visibility.',
    ],
    technologies: ['AWS', 'Python', 'PostgreSQL', 'Apache AGE', 'CloudTrail', 'VPC Flow Logs', 'Grafana', 'Kubernetes'],
    architecture: ['AWS resource inventory', 'CloudTrail + VPC Flow Logs', 'Enriched identity + network graph', 'PostgreSQL + Apache AGE', 'Attack-path analysis', 'Findings + remediation context'],
    challenges: ['Connecting identity permissions with network reachability across related AWS resources.', 'Enriching inventory and activity data into graph relationships suitable for multi-stage path analysis.', 'Keeping findings explainable with risk, blast-radius, and remediation context.'],
    outcomes: ['Connected cloud resource relationships to graph-based attack-path analysis.', 'Produced finding and attack-story workflows with risk and remediation context.', 'Extended the analysis scope to include agentless Kubernetes security.'],
  },
  {
    kind: 'nethra',
    category: 'Endpoint security · Compliance',
    title: 'Nethra Endpoint Compliance',
    period: 'Current Work',
    overview: 'Developed a cross-platform endpoint compliance monitoring solution for Windows, Linux, and macOS to collect security posture and report compliance to a central management system.',
    problem: 'Endpoint posture data is fragmented across operating systems and device states, making it difficult to maintain a consistent compliance view and automate remediation actions.',
    contributions: [
      'Worked on native Go agent architecture for cross-platform collection.',
      'Implemented enrollment token workflows and secure credential handling.',
      'Built endpoint inventory collection and policy-based compliance evaluation.',
      'Worked on self-update, rollback, tamper protection, and GPG release verification.',
      'Contributed to RBAC, administrative management, and reliability improvements for reporting workflows.',
    ],
    technologies: ['Go', 'Windows', 'Linux', 'macOS', 'PostgreSQL', 'HTTPS API', 'Compliance', 'Security Automation'],
    architecture: ['Windows · Linux · macOS', 'Native Go agent + enrollment', 'HTTPS ingestion API', 'Backend processing + PostgreSQL', 'Policy evaluation + reporting', 'Admin portal + agent lifecycle'],
    challenges: ['Supporting endpoint collection across three operating systems.', 'Protecting enrollment credentials and managing the agent update, rollback, and tamper-protection lifecycle.', 'Verifying release integrity while keeping reporting workflows reliable.'],
    outcomes: ['Established a shared endpoint posture and compliance reporting flow across Windows, Linux, and macOS.', 'Added agent lifecycle capabilities including self-update, rollback, tamper protection, and GPG release verification.', 'Covered posture areas such as firewall, disk encryption, antivirus, OS updates, Secure Boot, and hardware inventory.'],
  },
  {
    kind: 'jedai',
    category: 'Observability · Log processing',
    title: 'JEDAI Monitoring Module',
    period: 'November 2026 – Present',
    overview: 'Worked on a monitoring solution for collecting, processing, and reporting application logs from the JEDAI environment with secure classification and alerting workflows.',
    problem: 'Application logs are high-volume and operationally critical, but they need structured classification, redaction, correlation, and reliable alerting without depending on a Docker socket.',
    contributions: [
      'Designed monitoring agent architecture for log collection from containers.',
      'Implemented read-only mount collection to avoid Docker socket dependence.',
      'Built log processing, classification, redaction, and batching for HTTPS ingestion.',
      'Aggregated warning and error signals while tracking info-level counts.',
      'Integrated PostgreSQL-backed monitoring storage and Microsoft Teams notification workflows.',
    ],
    technologies: ['Docker', 'Monitoring', 'Log Collection', 'HTTPS API', 'PostgreSQL', 'Microsoft Teams', 'Observability'],
    architecture: ['Application containers', 'Read-only log mounts', 'Classify + redact + batch', 'HTTPS ingestion API', 'PostgreSQL monitoring store', 'Event views + Teams alerts'],
    challenges: ['Collecting container logs without relying on the Docker socket.', 'Redacting sensitive content before forwarding logs over HTTPS.', 'Separating warning and error events from aggregated informational activity.'],
    outcomes: ['Created a read-only collection path from containers to the monitoring agent.', 'Added classification, redaction, and batched ingestion into monitoring storage.', 'Connected warning and error signals to alerting and Microsoft Teams workflows.'],
  },
  {
    kind: 'rag',
    category: 'Applied AI · Private retrieval',
    title: 'Private Contextual RAG System',
    period: 'February 2025 – December 2025',
    overview: 'Developed a private document question-answering system using local LLMs and hybrid retrieval for on-premise document processing and knowledge access.',
    problem: 'Sensitive documentation needs retrieval and summarization without exposing data externally; a private, local-first retrieval flow was required for practical usage.',
    contributions: [
      'Implemented PDF and Markdown ingestion workflows.',
      'Built chunking, metadata extraction, embedding generation, and semantic retrieval.',
      'Combined BM25 keyword matching with vector search in a hybrid retrieval layer.',
      'Integrated local Ollama model inference for private, context-aware answer generation.',
      'Designed an application flow focused on privacy, document processing, and end-to-end question answering.',
    ],
    technologies: ['Python', 'FastAPI', 'React', 'Ollama', 'ChromaDB', 'BM25', 'Embeddings', 'Vector Search'],
    architecture: ['PDF + Markdown sources', 'Parse + chunk + metadata', 'Embeddings + BM25 indexing', 'ChromaDB vector retrieval', 'Hybrid context retrieval', 'Local Ollama inference'],
    challenges: ['Preparing varied document content into retrievable chunks with useful metadata.', 'Combining semantic vector search with BM25 keyword matching.', 'Keeping document retrieval and language-model inference local to support privacy.'],
    outcomes: ['Delivered an end-to-end private document question-answering workflow.', 'Combined keyword and vector retrieval to provide context to local model inference.', 'Supported PDF and Markdown ingestion with metadata-aware processing.'],
  },
  {
    kind: 'retail',
    category: 'Backend · Retail operations',
    title: 'Tally-Based Supermarket Management Application',
    period: 'January 2026 – February 2026',
    overview: 'Developed a retail management application covering billing, inventory, purchases, sales reporting, and user management with role-based access control.',
    problem: 'Retail operations require a coordinated view of billing, stock movement, customer records, and access control while keeping workflows simple for different user roles.',
    contributions: [
      'Built FastAPI backend APIs and PostgreSQL data models.',
      'Implemented Owner, Supervisor, and Counter Staff role-based access control.',
      'Developed React frontend modules for billing, inventory, and reporting.',
      'Prepared an Android-friendly deployment via Capacitor from the shared frontend codebase.',
    ],
    technologies: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'REST APIs', 'RBAC', 'Capacitor'],
    architecture: ['React + Capacitor clients', 'Owner · Supervisor · Counter Staff roles', 'FastAPI REST APIs', 'PostgreSQL data layer', 'Billing · inventory · purchases', 'Sales reports + user management'],
    challenges: ['Coordinating billing, inventory, purchasing, and sales-reporting workflows in one application.', 'Applying role-based access for Owner, Supervisor, and Counter Staff.', 'Sharing a React frontend between web workflows and an Android-friendly Capacitor deployment.'],
    outcomes: ['Delivered connected retail workflows for billing, stock, purchases, customer records, and reporting.', 'Added a three-role access model for different store responsibilities.', 'Prepared the shared frontend for Android deployment through Capacitor.'],
  },
];

const principles = [
  'Understand the System – Explore architecture and dependencies before implementing changes.',
  'Build Securely – Consider security from design through deployment.',
  'Automate Repetitive Work – Use Python, Go, and infrastructure tooling.',
  'Monitor Everything Important – Build observability into applications and infrastructure.',
  'Validate Before Release – Test, verify and improve reliability.',
  'Document Engineering Decisions – Maintain useful architecture and technical knowledge.',
];

const careerMilestones = [
  { date: '2023', title: 'Mechanical Engineering', detail: 'Bachelor of Engineering · Arasu Engineering College' },
  { date: 'Mar 2023 – May 2024', title: 'R&D / Quality Control Engineer', detail: 'AquaSub Engineering Pvt. Ltd.' },
  { date: 'Feb 2025 – Present', title: 'Research Intern — Software Engineering', detail: 'Intuitive Objects Services Pvt. Ltd. · Cloud security, endpoint compliance, and monitoring.' },
  { date: 'Feb 2025 – Dec 2025', title: 'Private Contextual RAG System', detail: 'Built document ingestion and hybrid retrieval with local inference.' },
  { date: 'Jan 2026 – Feb 2026', title: 'Supermarket Management Application', detail: 'Retail workflows with role-based access and an Android-ready frontend.' },
  { date: 'Feb 2026 – Present', title: 'Cloud Attack Path Engine / CNAPP', detail: 'AWS asset relationships and graph-based security analysis.' },
  { date: 'Ongoing', title: 'Nethra Endpoint Compliance', detail: 'Cross-platform endpoint posture collection and compliance reporting.' },
  { date: 'Nov 2026 – Present', title: 'JEDAI Monitoring Module', detail: 'Container log processing, redaction, and alerting workflows.' },
];

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === 'cnapp') {
    return (
      <div className="rounded-2xl border border-border bg-[#0b1321] p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Relationship graph</p>
            <h4 className="mt-1 text-sm font-semibold text-white">Cloud attack-path analysis</h4>
          </div>
          <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[10px] text-slate-400">Conceptual view</span>
        </div>
        <svg role="img" aria-label="Conceptual AWS resource graph connecting identities and network paths to attack-path findings" viewBox="0 0 720 218" className="mt-4 hidden h-auto w-full sm:block">
          <defs>
            <marker id="cnapp-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="#38bdf8" />
            </marker>
          </defs>
          <path d="M178 108 H256 M424 108 H502" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#cnapp-arrow)" />
          <path d="M342 145 V174 H502" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#cnapp-arrow)" />
          <rect x="14" y="52" width="164" height="112" rx="14" fill="#111c2d" stroke="#334155" />
          <text x="30" y="78" fill="#94a3b8" fontSize="11">AWS RESOURCE CONTEXT</text>
          <text x="30" y="106" fill="#f8fafc" fontSize="14" fontWeight="600">EC2 · VPC · S3</text>
          <text x="30" y="132" fill="#cbd5e1" fontSize="12">IAM · EKS · ELB</text>
          <rect x="256" y="52" width="168" height="112" rx="14" fill="#111c2d" stroke="#0ea5e9" />
          <text x="274" y="78" fill="#94a3b8" fontSize="11">RELATIONSHIPS</text>
          <text x="274" y="106" fill="#f8fafc" fontSize="14" fontWeight="600">Identity + network</text>
          <text x="274" y="132" fill="#cbd5e1" fontSize="12">Reachability · activity</text>
          <rect x="502" y="32" width="198" height="112" rx="14" fill="#111c2d" stroke="#38bdf8" />
          <text x="522" y="60" fill="#94a3b8" fontSize="11">ANALYSIS</text>
          <text x="522" y="90" fill="#f8fafc" fontSize="14" fontWeight="600">PostgreSQL + AGE</text>
          <text x="522" y="116" fill="#cbd5e1" fontSize="12">Multi-stage paths</text>
          <rect x="502" y="158" width="198" height="46" rx="12" fill="#102536" stroke="#0ea5e9" />
          <text x="522" y="186" fill="#e0f2fe" fontSize="13" fontWeight="600">Findings + attack stories</text>
        </svg>
        <ol className="mt-4 space-y-2 sm:hidden">
          {['AWS assets + activity', 'Identity and network relationships', 'Graph-based path analysis', 'Findings + attack stories'].map((step, index) => (
            <li key={step} className="flex items-center gap-3 rounded-lg border border-border bg-card/80 p-3 text-xs text-slate-200">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 font-semibold text-primary">{index + 1}</span>
              {step}
              {index < 3 && <ArrowRight size={14} className="ml-auto shrink-0 text-primary" />}
            </li>
          ))}
        </ol>
        <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-400">
          <span className="rounded-md border border-border px-2 py-1">Inventory</span>
          <span className="rounded-md border border-border px-2 py-1">CloudTrail</span>
          <span className="rounded-md border border-border px-2 py-1">VPC Flow Logs</span>
          <span className="rounded-md border border-border px-2 py-1">Apache AGE</span>
        </div>
      </div>
    );
  }

  if (kind === 'nethra') {
    return (
      <div className="rounded-2xl border border-border bg-[#0b1321] p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Endpoint fleet</p>
            <h4 className="mt-1 text-sm font-semibold text-white">Cross-platform compliance workspace</h4>
          </div>
          <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[10px] text-slate-400">Coverage view</span>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {[
            { os: 'Windows', detail: 'Native Go agent', icon: Server },
            { os: 'Linux', detail: 'Posture collection', icon: Cpu },
            { os: 'macOS', detail: 'Policy evaluation', icon: ShieldCheck },
          ].map(({ os, detail, icon: Icon }) => (
            <div key={os} className="rounded-xl border border-border bg-card/80 p-3">
              <div className="flex items-center gap-2 text-slate-200"><Icon size={15} className="text-primary" /><span className="text-sm font-medium">{os}</span></div>
              <p className="mt-2 text-xs text-slate-400">{detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {['Firewall', 'Disk encryption', 'Antivirus', 'OS updates', 'Secure Boot', 'Hardware', 'USB policy', 'Local admins'].map((item) => (
            <span key={item} className="rounded-lg border border-border/80 bg-surface px-2 py-2 text-center text-[11px] text-slate-300">{item}</span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
          <LockKeyhole size={14} className="text-primary" /> Secure enrollment
          <ArrowRight size={14} className="hidden sm:block" />
          HTTPS ingestion
          <ArrowRight size={14} className="hidden sm:block" />
          Policy reports
        </div>
      </div>
    );
  }

  if (kind === 'jedai') {
    return (
      <div className="rounded-2xl border border-border bg-[#0b1321] p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Log operations</p>
            <h4 className="mt-1 text-sm font-semibold text-white">Classification and alerting pipeline</h4>
          </div>
          <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[10px] text-slate-400">Processing view</span>
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-slate-950/70">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-slate-500">
            <span className="h-2 w-2 rounded-full bg-rose-400" /><span className="h-2 w-2 rounded-full bg-amber-400" /><span className="h-2 w-2 rounded-full bg-emerald-400" />
            Event processing
          </div>
          <div className="space-y-2 p-3 font-mono text-[11px] leading-5 sm:text-xs">
            <p className="text-rose-300"><span className="mr-3 text-slate-500">ERROR</span>classified event → alert queue</p>
            <p className="text-amber-300"><span className="mr-3 text-slate-500">WARN</span>redact → batch → HTTPS ingest</p>
            <p className="text-slate-400"><span className="mr-3 text-slate-500">INFO</span>aggregate counts for visibility</p>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {['Read-only mounts', 'Classification', 'PostgreSQL', 'Teams alerts'].map((item, index) => (
            <div key={item} className="flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-2 text-[11px] text-slate-300">
              <span className="text-primary">{String(index + 1).padStart(2, '0')}</span>{item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === 'rag') {
    return (
      <div className="rounded-2xl border border-border bg-[#0b1321] p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Private retrieval</p>
            <h4 className="mt-1 text-sm font-semibold text-white">Document-to-answer workflow</h4>
          </div>
          <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[10px] text-slate-400">Local inference</span>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-center gap-2 text-sm font-medium text-white"><BookOpen size={15} className="text-primary" />Document preparation</div>
            <p className="mt-2 text-xs leading-5 text-slate-400">PDF / Markdown → parse → chunk + metadata → embeddings</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-center gap-2 text-sm font-medium text-white"><FileSearch size={15} className="text-primary" />Hybrid retrieval</div>
            <p className="mt-2 text-xs leading-5 text-slate-400">ChromaDB vector search + BM25 keyword retrieval</p>
          </div>
          <div className="rounded-xl border border-primary/30 bg-sky-950/30 p-3 sm:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-sm font-medium text-sky-100"><Sparkles size={15} className="text-primary" />Retrieved context</span>
              <ArrowRight size={15} className="hidden text-primary sm:block" />
              <span className="flex items-center gap-2 text-sm text-slate-200">Local Ollama answer generation</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-[#0b1321] p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Retail operations</p>
          <h4 className="mt-1 text-sm font-semibold text-white">Store management workspace</h4>
        </div>
        <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[10px] text-slate-400">Role-based access</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Billing', icon: Briefcase },
            { label: 'Inventory', icon: Boxes },
            { label: 'Purchases', icon: Database },
            { label: 'Sales reports', icon: BarChart3 },
          ].map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-xs text-slate-200"><Icon size={15} className="text-primary" />{label}</div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 sm:w-36 sm:flex-col">
          {['Owner', 'Supervisor', 'Counter Staff'].map((role) => (
            <span key={role} className="rounded-lg border border-border bg-surface px-2.5 py-2 text-xs text-slate-300">{role}</span>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
        React + Capacitor <ArrowRight size={14} className="text-primary" /> FastAPI <ArrowRight size={14} className="text-primary" /> PostgreSQL
      </div>
    </div>
  );
}

function ArchitectureFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step} className="flex min-h-16 items-center gap-3 rounded-xl border border-border bg-background/80 p-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-sm leading-5 text-slate-200">{step}</span>
          {index < steps.length - 1 && <ArrowRight aria-hidden="true" size={14} className="ml-auto shrink-0 text-primary/70" />}
        </li>
      ))}
    </ol>
  );
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );
    window.location.href = `mailto:kapilkochi@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <a href="#main-content" className="sr-only z-[60] rounded-lg bg-primary px-4 py-2 font-semibold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header id="home" className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="text-lg font-semibold tracking-tight text-white">
            Kapildev K
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link text-sm text-slate-300 transition hover:text-text">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="https://github.com/kapildev-k" target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-border bg-card p-2 text-slate-300 transition hover:border-primary/80 hover:text-primary">
              <Github size={16} />
            </a>
            <a href="https://linkedin.com/in/kapildev-k-69ab1a26b" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-border bg-card p-2 text-slate-300 transition hover:border-primary/80 hover:text-primary">
              <Linkedin size={16} />
            </a>
            <a href="/resume.pdf" download="Kapildev_K_Resume.pdf" className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-slate-950">
              Download Resume
            </a>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-card p-2 text-slate-200 transition hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div id="mobile-navigation" className={`${isMenuOpen ? 'block' : 'hidden'} border-t border-border bg-surface/95 md:hidden`}>
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="rounded-lg px-2 py-2 text-sm text-slate-300 transition hover:bg-card hover:text-text">
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <a href="https://github.com/kapildev-k" target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in a new tab)" className="rounded-full border border-border p-2 text-slate-300">
                <Github size={16} />
              </a>
              <a href="https://linkedin.com/in/kapildev-k-69ab1a26b" target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in a new tab)" className="rounded-full border border-border p-2 text-slate-300">
                <Linkedin size={16} />
              </a>
              <a href="/resume.pdf" download="Kapildev_K_Resume.pdf" className="ml-auto rounded-full border border-primary/50 bg-primary/10 px-3 py-2 text-sm text-primary">
                Resume
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_18%,rgba(14,165,233,0.12),transparent_35%),radial-gradient(circle_at_top,#0f172a_0%,transparent_55%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-16 sm:px-6 md:pb-20 md:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-24 lg:pt-24">
            <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }} className="max-w-2xl">
              <div className="mb-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300 sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" aria-hidden="true" />
                Available for engineering roles
                <span className="hidden text-slate-600 sm:inline">/</span>
                <span className="inline-flex items-center gap-1 text-slate-400"><MapPin size={12} />Thanjavur, India</span>
              </div>

              <h1 className="max-w-3xl text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.75rem]">
                Engineering secure cloud systems and reliable software.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
                I&apos;m Kapildev K, a Software Engineer focused on cloud security, backend systems, endpoint compliance, and observability.
              </p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                From AWS attack-path analysis to cross-platform agents and private retrieval, I work across the architecture and implementation of practical engineering systems.
              </p>

              <div className="mt-6 flex flex-wrap gap-2" aria-label="Core technologies">
                {['Python', 'Go', 'AWS', 'PostgreSQL', 'Kubernetes', 'FastAPI'].map((technology) => (
                  <span key={technology} className="rounded-full border border-border/90 bg-surface/70 px-3 py-1.5 text-xs font-medium text-slate-300">{technology}</span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  View engineering work
                  <ArrowRight size={16} />
                </a>
                <a href="/resume.pdf" download="Kapildev_K_Resume.pdf" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-primary/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  Download Resume
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-300">
                <a href="https://github.com/kapildev-k" target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in a new tab)" className="inline-flex items-center gap-2 transition hover:text-primary">
                  <Github size={16} /> GitHub
                </a>
                <a href="https://linkedin.com/in/kapildev-k-69ab1a26b" target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in a new tab)" className="inline-flex items-center gap-2 transition hover:text-primary">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 transition hover:text-primary">
                  <Mail size={16} /> Contact Me
                </a>
              </div>

              <div className="mt-7 max-w-xl rounded-2xl border border-border/80 bg-slate-950/40 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-slate-300">Systems I work across</span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Cloud · Data · Security</span>
                </div>
                <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-3">
                  {[
                    { icon: Boxes, label: 'Cloud assets' },
                    { icon: GitBranch, label: 'System graph' },
                    { icon: ShieldCheck, label: 'Security signals' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 rounded-lg border border-border/70 bg-card/70 px-2.5 py-2 text-[11px] text-slate-300 sm:text-xs">
                      <Icon size={14} className="shrink-0 text-primary" />{label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.1 }} className="relative mx-auto w-full max-w-sm sm:max-w-md">
              <div className="rounded-[1.75rem] border border-border bg-gradient-to-br from-slate-700/70 via-card to-card p-2.5 shadow-glow sm:p-3">
                <div className="relative overflow-hidden rounded-[1.3rem] bg-slate-900">
                  <Image
                    src="/profile-photo.png"
                    alt="Professional portrait of Kapildev K"
                    width={1086}
                    height={1450}
                    priority
                    sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 448px, 40vw"
                    className="block h-auto w-full object-cover object-top"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/5 to-transparent" />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1.5 text-[10px] font-medium text-slate-200 shadow-lg backdrop-blur-md sm:right-4 sm:top-4 sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Engineering · Security · Reliability
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-300 sm:text-sm">Software Engineer</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Kapildev K</h2>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-300">
                      Cloud security, backend engineering, and platform reliability.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 px-1 pb-1 pt-3 sm:px-2 sm:pb-2 sm:pt-4">
                  {['Cloud Security', 'Backend Engineering', 'DevOps & SRE'].map((focus) => (
                    <span key={focus} className="rounded-full border border-border bg-surface px-2.5 py-1.5 text-[11px] text-slate-300 sm:px-3 sm:text-xs">
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section aria-labelledby="engineering-scope-title" className="border-y border-border/80 bg-surface/30">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">Verified project scope</p>
                <h2 id="engineering-scope-title" className="mt-2 text-lg font-semibold text-white sm:text-xl">Engineering impact</h2>
              </div>
              <p className="max-w-md text-xs leading-5 text-slate-500">Qualitative scope from documented project work; no unverified performance claims.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Server, title: 'Endpoint compliance', detail: 'Windows · Linux · macOS' },
                { icon: GitBranch, title: 'Cloud security graph', detail: 'AWS identity, network, and activity context' },
                { icon: LockKeyhole, title: 'Private AI retrieval', detail: 'Hybrid search with local inference' },
                { icon: Activity, title: 'Log observability', detail: 'Redaction, event processing, and alerts' },
              ].map(({ icon: Icon, title, detail }) => (
                <div key={title} className="flex gap-3 rounded-xl border border-border/80 bg-card/70 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary"><Icon size={17} /></span>
                  <div><h3 className="text-sm font-medium text-white">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section-shell">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Background</p>
              <h2 className="section-title">A systems-minded engineering journey.</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                I began in mechanical engineering and R&amp;D / quality control before moving into software engineering in 2025. Today, I work on cloud security, endpoint compliance, monitoring, backend systems, and private AI workflows.
              </p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
              <div className="rounded-2xl border border-border bg-card/70 p-5 sm:p-6">
                <p className="text-sm font-semibold text-white">How I work</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  I approach engineering by understanding system boundaries first, then connecting implementation details across APIs, data, infrastructure, and operations. My earlier quality-focused work continues to shape how I investigate issues and document outcomes.
                </p>
                <p className="mt-4 border-t border-border pt-4 text-xs leading-6 text-slate-500">
                  Focus areas: cloud security · backend architecture · DevOps &amp; SRE · monitoring and observability
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {focusAreas.map(({ title, icon: Icon }) => (
                  <div key={title} className="rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/60 sm:p-5">
                    <div className="mb-3 inline-flex rounded-xl border border-primary/30 bg-primary/10 p-2 text-primary">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-base font-medium text-white">{title}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="eyebrow">Career timeline</p>
                  <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">From quality engineering to software systems.</h3>
                </div>
                <span className="text-xs text-slate-500">Education · employment · project milestones</span>
              </div>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {careerMilestones.map((milestone, index) => (
                  <li key={`${milestone.date}-${milestone.title}`} className="relative rounded-xl border border-border bg-card/70 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                        {index === 0 ? <BookOpen size={14} /> : index === 1 ? <Briefcase size={14} /> : <Layers3 size={14} />}
                      </span>
                      <time className="text-[11px] font-medium text-primary">{milestone.date}</time>
                    </div>
                    <h4 className="text-sm font-semibold leading-5 text-white">{milestone.title}</h4>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{milestone.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="skills" className="section-shell border-t border-border/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Technical toolkit</p>
              <h2 className="section-title">Tools I use to build and operate systems.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">Grouped by the engineering problems they help me solve. No proficiency scores or unsupported ratings.</p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {skillGroups.map(({ title, icon: Icon, items }) => (
                <div key={title} className="rounded-2xl border border-border bg-card/80 p-5 transition hover:border-primary/40 sm:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary"><Icon size={18} /></span>
                    <h3 className="text-base font-semibold text-white">{title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span key={item} className="inline-flex rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-slate-300 transition hover:border-primary/40 hover:text-white">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-shell border-t border-border/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Selected engineering work</p>
                <h2 className="section-title">Projects, explained through systems.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                  Five project case studies covering the problem, architecture, engineering contributions, challenges, and delivered capabilities.
                </p>
              </div>
              <a href="https://github.com/kapildev-k" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 text-sm text-primary transition hover:brightness-110">
                GitHub profile <ExternalLink size={14} />
              </a>
            </div>

            <div className="mt-9 space-y-5">
              {projectData.map((project, index) => (
                <article key={project.title} className="overflow-hidden rounded-3xl border border-border bg-card/80 p-4 shadow-[0_16px_50px_rgba(2,8,23,0.18)] sm:p-6 lg:p-7">
                  <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr] xl:gap-8">
                    <div className="flex min-w-0 flex-col">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{project.category}</span>
                        <span className="text-xs text-slate-500">{project.period}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">{project.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-slate-300">{project.overview}</p>

                      <div className="mt-5 rounded-xl border border-border/80 bg-surface/70 p-4">
                        <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300"><FileSearch size={14} className="text-primary" />Engineering problem</h4>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{project.problem}</p>
                      </div>

                      <div className="mt-5">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Technologies</h4>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.technologies.map((technology) => (
                            <span key={technology} className="rounded-lg border border-border bg-background/80 px-2.5 py-1.5 text-[11px] text-slate-300">{technology}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <ProjectVisual kind={project.kind} />
                      <p className="mt-2 text-[10px] leading-5 text-slate-500">High-level conceptual view based on documented project scope; not a production topology.</p>
                    </div>
                  </div>

                  <details className="group mt-6 border-t border-border pt-4">
                    <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 rounded-xl py-2 text-sm font-medium text-slate-200 outline-none transition hover:text-primary focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center gap-2"><span className="text-xs font-semibold text-primary">0{index + 1}</span>Explore architecture, contributions &amp; outcomes</span>
                      <span className="inline-flex items-center gap-2 text-xs text-slate-400 group-open:text-primary">Case study <ArrowDown size={14} className="transition group-open:rotate-180" /></span>
                    </summary>
                    <div className="mt-3 space-y-5 border-t border-border/70 pt-5">
                      <div>
                        <div className="flex flex-wrap items-end justify-between gap-2">
                          <h4 className="text-sm font-semibold text-white">Architecture and data flow</h4>
                          <span className="text-[10px] text-slate-500">Numbered stages show the conceptual flow</span>
                        </div>
                        <ArchitectureFlow steps={project.architecture} />
                      </div>

                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-xl border border-border bg-surface/70 p-4">
                          <h4 className="text-sm font-semibold text-white">My contributions</h4>
                          <ul className="mt-3 space-y-2.5 text-sm leading-6 text-slate-300">
                            {project.contributions.map((contribution) => (
                              <li key={contribution} className="flex gap-2.5">
                                <CheckCircle2 size={15} className="mt-1 shrink-0 text-primary" /><span>{contribution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <div className="rounded-xl border border-border bg-surface/70 p-4">
                            <h4 className="text-sm font-semibold text-white">Technical challenges</h4>
                            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                              {project.challenges.map((challenge) => <li key={challenge} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /><span>{challenge}</span></li>)}
                            </ul>
                          </div>
                          <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-4">
                            <h4 className="text-sm font-semibold text-white">Delivered capabilities</h4>
                            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                              {project.outcomes.map((outcome) => <li key={outcome} className="flex gap-2"><CheckCircle2 size={15} className="mt-1 shrink-0 text-primary" /><span>{outcome}</span></li>)}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section-shell border-t border-border/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Professional Experience</p>
              <h2 className="section-title">Professional Experience</h2>
            </div>

            <div className="mt-10 space-y-5">
              <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 text-primary">
                      <Briefcase size={16} />
                      <span className="text-sm font-medium uppercase tracking-[0.15em]">Intuitive Objects Services Pvt. Ltd.</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-medium text-white">Research Intern — Software Engineering</h3>
                  </div>
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-slate-300">February 2025 – Present</span>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-surface/80 p-4">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-300">Current focus</h4>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                      <li>• Cloud attack path / CNAPP platform</li>
                      <li>• Agentless Kubernetes security</li>
                      <li>• Nethra endpoint compliance</li>
                      <li>• JEDAI monitoring</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-border bg-surface/80 p-4">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-300">Contribution style</h4>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      I contribute across design, engineering implementation, troubleshooting, monitoring, security validation, and documentation, working from architecture-level analysis through practical delivery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 text-primary">
                      <Briefcase size={16} />
                      <span className="text-sm font-medium uppercase tracking-[0.15em]">AquaSub Engineering Pvt. Ltd.</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-medium text-white">R&amp;D / Quality Control Engineer</h3>
                  </div>
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-slate-300">March 2023 – May 2024</span>
                </div>

                <ul className="mt-6 space-y-2 text-sm leading-7 text-slate-300">
                  <li>• Quality inspection and reporting workflows</li>
                  <li>• Data-driven quality tracking and defect visibility</li>
                  <li>• Production and engineering collaboration for continuous improvement</li>
                  <li>• Analytical problem-solving and disciplined documentation in operations-focused work</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell border-t border-border/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Engineering Approach</p>
              <h2 className="section-title">How I Approach Engineering</h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {principles.map((principle, index) => (
                <div key={principle} className="rounded-2xl border border-border bg-card p-5">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell border-t border-border/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Education &amp; Certifications</p>
              <h2 className="section-title">Education &amp; Certifications</h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="text-xl font-medium text-white">Bachelor of Engineering (Mechanical Engineering)</h3>
                <p className="mt-3 text-slate-300">Arasu Engineering College, Kumbakonam</p>
                <p className="mt-1 text-slate-400">2023</p>
                <p className="mt-4 text-slate-300">CGPA: 7.4</p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="text-xl font-medium text-white">Certification</h3>
                <p className="mt-3 text-slate-300">Java Full Stack Development</p>
                <p className="mt-1 text-slate-400">SSRTIC (Tekstac Platform)</p>
                <div className="mt-5">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-300">Languages</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    <li>• Tamil – Native</li>
                    <li>• English – Professional Working Proficiency</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="github-title" className="section-shell border-t border-border/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Open source profile</p>
              <h2 id="github-title" className="section-title">Public repositories, linked directly.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">Project details that are not public remain portfolio case studies rather than being presented as open-source repositories.</p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <a href="https://github.com/kapildev-k/portfilio" target="_blank" rel="noreferrer" className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-primary"><Github size={20} /></span>
                  <ExternalLink size={16} className="text-slate-500 transition group-hover:text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">Portfolio source</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Public repository for this portfolio website.</p>
                <span className="mt-4 inline-flex rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-slate-400">kapildev-k/portfilio</span>
              </a>
              <a href="https://github.com/kapildev-k/projects" target="_blank" rel="noreferrer" className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-primary"><Code2 size={20} /></span>
                  <ExternalLink size={16} className="text-slate-500 transition group-hover:text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">projects</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Public repository listed under Java on GitHub.</p>
                <span className="mt-4 inline-flex rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-slate-400">kapildev-k/projects · Java</span>
              </a>
            </div>
            <div className="mt-5">
              <a href="https://github.com/kapildev-k" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-primary transition hover:brightness-110">
                Visit GitHub profile <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell border-t border-border/80 pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <p className="eyebrow">Contact</p>
              <h2 className="section-title">Let&apos;s Build Something Meaningful.</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                I&apos;m always interested in discussing cloud security, backend engineering, DevOps, SRE, monitoring, and interesting engineering challenges.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-5 rounded-3xl border border-border bg-card p-6">
                <a href="mailto:kapilkochi@gmail.com" className="flex items-center gap-3 text-slate-200 transition hover:text-primary">
                  <Mail size={18} />
                  <span>kapilkochi@gmail.com</span>
                </a>
                <a href="https://linkedin.com/in/kapildev-k-69ab1a26b" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-200 transition hover:text-primary">
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/kapildev-k" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-200 transition hover:text-primary">
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
                <div className="flex items-center gap-3 text-slate-400">
                  <MapPin size={18} />
                  <span>Thanjavur, Tamil Nadu, India</span>
                </div>
                <p className="border-t border-border pt-4 text-xs leading-6 text-slate-500">
                  The form opens a prefilled email draft in your email application. This site does not send or store form submissions.
                </p>
              </div>

              <form onSubmit={handleSubmit} aria-label="Prepare an email to Kapildev" className="rounded-3xl border border-border bg-card p-5 sm:p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm text-slate-300">
                    <span className="mb-2 block">Name</span>
                    <input id="contact-name" name="name" autoComplete="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" placeholder="Your name" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-slate-100 outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40" required />
                  </label>
                  <label className="block text-sm text-slate-300">
                    <span className="mb-2 block">Email</span>
                    <input id="contact-email" name="email" autoComplete="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="your@email.com" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-slate-100 outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40" required />
                  </label>
                </div>

                <label className="mt-5 block text-sm text-slate-300">
                  <span className="mb-2 block">Message</span>
                  <textarea id="contact-message" name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} placeholder="Tell me about the role, project, or engineering challenge." className="w-full resize-y rounded-xl border border-border bg-surface px-3 py-3 text-slate-100 outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40" required />
                </label>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card">
                    Open email draft
                    <ArrowRight size={16} />
                  </button>
                  <span className="text-xs text-slate-500">No backend submission; your email app handles delivery.</span>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <a href="#home" aria-label="Back to top" className="fixed bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/50 bg-background/90 text-primary shadow-glow backdrop-blur transition hover:bg-primary hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:bottom-6 sm:right-6 sm:h-12 sm:w-12">
        <ArrowUp size={18} />
      </a>

      <footer className="border-t border-border bg-surface/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 Kapildev K</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/kapildev-k" target="_blank" rel="noreferrer" className="hover:text-primary">
              GitHub
            </a>
            <a href="https://linkedin.com/in/kapildev-k-69ab1a26b" target="_blank" rel="noreferrer" className="hover:text-primary">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
