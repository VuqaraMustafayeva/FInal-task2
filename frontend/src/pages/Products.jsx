import React, { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // user melumatlarini yoxluyub localda varsa goturur
    const u = localStorage.getItem("user");
    if (u) {
      try {
        const parsed = JSON.parse(u);
        if (parsed.name) setUserName(parsed.name);
      } catch (e) { /* ignore */ }
    } else {
      // token varsa decode edib payload.name goturur (backend token-a name qoyduqda işleyir)
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload && payload.name) setUserName(payload.name);
        } catch (e) {
          // ignore
        }
      }
    }

    
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || (p.description || "").toLowerCase().includes(search.toLowerCase());
    const matchesPrice = !maxPrice || p.price <= parseFloat(maxPrice);
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="page">
     {/* istifadeci adinin gorunmesi ucun */}
      {userName && (
        <div className="user-greeting" style={{}}>
          Welcome, <strong>{userName}</strong>
        </div>
      )}

      <h2>Products</h2>

      <div className="controls">
        <input placeholder="Search by name or description" value={search} onChange={(e) => setSearch(e.target.value)} />
        <input placeholder="Max price" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>

      <ul className="products-grid">
        {filtered.map((p) => <ProductCard key={p._id} product={p} />)}
      </ul>
    </div>
  );
}
