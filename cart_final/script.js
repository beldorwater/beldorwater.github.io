/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00;
var fadeTime = 300;
var features = [];
features.push({
    "item": "375ml bottle water",
    "description": "The best purified water of all time. Your body deserves the best give it a threat the Beldor way!.",
    "img": 'images/375ml-2.png',
    "price": 0.50
});
features.push({
    "item": "500ml bottle water",
    "description": "The best purified water of all time. Your friends deserves the best give it a threat them well, the Beldor way!.",
    "img": "images/500ml-2.png",
    "price": 0.75
});
features.push({
    "item": "1L bottle water",
    "description": "The best purified water of all time. Your family deserves the best give them a threat, the Beldor way!.",
    "img": "images/1L-2.png",
    "price": 1.20
});
features.push({
    "item": "1.5L bottle water",
    "description": "The best purified water of all time. Your body deserves the best give it a threat the Beldor way!.",
    "img": 'images/1.5L-2.png',
    "price": 2.80
});
features.push({
    "item": "7L bottle water",
    "description": "The best purified water of all time. Your friends deserves the best give it a threat them well, the Beldor way!.",
    "img": "images/7L-2.png",
    "price": 8.99
});
features.push({
    "item": "25L bottle water",
    "description": "The best purified water of all time. Your family deserves the best give them a threat, the Beldor way!.",
    "img": "images/25l-2.png",
    "price": 15.50
});


/* Assign actions */
$('.product-quantity input').change(function () {
    updateQuantity(this);
});

$('.product-removal button').click(function () {
    removeItem(this);
});

function addProduct(id) {
    addtoCart(features[id]);
}
// $('.add-product').click(function(){
//   //alert('called add..');
//   addtoCart(features[parseInt($('#addSelect').val())]);
// });
function addtoCart(feature) {
   $('.column-labels').after('<div class="product"><div class="product-image"><img src="' + feature.img + '"></div><div class="product-details"><div class="product-title">' + feature.item + '</div><p class="product-description">' + feature.description + '</p></div><div class="product-price">' + feature.price + '</div><div class="product-quantity"><input type="number" value="1" min="1"></div><div class="product-removal"><button class="remove-product">Remove</button></div><div class="product-line-price">' + feature.price + '</div></div>');
  $('.product-removal button').unbind();
   $('.product-quantity button').unbind();
   $('.product-removal button').click(function () {
        removeItem(this);
    });
    $('.product-quantity input').change(function () {
        updateQuantity(this);
    });
    recalculateCart();
}
/* Recalculate cart */
function recalculateCart() {
    var subtotal = 0;

    /* Sum up row totals */
    $('.product').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;

    /* Update totals display */
   $('.totals-value').fadeOut(fadeTime, function () {
       $('#cart-subtotal').html(subtotal.toFixed(2));
       $('#cart-tax').html(tax.toFixed(2));
       $('#cart-shipping').html(shipping.toFixed(2));
      $('#cart-total').html(total.toFixed(2));
        if (total == 0) {
            $('.checkout').fadeOut(fadeTime);
        } else {
           $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}


/* Update quantity */
function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
       $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}


/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
    });
}
