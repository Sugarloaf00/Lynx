export interface User {
  id: string;
  name: string;
  avatar: string;
  isPro: boolean;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  timestamp: Date;
  replies?: Comment[];
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  domain: string;
  description?: string;
  votes: number;
  author: User;
  timestamp: Date;
  comments: Comment[];
  tags: string[];
  topic: string;
}

export interface ChartDataPoint {
  name: string;
  activeUsers: number;
  votes: number;
}

export type SortOption = 'popular' | 'newest' | 'discussed';