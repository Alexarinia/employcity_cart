const dollarRate = 70;

export function priceInRoubles(dollarPrice) {
    return Math.round(dollarPrice * dollarRate);
}