import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ordereditem, product } from '../model.component';
import { FoodListService } from '../food-list.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css'],

})
export class OrderViewComponent implements OnInit {
  totalorder: ordereditem[] = [];
  quantity: number = 1;
  totalprice: number = 0;
  totalrate: number = 0;
  tableid: string = ''
  userid: string = ''
  constructor(private service: FoodListService, private dialogref: MatDialogRef<OrderViewComponent>, @Inject(MAT_DIALOG_DATA) private data: { orderlist: ordereditem[], tableid: string, userid: string }) {

  }
  ngOnInit(): void {
    this.tableid = this.data.tableid ?? '';
    this.totalorder = this.data.orderlist;
    this.userid = this.data.userid;
    this.totalrate = this.service.addingtotalorder(this.totalorder)
  }

  close() {
    this.dialogref.close();
  }

  placeorder() {
    this.service.updateorder(this.totalorder, this.tableid, this.userid).subscribe((res: any) => {
      if (res.status == 'success') {
        this.dialogref.close({ res: 1 });
      }
    })
  }
  deleteitem(id: number) {
    let index = this.totalorder.findIndex((a) => a.id == id);
    this.totalorder.splice(index, 1);
    this.totalrate = this.service.addingtotalorder(this.totalorder);

  }

}
