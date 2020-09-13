import { Pipe, PipeTransform } from '@angular/core';
import { IArticle } from '../interfaces/article.interface';

@Pipe({
  name: 'searchBlog'
})
export class SearchBlogPipe implements PipeTransform {

  transform(value: Array<IArticle>, searchParam: string): Array<IArticle> {
    if (!searchParam) {
      return value;
    }
    if (!value) {
      return null;
    }
    return value.filter(article => article.title.toLowerCase().includes(searchParam.toLowerCase()) ||
    article.article.toLowerCase().includes(searchParam.toLowerCase())

    );
  }
}
