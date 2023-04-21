
const productRow = document.querySelector('.product-li'); // 상품목록 HTML 추적
let obj = null; // 상품목록 init
let start = 1; // 상품목록 탐색을위한 초기값 상수
const limit = 8; // 한페이지에 표시할 상품목록 갯수 상수


fetchProducts();




// 서버에서 상품목록 받아오기

function fetchProducts() {
    fetch('../product.json')
    .then(response => response.json())
    .then(data => {
        obj = data
        render(start, limit)
    })
}

// img 경로 추후수정필요

function render() {
    const startIdx = (start - 1) * limit;
    const endIdx = startIdx + limit;

    for (let i = startIdx; i < Math.min(endIdx, obj.products.length) ; i++){
        const product = obj.products
        const productEl = creatProductEl(product[i])
        productRow.appendChild(productEl);
    }
    if (endIdx < obj.products.length) {
        if(start !== 1)removeBtn();
        moreBtnRender();
    }
} 

// 더보기 버튼 클릭시 제 랜더링 실행함수
function onloadMore() {
    start++;
    render();
    const endIdx = start * limit
    if(endIdx >= obj.products.length) removeBtn()
}

// productHTML 생성 함수
function creatProductEl(product) {
    const productEl = document.createElement('div');
    productEl.className = 'col-md-3';
    productEl.innerHTML =`
    <div class="card border-0">
      <img src="../img/${product.thumnailImg}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product.productName}
          <span class="badge rounded-pill ${product.concept}">${product.concept}</span>
        </h5>
        <p class="card-text d-flex justify-content-between align-items-end">₩ ${product.productPrice}
          <a class="nav-link" href="#"><i class="bi bi-cart3"></i></a>
        </p>
      </div>
    </div>
  `;
    return productEl;
}
// 렌더링후 더보기버튼 추가 함수
function moreBtnRender(start, limit) {
    start, limit;
    const morebtnEl = document.createElement('div');
    morebtnEl.className = 'row more-btn-row';
    const morebtnEl_div = document.createElement('div');
    morebtnEl_div.className = 'col-12 text-center mt-5';
    morebtnEl.appendChild(morebtnEl_div);
    const morebtnEl_div_btn = document.createElement('button');
    morebtnEl_div_btn.className = 'btn more-btn';
    morebtnEl_div_btn.type = 'button';
    morebtnEl_div_btn.textContent = '더보기'
    morebtnEl_div_btn.addEventListener('click', onloadMore);
    morebtnEl_div.appendChild(morebtnEl_div_btn);
    productRow.appendChild(morebtnEl);
}


// 추가 물품 렌더링후 더보기버튼 제거 함수
function removeBtn() {
    document.querySelector('.more-btn-row').remove()
}

