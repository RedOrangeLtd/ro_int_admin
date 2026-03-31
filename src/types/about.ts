export interface HeroContent {
  heading: string | null;
  subtext: string | null;
  image: File | string | null;
}

export interface AboutRecord {
  id: number;
  title: string | null;
  description: {
    text: string | null;
  };
  hero_content: HeroContent;
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
