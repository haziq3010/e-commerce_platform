// Product data
const products = [
    { name: "Iced Coffee", price: 4.99 },
    { name: "Green Tea", price: 3.99 }
];

// Render products
function renderProducts() {
    const container = document.getElementById('products');
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="showOrderForm('${product.name}', ${product.price})">Buy Now</button>
        `;
        container.appendChild(div);
    });
}

// Show order form
function showOrderForm(item, price) {
    document.getElementById('orderModal').style.display = 'block';
    window.currentOrder = { item, price };
}

// Form submission
document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        ...window.currentOrder,
        quantity: document.getElementById('quantity').value,
        cooked: document.getElementById('cooked').value,
        // Add other form field values
        total: window.currentOrder.price * document.getElementById('quantity').value
    };

    await fetch('YOUR_GOOGLE_SCRIPT_URL', {
        method: 'POST',
        body: JSON.stringify(formData)
    });
    alert('Order placed!');
});

renderProducts();


