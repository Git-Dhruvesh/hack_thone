import { StudentProfile, Course, CareerTrack, ScheduleItem, QuizQuestion } from '../types';

export const INITIAL_STUDENT: StudentProfile = {
  id: 'stu-2026',
  name: 'Devendra Parmar',
  email: 'devendra.engg@university.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  university: 'Institute of Engineering & Technology',
  degree: 'B.Tech in Computer Engineering & AI',
  targetCareer: 'AI & Machine Learning Engineer',
  learningPaceHours: 12,
  totalScore: 1028,
  completedCoursesCount: 14,
  currentStreakDays: 9,
  skills: [
    { id: 'sk-1', name: 'Python & Scientific Computing', category: 'Programming', currentLevel: 85, targetLevel: 95, priority: 'Medium', lastPracticed: 'Today' },
    { id: 'sk-2', name: 'PyTorch & Deep Learning', category: 'AI/ML', currentLevel: 55, targetLevel: 90, priority: 'High', lastPracticed: 'Yesterday' },
    { id: 'sk-3', name: 'Data Structures & Algorithms', category: 'CS Core', currentLevel: 78, targetLevel: 90, priority: 'Medium', lastPracticed: '3 days ago' },
    { id: 'sk-4', name: 'Docker & MLOps Pipelines', category: 'Systems', currentLevel: 40, targetLevel: 80, priority: 'Urgent', lastPracticed: '1 week ago' },
    { id: 'sk-5', name: 'Linear Algebra & Probability', category: 'Mathematics', currentLevel: 68, targetLevel: 85, priority: 'High', lastPracticed: '2 days ago' },
    { id: 'sk-6', name: 'Full-Stack System Design', category: 'Architecture', currentLevel: 62, targetLevel: 85, priority: 'Medium', lastPracticed: '4 days ago' },
  ],
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-react-cwh',
    title: 'Complete React JS Masterclass (Code With Harry)',
    category: 'Web & Full Stack',
    duration: '45 HOURS',
    hoursCount: 45,
    level: 'Beginner',
    rating: 4.98,
    reviewCount: 9420,
    studentsCount: '184,000',
    description: 'Learn modern React.js step-by-step with Code With Harry. Covers React fundamentals, Virtual DOM, JSX, Components, Props & PropTypes, State with useState, and lifecycle hooks with practical projects.',
    instructor: 'Haris Khan (Code With Harry)',
    icon: 'atom',
    themeColor: '#0ea5e9',
    matchPercentage: 98,
    recommendationReason: 'Requested by user: Code With Harry React Playlist with topic assessments',
    isEnrolled: true,
    progressPercentage: 40,
    tags: ['React.js', 'JavaScript', 'JSX', 'Hooks', 'Virtual DOM', 'Code With Harry'],
    syllabus: [
      {
        id: 'cwh-r1',
        title: 'Lesson #1: Introduction to React Js + Setup | Code With Harry #1',
        duration: '18 min',
        completed: true,
        type: 'video',
        youtubeVideoId: 'RGKi6LSPDLU',
        youtubeChannel: 'CodeWithHarry',
        videoSummary: 'Introduction to why React was built by Facebook, Single Page Applications (SPA), client-side rendering vs server-side rendering, and node/npm initialization.',
        keyConcepts: ['Single Page Application', 'Virtual DOM', 'Component Architecture', 'Node & NPM Environment'],
        questions: [
          {
            id: 'cwh-q1-1',
            question: 'According to Code With Harry, what is the primary advantage of React as a Single Page Application (SPA) library?',
            options: [
              'It reloads the entire HTML document from the server on every link click.',
              'It dynamically rewrites the current web page without reloading the entire page, providing a fast app-like experience.',
              'It replaces the JavaScript runtime in modern browsers with a compiled binary.',
              'It requires no JavaScript knowledge to build production apps.'
            ],
            correctIndex: 1,
            explanation: 'React renders Single Page Applications (SPAs) where only the updated components re-render in the browser, eliminating full page refreshes.',
            conceptTag: 'React SPA Fundamentals'
          },
          {
            id: 'cwh-q1-2',
            question: 'How does React optimize UI updates using the Virtual DOM?',
            options: [
              'By directly modifying each browser DOM element synchronously.',
              'By comparing a lightweight virtual copy against the previous state (diffing algorithm) and batch-updating only changed nodes.',
              'By bypassing the browser DOM entirely and drawing on a HTML5 Canvas element.',
              'By sending server requests to compute DOM changes on a remote database.'
            ],
            correctIndex: 1,
            explanation: 'React maintains a Virtual DOM in memory, calculates differences via the reconciliation/diffing algorithm, and applies minimal real DOM mutations.',
            conceptTag: 'Virtual DOM & Diffing'
          },
          {
            id: 'cwh-q1-3',
            question: 'Which tool does Code With Harry recommend in the series for bundling and scaffolding modern React applications quickly?',
            options: [
              'Webpack with manual configuration from scratch',
              'Vite or Create React App (CRA) via npm/npx',
              'Internet Explorer Active Scripting Engine',
              'Apache Ant'
            ],
            correctIndex: 1,
            explanation: 'Modern React ecosystems leverage npm/npx tooling such as Vite or CRA to automate transpilation, JSX parsing, and hot reloads.',
            conceptTag: 'React Tooling'
          }
        ]
      },
      {
        id: 'cwh-r2',
        title: 'Lesson #2: Understanding JSX and Components in React | Code With Harry #2',
        duration: '22 min',
        completed: false,
        type: 'video',
        youtubeVideoId: '-mJFZp84TIY',
        youtubeChannel: 'CodeWithHarry',
        videoSummary: 'Deep dive into JSX (JavaScript XML), writing HTML inside JavaScript, why className is used instead of class, and creating functional reusable components.',
        keyConcepts: ['JSX Syntax', 'Functional Components', 'className vs class', 'React Fragments <> </>'],
        questions: [
          {
            id: 'cwh-q2-1',
            question: 'Why must we write "className" instead of "class" when styling elements in JSX?',
            options: [
              '"class" is a reserved keyword in JavaScript for defining classes.',
              'HTML standards strictly deprecated the "class" attribute in HTML5.',
              'React only supports CSS inline styling objects.',
              '"className" allows faster GPU memory caching in V8 engine.'
            ],
            correctIndex: 0,
            explanation: 'Because JSX is syntactic sugar transformed into JavaScript function calls (React.createElement), "class" is reserved in JS, so React uses "className".',
            conceptTag: 'JSX Attributes'
          },
          {
            id: 'cwh-q2-2',
            question: 'Why must adjacent JSX elements be wrapped in a single parent container or React Fragment (<>...</>)?',
            options: [
              'Browsers cannot parse more than one tag simultaneously.',
              'A JavaScript function can only return a single expression / object.',
              'Fragments increase web page loading speeds by 50%.',
              'React throws a database compilation error otherwise.'
            ],
            correctIndex: 1,
            explanation: 'Every React component is a JavaScript function that evaluates to a return statement. In JavaScript, a function cannot return multiple separate values without an enclosing container.',
            conceptTag: 'React Fragments'
          },
          {
            id: 'cwh-q2-3',
            question: 'How do you embed a dynamic JavaScript variable or expression inside JSX markup?',
            options: [
              'Inside percentage tags: <% myVariable %>',
              'Inside double quotes: "myVariable"',
              'Inside single curly braces: {myVariable}',
              'Inside parentheses: (myVariable)'
            ],
            correctIndex: 2,
            explanation: 'In JSX, any valid JavaScript expression can be evaluated by wrapping it in curly braces { expression }.',
            conceptTag: 'JSX Expressions'
          }
        ]
      },
      {
        id: 'cwh-r3',
        title: 'Lesson #3: Props and PropTypes in React | Code With Harry #3',
        duration: '26 min',
        completed: false,
        type: 'video',
        youtubeVideoId: 'tSbS8h_Z-G4',
        youtubeChannel: 'CodeWithHarry',
        videoSummary: 'Mastering React Props for unidirectional data flow from parent to child components, setting defaultProps, and type-checking with PropTypes.',
        keyConcepts: ['Props Unidirectional Flow', 'PropTypes Validation', 'defaultProps', 'Component Reusability'],
        questions: [
          {
            id: 'cwh-q3-1',
            question: 'What is the nature of "props" passed into a React child component?',
            options: [
              'Props are mutable and child components can directly overwrite their values.',
              'Props are read-only (immutable); a child component must never mutate its own props.',
              'Props are saved to local database storage automatically.',
              'Props can only contain strings and numbers, never functions or objects.'
            ],
            correctIndex: 1,
            explanation: 'React adheres to pure functional principles: components must act like pure functions with respect to their props (read-only).',
            conceptTag: 'Props Immutability'
          },
          {
            id: 'cwh-q3-2',
            question: 'What happens if a required PropType (`PropTypes.string.isRequired`) is not passed to a component?',
            options: [
              'The browser immediately throws a fatal blue screen error.',
              'React emits a warning in the browser console during development.',
              'The component automatically crashes the server process.',
              'Nothing happens; PropTypes are completely ignored.'
            ],
            correctIndex: 1,
            explanation: 'PropTypes provide development-time type checking and log informative warning messages in the developer console when mismatches occur.',
            conceptTag: 'PropTypes Validation'
          }
        ]
      },
      {
        id: 'cwh-r4',
        title: 'Lesson #4: State & Handling Events (useState Hook) | Code With Harry #4',
        duration: '31 min',
        completed: false,
        type: 'video',
        youtubeVideoId: 'fL8USZ165n0',
        youtubeChannel: 'CodeWithHarry',
        videoSummary: 'Understanding React State vs Props, using the useState hook, handling onChange and onClick events, and updating UI reactively.',
        keyConcepts: ['useState Hook', 'State Immutability', 'Event Handling', 'Controlled Inputs'],
        questions: [
          {
            id: 'cwh-q4-1',
            question: 'Why can we not simply do `text = "new value"` to update React state instead of using `setText("new value")`?',
            options: [
              'Direct mutation does not trigger React\'s re-render cycle, leaving the UI stale.',
              'JavaScript syntax prohibits assigning values to variables in functions.',
              'Direct mutation causes memory leaks in the browser cache.',
              'React will delete the component file from disk.'
            ],
            correctIndex: 0,
            explanation: 'React relies on setter functions from hooks like useState to know when state has changed so it can schedule a re-render and synchronize the DOM.',
            conceptTag: 'React State & Re-render'
          },
          {
            id: 'cwh-q4-2',
            question: 'What does the `useState` hook return when called in a functional component?',
            options: [
              'A single DOM node element',
              'An array with exactly two elements: the current state value and a state updater function',
              'A Promise that resolves after the component mounts',
              'An object containing all CSS style rules'
            ],
            correctIndex: 1,
            explanation: 'const [state, setState] = useState(initialValue); returns a 2-element tuple: current value and updater function.',
            conceptTag: 'useState Structure'
          }
        ]
      }
    ],
  },
  {
    id: 'course-ml-foundations',
    title: 'Machine Learning & Neural Networks (3Blue1Brown Series)',
    category: 'Artificial Intelligence',
    duration: '99 HOURS',
    hoursCount: 99,
    level: 'Intermediate',
    rating: 4.96,
    reviewCount: 14200,
    studentsCount: '98,800',
    description: 'Master neural networks and deep learning with intuitive visual mathematics: neuron activations, weights & biases, gradient descent landscapes, and backpropagation derivatives.',
    instructor: 'Grant Sanderson (3Blue1Brown)',
    icon: 'atom',
    themeColor: '#6366f1',
    matchPercentage: 96,
    recommendationReason: 'Requested subject suggestion: Visual Neural Network mastery',
    isEnrolled: true,
    progressPercentage: 68,
    tags: ['Neural Networks', 'Deep Learning', 'Calculus', 'Linear Algebra', '3Blue1Brown'],
    syllabus: [
      {
        id: 'ml-3b1',
        title: 'Lesson #1: But what is a neural network? | Deep learning, chapter 1',
        duration: '19 min',
        completed: true,
        type: 'video',
        youtubeVideoId: 'aircAruvnKk',
        youtubeChannel: '3Blue1Brown',
        videoSummary: 'Visual breakdown of artificial neural networks, multilayer perceptrons, activations between 0 and 1, weights, biases, and sigmoid/ReLU functions using handwritten digit recognition.',
        keyConcepts: ['Neuron Activations', 'Weights Matrix', 'Bias Threshold', 'Activation Functions'],
        questions: [
          {
            id: 'ml-q1-1',
            question: 'In 3Blue1Brown\'s neural network representation, what does a single "neuron" hold?',
            options: [
              'A complete database table of all training samples',
              'A single number (activation value), typically between 0 and 1',
              'A GPU shader program',
              'A Python script that executes asynchronously'
            ],
            correctIndex: 1,
            explanation: 'In artificial neural networks, a neuron is fundamentally a mathematical container holding an activation number representing feature presence.',
            conceptTag: 'Neuron Concept'
          },
          {
            id: 'ml-q1-2',
            question: 'Why do neural networks apply non-linear activation functions (such as Sigmoid or ReLU) after weighted sums?',
            options: [
              'Without non-linearity, multiple linear layers collapse mathematically into a single linear transformation.',
              'Non-linear functions reduce the electricity consumption of GPUs.',
              'To randomize the neural weights after each forward pass.',
              'Because linear math cannot be calculated on computers.'
            ],
            correctIndex: 0,
            explanation: 'The composition of linear functions is always linear. Non-linear activations allow deep neural networks to approximate arbitrarily complex non-linear functions.',
            conceptTag: 'Non-linear Activation'
          }
        ]
      },
      {
        id: 'ml-3b2',
        title: 'Lesson #2: Gradient descent, how neural networks learn | Deep learning, chapter 2',
        duration: '21 min',
        completed: false,
        type: 'video',
        youtubeVideoId: 'IHZwWFHWa-w',
        youtubeChannel: '3Blue1Brown',
        videoSummary: 'Exploring cost / loss functions, high-dimensional parameter spaces, and taking steps downhill along the negative gradient vector to minimize prediction error.',
        keyConcepts: ['Cost Function', 'Negative Gradient Vector', 'Learning Rate', 'Local vs Global Minima'],
        questions: [
          {
            id: 'ml-q2-1',
            question: 'In gradient descent, in which direction does the negative gradient vector (-∇C) point?',
            options: [
              'In the direction of steepest ascent (increasing loss)',
              'In the direction of steepest descent (fastest decrease in cost/loss)',
              'Orthogonal to all weight updates',
              'Directly towards the origin coordinates (0,0)'
            ],
            correctIndex: 1,
            explanation: 'The gradient points uphill in the direction of steepest ascent; therefore, moving in the direction of the negative gradient takes the steepest downhill step to minimize error.',
            conceptTag: 'Gradient Descent Direction'
          }
        ]
      }
    ],
  },
  {
    id: 'course-dsa',
    title: 'Data Structures & Algorithms (Code With Harry / Abdul Bari)',
    category: 'Computer Science',
    duration: '48 HOURS',
    hoursCount: 48,
    level: 'All Levels',
    rating: 4.91,
    reviewCount: 8120,
    studentsCount: '62,900',
    description: 'Learn asymptotic analysis (Big O, Omega, Theta), Arrays, Linked Lists, Stacks, Queues, Binary Search Trees, and Graph algorithms with clear conceptual proofs.',
    instructor: 'Code With Harry & Abdul Bari',
    icon: 'book',
    themeColor: '#10b981',
    matchPercentage: 90,
    recommendationReason: 'Requested subject suggestion: Foundational Computer Science Algorithms',
    isEnrolled: true,
    progressPercentage: 85,
    tags: ['Algorithms', 'Data Structures', 'Big O', 'Recursion', 'Graphs'],
    syllabus: [
      {
        id: 'dsa-cwh1',
        title: 'Lesson #1: Introduction to Data Structures & Algorithms | Code With Harry',
        duration: '14 min',
        completed: true,
        type: 'video',
        youtubeVideoId: '5_5oE5lgrhw',
        youtubeChannel: 'CodeWithHarry',
        videoSummary: 'Overview of why data structures matter in real-world software, time vs space tradeoffs, and memory layout for primitive and derived types.',
        keyConcepts: ['Time Complexity', 'Space Complexity', 'Memory Efficiency', 'Linear vs Non-linear'],
        questions: [
          {
            id: 'dsa-q1-1',
            question: 'What is Big-O notation primarily used to represent in algorithm analysis?',
            options: [
              'The exact execution time in milliseconds on a specific laptop',
              'The upper bound (worst-case growth rate) of time or memory as input size n approaches infinity',
              'The total number of lines of code written in the program',
              'The compiler version used to build the software'
            ],
            correctIndex: 1,
            explanation: 'Big-O notation describes asymptotic upper bounds independent of specific hardware clock speeds.',
            conceptTag: 'Asymptotic Analysis'
          }
        ]
      }
    ],
  },
  {
    id: 'course-cloud-mlops',
    title: 'Docker & Containerization for Engineers (Code With Harry)',
    category: 'Cloud & Systems',
    duration: '42 HOURS',
    hoursCount: 42,
    level: 'Intermediate',
    rating: 4.88,
    reviewCount: 3890,
    studentsCount: '34,400',
    description: 'Containerize web apps and AI endpoints using Docker: images, containers, Dockerfiles, volume mounting, port forwarding, and multi-container deployment.',
    instructor: 'Code With Harry',
    icon: 'bag',
    themeColor: '#f59e0b',
    matchPercentage: 93,
    recommendationReason: 'Requested subject suggestion: Production Containerization',
    isEnrolled: false,
    progressPercentage: 10,
    tags: ['Docker', 'Containers', 'DevOps', 'Dockerfile', 'Code With Harry'],
    syllabus: [
      {
        id: 'docker-cwh1',
        title: 'Lesson #1: Docker Tutorial for Beginners in Hindi | Code With Harry',
        duration: '48 min',
        completed: false,
        type: 'video',
        youtubeVideoId: '17Bl31r87mU',
        youtubeChannel: 'CodeWithHarry',
        videoSummary: 'Complete guide explaining Docker containers vs virtual machines, Docker Hub, pulling images, running containers with -p port mapping, and writing Dockerfiles.',
        keyConcepts: ['Containers vs VMs', 'Docker Images', 'Port Forwarding', 'Dockerfile Directives'],
        questions: [
          {
            id: 'docker-q1-1',
            question: 'Why are Docker containers significantly lighter and faster than traditional Virtual Machines (VMs)?',
            options: [
              'Containers share the host operating system kernel rather than running a full guest OS with hypervisor emulation.',
              'Containers do not use any memory or CPU from the host machine.',
              'Containers can only run pure HTML files.',
              'Containers delete all files whenever the computer restarts.'
            ],
            correctIndex: 0,
            explanation: 'Containers share the host kernel and isolate processes using Linux namespaces and cgroups, avoiding the heavy overhead of hypervisors and full guest OS kernels.',
            conceptTag: 'Container Architecture'
          }
        ]
      }
    ],
  },
  {
    id: 'course-ui-ux-design',
    title: 'UI/UX Design & Product Systems in Figma',
    category: 'Design & Product',
    duration: '38 HOURS',
    hoursCount: 38,
    level: 'Beginner',
    rating: 4.96,
    reviewCount: 7850,
    studentsCount: '142,000',
    description: 'Learn UI/UX design from scratch: user research, wireframing, high-fidelity prototypes in Figma, design systems, usability testing, and Android baseline (360×800) design for Indian tech products paying ₹4–35 LPA.',
    instructor: 'DesignLab & NASSCOM UX Academy',
    icon: 'figma',
    themeColor: '#ec4899',
    matchPercentage: 96,
    recommendationReason: 'Job-ready for UI Designer, UX Designer, and Product Designer roles paying ₹4–35 LPA',
    isEnrolled: true,
    progressPercentage: 25,
    tags: ['UI/UX', 'Figma', 'Wireframing', 'Design Systems', 'Usability Testing', 'Typography', 'Android 360x800'],
    syllabus: [
      {
        id: 'uiux-m1',
        title: 'Lesson #1: What is UI/UX Design & Finding Frustrations in Daily Apps',
        duration: '22 min',
        completed: true,
        type: 'video',
        youtubeVideoId: 'c9Wg6Cb_YlU',
        youtubeChannel: 'Figma / UX Design Hub',
        videoSummary: 'Introduction to observation habits, empathy, why CSE students have an advantage, and how to analyze 5 daily apps to discover design problems.',
        keyConcepts: ['UX vs UI', 'Observation Habit', 'User Empathy', 'Pain Point Discovery'],
        questions: [
          {
            id: 'uiux-q1',
            question: 'What is the fundamental difference between UX (User Experience) and UI (User Interface) design?',
            options: [
              'UX focuses on the user journey, problem-solving, and usability, while UI focuses on typography, colors, layout, and visual aesthetic.',
              'UX is written in Python while UI is written in C++.',
              'UX is only for iPhone while UI is only for Android.',
              'There is no difference; they are synonymous marketing terms.'
            ],
            correctIndex: 0,
            explanation: 'UX design addresses how the product works and feels to solve user problems, whereas UI design focuses on the visual touchpoints, controls, and presentation.',
            conceptTag: 'UI/UX Fundamentals'
          }
        ]
      },
      {
        id: 'uiux-m2',
        title: 'Lesson #2: Figma Visual Fundamentals & Android 360×800 Baseline Design',
        duration: '32 min',
        completed: false,
        type: 'video',
        youtubeVideoId: 'FTFaQWZBqQ8',
        youtubeChannel: 'Figma',
        videoSummary: 'Hands-on Figma setup, frames, auto-layout, typography hierarchy, line heights, and why 75% of Indian smartphone users require designing at 360×800 baseline.',
        keyConcepts: ['Figma Auto-Layout', 'Android 360×800', 'Typography Hierarchy', 'Spacing Scale'],
        questions: [
          {
            id: 'uiux-q2',
            question: 'Why is it critical for designers targeting the Indian market to test and design at 360×800 baseline resolution?',
            options: [
              'Over 75% of Indian smartphone users operate budget and mid-tier Android devices with 360×800 screen baselines.',
              'Apple App Store requires 360×800 screenshots for approval.',
              'It is impossible to create vector shapes on larger screens.',
              'Figma only runs on 360×800 displays.'
            ],
            correctIndex: 0,
            explanation: 'Designing exclusively for flagship iPhones causes clipping and poor usability on Indian Android devices; 360×800 is the standard Android viewport baseline.',
            conceptTag: 'Responsive Mobile UX'
          }
        ]
      },
      {
        id: 'uiux-m3',
        title: 'Lesson #3: Design Systems, Components & Usability Testing',
        duration: '28 min',
        completed: false,
        type: 'video',
        youtubeVideoId: 'e2bV81yF70g',
        youtubeChannel: 'Google Design',
        videoSummary: 'Building reusable component tokens, variants, interactive prototypes, and running usability tests with real users to invalidate faulty assumptions.',
        keyConcepts: ['Design Tokens', 'Figma Variants', 'Usability Testing', 'Interactive Prototyping'],
        questions: [
          {
            id: 'uiux-q3',
            question: 'Why is usability testing with as few as 5 real users considered indispensable in UX design?',
            options: [
              'Assumptions about user behavior are frequently wrong; testing 5 users reveals ~85% of critical usability issues that self-review misses.',
              'Legal regulations require 5 signatures before deploying a web app.',
              'Figma will not export CSS without 5 test recordings.',
              'Google UX Certificate demands exactly 5 tests to grant credit.'
            ],
            correctIndex: 0,
            explanation: 'Jakob Nielsen’s empirical usability research shows that testing with 5 users uncovers the vast majority of usability roadblocks.',
            conceptTag: 'Usability Testing'
          }
        ]
      }
    ]
  },
  {
    id: 'course-doctor-clinical-foundations',
    title: 'Clinical Medical Science: Gynecology, Cardiology & Dermatology',
    category: 'Doctor & Medicine',
    duration: '54 HOURS',
    hoursCount: 54,
    level: 'Advanced',
    rating: 4.99,
    reviewCount: 11200,
    studentsCount: '98,000',
    description: 'Comprehensive medical science masterclass covering Gynecology & Obstetrics prenatal care, Child Psychology trauma assessment, Clinical Dermatology diagnosis, and Cardiology circulatory defect testing.',
    instructor: 'AIIMS & Royal College Faculty',
    icon: 'heart-pulse',
    themeColor: '#ef4444',
    matchPercentage: 97,
    recommendationReason: 'Core clinical training for Gynecologist, Cardiologist, Dermatologist, and Child Psychiatrist tracks',
    isEnrolled: true,
    progressPercentage: 15,
    tags: ['Medicine', 'Gynecology', 'Cardiology', 'Dermatology', 'Child Psychiatry', 'Clinical Diagnostics'],
    syllabus: [
      {
        id: 'med-gyn-1',
        title: 'Lesson #1: Gynecology & Obstetrics: Prenatal Care, Labor & Hormonal Health',
        duration: '26 min',
        completed: false,
        type: 'video',
        youtubeVideoId: 'U8P64sA3gHw',
        youtubeChannel: 'Armando Hasudungan Medical',
        videoSummary: 'Overview of female reproductive anatomy, menstrual cycle regulation, maternal-fetal development milestones, ultrasound indicators, and labor stages.',
        keyConcepts: ['Maternal Fetal Medicine', 'Prenatal Screening', 'Obstetrics Labor Stages', 'Hormonal Cycles'],
        questions: [
          {
            id: 'gyn-q1',
            question: 'What is the primary diagnostic indicator evaluated in first-trimester antenatal screening to check fetal chromosomal and cardiovascular health?',
            options: [
              'Nuchal Translucency (NT) scan combined with maternal serum biochemical markers (PAPP-A & free beta-hCG).',
              'Blood typing only.',
              'Random capillary glucose test.',
              'Bone marrow biopsy.'
            ],
            correctIndex: 0,
            explanation: 'Nuchal Translucency ultrasound measurement paired with maternal serum PAPP-A and beta-hCG is the validated protocol for first-trimester aneuploidy and congenital defect risk screening.',
            conceptTag: 'Obstetrics & Prenatal Screening'
          }
        ]
      },
      {
        id: 'med-cardio-2',
        title: 'Lesson #2: Cardiology: ECG Interpretation, Artery Disease & Heart Failure Diagnostics',
        duration: '34 min',
        completed: false,
        type: 'video',
        youtubeVideoId: '3U2kX_uY34Q',
        youtubeChannel: 'Ninja Nerd Medicine',
        videoSummary: 'Systematic 12-lead ECG reading, cardiac cycle mechanics, diagnosing acute myocardial infarctions, heart failure classifications (NYHA), and coronary angiography.',
        keyConcepts: ['12-Lead ECG Analysis', 'Coronary Artery Disease', 'Heart Failure (HFpEF vs HFrEF)', 'Angiography'],
        questions: [
          {
            id: 'cardio-q1',
            question: 'In an acute STEMI (ST-Elevation Myocardial Infarction), what does a persistent ST segment elevation in leads V1 to V4 typically indicate?',
            options: [
              'Acute occlusion of the Left Anterior Descending (LAD) coronary artery affecting the anterior myocardium.',
              'Mild muscular fatigue of the diaphragm.',
              'Normal athletic bradycardia.',
              'Right coronary artery spasm only.'
            ],
            correctIndex: 0,
            explanation: 'Leads V1-V4 record electrical potentials from the anterior cardiac wall and septum, typically perfused by the LAD artery.',
            conceptTag: 'Clinical Cardiology & ECG'
          }
        ]
      },
      {
        id: 'med-derma-3',
        title: 'Lesson #3: Dermatology: Lesion Morphology, Dermatosurgery & Skin Barrier Diseases',
        duration: '24 min',
        completed: false,
        type: 'video',
        youtubeVideoId: 'YQ9z1aTq0bM',
        youtubeChannel: 'Dr. John Campbell / MedEd',
        videoSummary: 'Primary and secondary skin lesions, dermoscopy rules for melanoma screening, nail and scalp pathologies, and medical dermatology therapeutic plans.',
        keyConcepts: ['Primary Lesion Morphology', 'Dermoscopy ABCDE Criteria', 'Skin Barrier Pathology', 'Psoriasis vs Eczema'],
        questions: [
          {
            id: 'derma-q1',
            question: 'Which dermoscopic feature according to the ABCDE rule is the strongest indicator warranting biopsy for suspected cutaneous melanoma?',
            options: [
              'Asymmetry, irregular borders, multiple color variegations, diameter >6mm, and lesion evolution/change.',
              'A completely round, uniform light brown macule that has remained unchanged for 10 years.',
              'A superficial scratch with mild erythema.',
              'Any mole that appears after sun exposure.'
            ],
            correctIndex: 0,
            explanation: 'The clinical ABCDE criteria (Asymmetry, Border irregularity, Color variegation, Diameter >6mm, Evolving features) are the gold standard for recognizing malignant melanocytic lesions.',
            conceptTag: 'Clinical Dermatology'
          }
        ]
      }
    ]
  },
  {
    id: 'course-cloud-devops',
    title: 'Cloud Architecture & DevOps: Docker, Kubernetes & AWS',
    category: 'Engineering & Tech',
    duration: '48 HOURS',
    hoursCount: 48,
    level: 'Intermediate',
    rating: 4.97,
    reviewCount: 16800,
    studentsCount: '142,000',
    description: 'Learn modern cloud-native engineering: containerization with Docker, orchestration with Kubernetes, CI/CD pipelines, Terraform infrastructure as code, and production AWS microservices.',
    instructor: 'Nana Janashia (TechWorld with Nana)',
    icon: 'bag',
    themeColor: '#0ea5e9',
    matchPercentage: 95,
    recommendationReason: 'Core distributed systems & containerization requirement for high-scale backend engineers',
    isEnrolled: true,
    progressPercentage: 35,
    tags: ['Cloud', 'Docker', 'Kubernetes', 'DevOps', 'AWS', 'Microservices', 'Engineering'],
    syllabus: [
      {
        id: 'cloud-doc-1',
        title: 'Lesson #1: Docker Containers vs Virtual Machines | TechWorld with Nana',
        duration: '22 min',
        completed: true,
        type: 'video',
        youtubeVideoId: 'pg19Z8LLSu4',
        youtubeChannel: 'TechWorld with Nana',
        videoSummary: 'Deep architectural comparison between kernel cgroups/namespaces containerization and hypervisor virtualization, Dockerfile writing, images, and container lifecycles.',
        keyConcepts: ['Kernel Namespaces & cgroups', 'Images vs Containers', 'Dockerfile Best Practices', 'Layer Caching'],
        questions: [
          {
            id: 'doc-q1',
            question: 'Why are Docker containers significantly lighter and faster to start than traditional hypervisor Virtual Machines (VMs)?',
            options: [
              'Containers share the host operating system kernel and isolate user processes via cgroups and namespaces rather than virtualizing full guest OS hardware.',
              'Docker converts all application code into web assembly binaries.',
              'Containers run directly inside the motherboard BIOS cache.',
              'Containers eliminate all network sockets and storage needs.'
            ],
            correctIndex: 0,
            explanation: 'Unlike VMs which emulate physical hardware and run distinct full guest operating systems, containers share the host kernel and only package app code and runtime dependencies.',
            conceptTag: 'Containerization Architecture'
          }
        ]
      },
      {
        id: 'cloud-k8s-2',
        title: 'Lesson #2: Kubernetes Pods, Deployments & Services Architecture',
        duration: '31 min',
        completed: false,
        type: 'video',
        youtubeVideoId: 'X48VuDVv0do',
        youtubeChannel: 'TechWorld with Nana',
        videoSummary: 'Kubernetes master and worker nodes, Pod atomic scheduling units, ReplicaSets, Rolling Updates, and Ingress routing controllers.',
        keyConcepts: ['Control Plane (API Server, etcd)', 'Worker Nodes & Kubelet', 'Deployments & Rolling Updates', 'Service Load Balancing'],
        questions: [
          {
            id: 'k8s-q1',
            question: 'What is the smallest deployable computing unit that can be created and managed in Kubernetes?',
            options: [
              'A Pod (wrapping one or more tightly coupled containers sharing storage and network IP)',
              'A physical bare-metal server blade',
              'A Dockerfile text file',
              'A VPC Subnet'
            ],
            correctIndex: 0,
            explanation: 'A Pod is the fundamental atomic unit in Kubernetes that encapsulates application containers, storage volumes, and a unique network IP address.',
            conceptTag: 'Kubernetes Core Fundamentals'
          }
        ]
      }
    ]
  },
  {
    id: 'course-dsa-algorithms',
    title: 'Data Structures & Algorithms: Complexity, Trees & Graphs',
    category: 'Engineering & Tech',
    duration: '65 HOURS',
    hoursCount: 65,
    level: 'Advanced',
    rating: 4.99,
    reviewCount: 28400,
    studentsCount: '210,000',
    description: 'Master core computer science algorithms: asymptotic time & space complexity (Big O), balanced binary search trees, graph traversal (BFS, DFS, Dijkstra), dynamic programming, and greedy optimization.',
    instructor: 'Abdul Bari & Striver',
    icon: 'chart',
    themeColor: '#10b981',
    matchPercentage: 99,
    recommendationReason: 'Crucial algorithmic problem-solving required for high-tier engineering interviews and system optimization',
    isEnrolled: true,
    progressPercentage: 55,
    tags: ['Algorithms', 'Data Structures', 'DSA', 'Time Complexity', 'Trees', 'Graphs', 'Dynamic Programming', 'Engineering'],
    syllabus: [
      {
        id: 'dsa-bigo-1',
        title: 'Lesson #1: Asymptotic Analysis, Big-O Notation & Recursion Master Theorem',
        duration: '28 min',
        completed: true,
        type: 'video',
        youtubeVideoId: '9TlHvipP5yA',
        youtubeChannel: 'Abdul Bari Algorithms',
        videoSummary: 'Formal mathematical definition of Big O, Omega, and Theta bounds, analyzing loop bounds, space trade-offs, and recurrence relations.',
        keyConcepts: ['Asymptotic Complexity Bounds', 'Recurrence Trees', 'Master Theorem Cases', 'Space-Time Tradeoffs'],
        questions: [
          {
            id: 'dsa-q1',
            question: 'What is the tight worst-case time complexity of standard Binary Search on a sorted array of size N?',
            options: [
              'O(log N) because each step halves the search space.',
              'O(N) linear time.',
              'O(1) constant time.',
              'O(N log N) quasilinear time.'
            ],
            correctIndex: 0,
            explanation: 'Binary search repeatedly divides the search interval in half, leading to a recurrence T(N) = T(N/2) + O(1), which solves to O(log N).',
            conceptTag: 'Algorithm Time Complexity'
          }
        ]
      },
      {
        id: 'dsa-graph-2',
        title: 'Lesson #2: Graph Traversals (BFS vs DFS) and Shortest Path (Dijkstra)',
        duration: '38 min',
        completed: false,
        type: 'video',
        youtubeVideoId: 'pcKY4hjDrxk',
        youtubeChannel: 'Abdul Bari Algorithms',
        videoSummary: 'Adjacency matrix vs list representations, breadth-first search queue mechanics, depth-first recursion, and priority-queue Dijkstra for non-negative weighted graphs.',
        keyConcepts: ['Adjacency Lists', 'BFS Queue Traversal', 'DFS Stack Recursion', 'Dijkstra Priority Queue'],
        questions: [
          {
            id: 'dsa-q2',
            question: 'Which data structure is fundamentally required to implement Breadth-First Search (BFS) on an unweighted graph?',
            options: [
              'A First-In-First-Out (FIFO) Queue',
              'A Last-In-First-Out (LIFO) Stack',
              'A Binary Search Tree only',
              'A Hash Map with floating point keys'
            ],
            correctIndex: 0,
            explanation: 'BFS explores neighbor vertices level by level using a FIFO Queue to ensure closer vertices are processed before deeper nodes.',
            conceptTag: 'Graph Search Algorithms'
          }
        ]
      }
    ]
  },
  {
    id: 'course-data-science',
    title: 'Data Science & Big Data: Pandas, SQL & Predictive Analytics',
    category: 'Engineering & Tech',
    duration: '42 HOURS',
    hoursCount: 42,
    level: 'Intermediate',
    rating: 4.94,
    reviewCount: 13900,
    studentsCount: '115,000',
    description: 'End-to-end data science pipeline: exploratory data analysis with Pandas & NumPy, relational data modeling with SQL, statistical hypothesis testing, and regression modeling.',
    instructor: 'Josh Starmer (StatQuest) & Keith Galli',
    icon: 'chart',
    themeColor: '#f59e0b',
    matchPercentage: 94,
    recommendationReason: 'Quantitative data strategy and predictive modeling for business intelligence and data engineering',
    isEnrolled: false,
    progressPercentage: 0,
    tags: ['Data Science', 'Python', 'Pandas', 'SQL', 'Statistics', 'Big Data', 'Engineering'],
    syllabus: [
      {
        id: 'ds-pandas-1',
        title: 'Lesson #1: Exploratory Data Analysis with Pandas & Data Cleaning',
        duration: '25 min',
        completed: false,
        type: 'video',
        youtubeVideoId: 'vmEHCJofslg',
        youtubeChannel: 'Keith Galli Data Science',
        videoSummary: 'Importing datasets, vectorised aggregations, handling missing data (imputation vs drop), group-by operations, and multi-index pivots.',
        keyConcepts: ['Vectorized Array Operations', 'Imputation Strategies', 'GroupBy & Aggregations', 'Data Normalization'],
        questions: [
          {
            id: 'ds-q1',
            question: 'In Pandas, why are vectorized array operations significantly faster than iterating through rows using a Python for-loop?',
            options: [
              'Vectorized operations are implemented in optimized low-level C code (NumPy backend) that bypasses Python interpreter overhead and leverages SIMD CPU instructions.',
              'Pandas runs loops in the cloud database automatically.',
              'Python for-loops delete array indices permanently.',
              'Vectorized operations skip arithmetic verification.'
            ],
            correctIndex: 0,
            explanation: 'Pandas uses NumPy arrays underneath, which execute contiguous C-level loops with CPU vectorization (SIMD) rather than high-overhead Python bytecode iterations.',
            conceptTag: 'Data Vectorization & Performance'
          }
        ]
      }
    ]
  },
  {
    id: 'course-cybersecurity',
    title: 'Cybersecurity Engineering: Network Defense & Cryptography',
    category: 'Engineering & Tech',
    duration: '38 HOURS',
    hoursCount: 38,
    level: 'Advanced',
    rating: 4.96,
    reviewCount: 15200,
    studentsCount: '92,000',
    description: 'Enterprise security architecture: TLS/SSL cryptographic handshakes, public key infrastructure (PKI), firewall rules, penetration testing with Wireshark & Nmap, and zero-trust perimeter defense.',
    instructor: 'Chuck Keith (NetworkChuck) & John Hammond',
    icon: 'shield',
    themeColor: '#8b5cf6',
    matchPercentage: 93,
    recommendationReason: 'Defensive systems engineering and threat modeling for high-compliance enterprise cloud infrastructure',
    isEnrolled: false,
    progressPercentage: 0,
    tags: ['Cybersecurity', 'Network Security', 'Cryptography', 'Ethical Hacking', 'Penetration Testing', 'Engineering'],
    syllabus: [
      {
        id: 'sec-net-1',
        title: 'Lesson #1: Network Security, TCP Handshake & Wireshark Packet Inspection',
        duration: '27 min',
        completed: false,
        type: 'video',
        youtubeVideoId: 'qA6sopx3Rvg',
        youtubeChannel: 'NetworkChuck',
        videoSummary: 'Deep inspection of the 3-way TCP SYN-SYN/ACK-ACK handshake, packet dissection in Wireshark, identifying spoofing and SYN flood denial of service attacks.',
        keyConcepts: ['TCP 3-Way Handshake', 'Wireshark Packet Analysis', 'SYN Flood Mitigation', 'Firewall Packet Filtering'],
        questions: [
          {
            id: 'sec-q1',
            question: 'What is the purpose of the SYN-ACK packet during a standard TCP 3-way connection handshake?',
            options: [
              'The server acknowledges the client’s sequence number (ACK) and synchronizes its own initial sequence number (SYN).',
              'The server immediately terminates the connection for security.',
              'The server encrypts all client passwords with AES-256.',
              'The client disconnects from the Wi-Fi router.'
            ],
            correctIndex: 0,
            explanation: 'In the TCP 3-way handshake (SYN -> SYN-ACK -> ACK), the server sends SYN-ACK to acknowledge receipt of the client SYN and establish its own sequence number for reliable bidirectional transmission.',
            conceptTag: 'Network Protocol Security'
          }
        ]
      }
    ]
  }
];

export const INITIAL_CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'track-ui-ux',
    title: 'UI/UX Design & Product Engineering',
    domainCategory: 'Design & Product',
    coursesCount: 20,
    estimatedMonths: 6,
    icon: 'figma',
    themeColor: '#ec4899',
    avgSalary: '₹4–35 LPA',
    salaryRangeIndia: '₹4–35 LPA',
    marketDemand: 'High',
    description: 'Conduct user research, create wireframes and high-fidelity prototypes in Figma, build design systems, and run usability tests.',
    requiredSkills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing', 'Typography', 'Android 360×800 Design'],
    whatIsAndWhyLearn: 'What is UI/UX Design and Why Learn It: By completing this roadmap you will be able to conduct user research, create wireframes and high-fidelity prototypes in Figma, build and maintain a design system and conduct usability tests. You will be job-ready to apply for UI Designer, UX Designer and Product Designer roles at Indian companies paying ₹4–35 LPA.',
    careerOutcome: 'You will be job-ready to apply for UI Designer, UX Designer and Product Designer roles at Indian and global companies paying ₹4–35 LPA.',
    jobRoles: ['UI Designer', 'UX Designer', 'Product Designer', 'Design Systems Specialist'],
    prerequisites: [
      {
        text: 'No Prior Design Experience Needed',
        detail: 'UI/UX is a design field, not purely a technical one. While CSE students have an advantage in understanding technical constraints, the primary skills are observation, empathy and visual communication — not coding. If you have never thought about design before, start by downloading 5 apps you use daily and writing down 3 things that frustrate you about each. That critical observation habit is the foundation of UX design and it costs nothing to develop starting today.',
        isImportant: true,
      },
      {
        text: 'Basic computer skills and comfort using design tools',
        detail: 'Familiarity with web browsers, operating system shortcuts, and mouse/trackpad precision.',
      },
      {
        text: 'An eye for visual detail',
        detail: 'Noticing when spacing is off, font sizes feel wrong, or color contrast is low.',
      },
      {
        text: 'Access to Figma (free account at figma.com)',
        detail: 'Works in any modern browser on Windows, Mac, or Linux; no high-end hardware needed.',
      },
      {
        text: 'A portfolio mindset',
        detail: 'Every project you do must be documented as a case study explaining the "why" from Day 1.',
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Visual Design Fundamentals',
        difficulty: 'Easy',
        description: 'Visual design fundamentals are learnable and immediately visible; feedback is instant.',
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: UX Research & Synthesis',
        difficulty: 'Medium',
        description: 'UX research requires patience; translating user insights into design decisions takes practice.',
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Interaction Design & Prototyping',
        difficulty: 'Medium',
        description: 'Interaction design and prototyping have technical depth; Figma has many powerful features.',
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Portfolio & Case Study Writing',
        difficulty: 'Medium',
        description: 'Portfolio presentation and case study writing requires communication skills beyond design tools.',
      },
    ],
    commonMistakes: [
      {
        title: 'Building a portfolio of only beautiful screens without explaining the design process',
        description: 'Recruiters hire for thinking, not just visual output; every portfolio piece needs a "why" behind each decision.',
      },
      {
        title: 'Only designing for iPhone',
        description: '75% of Indian smartphone users are on Android with smaller, lower-resolution screens; always test and design at 360×800 (Android baseline).',
      },
      {
        title: 'Ignoring typography',
        description: 'Font choice, size hierarchy and line-height determine 60% of whether an interface feels professional or amateur.',
      },
      {
        title: 'Copy-pasting UI kits without understanding why the patterns exist',
        description: 'You cannot defend or adapt a design if you borrowed it without understanding it.',
      },
      {
        title: 'Skipping usability testing',
        description: 'Assumptions about what users want are almost always wrong; even 5 real user tests reveal problems that hours of self-review miss.',
      },
    ],
    timeCalculatorPresets: [
      { hoursPerDay: 1, months: 10 },
      { hoursPerDay: 2, months: 5 },
      { hoursPerDay: 3, months: 3.5 },
      { hoursPerDay: 4, months: 2.5 },
    ],
    marketDemandStats: {
      openJobsIndia: '32,000+',
      yoyGrowth: '+18%',
      remoteRoles: 'Very High',
      source: 'LinkedIn Job Trends + NASSCOM 2024',
      freePathNote: '100% Free Path Available: Zero budget needed. Figma free plan, Google UX Certificate (financial aid via Coursera), YouTube tutorials and Maze free tier cover 100% of this roadmap at zero cost.',
    },
    cheatsheetsAndTools: [
      {
        category: '📋 Cheatsheets & Guides',
        items: [
          { name: 'Figma Resource Library', desc: 'Design components + interactive tutorials', url: 'https://figma.com/resources' },
          { name: 'Material Design Guidelines (Google)', desc: 'Android baseline layout & token standards', url: 'https://m3.material.io' },
          { name: 'Apple Human Interface Guidelines', desc: 'iOS visual hierarchy and navigation rules', url: 'https://developer.apple.com/design' },
          { name: 'Nielsen Norman Group', desc: 'Evidence-based UX research articles and heuristics', url: 'https://nngroup.com' },
        ],
      },
      {
        category: '⭐ Top GitHub Repos',
        items: [
          { name: 'Awesome Design Systems', desc: 'Industry design systems list and token architectures', url: 'https://github.com' },
          { name: 'Awesome Design Tools', desc: 'Curated UI/UX tools, plugins, and icon sets', url: 'https://github.com' },
          { name: 'iOS Design Patterns', desc: 'Interface design reference and layout blueprints', url: 'https://github.com' },
          { name: 'System Design Primer', desc: 'For developers moving into product and technical UX', url: 'https://github.com' },
        ],
      },
      {
        category: '🧪 Practice Platforms',
        items: [
          { name: 'Figma', desc: 'Industry-standard UI tool — Free for students', url: 'https://figma.com' },
          { name: 'Dribbble', desc: 'Portfolio inspiration + global design community', url: 'https://dribbble.com' },
          { name: 'Daily UX Challenge', desc: 'Free daily case study prompts & creative briefs', url: 'https://dailyuxchallenge.com' },
          { name: 'Good UX / Bad UX Examples', desc: 'Pattern library and anti-pattern breakdowns', url: 'https://gooduxbadux.com' },
        ],
      },
    ],
  },
  {
    id: 'track-ai-ml',
    title: 'AI & Machine Learning Engineer',
    domainCategory: 'Engineering & Tech',
    coursesCount: 24,
    estimatedMonths: 6,
    icon: 'atom',
    themeColor: '#6366f1',
    avgSalary: '₹14–45 LPA',
    salaryRangeIndia: '₹14–45 LPA ($148,000 global)',
    recommendedCourse: 'Machine Learning & Deep Learning Specialization (PyTorch & 3Blue1Brown)',
    marketDemand: 'Very High',
    description: 'Architect, train, and deploy production machine learning pipelines, transformer architectures, vector embeddings, and deep learning systems.',
    requiredSkills: ['Python', 'PyTorch', 'TensorFlow', 'Linear Algebra', 'MLOps & Docker', 'Vector DBs (Pinecone)', 'Calculus & Probability'],
    whatIsAndWhyLearn: 'What is AI & Machine Learning Engineering: By mastering this roadmap you will understand the mathematical foundations of neural networks, train deep learning models with PyTorch, build LLM/RAG pipelines using vector databases, and deploy production inference endpoints with Docker and FastAPI. You will be qualified for AI Engineer, Machine Learning Scientist, and MLOps roles with top-tier tech firms paying ₹14–45 LPA.',
    careerOutcome: 'Lead machine learning infrastructure, model fine-tuning, computer vision, or LLM agent applications in high-growth AI labs and enterprise systems.',
    jobRoles: ['AI Engineer', 'Machine Learning Engineer', 'MLOps Architect', 'Deep Learning Researcher'],
    prerequisites: [
      {
        text: 'Python Programming Proficiency',
        detail: 'Comfort with object-oriented Python, NumPy vectorization, and asynchronous API calls.',
        isImportant: true,
      },
      {
        text: 'Multivariable Calculus & Linear Algebra',
        detail: 'Understanding matrices, dot products, eigenvalues, and partial derivative gradients.',
      },
      {
        text: 'Probability & Statistical Distributions',
        detail: 'Bayes theorem, normal distributions, expected values, and hypothesis testing.',
      },
      {
        text: 'Command Line & Linux Basics',
        detail: 'Bash scripting, GPU driver management (CUDA), and git version control.',
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Mathematical Foundations & Python Scientific Stack',
        difficulty: 'Medium',
        description: 'NumPy, Pandas, Vectorized operations, Linear Algebra, and Calculus intuition.',
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Supervised & Unsupervised Machine Learning',
        difficulty: 'Medium',
        description: 'Scikit-learn, Regression, Decision Trees, SVMs, Clustering, and cross-validation.',
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Deep Learning, CNNs & Transformer Architectures',
        difficulty: 'Hard',
        description: 'PyTorch tensors, backpropagation from scratch, Attention mechanisms, and Hugging Face.',
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: MLOps, Vector Databases & Production Deployment',
        difficulty: 'Hard',
        description: 'Dockerizing model weights, FastAPI inference servers, Triton, and LangChain/LlamaIndex.',
      },
    ],
    commonMistakes: [
      {
        title: 'Treating Deep Learning models as black boxes without learning mathematics',
        description: 'Without calculus and loss surface intuition, debugging vanishing gradients or overfitting is pure guesswork.',
      },
      {
        title: 'Neglecting data cleaning and feature engineering',
        description: '80% of real-world ML engineering is cleaning corrupt data; jumping straight to tuning hyper-parameters yields poor models.',
      },
      {
        title: 'Ignoring model latency and memory limits in deployment',
        description: 'A model with 99% accuracy is useless in production if it takes 10 seconds to respond or crashes low-memory GPU instances.',
      },
    ],
    timeCalculatorPresets: [
      { hoursPerDay: 2, months: 9 },
      { hoursPerDay: 4, months: 6 },
      { hoursPerDay: 6, months: 4 },
      { hoursPerDay: 8, months: 3 },
    ],
    marketDemandStats: {
      openJobsIndia: '48,000+ Active Roles',
      yoyGrowth: '+34%',
      remoteRoles: 'Very High',
      source: 'NASSCOM AI Talent Report & LinkedIn 2024',
      freePathNote: '100% Free Resources: Fast.ai, 3Blue1Brown Neural Networks, Stanford CS229, and Kaggle GPUs provide complete mastery at zero cost.',
    },
    cheatsheetsAndTools: [
      {
        category: '📋 ML & Mathematics Cheatsheets',
        items: [
          { name: 'PyTorch Official Cheat Sheet', desc: 'Tensor reshaping, autograd, and CUDA memory management', url: 'https://pytorch.org' },
          { name: 'Stanford CS229 Machine Learning Cheatsheet', desc: 'Afshine Amidi comprehensive formula summary', url: 'https://stanford.edu' },
          { name: 'Hugging Face Transformers Guide', desc: 'Pre-trained transformer tokenizers and model pipelines', url: 'https://huggingface.co' },
        ],
      },
      {
        category: '⭐ Top GitHub Repos & Repositories',
        items: [
          { name: 'Awesome-Machine-Learning', desc: 'Curated list of ML frameworks and open weights', url: 'https://github.com' },
          { name: 'FastAI Courses & Notebooks', desc: 'Practical deep learning for coders', url: 'https://github.com' },
          { name: 'Applied-ML-Production', desc: 'Patterns for model deployment and monitoring', url: 'https://github.com' },
        ],
      },
    ],
  },
  {
    id: 'track-cloud-systems',
    title: 'Cloud Architecture & DevOps Engineer',
    domainCategory: 'Engineering & Tech',
    coursesCount: 32,
    estimatedMonths: 7,
    icon: 'bag',
    themeColor: '#0ea5e9',
    avgSalary: '₹12–40 LPA',
    salaryRangeIndia: '₹12–40 LPA ($142,000 global)',
    recommendedCourse: 'Cloud Architecture & DevOps: Docker, Kubernetes & AWS (TechWorld with Nana)',
    marketDemand: 'Very High',
    description: 'Design fault-tolerant microservices, distributed storage networks, Kubernetes cluster orchestration, and CI/CD pipelines.',
    requiredSkills: ['Linux Kernel', 'Docker', 'Kubernetes', 'AWS/GCP', 'Terraform', 'CI/CD GitHub Actions', 'System Design'],
    whatIsAndWhyLearn: 'What is Cloud & DevOps Engineering: Modern technology organizations scale across distributed container fleets and cloud platforms. By completing this roadmap, you will master Linux internals, write declarative infrastructure with Terraform, orchestrate multi-node Kubernetes clusters, and build automated zero-downtime CI/CD deployment pipelines.',
    careerOutcome: 'Build resilient cloud infrastructure and reliability pipelines as a Cloud Architect, DevOps Engineer, or Site Reliability Engineer (SRE).',
    jobRoles: ['Cloud Architect', 'DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Kubernetes Administrator'],
    prerequisites: [
      {
        text: 'Solid Linux Shell & Bash Scripting',
        detail: 'Understanding process management, permissions, cron, systemd, and curl/netcat diagnostics.',
        isImportant: true,
      },
      {
        text: 'Networking Fundamentals',
        detail: 'TCP/IP, DNS records, Subnets, CIDR notation, HTTP/2, and TLS certificate handshakes.',
      },
      {
        text: 'Basic Git Workflow & Branching',
        detail: 'Pull requests, merge strategies, commit signing, and repository hooks.',
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Linux Administration & Core Networking',
        difficulty: 'Easy',
        description: 'Filesystems, process tree, bash scripting, SSH tunneling, and firewall rules.',
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Docker Containerization & Microservices',
        difficulty: 'Medium',
        description: 'Multi-stage Docker builds, image slimming, volume mounts, and Docker Compose.',
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Kubernetes Orchestration & Helm Packaging',
        difficulty: 'Hard',
        description: 'Pods, Deployments, Ingress controllers, PersistentVolumes, and Helm templates.',
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Infrastructure as Code (Terraform) & Observability',
        difficulty: 'Hard',
        description: 'Terraform state management, Prometheus metric scraping, and Grafana alert pipelines.',
      },
    ],
    commonMistakes: [
      {
        title: 'Deploying oversized Docker images with root privileges',
        description: 'Always use multi-stage builds, alpine/distroless base images, and non-root users for production security.',
      },
      {
        title: 'Treating Kubernetes as a silver bullet for simple workloads',
        description: 'Kubernetes introduces significant operational overhead; evaluate simpler managed containers (Cloud Run) first.',
      },
    ],
    timeCalculatorPresets: [
      { hoursPerDay: 2, months: 10 },
      { hoursPerDay: 4, months: 6 },
      { hoursPerDay: 6, months: 4.5 },
      { hoursPerDay: 8, months: 3 },
    ],
    marketDemandStats: {
      openJobsIndia: '55,000+ Cloud Roles',
      yoyGrowth: '+28%',
      remoteRoles: 'Very High',
      source: 'Gartner Cloud Computing Outlook 2024',
      freePathNote: 'AWS Free Tier, Google Cloud free credits, Minikube, and TechWorld with Nana cover 100% of this roadmap without licensing cost.',
    },
    cheatsheetsAndTools: [
      {
        category: '📋 Kubernetes & Docker Cheatsheets',
        items: [
          { name: 'Kubectl Command Cheatsheet', desc: 'Quick reference for cluster context and pod debugging', url: 'https://kubernetes.io' },
          { name: 'Docker CLI Cheat Sheet', desc: 'Container lifecycle, volume flags, and network inspection', url: 'https://docker.com' },
        ],
      },
    ],
  },
  {
    id: 'track-web-dev',
    title: 'Web & Full-Stack Software Engineering',
    domainCategory: 'Engineering & Tech',
    coursesCount: 22,
    estimatedMonths: 5,
    icon: 'atom',
    themeColor: '#0284c7',
    avgSalary: '₹8–30 LPA',
    salaryRangeIndia: '₹8–30 LPA',
    recommendedCourse: 'Complete React JS Masterclass (Code With Harry)',
    marketDemand: 'Very High',
    description: 'Build fast, responsive full-stack web applications with modern React, TypeScript, Node.js, Express, and PostgreSQL/MongoDB.',
    requiredSkills: ['JavaScript (ES6+)', 'React.js', 'TypeScript', 'Node.js', 'REST APIs', 'PostgreSQL', 'Tailwind CSS'],
    whatIsAndWhyLearn: 'What is Full-Stack Engineering: The web is the primary platform for modern software delivery. By mastering modern React.js, state management, REST/GraphQL APIs, relational database schemas, and server-side rendering, you will build production-grade web products used by millions of users.',
    careerOutcome: 'Work as a Full-Stack Engineer, Frontend Specialist, or Backend Node.js Developer in high-growth startups and multinational tech enterprises.',
    jobRoles: ['Full-Stack Developer', 'Frontend Engineer (React)', 'Backend Engineer (Node.js)', 'Software Development Engineer (SDE)'],
    prerequisites: [
      {
        text: 'HTML5, CSS3 & Responsive Design',
        detail: 'Flexbox, CSS Grid, mobile viewport adaptation, and semantic markup.',
        isImportant: true,
      },
      {
        text: 'Modern JavaScript (ES6+)',
        detail: 'Promises, Async/Await, closures, array methods (map/filter/reduce), and fetch API.',
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: JavaScript Mastery & Modern React Fundamentals',
        difficulty: 'Easy',
        description: 'JSX, Props, useState, useEffect, React Component tree reconciliation, and Tailwind.',
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: State Management & Client Routing',
        difficulty: 'Medium',
        description: 'Context API, React Router, custom hooks, and form validation libraries.',
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Backend REST APIs & Databases',
        difficulty: 'Medium',
        description: 'Node.js, Express, JWT authentication, SQL/Prisma schemas, and data caching.',
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Full-Stack Integration & Production Deployment',
        difficulty: 'Medium',
        description: 'Full stack deployment on Vercel/Cloud Run, CI/CD testing, and security auditing.',
      },
    ],
    commonMistakes: [
      {
        title: 'Mutating React state directly without setter functions',
        description: 'React depends on immutable state references to detect changes and trigger UI re-renders.',
      },
      {
        title: 'Leaving backend API credentials and secrets in client code',
        description: 'Never expose API secrets or database credentials in client-side bundles.',
      },
    ],
    timeCalculatorPresets: [
      { hoursPerDay: 2, months: 6 },
      { hoursPerDay: 4, months: 3.5 },
      { hoursPerDay: 6, months: 2.5 },
    ],
    marketDemandStats: {
      openJobsIndia: '65,000+ Active Roles',
      yoyGrowth: '+22%',
      remoteRoles: 'Very High',
      source: 'LinkedIn Developer Index India 2024',
      freePathNote: 'Code With Harry, official React docs, and free cloud hosting allow learning full-stack development at ₹0 budget.',
    },
    cheatsheetsAndTools: [
      {
        category: '📋 Web Development Guides',
        items: [
          { name: 'React Documentation (react.dev)', desc: 'Official interactive React documentation', url: 'https://react.dev' },
          { name: 'MDN Web Docs', desc: 'Definitive browser API and CSS reference', url: 'https://developer.mozilla.org' },
        ],
      },
    ],
  },
  {
    id: 'track-dsa',
    title: 'Computer Science & Algorithms (DSA)',
    domainCategory: 'Engineering & Tech',
    coursesCount: 26,
    estimatedMonths: 4,
    icon: 'chart',
    themeColor: '#10b981',
    avgSalary: '₹10–35 LPA',
    salaryRangeIndia: '₹10–35 LPA',
    recommendedCourse: 'Data Structures & Algorithms: Complexity, Trees & Graphs (Abdul Bari & Striver)',
    marketDemand: 'Very High',
    description: 'Master time & space complexity, advanced trees, graphs, dynamic programming, and greedy algorithms for FAANG/product engineering interviews.',
    requiredSkills: ['C++ / Java / Python', 'Big O Analysis', 'Binary Trees', 'Graphs (BFS/DFS)', 'Dynamic Programming', 'Heaps & Tries'],
    whatIsAndWhyLearn: 'What is DSA Mastery: Data Structures and Algorithms form the computational bedrock of computer science. Mastering algorithmic efficiency enables you to optimize high-throughput systems, pass rigorous coding assessments at top product companies, and write mathematically sound code.',
    careerOutcome: 'Succeed in competitive coding, technical screening rounds, and core systems engineering roles at Tier-1 product organizations.',
    jobRoles: ['Software Development Engineer I/II', 'Systems Engineer', 'Algorithm Specialist', 'Competitive Programmer'],
    prerequisites: [
      {
        text: 'Fluency in one programming language (C++, Java, or Python)',
        detail: 'Arrays, loops, functions, memory pointers/references, and standard library collections.',
        isImportant: true,
      },
      {
        text: 'Basic High-School Mathematics',
        detail: 'Logarithms, exponents, permutations & combinations, and basic induction.',
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Basic Data Structures & Time Complexity',
        difficulty: 'Easy',
        description: 'Arrays, Strings, Linked Lists, Stacks, Queues, and Big-O asymptotic analysis.',
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Recursion & Binary Search Trees',
        difficulty: 'Medium',
        description: 'Divide and conquer, BST traversals, AVL self-balancing, and heap priority queues.',
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Graph Algorithms & Shortest Path',
        difficulty: 'Hard',
        description: 'BFS, DFS, Topological Sort, Dijkstra, Kruskal Minimum Spanning Tree, and Disjoint Set Union.',
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Dynamic Programming & Bit Manipulation',
        difficulty: 'Hard',
        description: 'Memoization vs Tabulation, Knapsack variations, Longest Common Subsequence, and bitmasking.',
      },
    ],
    commonMistakes: [
      {
        title: 'Memorizing solutions instead of recognizing underlying algorithmic patterns',
        description: 'Focus on pattern recognition (Two Pointers, Sliding Window, Monotonic Stack, Topo Sort) rather than memorizing code.',
      },
    ],
    timeCalculatorPresets: [
      { hoursPerDay: 2, months: 6 },
      { hoursPerDay: 4, months: 3 },
      { hoursPerDay: 6, months: 2 },
    ],
    marketDemandStats: {
      openJobsIndia: '50,000+ Tech Roles',
      yoyGrowth: '+25%',
      remoteRoles: 'High',
      source: 'Striver SDE Sheet & LeetCode hiring stats 2024',
      freePathNote: 'LeetCode free tier, Striver SDE Sheet, and Abdul Bari YouTube playlists cover 100% of preparation.',
    },
    cheatsheetsAndTools: [
      {
        category: '📋 DSA Cheatsheets & Platforms',
        items: [
          { name: 'Striver SDE Sheet', desc: 'Top 190 curated algorithmic interview problems', url: 'https://takeuforward.org' },
          { name: 'LeetCode Platform', desc: 'Industry standard algorithm practice arena', url: 'https://leetcode.com' },
        ],
      },
    ],
  },
  {
    id: 'track-data-science',
    title: 'Data Science & Big Data Analytics',
    domainCategory: 'Engineering & Tech',
    coursesCount: 26,
    estimatedMonths: 5,
    icon: 'chart',
    themeColor: '#f59e0b',
    avgSalary: '₹10–32 LPA',
    salaryRangeIndia: '₹10–32 LPA ($132,000 global)',
    recommendedCourse: 'Data Science & Big Data: Pandas, SQL & Predictive Analytics (StatQuest & Keith Galli)',
    marketDemand: 'High',
    description: 'Extract statistical insights, build predictive econometric models, and lead quantitative strategy using Python, SQL, and Tableau.',
    requiredSkills: ['SQL', 'Pandas', 'Bayesian Inference', 'Tableau', 'Spark', 'Feature Engineering'],
    whatIsAndWhyLearn: 'What is Data Science & Big Data Analytics: By completing this track you will extract actionable intelligence from messy corporate datasets, build predictive regression and classification models, and design executive dashboards that drive multi-million dollar business decisions.',
    careerOutcome: 'Work as a Data Scientist, Quantitative Business Analyst, or Big Data Engineer delivering data-driven business impact.',
    jobRoles: ['Data Scientist', 'Data Analyst', 'Business Intelligence Engineer', 'Quantitative Analyst'],
    prerequisites: [
      {
        text: 'Python & SQL Foundations',
        detail: 'Writing relational JOINs, aggregations, and data transformation scripts.',
        isImportant: true,
      },
      {
        text: 'Descriptive & Inferential Statistics',
        detail: 'Mean, median, variance, p-values, confidence intervals, and hypothesis testing.',
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: SQL Relational Querying & Data Wrangling',
        difficulty: 'Easy',
        description: 'Complex SQL joins, window functions, Pandas cleaning, and exploratory analysis.',
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Applied Statistics & Experimental A/B Testing',
        difficulty: 'Medium',
        description: 'Sample sizing, z-tests, t-tests, ANOVA, and statistical significance.',
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Machine Learning & Predictive Modeling',
        difficulty: 'Medium',
        description: 'Linear/Logistic regression, decision trees, random forests, and model validation.',
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Big Data Frameworks & Business Intelligence',
        difficulty: 'Hard',
        description: 'PySpark distributed queries, Tableau dashboard design, and stakeholder presentations.',
      },
    ],
    commonMistakes: [
      {
        title: 'Confusing correlation with causation in business insights',
        description: 'Always validate experimental controls and confounders before concluding that variable A caused outcome B.',
      },
    ],
    timeCalculatorPresets: [
      { hoursPerDay: 2, months: 8 },
      { hoursPerDay: 4, months: 4.5 },
      { hoursPerDay: 6, months: 3 },
    ],
    marketDemandStats: {
      openJobsIndia: '38,000+ Open Positions',
      yoyGrowth: '+20%',
      remoteRoles: 'High',
      source: 'NASSCOM Data Science Talent Survey 2024',
      freePathNote: 'Kaggle Learn, StatQuest YouTube, and free relational databases cover 100% of learning paths.',
    },
    cheatsheetsAndTools: [
      {
        category: '📋 Data Science Reference',
        items: [
          { name: 'Pandas Documentation Cheatsheet', desc: 'Dataframe manipulation syntax and methods', url: 'https://pandas.pydata.org' },
        ],
      },
    ],
  },
  {
    id: 'track-cybersecurity',
    title: 'Cybersecurity & Secure Systems Engineer',
    domainCategory: 'Engineering & Tech',
    coursesCount: 24,
    estimatedMonths: 6,
    icon: 'shield',
    themeColor: '#8b5cf6',
    avgSalary: '₹12–38 LPA',
    salaryRangeIndia: '₹12–38 LPA ($138,000 global)',
    recommendedCourse: 'Cybersecurity Engineering: Network Defense & Cryptography (NetworkChuck & John Hammond)',
    marketDemand: 'Very High',
    description: 'Defend distributed infrastructures, perform adversarial stress tests, and verify cryptographic protocols.',
    requiredSkills: ['Network Protocols', 'Adversarial Defense', 'Penetration Testing', 'Cryptography', 'SIEM & SOC'],
    whatIsAndWhyLearn: 'What is Cybersecurity Engineering: Cybersecurity professionals protect digital infrastructure, user privacy, and organizational assets against cyber espionage, ransomware, and unauthorized intrusions. Learn offensive penetration testing, network packet dissection, and defensive security posture.',
    careerOutcome: 'Lead enterprise security operations as a Security Engineer, Penetration Tester, or SOC Analyst.',
    jobRoles: ['Cybersecurity Engineer', 'Penetration Tester (Ethical Hacker)', 'SOC Security Analyst', 'Information Security Officer'],
    prerequisites: [
      {
        text: 'TCP/IP & Network Fundamentals',
        detail: 'Understanding OSI model layers, packet headers, port scanning, and routing protocols.',
        isImportant: true,
      },
      {
        text: 'Linux Operating System Administration',
        detail: 'Command line proficiency, file permissions, logs analysis, and shell scripting.',
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Network Protocols, WireShark & Traffic Analysis',
        difficulty: 'Easy',
        description: 'Packet capture, TCP handshake inspection, ARP poisoning defense, and DNS analysis.',
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Cryptography & Identity Management',
        difficulty: 'Medium',
        description: 'Symmetric/Asymmetric encryption (AES, RSA), hashing (SHA-256), SSL/TLS, and OAuth2.',
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Web Application Security & OWASP Top 10',
        difficulty: 'Hard',
        description: 'SQL Injection, Cross-Site Scripting (XSS), CSRF, SSRF, and Burp Suite testing.',
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Defensive Operations, SIEM & Incident Response',
        difficulty: 'Hard',
        description: 'Log analysis, Splunk, threat hunting, malware sandbox analysis, and incident mitigation.',
      },
    ],
    commonMistakes: [
      {
        title: 'Relying exclusively on automated vulnerability scanners',
        description: 'Automated scanners miss contextual business logic flaws; hands-on manual verification is critical.',
      },
    ],
    timeCalculatorPresets: [
      { hoursPerDay: 2, months: 9 },
      { hoursPerDay: 4, months: 5 },
      { hoursPerDay: 6, months: 3.5 },
    ],
    marketDemandStats: {
      openJobsIndia: '40,000+ Cyber Positions',
      yoyGrowth: '+30%',
      remoteRoles: 'High',
      source: 'DSCI Cybersecurity Workforce Study 2024',
      freePathNote: 'TryHackMe, OverTheWire, and NetworkChuck free labs provide 100% hands-on learning at ₹0.',
    },
    cheatsheetsAndTools: [
      {
        category: '📋 Security Portals & Reference',
        items: [
          { name: 'OWASP Top 10 Security Guide', desc: 'Standard awareness document for web application security', url: 'https://owasp.org' },
        ],
      },
    ],
  },
  {
    id: 'track-gynecologist',
    title: 'Gynecologist & Obstetrician (Doctor)',
    domainCategory: 'Doctor & Medicine',
    coursesCount: 28,
    estimatedMonths: 36,
    icon: 'heart-pulse',
    themeColor: '#ec4899',
    avgSalary: 'INR 12.5–30 LPA',
    salaryRangeIndia: 'INR 12.5–30 LPA',
    recommendedCourse: 'Diploma in Gynecology and Obstetrics',
    marketDemand: 'Very High',
    description: 'Deals with diseases of women and female reproductive organs, crucial prenatal and maternal pregnancy care, baby development, birth control, and sexual health.',
    requiredSkills: ['Obstetrics & Prenatal Care', 'Reproductive Endocrinology', 'Labor Room Protocols', 'Fetal Ultrasound Doppler', 'Gynecological Surgery'],
    whatIsAndWhyLearn: "It is a branch of science which deals with diseases about women, especially reproductive organs. They are a very crucial part of a woman's pregnancy. It involves treating women with all the illnesses related to the woman's reproductive system. Gynecologists deal with the practice of dealing with the woman and the baby's development. They also specialize in dealing with women's reproductive and sexual health care. They deal with birth control, sex problems, cramps, and periods. Different examinations and treatments are done to take precautions as it is considered the most crucial part of a woman's body. Consulting the appropriate Gynecologist for any woman is very important. The average salary of Gynecologists lies between INR 12.5- 30 LPA, according to PayScale.",
    careerOutcome: 'Practice as a licensed Consultant Gynecologist or Obstetrician in hospitals, maternal-fetal centers, or private clinical consultation.',
    jobRoles: ['Consultant Gynecologist', 'Obstetric Surgeon', 'Maternal-Fetal Specialist', 'Reproductive Health Physician'],
    prerequisites: [
      {
        text: 'MBBS Degree + NEET PG / NEXT Qualification',
        detail: 'Completion of 4.5-year MBBS and 1-year rotatory clinical internship recognized by the National Medical Commission (NMC).',
        isImportant: true,
      },
      {
        text: 'Diploma in Gynecology and Obstetrics (DGO) or MD/MS',
        detail: 'Postgraduate clinical residency covering normal & operative deliveries, antenatal management, and ultrasound training.',
      },
      {
        text: 'Surgical Hand-Eye Dexterity & Precision',
        detail: 'Proficiency in aseptic surgical techniques, C-sections, and laparoscopic diagnostics.',
      },
      {
        text: 'High Empathy & Patient Communication',
        detail: 'Sensitivity and compassion when discussing reproductive health, pregnancy anxiety, and family planning.',
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: MBBS Core Pre-Clinical & Clinical Rotations',
        difficulty: 'Medium',
        description: 'Anatomy, Physiology, Pathology, Pharmacology, and initial ward postings across general medicine and surgery.',
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Diploma in Gynecology and Obstetrics (DGO) Residency',
        difficulty: 'Hard',
        description: 'Intensive labor room postings, antenatal clinic rounds, managing natural and operative deliveries, and neonatal resuscitation.',
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Advanced Gynecological Surgery & Ultrasound',
        difficulty: 'Hard',
        description: 'Pelvic pathology diagnostics, hysteroscopy, laparoscopic cystectomies, and high-risk fetal monitoring.',
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Independent Clinical & Hospital Practice',
        difficulty: 'Medium',
        description: 'Consultant practice, handling complex emergency obstetric interventions, and maternal health leadership.',
      },
    ],
    commonMistakes: [
      {
        title: 'Overlooking subtle signs of preeclampsia',
        description: 'Always systematically monitor blood pressure and urinary protein during routine antenatal checkups.',
      },
      {
        title: 'Delayed active third-stage labor management',
        description: 'Postpartum hemorrhage requires swift, protocolized uterotonic administration without second-guessing.',
      },
      {
        title: 'Insensitive patient communication',
        description: 'Reproductive discussions require deep bedside empathy and patient comfort.',
      },
    ],
    timeCalculatorPresets: [
      { hoursPerDay: 4, months: 36 },
      { hoursPerDay: 6, months: 24 },
      { hoursPerDay: 8, months: 18 },
    ],
    marketDemandStats: {
      openJobsIndia: '42,000+ Hospital Openings',
      yoyGrowth: '+20%',
      remoteRoles: 'High (Tele-health & Consultations)',
      source: 'PayScale & National Health Mission 2024',
      freePathNote: 'Government medical college PG residencies provide paid monthly clinical stipends of ₹60,000–₹1,10,000 throughout training.',
    },
    cheatsheetsAndTools: [
      {
        category: '📋 Clinical Guidelines & Protocols',
        items: [
          { name: 'FOGSI Clinical Guidelines', desc: 'Federation of Obstetric & Gynaecological Societies of India protocols', url: 'https://fogsi.org' },
          { name: 'WHO Antenatal Care Guidelines', desc: 'Standard international maternal-fetal screening benchmarks', url: 'https://who.int' },
          { name: 'RCOG Green-top Guidelines', desc: 'Evidence-based obstetric & gynecological surgery standards', url: 'https://rcog.org.uk' },
        ],
      },
      {
        category: '⭐ Top Medical Repos & Registries',
        items: [
          { name: 'PubMed Obstetrics & Gynecology', desc: 'Peer-reviewed clinical trial literature', url: 'https://pubmed.ncbi.nlm.nih.gov' },
          { name: 'Medscape OB/GYN Reference', desc: 'Drug dosages and surgical step-by-step references', url: 'https://medscape.com' },
          { name: 'UpToDate Clinical Decision Support', desc: 'Gold standard clinical diagnostic trees', url: 'https://uptodate.com' },
        ],
      },
      {
        category: '🧪 Practice Platforms & Calculators',
        items: [
          { name: 'Pregnancy Wheel & Gestational Age Calculator', desc: 'EDD and trimester milestone estimation', url: 'https://medscape.com' },
          { name: 'Bishop Score Assessment Tool', desc: 'Cervical readiness and induction calculator', url: 'https://mdcalc.com' },
          { name: 'Partograph Digital Simulator', desc: 'Labor progress and fetal heart rate tracking', url: 'https://who.int' },
        ],
      },
    ],
  },
  {
    id: 'track-child-psychiatrist',
    title: 'Child Psychologist / Psychiatrist (Doctor)',
    domainCategory: 'Doctor & Medicine',
    coursesCount: 24,
    estimatedMonths: 30,
    icon: 'heart-pulse',
    themeColor: '#8b5cf6',
    avgSalary: 'INR 8–15 LPA',
    salaryRangeIndia: 'INR 8–15 LPA',
    recommendedCourse: 'MD Psychiatry / M.Phil in Child & Adolescent Clinical Psychology',
    marketDemand: 'Very High',
    description: "Crucial infant & child mental health field dealing with childhood trauma, emotional disorders, behavioral therapy, and fragile pediatric psychological treatments.",
    requiredSkills: ['Pediatric Psychopathology', 'Behavioral Therapy (CBT)', 'Trauma Assessment', 'Developmental Milestone Screening', 'Pediatric Psychopharmacology'],
    whatIsAndWhyLearn: "The mental health of a child is as important as its physical health. There are various events in a child's life, which might cause trauma to the child's mental health mentality. Different emotional and mental illnesses occur. The Psychologist gives other treatments to the children and diagnoses the needful for the same. There are various medications given to the children based on the condition. It is a very fragile process of treatment as there is children's mental health. There are multiple precautions taken before consulting the Psychologist for children. The Infant sector of Doctors is very crucial and essential as well. They are considered as some of the most respectable jobs. The doctor's salaries here are considered very high. The pay is anywhere between INR 8- 15 LPA. The demand as well is more significant in India, considering the birth rate.",
    careerOutcome: 'Consult in pediatric tertiary hospitals, developmental guidance centers, schools, and private child psychiatric practices.',
    jobRoles: ['Child Psychiatrist', 'Pediatric Clinical Psychologist', 'Adolescent Mental Health Specialist', 'Child Behavioral Therapist'],
    prerequisites: [
      {
        text: 'MBBS Degree or Masters in Clinical Psychology',
        detail: 'Clinical medical training or recognized postgraduate psychology degree with registered licensure.',
        isImportant: true,
      },
      {
        text: 'Specialized Child Mental Health Fellowship',
        detail: 'Training in infant and adolescent emotional illnesses, ADHD, Autism Spectrum, and childhood trauma care.',
      },
      {
        text: 'Extreme Patience & Observational Acuity',
        detail: 'Ability to decipher non-verbal cues, play therapy signals, and parent-child relational dynamics.',
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Developmental Psychology & Neurobiology',
        difficulty: 'Medium',
        description: 'Brain development from infancy to adolescence, cognitive stages, and emotional regulation mechanisms.',
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Diagnostic Evaluation & Clinical Interviewing',
        difficulty: 'Hard',
        description: 'Psychometric testing, DSM-5/ICD-11 child diagnostic criteria, and fragile trauma history gathering.',
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Therapeutic Interventions & Medication Protocols',
        difficulty: 'Hard',
        description: 'Play therapy, family systemic counseling, and careful dosing of pediatric psychotropics.',
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Multi-Disciplinary Practice',
        difficulty: 'Medium',
        description: 'Coordinating with schools, pediatricians, and social workers to build comprehensive support networks.',
      },
    ],
    commonMistakes: [
      {
        title: 'Over-prescribing without thorough behavioral analysis',
        description: 'Child mental health requires behavioral and environmental interventions as the first line of defense.',
      },
      {
        title: 'Excluding parents or caregivers from therapy',
        description: 'A child cannot heal in isolation; family dynamics and school environment are paramount.',
      },
    ],
    timeCalculatorPresets: [
      { hoursPerDay: 4, months: 30 },
      { hoursPerDay: 6, months: 20 },
    ],
    marketDemandStats: {
      openJobsIndia: '28,000+ Clinic & School Roles',
      yoyGrowth: '+25%',
      remoteRoles: 'Very High (Tele-therapy & Consultations)',
      source: 'Indian Journal of Psychiatry & PayScale 2024',
      freePathNote: 'National mental health programs and government institutes (NIMHANS, CIP) offer subsidized education with stipends.',
    },
    cheatsheetsAndTools: [
      {
        category: '📋 Diagnostic Standards',
        items: [
          { name: 'DSM-5-TR Child Diagnostic Criteria', desc: 'Standardized classification of childhood disorders', url: 'https://psychiatry.org' },
          { name: 'WHO Child Mental Health Action Plan', desc: 'Public health framework for infant and youth care', url: 'https://who.int' },
        ],
      },
      {
        category: '🧪 Assessment Scales',
        items: [
          { name: 'Vanderbilt ADHD Diagnostic Rating Scale', desc: 'Parent and teacher standardized assessment', url: 'https://nichq.org' },
          { name: 'Childhood Autism Rating Scale (CARS)', desc: 'Behavioral observation evaluation', url: 'https://wpspublish.com' },
          { name: 'PHQ-9 Adolescent Depression Screen', desc: 'Validated youth mood evaluation', url: 'https://mdcalc.com' },
        ],
      },
    ],
  },
  {
    id: 'track-dermatologist',
    title: 'Dermatologist & Cosmetologist (Doctor)',
    domainCategory: 'Doctor & Medicine',
    coursesCount: 26,
    estimatedMonths: 36,
    icon: 'heart-pulse',
    themeColor: '#06b6d4',
    avgSalary: 'INR 3.6–30 LPA',
    salaryRangeIndia: 'INR 3.6–30 LPA',
    recommendedCourse: 'MD Dermatology',
    marketDemand: 'Very High',
    description: 'Deals with problems of skin, nails, or scalp, treating major skin diseases, advanced cosmetology, derma-care aesthetics, and dermato-surgery.',
    requiredSkills: ['Clinical Dermatology', 'Dermatosurgery', 'Trichology & Scalp Pathologies', 'Aesthetic Cosmetology & Lasers', 'Skin Biopsy & Histopathology'],
    whatIsAndWhyLearn: "Dermatology is a field of medicine that deals with problems of skin, nails, or scalp. The field is more inclined towards researching and helping people with major skin diseases. Dermatology is a field that is considered highly competitive as one would need a lot of experience and research to advise ahead. Since the atmosphere around has been evolving, and individuals have started to treat themselves with skincare, cosmetology, and various derma care treatments, the demand has increased. There have been different aesthetic beauty standards that individuals these days follow. Considering all these factors, there is a high demand for doctors in this field. The average salary of a Dermatologist lies between INR 3.6- 30 LPA, according to PayScale. Recommended Course: MD Dermatology.",
    careerOutcome: 'Lead high-demand clinical dermatology wards, establish cosmetic laser centers, or consult in top healthcare conglomerates.',
    jobRoles: ['Consultant Dermatologist', 'Aesthetic Cosmetologist', 'Pediatric Dermatologist', 'Dermatosurgeon'],
    prerequisites: [
      {
        text: 'MBBS Degree + NEET PG Top Percentile',
        detail: 'Dermatology is one of the most competitive specialties in NEET PG requiring top-tier national ranks.',
        isImportant: true,
      },
      {
        text: 'MD in Dermatology, Venereology & Leprosy (DVD/DVL)',
        detail: '3-year residency mastering dermatopathology, pharmacology of biologics, and cutaneous surgery.',
      },
      {
        text: 'Clinical Morphological Eye',
        detail: 'Sharp visual distinction between subtly different skin lesions, rashes, and pigmentations.',
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: MBBS Foundation & Cutaneous Biology',
        difficulty: 'Medium',
        description: 'Epidermal physiology, melanocyte biology, immunology, and cutaneous microcirculation.',
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: MD Dermatology Residency & Clinical Diagnosis',
        difficulty: 'Hard',
        description: 'Evaluating acute skin pathologies, psoriasis, eczema, autoimmune bullous diseases, and drug eruptions.',
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Dermatosurgery, Lasers & Aesthetic Cosmetology',
        difficulty: 'Hard',
        description: 'Punch biopsies, vitiligo grafting, chemical peels, ablative and non-ablative laser procedures.',
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Advanced Subspecialty or Independent Practice',
        difficulty: 'Medium',
        description: 'Dermatopathology fellowships, trichology, or establishing private aesthetic cosmetology practices.',
      },
    ],
    commonMistakes: [
      {
        title: 'Prescribing topical steroids indiscriminately',
        description: 'Causes steroid-induced rosacea, fungal escalation (tinea incognito), and severe epidermal atrophy.',
      },
      {
        title: 'Failing to perform dermoscopy on evolving pigmented lesions',
        description: 'Early melanoma detection requires diligent dermoscopic evaluation rather than naked-eye guesswork.',
      },
    ],
    timeCalculatorPresets: [
      { hoursPerDay: 4, months: 36 },
      { hoursPerDay: 6, months: 24 },
    ],
    marketDemandStats: {
      openJobsIndia: '36,000+ Hospital & Cosmetology Roles',
      yoyGrowth: '+26%',
      remoteRoles: 'High (Digital Teledermatology)',
      source: 'PayScale India & IADVL Trends 2024',
      freePathNote: 'Government MD Dermatology residencies offer substantial monthly stipends of ₹75,000–₹1,20,000.',
    },
    cheatsheetsAndTools: [
      {
        category: '📋 Clinical Guidelines & Standards',
        items: [
          { name: 'IADVL Guidelines', desc: 'Indian Association of Dermatologists, Venereologists and Leprologists protocols', url: 'https://iadvl.org' },
          { name: 'British Association of Dermatologists (BAD)', desc: 'Evidence-based clinical guidelines', url: 'https://bad.org.uk' },
        ],
      },
      {
        category: '🧪 Morphological & Diagnostic Tools',
        items: [
          { name: 'DermNet NZ Atlas', desc: 'World premier dermatological image library and disease summaries', url: 'https://dermnetnz.org' },
          { name: 'PASI Score Calculator', desc: 'Psoriasis Area and Severity Index calculation', url: 'https://mdcalc.com' },
          { name: 'SCORAD Calculator', desc: 'Atopic dermatitis severity index', url: 'https://mdcalc.com' },
        ],
      },
    ],
  },
  {
    id: 'track-cardiologist',
    title: 'Cardiologist & Heart Specialist (Doctor)',
    domainCategory: 'Doctor & Medicine',
    coursesCount: 32,
    estimatedMonths: 42,
    icon: 'heart-pulse',
    themeColor: '#ef4444',
    avgSalary: 'INR 15.2–60 LPA',
    salaryRangeIndia: 'INR 15.2–60 LPA',
    recommendedCourse: 'DM Cardiology / DNB Cardiology',
    marketDemand: 'Very High',
    description: 'Treatment of heart disorders and circulatory organs defects, heart failures, coronary artery disease, surgeries assistance, sports medicine, and military health.',
    requiredSkills: ['Coronary Angiography', 'Echocardiography (2D/3D)', 'Cardiac ICU & Emergency Resuscitation', 'Electrophysiology & Pacemakers', 'Heart Failure Management'],
    whatIsAndWhyLearn: "Cardiology refers to the treatment of disorders or the diagnosis of the heart and its organs. It is a branch that deals with specific circulatory organs. It includes the diagnosis of heart failures, artery disease, and various other circulatory organs defects. Their job often consists of assisting physicians during surgeries. Students are also taught to test patients and take care professionally. There is an increase in cardiac issues in the country, so there is a demand for individuals in Cardiology. There are various areas of jobs where a cardiologist is required, right from sports to military forces. They are also one of the respectable jobs. The average salary of a Cardiologist lies between INR 15.2- 60 LPA, according to PayScale.",
    careerOutcome: 'Become an Interventional Cardiologist or Heart Specialist performing catheterizations, angioplasties, and guiding cardiac care units.',
    jobRoles: ['Interventional Cardiologist', 'Consultant Clinical Cardiologist', 'Cardiac Electrophysiologist', 'Pediatric Cardiologist'],
    prerequisites: [
      {
        text: 'MBBS + MD General Medicine / Pediatrics',
        detail: 'Rigorous 3-year post-MBBS internal medicine residency before super-specialty entrance.',
        isImportant: true,
      },
      {
        text: 'DM Cardiology or DNB Cardiology (Super-Specialty)',
        detail: '3-year cardiac fellowship mastering cath-lab interventions, hemodynamics, and echocardiography.',
      },
      {
        text: 'High Emergency Stress Resilience',
        detail: 'Performing life-saving primary angioplasties under intense time constraints (Door-to-Balloon < 90 min).',
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: MD Internal Medicine Foundations',
        difficulty: 'Hard',
        description: 'Comprehensive adult pathology, pharmacology, intensive care management, and hemodynamics.',
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: DM Cardiology Cath-Lab & Clinical Rotations',
        difficulty: 'Hard',
        description: 'Coronary angiography, radial/femoral arterial punctures, pacemakers, and 2D-Echocardiography.',
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Interventional Procedures & Critical Care',
        difficulty: 'Hard',
        description: 'Primary PCI (stenting), intra-aortic balloon pumps, electrophysiology study, and valve therapies.',
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Senior Consultant & Specialized Practice',
        difficulty: 'Medium',
        description: 'Directing cardiac units, sports cardiology, defense medical consultation, and cardiovascular research.',
      },
    ],
    commonMistakes: [
      {
        title: 'Delaying reperfusion in acute STEMI',
        description: 'Every minute of coronary occlusion equals myocardial tissue loss; Door-to-Balloon time must strictly remain <90 minutes.',
      },
      {
        title: 'Missing atypical presentations of myocardial ischemia',
        description: 'Diabetic and elderly patients often present with nausea or dyspnea without classic chest pain.',
      },
    ],
    timeCalculatorPresets: [
      { hoursPerDay: 6, months: 42 },
      { hoursPerDay: 8, months: 30 },
    ],
    marketDemandStats: {
      openJobsIndia: '50,000+ Super-Specialty Roles',
      yoyGrowth: '+28%',
      remoteRoles: 'High (ECG & Holter Tele-Monitoring)',
      source: 'Cardiological Society of India & PayScale 2024',
      freePathNote: 'Government DM Cardiology super-specialty posts provide senior resident stipends of ₹90,000–₹1,40,000/month.',
    },
    cheatsheetsAndTools: [
      {
        category: '📋 Clinical Practice Guidelines',
        items: [
          { name: 'Cardiological Society of India (CSI) Guidelines', desc: 'National consensus on STEMI and heart failure', url: 'https://csi.org.in' },
          { name: 'ACC/AHA Clinical Guidelines', desc: 'American College of Cardiology evidence-based directives', url: 'https://acc.org' },
          { name: 'ESC Guidelines', desc: 'European Society of Cardiology practice benchmarks', url: 'https://escardio.org' },
        ],
      },
      {
        category: '🧪 Diagnostic Tools & Risk Calculators',
        items: [
          { name: 'TIMI Risk Score for STEMI / UA', desc: 'Thrombolysis in Myocardial Infarction mortality risk', url: 'https://mdcalc.com' },
          { name: 'CHA2DS2-VASc Stroke Risk Calculator', desc: 'Atrial fibrillation anticoagulation criteria', url: 'https://mdcalc.com' },
          { name: 'Killip Classification of Heart Failure', desc: 'Post-myocardial infarction severity index', url: 'https://mdcalc.com' },
        ],
      },
    ],
  },
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  { id: 'sch-1', date: '2026-03-02', time: '10:30 AM', title: 'ML Foundations: Gradient Descent', courseTitle: 'Machine Learning & Math', type: 'lecture', completed: true },
  { id: 'sch-2', date: '2026-03-04', time: '02:00 PM', title: 'Algorithms: Graph Traversals Lab', courseTitle: 'Scalable Algorithms', type: 'quiz', completed: true },
  { id: 'sch-3', date: '2026-03-09', time: '11:00 AM', title: 'Intelligent Assessment #2', courseTitle: 'Machine Learning & Math', type: 'quiz', completed: true },
  { id: 'sch-4', date: '2026-03-12', time: '04:30 PM', title: 'Docker Containers for Model Serving', courseTitle: 'Production MLOps', type: 'lecture', completed: true },
  { id: 'sch-5', date: '2026-03-16', time: '10:30 AM', title: 'Lesson #1: Empirical Risk Validation', courseTitle: 'Machine Learning & Math', type: 'lecture', completed: true },
  { id: 'sch-6', date: '2026-03-18', time: '03:00 PM', title: 'AI Skill-Gap Milestone Evaluation', courseTitle: 'Personalized Career Path', type: 'revision', completed: false },
  { id: 'sch-7', date: '2026-03-21', time: '01:30 PM', title: 'PyTorch Multi-Layer Perceptron Project', courseTitle: 'Machine Learning & Math', type: 'project', completed: false },
  { id: 'sch-8', date: '2026-03-25', time: '11:00 AM', title: 'Cloud Infrastructure Sprint Check-in', courseTitle: 'Production MLOps', type: 'quiz', completed: false },
];

export const INITIAL_QUIZ: QuizQuestion[] = [
  {
    id: 'quiz-1',
    question: 'What is the primary mechanism that prevents overfitting in deep neural networks when using Dropout?',
    options: [
      'Randomly deactivating neurons during forward passes forces redundant representation learning',
      'Scaling the learning rate exponentially with each epoch iteration',
      'Converting non-convex optimization problems into purely convex matrices',
      'Eliminating all negative gradient components using ReLU clipping',
    ],
    correctIndex: 0,
    explanation: 'Dropout randomly zeroes neuron activations during training with probability p, preventing co-adaptation of feature detectors and forcing the network to learn robust, generalized representations.',
    conceptTag: 'Deep Learning Regularization',
  },
  {
    id: 'quiz-2',
    question: 'In computational complexity, what is the tightest worst-case time bound for finding an element in a balanced AVL tree?',
    options: [
      'O(log n)',
      'O(n)',
      'O(n log n)',
      'O(1)',
    ],
    correctIndex: 0,
    explanation: 'Because AVL trees enforce strict height balancing (|height(left) - height(right)| <= 1), the maximum tree height is mathematically bounded by ~1.44 log2(n), guaranteeing O(log n) worst-case lookup time.',
    conceptTag: 'Data Structures & Algorithms',
  },
  {
    id: 'quiz-3',
    question: 'Which metric is most informative when evaluating a machine learning classifier on severely imbalanced fraud detection data?',
    options: [
      'Precision-Recall Area Under Curve (PR-AUC)',
      'Raw Classification Accuracy',
      'Mean Squared Error (MSE)',
      'Root Mean Logarithmic Error',
    ],
    correctIndex: 0,
    explanation: 'With heavy class skew (e.g. 99.9% negative transactions), standard accuracy produces misleadingly high scores. PR-AUC explicitly measures false positives against true positives among the rare positive class.',
    conceptTag: 'Model Evaluation Metrics',
  },
];
