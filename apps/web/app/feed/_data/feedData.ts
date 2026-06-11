// ─── Types ────────────────────────────────────────────────────
export type BadgeType = 'trending' | 'live' | 'ai-generated' | 'new-episode';

export interface PodcastPreview {
  id: number;
  slug: string;
  title: string;
  channelName: string;
  channelAvatar: string;
  channelVerified: boolean;
  subscriberCount: string;
  thumbnail: string;
  previewVideo: string;
  views: string;
  likes: string;
  duration: string;
  uploadDate: string;
  category: string;
  badges: BadgeType[];
  description: string;
  tags: string[];
}

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
}

export interface RelatedPodcast {
  id: number;
  slug: string;
  title: string;
  channelName: string;
  thumbnail: string;
  views: string;
  duration: string;
}

// ─── Mock Podcasts ────────────────────────────────────────────
const THUMBNAILS = [
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop',
];

const PREVIEW_VIDEOS = [
  'https://cdn.pixabay.com/video/2024/02/12/200255-912195043_large.mp4',
  'https://cdn.pixabay.com/video/2023/09/23/182037-867576120_large.mp4',
  'https://cdn.pixabay.com/video/2023/10/15/185068-875719498_large.mp4',
  'https://cdn.pixabay.com/video/2024/05/31/214751_large.mp4',
];

const TITLES = [
  'AI Agents vs Humans in Software Engineering',
  'Can GPT-5 Actually Think? A Deep Technical Analysis',
  'The Future of Autonomous AI Systems',
  'Building the Next Billion Dollar AI Startup',
  'Quantum Computing Meets Machine Learning',
  'How AI is Revolutionizing Drug Discovery',
  'The Ethics of Artificial General Intelligence',
  'Neural Networks Explained: From Zero to Hero',
  'Real-Time AI: Edge Computing & Inference',
  'The Rise of Multimodal AI Models',
  'Cybersecurity in the Age of AI Attacks',
  'Open Source AI vs Closed Models: The Great Debate',
  'AI-Powered Climate Solutions That Actually Work',
  'The Economics of Large Language Models',
  'Brain-Computer Interfaces: Science or Sci-Fi?',
  'DeepFakes, Trust, and the Future of Truth',
  'Robotics Renaissance: AI in Physical World',
  'How to Build an AI Product from Scratch',
  'The Attention Economy and Algorithmic Feeds',
  'AI in Education: Personalized Learning at Scale',
  'Synthetic Data: Training AI Without Real Data',
  'AI Alignment: Solving the Control Problem',
  'The State of Computer Vision in 2026',
  'Voice AI: Beyond Siri and Alexa',
];

const CHANNELS = [
  { name: 'TechTalk AI', avatar: 'https://i.pravatar.cc/150?img=11', verified: true, subscribers: '4.2M' },
  { name: 'NeuroTalks', avatar: 'https://i.pravatar.cc/150?img=12', verified: true, subscribers: '3.1M' },
  { name: 'Synthetic Minds', avatar: 'https://i.pravatar.cc/150?img=13', verified: true, subscribers: '2.8M' },
  { name: 'The AI Report', avatar: 'https://i.pravatar.cc/150?img=14', verified: false, subscribers: '1.5M' },
  { name: 'Deep Learning Lab', avatar: 'https://i.pravatar.cc/150?img=15', verified: true, subscribers: '890K' },
  { name: 'Future Stack', avatar: 'https://i.pravatar.cc/150?img=16', verified: true, subscribers: '2.1M' },
  { name: 'CodeCast AI', avatar: 'https://i.pravatar.cc/150?img=17', verified: false, subscribers: '670K' },
  { name: 'Silicon Conversations', avatar: 'https://i.pravatar.cc/150?img=18', verified: true, subscribers: '1.9M' },
];

const CATEGORIES = ['Technology', 'AI', 'Science', 'Startups', 'Business', 'Education'];
const DATES = ['2 hours ago', '5 hours ago', '1 day ago', '2 days ago', '3 days ago', '1 week ago', '2 weeks ago'];
const DURATIONS = ['18:42', '24:10', '32:55', '45:20', '1:12:30', '28:17', '41:05', '55:48', '34:10', '22:33'];

const BADGE_SETS: BadgeType[][] = [
  ['trending'],
  ['ai-generated'],
  ['live'],
  ['new-episode'],
  ['trending', 'ai-generated'],
  [],
  ['ai-generated'],
  [],
  ['trending'],
  ['new-episode', 'ai-generated'],
  [],
  ['trending'],
];

function generateViews(): string {
  const n = Math.floor(Math.random() * 900 + 100);
  return n >= 1000 ? `${(n / 1000).toFixed(1)}M` : `${n}K`;
}

function generateLikes(): string {
  const n = Math.floor(Math.random() * 90 + 5);
  return `${n}K`;
}

export const ALL_PODCASTS: PodcastPreview[] = TITLES.map((title, i) => {
  const channel = CHANNELS[i % CHANNELS.length];
  return {
    id: i + 1,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title,
    channelName: channel.name,
    channelAvatar: channel.avatar,
    channelVerified: channel.verified,
    subscriberCount: channel.subscribers,
    thumbnail: THUMBNAILS[i % THUMBNAILS.length],
    previewVideo: PREVIEW_VIDEOS[i % PREVIEW_VIDEOS.length],
    views: generateViews(),
    likes: generateLikes(),
    duration: DURATIONS[i % DURATIONS.length],
    uploadDate: DATES[i % DATES.length],
    category: CATEGORIES[i % CATEGORIES.length],
    badges: BADGE_SETS[i % BADGE_SETS.length],
    description: `An in-depth exploration of "${title}". Join ${channel.name} as they break down the latest developments, interview leading experts, and analyze the implications for the future of technology and society. This episode covers cutting-edge research, real-world applications, and predictions for what's coming next.\n\nTopics discussed:\n• Latest breakthroughs and research papers\n• Industry trends and market analysis\n• Expert interviews and debates\n• Practical takeaways and actionable insights\n• Future predictions and emerging opportunities`,
    tags: ['#AI', '#Technology', '#Future', '#Innovation', '#DeepLearning', '#MachineLearning'],
  };
});

// ─── Helper Functions ─────────────────────────────────────────
export function getPodcastBySlug(slug: string): PodcastPreview | undefined {
  return ALL_PODCASTS.find(p => p.slug === slug);
}

export function getRelatedPodcasts(currentSlug: string, count: number = 12): RelatedPodcast[] {
  return ALL_PODCASTS
    .filter(p => p.slug !== currentSlug)
    .slice(0, count)
    .map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      channelName: p.channelName,
      thumbnail: p.thumbnail,
      views: p.views,
      duration: p.duration,
    }));
}

export function getPodcastComments(): Comment[] {
  return [
    {
      id: 1,
      author: 'Alex Chen',
      avatar: 'https://i.pravatar.cc/150?img=20',
      content: 'This is one of the best AI discussions I\'ve heard. The part about emergent behavior in large language models was absolutely fascinating. Would love to see a follow-up episode diving deeper into the alignment problem.',
      timestamp: '2 hours ago',
      likes: 342,
      isLiked: false,
      replies: [
        {
          id: 11,
          author: 'Dr. Sarah Lin',
          avatar: 'https://i.pravatar.cc/150?img=21',
          content: 'Completely agree! The alignment discussion was the highlight for me. The analogy about "teaching values vs. teaching rules" really clicked.',
          timestamp: '1 hour ago',
          likes: 89,
          isLiked: false,
          replies: [],
        },
      ],
    },
    {
      id: 2,
      author: 'Marcus Rivera',
      avatar: 'https://i.pravatar.cc/150?img=22',
      content: 'The production quality of ConvoAI podcasts keeps getting better. The way the AI hosts pick up on nuance and context is impressive.',
      timestamp: '5 hours ago',
      likes: 218,
      isLiked: false,
      replies: [],
    },
    {
      id: 3,
      author: 'Priya Patel',
      avatar: 'https://i.pravatar.cc/150?img=23',
      content: 'Timestamp 24:10 — the debate about whether current LLMs have any form of "understanding" vs pure pattern matching was incredible. Both sides made compelling points.',
      timestamp: '1 day ago',
      likes: 156,
      isLiked: false,
      replies: [
        {
          id: 31,
          author: 'Jake Thompson',
          avatar: 'https://i.pravatar.cc/150?img=24',
          content: 'That was my favorite part too! I think the truth is somewhere in between — emergent understanding through sophisticated pattern matching.',
          timestamp: '20 hours ago',
          likes: 67,
          isLiked: false,
          replies: [],
        },
        {
          id: 32,
          author: 'Elena Volkov',
          avatar: 'https://i.pravatar.cc/150?img=25',
          content: 'This reminds me of the Chinese Room argument. Are we just getting better at building rooms?',
          timestamp: '18 hours ago',
          likes: 45,
          isLiked: false,
          replies: [],
        },
      ],
    },
    {
      id: 4,
      author: 'David Kim',
      avatar: 'https://i.pravatar.cc/150?img=26',
      content: 'Been waiting for this episode! Quick question — are you planning to cover the latest developments in multimodal AI? The recent papers from Google DeepMind have been groundbreaking.',
      timestamp: '2 days ago',
      likes: 94,
      isLiked: false,
      replies: [],
    },
    {
      id: 5,
      author: 'Sophia Nakamura',
      avatar: 'https://i.pravatar.cc/150?img=27',
      content: 'The way this platform generates podcast conversations is genuinely next-level. I\'ve been recommending ConvoAI to everyone in my lab. The depth of technical discussion rivals real expert panels.',
      timestamp: '3 days ago',
      likes: 287,
      isLiked: false,
      replies: [],
    },
  ];
}

// ─── Filter Categories ────────────────────────────────────────
export const FEED_FILTERS = [
  'For You',
  'Trending',
  'Live',
  'AI Generated',
  'Technology',
  'Startups',
  'Business',
  'Science',
  'Education',
] as const;

export type FeedFilter = typeof FEED_FILTERS[number];

// ─── Paginated Fetch Simulation ───────────────────────────────
export function getFeedPage(page: number, pageSize: number = 12, filter?: FeedFilter): {
  podcasts: PodcastPreview[];
  hasMore: boolean;
} {
  let filtered = ALL_PODCASTS;

  if (filter && filter !== 'For You') {
    switch (filter) {
      case 'Trending':
        filtered = ALL_PODCASTS.filter(p => p.badges.includes('trending'));
        break;
      case 'Live':
        filtered = ALL_PODCASTS.filter(p => p.badges.includes('live'));
        break;
      case 'AI Generated':
        filtered = ALL_PODCASTS.filter(p => p.badges.includes('ai-generated'));
        break;
      default:
        filtered = ALL_PODCASTS.filter(p => p.category === filter);
        break;
    }
  }

  // Duplicate data to simulate infinite content
  const expandedList: PodcastPreview[] = [];
  for (let cycle = 0; cycle < 10; cycle++) {
    filtered.forEach((p, i) => {
      expandedList.push({
        ...p,
        id: cycle * 1000 + p.id,
        slug: `${p.slug}-${cycle > 0 ? cycle : ''}`.replace(/-$/, ''),
      });
    });
  }

  const start = page * pageSize;
  const end = start + pageSize;
  const podcasts = expandedList.slice(start, end);

  return {
    podcasts,
    hasMore: end < expandedList.length,
  };
}
