export const numberOfProducts = (cart) => {
    return cart.reduce((a, b) => a + (b.product && b.quantity), 0);
}

export const calcTotalCartPrice = (cart) => {
    return cart.reduce((a, b) => a + (b.product && b.product.price * b.quantity), 0);
}

export const formatPrice = (priceInCents) => {
    const options = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    };
    // if its a whole, dollar amount, leave off the .00
    if (priceInCents % 100 === 0)
        options.minimumFractionDigits = 0;

    const formatter = new Intl.NumberFormat('en-US', options);
    return formatter.format(priceInCents / 100);
}