export class Ecommerce {
    constructor() {
        this.products = [];
        this.cart = [];
    }
    addProduct(product) {
        this.products.push(product);
    }

    setProductPrice(productId, price) {
        const product = this.products.find((product) => product.id === productId);
        if (product) {
            product.price = price;
        }
    }

    getAllProducts() {
        return this.products;
    }
    getAllProductsNames() {
        return this.products.map((product) => product.name).join("; ");
    } 
    getProductById(productId) {
        return this.products.find((product) => product.id === productId);
    }

    getProductsByPrice(initialPrice, finalPrice) {
        return this.products.filter((product) => product.price >= initialPrice && product.price <= finalPrice);
    }
    
    addProductToCart(product) {
        this.cart.push(product);
    }

    getCart() {
        return this.cart;
    }

    getCartTotalPrice() {
        return this.cart.reduce((total, product) => total + product.price, 0);
    }
}

