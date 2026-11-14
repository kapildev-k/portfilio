# Kapildev K — Detailed Portfolio Custom Document

## 1. Portfolio Purpose

This portfolio is designed to present Kapildev K as a serious, technically credible software engineer working across cloud security, backend engineering, DevOps, site reliability, monitoring, and AI-enabled product work.

The website should not read like a generic resume or a creative template. It should feel like a real engineering portfolio built for recruiters, hiring managers, and technical interviewers who want to understand:

- who I am
- what engineering problems I solve
- which technologies I work with
- what real-world systems I have built or contributed to
- how to contact me

The portfolio must balance professionalism, technical depth, and clarity without exaggerating claims or presenting fabricated work.

---

## 2. Personal Brand Positioning

### Core Identity

Kapildev K
Software Engineer | Cloud Security | DevOps & SRE | Backend Engineering

### Brand Message

I am a software engineer with a background in Mechanical Engineering who transitioned into software engineering and cloud-focused product development.

My work spans:

- cloud security and exposure analysis
- backend engineering and API design
- AWS infrastructure and platform automation
- endpoint compliance and security telemetry
- monitoring and observability
- private AI and RAG-based solutions

This brand positioning should communicate that I am practical, systems-oriented, and hands-on, with strong interest in architecture, operations, security, and reliability.

### Tone

Use a confident but grounded tone:

- technically mature
- professional
- credible
- hands-on
- concise
- engineering-first

Avoid:

- exaggerated claims
- fake seniority language
- broad buzzwords without evidence
- over-marketing language
- invented stats or metrics

---

## 3. Target Audience

The portfolio is aimed at:

- recruiters
- engineering managers
- cloud security recruiters
- DevOps and SRE hiring teams
- backend engineering teams
- AI/ML product teams
- technical interviewers
- organizations evaluating cloud-native engineering talent

### What they want to know quickly

Within 10 seconds, a visitor should understand:

1. who I am
2. what technologies I work with
3. what engineering problems I solve
4. what projects I have contributed to
5. how to contact me

---

## 4. Portfolio Structure Strategy

The website should contain the following sections in a clear narrative flow:

1. Sticky navigation
2. Hero / landing section
3. About section
4. Technical skills section
5. Featured projects
6. Professional experience section
7. Engineering approach section
8. Education and certification section
9. GitHub and technical activity section
10. Contact section

This structure should help visitors move from introduction to proof of engineering work without confusion.

---

## 5. Design Direction

### Visual Theme

The portfolio should use a premium dark engineering aesthetic inspired by modern developer portfolios and infrastructure dashboards.

### Recommended palette

- Background: #080D18
- Secondary Background: #101827
- Card Background: #111C2D
- Primary Text: #F8FAFC
- Secondary Text: #94A3B8
- Accent: #38BDF8
- Border: #243247

### Design principles

- deep navy background
- restrained contrast
- modern typography
- subtle grid and architectural visual cues
- accessible white and grey text
- cyan accent highlights
- clean cards and borders
- no generic stock imagery
- no cartoon UI
- no overdesigned glassmorphism
- no meaningless large stats

### User experience goals

- clean and readable
- professional and technical
- polished but not flashy
- mobile-first
- easy to scan
- credible for engineering recruiters

---

## 6. Information Architecture

### 6.1 Navigation

Navigation items:

- Home
- About
- Skills
- Projects
- Experience
- Contact

Right side actions:

- GitHub icon link
- LinkedIn icon link
- Download Resume button

Behavior requirements:

- sticky navigation
- smooth scrolling
- active section highlighting
- mobile menu
- clean collapse behavior
- unobtrusive while scrolling

### 6.2 Hero Section

Primary heading:

"Building Secure, Reliable & Intelligent Software Systems."

Supporting paragraph:

"I'm Kapildev K, a Software Engineer working across Cloud Security, Backend Engineering, DevOps & SRE.

I build practical engineering solutions spanning AWS security platforms, endpoint compliance, infrastructure monitoring, and private AI systems."

Primary actions:

- Explore My Projects
- Download Resume

Secondary links:

- GitHub
- LinkedIn
- Contact Me

Visual concept:

- subtle cloud/infrastructure diagram
- connection nodes and graph feel
- security/monitoring-inspired dashboard panel
- terminal-inspired card layout
- no generic SaaS landing page vibe

### 6.3 About Section

Heading:

"About Me"

Important content to keep:

"I started my professional journey with a Bachelor of Engineering in Mechanical Engineering and transitioned into software engineering.

Since February 2025, I have been working in software engineering, developing applications and technical platforms involving Python, backend APIs, cloud infrastructure, security engineering, and AI-based applications.

My work involves more than writing application code. I explore system architecture, infrastructure integration, database design, automation, performance optimization, security validation, and production troubleshooting.

I am particularly interested in Cloud Security, DevOps, Site Reliability Engineering, distributed systems, and backend architecture."

Focus cards:

- Cloud Security Engineering
- Backend Development
- DevOps & SRE
- Monitoring & Observability

---

## 7. Skills Strategy

The skills section should be organized in neat categories and should look professional, not like a raw list dump.

### Technical skills categories

#### Languages
- Python
- Go
- SQL
- Java
- JavaScript

#### Backend Development
- FastAPI
- REST APIs
- Backend Architecture
- API Integration
- Automation

#### Cloud & Infrastructure
- AWS EC2
- VPC
- IAM
- S3
- EKS
- ELB
- CloudWatch
- CloudTrail
- VPC Flow Logs
- Kubernetes
- RBAC
- Ingress

#### DevOps & SRE
- Docker
- Linux
- Grafana
- Monitoring
- Observability
- Git and GitHub
- Infrastructure Troubleshooting

#### Databases & Graph
- PostgreSQL
- Apache AGE
- MySQL
- MongoDB
- ChromaDB
- Graph Data Modelling

#### AI & Frontend
- RAG
- Ollama
- BM25
- Embeddings
- Vector Search
- React
- HTML
- CSS
- Capacitor

### Important rule

Do not invent skill percentages or ratings. This section should be descriptive and clean, not gamified.

---

## 8. Project Content Strategy

This is the strongest section of the portfolio and should be built carefully.

### Required project presentation style

Each project should include:

- project name
- short overview
- problem statement
- what I contributed
- technical architecture
- technologies used
- engineering challenges
- key capabilities
- conceptual architecture diagram
- confidentiality note where relevant

### Project 01: Cloud Attack Path Engine / CNAPP

#### Duration
February 2026 – Present

#### Overview
Developed a graph-based cloud security platform for analyzing AWS infrastructure, resource relationships, network reachability, identity permissions, and multi-stage attack paths.

#### Key contributions
- Built AWS resource inventory collection
- Integrated CloudTrail event collection and enrichment
- Integrated VPC Flow Logs
- Collected EC2, VPC, subnets, route tables, gateways, security groups, IAM roles, S3, ELB, and EKS relationships
- Built PostgreSQL-backed asset and relationship storage
- Used Apache AGE for graph traversal and attack-path analysis
- Developed security findings and attack story workflows
- Implemented risk scoring, confidence, blast radius, root cause, and remediation context
- Built Grafana and PostgreSQL monitoring dashboards and alerts
- Extended analysis to agentless Kubernetes security

#### Kubernetes analysis includes
- clusters
- namespaces
- workloads
- pods and containers
- services and ingress
- service accounts
- RBAC
- secrets
- IAM identities
- IRSA relationships

#### Architecture narrative
AWS Accounts
→ Resource Inventory
→ CloudTrail / VPC Flow Logs
→ Data Enrichment
→ PostgreSQL / Apache AGE
→ Security Analysis Engine
→ Findings and Attack Stories
→ Grafana Dashboard

#### Confidentiality note
Do not expose private source code, account identifiers, real customer data, internal endpoints, credentials, or proprietary implementation specificity.

### Project 02: Nethra Endpoint Compliance

#### Duration
Current work

#### Overview
Developed a cross-platform endpoint compliance monitoring solution for Windows, Linux, and macOS.

#### Key contributions
- cross-platform endpoint monitoring
- native Go agent architecture
- enrollment token workflows
- secure credential handling
- endpoint inventory collection
- compliance reporting
- agent self-update and rollback
- tamper protection
- release integrity and GPG verification
- RBAC and administrative management
- reliability and performance improvement

#### Compliance capabilities
- firewall status
- disk encryption
- antivirus presence
- antivirus definition status
- OS updates
- minimum OS version
- secure boot
- TPM presence
- USB storage policy
- hardware inventory
- local administrators
- guest account information

#### Architecture narrative
Windows / Linux / macOS
→ Native Go Agent
→ Secure Enrollment
→ HTTPS Ingestion API
→ Backend Processing
→ PostgreSQL
→ Compliance Evaluation
→ Admin Portal / Reports

#### Challenges to emphasize
- cross-platform compatibility
- secure agent lifecycle
- reliable auto-updates
- release verification
- endpoint data collection
- performance optimization

#### Confidentiality note
Present as a professional product contribution without exposing proprietary infrastructure, signing keys, production URLs, or sensitive implementation details.

### Project 03: JEDAI Monitoring Module

#### Duration
November 2026 – Present

#### Overview
Worked on a monitoring solution to collect, process, and report application logs from the JEDAI environment.

#### Contributions
- designed monitoring-agent architecture
- implemented Docker log collection using read-only mounts
- avoided Docker socket dependency
- developed log processing and classification
- implemented secret redaction
- collected WARNING and ERROR-level events and important tagged messages
- aggregated INFO-level counts
- designed batch-based HTTPS communication
- integrated with a monitoring ingestion API
- used PostgreSQL for monitoring storage
- designed alerting and Teams notifications

#### Architecture narrative
JEDAI Application Containers
→ Monitoring Agent
→ Log Collection
→ Classification and Redaction
→ HTTPS Batch Ingestion
→ Monitoring API
→ PostgreSQL
→ Alert Service
→ Microsoft Teams

#### Focus areas
- log volume visibility
- warning/error tracking
- container health context
- alert history
- recent event correlation
- secure log handling

### Project 04: Private Contextual RAG System

#### Duration
February 2025 – December 2025

#### Overview
Developed a private document question-answering system using local LLMs and hybrid retrieval.

#### Contributions
- PDF and Markdown ingestion
- document chunking
- metadata extraction
- embedding generation
- vector search
- BM25 keyword retrieval
- hybrid retrieval
- local Ollama integration
- private document Q&A system

#### Technology stack
Python, FastAPI, React, Ollama, ChromaDB, BM25, Embeddings

#### Architecture narrative
Documents
→ Parsing
→ Chunking
→ Metadata Extraction
→ Embeddings
→ ChromaDB + BM25
→ Hybrid Retrieval
→ Local LLM
→ Answer Generation

#### Emphasis
- privacy-first approach
- on-premise document processing
- local inference
- practical internal tooling use case

### Project 05: Tally-Based Supermarket Management Application

#### Duration
January 2026 – February 2026

#### Overview
Developed a supermarket management application covering essential retail operations.

#### Modules
- Billing
- Inventory
- Purchases
- Customer Records
- User Management
- Sales Reporting

#### Contributions
- FastAPI backend APIs
- PostgreSQL integration
- three-tier RBAC system
- Owner, Supervisor, and Counter Staff roles
- React frontend
- Capacitor-based Android deployment from the shared frontend codebase

#### Technology stack
Python, FastAPI, React, PostgreSQL, REST APIs, RBAC, Capacitor

---

## 9. Professional Experience Narrative

### Company
Intuitive Objects Services Pvt. Ltd.

### Position
Research Intern — Software Engineering

### Duration
February 2025 – Present

### Narrative
This experience should be presented as a software engineering role with meaningful work in cloud security, platform engineering, monitoring, and AI-enabled product work.

It should highlight work across:

- Cloud Attack Path / CNAPP Platform
- Agentless Kubernetes Security
- Nethra Endpoint Compliance
- JEDAI Monitoring

The portfolio should describe these items as real hands-on engineering work and distinguish them from broader team efforts where relevant.

### Previous Experience
AquaSub Engineering Pvt. Ltd.
Role: R&D / Quality Control Engineer
Duration: March 2023 – May 2024

Focus areas:
- quality inspection and reporting workflows
- data-driven quality tracking
- defect visibility
- production and engineering collaboration
- problem solving and disciplined technical execution

This former experience should be positioned as the foundation for systems thinking and operational discipline.

---

## 10. Engineering Approach Section

Title:
"How I Approach Engineering"

Principles to present:

1. Understand the System – Explore architecture and dependencies before implementing changes.
2. Build Securely – Consider security from design through deployment.
3. Automate Repetitive Work – Use Python, Go, and infrastructure tooling.
4. Monitor Everything Important – Build observability into applications and infrastructure.
5. Validate Before Release – Test, verify and improve reliability.
6. Document Engineering Decisions – Maintain useful technical documentation and architecture records.

This section is valuable because it shows engineering maturity beyond a list of tools.

---

## 11. Education & Certifications

### Education
Bachelor of Engineering (Mechanical Engineering)
Arasu Engineering College, Kumbakonam
2023
CGPA: 7.4

### Certification
Java Full Stack Development
SSRTIC (Tekstac Platform)

### Languages
- Tamil – Native
- English – Professional Working Proficiency

---

## 12. GitHub & Technical Activity Section

This section should connect to the GitHub profile and be framed carefully.

GitHub URL:
https://github.com/kapildev-k

Expected content:
- GitHub profile link
- public repositories
- technologies used
- selected public projects
- contribution activity if available

Important rule:
Do not fabricate repository names, stars, contribution counts, or commit figures.

If GitHub API integration is implemented, the site should handle unavailable data gracefully.

---

## 13. Contact Strategy

Heading:
"Let's Build Something Meaningful."

Description:
"I'm always interested in discussing cloud security, backend engineering, DevOps, SRE, monitoring, and interesting engineering challenges."

Display:
- Email: kapilkochi@gmail.com
- LinkedIn: https://linkedin.com/in/kapildev-k-69ab1a26b
- GitHub: https://github.com/kapildev-k

### Contact form guidance
A real backend is not required. The recommended practical solution is a mailto-based form alternative that opens the user's email client and sends the message.

This is a safer and more realistic option than pretending a backend exists.

---

## 14. Advanced Portfolio Features

Where appropriate, include:

- dark theme by default
- optional light/dark mode switch
- smooth scrolling
- subtle entrance animations
- interactive project cards
- architectural diagrams
- downloadable resume PDF
- responsive mobile navigation
- SEO metadata and Open Graph tags
- favicon using initials KK
- back-to-top button
- accessible interactions
- custom 404 page
- optimized page loading

Avoid overloading the interface with unnecessary motion or noisy effects.

---

## 15. Architecture Diagram Requirements

Architecture diagrams are especially important because the work involves infrastructure, processing pipelines, and cloud systems.

Use conceptual diagrams rather than production confidential architecture.

Recommended diagram styles:

- Mermaid
- SVG
- React-based diagram system
- custom lightweight infrastructure graphs

Include for these themes:

- Cloud Attack Path Engine
- Nethra Endpoint Compliance
- JEDAI Monitoring
- Private RAG System

Each diagram should show:

- components
- data flow
- infrastructure relationships
- processing stages
- storage
- APIs
- monitoring and output

Make them mobile-friendly and readable.

---

## 16. SEO and Recruiter Optimization

The website should be optimized for searches such as:

- Kapildev K Software Engineer
- Python Developer
- AWS Cloud Security Engineer
- DevOps Engineer
- Site Reliability Engineer
- Backend Developer
- Cloud Security
- Kubernetes Security
- Endpoint Compliance
- Monitoring and Observability

### Metadata strategy

Use descriptive titles and page metadata that reflect technical work rather than generic portfolio language.

Examples:

- Kapildev K | Software Engineer
- Cloud Security, DevOps & Backend Engineering Portfolio
- AWS Security, Monitoring, and RAG Engineer Portfolio

---

## 17. Content Accuracy Rules

This is extremely important.

- Use the actual professional background provided.
- Do not invent projects.
- Do not fabricate employment history.
- Do not invent certifications.
- Do not claim technologies I have not used.
- Do not invent performance metrics.
- Do not expose confidential company information.
- Do not publish proprietary source code.
- Do not claim production readiness without verification.
- Distinguish implemented, tested, planned, and ongoing work.
- Use first-person language when describing work.

The portfolio should feel real, credible, and technically grounded.

---

## 18. Deployment Requirements

Preferred hosting:
Vercel

Requirements:

- production build must pass
- no broken links
- no missing resume file
- responsive layout
- clean favicon
- accessible navigation
- responsive on desktop, tablet, and mobile
- no horizontal overflow
- working external links

### Suggested deployment checklist

- production build passes
- metadata and Open Graph tags are present
- resume download works
- mobile menu works
- all anchors scroll correctly
- external links use safe targets
- no broken image references
- page is readable on all screen widths

---

## 19. Development Workflow Recommendation

### Phase 1: Project Setup
- initialize Next.js
- configure TypeScript and Tailwind
- define design tokens
- create reusable components

### Phase 2: Core UI
- navigation
- hero
- about
- skills
- experience
- contact

### Phase 3: Projects
- detailed project cards
- architecture diagrams
- technology labels
- conceptual visuals

### Phase 4: Design Refinement
- animations
- typography
- spacing
- hover states
- theme polish

### Phase 5: Quality Assurance
- responsive checks
- link validation
- accessibility review
- production build verification

### Phase 6: Deployment
- deploy on Vercel
- prepare README
- provide local instructions

---

## 20. Final Portfolio Positioning Statement

This portfolio should present Kapildev K as a practical software engineer building secure, reliable, and intelligent systems across cloud infrastructure, monitoring, backend engineering, and private AI workflows.

The story should be one of technical depth, systems thinking, and real-world engineering execution rather than generic branding language.

This is a portfolio for an engineer who is interested in understanding systems, solving production problems, improving security posture, and building meaningful software with clear technical intent.

---

## 21. Recommended Short Bio

"I am a Software Engineer with a background in Mechanical Engineering who transitioned into software development and cloud engineering. I work across cloud security, backend engineering, AWS infrastructure, endpoint compliance, monitoring and observability, and private AI systems. My experience includes developing cloud attack-path analysis platforms, cross-platform endpoint compliance solutions, monitoring pipelines, backend APIs, graph-based security analysis, and private RAG applications. I enjoy understanding complex systems, solving engineering problems, designing reliable architectures, and building practical software solutions."

---

## 22. Final Quality Standards

The final portfolio should feel like a premium engineering portfolio built for a serious software engineer.

A visitor should understand within 10 seconds:

- who I am
- what I work on
- what I have built
- how my experience connects to real engineering problems
- how to contact me

The design should be professional, modern, and technically credible without being overstyled or exaggerated.

---

## 23. Project Documentation Note

This document acts as the custom specification for the portfolio and should be used as the reference for writing, designing, and reviewing the website. It keeps the narrative grounded in actual professional background while leaving room for realistic technical storytelling and polished visual presentation.
