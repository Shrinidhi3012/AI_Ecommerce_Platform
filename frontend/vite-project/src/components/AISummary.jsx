import { useState } from "react";

export default function AISummary() {
  const [products, setProducts] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productList = products.split(",").map(p => p.trim());

    const res = await fetch("http://localhost:8000/ai/summarize-products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: productList })
    });

    const data = await res.json();
    setSummary(data.summary);
  };

  return (
    <div className="p-4 border rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">AI Product Summary</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter product names (comma separated)"
          value={products}
          onChange={(e) => setProducts(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Summarize</button>
      </form>
      {summary && (
        <div className="bg-gray-100 p-3 rounded">
          <strong>Summary:</strong> {summary}
        </div>
      )}
    </div>
  );
}
