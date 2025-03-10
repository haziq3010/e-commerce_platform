const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyaO4B6SptuLKknCkW-TSAcXimfjMq6FyvuAOV-xVO0c-nsSySwc0TtrZLyiEQuiWpK/exec';

document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const roomNumber = document.getElementById('roomNumber').value;
    const orderData = {
        name: document.getElementById('customerName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        item: document.getElementById('productName').value,
        quantity: document.getElementById('quantity').value,
        total: calculateTotal(),
        cook: document.querySelector('input[name="cook"]:checked').value,
        deliveryType: document.querySelector('input[name="delivery"]:checked').value,
        paymentType: document.querySelector('input[name="payment"]:checked').value,
        room: roomNumber.trim() === '' ? 'None' : roomNumber,
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
