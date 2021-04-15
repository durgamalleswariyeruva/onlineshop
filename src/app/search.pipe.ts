import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  constructor(private ts: ToastrService) { }
  transform(products = [], searchTerm): any {
    if (!searchTerm) {
      return products;
    }
    else {
      const product = products.filter(obj => obj.pname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
      if (product.length !== 0) {
        return product;
      }
      else {
        this.ts.warning('No Search Results found for your match');
      }
    }
  }

}
