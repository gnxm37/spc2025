document.addEventListener('DOMContentLoaded', async () => {
    checkLoginStatus();
    const response = await fetch('/api/cart');
    const data = await response.json();
    displayTable(data.cart);

    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
});

async function displayTable(cart) {
    const cartTableBody = document.querySelector('#cartTable tbody');
    cartTableBody.innerHTML = '';

    cart.forEach((product) => {
        const row = document.createElement('tr');
        row.setAttribute('data-product-id', product.id);
        row.classList.add('data-product');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td class="product-price">${product.price}</td>
            <td class="product-quantity">
                <span class="quantityCount">${product.quantity}</span> 
                <button class="quantityPlusBtn" data-product-id="${product.id}">+</button>
                <button class="quantityMinusBtn" data-product-id="${product.id}">-</button>
            </td>
            <td><button class="deleteBtn" data-product-id="${product.id}">삭제</button></td>
            `;

        cartTableBody.appendChild(row);

        row.querySelector('.quantityPlusBtn').addEventListener('click', async function () {
            await addToCart(product.id);
        });

        row.querySelector('.quantityMinusBtn').addEventListener('click', async function () {
            await delToCart(product.id);
        });

        row.querySelector('.deleteBtn').addEventListener('click', async function () {
            await deleteFromCart(product.id);
        });

        // 총액
        total();
    });
}

async function checkLoginStatus() {
    const response = await fetch('/api/check-login');
    if (response.status === 200) {
        const data = await response.json();
        showProfile(data.username);
        return true;
    } else {
        return false;
    }
}

async function addToCart(productId) {
    await fetch(`/api/cart/plus/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    await refreshCart();
}

async function delToCart(productId) {
    await fetch(`/api/cart/minus/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    await refreshCart();
}

async function deleteFromCart(productId) {
    await fetch(`/api/cart/delete/${productId}`, {
        method: 'POST',
    });
    await refreshCart();
}

async function refreshCart() {
    const response = await fetch('/api/cart');
    const data = await response.json();
    displayTable(data.cart);
}

async function logout() {
    const response = await fetch('/api/logout');
    if (response.status === 200) {
        showLoginForm();
        window.location.href = '/home';
    }
}

function total() {
    let sum = [];
    let count = [];
    
    const rows = document.querySelectorAll('.data-product');
    rows.forEach((row) => {
        price = row.querySelectorAll('.product-price');
        quantity = row.querySelectorAll('.quantityCount');
        
        price.forEach((p) => {
            sum.push(Number(p.innerHTML));
        })
        quantity.forEach((q) => {
            // count.push(Number(q.innerHTML));
            count.push(Number(q.innerHTML));
        })
        
        let total = 0;
        for (i = 0; i < sum.length; i++) {
            total += (sum[i] * count[i]);
            console.log(sum[i], count[i])
        }
        document.getElementById('total').innerHTML = `${total}`;
    })

}

function showProfile(username) {
    document.getElementById('name').textContent = username;
    document.getElementById('user-info').style.display = 'flex';
}

function showLoginForm() {
    document.getElementById('user-info').style.display = 'none';
}
