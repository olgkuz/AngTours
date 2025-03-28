import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[],searchValue:string,prop:string): any[] {

    if (!searchValue) return value;

    if (Array.isArray(value)) {
      const regExp = new RegExp(searchValue,'i');

      return value.filter((el)=>{
        if (el[prop] && typeof el[prop] === 'string') {
          return regExp.test(el[prop])
        } else {
          console.error(el[prop]+ 'не строка' );
          return false;
        }
    });
    } else {
      console.error(value+ 'не массив' );
      return [];
    }
    
  }

}
