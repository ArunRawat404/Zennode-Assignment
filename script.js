const productAPrice = 20;
const productBPrice = 40;
const productCPrice = 50;
const packageLimit = 10;
const shippingFees = 5;

function flat_10_discount(productAQuantity, productBQuantity, productCQuantity) {
    let total = (productAQuantity * productAPrice) + (productBQuantity * productBPrice) + (productCQuantity * productCPrice)
    return total - ((total * 10) / 100)
}

function bulk_5_discount(productQuantity, productPrice) {
    let productTotal = (productQuantity * productPrice)
    return productTotal - ((productTotal * 5) / 100)
}

function tiered_50_discount(productQuantity, productPrice) {
    discountQuantity = productQuantity - 15;
    return (15 * productPrice) + (((discountQuantity * productPrice) * 50) / 100)
}

function calculateTotal(product) {
    return product.quantity * product.price;
}

document.getElementById("productForm").addEventListener("submit", function (event) {
    // Prevent the form from submitting
    event.preventDefault();

    let productAQuantity = Number(document.getElementById("productA").value);
    let productBQuantity = Number(document.getElementById("productB").value);
    let productCQuantity = Number(document.getElementById("productC").value);

    var giftA = document.getElementById("giftA").checked;
    var giftB = document.getElementById("giftB").checked;
    var giftC = document.getElementById("giftC").checked;

    let discountedPriceFlat10Discount = flat_10_discount(productAQuantity, productBQuantity, productCQuantity);

    let discountedPriceBulk5DiscountTotal = 0;
    if (productAQuantity > 10) {
        let discountedPriceBulk5DiscountA = bulk_5_discount(productAQuantity, productAPrice);
        discountedPriceBulk5DiscountTotal += discountedPriceBulk5DiscountA
    } else {
        discountedPriceBulk5DiscountTotal += (productAQuantity * productAPrice)
    }
    if (productBQuantity > 10) {
        let discountedPriceBulk5DiscountB = bulk_5_discount(productBQuantity, productBPrice);
        discountedPriceBulk5DiscountTotal += discountedPriceBulk5DiscountB
    } else {
        discountedPriceBulk5DiscountTotal += (productBQuantity * productBPrice)
    }
    if (productCQuantity > 10) {
        let discountedPriceBulk5DiscountC = bulk_5_discount(productCQuantity, productCPrice);
        discountedPriceBulk5DiscountTotal += discountedPriceBulk5DiscountC
    } else {
        discountedPriceBulk5DiscountTotal += (productCQuantity * productCPrice)
    }

    let totalQuantity = productAQuantity + productBQuantity + productCQuantity;
    var discountedPriceBulk10Discount;
    if (totalQuantity > 20) {
        discountedPriceBulk10Discount = flat_10_discount(productAQuantity, productBQuantity, productCQuantity)
    }

    let discountedPriceTotal;
    if (totalQuantity > 30) {
        let discountedPriceA = productAQuantity * productAPrice;
        let discountedPriceB = productBQuantity * productBPrice;
        let discountedPriceC = productCQuantity * productCPrice;

        if (productAQuantity > 15) {
            discountedPriceA = tiered_50_discount(productAQuantity, productAPrice)
        } if (productBQuantity > 15) {
            discountedPriceB = tiered_50_discount(productBQuantity, productBPrice)
        } if (productCQuantity > 15) {
            discountedPriceC = tiered_50_discount(productCQuantity, productCPrice)
        }

        discountedPriceTotal = discountedPriceA + discountedPriceB + discountedPriceC;
    }
    let bestDiscountedPrice = Math.min(discountedPriceFlat10Discount, discountedPriceBulk5DiscountTotal, discountedPriceBulk10Discount, discountedPriceTotal)

    let shippingFeesTotal = Math.ceil(totalQuantity / 10) * shippingFees;

    let giftWrapFees = 0;
    if (giftA == true) {
        giftWrapFees += productAQuantity
    }
    if (giftB == true) {
        giftWrapFees += productBQuantity
    }
    if (giftC == true) {
        giftWrapFees += productCQuantity
    }

    var products = [
        { name: "Product A", quantity: productAQuantity, price: productAPrice },
        { name: "Product B", quantity: productBQuantity, price: productBPrice },
        { name: "Product C", quantity: productCQuantity, price: productCPrice }
    ];
    let productDetailsDiv = document.getElementById("productDetails");

    productDetailsDiv.innerHTML = "";

    // Create and append elements for each product
    products.forEach(product => {
        var productDiv = document.createElement("div");
        productDiv.innerHTML = `
            <p><strong>Product Name:</strong> ${product.name}</p>
            <p><strong>Quantity:</strong> ${product.quantity}</p>
            <p><strong>Total Amount:</strong> $${calculateTotal(product)}</p>
        `;
        productDetailsDiv.appendChild(productDiv);
    });

    let discountDiv = document.createElement("div");
    discountDiv.innerHTML = `<p><strong>Best Discount Amount:</strong> $${bestDiscountedPrice}</p>`;
    productDetailsDiv.appendChild(discountDiv);

    var feesDiv = document.createElement("div");
    feesDiv.innerHTML = `<p><strong>Shipping Fee:</strong> $${shippingFeesTotal}</p>
                         <p><strong>Gift Wrap Fee:</strong> $${giftWrapFees}</p>`;
    productDetailsDiv.appendChild(feesDiv);

    var totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<p><strong>Total fees:</strong> $${bestDiscountedPrice + shippingFeesTotal + giftWrapFees}</p>`;
    productDetailsDiv.appendChild(totalDiv);
});