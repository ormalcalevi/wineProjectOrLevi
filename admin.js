const addProductForm = document.getElementById('addProductForm');
const newProductIdInput = document.getElementById('newProductId');
const newProductNameInput = document.getElementById('newProductName');
const newProductTypeInput = document.getElementById('newProductType');
const newProductPriceInput = document.getElementById('newProductPrice');
const newProductImageUrlInput = document.getElementById('newProductImageUrl');
let msg = document.getElementById('msg1');

addProductForm.addEventListener("submit" , (e) =>{
    e.preventDefault();
    console.log("button ?");
    formValidation();
});

let formValidation = () =>{
    if(newProductIdInput.value === ""){
        console.log("no");
    }
    else{
        console.log("nice");
    }
    const lastProduct = PRODUCTS[PRODUCTS.length - 1];
    console.log(lastProduct.id);
};


