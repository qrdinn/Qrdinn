import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { items, ordereditem, submittedorder } from './model.component';
@Injectable({
  providedIn: 'root'
})
export class FoodListService {

  constructor(private http:HttpClient) { }

  addingtotalorder(totalorder:ordereditem[]){
    let a = 0,totalrate;
    totalorder.forEach((data:any) => {
      a = data.totalprice + a;
    })
    totalrate = Math.ceil(a);
    return totalrate
  }

  getfoodlist(useid:string){
    let queryObject = {
      "user_id":useid
    }

    return this.http.post('https://qrdinn.pythonanywhere.com/api/menu',queryObject)
  }


  updateorder(order: ordereditem[]) {
   
    let finalsubmission = [];
    let listitem:items = {
      fooditem_id: 0,
      quantity: 0
    }
    for (let i = 0; i < order.length; i++) {
      let duplicatevalue = Object.assign({},listitem)
      duplicatevalue.fooditem_id = order[i].id;
      duplicatevalue.quantity = order[i].quantity;
      finalsubmission.push(duplicatevalue)
    }
    let submittedvalue: submittedorder = {
      user_id: "81d7e7da-81ae-4d0b-8bf8-49764af11519",      
      table_id: 1,     
      items: finalsubmission
    };

    return this.http.post('http://qrdinn.pythonanywhere.com/api/menu/completeorder', submittedvalue)
  }
}
