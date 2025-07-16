export interface GiphyImage {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size?: string;
  mp4?: string;
  webp_size?: string;
  webp?: string;
  frames?: string;
  hash?: string;
}

export interface GiphyImages {
  original: GiphyImage;
  fixed_height: GiphyImage;
  fixed_height_downsampled: GiphyImage;
  fixed_height_small: GiphyImage;
  fixed_width: GiphyImage;
  fixed_width_downsampled: GiphyImage;
  fixed_width_small: GiphyImage;
}

export interface GiphyAnalyticsEvent {
  url: string;
}

export interface GiphyAnalytics {
  onload: GiphyAnalyticsEvent;
  onclick: GiphyAnalyticsEvent;
  onsent: GiphyAnalyticsEvent;
}

export interface GiphyUser {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}

export interface GiphyData {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  source_caption?: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: GiphyImages;
  user?: GiphyUser;
  analytics_response_payload: string;
  analytics: GiphyAnalytics;
  alt_text: string;
  is_low_contrast: boolean;
}

export interface GiphyMeta {
  status: number;
  msg: string;
  response_id: string;
}

export interface GiphyPagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface GiphyResponse {
  data: GiphyData[];
  meta: GiphyMeta;
  pagination: GiphyPagination;
}
