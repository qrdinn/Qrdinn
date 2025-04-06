import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { carousel, ordereditem, product } from '../model.component';
import { OrderViewComponent } from '../order-view/order-view.component';
import { MatDialog } from '@angular/material/dialog';
import { fakeAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar'
import { FoodListService } from '../food-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],

})
export class OrderListComponent implements OnInit {
  togglebool = false;
  vegpricelist = false;
  nonvegpricelist = false;
  Bothpricelist = false;
  orderitem: ordereditem[] = [];
  productlist: product[] = [
    {
      price: 100,
      image_data: '../assets/pizza.jpg',
      rating: 3,
      id: 0,
      name: 'Pizza',
      quantity: 1,
      category: 1
    },
    {
      price: 200,
      image_data: '../assets/pizza.jpg',
      rating: 2,
      id: 1,
      name: 'Burger',
      quantity: 1,
      category: 1
    },
    {
      price: 300,
      image_data: '../assets/pizza.jpg',
      rating: 3,
      id: 2,
      name: 'Pizza',
      quantity: 1,
      category: 1
    },
    {
      price: 400,
      image_data: '../assets/pizza.jpg',
      rating: 3,
      id: 3,
      name: 'Pizza',
      quantity: 1,
      category: 1
    },
    {
      price: 500,
      image_data: '../assets/pizza.jpg',
      rating: 5,
      id: 4,
      name: 'Pizza',
      quantity: 1,
      category: 1
    },
    {
      price: 600,
      image_data: '../assets/pizza.jpg',
      rating: 3,
      id: 5,
      name: 'Pizza',
      quantity: 1,
      category: 1
    },
    {
      price: 400,
      image_data: '../assets/pizza.jpg',
      rating: 3,
      id: 6,
      name: 'Pizza',
      quantity: 1,
      category: 1
    },
    {
      price: 300,
      image_data: '../assets/pizza.jpg',
      rating: 3,
      id: 7,
      name: 'Pizza',
      quantity: 1,
      category: 1
    }
  ]
  displaylist: product[] = [];
  searchvalue: string = ''
  totalrate:number = 0;
  issearchnotlist:boolean = false
  constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private service: FoodListService) {

  }
  ngOnInit(): void {
    this.getList();    
  }


 
  //below function is for assigning list after the duplication the list because need to take reference for the purpose of filter 
  assigninglist() {
    this.displaylist = JSON.parse(JSON.stringify(this.productlist));
  }
  toggle() {
    let tog = document.getElementById('dropdownMenuLink');
    this.togglebool = !this.togglebool;
  }
  toggleclose(num: number) {
    if (num == 1) {
      this.vegpricelist = !this.vegpricelist;
    } else if (num == 2) {
      this.nonvegpricelist = !this.nonvegpricelist
    } else {
      this.Bothpricelist = !this.Bothpricelist
    }
  }

  getList() {
    this.service.getfoodlist("81d7e7da-81ae-4d0b-8bf8-49764af11519").subscribe((res: any) => {
      res.data.forEach((user: any) => {
        // user.image_data = 'data:image/png;base64,' + user.image_data
        user.quantity = 1;

      })
      this.productlist = res.data;
      this.assigninglist();
    })
  }
  //  Performing operation for increment and decrement in the quantity
  quantityoperation(id: number, operator: string) {
    let ordercheck = this.displaylist.filter((a) => a.id == id);
    if (operator == '+') {
      ordercheck[0].quantity = ordercheck[0].quantity + 1;
    } else {
      if (ordercheck[0].quantity > 1) {
        ordercheck[0].quantity = ordercheck[0].quantity - 1;
      }
    }
    if (this.orderitem.length > 0) {
      let orderedquantity = this.orderitem.filter((a) => a.id == id);
      if (orderedquantity.length > 0) {
        orderedquantity[0].quantity = ordercheck[0].quantity;
        orderedquantity[0].totalprice = orderedquantity[0].price * orderedquantity[0].quantity
      }
    }

    this.totalrate = this.service.addingtotalorder(this.orderitem);
  }

  // Filter the list and display according to that category
  filterlist(category: number, numcheck: number) {
    if (category == 0) {
      this.displaylist = this.productlist.sort((a: any, b: any) => {
        if (numcheck == 0) {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      })
    } else {
      this.displaylist = this.productlist.filter((a) => a.category == category).sort((a: any, b: any) => {
        if (numcheck == 0) {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      })
    }
  }

  // search the list and display according to that category
  search(e: KeyboardEvent) {

    console.log(this.searchvalue);
    this.displaylist = this.productlist.filter((data) => data.name.toLowerCase().includes(this.searchvalue.toLowerCase()))
if(this.displaylist.length ==0){
this.issearchnotlist = true;
}else{
  this.issearchnotlist = false;
}

  }

  // Dialogbox for viewing the cart
  vieworder() {
    let dialog = this.dialog.open(OrderViewComponent, { height: '500px', width: '450px', disableClose: true, hasBackdrop: true, data: this.orderitem })
  dialog.afterClosed().subscribe((data)=>{
 if(data && data.res == 1){
this.commonsnackbar("Your order placed successfully")
 }
//  (MOBILE VIEW Footer) this below condition is the purpose for when i delete the item in the cart,After I close the cart, I need to sum the rest of items and display in the main view else if there is no item display zero only
    this.totalrate = this.orderitem.length >0 ? this.service.addingtotalorder(this.orderitem) : 0;
  })
  }

  // Added data in arrar for the purpose of displaying in dialogbox
  placeorder(detail: product) {
    let ordercheck = this.orderitem.filter((a) => a.id == detail.id);
    if (ordercheck.length == 0) {
      this.orderitem.push({
        quantity: detail.quantity,
        price: detail.price,
        totalprice: detail.price * detail.quantity,
        id: detail.id,
        img: detail.image_data,
        name: detail.name
      })
    }
    this.totalrate = this.service.addingtotalorder(this.orderitem);
    console.log(this.orderitem)
 this.commonsnackbar("Cart Added successfully");
  }

  commonsnackbar(stringval:string){
    this.snackbar.open(stringval, "", {
      duration: 2000,
      panelClass: ["custom-snackbar"]
    });
  }
}
