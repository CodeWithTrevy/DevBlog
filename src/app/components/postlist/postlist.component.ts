import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from 'app/services/post.service';
import { Post } from 'app/posts';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  error = '';
  currentUserId = 1;

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalPosts = 0;
  hasNext = true;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
   

    this.loadPosts();
  }

  loadPosts(): void {
   if(!this.hasNext|| this.loading) return;
  this.loading = true;
  this.error = '';

  this.postService.getAllPosts(this.currentPage, this.pageSize).subscribe({
    next: (response) => {
      if (response.returnCode === 0) {
        const data = response.returnObject;

        this.posts = data.posts.map((p: Post) => ({ ...p, showContent: false }));
        this.totalPosts = data.total;
        this.totalPages = data.totalPages;
        this.currentPage = data.page;
      } else {
        this.error = response.returnMessage || 'Failed to load posts';
      }
      this.loading = false;
    },
    error: (err) => {
      console.error('Error fetching posts:', err);
      this.error = 'Error loading posts. Please try again.';
      this.loading = false;
    }
  });
}


togglePostContent(post: Post): void {
  post.showContent = !post.showContent;
}


  likePost(post: Post): void {
    if (!post.id) return;

    this.postService.likePost(post.id, this.currentUserId).subscribe({
      next: (response) => {
        if (response.returnCode=== 0) {
          post.likeCount = response.returnObject.likeCount;
          post.userCollection = response.returnObject.likedByUser
            ? [...(post.userCollection || []), this.currentUserId]
            : post.userCollection?.filter(id => id !== this.currentUserId);
        }
      },
      error: (err) => {
        console.error('Error liking post:', err);
      }
    });
  }

  isLikedByCurrentUser(post: Post): boolean {
    return post.userCollection?.includes(this.currentUserId) || false;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadPosts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPosts();
    }
  }

  getExcerpt(content: string, maxLength: number = 150): string {
    return content.length <= maxLength
      ? content
      : content.substring(0, maxLength) + '...';
  }
}
