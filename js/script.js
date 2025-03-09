
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby2Kz6Rm3gIdFOjw7YkhrYcX4vflcg8yNl9hiBkPPU6OxjfUMC9ilhHsn8BBvUHFUU/exec';

document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const orderData = {
        name: document.getElementById('customerName').value,
        phone: document.getElementById('phoneNumber').value,
        item: document.getElementById('productName').value,
        quantity: document.getElementById('quantity').value,
        cook: document.getElementById('cook').value,
        deliveryType: document.getElementById('pickup').value,
        paymentType: document.getElementById('payment').value,
        room: document.getElementById('roomNumber').value,
        total: 0,
        action: 'placeOrder'
        // In the orderData object add:
        
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
    const item = document.getElementById('buyButton').value;
    const quantity = document.getElementById('quantity').value;
    return PRICES[item] * quantity;
}