import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], searchTerm:String): any[]{
    if(!searchTerm){
      return products;
    }
    else {
      let product = products.filter(obj => obj.pname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
      if (product.length !== 0) {
        return product;
      }
      else {
        this.ts.warning('No Search Results found for your match');
      } return products.filter(obj=>obj.pname.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1)
      
    } 
}
}
