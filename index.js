// <========HERE IS A UPDATED CODE=================>


//<=========Global Variable's=================>


// ye variable cart div ko get ker rha ha 
let cart = document.querySelector('.itemdiv')
let left = document.querySelector('.cartdiv')

// ye function cartWali div ko aik or class asign ker rha ha or .toggle ka function aik bar class add kerta ha or aik bar remove jab handleSubmit() wala function chlta ha tab jo styling iski ho gi run ho jye gi or dubara function call hony per wo styling ya functionality remove ho haye gi 
let handleSubmit = () => {
    left.classList.toggle('cardshow');
}

// ye variable bnaya taa k jo data humny fetch kia ha usko is variable me store kerwa k globally access ker saky asign value into line  No.42
let fetchdata;

// this variable create for asign API LINK
let url = "https://fakestoreapi.com/products";



// Fetch the Api URL and convert into json
fetch(url)
    .then((res) => res.json())
    .then((data) => {
        display(data);
    });



// This function Print Data using map on data name Array that I was get after the code fetched or ye function fetch hony k bad .then me call ho rha   line No.31 
let display = (data) => {
    data.map((obj, i) => {
        mainbox.innerHTML += `<div data-aos="flip-left" data-aos-duration="2000" class="box" id="box2"><div style="background-image: url(${obj.image});background-size: 100% 100%;" class="img2"></div><h3 id="title" class="title">${obj.title}</h3><h4 id="price" class="price">Price : $ ${obj.price}</h4><h4 id="rat">Rating : ${obj.rating.rate} <i class="fa-solid fa-star" style="color:white"></i></h4><button id="cartbtn" onclick="addtocart(${i})">Add to Cart</button></div>`;
    });
    // url ko fetch ker k jo data aya tha usko map k zariye print ker k aik varible me store kerwa dia jo uper global bnaya tha Line No.20 me
    fetchdata = data;
};



// Data Ko addtocart k function per click hony per ye 2 function call ker rha ha Ik to ye us Index per jo item ha usko cart wali div me display ker rha ha or or usi display hony wali chez ko localStorage me set ker rha ha 
let addtocart = (i) => {
    setData(i); // This function Set clicked item index data into localStorage
    displayCart(); // Render the cart 
}


// This function Set clicked item index data into localStorage =>{ item.id === fetchdata[i].id} its check the that unique id is same or not if same them increment in its quantity else add new item in the array
let setData = (i) => {
    let storedData = JSON.parse(localStorage.getItem("item")) || [];
    let checkIndex = storedData.findIndex((item) => item.id === fetchdata[i].id);

    if (checkIndex === -1) {
        storedData.push({ ...fetchdata[i], quantity: 1 });
    }
    else {
        storedData[checkIndex].quantity += 1
    }

    // storedData[checkIndex].price * storedData[checkIndex].quantity;
    localStorage.setItem("item", JSON.stringify(storedData));

}



// Cart data display kerny k liye local Storage se data get ker k usme jo jo indexes pary huwe ha us per forEach lga ker cartDiv me print kerwa rha ha 
let displayCart = () => {
    cart.innerHTML = '';

    let storedData = JSON.parse(localStorage.getItem("item")) || [];

    storedData.forEach((obj, i) => {
        cart.innerHTML += `<div id="cartmain">
            <img src="${obj.image}" alt="">
            <h3 class="carttitle">${obj.title}</h3>
            <h4 class="cartcateg">${obj.category}</h4>
            <h4 class="cartprice">Price : $ ${parseInt(obj.price * obj.quantity)}</h4>
            <h3 class="cartdivdel" onclick="cartDel(${i})">Delete <i class="fa-regular fa-trash-can"></i></h3>
            <div class="cart-count">
                <span onclick="countDec(${i})">-</span>
                <input type="text" id="counter" value="${obj.quantity}">
                <span onclick="countInc(${i})">+</span>
            </div>
        </div>`;
    });
    if (cart.innerHTML === '') {
        checkOrder.style.display = "none"
    }
    else {
        checkOrder.style.display = "inline-block"
    }
    pop.innerText = `${storedData.reduce((sum, obj) => sum + obj.quantity, 0)}`
}


// Cart data delete function ye localStorage se data get ker k or jis index per click huwa ha usy splice yani remove ker karray me se phir wapis us array ko set ker rha ha or end per display ka fnction call ker dia taa k wo dubara display ho jye 
let cartDel = (i) => {
    let storedData = JSON.parse(localStorage.getItem("item"));
    storedData.splice(i, 1);

    localStorage.setItem("item", JSON.stringify(storedData));
    displayCart();
}

// Load cart items when the page loads jo item cart me add ki ha wo udhar hi nzr aye page k reload pr b to is liye window per load ka event lgaya ha
window.addEventListener("load", () => {
    displayCart();
});


// plus minus ka conter chalany k liye 2 variable liye ha aik increment k liye or aik decrement k liye then inc or dec k liye function bnaya ha
let dec = 1
let inc = 1

// Decrement function ye function localStorage se data get ker k jo index arha ha us k ander jo quantity ki key ha usy aik se uper waly numbers tak decrease ker sakhta ha and them usy localStorage me set ker k dubara display kerwa rha ha
let countDec = (i) => {
    let storedData = JSON.parse(localStorage.getItem("item")) || [];
    if (storedData[i].quantity > 1) {
        storedData[i].quantity--;
    }
    localStorage.setItem("item", JSON.stringify(storedData));
    displayCart();
}


//Increment function ye function localStorage se data get ker k jo index arha ha us k ander jo quantity ki key ha usy aik se ager bara number ha to increase ker sakhta ha and then usy localStorage me set ker k dubara display kerwa rha ha
let countInc = (i) => {
    let storedData = JSON.parse(localStorage.getItem("item")) || [];

    storedData[i].quantity++;

    localStorage.setItem("item", JSON.stringify(storedData));
    displayCart();
}


//function that shown the total bill of all cart items 
let totalQuantity;
let totalPrice;
let handleCheck = () => {
    let storedData = JSON.parse(localStorage.getItem("item")) || [];

    totalQuantity = storedData.reduce((sum, obj) => sum + obj.quantity, 0);
    totalPrice = storedData.reduce((sum, obj) => sum + parseInt(obj.price * obj.quantity), 0);

    console.log("Order Submit suuccesfully. \n Total Quantity:", totalQuantity, "Total Price:", "$" + totalPrice);


    showOrder(storedData)
    // pop.innerText=`${Number(totalQuantity)}`
}


// check order  print function
let showOrder = (storedData) => {

    let confirmItems = JSON.parse(localStorage.getItem("order")) || [];
    let orderConfirmation = confirm(`Please Comfirm Your Order \nTotal Quantity: ${totalQuantity} \n Total Bill: $${totalPrice}`)

    if (orderConfirmation) {
        confirmItems.push([...storedData, { orderNo: confirmItems.length + 1 }])
        
        localStorage.setItem("order", JSON.stringify(confirmItems));

        storedData = []
        localStorage.setItem("item", JSON.stringify(storedData));



        cart.innerHTML = '';
    }
    else {
        console.log("order cancelled");
    }

    displayCart()
}



// let x = document.getElementById('id')
// // console.log(x);

// let n = document.getElementsByTagName('div')
// console.log(n);

// if(n instanceof NodeList){
//     console.log("this is a HTML collection");
// }
// else{
//     console.log("this is not a Html element");
// }