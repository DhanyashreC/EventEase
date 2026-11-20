
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";

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

function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search input states
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Applied search states
  const [appliedTitle, setAppliedTitle] = useState("");
  const [appliedLocation, setAppliedLocation] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch events");
        }

        setEvents(data.events || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get unique categories from events
  const categories = [...new Set(events.map((event) => event.category))];

  // Filter events based on applied search
  const filteredEvents = events.filter((event) => {
    const matchesTitle = event.title
      .toLowerCase()
      .includes(appliedTitle.toLowerCase());

    const matchesLocation = event.location
      .toLowerCase()
      .includes(appliedLocation.toLowerCase());

    const matchesCategory =
      appliedCategory === "" || event.category === appliedCategory;

    return matchesTitle && matchesLocation && matchesCategory;
  });

  // Apply search and filters
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    setAppliedTitle(searchTitle.trim());
    setAppliedLocation(searchLocation.trim());
    setAppliedCategory(selectedCategory);
  };

  // Clear everything
  const clearFilters = () => {
    setSearchTitle("");
    setSearchLocation("");
    setSelectedCategory("");

    setAppliedTitle("");
    setAppliedLocation("");
    setAppliedCategory("");
  };

  return (
    <>
      <Navbar />

      <main className="events-page">
        <section className="events-page-header">
          <span className="section-label">DISCOVER EXPERIENCES</span>

          <h1>
            Find your next <span>experience.</span>
          </h1>

          <p>
            Discover events, meet new people, and create memories that last.
          </p>
        </section>

        {/* Search */}
        <form className="events-search" onSubmit={handleSearch}>
          <div className="search-field">
            <Search size={18} />

            <input
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Search events..."
            />
          </div>

          <div className="search-field">
            <MapPin size={18} />

            <input
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Location"
            />
          </div>

          <button type="submit" className="search-button">
            Search Events
          </button>
        </form>

        <section className="events-content">
          {/* Filters */}
          <div className="events-filter">
            <SlidersHorizontal size={18} />
            <span>Filters</span>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="clear-filter-button"
            >
              <X size={15} />
              Clear
            </button>
          </div>

          {/* Events */}
          <div className="events-list">
            <h2>
              {appliedCategory ? appliedCategory : "All Events"}
            </h2>

            <p>
              {loading
                ? "Loading events..."
                : `${filteredEvents.length} event${
                    filteredEvents.length !== 1 ? "s" : ""
                  } found`}
            </p>

            {loading && <p>Loading events...</p>}

            {error && (
              <p style={{ color: "#ff6b6b" }}>
                {error}
              </p>
            )}

            {!loading && !error && events.length === 0 && (
              <p>No events found yet. Check back soon!</p>
            )}

            {!loading &&
              !error &&
              events.length > 0 &&
              filteredEvents.length === 0 && (
                <p>
                  No matching events found. Try changing your search or filters.
                </p>
              )}

            {!loading && !error && filteredEvents.length > 0 && (
              <div className="events-grid">
                {filteredEvents.map((event) => (
                  <article className="event-card" key={event.id}>
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="event-card-image"
                      />
                    ) : (
                      <div className="event-card-image event-image-placeholder">
                        <span>✦ EventEase</span>
                      </div>
                    )}

                    <div className="event-card-content">
                      <span className="event-category">
                        {event.category}
                      </span>

                      <h3>{event.title}</h3>

                      <p>{event.description}</p>

                      <div className="event-card-details">
                        <span>
                          <MapPin size={15} />
                          {event.location}
                        </span>

                        <span>
                          {new Date(event.startDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Events;
