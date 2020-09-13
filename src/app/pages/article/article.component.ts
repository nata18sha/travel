import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { IArticle } from '../../shared/interfaces/article.interface';
import { Article } from '../../shared/models/article.model';
import { BlogsService } from 'src/app/shared/services/blogs.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: any;
  articleID:string;
  comments: Array<any> = [];
  loggedUser: boolean;
  user: any;
  singleComment: string;
  newComment: object;

  constructor(private actRoute: ActivatedRoute,
    private firecloud: AngularFirestore,
    private blogService: BlogsService) { }

  ngOnInit(): void {
    this.getViewArticle();
    this.getUserData();
  }

  private getViewArticle(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.firecloud.collection('blogs').doc(id).get().subscribe(
      document => {
        const data = document.data();
        const dataID = document.id;
        this.articleID = dataID;
        this.comments = data.comments;
        this.article = { dataID, ...data };
        // console.log(data.comments)
      }
    );
  }

  private getUserData(): void {
    if (JSON.parse(localStorage.getItem('user'))) {
      const localUser = JSON.parse(localStorage.getItem('user'));
      this.user = localUser;
      this.loggedUser = true;
      console.log('user true')
    }
    else {
      this.loggedUser = false;
      console.log('user false')
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
    )
    console.log(updateWithComment)
    console.log(updateWithComment.id)
    this.blogService.updateFireCloudBlog({ ...updateWithComment })
      .then(message => console.log(message))
      .catch(err => console.log(err));

    this.getViewArticle();
    this.singleComment = '';
  }

}
