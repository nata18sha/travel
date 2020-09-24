import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../shared/services/blogs.service';
import { IArticle } from '../../shared/interfaces/article.interface';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  defaultImage = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2Fnoimage.jpg?alt=media&token=9a954c2c-65f0-49c8-8b9c-687a4d70dfe5';


  allArticles: Array<IArticle> = [];
  recentArticles: Array<IArticle> = [];
  sliceNumber = 5;
  showLoadButton = true;

  constructor(private blogService: BlogsService) { }

  ngOnInit(): void {
    this.adminFireCloudBlogs();
    this.getRecentFireCloudBlogs();
  }


  private adminFireCloudBlogs(): void {
    this.blogService.getFireCloudBlog().subscribe(
      collection => {
        this.allArticles = collection.map(document => {
          const data = document.payload.doc.data() as IArticle;
          const id = document.payload.doc.id;
          return { id, ...data };
        });

      }
    );
  }
  private getRecentFireCloudBlogs(): void {
    this.blogService.getFireCloudBlog().subscribe(
      collection => {
        this.recentArticles = collection.map(document => {
          const data = document.payload.doc.data() as IArticle;
          const id = document.payload.doc.id;
          return { id, ...data };
        });

      }
    );
  }

  loadMore(): void {
    this.sliceNumber += 3;
    if (this.sliceNumber < this.allArticles.length) {
      this.showLoadButton = true;
    }
    else this.showLoadButton = false;
  }

}
