import { useAuth } from "../context/useAuth";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Landing.css";

function Landing() {
  const { requireAuth } = useAuth();

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToFeatures = () => {
    document
      .getElementById("features")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
    <Navbar />
    <div className="page active">

      {/* HERO */}

      <div className="hero">
        <div className="hero-bg"></div>

        <div className="hero-content">
          <div className="hero-badge fade-up">
            🌾 Smart Crop Recommendation System
          </div>

          <h1
            className="hero-title fade-up"
            style={{ animationDelay: ".1s" }}
          >
            Grow Smarter with
            <br />
            <em>Intelligent</em> Crop Insights
          </h1>

          <p
            className="hero-sub fade-up"
            style={{ animationDelay: ".2s" }}
          >
            AgriMind uses soil science and data analysis to
            recommend the perfect crops for your land —
            maximizing yield, profit, and sustainability.
          </p>

          <div
            className="hero-btns fade-up"
            style={{ animationDelay: ".3s" }}
          >
            <button
              className="btn-primary"
              onClick={() =>
                requireAuth("/dashboard")
              }
            >
              🚜 Get Recommendation
            </button>

            <button
              className="btn-secondary"
              onClick={scrollToFeatures}
            >
              Learn More ↓
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-num">22+</span>
          <div className="stat-label">
            Crops Supported
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-num">12K+</span>
          <div className="stat-label">
            Farmers Served
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-num">₹2.4Cr</span>
          <div className="stat-label">
            Profit Generated
          </div>
        </div>
      </div>

      {/* FEATURES */}

      <div
        className="section"
        id="features"
      >
        <div className="section-tag">
          ✨ Features
        </div>

        <h2 className="section-title">
          Everything You Need to Farm Intelligently
        </h2>

        <p className="section-sub">
          From soil analysis to profit forecasting,
          AgriMind gives you the complete agriculture
          toolkit.
        </p>

        <div className="features-grid">

          <div className="feature-card">
            <div
              className="feature-icon"
              style={{
                background: "var(--green4)",
              }}
            >
              🌾
            </div>

            <div className="feature-title">
              Crop Recommendation
            </div>

            <div className="feature-desc">
              Precise crop suggestions based on N-P-K,
              pH, temperature, humidity and rainfall.
            </div>
          </div>

          <div className="feature-card">
            <div
              className="feature-icon"
              style={{
                background: "#FFF3CD",
              }}
            >
              🧪
            </div>

            <div className="feature-title">
              Soil Health Analysis
            </div>

            <div className="feature-desc">
              Visualize nutrient balance, pH levels,
              and soil quality scores.
            </div>
          </div>

          <div className="feature-card">
            <div
              className="feature-icon"
              style={{
                background: "#FFE8D6",
              }}
            >
              💰
            </div>

            <div className="feature-title">
              Profit & Loss Tracking
            </div>

            <div className="feature-desc">
              Track investment and revenue in INR.
            </div>
          </div>

          <div className="feature-card">
            <div
              className="feature-icon"
              style={{
                background: "#EAD7F7",
              }}
            >
              📅
            </div>

            <div className="feature-title">
              Seasonal Calendar
            </div>

            <div className="feature-desc">
              Know exactly when to sow and harvest.
            </div>
          </div>

          <div className="feature-card">
            <div
              className="feature-icon"
              style={{
                background: "#D1ECF1",
              }}
            >
              📊
            </div>

            <div className="feature-title">
              Crop History & Analytics
            </div>

            <div className="feature-desc">
              Analyze past crops and profits.
            </div>
          </div>

          <div className="feature-card">
            <div
              className="feature-icon"
              style={{
                background: "#FDECEA",
              }}
            >
              📄
            </div>

            <div className="feature-title">
              PDF Report Export
            </div>

            <div className="feature-desc">
              Download detailed crop reports.
            </div>
          </div>

        </div>
      </div>

      {/* FAQ */}

      <div
        className="section"
        style={{ paddingTop: 0 }}
      >
        <div className="section-tag">
          ❓ FAQ
        </div>

        <h2 className="section-title">
          Common Questions
        </h2>

        <div
          style={{
            maxWidth: "600px",
          }}
        >
          <div
            className={`faq-item ${
              openFaq === 0 ? "open" : ""
            }`}
            onClick={() => toggleFaq(0)}
          >
            <div className="faq-q">
              How accurate is AgriMind's recommendation?
              <span className="faq-arrow">
                ⌄
              </span>
            </div>

            {openFaq === 0 && (
              <div className="faq-a">
                The current version uses rule-based
                recommendations. Future versions will
                display trained ML model accuracy.
              </div>
            )}
          </div>

          <div
            className={`faq-item ${
              openFaq === 1 ? "open" : ""
            }`}
            onClick={() => toggleFaq(1)}
          >
            <div className="faq-q">
              What inputs does the system need?
              <span className="faq-arrow">
                ⌄
              </span>
            </div>

            {openFaq === 1 && (
              <div className="faq-a">
                N, P, K values, temperature,
                humidity, pH and rainfall.
              </div>
            )}
          </div>

          <div
            className={`faq-item ${
              openFaq === 2 ? "open" : ""
            }`}
            onClick={() => toggleFaq(2)}
          >
            <div className="faq-q">
              When does profit data appear?
              <span className="faq-arrow">
                ⌄
              </span>
            </div>

            {openFaq === 2 && (
              <div className="faq-a">
                Profit analytics appear after
                marking a crop as grown and
                entering revenue.
              </div>
            )}
          </div>

          <div
            className={`faq-item ${
              openFaq === 3 ? "open" : ""
            }`}
            onClick={() => toggleFaq(3)}
          >
            <div className="faq-q">
              Is my data saved?
              <span className="faq-arrow">
                ⌄
              </span>
            </div>

            {openFaq === 3 && (
              <div className="faq-a">
                Yes. Recommendations and history
                are stored locally.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
}

export default Landing;