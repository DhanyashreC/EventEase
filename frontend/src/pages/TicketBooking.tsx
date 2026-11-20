import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MapPin, Calendar, Minus, Plus, ArrowLeft } from "lucide-react";

interface Event {
  id: string;
  title: string;
  category: string;
  location: string;
  imageUrl?: string | null;
  startDate: string;
}

interface Ticket {
  id: string;
  name: string;
  price: number | string;
  totalQuantity: number;
  availableQuantity: number;
}

function TicketBooking() {
  const { id } = useParams<{ id: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [ticketLoading, setTicketLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch event details
        const eventResponse = await fetch(
          "http://localhost:5000/api/events"
        );

        const eventData = await eventResponse.json();

        const foundEvent = eventData.events.find(
          (event: Event) => event.id === id
        );

        setEvent(foundEvent || null);

        // Fetch real ticket types
        const ticketResponse = await fetch(
          `http://localhost:5000/api/events/${id}/tickets`
        );

        const ticketData = await ticketResponse.json();

        if (!ticketResponse.ok) {
          throw new Error(ticketData.message || "Failed to fetch tickets");
        }

        setTickets(ticketData.ticketTypes || []);
      } catch (error) {
        console.error("Failed to fetch booking data:", error);
        setError("Unable to load ticket information. Please try again.");
      } finally {
        setLoading(false);
        setTicketLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const updateQuantity = (ticket: Ticket, change: number) => {
    setQuantities((previous) => {
      const currentQuantity = previous[ticket.id] || 0;

      const totalSelected = Object.values(previous).reduce(
        (total, quantity) => total + quantity,
        0
      );

      if (change > 0) {
        if (totalSelected >= 10) return previous;

        if (currentQuantity >= ticket.availableQuantity) {
          return previous;
        }
      }

      const newQuantity = Math.max(
        0,
        Math.min(ticket.availableQuantity, currentQuantity + change)
      );

      return {
        ...previous,
        [ticket.id]: newQuantity,
      };
    });
  };

  const totalTickets = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const totalPrice = tickets.reduce(
    (total, ticket) =>
      total + Number(ticket.price) * (quantities[ticket.id] || 0),
    0
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="booking-loading">Loading booking page...</div>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="booking-loading">
          <h2>Event not found</h2>
          <Link to="/events">Back to Events</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="booking-page">
        <Link to={`/events/${event.id}`} className="booking-back">
          <ArrowLeft size={18} />
          Back to Event
        </Link>

        <div className="booking-header">
          <span className="section-label">TICKET BOOKING</span>
          <h1>
            Book your <span>tickets.</span>
          </h1>
          <p>Select your ticket type and quantity below.</p>
        </div>

        <div className="booking-layout">
          <section className="ticket-selection">
            <div className="booking-event-card">
              {event.imageUrl && (
                <img src={event.imageUrl} alt={event.title} />
              )}

              <div>
                <span className="event-category">{event.category}</span>
                <h2>{event.title}</h2>

                <p>
                  <Calendar size={16} />
                  {new Date(event.startDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <p>
                  <MapPin size={16} />
                  {event.location}
                </p>
              </div>
            </div>

            <h2 className="ticket-selection-title">Choose your tickets</h2>

            {ticketLoading ? (
              <p>Loading ticket types...</p>
            ) : error ? (
              <p className="booking-error">{error}</p>
            ) : tickets.length === 0 ? (
              <p>No tickets are currently available for this event.</p>
            ) : (
              tickets.map((ticket) => (
                <div className="ticket-card" key={ticket.id}>
                  <div className="ticket-info">
                    <h3>{ticket.name}</h3>

                    <p>
                      {ticket.availableQuantity > 0
                        ? `${ticket.availableQuantity} tickets available`
                        : "Sold out"}
                    </p>

                    <strong>₹{Number(ticket.price).toLocaleString("en-IN")}</strong>
                  </div>

                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => updateQuantity(ticket, -1)}
                      disabled={(quantities[ticket.id] || 0) === 0}
                    >
                      <Minus size={16} />
                    </button>

                    <span>{quantities[ticket.id] || 0}</span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(ticket, 1)}
                      disabled={
                        totalTickets >= 10 ||
                        (quantities[ticket.id] || 0) >=
                          ticket.availableQuantity
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>

          <aside className="booking-summary">
            <h2>Booking Summary</h2>

            <div className="summary-row">
              <span>Total tickets</span>
              <strong>{totalTickets}</strong>
            </div>

            {tickets.map(
              (ticket) =>
                (quantities[ticket.id] || 0) > 0 && (
                  <div className="summary-row" key={ticket.id}>
                    <span>
                      {ticket.name} × {quantities[ticket.id]}
                    </span>

                    <strong>
                      ₹
                      {(
                        Number(ticket.price) * quantities[ticket.id]
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>
                )
            )}

            <div className="summary-total">
              <span>Total Amount</span>
              <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
            </div>

            <button
              className="proceed-booking-button"
              disabled={totalTickets === 0}
              onClick={() =>
                alert("Booking confirmation will be implemented next! 🎟️")
              }
            >
              Continue
            </button>

            <p className="booking-note">
              Select at least one ticket to continue. Maximum 10 tickets per
              booking.
            </p>
          </aside>
        </div>
      </main>
    </>
  );
}

export default TicketBooking;