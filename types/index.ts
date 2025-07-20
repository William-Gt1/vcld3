export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  created_at: string;
  updated_at: string;
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  avatar_url: string;
  specialties: string[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  course_id: string;
  order: number;
} 