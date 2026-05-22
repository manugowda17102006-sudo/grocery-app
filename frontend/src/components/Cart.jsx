function Cart({ cart, onRemove, onCheckout }) {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add groceries to see prices and checkout.</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className="cart-item">
            <h4>{item.name}</h4>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <button onClick={() => onRemove(item.id)}>Remove</button>
          </div>
        ))
      )}
      <div>
        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
        <button onClick={onCheckout} disabled={cart.length === 0}>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
