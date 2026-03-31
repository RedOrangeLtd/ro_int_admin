export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  id?: number;
  site_name: string;
  site_email: string;
  phone_number: string;
  address: string;
  site_logo: string | File | null;
  favicon: string | File | null;
  gtm_id: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  footer_text: string;
  social_links: SocialLink[];
  created_at?: string;
  updated_at?: string;
}

export interface SiteSettingsResponse {
  success: boolean;
  data: SiteSettings;
  message?: string;
}
