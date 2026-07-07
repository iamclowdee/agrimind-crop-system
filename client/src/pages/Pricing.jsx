import { useState } from "react";
import { useAuth } from "../context/useAuth";
import Navbar from "../components/Navbar";
import "./Pricing.css";

function Pricing() {
    const { requireAuth } = useAuth();

    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(
            openFaq === index
                ? null
                : index
        );
    };

    return (
      <>
        <Navbar />
        <div className="page">

            {/* HERO */}

            <div className="pricing-hero">

                <div
                    style={{
                        textAlign: "center",
                        maxWidth: "700px",
                        margin: "0 auto"
                    }}
                >
                    <div className="hero-badge fade-up">
                        💰 Transparent Pricing
                    </div>

                    <h1
                        className="hero-title fade-up"
                        style={{
                            animationDelay: ".1s"
                        }}
                    >
                        Choose Your Plan
                    </h1>

                    <p
                        className="hero-sub fade-up"
                        style={{
                            animationDelay: ".2s"
                        }}
                    >
                        Start free or upgrade to unlock
                        advanced features.
                    </p>
                </div>
            </div>

            {/* CARDS */}

            <div className="pricing-container">

                {/* FREE */}

                <div className="pricing-card">

                    <div className="pricing-badge">
                        Free
                    </div>

                    <div className="pricing-price">
                        <span className="price-amount">
                            ₹0
                        </span>

                        <span className="price-period">
                            /month
                        </span>
                    </div>

                    <div className="pricing-desc">
                        Perfect for trying AgriMind
                    </div>

                    <button
                        className="btn-pricing btn-pricing-free"
                        onClick={() =>
                            requireAuth("/dashboard")
                        }
                    >
                        Get Started
                    </button>

                    <div className="pricing-features">
                        <div className="pricing-feature">
                            ✓ 5 crop recommendations/month
                        </div>

                        <div className="pricing-feature">
                            ✓ Basic soil health analysis
                        </div>

                        <div className="pricing-feature">
                            ✓ Crop history (10 entries)
                        </div>

                        <div className="pricing-feature">
                            ✓ Email support
                        </div>

                        <div className="pricing-feature disabled">
                            ✕ Advanced analytics
                        </div>

                        <div className="pricing-feature disabled">
                            ✕ PDF export
                        </div>

                        <div className="pricing-feature disabled">
                            ✕ Priority support
                        </div>
                    </div>
                </div>

                {/* PLUS */}

                <div className="pricing-card pricing-card-featured">

                    <div className="pricing-popular">
                        🌟 Most Popular
                    </div>

                    <div className="pricing-badge">
                        Plus
                    </div>

                    <div className="pricing-price">
                        <span className="price-amount">
                            ₹100
                        </span>

                        <span className="price-period">
                            /month
                        </span>
                    </div>

                    <div className="pricing-desc">
                        Ideal for serious farmers
                    </div>

                    <button
                        className="btn-pricing btn-pricing-primary"
                        onClick={() =>
                            requireAuth("/dashboard")
                        }
                    >
                        Subscribe Now
                    </button>

                    <div className="pricing-features">
                        <div className="pricing-feature">
                            ✓ Unlimited recommendations
                        </div>

                        <div className="pricing-feature">
                            ✓ Advanced soil analysis
                        </div>

                        <div className="pricing-feature">
                            ✓ Unlimited crop history
                        </div>

                        <div className="pricing-feature">
                            ✓ Profit & loss tracking
                        </div>

                        <div className="pricing-feature">
                            ✓ Advanced analytics
                        </div>

                        <div className="pricing-feature">
                            ✓ Email support
                        </div>

                        <div className="pricing-feature disabled">
                            ✕ Phone support
                        </div>
                    </div>
                </div>

                {/* PRO */}

                <div className="pricing-card">

                    <div className="pricing-badge">
                        Pro
                    </div>

                    <div className="pricing-price">
                        <span className="price-amount">
                            ₹300
                        </span>

                        <span className="price-period">
                            /month
                        </span>
                    </div>

                    <div className="pricing-desc">
                        For agricultural professionals
                    </div>

                    <button
                        className="btn-pricing btn-pricing-primary"
                        onClick={() =>
                            requireAuth("/dashboard")
                        }
                    >
                        Subscribe Now
                    </button>

                    <div className="pricing-features">
                        <div className="pricing-feature">
                            ✓ Unlimited recommendations
                        </div>

                        <div className="pricing-feature">
                            ✓ Premium soil analysis
                        </div>

                        <div className="pricing-feature">
                            ✓ Unlimited crop history
                        </div>

                        <div className="pricing-feature">
                            ✓ P&L tracking
                        </div>

                        <div className="pricing-feature">
                            ✓ Premium analytics
                        </div>

                        <div className="pricing-feature">
                            ✓ PDF report export
                        </div>

                        <div className="pricing-feature">
                            ✓ Priority support
                        </div>
                    </div>
                </div>

            </div>

            {/* FAQ */}

            <div className="pricing-faq">

                <div
                    className="section-tag"
                    style={{
                        margin: "0 auto 12px"
                    }}
                >
                    ❓ Questions?
                </div>

                <h2
                    className="section-title"
                    style={{
                        textAlign: "center"
                    }}
                >
                    Pricing FAQs
                </h2>

                <div
                    style={{
                        maxWidth: "650px",
                        margin: "0 auto"
                    }}
                >
                    <div
                        className={`faq-item ${
                            openFaq === 0
                                ? "open"
                                : ""
                        }`}
                        onClick={() =>
                            toggleFaq(0)
                        }
                    >
                        <div className="faq-q">
                            Can I upgrade or downgrade anytime?
                            <span className="faq-arrow">
                                ⌄
                            </span>
                        </div>

                        {openFaq === 0 && (
                            <div className="faq-a">
                                Yes. You can change your plan
                                anytime.
                            </div>
                        )}
                    </div>

                    <div
                        className={`faq-item ${
                            openFaq === 1
                                ? "open"
                                : ""
                        }`}
                        onClick={() =>
                            toggleFaq(1)
                        }
                    >
                        <div className="faq-q">
                            Is there a free trial?
                            <span className="faq-arrow">
                                ⌄
                            </span>
                        </div>

                        {openFaq === 1 && (
                            <div className="faq-a">
                                Plus and Pro include a
                                7-day trial.
                            </div>
                        )}
                    </div>

                    <div
                        className={`faq-item ${
                            openFaq === 2
                                ? "open"
                                : ""
                        }`}
                        onClick={() =>
                            toggleFaq(2)
                        }
                    >
                        <div className="faq-q">
                            What payment methods are accepted?
                            <span className="faq-arrow">
                                ⌄
                            </span>
                        </div>

                        {openFaq === 2 && (
                            <div className="faq-a">
                                UPI, cards, net banking
                                and wallets.
                            </div>
                        )}
                    </div>

                    <div
                        className={`faq-item ${
                            openFaq === 3
                                ? "open"
                                : ""
                        }`}
                        onClick={() =>
                            toggleFaq(3)
                        }
                    >
                        <div className="faq-q">
                            Do yearly plans have discounts?
                            <span className="faq-arrow">
                                ⌄
                            </span>
                        </div>

                        {openFaq === 3 && (
                            <div className="faq-a">
                                Yearly subscriptions
                                receive a 20% discount.
                            </div>
                        )}
                    </div>

                    <div
                        className={`faq-item ${
                            openFaq === 4
                                ? "open"
                                : ""
                        }`}
                        onClick={() =>
                            toggleFaq(4)
                        }
                    >
                        <div className="faq-q">
                            What happens if I cancel?
                            <span className="faq-arrow">
                                ⌄
                            </span>
                        </div>

                        {openFaq === 4 && (
                            <div className="faq-a">
                                Your data remains saved and
                                you can resubscribe later.
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </div>
    </>
    );
}

export default Pricing;