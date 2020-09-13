import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentChangeAction, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { IArticle } from '../interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private firecloud: AngularFirestore) { }

  getFireCloudBlog(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firecloud.collection('blogs').snapshotChanges();
  }
  postFireCloudBlog(article: IArticle): Promise<DocumentReference>{
    return this.firecloud.collection('blogs').add(article);
  }
  deleteFireCloudBlog(id: string): Promise<void> {
    return this.firecloud.collection('blogs').doc(id).delete();
  }
  updateFireCloudBlog(article: IArticle): Promise<void> {
    return this.firecloud.collection('blogs').doc(article.id).update(article);
  }
  getOneFireCloudLocation(id: string): any {
    return this.firecloud.collection('blogs').doc(id).get();
  }
}
