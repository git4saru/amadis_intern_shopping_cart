
import React, { useState } from 'react';

interface AdminPageProps {
  onAddProduct: (product: { name: string; price: number }) => void;
  onRemoveProduct: (productId: number) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onAddProduct, onRemoveProduct }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleAddProduct = () => {
    const price = parseFloat(productPrice);

    if (productName && !isNaN(price) && price > 0) {
      onAddProduct({ name: productName, price });
      setProductName('');

      
      setProductPrice('');
    }
  };

  const handleRemoveProduct = (productId: number) => {
    onRemoveProduct(productId);
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <label>
        Product Name:
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </label>
      <br />
      <label>
        Product Price:
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {/* Display existing products with a remove button */}
        {/* Assume products have unique IDs */}
        {/* Use a better approach in a real application, such as UUIDs */}
        <li>
          Product 1 - $10.99 <button onClick={() => handleRemoveProduct(1)}>Remove</button>
        </li>
        <li>
          Product 2 - $20.99 <button onClick={() => handleRemoveProduct(2)}>Remove</button>
        </li>
      </ul>
    </div>
  );
};

export default AdminPage;
