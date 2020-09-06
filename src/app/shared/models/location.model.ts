import { ILocation } from '../interfaces/location.interface';
export class Location implements ILocation {
    constructor(public id: string,
                public category: string,
                public mainImage: string,
                public images: Array <any>,
                public location: string,
                public rate: number,
                public hours: string,
                public title: string,
                public description: string,
                public amenities: string,
                public thingsToDo: string, 
                public price: number

    ) {}
}