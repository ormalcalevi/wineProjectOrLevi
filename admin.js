function loadProductsForAdmin() {
    const storedProducts = localStorage.getItem('adminProducts');
    // אם יש מוצרים שמורים, נשתמש בהם. אחרת, נשתמש במערך המקורי.
    return storedProducts ? JSON.parse(storedProducts) : (typeof PRODUCTS !== 'undefined' ? PRODUCTS : []);
}

// 2. מגדירים את המשתנה שיחזיק את המוצרים בדף הניהול
let currentProducts = loadProductsForAdmin();


const addProductForm = document.getElementById('addProductForm');
const newProductNameInput = document.getElementById('newProductName');
const newProductTypeInput = document.getElementById('newProductType');
const newProductPriceInput = document.getElementById('newProductPrice');
const newProductImageUrlInput = document.getElementById('newProductImageUrl');
const newProductStockInput = document.getElementById('newProductStock');

let msgName = document.getElementById('msg1');
let msgType = document.getElementById('msg2');
let msgPrice = document.getElementById('msg3');
let msgImg = document.getElementById('msg4');
let msgStock = document.getElementById('msg5');



addProductForm.addEventListener("submit" , (e) =>{
    e.preventDefault();
    console.log("Button clicked");
    formValidation();
});


let formValidation = () => {
    // איפוס הודעות שגיאה
    msgName.textContent = '';
    newProductNameInput.classList.remove('error-input-border');
    msgType.textContent = '';
    newProductTypeInput.classList.remove('error-input-border');
    msgPrice.textContent = '';
    newProductPriceInput.classList.remove('error-input-border');
    msgImg.textContent = '';
    newProductImageUrlInput.classList.remove('error-input-border');
    msgStock.textContent = '';
    newProductStockInput.classList.remove('error-input-border');

    // הרצת בדיקות תקינות
    const isNameValid = checkValue(newProductNameInput, msgName);
    const isTypeValid = checkValue(newProductTypeInput, msgType);
    const isPriceValid = checkValue(newProductPriceInput, msgPrice);
    const isImgValid = checkValue(newProductImageUrlInput, msgImg);
    const isStockValid = checkValue(newProductStockInput, msgStock);
    
    // אם כל השדות תקינים
    if (isNameValid && isTypeValid && isPriceValid && isImgValid && isStockValid) {
        addProduct();
    }
};

let checkValue = (inputElement, errorMsgElement) => {
    if (inputElement.value.trim() === "") {
        inputElement.classList.add('error-input-border');
        errorMsgElement.textContent = `שדה חובה`; // הודעת שגיאה ברורה יותר
        return false;
    }
    return true;
};

function addProduct(){

    const newId = currentProducts.length > 0 ? Math.max(...currentProducts.map(p => p.id)) + 1 : 1;

    
    const newProduct = {
        id: newId, 
        name: newProductNameInput.value, 
        type: newProductTypeInput.value, 
        price: parseFloat(newProductPriceInput.value), 
        imageUrl: newProductImageUrlInput.value, 
        stock : parseInt(newProductStockInput.value) 
    }

    currentProducts.push(newProduct);
    const lastProductAdded = currentProducts[currentProducts.length - 1];
    console.log("המוצר האחרון במערך לאחר הוספה: ", lastProductAdded);

    localStorage.setItem('adminProducts', JSON.stringify(currentProducts));
    console.log("currentProducts נשמר ב-LocalStorage.");

    addProductForm.reset();
    
}




