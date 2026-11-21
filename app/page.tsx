'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BookOpen, Boxes, Briefcase, CheckCircle2, Code2, Cpu, Database, ExternalLink, FileSearch, GitBranch, Github, Layers3, Linkedin, LockKeyhole, Mail, MapPin, Menu, Server, ShieldCheck, Sparkles, Workflow, X, Search, Users, Smartphone, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { projects } from './project-data';
import {
  DynamicEndpointFleet3D,
  DynamicHero3DScene,
  DynamicJedaiMonitoring3D,
} from '@/components/3d/Dynamic3D';

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

const featuredProjectOrder = [
  'nethra-endpoint-compliance',
  'jedai-monitoring',
  'aws-cloud-monitoring',
];
const projectData = [
  ...featuredProjectOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project)),
  ...projects.filter((project) => !featuredProjectOrder.includes(project.slug)),
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
  { date: 'Feb 2025 – Dec 2025', title: 'Private RAG Application', detail: 'Built document ingestion and hybrid retrieval with local inference.' },
  { date: 'Jan 2026 – Feb 2026', title: 'Supermarket Tally Application', detail: 'Retail workflows with role-based access and an Android-ready frontend.' },
  { date: 'Feb 2026 – Mar 2026', title: 'AWS Cloud Monitoring', detail: 'Centralized observability across CloudTrail, VPC Flow Logs, and Grafana dashboards.' },
  { date: 'Mar 2026 – Present', title: 'Cloud Attack Path Engine (CAPE)', detail: 'AWS asset relationships and graph-based security analysis.' },
  { date: 'Ongoing', title: 'Nethra Endpoint Compliance', detail: 'Cross-platform endpoint posture collection and compliance reporting.' },
  { date: '2026 – Present', title: 'Nethra RBAC', detail: 'Centralized identity and application authorization across the Nethra ecosystem.' },
  { date: 'Nov 2026 – Present', title: 'JEDAI Monitoring', detail: 'Container log processing, redaction, and alerting workflows.' },
];

function CnappSchematic() {
  const resources = [
    {
      id: 'gateway',
      name: 'Internet Gateway',
      type: 'Network edge',
      detail: 'Route and connectivity relationships help establish network reachability.',
      icon: Boxes,
    },
    {
      id: 'ec2',
      name: 'EC2 Instance',
      type: 'Compute resource',
      detail: 'Compute resources connect network context, security groups, and workload identity.',
      icon: Server,
    },
    {
      id: 'iam',
      name: 'IAM Role',
      type: 'Identity permissions',
      detail: 'Trust and permission relationships describe what a workload identity can access.',
      icon: LockKeyhole,
    },
    {
      id: 's3',
      name: 'S3 Bucket',
      type: 'Storage resource',
      detail: 'Resource access relationships contribute to path analysis and blast-radius context.',
      icon: Database,
    },
  ];
  const [selectedResourceId, setSelectedResourceId] = useState('ec2');
  const selectedResource = resources.find((resource) => resource.id === selectedResourceId) ?? resources[0];

  return (
    <div className="rounded-2xl border border-border bg-[#0b1321] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">AWS relationship graph</p>
          <h4 className="mt-1 text-sm font-semibold text-white">Illustrative attack-path schema</h4>
        </div>
        <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-slate-300">Example · no live inventory</span>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_14rem]">
        <ol aria-label="Illustrative AWS relationship path" className="space-y-2">
          {resources.map(({ id, name, type, icon: Icon }, index) => (
            <li key={id}>
              <button
                type="button"
                aria-pressed={selectedResourceId === id}
                onClick={() => setSelectedResourceId(id)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  selectedResourceId === id
                    ? 'border-primary/70 bg-primary/[0.09]'
                    : 'border-border bg-card/80 hover:border-primary/40'
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white">{name}</span>
                  <span className="mt-0.5 block text-xs text-slate-400">{type}</span>
                </span>
                <span className="ml-auto font-mono text-[10px] text-slate-500">0{index + 1}</span>
              </button>
              {index < resources.length - 1 && (
                <div className="flex items-center gap-2 py-1 pl-6 text-xs font-medium text-sky-200">
                  <ArrowDown size={13} aria-hidden="true" />
                  {['network reachability', 'workload identity', 'permission relationship'][index]}
                </div>
              )}
            </li>
          ))}
        </ol>
        <aside aria-live="polite" className="rounded-xl border border-primary/30 bg-sky-950/20 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">Selected resource</p>
          <h5 className="mt-2 text-sm font-semibold text-white">{selectedResource.name}</h5>
          <p className="mt-2 text-[13px] leading-5 text-slate-200">{selectedResource.detail}</p>
          <div className="mt-4 border-t border-border/70 pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-300">Analysis context</p>
            <p className="mt-1 text-[13px] leading-5 text-slate-200">PostgreSQL + Apache AGE relate identity, network, and resource data for path analysis.</p>
          </div>
        </aside>
      </div>
      <p className="mt-3 text-[11px] leading-5 text-slate-400">The highlighted chain illustrates relationship types only; it is not a verified or live AWS attack path.</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
        <span className="rounded-md border border-border px-2.5 py-1">AWS Inventory</span>
        <span className="rounded-md border border-border px-2.5 py-1">CloudTrail</span>
        <span className="rounded-md border border-border px-2.5 py-1">VPC Flow Logs</span>
        <span className="rounded-md border border-border px-2.5 py-1">Apache AGE Cypher</span>
      </div>
    </div>
  );
}

function NethraSummary() {
  return (
    <div className="rounded-2xl border border-border bg-[#0b1321] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Endpoint Fleet</p>
          <h4 className="mt-1 text-sm font-semibold text-white">Cross-Platform Compliance Architecture</h4>
        </div>
        <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-slate-300">Coverage View</span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { os: 'Windows', detail: 'Native Go endpoint agent', icon: Server },
          { os: 'Linux', detail: 'Cross-platform posture checks', icon: Cpu },
          { os: 'macOS', detail: 'Centralized compliance reporting', icon: ShieldCheck },
        ].map(({ os, detail, icon: Icon }) => (
          <div key={os} className="rounded-xl border border-border bg-card/80 p-3.5">
            <div className="flex items-center gap-2 text-slate-200"><Icon size={16} className="text-primary" /><span className="text-sm font-semibold">{os}</span></div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-border bg-surface/60 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-200">Endpoint-to-management flow</p>
        <ArchitectureFlow steps={['Windows · Linux · macOS endpoints', 'Native Go agent + enrollment', 'HTTPS ingestion API', 'Backend processing + PostgreSQL', 'Policy evaluation + admin reporting']} />
      </div>
      <div className="mt-4 rounded-xl border border-primary/30 bg-primary/[0.06] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Agent implementation highlights</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            'Native Go agent across Windows, Linux, and macOS',
            'Self-update, rollback, and tamper protection',
            'Cross-platform posture checks and compliance evaluation',
            'GPG release verification',
          ].map((item) => (
            <p key={item} className="flex items-start gap-2 text-[13px] leading-5 text-slate-100">
              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary" />{item}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          'Firewall Status',
          'Disk Encryption',
          'Antivirus Status',
          'OS Updates',
          'Secure Boot',
          'Hardware Inventory',
          'Agent Tamper Protection',
        ].map((item) => (
          <span key={item} className="flex items-center justify-center gap-1.5 rounded-lg border border-border/80 bg-surface px-2.5 py-2 text-center text-xs font-medium text-slate-200">
            <CheckCircle2 size={12} aria-hidden="true" className="shrink-0 text-primary" />{item}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <LockKeyhole size={14} className="text-primary" /> Secure Token Enrollment
        <ArrowRight size={14} className="hidden sm:block text-slate-600" />
        HTTPS Batch Ingestion
        <ArrowRight size={14} className="hidden sm:block text-slate-600" />
        Policy Evaluation Engine & Admin Reports
      </div>
    </div>
  );
}

function JedaiSummary() {
  return (
    <div className="rounded-2xl border border-border bg-[#0b1321] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">JEDAI log pipeline</p>
          <h4 className="mt-1 text-sm font-semibold text-white">From read-only collection to alert delivery</h4>
        </div>
        <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-slate-300">2D system flow</span>
      </div>
      <div className="mt-5 rounded-xl border border-border bg-surface/60 p-4">
        <ArchitectureFlow steps={['Application containers', 'Read-only log mounts', 'Agent classification', 'Secret redaction + batching', 'HTTPS ingestion API', 'PostgreSQL monitoring store', 'Microsoft Teams alerts']} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200">
        {['Read-only collection', 'Classify before ingest', 'Redact sensitive values', 'Batch warning + error events'].map((item) => (
          <span key={item} className="rounded-lg border border-border bg-card px-3 py-2">{item}</span>
        ))}
      </div>
    </div>
  );
}

// Balanced, Full-Height RAG System Architecture Workspace
function RagArchitectureWorkspace() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'simulator'>('architecture');
  const [selectedQuery, setSelectedQuery] = useState<number>(0);

  const sampleQueries = [
    {
      q: 'How does the documented private retrieval flow work?',
      matchScore: 'Illustrative score only',
      chunks: 'PDF and Markdown documents are parsed and chunked, then indexed with BM25 keyword search and ChromaDB vector retrieval.',
      answer: 'This simulated view illustrates hybrid retrieval providing context to local Ollama inference. It is not a live query result.'
    },
    {
      q: 'Which document sources are included in the described workflow?',
      matchScore: 'Illustrative score only',
      chunks: 'The documented ingestion workflow includes PDF and Markdown documents with metadata extraction.',
      answer: 'PDF and Markdown ingestion are part of the project description. The prompt, retrieval context, and response shown here are simulated.'
    }
  ];

  return (
    <div className="rounded-3xl border border-border bg-[#070d18] p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Private AI Pipeline</span>
          </div>
          <h4 className="mt-0.5 text-sm font-semibold text-white">Hybrid Retrieval & Local Inference Architecture</h4>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-amber-200">Query examples are simulated; no live documents or retrieval data</p>
        </div>
        <div className="flex rounded-lg border border-border bg-card p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`inline-flex min-h-[34px] items-center rounded-md px-3 py-1 font-medium touch-manipulation transition ${
              activeTab === 'architecture' ? 'bg-primary text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            System Pipeline
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`inline-flex min-h-[34px] items-center rounded-md px-3 py-1 font-medium touch-manipulation transition ${
              activeTab === 'simulator' ? 'bg-primary text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Query Simulation · Sample Data
          </button>
        </div>
      </div>

      {activeTab === 'architecture' ? (
        <div className="mt-5 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card/80 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
                <BookOpen size={15} className="text-primary" /> 1. Ingestion & Chunking
              </div>
              <p className="mt-2 text-[13px] leading-6 text-slate-200">
                PDF and Markdown document parsing &rarr; token-aware recursive text chunking &rarr; document metadata extraction.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/80 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
                <FileSearch size={15} className="text-primary" /> 2. Dual Indexing
              </div>
              <p className="mt-2 text-[13px] leading-6 text-slate-200">
                Dense semantic vector embeddings indexed in ChromaDB paired with sparse lexical inverted index via BM25.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-primary/30 bg-sky-950/25 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-xs font-semibold text-sky-200 uppercase tracking-wider">
                <Search size={14} className="text-primary" /> 3. Hybrid Reciprocal Rank Fusion (RRF)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">ChromaDB + BM25</span>
            </div>
            <p className="mt-2 text-[13px] leading-6 text-slate-200">
              Combines keyword matching with dense vector search to retrieve context for local model inference.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/80 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
                <Terminal size={14} className="text-primary" /> 4. Local Ollama LLM Inference
              </span>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">Local runtime</span>
            </div>
            <p className="mt-2 text-[13px] leading-6 text-slate-200">
              Retrieved context is assembled for inference through the local Ollama runtime. This diagram does not claim network-policy validation.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            {sampleQueries.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedQuery(idx)}
                className={`inline-flex min-h-[34px] items-center rounded-lg border px-3 py-1.5 text-xs font-medium text-left touch-manipulation transition ${
                  selectedQuery === idx ? 'border-primary bg-primary/20 text-white font-semibold shadow-sm' : 'border-border bg-card text-slate-400 hover:text-white'
                }`}
              >
                Sample Query 0{idx + 1}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 px-3 py-2 text-xs font-semibold text-amber-100">
            SIMULATED EXAMPLE — sample prompt, retrieval context, and response; not live system output.
          </div>
          <div className="rounded-xl border border-border bg-card/90 p-4">
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block">User Prompt</span>
            <p className="mt-1 text-sm font-medium text-white">{sampleQueries[selectedQuery].q}</p>
          </div>

          <div className="rounded-xl border border-border/80 bg-slate-950/80 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] uppercase tracking-wider text-primary font-semibold">Retrieved Context Chunk</span>
              <span className="font-mono text-[11px] text-emerald-300">{sampleQueries[selectedQuery].matchScore}</span>
            </div>
            <p className="mt-1 text-[13px] leading-6 text-slate-200 font-mono bg-card/60 p-2.5 rounded-lg border border-border/50">
              {sampleQueries[selectedQuery].chunks}
            </p>
          </div>

          <div className="rounded-xl border border-primary/40 bg-sky-950/30 p-4">
            <span className="text-[11px] uppercase tracking-wider text-sky-200 font-semibold block">Local Model Grounded Answer</span>
            <p className="mt-1 text-[13px] leading-6 text-slate-100">
              {sampleQueries[selectedQuery].answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function RetailArchitectureWorkspace() {
  const [activeRole, setActiveRole] = useState<'owner' | 'supervisor' | 'counter'>('owner');

  const roleDetails = {
    owner: {
      title: 'Store Owner Role',
      access: 'Store-wide workflow access',
      capabilities: [
        'Review sales reports across the application',
        'Manage user accounts and assigned roles',
        'Coordinate billing, inventory, and purchase workflows',
      ]
    },
    supervisor: {
      title: 'Floor Supervisor Role',
      access: 'Inventory and purchasing workflows',
      capabilities: [
        'Maintain inventory information and records',
        'Work with purchase and stock workflows',
        'Review operational sales information',
      ]
    },
    counter: {
      title: 'Counter Staff Role',
      access: 'Billing and customer-record workflows',
      capabilities: [
        'Create bills through the billing workflow',
        'Work with customer records where permitted',
        'Use permissions assigned to the Counter Staff role',
      ]
    }
  };

  const current = roleDetails[activeRole];

  return (
    <div className="rounded-3xl border border-border bg-[#070d18] p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase size={14} className="text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Retail System Architecture</span>
          </div>
          <h4 className="mt-0.5 text-sm font-semibold text-white">Client, API, role permissions, and data store</h4>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-amber-200">Simulated example · sample role views, not a live retail system</p>
        </div>
        <div className="flex rounded-lg border border-border bg-card p-0.5 text-xs">
          {(['owner', 'supervisor', 'counter'] as const).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setActiveRole(role)}
              className={`inline-flex min-h-[34px] items-center rounded-md px-3 py-1 font-medium capitalize touch-manipulation transition ${
                activeRole === role ? 'bg-primary text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {role === 'counter' ? 'Counter Staff' : role}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="rounded-xl border border-border bg-surface/60 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300">Retail request flow</p>
          <ArchitectureFlow steps={['React + Capacitor client', 'FastAPI REST API', 'Authentication + role permissions', 'PostgreSQL data store']} />
        </div>

        <div className="rounded-2xl border border-border bg-card/90 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <Users size={16} />
              </span>
              <div>
                <h5 className="text-sm font-bold text-white">{current.title}</h5>
                <span className="text-xs text-sky-200">{current.access}</span>
              </div>
            </div>
            <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] font-mono text-slate-200 uppercase">
              Role Enforced
            </span>
          </div>

          <ul className="mt-4 space-y-2 text-[13px] leading-6 text-slate-200">
            {current.capabilities.map((cap, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3 text-xs text-slate-300">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Smartphone size={13} className="text-primary" /> Shared React codebase deployed to Web & Android via Capacitor
          </span>
          <span className="text-slate-500 font-mono">FastAPI + PostgreSQL</span>
        </div>
      </div>
    </div>
  );
}

function AwsMonitoringSummary() {
  const panels = [
    { title: 'AWS Accounts', detail: 'Cross-account inventory and role-based collection.' },
    { title: 'CloudTrail + VPC', detail: 'Activity and network telemetry normalization.' },
    { title: 'Enrichment', detail: 'GeoIP, region mapping, and relationship context.' },
    { title: 'Operational Views', detail: 'PostgreSQL storage and Grafana dashboards.' },
  ];

  return (
    <div className="rounded-2xl border border-border bg-[#0b1321] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Cloud telemetry</p>
          <h4 className="mt-1 text-sm font-semibold text-white">Centralized AWS monitoring</h4>
        </div>
        <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-slate-300">Multi-account</span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {panels.map(({ title, detail }) => (
          <div key={title} className="rounded-xl border border-border bg-card/80 p-3.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-primary">{title}</p>
            <p className="mt-2 text-[13px] leading-5 text-slate-200">{detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-border bg-surface/60 p-4">
        <ArchitectureFlow steps={['AWS accounts', 'Collection & normalization', 'GeoIP + region enrichment', 'PostgreSQL + Grafana', 'Monitoring dashboards', 'DLQ-safe failure handling']} />
      </div>
    </div>
  );
}

function RbacSummary() {
  return (
    <div className="rounded-2xl border border-border bg-[#0b1321] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Identity gateway</p>
          <h4 className="mt-1 text-sm font-semibold text-white">Centralized authorization layer</h4>
        </div>
        <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-slate-300">Nine apps</span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { title: 'Entra ID', detail: 'User and group federation' },
          { title: 'Nginx Gateway', detail: 'Centralized reverse proxy' },
          { title: 'App RBAC', detail: 'Admin, viewer, technician roles' },
        ].map(({ title, detail }) => (
          <div key={title} className="rounded-xl border border-border bg-card/80 p-3.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-primary">{title}</p>
            <p className="mt-2 text-[13px] leading-5 text-slate-200">{detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-border bg-surface/60 p-4">
        <ArchitectureFlow steps={['Microsoft Entra ID', 'User + group sync', 'Nginx reverse proxy', 'App-level RBAC', 'Delegated access', 'Audit + activity logs']} />
      </div>
    </div>
  );
}

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === 'cnapp') {
    return <CnappSchematic />;
  }

  if (kind === 'nethra') {
    return <NethraSummary />;
  }

  if (kind === 'jedai') {
    return <JedaiSummary />;
  }

  if (kind === 'rag') {
    return <RagArchitectureWorkspace />;
  }

  if (kind === 'aws-monitoring') {
    return <AwsMonitoringSummary />;
  }

  if (kind === 'nethra-rbac') {
    return <RbacSummary />;
  }

  return <RetailArchitectureWorkspace />;
}

function InteractiveProjectPreview({ kind }: { kind: string }) {
  const [show3D, setShow3D] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const Scene = kind === 'nethra' ? DynamicEndpointFleet3D : DynamicJedaiMonitoring3D;

  if (kind !== 'nethra' && kind !== 'jedai') {
    return <ProjectVisual kind={kind} />;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-medium text-slate-300">Explore the system view</p>
        <div className="inline-flex rounded-lg border border-border bg-background p-1" role="group" aria-label="Project preview mode">
          <button type="button" aria-pressed={!show3D} onClick={() => setShow3D(false)} className={`min-h-9 rounded-md px-3 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${!show3D ? 'bg-surface text-white' : 'text-slate-400 hover:text-white'}`}>
            Architecture
          </button>
          <button type="button" aria-pressed={show3D} onClick={() => setShow3D(true)} className={`min-h-9 rounded-md px-3 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${show3D ? 'bg-primary text-slate-950' : 'text-slate-400 hover:text-white'}`}>
            Interactive 3D
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={show3D ? '3d' : 'architecture'}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
        >
          {show3D ? (
            <>
              <p className="mb-2 rounded-lg border border-sky-400/20 bg-sky-400/5 px-3 py-2 text-[11px] leading-5 text-sky-100/80">
                Illustrative interactive preview using sample data; it is not a live system or production telemetry.
              </p>
              <Scene />
            </>
          ) : (
            <ProjectVisual kind={kind} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ArchitectureFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step} className="flex min-h-16 items-center gap-3 rounded-xl border border-border bg-background/80 p-3.5 shadow-sm">
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
  const searchParams = useSearchParams();
  const selectedProjectSlug = searchParams.get('project');
  const selectedProject = projectData.find((project) => project.slug === selectedProjectSlug) ?? null;
  const selectedProjectIndex = selectedProject ? projectData.findIndex((project) => project.slug === selectedProject.slug) : -1;
  const previousProject = selectedProjectIndex > 0 ? projectData[selectedProjectIndex - 1] : projectData[projectData.length - 1];
  const nextProject = selectedProjectIndex >= 0 ? projectData[(selectedProjectIndex + 1) % projectData.length] : null;

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
          <a href="#home" className="text-lg font-bold tracking-tight text-white hover:text-primary transition">
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
            <a href="/resume.pdf" download="Kapildev_K_Resume.pdf" className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-slate-950">
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
          <div className="mx-auto flex max-w-7xl flex-col gap-1.5 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex min-h-[42px] items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-200 touch-manipulation transition hover:bg-card hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex items-center gap-2 border-t border-border/70 pt-3">
              <a
                href="https://github.com/kapildev-k"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="flex min-h-[42px] min-w-[42px] items-center justify-center rounded-xl border border-border p-2 text-slate-300 touch-manipulation hover:text-primary"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/kapildev-k-69ab1a26b"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className="flex min-h-[42px] min-w-[42px] items-center justify-center rounded-xl border border-border p-2 text-slate-300 touch-manipulation hover:text-primary"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="/resume.pdf"
                download="Kapildev_K_Resume.pdf"
                className="ml-auto inline-flex min-h-[42px] items-center rounded-xl border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary touch-manipulation hover:bg-primary hover:text-slate-950"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        {selectedProject && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[28px] border border-border bg-[#0b1321] shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-[#0b1321]/90 px-5 py-4 backdrop-blur-sm sm:px-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Case study</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{selectedProject.title}</h3>
                </div>
                <Link href="/" className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-slate-200 hover:text-white">
                  Close
                </Link>
              </div>

              <div className="px-5 py-6 sm:px-6">
                <div className="rounded-3xl border border-border bg-card/90 p-5 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    <span>{selectedProject.category}</span>
                    <span className="text-slate-500">•</span>
                    <span>{selectedProject.status}</span>
                  </div>
                  <h4 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">{selectedProject.title}</h4>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">{selectedProject.overview}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-300">
                    <span className="rounded-full border border-border bg-surface px-3 py-1.5">{selectedProject.period}</span>
                    <span className="rounded-full border border-border bg-surface px-3 py-1.5">{selectedProject.status}</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-border bg-card/90 p-5">
                    <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Problem Statement</h5>
                    <p className="mt-3 text-sm leading-7 text-slate-200">{selectedProject.problem}</p>
                  </div>
                  <div className="rounded-3xl border border-border bg-card/90 p-5">
                    <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Solution</h5>
                    <p className="mt-3 text-sm leading-7 text-slate-200">
                      The engineering solution for {selectedProject.title} focused on secure, maintainable systems design, practical data workflows, and clear operational visibility.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-border bg-card/90 p-5">
                  <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">System Architecture</h5>
                  <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {selectedProject.architecture.map((step, index) => (
                      <div key={step} className="flex min-h-[86px] items-center gap-3 rounded-2xl border border-border bg-surface/90 p-3.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-xs font-bold text-primary">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm leading-6 text-slate-100">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-border bg-card/90 p-5">
                    <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">My Engineering Contributions</h5>
                    <ul className="mt-4 space-y-3">
                      {selectedProject.contributions.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
                          <CheckCircle2 size={16} className="mt-1 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-border bg-card/90 p-5">
                    <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Technology Stack</h5>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedProject.technologies.map((technology) => (
                        <span key={technology} className="rounded-lg border border-border bg-surface px-2.5 py-2 text-[11px] font-medium text-slate-200">
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-border bg-card/90 p-5">
                    <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Engineering Challenges</h5>
                    <ul className="mt-4 space-y-3">
                      {selectedProject.challenges.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-primary/25 bg-primary/[0.04] p-5">
                    <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Outcomes</h5>
                    <ul className="mt-4 space-y-3">
                      {selectedProject.outcomes.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-100">
                          <CheckCircle2 size={16} className="mt-1 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:justify-between">
                  <Link href={`/?project=${previousProject.slug}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-white">
                    <ArrowLeft size={16} /> Previous
                  </Link>

                  <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-slate-950">
                    Return to portfolio
                  </Link>

                  {nextProject && (
                    <Link href={`/?project=${nextProject.slug}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-white">
                      Next <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="relative overflow-hidden">
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-16 sm:px-6 md:pb-20 md:pt-20 lg:grid-cols-[1.18fr_0.82fr] lg:px-8 lg:pb-24 lg:pt-24">
            {/* Left side: Professional Identity & Core Links */}
            <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }} className="max-w-2xl">
              <div className="mb-5 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-border bg-card/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300 sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" aria-hidden="true" />
                Available for engineering roles
                <span className="hidden text-slate-600 sm:inline">/</span>
                <span className="inline-flex items-center gap-1 text-slate-300 font-medium"><MapPin size={12} className="text-primary" />Thanjavur, India</span>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Software Engineer</span>
                <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Kapildev K
                </h1>
                <p className="mt-2 text-base font-semibold tracking-wide text-sky-200 sm:text-lg">
                  Cloud Security &middot; Backend Engineering &middot; DevOps & SRE
                </p>
              </div>

              <h2 className="mt-5 max-w-3xl text-2xl font-semibold leading-[1.25] tracking-tight text-slate-100 sm:text-3xl lg:text-4xl">
                Engineering secure cloud systems and reliable software.
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
                I&apos;m Kapildev K, a Software Engineer focused on cloud security, backend systems, endpoint compliance, and observability.
              </p>
              <p className="mt-2.5 max-w-xl text-sm leading-6 text-slate-400">
                From AWS attack-path analysis to cross-platform agents and private retrieval, I work across the architecture and implementation of practical engineering systems.
              </p>

              <div className="mt-5 flex flex-wrap gap-2" aria-label="Core technologies">
                {['Python', 'Go', 'AWS', 'PostgreSQL', 'Kubernetes', 'FastAPI'].map((technology) => (
                  <span key={technology} className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-slate-200 shadow-sm">{technology}</span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  Explore Projects
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

              <div className="mt-7 max-w-xl rounded-2xl border border-border/80 bg-slate-950/60 p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-200">Cloud security workflow</span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400 font-medium">Illustrative system flow</span>
                </div>
                <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-3">
                  {[
                    { icon: Boxes, label: 'AWS inventory' },
                    { icon: GitBranch, label: 'Resource graph' },
                    { icon: ShieldCheck, label: 'Path findings' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex min-w-0 items-center gap-2 rounded-lg border border-border/70 bg-card/80 px-2.5 py-2 text-[11px] leading-4 text-slate-200">
                      <Icon size={14} className="shrink-0 text-primary" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 3D cloud network anchors the hero; the portrait and system flow remain readable without WebGL. */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.1 }}
              className="relative mx-auto w-full max-w-xl"
            >
              <div className="relative isolate min-h-[390px] overflow-hidden rounded-[2rem] border border-sky-300/20 bg-[#07111f] shadow-[0_30px_100px_-40px_rgba(14,165,233,0.35)] sm:min-h-[460px]">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_52%_45%,rgba(14,165,233,0.16),transparent_58%),linear-gradient(145deg,rgba(8,13,24,0.1),rgba(8,13,24,0.82))]" />
                <div className="absolute inset-0 z-0 opacity-90">
                  <DynamicHero3DScene reducedMotion={Boolean(prefersReducedMotion)} />
                </div>
                <div className="relative z-10 flex min-h-[390px] flex-col justify-between p-5 sm:min-h-[460px] sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">Systems in motion</p>
                      <h2 className="mt-1 text-lg font-semibold text-white sm:text-xl">Cloud infrastructure, connected.</h2>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/20 bg-slate-950/70 px-3 py-1.5 text-[10px] font-semibold text-slate-200 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Conceptual view
                    </span>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 top-[28%] flex justify-center">
                    <div className="rounded-2xl border border-sky-200/20 bg-slate-950/75 p-2 shadow-xl backdrop-blur-sm">
                      <Image
                        src="/profile-photo.png"
                        alt=""
                        width={1086}
                        height={1450}
                        sizes="72px"
                        priority
                        className="h-20 w-16 rounded-xl object-cover object-top sm:h-24 sm:w-[4.5rem]"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 backdrop-blur-md sm:p-5">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-white">Engineering focus</p>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Illustrative network</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon: Boxes, label: 'AWS inventory' },
                        { icon: GitBranch, label: 'Relationships' },
                        { icon: ShieldCheck, label: 'Security analysis' },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex min-w-0 flex-col items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-2 py-3 text-center text-[10px] leading-4 text-slate-200 sm:flex-row sm:text-xs">
                          <Icon size={15} className="shrink-0 text-primary" aria-hidden="true" />
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Engineering Scope Section */}
        <section aria-labelledby="engineering-scope-title" className="border-y border-border/80 bg-surface/30">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">Verified Project Scope</p>
                <h2 id="engineering-scope-title" className="mt-2 text-lg font-bold text-white sm:text-xl">Engineering Impact</h2>
              </div>
              <p className="max-w-md text-xs leading-5 text-slate-400">Qualitative scope from documented project work; no unverified performance claims.</p>
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Server, title: 'Endpoint Compliance', detail: 'Cross-platform telemetry for Windows, Linux & macOS' },
                { icon: GitBranch, title: 'Cloud Security Graph', detail: 'AWS identity permissions, network reachability & blast radius' },
                { icon: LockKeyhole, title: 'Private AI Retrieval', detail: 'Hybrid keyword + vector search with local LLM inference' },
                { icon: Activity, title: 'Log Observability', detail: 'Secret redaction, event classification, and Teams alerts' },
              ].map(({ icon: Icon, title, detail }) => (
                <div key={title} className="flex gap-3.5 rounded-xl border border-border/80 bg-card/70 p-4 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary"><Icon size={18} /></span>
                  <div><h3 className="text-sm font-semibold text-white">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
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
              <div className="rounded-2xl border border-border bg-card/70 p-6 sm:p-7">
                <p className="text-sm font-bold text-white uppercase tracking-wider">How I Work</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  I approach engineering by understanding system boundaries first, then connecting implementation details across APIs, data, infrastructure, and operations. My earlier quality-focused work continues to shape how I investigate issues and document outcomes.
                </p>
                <p className="mt-4 border-t border-border pt-4 text-xs leading-6 text-slate-400">
                  Focus areas: cloud security &middot; backend architecture &middot; DevOps &amp; SRE &middot; monitoring and observability
                </p>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                {focusAreas.map(({ title, icon: Icon }) => (
                  <div key={title} className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/60">
                    <div className="mb-3 inline-flex rounded-xl border border-primary/30 bg-primary/10 p-2.5 text-primary">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-base font-semibold text-white">{title}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="eyebrow">Career Timeline</p>
                  <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">From quality engineering to software systems.</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">Education &middot; employment &middot; project milestones</span>
              </div>
              <ol className="mt-6 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
                {careerMilestones.map((milestone, index) => (
                  <li key={`${milestone.date}-${milestone.title}`} className="relative rounded-xl border border-border bg-card/70 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                        {index === 0 ? <BookOpen size={14} /> : index === 1 ? <Briefcase size={14} /> : <Layers3 size={14} />}
                      </span>
                      <time className="text-xs font-semibold text-primary">{milestone.date}</time>
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
              <p className="eyebrow">Technical Toolkit</p>
              <h2 className="section-title">Tools I use to build and operate systems.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Grouped by the engineering problems they solve. No proficiency scores or unsupported ratings.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {skillGroups.map(({ title, icon: Icon, items }) => (
                <div key={title} className="rounded-2xl border border-border bg-card/80 p-5 transition hover:border-primary/40 sm:p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary"><Icon size={18} /></span>
                    <h3 className="text-base font-semibold text-white">{title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span key={item} className="inline-flex rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-primary/50 hover:text-white">
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
                <p className="eyebrow">Selected Engineering Work</p>
                <h2 className="section-title">Projects, explained through systems.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  Start with endpoint compliance, monitoring, and AWS telemetry: three systems that show how I approach fleet posture, log pipelines, and cloud visibility. Each case study separates documented work from illustrative previews.
                </p>
              </div>
              <a href="https://github.com/kapildev-k" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition hover:brightness-110">
                GitHub profile <ExternalLink size={14} />
              </a>
            </div>

            <nav aria-label="Project case studies" className="mt-6 flex flex-wrap gap-2">
              {projectData.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/?project=${project.slug}`}
                  className="inline-flex max-w-full items-center gap-2 rounded-lg border border-border bg-surface/70 px-3 py-2 text-xs font-medium leading-5 text-slate-200 transition hover:border-primary/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="shrink-0 font-mono text-primary">0{index + 1}</span>
                  <span>{project.title}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-10 space-y-8">
              {projectData.map((project, index) => (
                <motion.article
                  key={project.title}
                  id={`project-${project.kind}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: 'easeOut' }}
                  className={`scroll-mt-24 overflow-hidden rounded-3xl border bg-card/90 p-6 shadow-sm sm:p-7 lg:p-8 ${
                    index < 3 ? 'border-border border-t-2 border-t-primary/60' : 'border-border'
                  }`}
                >
                    <div className={`grid gap-8 xl:gap-9 ${
                      index < 3
                        ? 'lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]'
                        : 'lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]'
                    }`}>
                      {/* Left Column: Context, Problem & Stack */}
                      <div className={`flex min-w-0 flex-col justify-between ${project.kind === 'jedai' ? 'lg:order-2' : ''}`}>
                        <div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{project.category}</span>
                            <span className="text-xs text-slate-400 font-medium">{project.period}</span>
                          </div>
                          <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-white sm:text-[1.65rem]">{project.title}</h3>
                          <p className="mt-4 text-[15px] leading-7 text-slate-100">{project.overview}</p>

                          <div className="mt-5 rounded-2xl border border-border/80 bg-surface/80 p-4 sm:p-5">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300">
                              <FileSearch size={15} className="text-primary" /> Engineering Problem
                            </h4>
                            <p className="mt-2 text-[13px] leading-6 text-slate-200">{project.problem}</p>
                          </div>
                        </div>

                        <div className="mt-6 border-t border-border/70 pt-5">
                          <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-300">Technologies</h4>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.technologies.map((technology) => (
                              <span key={technology} className="rounded-lg border border-border bg-background/90 px-2.5 py-1.5 text-xs font-medium text-slate-200">{technology}</span>
                            ))}
                          </div>
                          <div className="mt-5 flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">{project.status}</span>
                            <Link
                              href={`/?project=${project.slug}`}
                              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2 text-sm font-semibold text-slate-200 transition hover:border-primary/60 hover:text-white"
                            >
                              View Case Study <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Visualization Viewport */}
                      <div className={`min-w-0 flex flex-col justify-center ${project.kind === 'jedai' ? 'lg:order-1' : ''}`}>
                        <InteractiveProjectPreview kind={project.kind} />
                        <p className="mt-2.5 text-xs leading-5 text-slate-300">{project.kind === 'nethra' || project.kind === 'jedai' ? 'Architecture view by default; optional 3D preview uses clearly labeled sample data.' : 'Project-specific architecture view based on the documented system flow.'}</p>
                      </div>
                    </div>

                    {/* Detailed Case Study Disclosure */}
                    <details className="group mt-7 border-t border-border pt-5">
                      <summary className="flex min-h-[44px] cursor-pointer list-none flex-wrap items-center justify-between gap-3 rounded-xl py-2.5 text-sm font-semibold text-slate-200 outline-none touch-manipulation transition hover:text-primary focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center gap-2.5">
                          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/20 text-xs font-bold text-primary">0{index + 1}</span>
                          Explore Architecture, Engineering Contributions &amp; Outcomes
                        </span>
                        <span className="inline-flex items-center gap-2 text-xs text-slate-400 group-open:text-primary">
                          Case Study Breakdown <ArrowDown size={14} className="transition group-open:rotate-180" />
                        </span>
                      </summary>
                      <div className="mt-4 space-y-6 border-t border-border/70 pt-6">
                        <div>
                          <div className="flex flex-wrap items-end justify-between gap-2">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Architecture and Data Flow</h4>
                            <span className="text-[11px] text-slate-400 font-medium">Numbered stages show the conceptual pipeline</span>
                          </div>
                          <ArchitectureFlow steps={project.architecture} />
                        </div>

                        <div className="grid gap-5 lg:grid-cols-2">
                          <div className="rounded-2xl border border-border bg-surface/80 p-5">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider">My Contributions</h4>
                            <ul className="mt-3.5 space-y-2.5 text-[13px] leading-6 text-slate-100">
                              {project.contributions.map((contribution) => (
                                <li key={contribution} className="flex gap-2.5">
                                  <CheckCircle2 size={16} className="mt-1 shrink-0 text-primary" /><span>{contribution}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-4">
                            <div className="rounded-2xl border border-border bg-surface/80 p-5">
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Technical Challenges</h4>
                              <ul className="mt-3.5 space-y-2 text-[13px] leading-6 text-slate-100">
                                {project.challenges.map((challenge) => (
                                  <li key={challenge} className="flex gap-2.5">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /><span>{challenge}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="rounded-2xl border border-primary/25 bg-primary/[0.05] p-5">
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Delivered Capabilities</h4>
                              <ul className="mt-3.5 space-y-2 text-[13px] leading-6 text-slate-100">
                                {project.outcomes.map((outcome) => (
                                  <li key={outcome} className="flex gap-2.5">
                                    <CheckCircle2 size={16} className="mt-1 shrink-0 text-primary" /><span>{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </details>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Experience Section */}
        <section id="experience" className="section-shell border-t border-border/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Professional Experience</p>
              <h2 className="section-title">Professional Experience</h2>
            </div>

            <div className="mt-10 space-y-6">
              <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 text-primary">
                      <Briefcase size={16} />
                      <span className="text-xs font-bold uppercase tracking-[0.15em]">Intuitive Objects Services Pvt. Ltd.</span>
                    </div>
                    <h3 className="mt-2.5 text-2xl font-bold text-white">Research Intern — Software Engineering</h3>
                  </div>
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-slate-300">February 2025 – Present</span>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-surface/80 p-5">
                    <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-300">Current Focus</h4>
                    <ul className="mt-3 space-y-2 text-xs leading-6 text-slate-200">
                      <li>• Cloud attack path / CNAPP platform</li>
                      <li>• Agentless Kubernetes security</li>
                      <li>• Nethra endpoint compliance</li>
                      <li>• JEDAI monitoring</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-border bg-surface/80 p-5">
                    <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-300">Contribution Style</h4>
                    <p className="mt-3 text-xs leading-6 text-slate-200">
                      I contribute across design, engineering implementation, troubleshooting, monitoring, security validation, and documentation, working from architecture-level analysis through practical delivery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 text-primary">
                      <Briefcase size={16} />
                      <span className="text-xs font-bold uppercase tracking-[0.15em]">AquaSub Engineering Pvt. Ltd.</span>
                    </div>
                    <h3 className="mt-2.5 text-2xl font-bold text-white">R&amp;D / Quality Control Engineer</h3>
                  </div>
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-slate-300">March 2023 – May 2024</span>
                </div>

                <ul className="mt-6 space-y-2.5 text-xs leading-6 text-slate-200">
                  <li>• Quality inspection and reporting workflows</li>
                  <li>• Data-driven quality tracking and defect visibility</li>
                  <li>• Production and engineering collaboration for continuous improvement</li>
                  <li>• Analytical problem-solving and disciplined documentation in operations-focused work</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Approach */}
        <section className="section-shell border-t border-border/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Engineering Approach</p>
              <h2 className="section-title">How I Approach Engineering</h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {principles.map((principle, index) => (
                <div key={principle} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary font-bold">
                    0{index + 1}
                  </div>
                  <p className="text-xs leading-6 text-slate-200 font-medium">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="section-shell border-t border-border/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Education &amp; Certifications</p>
              <h2 className="section-title">Education &amp; Certifications</h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-7 shadow-sm">
                <h3 className="text-xl font-bold text-white">Bachelor of Engineering (Mechanical Engineering)</h3>
                <p className="mt-3 text-sm text-slate-200 font-medium">Arasu Engineering College, Kumbakonam</p>
                <p className="mt-1 text-xs text-slate-400">2023</p>
                <p className="mt-4 text-xs font-semibold text-primary">CGPA: 7.4</p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7 shadow-sm">
                <h3 className="text-xl font-bold text-white">Certification</h3>
                <p className="mt-3 text-sm text-slate-200 font-medium">Java Full Stack Development</p>
                <p className="mt-1 text-xs text-slate-400">SSRTIC (Tekstac Platform)</p>
                <div className="mt-5 border-t border-border/70 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-300">Languages</h4>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300">
                    <li>• Tamil – Native</li>
                    <li>• English – Professional Working Proficiency</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub & Open Source Profile */}
        <section aria-labelledby="github-title" className="section-shell border-t border-border/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Open Source Profile</p>
              <h2 id="github-title" className="section-title">Public repositories, linked directly.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">Project details that are not public remain portfolio case studies rather than being presented as open-source repositories.</p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <a href="https://github.com/kapildev-k/portfilio" target="_blank" rel="noreferrer" className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface text-primary"><Github size={22} /></span>
                  <ExternalLink size={16} className="text-slate-500 transition group-hover:text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">Portfolio source</h3>
                <p className="mt-2 text-xs leading-6 text-slate-300">Public repository for this portfolio website.</p>
                <span className="mt-4 inline-flex rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono text-slate-400">kapildev-k/portfilio</span>
              </a>
              <a href="https://github.com/kapildev-k/projects" target="_blank" rel="noreferrer" className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface text-primary"><Code2 size={22} /></span>
                  <ExternalLink size={16} className="text-slate-500 transition group-hover:text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">projects</h3>
                <p className="mt-2 text-xs leading-6 text-slate-300">Public repository listed under Java on GitHub.</p>
                <span className="mt-4 inline-flex rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono text-slate-400">kapildev-k/projects · Java</span>
              </a>
            </div>
            <div className="mt-6">
              <a href="https://github.com/kapildev-k" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:brightness-110">
                Visit GitHub profile <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
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
              <div className="space-y-5 rounded-3xl border border-border bg-card p-7 shadow-sm">
                <a href="mailto:kapilkochi@gmail.com" className="flex items-center gap-3 text-slate-200 transition hover:text-primary">
                  <Mail size={18} />
                  <span className="text-sm font-medium">kapilkochi@gmail.com</span>
                </a>
                <a href="https://linkedin.com/in/kapildev-k-69ab1a26b" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-200 transition hover:text-primary">
                  <Linkedin size={18} />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a href="https://github.com/kapildev-k" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-200 transition hover:text-primary">
                  <Github size={18} />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin size={18} />
                  <span className="text-sm font-medium">Thanjavur, Tamil Nadu, India</span>
                </div>
                <p className="border-t border-border pt-4 text-xs leading-6 text-slate-400">
                  The form opens a prefilled email draft in your email application. This site does not send or store form submissions.
                </p>
              </div>

              <form onSubmit={handleSubmit} aria-label="Prepare an email to Kapildev" className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-sm">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    <span className="mb-2 block">Name</span>
                    <input id="contact-name" name="name" autoComplete="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" placeholder="Your name" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-xs text-slate-100 outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 font-normal" required />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    <span className="mb-2 block">Email</span>
                    <input id="contact-email" name="email" autoComplete="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="your@email.com" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-xs text-slate-100 outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 font-normal" required />
                  </label>
                </div>

                <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  <span className="mb-2 block">Message</span>
                  <textarea id="contact-message" name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} placeholder="Tell me about the role, project, or engineering challenge." className="w-full resize-y rounded-xl border border-border bg-surface px-3 py-3 text-xs text-slate-100 outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 font-normal" required />
                </label>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card">
                    Open Email Draft
                    <ArrowRight size={16} />
                  </button>
                  <span className="text-xs text-slate-400">No backend submission; your email app handles delivery.</span>
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
            <a href="https://github.com/kapildev-k" target="_blank" rel="noreferrer" className="hover:text-primary transition">
              GitHub
            </a>
            <a href="https://linkedin.com/in/kapildev-k-69ab1a26b" target="_blank" rel="noreferrer" className="hover:text-primary transition">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
