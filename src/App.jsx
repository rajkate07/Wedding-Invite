import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });


  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  // RSVP State
  const [rsvpData, setRsvpData] = useState({
    name: '',
    guests: '1',
    message: ''
  });
  const [rsvpStatus, setRsvpStatus] = useState('idle'); // idle, submitting, success

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const weddingDate = new Date('May 1, 2026 13:52:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOpenInvitation = () => {
    setIsDoorOpen(true);
    // Vibrate on mobile
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }


    setTimeout(() => {
      setIsAnimationFinished(true);
    }, 2500);
  };

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    setRsvpStatus('submitting');

    // Formspree Endpoint
    // IMPORTANT: Sign up at formspree.io, create a form, and replace 'YOUR_FORM_ID' with yours
    const formspreeUrl = "https://formspree.io/f/maqaeneb";

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rsvpData)
      });

      if (response.ok) {
        setRsvpStatus('success');
      } else {
        alert('Oops! There was a problem submitting your RSVP. Please try again.');
        setRsvpStatus('idle');
      }
    } catch (error) {
      alert('Error: Could not connect to the server.');
      setRsvpStatus('idle');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRsvpData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`wedding-site ${isAnimationFinished ? 'content-ready' : 'locked'} ${isDoorOpen ? 'animating-reveal' : ''}`}>
      {/* Opening Door Experience */}
      {!isAnimationFinished && (
        <div className={`door-wrapper ${isDoorOpen ? 'animating' : ''}`}>
          <div className="door-left">
            <div className="door-texture"></div>
            <div className="door-handle left"></div>
          </div>
          <div className="door-right">
            <div className="door-texture"></div>
            <div className="door-handle right"></div>
          </div>

          <div className="door-content">
            <div className="glow-light"></div>
            <button className="open-invitation-btn" onClick={handleOpenInvitation}>
              <span>Tap to Open</span>
            </button>
          </div>

          {/* Falling Petals Background */}
          {isDoorOpen && (
            <div className="petals-container">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="petal"></div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Website Content Wrapped in Reveal Container */}
      <div className="main-content-reveal">


        {/* Navigation */}
        <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''} ${isMenuOpen ? 'nav-open' : ''}`}>
          <div className="nav-container">
            <div className="nav-logo serif">G & S</div>

            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
              <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
            </button>

            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <li><a href="#home" onClick={closeMenu}>Home</a></li>
              <li><a href="#story" onClick={closeMenu}>Story</a></li>
              <li><a href="#events" onClick={closeMenu}>Events</a></li>
              <li><a href="#venue" onClick={closeMenu}>Venue</a></li>

              <li><a href="#rsvp" onClick={closeMenu}>RSVP</a></li>
            </ul>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <p className="fade-in script subtitle">Together with their families</p>
            <h1 className="fade-in main-title">Shridhar & Gouri</h1>
            <p className="fade-in tagline">Invite you to celebrate our wedding</p>
            <div className="date-badge fade-in serif">
              <span className="line"></span>
              <span>01 . 05 . 2026</span>
              <span className="line"></span>
            </div>

          </div>
        </section>

        {/* Countdown Section */}
        <section className="countdown-section">
          <div className="container">
            <h2 className="section-title">Counting Down to the Big Day</h2>
            <div className="countdown-grid">
              <div className="time-box">
                <span className="time-num">{timeLeft.days}</span>
                <span className="time-label">Days</span>
              </div>
              <div className="time-box">
                <span className="time-num">{timeLeft.hours}</span>
                <span className="time-label">Hours</span>
              </div>
              <div className="time-box">
                <span className="time-num">{timeLeft.minutes}</span>
                <span className="time-label">Minutes</span>
              </div>
              <div className="time-box">
                <span className="time-num">{timeLeft.seconds}</span>
                <span className="time-label">Seconds</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section id="story" className="story-section">
          <div className="container story-content">
            <div className="mandala-icon"></div>
            <h2 className="section-title">Our Story</h2>
            <p className="story-text">
              From two separate paths to one shared journey, our love story is a beautiful blend of destiny and togetherness.
              With the blessings of our families, we found our missing piece in each other.
              What began as a simple conversation grew into a deep connection that we are now ready to cherish for a lifetime.
            </p>
            <div className="quote-box">
              <p className="serif">"Together is a beautiful place to be."</p>
            </div>
          </div>
        </section>

        {/* Events Timeline */}
        <section id="events" className="events-section">
          <div className="container">
            <h2 className="section-title">Wedding Events</h2>
            <div className="timeline">
              {/* Haldi */}
              <div className="event-card haldi-card">
                <div className="event-img haldi-img"></div>
                <div className="event-details">
                  <h3 className="serif">Haldi</h3>
                  <p className="event-time">📅 April 30, 2026 | 🕕 6:00 PM</p>
                  <div className="haldi-theme-pill">Theme: Haldi Yellow</div>
                  <p>An evening filled with laughter, love, and traditional turmeric application to prepare the couple for their big day. Join us for this joyful celebration!</p>
                </div>
              </div>

              {/* Wedding */}
              <div className="event-card wedding-card">
                <div className="event-img wedding-img"></div>
                <div className="event-details">
                  <h3 className="serif">Wedding Ceremony</h3>
                  <p className="event-time">📅 May 1, 2026 | ⏱️ 1:52 PM</p>
                  <p>The auspicious moment where two souls become one. We would be honored to have you witness our union at the sacred muhurat.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Venue Section */}
        <section id="venue" className="venue-section">
          <div className="container">
            <h2 className="section-title">Venue</h2>
            <div className="venue-grid">
              <div className="venue-info">
                <h3 className="serif">Tatyasaheb Kore Sanskrutik Hall</h3>
                <p className="venue-address">
                  Nivruti Colony, Warana-Kodoli<br />
                  Tal-Panhala, Dist-Kolhapur
                </p>
                <div className="venue-gallery">
                  <img src="https://content.jdmagicbox.com/comp/kolhapur/x4/0231px231.x231.190913205543.g6x4/catalogue/tatyasaheb-kore-sanskrutik-bhavan-kolhapur-vrw63zyppy-250.jpg" alt="Hall 1" />
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCCRWZWB41403KydQW4YA7nqJxX1vc_bmgXA&s" alt="Hall 2" />
                </div>
                <a
                  href="https://www.google.com/maps/search/Tatyasaheb+Kore+Sanskrutik+Hall+Warana-Kodoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="directions-btn"
                >
                  📍 Get Directions
                </a>
              </div>
              <div className="map-placeholder">
                <div className="map-style-box">
                  {/* Fallback map visual */}
                  <div className="map-overlay">
                    <p>Warana-Kodoli, Kolhapur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Quotes Section */}
        <section className="quotes-section">
          <div className="container quotes-container">
            <div className="quote-slide fade-in">
              <p className="quote-text serif">“Two hearts, one journey, endless memories.”</p>
            </div>
            <div className="quote-slide fade-in">
              <p className="quote-text serif">“Where there is love, there is life.”</p>
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section id="rsvp" className="rsvp-section">
          <div className="container">
            <div className="rsvp-card">
              <h2 className="section-title">RSVP</h2>

              {rsvpStatus === 'success' ? (
                <div className="rsvp-success-msg">
                  <div className="check-circle">✓</div>
                  <h3 className="serif">Response Sent!</h3>
                  <p>Thank you for letting us know. We have received your RSVP via email.</p>
                  <button
                    onClick={() => setRsvpStatus('idle')}
                    className="submit-btn small-btn"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <p className="rsvp-subtitle">Will you be joining us? Please fill out the form below.</p>
                  <form className="rsvp-form" onSubmit={handleRSVPSubmit}>
                    <div className="input-group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={rsvpData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <input
                        type="number"
                        name="guests"
                        placeholder="Number of Guests"
                        min="1"
                        value={rsvpData.guests}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <textarea
                        name="message"
                        placeholder="Message (Optional)"
                        value={rsvpData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <button type="submit" className="submit-btn" disabled={rsvpStatus === 'submitting'}>
                      <span>{rsvpStatus === 'submitting' ? 'Sending...' : 'Send RSVP'}</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="floral-footer-bg"></div>
          <div className="footer-content">
            <h3 className="serif">Gouri & Shridhar</h3>
            <p>We look forward to celebrating with you</p>
            <div className="footer-divider"></div>
            <p className="copyright">&copy; 2026 Crafted with Love</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
