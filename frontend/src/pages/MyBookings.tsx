import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";

interface BookingItem {
  id: string;
  quantity: number;
  price: number | string;
  ticketType: {
    name: string;
  };
}

interface Booking {
  id: string;
  bookingCode: string;
  totalAmount: number | string;
  status: string;
  createdAt: string;
  event: {
    title: string;
    name?: string;
    date?: string;
    venue?: string;
    location?: string;
  };
  items: BookingItem[];
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/bookings/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch bookings");
        }

        setBookings(data.bookings || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

 if (loading) {
  return <div className="my-bookings-page">Loading your bookings...</div>;
}

  if (error) {
    return <div className="my-bookings-page">{error}</div>;
  }

  return (
  <div className="my-bookings-page">
    <button
      className="back-button"
      onClick={() => navigate("/")}
    >
      ← Back
    </button>

    <div className="my-bookings-header">
        <h1>My Bookings 🎟️</h1>
        <p>All your event bookings in one place.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-bookings">
          <h2>No bookings yet</h2>
          <p>You haven't booked any events yet.</p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <div className="booking-card-header">
                <h2>
                  {booking.event?.title || booking.event?.name || "Event"}
                </h2>

                <span className="booking-status">
                  {booking.status}
                </span>
              </div>

              <p className="booking-code">
                Booking Code: <strong>{booking.bookingCode}</strong>
              </p>

              <div className="booking-ticket-details">
                {booking.items.map((item) => (
                  <div key={item.id} className="booking-ticket-item">
                    <span>
                      {item.ticketType.name} × {item.quantity}
                    </span>

                    <span>
                      ₹{Number(item.price) * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="booking-total">
                <span>Total Amount</span>
                <strong>₹{Number(booking.totalAmount)}</strong>
              </div>

              <p className="booking-date">
                Booked on{" "}
                {new Date(booking.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;