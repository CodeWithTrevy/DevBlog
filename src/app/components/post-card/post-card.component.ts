import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() post!: Post;
  @Input() featured: boolean = false;
  @Input() maxTagsToShow: number = 4;

  @Output() bookmarkToggled = new EventEmitter<Post>();
  @Output() reactionToggled = new EventEmitter<Post>();
  @Output() shareClicked = new EventEmitter<Post>();

  defaultCoverImage = 'assets/images/default-cover.jpg';
  defaultAvatar = 'assets/images/default-avatar.jpg';
  
  isBookmarked: boolean = false;
  hasReacted: boolean = false;

   get readingTime(): number {
    return this.post?.readingTime || 0;
  }

  /**
   * Handle cover image load error
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultCoverImage;
  }

  /**
   * Handle avatar image load error
   */
  onAvatarError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultAvatar;
  }

  /**
   * Toggle bookmark status
   */
  onToggleBookmark(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isBookmarked = !this.isBookmarked;
    this.bookmarkToggled.emit(this.post);
  }

  /**
   * Toggle reaction status
   */
  onToggleReaction(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.hasReacted = !this.hasReacted;
    this.reactionToggled.emit(this.post);
  }

  /**
   * Share post
   */
  onShare(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: this.post.title,
        text: this.post.excerpt,
        url: `${window.location.origin}/posts/${this.post.slug}`
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: Copy to clipboard
      this.copyToClipboard(`${window.location.origin}/posts/${this.post.slug}`);
    }
    
    this.shareClicked.emit(this.post);
  }

  /**
   * Copy text to clipboard
   */
  private copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }

  /**
   * TrackBy function for tags
   */
  trackByTag(index: number, tag: string): string {
    return tag;
  }
}