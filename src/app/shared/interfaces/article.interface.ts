export interface IArticle {
    id:string;
    title: string;
    mainImage: string;
    article:string;
    date: Date;
    comments?: Array <any>
}