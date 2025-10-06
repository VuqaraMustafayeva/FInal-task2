import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  if (!products.length) return <p>No products found.</p>;

  return (
    <ul>
      {products.map((p) => <ProductCard key={p._id} product={p} />)}
    </ul>
  );
}
