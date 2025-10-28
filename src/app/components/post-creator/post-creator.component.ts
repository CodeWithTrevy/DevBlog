import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-post-creator',
    imports: [CommonModule, FormsModule],
    templateUrl: './post-creator.component.html',
    styleUrls: ['./post-creator.component.css']
})
export class PostCreatorComponent {
  activeTab: 'edit' | 'preview' = 'edit';
  postTitle: string = '';
  postContent: string = '';
  tags: string[] = ['webdev', 'begi', 'java', 'Ang'];
  tagInput: string = '';
  coverImageUrl: string | null = null;

}