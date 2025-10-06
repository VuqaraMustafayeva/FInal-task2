import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [id]);

  if (!product) return <div className="page"><p>Loading...</p></div>;

  return (
    <div className="page">
      <button className="btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="product-detail">
        <div className="product-image">
          <img src={product.image || "https://via.placeholder.com/500"} alt={product.name} />
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">${product.price}</p>
          <p>{product.description}</p>
          <div className="specs">
            {product.ram && <div>RAM: {product.ram}</div>}
            {product.storage && <div>Storage: {product.storage}</div>}
            {product.size && <div>Size: {product.size}</div>}
            {product.gpu && <div>GPU: {product.gpu}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

