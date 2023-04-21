const productPrice = parseInt(
  document.querySelector(".productPrice").innerText
);

const productQuantityInput = document.querySelector(".productQuantityInput");
const totalPrice = document.querySelector(".totalPrice");
const cartSubmitBtn = document.querySelector(".cartSubmit");

const colorOptionBtn = document.querySelector(".colorOptionBtn");
const dropdownMenu = document.querySelector(".dropdown-menu");

// Event Listeners

const updateTotalPrice = () => {
  const quantity = parseInt(productQuantityInput.value) || 0;
  const total = productPrice * quantity;
  totalPrice.innerHTML = `총 금액: ${total} 원`;
};

productQuantityInput.addEventListener("input", updateTotalPrice);

cartSubmitBtn.addEventListener("click", function () {
  // 선택된 상품 정보 가져오기
  const productImage = document
    .querySelector(".productImage")
    .getAttribute("src");
  const productName = document.querySelector(".productName").textContent;
  const productPrice = document.querySelector(".productPrice").textContent;
  const productQuantity = document.querySelector(".productQuantityInput").value;

  // 쿼리 스트링 생성
  const queryString = `?image=${productImage}&name=${productName}&price=${productPrice}&quantity=${productQuantity}`;

  // 새로운 페이지로 이동
  window.location.href = `../productCart/productCart.html${queryString}`;
});

colorOptionBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  dropdownMenu.classList.toggle("show");
});
