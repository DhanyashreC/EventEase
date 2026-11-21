import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Music,
  Laptop,
  Rocket,
  Camera,
  Utensils,
  PartyPopper,
  ArrowRight,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  imageUrl?: string | null;
  startDate: string;
  endDate: string;
}

const categoryIcons: Record<string, any> = {
  Music: Music,
  Technology: Laptop,
  Tech: Laptop,
  Startup: Rocket,
  Photography: Camera,
  Food: Utensils,
  Dance: PartyPopper,
};

function Categories() {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const data = await response.json();

        if (response.ok) {
          setEvents(data.events || []);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = [...new Set(events.map((event) => event.category))];

  return (
    <>
      <Navbar />

      <main className="categories-page">
        <section className="categories-header">
          <span className="section-label">EXPLORE BY INTEREST</span>

          <h1>
            Explore <span>categories.</span>
          </h1>

          <p>
            Find experiences that match your interests and discover something
            exciting to do.
          </p>
        </section>

        {loading ? (
          <p className="categories-loading">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p>No categories available yet.</p>
        ) : (
          <section className="categories-grid">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || PartyPopper;

              const categoryEvents = events.filter(
                (event) => event.category === category
              );

              return (
                <article
                  key={category}
                  className="category-card"
                  onClick={() =>
                    navigate(`/events?category=${encodeURIComponent(category)}`)
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate(
                        `/events?category=${encodeURIComponent(category)}`
                      );
                    }
                  }}
                >
                  <div className="category-icon">
                    <Icon size={28} />
                  </div>

                  <div className="category-card-content">
                    <h3>{category}</h3>

                    <p>
                      {categoryEvents.length} event
                      {categoryEvents.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <ArrowRight
                    size={20}
                    className="category-arrow"
                  />
                </article>
              );
            })}
          </section>
        )}
      </main>
    </>
  );
}

export default Categories;