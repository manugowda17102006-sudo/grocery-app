function ProductList({ products, onAdd }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          {product.image_url && (
            <div className="product-image-wrapper">
              <img src={product.image_url} alt={product.name} className="product-image" />
            </div>
          )}
          <div className="product-content">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <button onClick={() => onAdd(product)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
