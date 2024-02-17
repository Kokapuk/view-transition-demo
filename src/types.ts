export interface PexelPhoto {
  id: number;
  photographer: string;
  photographer_url: string;
  alt: string;
  url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

export interface PexelResponse {
  photos: PexelPhoto[];
}
