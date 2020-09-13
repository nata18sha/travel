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
    // backgroundColor: 'blue'
  }
  // config = {
  //     imageResize: {
  //       displaySize: true
  //     },
  //    toolbar: [
  //      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  //      ['bold', 'italic', 'underline', 'strike'],
  //      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  //      [{ 'color': [] }, { 'background': [] }], 
  //      [{ 'align': [] }],
  //      ['link', 'image'],
  //      ['clean']  
  //    ]
  
  // }

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




  constructor(private modalService: BsModalService,
    private afStorage: AngularFireStorage,
    private blogService: BlogsService,
    private orderPipe: OrderPipe) { 
      this.sortedCollection = orderPipe.transform(this.blogs, 'info.name');
    // console.log(this.sortedCollection);
    }

  ngOnInit(): void {
    this.adminFireCloudLocations();
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)});
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
      'editor': new FormControl(null)});
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
          console.log({ id, ...data })
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
        console.log(this.mainImage)
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
  editArticle(article: IArticle, template: TemplateRef<any>):void {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' });
    this.editStatus = true;
    this.imageStatus = true;
    this.articleID = article.id;
    this.title = article.title;
    this.mainImage = article.mainImage;
    this.editorForm = new FormGroup({
      'editor': new FormControl(article.article)});
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

  deleteArticle(article: IArticle): void {
    console.log(article.id)
    if (confirm('Are you sure you want to delete this item?')) {
      this.blogService.deleteFireCloudBlog(article.id)
        .then(message => console.log(message))
        .catch(err => console.log(err));
      const index = this.blogs.findIndex(elem => elem.id === article.id);
      this.afStorage.storage.refFromURL(this.blogs[index].mainImage).delete();
    }


  }





  // onSubmit(): void {
  //   this.editorContent = this.editorForm.get('editor').value;
  //   console.log(this.editorForm.get('editor').value);
  // }
}
