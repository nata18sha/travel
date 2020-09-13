import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../shared/services/blogs.service';
import { IArticle } from '../../shared/interfaces/article.interface';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

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
          // console.log({ id, ...data })
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
          // console.log({ id, ...data })
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
