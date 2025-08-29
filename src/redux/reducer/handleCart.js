const cart = []

const handleCart = (state = cart, action) => {
    const product = action.payload;
    switch (action.type) {
        case "ADDITEM":
            // Check if product is already in cart
            const exist = state.find((x) => x.id === product.id);
            if (exist) {
                // If it exists, increase the quantity
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                // If it does not exist, add the new product
                return [
                    ...state, { ...product, qty: 1 }
                ];
            }

        case "DELITEM":
            // Check if the product's quantity is 1
            const exist2 = state.find((x) => x.id === product.id);
            if (exist2.qty === 1) {
                // If it is, remove the product from the cart
                return state.filter((x) => x.id !== exist2.id);
            } else {
                // Otherwise, decrease the quantity
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty - 1 } : x
                );
            }

        default:
            return state;
    }
}

export default handleCart;