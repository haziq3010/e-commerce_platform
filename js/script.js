const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyaO4B6SptuLKknCkW-TSAcXimfjMq6FyvuAOV-xVO0c-nsSySwc0TtrZLyiEQuiWpK/exec';

document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const buyButton = document.getElementById('buyButton');
    const originalButtonText = buyButton.innerText;
    buyButton.innerText = 'Please wait...';
    buyButton.disabled = true;
    
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

    setTimeout(function() {
        // Create and show popup
        const popup = document.createElement('div');
        popup.className = 'success-popup';
        popup.innerHTML = '<div class="popup-content"><h3>Order placed!</h3><p>Your order has been successfully placed. Returning home..</p></div>';
        document.body.appendChild(popup);
 
        createConfetti();

        setTimeout(function() {
          window.location.href = 'index.html';
          
          // Reset button (although the page will redirect)
          buyButton.innerText = originalButtonText;
          buyButton.disabled = false;
        }, 7000);
      }, 500);

} catch (error) {
    document.getElementById('message').textContent = "Error placing order!";

    document.getElementById('orderForm').reset();

    setTimeout(function() {
        
        const popup = document.createElement('div');
        popup.className = 'success-popup';
        popup.innerHTML = '<div class="popup-content"><h3>Error when placing order!</h3><p>Your order could not be placed.<br>This may be caused by the item being out of stock or a domain problem.<br>Please contact the admin. Returning you to home..</p></div>';
        document.body.appendChild(popup);
        
        
        setTimeout(function() {
          window.location.href = 'index.html'; 
          
          // Reset button (although the page will redirect)
          buyButton.innerText = originalButtonText;
          buyButton.disabled = false;
        }, 9000);
      }, 500);
}
});

function createConfetti() {
    const confettiCount = 100;
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      container.appendChild(confetti);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
      container.remove();
    }, 3000);
  }

function calculateTotal() {
    const item = document.getElementById('productPrice').value;
    const quantity = document.getElementById('quantity').value;
    return item * quantity;
}

function changeImage(imageSrc) {
    if (imageSrc === 'back') {
        imageSrc = image
    }
            document.getElementById('productImage').src = imageSrc;
        }


    const urlParams = new URLSearchParams(window.location.search);
    const item = urlParams.get('item');
    let price = urlParams.get('price');
    const image = urlParams.get('image');
    const weight = urlParams.get('weight');
    
    if (item.toLowerCase().includes('nasi segera') && weight === '90g') {
        price = 3.50;
    } else if (item.toLowerCase().includes('bubur') && weight === '40g') {
        price = 2.50;
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (item && price) {
            document.getElementById('main-name').innerHTML = item;
            document.getElementById('productName').value = item;
            document.getElementById('productPrice').value = price;
            document.getElementById('productImage').src = image;
            document.getElementById('weight').innerHTML = weight;
            document.getElementById('smallimage').src = image;
        }
    });
    //quantity 
    const pricePerItem = price;

    function updateBuyButton() {
        var quantity = document.getElementById('quantity').value;
        var cookType = document.querySelector('input[name="cook"]:checked').value;
        var deliveryType = document.querySelector('input[name="delivery"]:checked').value;
        message.innerHTML = document.getElementById('phoneNumber').value;
        var additionalCost = 0;
        if (cookType === 'cook') {
            additionalCost += 0.5;
        }
        if (deliveryType === 'delivery_sutera') {
            additionalCost += 1;
        }

        var totalPrice = (parseFloat(pricePerItem) + additionalCost) * quantity;
        var buyButton = document.getElementById('buyButton');
        buyButton.innerHTML = `Beli - RM${totalPrice.toFixed(2)}`;
    }

    function increaseQuantity() {
        var quantity = document.getElementById('quantity');
        quantity.value = parseInt(quantity.value) + 1;
        updateBuyButton();
    }

    function decreaseQuantity() {
        var quantity = document.getElementById('quantity');
        if (quantity.value > 1) {
            quantity.value = parseInt(quantity.value) - 1;
            updateBuyButton();
        }
    }

    // Initialize the button text on page load
    updateBuyButton();

    function toggleRoomNumber() {
            var deliveryType = document.querySelector('input[name="delivery"]:checked').value;
            var roomNumberDiv = document.getElementById('roomNumberDiv');
            if (deliveryType === 'delivery' || deliveryType === 'delivery_sutera') {
                roomNumberDiv.style.display = 'block';
            } else {
                roomNumberDiv.style.display = 'none';
            }
        }
    
