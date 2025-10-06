import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

// admin panel ucundu
const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    ram: "",
    storage: "",
    size: "",
    gpu: "",
    description: "",
    image: "",
  });
  // edit etmek ucun
  const [editingProduct, setEditingProduct] = useState(null);

  // mehsullati getirsin
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };
// form melumat yenilemek
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // elave etmek mehsulu
  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/products", form);
    fetchProducts();
    resetForm();
  };

  // silmekk
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  // edit etmek melumatlari forma getirir
  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setForm({
      name: product.name,
      price: product.price,
      ram: product.ram,
      storage: product.storage,
      size: product.size,
      gpu: product.gpu,
      description: product.description,
      image: product.image,
    });
  };

  // edit olunanlari servere gonderir
  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:5000/api/products/${editingProduct}`, form);
    fetchProducts();
    resetForm();
    setEditingProduct(null);
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      ram: "",
      storage: "",
      size: "",
      gpu: "",
      description: "",
      image: "",
    });
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Panel</h2>

      <form onSubmit={editingProduct ? handleUpdate : handleAdd} className="admin-form">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
        <input type="text" name="ram" value={form.ram} onChange={handleChange} placeholder="RAM" />
        <input type="text" name="storage" value={form.storage} onChange={handleChange} placeholder="Storage" />
        <input type="text" name="size" value={form.size} onChange={handleChange} placeholder="Size" />
        <input type="text" name="gpu" value={form.gpu} onChange={handleChange} placeholder="GPU" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description"></textarea>
        <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
        <button type="submit">{editingProduct ? " Update Product" : " Add Product"}</button>
      </form>

      <h3>Mövcud Məhsullar</h3>
      <div className="products-list">
        {products.map((p) => (
          <div key={p._id} className="product-item">
            <span>{p.name} - {p.price} AZN</span>
            <div>
              <button onClick={() => handleEdit(p)} style={{ background: "#ffc107", marginRight: "10px" }}>✏ Edit</button>
              <button onClick={() => handleDelete(p._id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
