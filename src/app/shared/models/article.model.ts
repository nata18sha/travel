import { IArticle } from '../interfaces/article.interface';
export class Article implements IArticle {
    constructor(public id: string,
        public title: string,
        public mainImage: string,
        public article: string,
        public date: Date,
        public comments?: Array<any>

    ) {

    }
}