import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { IArticle } from '../../shared/interfaces/article.interface';
import { Article } from '../../shared/models/article.model';
import { BlogsService } from 'src/app/shared/services/blogs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  defaultImage = 'https://www.placecage.com/1000/1000';

  article: any;
  articleID:string;
  comments: Array<any> = [];
  loggedUser: boolean;
  user: any;
  singleComment: string;
  newComment: object;

  constructor(private actRoute: ActivatedRoute,
              private firecloud: AngularFirestore,
              private blogService: BlogsService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getViewArticle();
    this.getUserData();
  }

  private getViewArticle(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.blogService.getOneFireCloudBlog(id).subscribe(
        document => {
          const data = document.data();
          const dataID = document.id;
          this.articleID = dataID;
          this.comments = data.comments;
          this.article = { dataID, ...data };
        }
      );
  }

  private getUserData(): void {
    if (JSON.parse(localStorage.getItem('user'))) {
      const localUser = JSON.parse(localStorage.getItem('user'));
      this.user = localUser;
      this.loggedUser = true;
    }
    else {
      this.loggedUser = false;
    }
  }

  addComment(): void {
    this.newComment = {
      text: this.singleComment,
      date: new Date,
      user: this.user
    }
    this.comments.push(this.newComment);
   
    const updateWithComment = new Article(
      this.articleID,
      this.article.title,
      this.article.mainImage,
      this.article.article,
      this.article.date,
      this.comments
    );

    this.blogService.updateFireCloudBlog({ ...updateWithComment })
      .then(message => this.toastr.success('Comment added!'))
      .catch(err => console.log(err));


    this.getViewArticle();
    this.singleComment = '';
  }

}
