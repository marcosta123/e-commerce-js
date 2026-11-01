export async function addProductToCart(product) {

    const cartUrl = "https://fakestoreapi.com/carts/7";

    const currentDate = new Date().toISOString().split("T")[0];

    const cartData = {
        userId: 1,
        date: currentDate,
        products: [
            {
                productId: product.id,
                quantity: 1
            }
        ],
    };

    const response = await fetch(cartUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify(cartData),
    });
 
    const updatedCart = await response.json();
    console.log(updatedCart);
    return updatedCart;
}

