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

  getfoodlist(useid:string){
    let queryObject = {
      "user_id":useid
    }

    return this.http.post('https://qrdinn.pythonanywhere.com/api/menu',queryObject)
  }

  updateorder(order:ordereditem[]){
    return this.http.post('https://karthi9150.pythonanywhere.com/api/submitorder',order)
  }
}
