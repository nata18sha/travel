import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderPipe } from 'ngx-order-pipe';
import { IArticle } from '../../shared/interfaces/article.interface';
import { Article } from '../../shared/models/article.model';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { BlogsService } from '../../shared/services/blogs.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {

  modalRef: BsModalRef;

  editorForm: FormGroup;
  editorContent: string;
  editorStyle = {
    height: '300px',
  }


  editStatus = false;
  imageStatus = false;

  order: string = 'info.name';
  reverse: boolean = false;
  sortedCollection: Array<IArticle>;


  blogs: Array<IArticle> = [];
  articleID: string = '1';
  title: string;
  mainImage: string;
  comments = [];
  uploadProgress: Observable<number>;

  searchName: string;

  deleteById: string;




  constructor(private modalService: BsModalService,
    private afStorage: AngularFireStorage,
    private blogService: BlogsService,
    private orderPipe: OrderPipe) {
    this.sortedCollection = orderPipe.transform(this.blogs, 'info.name');
  }

  ngOnInit(): void {
    this.adminFireCloudLocations();
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' });
  }
  openToAddModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' });
    this.editStatus = false;
    this.imageStatus = false;
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
    this.title = '';
    this.mainImage = '';
    this.articleID = '';
  }
  private adminFireCloudLocations(): void {
    this.blogService.getFireCloudBlog().subscribe(
      collection => {
        this.blogs = collection.map(document => {
          const data = document.payload.doc.data() as IArticle;
          const id = document.payload.doc.id;
          return { id, ...data };
        });

      }
    );
  }
  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/${name}.${type}`;
    const upload = this.afStorage.upload(filePath, file);
    this.uploadProgress = upload.percentageChanges();
    upload.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.mainImage = url;
        this.imageStatus = true;
      });
    });
  }
  deleteMainImage(): void {
    this.afStorage.storage.refFromURL(this.mainImage).delete();
    this.imageStatus = false;
  }

  addBlog(): void {
    const newBlog = new Article(
      this.articleID,
      this.title,
      this.mainImage,
      this.editorForm.get('editor').value,
      new Date(),
      this.comments
    );
    delete newBlog.id;
    this.blogService.postFireCloudBlog({ ...newBlog })
      .then(message => console.log(message))
      .catch(err => console.log(err));
    this.modalRef.hide();
  }
  editArticle(article: IArticle, template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' });
    this.editStatus = true;
    this.imageStatus = true;
    this.articleID = article.id;
    this.title = article.title;
    this.mainImage = article.mainImage;
    this.editorForm = new FormGroup({
      'editor': new FormControl(article.article)
    });
    this.comments = article.comments;

  }
  updateArticle(): void {
    const newBlog = new Article(
      this.articleID,
      this.title,
      this.mainImage,
      this.editorForm.get('editor').value,
      new Date(),
      this.comments
    );

    this.blogService.updateFireCloudBlog({ ...newBlog })
      .then(message => console.log(message))
      .catch(err => console.log(err));

    this.modalRef.hide();
  }

  deleteArticle(article: IArticle, template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.deleteById = article.id;

  }

  confirmDelete(): void {
    this.blogService.deleteFireCloudBlog(this.deleteById)
      .then(message => console.log(message))
      .catch(err => console.log(err));
    const index = this.blogs.findIndex(elem => elem.id === this.deleteById);
    this.afStorage.storage.refFromURL(this.blogs[index].mainImage).delete();
    this.modalRef.hide();
    this.deleteById = null;
  }
  declineDelete(): void {
    this.modalRef.hide();
    this.deleteById = null;
  }


}
