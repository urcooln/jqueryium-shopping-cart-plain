  $(document).ready(function () {
    // Function to update item subtotal and total price
    function updateItemSubtotal(item) {
      const price = parseFloat(item.find('.item-price').text().replace('$', ''));
      const quantity = parseInt(item.find('.quantity').val()) || 0;
      const subtotal = price * quantity;
      item.find('.item-subtotal').text('$' + subtotal.toFixed(2));
      updateTotalPrice();
    }

    // Function to update the total price
    function updateTotalPrice() {
      let totalPrice = 0;
      $('.item').each(function () {
        const subtotalText = $(this).find('.item-subtotal').text().replace('$', '');
        const subtotal = parseFloat(subtotalText) || 0;
        totalPrice += subtotal;
      });
      $('#total-price').text('$ ' + totalPrice.toFixed(2));
    }

    // Event listeners for quantity changes
    $('.quantity').on('input', function () {
      updateItemSubtotal($(this).closest('.item'));
      updateTotalPrice(); // Update the total price when quantity changes
    });

    // Event listeners for item removal
    $('.remove').click(function () {
      $(this).closest('.item').remove();
      updateTotalPrice();
    });

    // Event listener for adding a new item
    $('#fork').click(function () {
      const name = $('#name').val();
      const cost = parseFloat($('#cost').val()) || 0;
      if (name && cost > 0) {
        const newItem = `
          <div class="row item">
            <div class="col-xs-3 item-name">${name}</div>
            <div class="col-xs-3 item-price">$${cost.toFixed(2)}</div>
            <div class="col-xs-3 item-qty">
              <label>Quantity</label>
              <input class="quantity" type="number">
            </div>
            <div class="col-xs-1">
              <button class="remove">Remove</button>
            </div>
            <div class="item-subtotal col-xs-2">$--.--</div>
          </div>`;
        $('.item-list').append(newItem);
        $('#name').val('');
        $('#cost').val('');
        updateItemSubtotal($('.item-list .item:last')); // Update subtotal for the new item
        updateTotalPrice(); // Update the total price after adding a new item

        // Event listener for the new item's remove button
        $('.item-list .item:last .remove').click(function () {
          $(this).closest('.item').remove();
          updateTotalPrice();
        });

        // Event listener for the new item's quantity input
        $('.item-list .item:last .quantity').on('input', function () {
          updateItemSubtotal($(this).closest('.item'));
          updateTotalPrice(); // Update the total price when quantity changes
        });
      }
    });
  });
