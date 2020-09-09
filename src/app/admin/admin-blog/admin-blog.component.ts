import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  editorForm: FormGroup;
  editorContent: string;
  editorStyle = {
    height: '300px',
    backgroundColor: 'blue'
  }
  // config = {
  //   toolbar: [
  //     ['bold', 'italic', 'underline', 'strike'],
  //     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  //   ]
  // }

  constructor() { }

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor':new FormControl(null)
    })
  }


  onSubmit():void {
    this.editorContent = this.editorForm.get('editor').value;
    console.log(this.editorForm.get('editor').value)
  }
}
