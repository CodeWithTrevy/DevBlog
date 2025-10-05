
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';
import { PostCardComponent } from "../post-card/post-card.component";

@Component({
  selector: 'app-home-page',
  standalone:true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  imports: []
})
export class HomePageComponent implements OnInit {
  featuredPost$!: Observable<Post | undefined>;
  posts$!: Observable<Post[]>;
  trendingTags$!: Observable<string[]>;
onWritePost: any;
isLoading$: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.featuredPost$ = this.postService.getFeaturedPost();
    this.posts$ = this.postService.getPosts();
    this.trendingTags$ = this.postService.getTrendingTags();
  }
}