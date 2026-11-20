import Navbar from "../components/Navbar";
import {
  Search,
  MapPin,
  CalendarDays,
  ArrowRight,
  Music,
  Code,
  Palette,
  Trophy,
  Users,
  Sparkles,
} from "lucide-react";

const categories = [
  { name: "Music", icon: Music, color: "pink" },
  { name: "Technology", icon: Code, color: "blue" },
  { name: "Art & Culture", icon: Palette, color: "orange" },
  { name: "Sports", icon: Trophy, color: "green" },
];

const events = [
  {
    title: "Neon Nights Music Festival",
    category: "Music",
    date: "Dec 20, 2026",
    location: "Mangalore",
    price: "₹499",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80",
    color: "pink",
  },
  {
    title: "Tech Innovation Summit",
    category: "Technology",
    date: "Dec 22, 2026",
    location: "Bangalore",
    price: "₹299",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
    color: "blue",
  },
  {
    title: "Creative Arts Exhibition",
    category: "Art & Culture",
    date: "Dec 25, 2026",
    location: "Mangalore",
    price: "₹199",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80",
    color: "orange",
  },
];

function Home() {
  return (
    <>
      <Navbar />

      <main className="home">
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">
              <Sparkles size={16} />
              Discover something unforgettable
            </span>

            <h1>
              Find your next
              <span> unforgettable experience.</span>
            </h1>

            <p>
              Discover amazing events around you. From music festivals to tech
              conferences, find the experiences that bring people together.
            </p>

            <div className="search-box">
              <div className="search-field">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="What event are you looking for?"
                />
              </div>

              <div className="search-field location-field">
                <MapPin size={20} />
                <input type="text" placeholder="Location" />
              </div>

              <button className="search-button">
                Search Events
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>500+</strong>
                <span>Events</span>
              </div>
              <div>
                <strong>10K+</strong>
                <span>Happy attendees</span>
              </div>
              <div>
                <strong>50+</strong>
                <span>Organizers</span>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="categories-section">
          <div className="section-heading">
            <div>
              <span className="section-label">Explore by interest</span>
              <h2>Find your kind of event</h2>
            </div>
            <a href="/events" className="view-link">
              View all <ArrowRight size={16} />
            </a>
          </div>

          <div className="categories-grid">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  className={`category-card ${category.color}`}
                  key={category.name}
                >
                  <div className="category-icon">
                    <Icon size={26} />
                  </div>
                  <h3>{category.name}</h3>
                  <span>Explore events</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* FEATURED EVENTS */}
        <section className="events-section">
          <div className="section-heading">
            <div>
              <span className="section-label">Handpicked for you</span>
              <h2>Featured events</h2>
              <p>Experiences you don't want to miss.</p>
            </div>

            <a href="/events" className="view-link">
              Explore all events <ArrowRight size={16} />
            </a>
          </div>

          <div className="events-grid">
            {events.map((event) => (
              <article className="event-card" key={event.title}>
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <span className={`event-category ${event.color}`}>
                    {event.category}
                  </span>
                  <button className="favorite-button" aria-label="Favorite event">
                    ♡
                  </button>
                </div>

                <div className="event-details">
                  <div className="event-date">
                    <CalendarDays size={15} />
                    {event.date}
                  </div>

                  <h3>{event.title}</h3>

                  <div className="event-location">
                    <MapPin size={15} />
                    {event.location}
                  </div>

                  <div className="event-card-footer">
                    <div>
                      <span className="price-label">Starting from</span>
                      <strong>{event.price}</strong>
                    </div>

                    <button className="event-arrow">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ORGANIZER CTA */}
        <section className="organizer-section">
          <div className="organizer-content">
            <span className="organizer-badge">
              <Users size={16} />
              For event organizers
            </span>

            <h2>
              Have an event?
              <br />
              <span>Let's make it unforgettable.</span>
            </h2>

            <p>
              Create your event, reach your audience, and manage ticket bookings
              effortlessly with EventEase.
            </p>

            <a href="/register" className="organizer-button">
              Start organizing <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-brand">
            <span className="footer-logo">🎟️ EventEase</span>
            <p>Discover experiences. Create memories.</p>
          </div>

          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/events">Explore Events</a>
            <a href="/login">Login</a>
            <a href="/register">Get Started</a>
          </div>

          <div className="footer-bottom">
            © 2026 EventEase. Made for memorable experiences.
          </div>
        </footer>
      </main>
    </>
  );
}

export default Home;