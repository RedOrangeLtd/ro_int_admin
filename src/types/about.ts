export interface HeroContent {
  heading: string | null;
  subtext: string | null;
  image: string | null;
}

export interface BannerContent {
  title: string | null;
  tagline: string | null;
}

export interface ContentBlock {
  type: string;
  heading: string;
  body: string;
}

export interface AboutRecord {
  id: number;
  title: string | null;
  description: {
    text: string | null;
  };
  hero_content: HeroContent;
  banner_content: BannerContent;
  content_blocks: ContentBlock[];
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AboutResponse {
  success: boolean;
  data: AboutRecord;
}

export interface AboutUpdateResponse {
  success: boolean;
  message: string;
  data: AboutRecord;
}

export interface AboutDeleteResponse {
  success: boolean;
  message: string;
}
