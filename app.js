const productEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalInCart = document.querySelector(".subtotal");

function loadProductsForHomePage() {
    const storedProducts = localStorage.getItem('adminProducts'); // קוראים את הנתונים שהמנהל שמר
    if (storedProducts) {
        return JSON.parse(storedProducts);
    } else {
        // אם אין כלום ב-localStorage (פעם ראשונה), נשתמש במערך PRODUCTS המקורי
        return typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];
    }
}

let currentProducts = loadProductsForHomePage();

function renderProdcuts() {
  currentProducts.forEach((product) => {
      productEl.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imageUrl}" alt="${product.name}">
                    </div>
                    <div class="desc" >
                        <h3>סוג: ${product.type}</h3>
                        <h3>שם: ${product.name}</h3>
                        <h3>מחיר: ${product.price}$</h3>
                        <button class="add-to-cart" onclick="addToCart(${product.id})" data-product-id="${product.id}">הוסף לעגלה</button>
                        <button class="remove-from-cart" onclick="removeItemFromCart(${product.id})" data-product-id="${product.id}">מחיקה</button>
                    </div>
                </div>
            </div> 
        `;
  });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});

let cartArrey = [];


//ADD TO ARREY CART 
function addToCart(id){ 
    if (cartArrey.some((product)=> product.id === id)){
        
        changeNumberOfUnits('plus' , id);
    }
    else{
    const item=PRODUCTS.find((product)=>product.id === id);
    cartArrey.push({
    ...item,
    numberOfUnits: 1
    }); 
    console.log(cartArrey);

    }
    updateCart();
}


function updateCart(){
    renderCartItems();
    renderSubtotal();
}

function renderCartItems(){

    cartItemsEl.innerHTML = "";
    cartArrey.forEach((item) => {

    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imageUrl}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
            <button class="remove-from-cart" onclick="removeItemFromCart(${item.id})" data-product-id="${item.id}">X</button>

        </div>
      `;
  });
}

//change number of units for item
function changeNumberOfUnits(action,id){

cartArrey = cartArrey.map((item) =>{

    let numberOfUnits = item.numberOfUnits;

    if(item.id === id){
        if(action === "minus" && numberOfUnits > 1 ){
            numberOfUnits--;
        }
        else if(action === "plus" && numberOfUnits < item.stock ){
            numberOfUnits++; 
            
        }
    }

     return {
    ...item , 
    numberOfUnits,
    }

});

   updateCart();
}

//calculate subtotal cart
function renderSubtotal(){
    let totalprice = 0 ; 
    let totalItems=0;

    cartArrey.forEach((item) =>{

        totalprice += item.numberOfUnits * item.price;
        totalItems += item.numberOfUnits;
        
});

subtotalInCart.innerHTML = `Subtotal (${totalItems} items): $${totalprice}`;
}

//remove item from cart
function removeItemFromCart(id){
    cartArrey = cartArrey.filter((item)=>item.id !== id);
    updateCart();
}
