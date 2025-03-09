const PRICES = { Coffee: 3, Tea: 2, Smoothie: 5 };
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby2Kz6Rm3gIdFOjw7YkhrYcX4vflcg8yNl9hiBkPPU6OxjfUMC9ilhHsn8BBvUHFUU/exec';

document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const roomNumber = document.getElementById('roomNumber').value;
    const orderData = {
        name: document.getElementById('customerName').value,
        phone: document.getElementById('phoneNumber').value,
        item: document.getElementById('productName').value,
        quantity: document.getElementById('quantity').value,
        cook: document.querySelector('input[name="cook"]:checked').value,
        deliveryType: document.querySelector('input[name="delivery"]:checked').value,
        paymentType: document.querySelector('input[name="payment"]:checked').value,
        room: roomNumber.trim() === '' ? 'None' : roomNumber,
        total: calculateTotal(),
        action: 'placeOrder'
    };

try {
    const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(orderData)
    });
    
    document.getElementById('message').textContent = "Order placed successfully!";
    document.getElementById('orderForm').reset();
} catch (error) {
    document.getElementById('message').textContent = "Error placing order!";
}
});

function calculateTotal() {
const item = document.getElementById('productPrice').value;
const quantity = document.getElementById('quantity').value;
return item * quantity;
}
