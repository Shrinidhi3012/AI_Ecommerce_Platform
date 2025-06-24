import { useState } from "react";

export default function AIRecommender() {
  const [interest, setInterest] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setRecommendations("");

    try {
      const response = await fetch("http://localhost:8000/ai/recommend-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interest }),
      });

      const data = await response.json();

      if (response.ok) {
        setRecommendations(data.recommendations);
      } else {
        setError(data.detail || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to reach AI service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-2xl shadow-md bg-white space-y-4">
      <h2 className="text-xl font-semibold">🔍 Personalized AI Recommendations</h2>
      <input
        type="text"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        placeholder="Enter your interest (e.g., gaming, productivity)"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring"
      />
      <button
        onClick={handleSubmit}
        disabled={!interest || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Generating..." : "Get Recommendations"}
      </button>

      {error && <p className="text-red-600 font-medium">{error}</p>}

      {recommendations && (
        <div className="bg-gray-50 p-3 rounded-lg border text-sm whitespace-pre-line">
          {recommendations}
        </div>
      )}
    </div>
  );
}
