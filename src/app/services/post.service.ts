import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private mockPosts: Post[] = [
    {
      id: 1,
      title: 'Getting Started with Angular 16',
      slug: 'getting-started-angular-16',
      coverImage: 'https://picsum.photos/id/1018/600/300',
      excerpt: 'Angular 16 brings exciting new features and performance improvements. Dive into this guide to get up and running quickly.',
      content: 'Full content of post 1...',
      author: { id: 101, name: 'Alice Smith', profilePicture: 'https://i.pravatar.cc/50?img=1' },
      tags: ['angular', 'frontend', 'webdev'],
      publishedAt: new Date('2023-10-26T10:00:00Z'),
      reactions: 125,
      comments: 15,
      readingTime: 0
    },
    {
      id: 2,
      title: 'CSS Grid vs Flexbox: When to Use What',
      slug: 'css-grid-flexbox-guide',
      coverImage: 'https://picsum.photos/id/1025/600/300',
      excerpt: 'Understanding the differences between CSS Grid and Flexbox is crucial for modern web layouts. Learn the best practices.',
      content: 'Full content of post 2...',
      author: { id: 102, name: 'Bob Johnson', profilePicture: 'https://i.pravatar.cc/50?img=2' },
      tags: ['css', 'layout', 'webdesign'],
      publishedAt: new Date('2023-10-25T14:30:00Z'),
      reactions: 88,
      comments: 8,
      readingTime: 0
    },
    {
      id: 3,
      title: 'Building RESTful APIs with Node.js and Express',
      slug: 'nodejs-express-rest-api',
      coverImage: 'https://picsum.photos/id/1033/600/300',
      excerpt: 'A comprehensive guide to building robust and scalable RESTful APIs using Node.js and the Express framework.',
      content: 'Full content of post 3...',
      author: { id: 103, name: 'Charlie Brown', profilePicture: 'https://i.pravatar.cc/50?img=3' },
      tags: ['nodejs', 'backend', 'api'],
      publishedAt: new Date('2023-10-24T09:15:00Z'),
      reactions: 210,
      comments: 22,
      readingTime: 0
    },
    {
      id: 4,
      title: 'Understanding Reactive Programming with RxJS',
      slug: 'rxjs-reactive-programming',
      coverImage: 'https://picsum.photos/id/1041/600/300',
      excerpt: 'RxJS is a powerful library for reactive programming. Learn about Observables, Operators, and how to manage asynchronous data streams.',
      content: 'Full content of post 4...',
      author: { id: 101, name: 'Alice Smith', profilePicture: 'https://i.pravatar.cc/50?img=1' },
      tags: ['rxjs', 'angular', 'javascript'],
      publishedAt: new Date('2023-10-23T11:45:00Z'),
      reactions: 95,
      comments: 11,
      readingTime: 0
    }
  ];

  constructor() { }

  getPosts(): Observable<Post[]> {
    // In a real application, you would use HttpClient here:
    // return this.http.get<Post[]>('/api/posts');
    return of(this.mockPosts); // Return mock data for now
  }

  getFeaturedPost(): Observable<Post | undefined> {
    // For simplicity, let's just pick the first post as featured
    return of(this.mockPosts[0]);
  }

  getTrendingTags(): Observable<string[]> {
    // Extract unique tags from mock posts and return a few
    const allTags = this.mockPosts.flatMap(post => post.tags);
    const uniqueTags = Array.from(new Set(allTags));
    return of(uniqueTags.slice(0, 5)); // Return top 5 unique tags
  }
}