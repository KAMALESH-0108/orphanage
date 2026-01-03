export interface Orphanage {
  id: string;
  name: string;
  location: string;
  description: string;
  needs: string[];
  image?: string;
  verified: boolean;
}

export interface DonationCategory {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon name
  color: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  iconName: string;
}
