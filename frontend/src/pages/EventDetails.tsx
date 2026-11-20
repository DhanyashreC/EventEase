import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MapPin, Calendar, Clock, ArrowLeft } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
}

function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const data = await response.json();

        const foundEvent = data.events.find(
          (event: Event) => event.id === id
        );

        setEvent(foundEvent || null);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="event-details-loading">Loading event details...</div>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="event-details-not-found">
          <h2>Event not found 😕</h2>
          <Link to="/events">← Back to Events</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="event-details-page">
        <Link to="/events" className="back-to-events">
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        <div className="event-details-container">
          <div className="event-details-image">
            <img src={event.imageUrl} alt={event.title} />
          </div>

          <div className="event-details-content">
            <span className="event-details-category">{event.category}</span>

            <h1>{event.title}</h1>

            <div className="event-details-info">
              <div className="event-info-item">
                <Calendar size={20} />
                <div>
                  <strong>Date</strong>
                  <p>{formatDate(event.startDate)}</p>
                </div>
              </div>

              <div className="event-info-item">
                <Clock size={20} />
                <div>
                  <strong>Time</strong>
                  <p>
                    {formatTime(event.startDate)} - {formatTime(event.endDate)}
                  </p>
                </div>
              </div>

              <div className="event-info-item">
                <MapPin size={20} />
                <div>
                  <strong>Location</strong>
                  <p>{event.location}</p>
                </div>
              </div>
            </div>

            <div className="event-details-description">
              <h2>About this Event</h2>
              <p>{event.description}</p>
            </div>

            <Link
  to={`/events/${event.id}/book`}
  className="book-tickets-button"
>
  Book Tickets 🎟️
</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventDetails;



