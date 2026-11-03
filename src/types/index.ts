export type ProjectCategory =
  | "Full-Stack"
  | "AI / ML"
  | "Systems"
  | "Frontend"
  | "Backend"
  | "SaaS"
  | "fullstack"
  | "backend"
  | "creative"
  | "saas"
  | string;

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  featured: boolean;
  is_featured?: boolean;
  metrics?: Record<string, string | number>;
  githubUrl?: string;
  github_url?: string;
  liveUrl?: string;
  live_url?: string;
  imageUrl?: string;
  thumbnail_url?: string;
  viewCount?: number;
  orderIndex?: number;
  createdAt?: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  service_type?: string;
  message: string;
  created_at?: string;
}

export interface SiteAnalyticsEvent {
  id?: string;
  event_type: "page_view" | "case_study_open" | "resume_download" | string;
  target_slug?: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
}
