const productList = document.getElementById("product-list");
const search = document.getElementById("search-product");

async function getproducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const resData = await res.json();
    filterBySearch(resData);
    console.log(resData);
  } catch (err) {
    console.log(err.message);
  }
}
getproducts();
let filterProduct = [];

// search product list

function filterBySearch(data) {
  search.addEventListener("keyup", (e) => {
    productList.innerHTML = "";
    const searchValue = e.target.value.toLowerCase();
    if (searchValue.length == 0) {
      return;
    }
    filterProduct = data.filter((item) =>
      item.title.toLowerCase().includes(searchValue)
    );
    displayProduct();
    if (filterProduct.length > 0) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
        navigateAndSelectProduct(e.key);
      }
    }
  });
}
// display product
function displayProduct() {
  if (filterProduct) {
    filterProduct.map((data) => {
      const itemBox = document.createElement("div");
      itemBox.setAttribute("id", data.id);
      itemBox.classList.add(
        "bg-white",
        "px-10",
        "py-5",
        "flex",
        "items-start",
        "gap-10",
        "border-b",
        "border-black",
        "inside-item"
      );
      itemBox.innerHTML = `
                <div class="w-16">
                    <img src=${data.image} alt="" class="w-full">
                </div>
                <div class="w-56 py-3">
                    <h5 class="font-bold mb-4">${data.title}</h5>
                    <p>${
                      data.description.length > 15
                        ? `${data.title.slice(0, 15)}...`
                        : data.title
                    }</p>
                </div>
                `;
      productList.append(itemBox);
    });
  }
}
let currentNumber = -1;

function navigateAndSelectProduct(key) {
  if (key === "ArrowUp") {
    currentNumber -= 1;
  } else if (key === "ArrowDown") {
    currentNumber += 1;
    const productIdToSelect = filterProduct[currentNumber].id.toString();
    const productItemContainer = document.getElementById(productIdToSelect);
    if (productItemContainer) {
      productItemContainer.classList.add("select-item");
    }
    console.log(productIdToSelect);
    console.log(productItemContainer);
  } else if (key === "Enter") {
    console.log(currentNumber);
  }
}
