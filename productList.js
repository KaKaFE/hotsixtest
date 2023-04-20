// 상품목록 HTML 추적
const productRow = document.querySelector('.product-li');

// 서버에서 상품목록 받아오기
fetch('../product.json')
    .then(response => response.json())
    .then(data => {
        console.log(data.products.length)
        let remainProductArr = render(data);
        return remainProductArr;
    }).then(data => {
        remainRender(data)
    })


// img 경로 추후수정필요
function render(obj) {
    const renderIndex = 8; // 한페이지에 진열할 상품갯수 상수
    const sliceLength = obj.products.length - renderIndex + 1; // 8개이후 남은 배열 인덱스값
    const productsArr = obj.products
    let productList = productRow.innerHTML.length ? productRow.innerHTML : '' // 초기innerhtml 이 비어있는지 아닌지 판단.
    const products = obj.products.entries() //  배열 index 탐색을위한 선언
    for (let [indx , i] of products) {
        productList += 
            `<div class="col-md-3">
                <div class="card border-0">
                <img src="../img/${i.thumnailImg}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${i.productName}
                    <span class="badge rounded-pill ${i.concept}">${i.concept}</span>
                    </h5>
                    <p class="card-text d-flex justify-content-between align-items-end">₩ ${i.productPrice}
                    <a class="nav-link" href="#"><i class="bi bi-cart3"></i></a>
                    </p>
                    </div>
                </div>
            </div>`;
        if (indx + 1 === renderIndex && obj.products.length > renderIndex) {
            productRow.innerHTML = moreBtnRender(productList) // 완성된 html에 더보기버튼추가
            let remainproducts =
                productsArr.slice(renderIndex - 1, renderIndex - 1 + sliceLength);
            
            remainproducts.length ? moreBtnRender(productList) : removeBtn();

            return remainproducts;
        }
    }
    if (obj.products.length < renderIndex) {
        productRow.innerHTML = productList;
        removeBtn()
    }
} 


// 렌더링후 더보기버튼 추가 함수
function moreBtnRender(innerHTML) {
    innerHTML += 
    `<div class="row more-btn-row">
        <div class="col-12 text-center mt-5">
            <button type='button' class="btn more-btn">더보기</button>
        </div>
    </div>`
    return innerHTML;
}

// 추가 물품 렌더링후 더보기버튼 제거 함수
function removeBtn() {
    document.querySelector('.more-btn-row').remove()
}

function remainRender(arr) {
    const morebtn = document.querySelector('.more-btn');
    morebtn.addEventListener('click', (e) => {
        e.preventDefault()
        render({
            "products" : arr
        })
        removeBtn()
    })
}