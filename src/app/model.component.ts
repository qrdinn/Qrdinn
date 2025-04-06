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