const productEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalInCart = document.querySelector(".subtotal");

function loadProducts() {
    const storedProducts = localStorage.getItem('adminProducts'); // קוראים את הנתונים שהמנהל שמר
    return storedProducts ? JSON.parse(storedProducts) : (typeof PRODUCTS !== 'undefined' ? PRODUCTS : []);
}

let currentProducts = loadProducts();

function renderProducts() {
        if (!productEl) {
        console.warn("Product display element (.products) not found. Skipping product rendering.");
        return;
    }

    productEl.innerHTML = ""; 

    // בונים את כל ה-HTML במשתנה אחד ואז מכניסים ל-DOM, זה יותר יעיל
    let productsHTML = "";
    currentProducts.forEach((product) => {
        productsHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imageUrl}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h3>סוג: ${product.type}</h3>
                        <h3>שם: ${product.name}</h3>
                        <h3>מחיר: ${product.price}$</h3>
                        <button class="add-to-cart" onclick="addToCart(${product.id})" data-product-id="${product.id}">הוסף לעגלה</button>
                    </div>
                </div>
            </div> 
        `;
    });
    productEl.innerHTML = productsHTML;
}

window.addEventListener('storage', (event) => {
    // נבדוק אם המפתח שהשתנה הוא המפתח של המוצרים שלנו
    if (event.key === 'adminProducts') {
        console.log("זוהה שינוי במוצרים! מרענן תצוגה...");
        
        // 1. טען מחדש את רשימת המוצרים המעודכנת
        currentProducts = loadProducts();
        
        // 2. הצג את הרשימה המעודכנת על המסך
        renderProducts();
    }
});

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
        const item=currentProducts.find((product)=>product.id === id);
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
    
   if (!cartItemsEl) {
        console.warn("Cart items element (.cart-items) not found. Skipping cart items rendering.");
        return;
    }
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

// ======================================================
//             קוד לוגיקת התחברות מנהל
// ======================================================


document.addEventListener('DOMContentLoaded', () => {
    

    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    
   
    if (loginForm) {
        
        
        const ADMIN_USERNAME = "admin";
        const ADMIN_PASSWORD = "1234";

        
        loginForm.addEventListener('submit', (event) => {
            
            //מניעה מהדף להתרענן
            event.preventDefault(); 
            
           
            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;
            
            
            if (usernameInput === ADMIN_USERNAME && passwordInput === ADMIN_PASSWORD) {
                
                loginMessage.textContent = "Login successful!!";
                loginMessage.style.color = "green";
                
                
                setTimeout(() => {
                    window.location.href = './admin.html'; 
                }, 1000);

            } else {//התחברות נכשלה
              
                loginMessage.textContent = "שם משתמש או סיסמה שגויים.";
                loginMessage.style.color = "red";
     
                document.getElementById('password').value = "";
            }
        });
    }
});