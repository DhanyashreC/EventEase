import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Event {
  id: string;
  title: string;
  category: string;
  location: string;
  imageUrl?: string | null;
  startDate: string;
}

function Categories() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events || []);
      })
      .catch((err) => console.error("Error fetching events:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(events.map((event) => event.category))];

  return (
    <>
      <Navbar />

      <div style={{ padding: "60px 8%", color: "white" }}>
        <h1>
          Explore <span style={{ color: "#50ead8" }}>Categories</span>
        </h1>

        <p>Discover events based on your interests.</p>

        {loading && <p>Loading categories...</p>}

        {!loading && categories.length === 0 && (
          <p>No categories found.</p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {categories.map((category) => {
            const count = events.filter(
              (event) => event.category === category
            ).length;

            return (
              <div
                key={category}
                onClick={() =>
                  navigate(`/events?category=${encodeURIComponent(category)}`)
                }
                style={{
                  background: "#151922",
                  border: "1px solid #2c3542",
                  padding: "30px",
                  borderRadius: "16px",
                  cursor: "pointer",
                }}
              >
                <h2>{category}</h2>
                <p>{count} events</p>
                <span style={{ color: "#50ead8" }}>
                  Explore →
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Categories;