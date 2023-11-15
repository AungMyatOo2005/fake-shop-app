const productList = document.getElementById("product-list");
const search = document.getElementById("search");

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
  });
}

// display product
function displayProduct() {
  if (filterProduct) {
    filterProduct.map((data) => {
      const itemBox = document.createElement("div");
      itemBox.classList.add(
        "bg-white",
        "px-10",
        "py-5",
        "flex",
        "items-start",
        "gap-10",
        "border-b",
        "border-black"
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
