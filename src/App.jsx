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



        {/* Footer */}
        <footer className="footer">
          <div className="floral-footer-bg"></div>
          <div className="footer-content">
            <h3 className="serif">Gouri & Shridhar</h3>
            <p>We look forward to celebrating with you</p>

            <div className="footer-contact">
              <p className="contact-title">Contact Developer</p>
              <div className="contact-links">
                <a href="https://www.instagram.com/raj.kate99/" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <span className="icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.6.07-4.85.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z"/>
                    </svg>
                  </span> Instagram: raj.kate99
                </a>
                <a href="https://wa.me/918446511816" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <span className="icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.301-.15-1.777-.877-2.052-.976-.275-.099-.475-.15-.675.15-.199.301-.775 1.051-1.001 1.301-.225.251-.45.276-.75.125-.301-.15-1.267-.467-2.414-1.491-.893-.796-1.494-1.78-1.67-2.08-.175-.301-.019-.464.13-.614.136-.134.301-.351.45-.526.15-.176.199-.301.301-.501.099-.201.05-.376-.025-.526-.075-.151-.675-1.627-.925-2.228-.243-.585-.491-.506-.675-.515-.174-.01-.374-.012-.574-.012s-.525.075-.799.375c-.275.301-1.051 1.026-1.051 2.503s1.076 2.903 1.226 3.103c.15.201 2.118 3.235 5.13 4.537.716.309 1.275.494 1.71.632.719.228 1.373.196 1.89.119.577-.085 1.777-.726 2.027-1.426.25-.701.25-1.301.175-1.426-.075-.125-.275-.201-.575-.351z"/>
                    </svg>
                  </span> WhatsApp: +91 8446511816
                </a>
              </div>
            </div>

            <div className="footer-divider"></div>
            <p className="copyright">&copy; 2026 Crafted By Raj Kate</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
