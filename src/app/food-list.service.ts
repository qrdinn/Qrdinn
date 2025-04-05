import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ordereditem } from './model.component';
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

  getfoodlist(){
    return this.http.get('http://karthi9150.pythonanywhere.com/api/orders')
  }

  updateorder(order:ordereditem[]){
    return this.http.post('https://karthi9150.pythonanywhere.com/api/submitorder',order)
  }
}
