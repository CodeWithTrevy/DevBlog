export class  Post {
  id?: number;
  title: string='';
  content: string='';
  authorId?: number;
  imageUrl: string='';
  status?: string;
  readingTime?: number;
  likeCount?: number;
  userCollection?: number[];
  createdAt?: string;
  updatedAt?: string;
  showContent?: boolean;
}
