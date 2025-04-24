document.addEventListener('DOMContentLoaded', async () => {
    checkLoginStatus();
    const response = await fetch('/api/products');
    const data = await response.json();

    displayTable(data);

    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
});

function displayTable(products) {
    const productTableBody = document.querySelector('#productTable tbody');
    products.forEach((product) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button class="addCartBtn" data-product-id="${product.id}">담기</button></td>
        `
        productTableBody.appendChild(row);

        row.querySelector('.addCartBtn').addEventListener('click', function () {
            addToCart(this.getAttribute('data-product-id'));
        })
    })
}

async function checkLoginStatus() {
    const response = await fetch('/api/check-login');
    if (response.status === 200) {
        const data = await response.json();
        showProfile(data.username);
        return true;
    } else {
        const data = await response.json();
        console.log(data);
        return false;
    }
}

async function addToCart(productId) {
    const isLogin = await checkLoginStatus();
    if (!isLogin) {
        alert('로그인을 하고 오세요')
    } else {
        const response = await fetch(`/api/cart/plus/${productId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
    }
}

async function logout() {
    const response = await fetch('/api/logout');
    if (response.status === 200) {
        showLoginForm(); 
        window.location.href = '/home'; 
    }
}

function showProfile(username) {
    document.getElementById('name').textContent = username;
    document.getElementById('user-info').style.display = 'flex';
}

function showLoginForm() {
    document.getElementById('user-info').style.display = 'none';
}