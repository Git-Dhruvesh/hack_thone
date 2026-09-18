import { QuizQuestion } from '../types';

export interface TrackTopicSuggestion {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  importance: 'Core Fundamental' | 'High-Yield Interview' | 'Production Essential';
  video: {
    title: string;
    youtubeVideoId: string;
    youtubeChannel: string;
    duration: string;
    videoSummary: string;
    keyConcepts: string[];
  };
  practiceQuestions: QuizQuestion[];
}

export interface EngineeringCareerTrackConfig {
  id: string;
  title: string;
  shortTitle: string;
  iconName: string;
  badge: string;
  themeColor: string;
  textColor: string;
  avgSalary: string;
  marketDemand: 'Very High' | 'High' | 'Moderate';
  courseIds: string[];
  description: string;
  targetSkills: string[];
  suggestedTopics: TrackTopicSuggestion[];
}

export const ENGINEERING_TRACKS_CONFIG: Record<string, EngineeringCareerTrackConfig> = {
  'track-ai-ml': {
    id: 'track-ai-ml',
    title: 'AI & Machine Learning Engineer',
    shortTitle: 'AI & ML',
    iconName: 'atom',
    badge: 'Very High Demand',
    themeColor: 'bg-indigo-600',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    avgSalary: '₹14–45 LPA',
    marketDemand: 'Very High',
    courseIds: ['course-ml-foundations'],
    description: 'Master neural networks, gradient descent calculus, PyTorch tensors, backpropagation mathematics, and production deep learning pipelines.',
    targetSkills: ['Python', 'PyTorch', 'Linear Algebra', 'Calculus', 'Backpropagation', 'Neural Networks'],
    suggestedTopics: [
      {
        id: 'aiml-top-1',
        title: 'Neural Networks & Backpropagation Calculus',
        category: 'Deep Learning Core',
        difficulty: 'Intermediate',
        estimatedMinutes: 35,
        importance: 'Core Fundamental',
        video: {
          title: 'How Backpropagation Actually Works | 3Blue1Brown Series #3',
          youtubeVideoId: 'Ilg3gGewQ5U',
          youtubeChannel: '3Blue1Brown',
          duration: '14 min',
          videoSummary: 'Mathematical derivation of the chain rule in backpropagation, understanding how partial derivatives of the cost function propagate backward through activation layers, weight matrices, and bias vectors.',
          keyConcepts: ['Chain Rule Partial Derivatives', 'Weight Matrix Gradients', 'Activation Derivatives', 'Cost Gradient Vector'],
        },
        practiceQuestions: [
          {
            id: 'aiml-q1',
            question: 'In backpropagation, what fundamental calculus rule is recursively applied to compute partial derivatives of the cost function with respect to weights in early layers?',
            options: [
              'The Chain Rule of Calculus',
              'L\'Hôpital\'s Rule',
              'The Binomial Theorem',
              'Integration by Parts'
            ],
            correctIndex: 0,
            explanation: 'Backpropagation relies entirely on the Chain Rule of calculus to decompose derivatives of composite functions layer by layer from output to input.',
            conceptTag: 'Backpropagation Calculus'
          },
          {
            id: 'aiml-q2',
            question: 'What is the primary role of non-linear activation functions (such as ReLU or Sigmoid) between neural network layers?',
            options: [
              'They reduce the number of matrix multiplications to zero.',
              'They introduce non-linearity, enabling the network to approximate complex non-linear mathematical boundaries instead of collapsing into a single linear transformation.',
              'They automatically normalize input image sizes.',
              'They prevent the model from using GPU memory.'
            ],
            correctIndex: 1,
            explanation: 'Without non-linear activations, composing multiple linear matrix multiplications (W2 * W1 * x) would mathematically collapse into a single linear regression model.',
            conceptTag: 'Activation Functions'
          }
        ]
      },
      {
        id: 'aiml-top-2',
        title: 'Gradient Descent & Loss Surface Optimization',
        category: 'Mathematical Optimization',
        difficulty: 'Intermediate',
        estimatedMinutes: 30,
        importance: 'High-Yield Interview',
        video: {
          title: 'Gradient Descent, How Neural Networks Learn | 3Blue1Brown #2',
          youtubeVideoId: 'IHZwWFHWa-w',
          youtubeChannel: '3Blue1Brown',
          duration: '21 min',
          videoSummary: 'Visualization of the multi-dimensional cost landscape, stepping downhill along the negative gradient vector, selecting learning rates, and avoiding saddle points.',
          keyConcepts: ['Cost Landscape Vector', 'Negative Gradient Stepping', 'Learning Rate Sensitivity', 'Stochastic Gradient Descent (SGD)'],
        },
        practiceQuestions: [
          {
            id: 'aiml-q3',
            question: 'If the learning rate hyperparameter in gradient descent is set excessively large, what failure mode is most likely to occur during training?',
            options: [
              'The model converges to zero error on epoch 1.',
              'The parameters will oscillate wildly and diverge, causing the cost function to explode to infinity (NaN).',
              'The weights will automatically become zero.',
              'The network switches from GPU to CPU execution.'
            ],
            correctIndex: 1,
            explanation: 'An overly large learning rate causes step sizes that overshoot the valley minimum, causing loss oscillations and numerical divergence.',
            conceptTag: 'Gradient Descent Optimization'
          },
          {
            id: 'aiml-q4',
            question: 'Why is Stochastic Gradient Descent (SGD) with mini-batches preferred over Full Batch Gradient Descent when training on large datasets?',
            options: [
              'Mini-batches compute parameter updates much faster and fit easily into GPU memory while providing noise that helps escape saddle points.',
              'SGD requires zero floating point computations.',
              'SGD guarantees finding the global optimum for every non-convex problem.',
              'SGD eliminates the need for backward passes.'
            ],
            correctIndex: 0,
            explanation: 'Computing gradients over a random mini-batch is computationally efficient, fits within VRAM limits, and introduces beneficial stochastic noise that prevents getting stuck in shallow local minima.',
            conceptTag: 'Mini-Batch SGD'
          }
        ]
      }
    ]
  },
  'track-web-dev': {
    id: 'track-web-dev',
    title: 'Web & Full-Stack Software Engineering',
    shortTitle: 'Web Full-Stack',
    iconName: 'book',
    badge: 'Code With Harry',
    themeColor: 'bg-blue-600',
    textColor: 'text-blue-600 dark:text-blue-400',
    avgSalary: '₹8–30 LPA',
    marketDemand: 'Very High',
    courseIds: ['course-react-cwh'],
    description: 'Build fast, interactive full-stack applications with React.js, Virtual DOM reconciliation, TypeScript, React Hooks, Node.js, and modern CSS.',
    targetSkills: ['React.js', 'JavaScript (ES6+)', 'JSX', 'Hooks (useState, useEffect)', 'Virtual DOM', 'Component Architecture'],
    suggestedTopics: [
      {
        id: 'web-top-1',
        title: 'React Single Page Architecture & Virtual DOM Diffing',
        category: 'Frontend Engineering',
        difficulty: 'Beginner',
        estimatedMinutes: 25,
        importance: 'Core Fundamental',
        video: {
          title: 'Introduction to React Js + Setup | Code With Harry #1',
          youtubeVideoId: 'RGKi6LSPDLU',
          youtubeChannel: 'CodeWithHarry',
          duration: '18 min',
          videoSummary: 'Single Page Application (SPA) architecture, why modern tech firms prefer React over traditional server-rendered templates, and how the in-memory Virtual DOM diffing reconciles changes efficiently.',
          keyConcepts: ['Single Page Application (SPA)', 'Virtual DOM Diffing', 'Client-Side Rendering', 'Component Lifecycle'],
        },
        practiceQuestions: [
          {
            id: 'web-q1',
            question: 'What is the primary advantage of React\'s Virtual DOM diffing reconciliation compared to direct real DOM manipulation?',
            options: [
              'It bypasses JavaScript execution completely.',
              'It computes differences in memory and batches minimal DOM updates, avoiding expensive browser layout recalcs and reflows.',
              'It stores all HTML in browser cookies.',
              'It guarantees 100% server uptime.'
            ],
            correctIndex: 1,
            explanation: 'Real DOM manipulations are slow due to browser layout repaints and reflows. React\'s reconciliation diffs virtual representations in memory and applies only the exact delta.',
            conceptTag: 'Virtual DOM & Diffing'
          },
          {
            id: 'web-q2',
            question: 'Why do Single Page Applications (SPAs) feel significantly faster and more responsive to end users than traditional multi-page websites?',
            options: [
              'Because the web browser does not execute any JavaScript.',
              'Because navigation does not require a full page refresh from the server; client-side routers re-render only the affected UI components.',
              'Because SPAs use FTP instead of HTTP.',
              'Because all images are downloaded in black-and-white.'
            ],
            correctIndex: 1,
            explanation: 'SPAs load the initial application bundle once and dynamically re-render content via client-side routing without blank screen refreshes.',
            conceptTag: 'SPA Architecture'
          }
        ]
      },
      {
        id: 'web-top-2',
        title: 'State Management & Event Handling with useState',
        category: 'React Core Hooks',
        difficulty: 'Beginner',
        estimatedMinutes: 30,
        importance: 'Production Essential',
        video: {
          title: 'Understanding React State & useState Hook | Code With Harry #4',
          youtubeVideoId: 'fL8USZ165n0',
          youtubeChannel: 'CodeWithHarry',
          duration: '31 min',
          videoSummary: 'Core difference between Props (immutable) and State (mutable via setter), declaring reactive state with useState, event handling with synthetic events, and controlled form inputs.',
          keyConcepts: ['useState Hook', 'State Immutability', 'SyntheticEvent System', 'Controlled Inputs'],
        },
        practiceQuestions: [
          {
            id: 'web-q3',
            question: 'Why must state in React never be mutated directly (e.g. `state.count = 5`) instead of invoking the updater function `setCount(5)`?',
            options: [
              'Direct mutations do not notify React that state has changed, so the component fails to schedule a re-render.',
              'Direct mutations delete the state variable from computer RAM.',
              'JavaScript will throw a syntax compilation error.',
              'The browser will block the website for security.'
            ],
            correctIndex: 0,
            explanation: 'React tracks state modifications via the hook updater function. Direct mutations bypass this notification mechanism, leaving the UI stale and out of sync.',
            conceptTag: 'React State Immutability'
          }
        ]
      }
    ]
  },
  'track-cloud-systems': {
    id: 'track-cloud-systems',
    title: 'Cloud Architecture & DevOps Engineer',
    shortTitle: 'Cloud & DevOps',
    iconName: 'cpu',
    badge: 'Enterprise',
    themeColor: 'bg-sky-600',
    textColor: 'text-sky-600 dark:text-sky-400',
    avgSalary: '₹12–40 LPA',
    marketDemand: 'Very High',
    courseIds: ['course-cloud-devops'],
    description: 'Architect containerized microservices, build CI/CD pipelines, manage Kubernetes clusters, and master AWS cloud infrastructure.',
    targetSkills: ['Docker', 'Kubernetes', 'AWS', 'Linux Kernel', 'Microservices', 'CI/CD Pipelines'],
    suggestedTopics: [
      {
        id: 'cloud-top-1',
        title: 'Docker Containerization & Linux Kernel Namespaces',
        category: 'Container Architecture',
        difficulty: 'Intermediate',
        estimatedMinutes: 30,
        importance: 'Core Fundamental',
        video: {
          title: 'Docker Containers vs Virtual Machines | TechWorld with Nana',
          youtubeVideoId: 'pg19Z8LLSu4',
          youtubeChannel: 'TechWorld with Nana',
          duration: '22 min',
          videoSummary: 'Comparison between hypervisor VMs and OS-level virtualization. How Docker leverages Linux kernel cgroups (resource limits) and namespaces (process isolation) for instant boot-ups and minimal footprint.',
          keyConcepts: ['Kernel Namespaces', 'Control Groups (cgroups)', 'Layer Caching in Dockerfile', 'Images vs Running Containers'],
        },
        practiceQuestions: [
          {
            id: 'cloud-q1',
            question: 'Which underlying Linux kernel features enable Docker to provide lightweight process isolation and resource constraints without running a guest operating system?',
            options: [
              'Namespaces (for isolation) and Control Groups / cgroups (for resource limiting)',
              'BIOS Hyper-V emulation drivers',
              'FTP directory permissions',
              'Apache HTTP server modules'
            ],
            correctIndex: 0,
            explanation: 'Docker relies on Linux Kernel namespaces (PID, NET, MNT, IPC, UTS) for process isolation and cgroups for throttling CPU, RAM, and disk I/O quotas.',
            conceptTag: 'Container Internals'
          }
        ]
      },
      {
        id: 'cloud-top-2',
        title: 'Kubernetes Pod Scheduling & Deployments',
        category: 'Cluster Orchestration',
        difficulty: 'Advanced',
        estimatedMinutes: 40,
        importance: 'Production Essential',
        video: {
          title: 'Kubernetes Pods, Deployments & Services Architecture | TechWorld with Nana',
          youtubeVideoId: 'X48VuDVv0do',
          youtubeChannel: 'TechWorld with Nana',
          duration: '31 min',
          videoSummary: 'Mastering Kubernetes control plane components (etcd, API server, controller manager, scheduler), worker node Kubelet mechanics, atomic Pod units, and zero-downtime rolling updates.',
          keyConcepts: ['Control Plane & etcd', 'Kubelet & Kube-Proxy', 'ReplicaSets & Rolling Updates', 'ClusterIP & Ingress Services'],
        },
        practiceQuestions: [
          {
            id: 'cloud-q2',
            question: 'What is the atomic, smallest deployable computational unit in a Kubernetes cluster?',
            options: [
              'A Pod (enclosing one or more tightly coupled containers sharing storage and network IP)',
              'A physical motherboard rack blade',
              'A Dockerfile script',
              'A DNS record'
            ],
            correctIndex: 0,
            explanation: 'In Kubernetes, the Pod is the fundamental atomic scheduling unit. Containers within the same Pod share localhost network space and volume mounts.',
            conceptTag: 'Kubernetes Architecture'
          }
        ]
      }
    ]
  },
  'track-dsa': {
    id: 'track-dsa',
    title: 'Computer Science & Algorithms (DSA)',
    shortTitle: 'Algorithms & DSA',
    iconName: 'chart',
    badge: 'FAANG / Tier-1',
    themeColor: 'bg-emerald-600',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    avgSalary: '₹10–35 LPA',
    marketDemand: 'Very High',
    courseIds: ['course-dsa-algorithms'],
    description: 'Master Big-O asymptotic analysis, balanced search trees, graph traversal (BFS/DFS), Dijkstra shortest path, and dynamic programming.',
    targetSkills: ['Big O Analysis', 'Binary Search Trees', 'Graph Traversal (BFS/DFS)', 'Dijkstra', 'Dynamic Programming', 'Recursion'],
    suggestedTopics: [
      {
        id: 'dsa-top-1',
        title: 'Asymptotic Complexity & Big-O Master Analysis',
        category: 'Algorithm Analysis',
        difficulty: 'Beginner',
        estimatedMinutes: 30,
        importance: 'Core Fundamental',
        video: {
          title: 'Asymptotic Analysis, Big-O Notation & Recursion | Abdul Bari',
          youtubeVideoId: '9TlHvipP5yA',
          youtubeChannel: 'Abdul Bari Algorithms',
          duration: '28 min',
          videoSummary: 'Mathematical definitions of Big O (upper bound), Omega (lower bound), and Theta (tight bound). Solving recurrence relations using recursion trees and the Master Theorem.',
          keyConcepts: ['Asymptotic Complexity Bounds', 'Recurrence Trees', 'Master Theorem Cases', 'Space-Time Tradeoffs'],
        },
        practiceQuestions: [
          {
            id: 'dsa-q1',
            question: 'What is the tight worst-case time complexity of standard Binary Search on a sorted array of N elements?',
            options: [
              'O(log N)',
              'O(N)',
              'O(1)',
              'O(N log N)'
            ],
            correctIndex: 0,
            explanation: 'Binary Search cuts the search space in half at each step (N, N/2, N/4 ... 1), which requires log2(N) iterations, yielding O(log N).',
            conceptTag: 'Time Complexity'
          }
        ]
      },
      {
        id: 'dsa-top-2',
        title: 'Graph Traversal (BFS vs DFS) & Shortest Path',
        category: 'Graph Algorithms',
        difficulty: 'Intermediate',
        estimatedMinutes: 40,
        importance: 'High-Yield Interview',
        video: {
          title: 'Graph Traversals (BFS vs DFS) and Shortest Path (Dijkstra) | Abdul Bari',
          youtubeVideoId: 'pcKY4hjDrxk',
          youtubeChannel: 'Abdul Bari Algorithms',
          duration: '38 min',
          videoSummary: 'Adjacency list vs matrix representations, breadth-first search queue mechanics, depth-first stack recursion, and priority queue Dijkstra for single-source shortest paths on weighted graphs.',
          keyConcepts: ['Adjacency Lists', 'BFS Queue Traversal', 'DFS Stack Recursion', 'Dijkstra Priority Queue'],
        },
        practiceQuestions: [
          {
            id: 'dsa-q2',
            question: 'Which fundamental data structure is required to implement Breadth-First Search (BFS) level-order traversal on an unweighted graph?',
            options: [
              'A First-In-First-Out (FIFO) Queue',
              'A Last-In-First-Out (LIFO) Stack',
              'A Max Heap only',
              'A Hash Map with floating point keys'
            ],
            correctIndex: 0,
            explanation: 'BFS explores vertices layer by layer in order of distance from the source, which requires a FIFO Queue to ensure closest nodes are visited first.',
            conceptTag: 'Graph Search'
          }
        ]
      }
    ]
  },
  'track-data-science': {
    id: 'track-data-science',
    title: 'Data Science & Big Data Analytics',
    shortTitle: 'Data Science',
    iconName: 'database',
    badge: 'Analytics',
    themeColor: 'bg-amber-600',
    textColor: 'text-amber-600 dark:text-amber-400',
    avgSalary: '₹10–32 LPA',
    marketDemand: 'High',
    courseIds: ['course-data-science'],
    description: 'Extract statistical insights, wrangle data with Pandas & NumPy, perform SQL relational analysis, and build predictive econometric models.',
    targetSkills: ['Python', 'Pandas', 'SQL', 'Statistics', 'Predictive Modeling', 'Feature Engineering'],
    suggestedTopics: [
      {
        id: 'ds-top-1',
        title: 'Exploratory Data Analysis with Pandas & SIMD Vectorization',
        category: 'Data Wrangling',
        difficulty: 'Intermediate',
        estimatedMinutes: 30,
        importance: 'Core Fundamental',
        video: {
          title: 'Exploratory Data Analysis with Pandas & Data Cleaning | Keith Galli',
          youtubeVideoId: 'vmEHCJofslg',
          youtubeChannel: 'Keith Galli Data Science',
          duration: '25 min',
          videoSummary: 'High-performance data manipulation in Pandas: vectorised aggregations, handling missing data via imputation strategies, groupby splits, and multi-index transformations.',
          keyConcepts: ['Vectorized Array Calculations', 'Missing Value Imputation', 'GroupBy Aggregations', 'Data Normalization'],
        },
        practiceQuestions: [
          {
            id: 'ds-q1',
            question: 'Why are vectorized array operations in Pandas significantly faster than iterating over DataFrame rows with a standard Python `for` loop?',
            options: [
              'Vectorized operations are executed in pre-compiled low-level C code via NumPy that leverages CPU SIMD vector instructions.',
              'Pandas runs loops in the cloud database.',
              'Python for-loops delete array indices.',
              'Vectorized operations skip arithmetic verification.'
            ],
            correctIndex: 0,
            explanation: 'Pandas operates on contiguous C arrays under the hood, running optimized native instructions (SIMD) rather than high-overhead Python bytecode iterations.',
            conceptTag: 'Data Vectorization'
          }
        ]
      }
    ]
  },
  'track-cybersecurity': {
    id: 'track-cybersecurity',
    title: 'Cybersecurity & Secure Systems Engineer',
    shortTitle: 'Cybersecurity',
    iconName: 'shield',
    badge: 'Critical Defense',
    themeColor: 'bg-purple-600',
    textColor: 'text-purple-600 dark:text-purple-400',
    avgSalary: '₹12–38 LPA',
    marketDemand: 'Very High',
    courseIds: ['course-cybersecurity'],
    description: 'Defend distributed systems, conduct packet analysis with Wireshark, secure TCP/IP handshakes, and implement cryptographic protocols.',
    targetSkills: ['Network Protocols', 'Wireshark', 'Cryptography', 'Penetration Testing', 'Firewall Rules'],
    suggestedTopics: [
      {
        id: 'sec-top-1',
        title: 'TCP 3-Way Handshake & Wireshark Packet Inspection',
        category: 'Network Security',
        difficulty: 'Intermediate',
        estimatedMinutes: 35,
        importance: 'Core Fundamental',
        video: {
          title: 'Network Security, TCP Handshake & Wireshark Packet Inspection | NetworkChuck',
          youtubeVideoId: 'qA6sopx3Rvg',
          youtubeChannel: 'NetworkChuck',
          duration: '27 min',
          videoSummary: 'Dissecting the 3-way TCP SYN, SYN-ACK, ACK connection protocol, analyzing real packet streams in Wireshark, and diagnosing SYN flood denial-of-service attacks.',
          keyConcepts: ['TCP 3-Way Handshake', 'Wireshark Packet Dissection', 'SYN Flood Mitigation', 'Firewall Filtering'],
        },
        practiceQuestions: [
          {
            id: 'sec-q1',
            question: 'What is the primary role of the SYN-ACK packet in a standard TCP 3-way handshake?',
            options: [
              'The server acknowledges the client\'s sequence number (ACK) and synchronizes its own initial sequence number (SYN).',
              'The server immediately disconnects the user for security.',
              'The server encrypts all client passwords with AES.',
              'The client disconnects from the router.'
            ],
            correctIndex: 0,
            explanation: 'In the TCP 3-way handshake (SYN -> SYN-ACK -> ACK), the server sends SYN-ACK to acknowledge receipt of the client SYN and establish its own sequence number for reliable bidirectional transmission.',
            conceptTag: 'TCP Security'
          }
        ]
      }
    ]
  }
};
