export class OutOfStockError extends Error {
    constructor () {
        super(`OutOfStock`);
        this.name = "OutOfStockError";
    }
}