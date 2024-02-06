import React, { useState, useEffect } from 'react';

interface AdminPageProps {
  onAddProduct: (product: { name: string; price: number }) => void;
  onRemoveProduct: (productId: number) => void;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const AdminPage: React.FC<AdminPageProps> = ({ onAddProduct, onRemoveProduct }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch existing products from the backend when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3008/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async () => {
    const price = parseFloat(productPrice);

    if (productName && !isNaN(price) && price > 0) {
      try {
        const response = await fetch('http://localhost:3008/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: productName,
            price: price,
            // Include other product details as needed
          }),
        });

        if (response.ok) {
          const newProduct: Product = await response.json();
          // Update the products state by including the new product
          setProducts((prevProducts) => [...prevProducts, newProduct]);
          setProductName('');
          setProductPrice('');
        } else {
          console.error('Failed to add product:', response.status);
        }
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  const handleRemoveProduct = async (productId: number) => {
    try {
      const response = await fetch(`http://localhost:3008/product/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the products state by excluding the removed product
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
        // Notify the parent component (if needed) that a product has been removed
        onRemoveProduct(productId);
      } else {
        console.error('Failed to remove product:', response.status);
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
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
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price.toFixed(2)}{' '}
            <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;