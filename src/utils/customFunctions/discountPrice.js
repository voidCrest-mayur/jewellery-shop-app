const discountPrice = (actualPrice, discountRate)=>{
     //calculate  product price with given product discount
     
     let discount = (actualPrice * discountRate)/100;
     let discountPrice = actualPrice - discount;
     return Math.floor(discountPrice);
}

export default discountPrice;
