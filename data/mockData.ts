import { LinkItem, ChartDataPoint, User } from '../types';

const users: User[] = [
  { id: 'u1', name: 'Alex River', avatar: 'https://picsum.photos/seed/u1/32/32' },
  { id: 'u2', name: 'Jordan Lee', avatar: 'https://picsum.photos/seed/u2/32/32' },
  { id: 'u3', name: 'Casey Smith', avatar: 'https://picsum.photos/seed/u3/32/32' },
];

export const MOCK_LINKS: LinkItem[] = [
  {
    id: '1',
    title: 'The Future of React Server Components',
    url: 'https://react.dev/blog',
    domain: 'react.dev',
    description: 'An in-depth look at how RSCs are changing the landscape of modern web development and what it means for hydration.',
    votes: 124,
    author: users[0],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    tags: ['React', 'Frontend'],
    topic: 'Technology',
    comments: [
      { id: 'c1', author: users[1], text: 'Great read! The hydration parts were tricky but this explains it well.', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
      { id: 'c2', author: users[2], text: 'I still prefer client-side fetching for small apps.', timestamp: new Date(Date.now() - 1000 * 60 * 10) },
    ]
  },
  {
    id: '2',
    title: 'Tailwind CSS v4.0 Alpha Release Notes',
    url: 'https://tailwindcss.com',
    domain: 'tailwindcss.com',
    description: 'The new engine is written in Rust and is incredibly fast. Here is what you need to know about the upgrade path.',
    votes: 89,
    author: users[1],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    tags: ['CSS', 'Design'],
    topic: 'Design',
    comments: []
  },
  {
    id: '3',
    title: 'Understanding Distributed Systems Patterns',
    url: 'https://martinfowler.com',
    domain: 'martinfowler.com',
    description: 'Key patterns for building resilient distributed systems, including Circuit Breaker and Bulkhead.',
    votes: 256,
    author: users[2],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    tags: ['System Design', 'Backend'],
    topic: 'Technology',
    comments: [
      { id: 'c3', author: users[0], text: 'Classic reference. Must read for seniors.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12) }
    ]
  },
  {
    id: '4',
    title: 'Why minimalist design is making a comeback',
    url: 'https://uxdesign.cc',
    domain: 'uxdesign.cc',
    votes: 45,
    author: users[0],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    tags: ['UX', 'Design'],
    topic: 'Design',
    comments: []
  },
  {
    id: '5',
    title: 'TypeScript 5.4: NoInference Utility Type',
    url: 'https://devblogs.microsoft.com/typescript',
    domain: 'microsoft.com',
    votes: 112,
    author: users[1],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    tags: ['TypeScript', 'Programming'],
    topic: 'Technology',
    comments: []
  }
];

export const ANALYTICS_DATA: ChartDataPoint[] = [
  { name: 'Mon', activeUsers: 40, votes: 24 },
  { name: 'Tue', activeUsers: 30, votes: 13 },
  { name: 'Wed', activeUsers: 20, votes: 98 },
  { name: 'Thu', activeUsers: 27, votes: 39 },
  { name: 'Fri', activeUsers: 18, votes: 48 },
  { name: 'Sat', activeUsers: 23, votes: 38 },
  { name: 'Sun', activeUsers: 34, votes: 43 },
];