// ─── Types ────────────────────────────────────────────────────
export interface ChannelPodcast {
  id: string;
  slug: string;
  title: string;
  summary: string;
  thumbnail: string;
  duration: string;
  publishDate: string;
  listens: string;
  tags: string[];
  featured: boolean;
}

export interface ChannelData {
  id: string;
  slug: string;
  name: string;
  description: string;
  bannerImage: string;
  avatar: string;
  verified: boolean;
  subscriberCount: string;
  totalPodcasts: number;
  joinedDate: string;
  category: string;
  podcasts: ChannelPodcast[];
}

// ─── Mock Data ─────────────────────────────────────────────────
const CHANNEL_PODCASTS_TECHTALK: ChannelPodcast[] = [
  {
    id: 'p1',
    slug: 'ai-agents-vs-humans',
    title: 'AI Agents vs Humans in Software Engineering',
    summary: 'A deep dive into how AI coding agents are changing the landscape of software development — from pair programming to autonomous deployment pipelines.',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    duration: '1:12:30',
    publishDate: '2 days ago',
    listens: '482K',
    tags: ['AI', 'Engineering', 'Automation'],
    featured: true,
  },
  {
    id: 'p2',
    slug: 'can-gpt5-actually-think',
    title: 'Can GPT-5 Actually Think? A Deep Technical Analysis',
    summary: 'Breaking down the architecture and emergent capabilities of the latest frontier models, and what it really means for AI understanding.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    duration: '55:48',
    publishDate: '5 days ago',
    listens: '914K',
    tags: ['LLM', 'GPT-5', 'Deep Learning'],
    featured: true,
  },
  {
    id: 'p3',
    slug: 'future-of-autonomous-ai',
    title: 'The Future of Autonomous AI Systems',
    summary: 'Exploring the trajectory of agentic AI — from task automation to full autonomous systems that design and improve themselves.',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop',
    duration: '45:20',
    publishDate: '1 week ago',
    listens: '321K',
    tags: ['Agents', 'Autonomy', 'Future'],
    featured: true,
  },
  {
    id: 'p4',
    slug: 'building-billion-dollar-ai-startup',
    title: 'Building the Next Billion Dollar AI Startup',
    summary: 'Lessons from founders who built successful AI companies — from ideation and fundraising to scaling and finding product-market fit.',
    thumbnail: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=800&auto=format&fit=crop',
    duration: '1:02:15',
    publishDate: '2 weeks ago',
    listens: '671K',
    tags: ['Startups', 'Founder', 'AI Business'],
    featured: true,
  },
  {
    id: 'p5',
    slug: 'quantum-meets-ml',
    title: 'Quantum Computing Meets Machine Learning',
    summary: 'How quantum speedups could transform training large models and what hybrid quantum-classical architectures look like.',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    duration: '38:42',
    publishDate: '3 weeks ago',
    listens: '218K',
    tags: ['Quantum', 'ML', 'Research'],
    featured: false,
  },
  {
    id: 'p6',
    slug: 'ethics-of-agi',
    title: 'The Ethics of Artificial General Intelligence',
    summary: 'A philosophical and technical roundtable on alignment, safety, and the moral responsibilities of AGI labs.',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
    duration: '1:28:10',
    publishDate: '1 month ago',
    listens: '543K',
    tags: ['Ethics', 'AGI', 'Safety'],
    featured: false,
  },
  {
    id: 'p7',
    slug: 'neural-networks-zero-to-hero',
    title: 'Neural Networks Explained: From Zero to Hero',
    summary: 'A comprehensive breakdown of neural architectures — from perceptrons to transformers — designed for curious minds at any level.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    duration: '2:05:40',
    publishDate: '1 month ago',
    listens: '1.2M',
    tags: ['Education', 'Neural Nets', 'Beginner'],
    featured: false,
  },
  {
    id: 'p8',
    slug: 'real-time-ai-edge-inference',
    title: 'Real-Time AI: Edge Computing & Inference',
    summary: 'How AI is being pushed to the edge — running models on devices without cloud dependency for latency-critical applications.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    duration: '41:05',
    publishDate: '6 weeks ago',
    listens: '289K',
    tags: ['Edge AI', 'Inference', 'Hardware'],
    featured: false,
  },
];

const CHANNEL_PODCASTS_NEURO: ChannelPodcast[] = [
  {
    id: 'n1',
    slug: 'rise-of-multimodal-ai',
    title: 'The Rise of Multimodal AI Models',
    summary: 'From vision-language models to audio-text integration — how AI is learning to perceive the world the way humans do.',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    duration: '52:18',
    publishDate: '1 day ago',
    listens: '387K',
    tags: ['Multimodal', 'Vision', 'NLP'],
    featured: true,
  },
  {
    id: 'n2',
    slug: 'cybersecurity-ai-attacks',
    title: 'Cybersecurity in the Age of AI Attacks',
    summary: 'How AI is being weaponized by threat actors and what defenders are building to fight back in the emerging AI arms race.',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop',
    duration: '34:10',
    publishDate: '4 days ago',
    listens: '241K',
    tags: ['Cybersecurity', 'AI Attacks', 'Defense'],
    featured: true,
  },
  {
    id: 'n3',
    slug: 'open-source-vs-closed-models',
    title: 'Open Source AI vs Closed Models: The Great Debate',
    summary: 'Exploring the trade-offs between open-source community AI and proprietary frontier models — who wins and what it means for society.',
    thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop',
    duration: '1:15:22',
    publishDate: '1 week ago',
    listens: '729K',
    tags: ['Open Source', 'Policy', 'Community'],
    featured: true,
  },
  {
    id: 'n4',
    slug: 'ai-climate-solutions',
    title: 'AI-Powered Climate Solutions That Actually Work',
    summary: 'A look at real-world AI deployments tackling carbon capture, energy optimization, and climate modeling challenges.',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
    duration: '48:33',
    publishDate: '10 days ago',
    listens: '312K',
    tags: ['Climate', 'AI for Good', 'Sustainability'],
    featured: true,
  },
];

// ─── Channels Registry ─────────────────────────────────────────
const CHANNELS: ChannelData[] = [
  {
    id: 'ch-techtalk',
    slug: 'techtalk-ai',
    name: 'TechTalk AI',
    description: 'Deep technical conversations at the intersection of artificial intelligence, software engineering, and the future of human-computer interaction. Hosted by researchers, builders, and thinkers shaping the AI frontier.',
    bannerImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1800&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/150?img=11',
    verified: true,
    subscriberCount: '4.2M',
    totalPodcasts: 87,
    joinedDate: 'March 2023',
    category: 'AI & Technology',
    podcasts: CHANNEL_PODCASTS_TECHTALK,
  },
  {
    id: 'ch-neuro',
    slug: 'neurotalks',
    name: 'NeuroTalks',
    description: 'Where neuroscience meets artificial intelligence. Exploring brain-inspired computing, consciousness research, and the emerging science of machine cognition.',
    bannerImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1800&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/150?img=12',
    verified: true,
    subscriberCount: '3.1M',
    totalPodcasts: 54,
    joinedDate: 'June 2023',
    category: 'Neuroscience & AI',
    podcasts: CHANNEL_PODCASTS_NEURO,
  },
  {
    id: 'ch-synthetic',
    slug: 'synthetic-minds',
    name: 'Synthetic Minds',
    description: 'Exploring the philosophical, technical, and societal implications of building minds in silicon. Long-form conversations with the brightest thinkers in AI alignment and safety.',
    bannerImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1800&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/150?img=13',
    verified: true,
    subscriberCount: '2.8M',
    totalPodcasts: 62,
    joinedDate: 'January 2024',
    category: 'Philosophy & AI',
    podcasts: [],
  },
];

// ─── Helper Functions ──────────────────────────────────────────
export function getChannelBySlug(slug: string): ChannelData | undefined {
  return CHANNELS.find(c => c.slug === slug);
}

export function getAllChannelSlugs(): string[] {
  return CHANNELS.map(c => c.slug);
}

export { CHANNELS };
