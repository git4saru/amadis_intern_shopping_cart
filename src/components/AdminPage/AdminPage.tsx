import React, { useState, useEffect } from "react";
import ProductBox from "../ProductBox";
import Popup from "../Popup/Popup";
import classes from "./AdminPage.module.scss";

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

const AdminPage: React.FC<AdminPageProps> = ({ onRemoveProduct }) => {
  const [showEditingProductPopup, setShowEditingProductPopup] =
    useState<boolean>(false);
  const [currentlyEditingProduct, setCurrentlyEditingProduct] =
    useState<any>(null);
  const [popupMode, setPopupMode] = useState<"Add" | "Edit">("Add");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch existing products from the backend when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3008/products", {
        // mode: "no-cors",
      });
      console.log("data before==================>", response);
      const data = await response.json();
      console.log("data==================>", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async () => {
    const price = productPrice;

    if (productName && !isNaN(price) && price > 0) {
      try {
        const response = await fetch("http://localhost:3008/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: productName,
            price: price,
            stock: productStock,
          }),
        });

        if (response.ok) {
          const newProduct: Product = await response.json();
          // Update the products state by including the new product
          setProducts((prevProducts) => [...prevProducts, newProduct]);
          setProductName("");
          setProductPrice(0);
          window.location.reload();
        } else {
          console.error("Failed to add product:", response.status);
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };

  const handleUpdateProduct = async (updatedData: any) => {
    const { productName, productPrice, productStock, productId } = updatedData;
    const price = parseFloat(productPrice);

    if (productName && !isNaN(price) && price > 0) {
      try {
        const response = await fetch(
          `http://localhost:3008/product/${productId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: productName,
              price: price,
              stock: productStock,
            }),
          }
        );

        if (response.ok) {
          const updatedProduct = await response.json();
          // Update the products state by replacing the product with the updated one
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === productId ? updatedProduct : product
            )
          );
          setProductName("");
          setProductPrice(0);
          window.location.reload();
        } else {
          console.error("Failed to update product:", response.status);
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {
      console.log("Please enter valid data", productName, price, productStock);
    }
  };

  const handleRemoveProduct = async (productId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3008/product/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update the products state by excluding the removed product
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        // Notify the parent component (if needed) that a product has been removed
        onRemoveProduct(productId);
        window.location.reload();
      } else {
        console.error("Failed to remove product:", response.status);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  function AddOrEditProduct(title: string, price: number, stock: number) {
    return (
      <>
        <h2>{popupMode === "Edit" ? "Edit product" : "Add Product"}</h2>
        <div>
          <label>
            Product Name:
            <input
              type="text"
              value={title}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Product Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setProductPrice(e.target.value as any)}
            />
          </label>
        </div>
        <div>
          <label>
            Quantity:
            <input
              type="number"
              value={stock}
              onChange={(e) => setProductStock(e.target.value as any)}
            />
          </label>
        </div>
        <button
          onClick={
            popupMode === "Edit"
              ? () =>
                  handleUpdateProduct({
                    productName,
                    productPrice,
                    productStock,
                    productId: currentlyEditingProduct,
                  })
              : handleAddProduct
          }
        >
          {popupMode === "Edit" ? "Update Product" : "Add Product"}
        </button>
        {showEditingProductPopup && (
          <button onClick={() => setShowEditingProductPopup(false)}>
            Cancel
          </button>
        )}
      </>
    );
  }

  let popupData = AddOrEditProduct(
    currentlyEditingProduct ? currentlyEditingProduct.title : productName,
    currentlyEditingProduct ? currentlyEditingProduct.price : productPrice,
    currentlyEditingProduct ? currentlyEditingProduct.stock : productStock
  );
  if (popupMode === "Edit") {
    popupData = AddOrEditProduct(productName, productPrice, productStock);
  }

  return (
    <div>
      {showEditingProductPopup && <Popup content={<>{popupData}</>} />}
      <button
        className={classes.addProductBtn}
        onClick={() => {
          setShowEditingProductPopup(true);
          setPopupMode("Add");
          setCurrentlyEditingProduct(null);
          setProductName("");
          setProductPrice(0);
          setProductStock(0);
        }}
      >
        Add New Product
      </button>
      <h2>Admin Page</h2>

      <div className={classes.products}>
        {products.map((product, productIndex) => (
          <div key={`product_${productIndex}`}>
            <ProductBox
              product={product}
              footer={
                <>
                  <button
                    onClick={() => {
                      setShowEditingProductPopup(true);
                      setPopupMode("Edit");
                      setCurrentlyEditingProduct(product.id);
                      setProductName(product.title);
                      setProductPrice(product.price);
                      setProductStock(product.stock);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className={classes.removeBtn}
                  >
                    Remove
                  </button>
                </>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
