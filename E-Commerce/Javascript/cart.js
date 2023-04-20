var removeButtons = document.querySelectorAll('.remove-button');
removeButtons.forEach(function(button) {
button.addEventListener('click', function(e) {
e.stopPropagation();
var row = e.target.closest('tr');
row.parentNode.removeChild(row);
var total = 0;
    var rows = document.getElementsByClassName("priceTotal")
  // var rows = document.querySelectorAll('table tbody tr');
  for (var i = 0; i < rows.length; i++) {
    var overallPrice = parseFloat(rows[i].textContent.replace(' Dhs.', ''));
    // var quantity = parseFloat(rows[i].querySelector('input').value);
    total = total + overallPrice;
  }
  document.querySelector('#total').textContent = 'Total: ' + total + ' Dhs.';
updateTotal();
});
});
// Get all quantity input fields
const quantityInputs = document.querySelectorAll('.form-control');

// Add event listener to each input field
quantityInputs.forEach(input => {
    input.addEventListener('change', updateTotal);
});

function updateTotal(event) {
    const input = event.target;
    const tr = input.closest('tr');
    const priceTd = tr.querySelector('td:nth-child(3)');
    const price = parseFloat(priceTd.textContent.substring(0));
    const totalTd = tr.querySelector('td:nth-child(5)');

    totalTd.textContent = `${(input.value * price).toFixed(1)} Dhs.`;
    var total = 0;
    var rows = document.getElementsByClassName("priceTotal")
  // var rows = document.querySelectorAll('table tbody tr');
  for (var i = 0; i < rows.length; i++) {
    var overallPrice = parseFloat(rows[i].textContent.replace(' Dhs.', ''));
    // var quantity = parseFloat(rows[i].querySelector('input').value);
    total = total + overallPrice;
  }
  document.querySelector('#total').textContent = 'Total: ' + total + ' Dhs.';
}