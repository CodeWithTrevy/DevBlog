export interface Post {
  readingTime: number;
  id: number;
  title: string;
  slug: string; 
  coverImage: string; 
  excerpt: string;
  content: string; 
  author: {
    id: number;
    name: string;
    profilePicture: string;
  };
  tags: string[];
  publishedAt: Date;
  reactions: number;
  comments: number;
}