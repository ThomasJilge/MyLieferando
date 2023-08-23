let dishes = [
  {
    name: "Pizza Margherita",
    ingredients: "Mit Tomaten und Mozzarella",
    price: 6.9,
  },
  {
    name: "Pizza Quattro Formaggi",
    ingredients: "Mit Gorgonzola, frischem Ricotta und Schafskäse",
    price: 8.9,
  },
  {
    name: "Pizza Vegetarisch",
    ingredients: "Mit frischem Gemüse",
    price: 7.9,
  },
  {
    name: "Pizza Diavolo",
    ingredients: "Mit scharfer Salami und Peperoni",
    price: 9.9,
  },
  {
    name: "Pizza Calzone",
    ingredients: "Gefüllt mit Vorderschinken und Champignons",
    price: 10.9,
  },
];


let basket = [];
let prices = [];
let amounts = [];


function render() {
  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = 0; i < dishes.length; i++)
  content.innerHTML += templateRender(i);
  renderBasket();
}


function templateRender(i) {
  let dish = dishes[i];
  return /*html*/ `
          <div class="dishesOverview">
          <div class="dishes">
           <div class="dishesHead">
             <h3>${dish.name}</h3>
              <img onclick="addToBasket(${i})" class="plusIMG" src="img/plus.png" alt="">
          </div>
            <span class="ingredients">${dish.ingredients}</span>
            <span id="spanPrice" class="spanPrice">${dish.price.toFixed(2)}€</span>
        </div>
      </div>
    `;
}


function renderBasket() {
  let basketContent = document.getElementById("basketContent");
  let mobileBasketContent = document.getElementById("mobileBasketContent");

  basketContent.innerHTML = "";
  mobileBasketContent.innerHTML = "";

  for (let i = 0; i < basket.length; i++) {
    basketContent.innerHTML += templateRenderBasket(basket[i]);
    mobileBasketContent.innerHTML += templateRenderMobileBasket(basket[i]);
  }
}


function templateRenderBasket(i) {
  let j = basket.indexOf(i);
  return /*html*/ `
    <div id="sumContainer" class="sumContainer">
      <div>${amounts[j]} x ${dishes[i].name}</div>
      <div class="priveOverview">
        <div id="spanPrice" class="spanPrice">${prices[j].toFixed(2)}€</div>
          <div class="basketIMGContainer">
            <img onclick="increaseDishes(${j})" class="basketImgs" src="img/plus2.png" alt="">
            <img onclick="reduceDishes(${j})" class="basketImgs" src="img/minus.png" alt="">
        </div>
      </div>
    </div>
  `;
}


function templateRenderMobileBasket(i) {
  let j = basket.indexOf(i);
  return /*html*/ `
    <div id="sumContainer" class="sumContainer">
      <div>${amounts[j]} x ${dishes[i].name}</div>
      <div class="priveOverview">
        <div id="spanPrice" class="spanPrice">${prices[j].toFixed(2)}€</div>
          <div class="basketIMGContainer">
            <img onclick="increaseDishes(${j})" class="basketImgs" src="img/plus2.png" alt="">
            <img onclick="reduceDishes(${j})" class="basketImgs" src="img/minus.png" alt="">
        </div>
      </div>
    </div>
  `;
}


function addToBasket(i) {
  let j = basket.indexOf(i);
  if (j == -1) {
    basket.push(i);
    prices.push(dishes[i].price);
    amounts.push(1);
  } else {
    amounts[j]++;
    prices[j] = dishes[i].price * amounts[j];
  }
  save();
  document.getElementById("basketContent").innerHTML = "";
  renderBasket();
  totalSum();
}


function totalSum() {
  let sum = 0;
  for (let i = 0; i < prices.length; i++) {
    sum += prices[i];
  }
  document.getElementById("spanTotal").innerHTML = `Gesamt: ${sum.toFixed(2)}€`;
  document.getElementById("spanTotalMobile").innerHTML = `Gesamt: ${sum.toFixed(2)}€`;
}


function increaseDishes(i) {
  amounts[i]++;
  prices[i] = dishes[i].price * amounts[i];
  save();
  document.getElementById("basketContent").innerHTML = "";
  renderBasket();
  totalSum();
}


function reduceDishes(i) {
  if (amounts[i] > 0) {
    amounts[i]--;
    if (amounts[i] === 0) {
      basket.splice(i, 1);
      prices.splice(i, 1);
      amounts.splice(i, 1);
    } else {
      prices[i] = dishes[i].price * amounts[i];
    }
    save();
    document.getElementById("basketContent").innerHTML = "";
    renderBasket();
    totalSum();
  }
}


function toggleMobileShoppingBasket() {
  shoppingBasketPopUp = document.getElementById("shoppingBasketMobilePopUp");
  shoppingBasketPopUp.classList.toggle("d-none");
}


function save() {
  localStorage.setItem("basket", JSON.stringify(basket));
  localStorage.setItem("prices", JSON.stringify(prices));
  localStorage.setItem("amounts", JSON.stringify(amounts));
}


function load() {
  if (localStorage.getItem("basket")) {
    basket = JSON.parse(localStorage.getItem("basket"));
    prices = JSON.parse(localStorage.getItem("prices"));
    amounts = JSON.parse(localStorage.getItem("amounts"));
    totalSum();
  }
}


function deleteBasketAfterOrder() {
  localStorage.removeItem("basket");
  localStorage.removeItem("prices");
  localStorage.removeItem("amounts");
  document.getElementById("basketContent").innerHTML = "";
  document.getElementById("spanTotal").innerHTML = "";
  document.getElementById("mobileBasketContent").innerHTML = "";
  document.getElementById("spanTotalMobile").innerHTML = "";
}
