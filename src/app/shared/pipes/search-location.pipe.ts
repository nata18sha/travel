import { Pipe, PipeTransform } from '@angular/core';
import { ILocation } from '../interfaces/location.interface';

@Pipe({
  name: 'searchLocation'
})
export class SearchLocationPipe implements PipeTransform {

  transform(value: Array<ILocation>, searchParam: string): Array<ILocation> {
    if (!searchParam) {
      return value;
    }
    if (!value) {
      return null;
    }
    return value.filter(location => location.title.toLowerCase().includes(searchParam.toLowerCase()) ||
    location.category.toLowerCase().includes(searchParam.toLowerCase()) ||
    location.description.toLowerCase().includes(searchParam.toLowerCase()) ||
    location.location.toLowerCase().includes(searchParam.toLowerCase())

    );
  }

}
