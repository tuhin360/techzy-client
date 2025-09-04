import useCart from "../../../hooks/useCart";

 

const Cart = () => {

    const [cart] = useCart();

    return (
        <div>
            <h2>This is Cart: {cart.length}</h2>
        </div>
    );
};

export default Cart;