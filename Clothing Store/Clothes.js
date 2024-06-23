document.addEventListener("DOMContentLoaded", function() {
  
  // Select all sections
  const sections = document.querySelectorAll('section');

  // Function to set active section
  function setActiveSection() {
    let foundActive = false;
    sections.forEach(section => {
      const bounding = section.getBoundingClientRect();
      if (
        bounding.top >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      ) {
        // Remove active class from all sections
        sections.forEach(s => s.classList.remove('active'));
        // Add active class to the current section
        section.classList.add('active');
        foundActive = true;
      }
    });

    // If no section is in the viewport, remove active class from all sections
    if (!foundActive) {
      sections.forEach(s => s.classList.remove('active'));
    }
  }

  // Function to scroll to section
  function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60, 
        behavior: 'smooth'
      });
    }
  }

  // Add event listener to nav links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });

  // Add event listener to window scroll
  window.addEventListener('scroll', setActiveSection);

  // Call setActiveSection initially to highlight the current section
  setActiveSection();
});

// Function to calculate total and handle discounts
document.querySelector('.total').addEventListener('click', function() { 
  let total = 0; 
  let receipt = ''; 
  // Select all checked items
  const selectedItems = document.querySelectorAll('.jeans-checkbox:checked, .tshirt-checkbox:checked, .sando-checkbox:checked, .perfume-checkbox:checked, .toy-checkbox:checked'); 
  selectedItems.forEach(item => { 
    // Get quantity and price of each item
    const quantity = parseInt(item.parentElement.querySelector('.quantity').value); 
    const price = parseFloat(item.getAttribute('data-price')); 
    // Deduct stock
    const stock = parseInt(item.parentElement.querySelector('.stock').textContent.split(' ')[1]);
    const updatedStock = stock - quantity;
    item.parentElement.querySelector('.stock').textContent = Stock: ${updatedStock};
    // Calculate total price for each item and add to the total
    total += quantity * price; 
    // Add item details to receipt
    if (quantity > 0) { 
      receipt += ${item.parentElement.querySelector('h2').textContent} x${quantity} = ₱${(quantity * price).toFixed(2)}\n; 
    } 
    // Reset quantity input and uncheck the item
    item.parentElement.querySelector('.quantity').value = '0'; 
    item.checked = false; 
  });

  // Handle discount
  const discountRadio = document.querySelector('input[name="discount"]:checked');
  if (discountRadio) {
    const discountValue = parseFloat(discountRadio.value);
    total -= total * (discountValue / 100);
  }

  // Get the payment method selected
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
  
  // Add charge based on payment method
  if (paymentMethod === 'card') {
    total += 30; // Charge for card payment
  } else if (paymentMethod === 'g-cash') {
    total += 20; // Charge for G-cash payment
  }

  // Get the amount paid by the user
  const amountPaid = parseFloat(document.getElementById('amount-paid').value);
  // Calculate the change
  const change = amountPaid - total;

  // Display total amount and change
  document.getElementById('total-amount').textContent = Total Amount: ₱${total.toFixed(2)};
  document.getElementById('change').textContent = Change: ₱${change.toFixed(2)};

  // Display receipt and total
  alert(Receipt:\n${receipt}\nTotal: ₱${total.toFixed(2)}\nChange: ₱${change.toFixed(2)});
});

// Function to handle quantity buttons
document.querySelectorAll('.quantity-btn').forEach(button => { 
  button.addEventListener('click', function() { 
    const action = this.getAttribute('data-action'); 
    const quantityInput= this.parentElement.querySelector('.quantity'); 
    let quantity = parseInt(quantityInput.value); 
    if (action === 'increase') { 
      quantity++; 
    } else if (action === 'decrease' && quantity > 0) { 
      quantity--; 
    } 
    quantityInput.value = quantity; 
  }); 
});