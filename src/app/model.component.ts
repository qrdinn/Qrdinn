export interface product{
    price:number;
    image_data:string;
    rating:number
    id:number;
    name:string;
    quantity:number
    category:number
}
export interface carousel{
    img:string;
    wording: string
}

export interface ordereditem{
    quantity:number;
    price:number;
    totalprice:number;
    id:number;
    img:string;
    name:string
}

export interface submittedorder{
    user_id:string,    
    table_id:number, 
    items:items[]
}
export interface items{
    fooditem_id:number,
    quantity:number,
}