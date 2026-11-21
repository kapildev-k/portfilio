export type ProjectStatus = 'Completed' | 'Ongoing' | 'POC / Ongoing';

export type Project = {
  slug: string;
  kind: string;
  number: string;
  title: string;
  status: ProjectStatus;
  period: string;
  category: string;
  overview: string;
  problem: string;
  contributions: string[];
  technologies: string[];
  architecture: string[];
  challenges: string[];
  outcomes: string[];
};

export const projects: Project[] = [
  {
    slug: 'private-rag-application',
    kind: 'rag',
    number: '01',
    title: 'Private RAG Application',
    status: 'Completed',
    period: 'February 2025 – December 2025',
    category: 'Private AI · Enterprise Knowledge Retrieval',
    overview:
      'A private enterprise document retrieval application with category-based access control, document processing pipelines, and local LLM inference.',
    problem:
      'Sensitive enterprise documentation needed secure retrieval and summarization without exposing data externally. A private, local-first retrieval flow was required for practical internal usage.',
    contributions: [
      'Built multi-format document ingestion and conversion into Markdown.',
      'Structured extraction for titles, subtitles, and summaries.',
      'Generated embeddings and stored vector indexes in ChromaDB.',
      'Implemented BM25 keyword retrieval and hybrid search.',
      'Added category-based document isolation and secure local LLM answer generation using Ollama.',
    ],
    technologies: ['Python', 'FastAPI', 'React', 'Docling', 'ChromaDB', 'BM25', 'Ollama', 'Vector Search'],
    architecture: ['Document ingestion', 'Markdown conversion', 'Chunking + metadata extraction', 'Embedding generation', 'ChromaDB + BM25', 'Hybrid retrieval', 'Local Ollama inference'],
    challenges: [
      'Maintaining privacy while keeping document retrieval and answer generation practical for enterprise use.',
      'Combining semantic and lexical retrieval strategies without degrading relevance.',
      'Structuring document metadata so the system can isolate content by category and maintain context.',
    ],
    outcomes: [
      'Delivered a private retrieval workflow for sensitive enterprise documents.',
      'Combined ChromaDB and BM25 retrieval to ground local-model responses.',
      'Supported internal document Q&A with category-based access separation.',
    ],
  },
  {
    slug: 'supermarket-tally-application',
    kind: 'retail',
    number: '02',
    title: 'Supermarket Tally Application',
    status: 'Completed',
    period: 'January 2026 – February 2026',
    category: 'Mobile-first retail operations',
    overview:
      'A mobile-first supermarket cash monitoring and end-of-day reconciliation application tailored for staff, supervisors, and owners.',
    problem:
      'Retail cash flow and reconciliation data were fragmented across operational roles, making daily validation and mismatch tracking difficult.',
    contributions: [
      'Designed role-based access for staff, supervisor, and owner workflows.',
      'Built denomination-wise cash entry and daily sales / expense tracking.',
      'Implemented EOD reconciliation and historical mismatch tracking.',
      'Created daily, weekly, and monthly reporting workflows for store operations.',
      'Prepared a React frontend with a Python backend and Capacitor-based mobile packaging.',
    ],
    technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Capacitor', 'RBAC', 'REST APIs'],
    architecture: ['React + Capacitor frontend', 'Staff · Supervisor · Owner roles', 'FastAPI REST APIs', 'PostgreSQL data layer', 'Cash entry + sales tracking', 'EOD reconciliation + reporting'],
    challenges: [
      'Balancing operational simplicity with detailed reconciliation and reporting needs.',
      'Applying role-based controls across staff and manager workflows without reducing usability.',
      'Sharing a web-first frontend across mobile deployment requirements.',
    ],
    outcomes: [
      'Built a coordinated supermarket workflow for cash monitoring and reconciliation.',
      'Added meaningful role separation for operational ownership and oversight.',
      'Prepared the frontend for Android-friendly deployment using Capacitor.',
    ],
  },
  {
    slug: 'aws-cloud-monitoring',
    kind: 'aws-monitoring',
    number: '03',
    title: 'AWS Cloud Monitoring',
    status: 'Completed',
    period: 'February 2026 – March 2026',
    category: 'Cloud observability · security telemetry',
    overview:
      'A centralized AWS monitoring platform that processed CloudTrail and VPC Flow Logs across multiple accounts and surfaced anomaly signals to operators.',
    problem:
      'Multi-account AWS telemetry was distributed across services and regions, preventing a single operational view of resource activity and network behavior.',
    contributions: [
      'Built cross-account IAM role-based collection and normalization flows.',
      'Processed CloudTrail events and enriched them with geoIP and region metadata.',
      'Analyzed VPC Flow Logs for network reachability and anomaly visibility.',
      'Implemented PostgreSQL storage and interactive Grafana dashboards.',
      'Added Dead Letter Queue handling for failure isolation and recovery.',
    ],
    technologies: ['AWS', 'CloudTrail', 'VPC Flow Logs', 'IAM', 'PostgreSQL', 'Grafana', 'Python'],
    architecture: ['AWS accounts', 'Cross-account collectors', 'CloudTrail + VPC Flow Logs', 'GeoIP + region enrichment', 'PostgreSQL data store', 'Grafana dashboards + alerting'],
    challenges: [
      'Normalizing telemetry from multiple AWS accounts and regions into a common view.',
      'Maintaining observability even when log ingestion paths fail or partial data is delayed.',
      'Mapping network anomalies to operational context for quick investigation.',
    ],
    outcomes: [
      'Created a centralized monitoring workflow across AWS resource activity and traffic data.',
      'Improved cross-account visibility using normalized telemetry and operator dashboards.',
      'Added failure handling to reduce observability blind spots.',
    ],
  },
  {
    slug: 'cloud-attack-path-engine',
    kind: 'cnapp',
    number: '04',
    title: 'Cloud Attack Path Engine (CAPE)',
    status: 'Ongoing',
    period: 'March 2026 – Present',
    category: 'Cloud security · graph analysis',
    overview:
      'A cloud security analysis engine that models infrastructure relationships, validates access, and discovers potential attack paths across AWS resources.',
    problem:
      'Cloud domains become difficult to secure when identities, network reachability, and service relationships are treated as separate datasets instead of a connected graph.',
    contributions: [
      'Built AWS resource discovery and inventory workflows.',
      'Modeled infrastructure relationship graphs spanning IAM, VPC, EC2, S3, RDS, EKS, ECS, and PrivateLink.',
      'Validated network reachability, security groups, NACLs, and trust / permission relationships.',
      'Implemented BFS-based attack path discovery and identity graph analysis.',
      'Extended the platform with investigation workspaces, choke-point detection, and agentless Kubernetes security analysis.',
    ],
    technologies: ['AWS', 'Python', 'PostgreSQL', 'Apache AGE', 'Kubernetes', 'IAM', 'VPC', 'Grafana'],
    architecture: ['AWS inventory', 'Resource relationship graph', 'Network reachability validation', 'IAM + trust analysis', 'Attack path discovery', 'Findings and investigation workspace'],
    challenges: [
      'Connecting identity permissions with network reachability across large and distributed AWS environments.',
      'Keeping path analysis explainable with blast radius, choke points, and remediation context.',
      'Extending the model to agentless Kubernetes and hybrid cloud relationships without losing clarity.',
    ],
    outcomes: [
      'Created a graph-based view of cloud relationships and potential multi-stage attack paths.',
      'Connected access, network, and resource context into explainable findings.',
      'Expanded the analysis to consider Kubernetes and identity-based trust relationships.',
    ],
  },
  {
    slug: 'nethra-endpoint-compliance',
    kind: 'nethra',
    number: '05',
    title: 'Nethra Endpoint Compliance',
    status: 'Ongoing',
    period: '2026 – Present',
    category: 'Endpoint security · compliance',
    overview:
      'A cross-platform endpoint security and compliance platform that monitors devices across Windows, Linux, and macOS and enforces policy compliance.',
    problem:
      'Endpoint posture data was fragmented across operating systems, making it difficult to maintain a consistent compliance view and automate remediation actions.',
    contributions: [
      'Developed native Go agents for Windows, Linux, and macOS.',
      'Implemented secure enrollment, fingerprinting, and tamper detection.',
      'Built policy evaluation for firewalls, disk encryption, antivirus, software inventory, and OS compliance.',
      'Worked on agent updates, rollback workflows, signed release verification, and secure credential storage.',
      'Contributed to RBAC, audit logging, alerting, and reporting retention structures.',
    ],
    technologies: ['Go', 'Windows', 'Linux', 'macOS', 'PostgreSQL', 'RBAC', 'Compliance Automation', 'HTTPS API'],
    architecture: ['Windows · Linux · macOS endpoints', 'Native Go agent + enrollment', 'HTTPS ingestion API', 'Backend processing + PostgreSQL', 'Policy evaluation + reports', 'Admin portal + alerting'],
    challenges: [
      'Supporting cross-platform telemetry with consistent compliance logic across different operating systems.',
      'Securing enrollment and lifecycle processes while maintaining reliable updates and rollback capabilities.',
      'Keeping audit, RBAC, and alerting reliable at fleet scale.',
    ],
    outcomes: [
      'Created a unified endpoint compliance flow across multiple operating systems.',
      'Added lifecycle controls for enrollment, updates, rollback, tamper protection, and release integrity.',
      'Improved visibility across device posture, policy checks, and reporting.',
    ],
  },
  {
    slug: 'nethra-rbac',
    kind: 'nethra-rbac',
    number: '06',
    title: 'Nethra RBAC',
    status: 'Ongoing',
    period: '2026 – Present',
    category: 'Identity and authorization platform',
    overview:
      'A centralized authentication and application authorization platform for the Nethra ecosystem, integrating Microsoft Entra ID with a managed access gateway.',
    problem:
      'Managing access consistently across multiple internal applications was causing fragmented authorization and increased operational overhead.',
    contributions: [
      'Built centralized Nginx-based reverse proxy flows for application access.',
      'Integrated Microsoft Entra ID and synchronized user and group information.',
      'Implemented application-level RBAC with team-based access controls.',
      'Defined admin, viewer, and enrollment technician roles with delegated management.',
      'Connected access auditing and activity tracking across nine applications.',
    ],
    technologies: ['Nginx', 'Microsoft Entra ID', 'RBAC', 'Authentication', 'Reverse Proxy', 'Audit Logs'],
    architecture: ['Microsoft Entra ID', 'Central identity gateway', 'Nginx reverse proxy', 'Application RBAC enforcement', 'Team-based access', 'Cross-application auditing'],
    challenges: [
      'Centralizing identity and access controls without fragmenting role definition across multiple applications.',
      'Managing delegated access and auditing in a multi-application environment.',
      'Keeping authorization consistent while supporting different operational roles.',
    ],
    outcomes: [
      'Created a shared identity and authorization layer for the Nethra ecosystem.',
      'Enabled centralized user, group, and application access management across multiple apps.',
      'Improved access auditing and operational oversight for distributed teams.',
    ],
  },
  {
    slug: 'jedai-monitoring',
    kind: 'jedai',
    number: '07',
    title: 'JEDAI Monitoring',
    status: 'POC / Ongoing',
    period: 'November 2026 – Present',
    category: 'Observability · Docker log collection',
    overview:
      'A monitoring integration between JEDAI and Nethra for centralized application observability and structured log ingestion.',
    problem:
      'Application logs from distributed Docker environments were difficult to classify, redact, and route to a centralized monitoring and alerting system.',
    contributions: [
      'Explored JEDAI architecture and Docker environment discovery.',
      'Built a custom monitoring agent for read-only Docker log collection.',
      'Implemented filtering, severity classification, and sensitive data redaction.',
      'Designed periodic log batching and HTTPS ingestion into the platform.',
      'Connected PostgreSQL storage and Grafana Alloy-based monitoring patterns with alerting workflows.',
    ],
    technologies: ['Docker', 'Python', 'PostgreSQL', 'Grafana Alloy', 'HTTPS API', 'Microsoft Teams', 'Observability'],
    architecture: ['Docker containers', 'Read-only log collection', 'Custom monitoring agent', 'Classification + redaction', 'HTTPS batching', 'PostgreSQL + alerting'],
    challenges: [
      'Collecting logs without depending on a Docker socket for operational safety.',
      'Filtering and redacting sensitive data before it is ingested into platform storage.',
      'Separating warning and error streams from informational noise while preserving high-value context.',
    ],
    outcomes: [
      'Established a monitoring flow from container logs into centralized ingestion and storage.',
      'Added structured classification, redaction, and alert generation patterns.',
      'Positioned the solution for centralized observability and notification workflows.',
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
