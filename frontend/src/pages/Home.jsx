import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Check, Droplets, HelpCircle, Leaf, Play, Sprout, TrendingUp, Users, ShieldCheck, Database, FileText, Smartphone, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";

const heroImage = "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=2200&q=88";
const cardImages = [
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1523742813191-6b3f0b5e2b5a?auto=format&fit=crop&w=900&q=82"
];
const processImages = [
  "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=900&q=82"
];
const farmerImages = [
  "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=500&q=82",
  "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=500&q=82",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=500&q=82"
];

function SectionTitle({ eyebrow, title, hindi }) {
  return (
    <div className="section-title">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {hindi && <div className="section-hindi">{hindi}</div>}
    </div>
  );
}

export default function Home() {
  const { loggedIn } = useAuth();
  const [modal, setModal] = useState(false);
  const [target, setTarget] = useState("/prediction");

  const requireLogin = (to = "/prediction") => {
    if (loggedIn) window.location.href = to;
    else { setTarget(to); setModal(true); }
  };

  return (
    <>
      <LoginModal open={modal} onClose={() => setModal(false)} redirectTo={target} />

      <section className="hero-section" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,52,28,.82) 0%, rgba(5,52,28,.46) 42%, rgba(5,52,28,.10) 72%), url(${heroImage})` }}>
        <div className="hero-overlay-pattern" />
        <div className="hero-inner">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="hero-content">
            <div className="hero-brand"><span className="hero-brand-icon"><Leaf size={25} /></span> FasalSathi <span>| फसल साथी</span></div>
            <h1>किसानों का AI साथी</h1>
            <h2>Farmer's AI Companion</h2>
            <p>Get AI-powered crop yield predictions, personalized recommendations, and optimize your harvest with data-driven agricultural insights.</p>
            <div className="hero-actions">
              <button onClick={() => requireLogin()} className="primary-btn">Get Started <ArrowRight size={19} /></button>
              <button className="secondary-btn"><Play size={17} fill="currentColor" /> Watch Video</button>
            </div>
            <div className="hero-checks"><span><Check /> 100% Free</span><span><Check /> Available in 8 Languages</span><span><Check /> Ministry of Agriculture Initiative</span></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .25 }} className="yield-float">
            <div className="yield-title"><TrendingUp size={18} /> Better Yield</div>
            <div className="mini-bars"><i /><i /><i /><i /><i /><i /></div>
            <span>AI insight</span>
          </motion.div>
        </div>
      </section>

      <section className="content-section challenges-section">
        <div className="two-col-head">
          <SectionTitle eyebrow="THE CHALLENGE" title="Farmers Face These Challenges" hindi="किसानों की रोज़मर्रा की सामान्य समस्याएँ" />
          <SectionTitle eyebrow="THE SOLUTION" title="How FasalSathi Helps" hindi="फसल साथी कैसे मदद करता है" />
        </div>
        <div className="two-col-grid">
          <div className="challenge-grid">
            {[
              [BarChart3, "Uncertain Harvest", "Farmers cannot predict yield accurately due to weather, soil, and market fluctuations.", "30–50% yield loss annually", "orange"],
              [HelpCircle, "No Expert Guidance", "Limited access to agricultural experts and timely field-level advice.", "1 expert per 1000 farmers", "blue"],
              [Droplets, "Inefficient Resource Use", "Over/under use of water, fertilizers, and pesticides can reduce productivity.", "₹20,000 crore wasted annually", "green"]
            ].map(([Icon, title, desc, stat, tone], i) => (
              <motion.article whileHover={{ y: -5 }} key={title} className="challenge-card">
                <div className={`round-icon ${tone}`}><Icon size={25} /></div>
                <div className="challenge-photo" style={{ backgroundImage: `url(${cardImages[i]})` }} />
                <h3>{title}</h3>
                <p>{desc}</p>
                <strong className={tone}>{stat}</strong>
              </motion.article>
            ))}
          </div>

          <div className="solution-list">
            {[
              ["Know Your Harvest in Advance", "Get accurate yield predictions 2–3 months before harvest using AI and agricultural data.", "85%+ accuracy in predictions"],
              ["Understand What Affects Your Crop", "See exactly which factors are helping or hurting your yield and understand the reasons.", "Transparent, explainable AI"],
              ["Get Actionable Steps", "Receive personalized recommendations for irrigation, fertilizer, crop management and more.", "10–15% yield improvement scenario"]
            ].map(([title, desc, benefit], i) => (
              <div className="solution-card" key={title}>
                <div className="solution-image" style={{ backgroundImage: `url(${cardImages[i]})` }} />
                <div className="solution-copy"><h3>{title}</h3><p>{desc}</p><span><Check size={15} /> {benefit}</span></div>
                <button onClick={() => requireLogin()} className="try-btn">Try Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="impact-strip">
        <div className="impact-inner">
          <div className="impact-heading"><h2>Impact at a Glance</h2><span>एक नज़र में प्रभाव</span></div>
          {[[Users, "50,000+", "Farmers Benefited"], [TrendingUp, "10–15%", "Average Yield Increase"], [Leaf, "12", "Crops Supported"], [ShieldCheck, "8", "Languages Available"]].map(([Icon, number, label]) => (
            <div className="impact-stat" key={label}><div className="impact-icon"><Icon size={26} /></div><div><strong>{number}</strong><span>{label}</span></div></div>
          ))}
        </div>
      </section>

      <section className="content-section process-section">
        <SectionTitle eyebrow="HOW IT WORKS" title="Simple 3-Step Process" hindi="सरल 3-चरणीय प्रक्रिया" />
        <div className="process-grid">
          {[
            ["1", "Fill Farm Information", "Enter crop type, location, soil details, and farming practices."],
            ["2", "AI Processes Your Data", "Our AI analyzes farm factors including weather, soil, and historical data."],
            ["3", "Receive Action Plan", "Get personalized yield prediction and optimization recommendations."]
          ].map(([n, title, desc], i) => (
            <div className="process-card" key={n}>
              <div className={`step-number step-${i + 1}`}>{n}</div>
              <div className="process-image" style={{ backgroundImage: `url(${processImages[i]})` }} />
              <div className="process-copy"><h3>{title}</h3><p>{desc}</p><button onClick={() => requireLogin()}>{i === 1 ? "Learn More" : "Get Started"} <ArrowRight size={16} /></button></div>
              {i < 2 && <div className="process-arrow"><ArrowRight size={22} /></div>}
            </div>
          ))}
        </div>
      </section>

      <section className="voices-section">
        <div className="content-section voices-inner">
          <SectionTitle eyebrow="FARMER VOICES" title="What Farmers Say" hindi="किसान क्या कहते हैं" />
          <div className="voice-grid">
            {[
              ["Ramesh Kumar", "Punjab", "“मुझे अपनी फसल के बारे में बेहतर जानकारी और समय पर सलाह मिली।”"],
              ["Suresh Patil", "Maharashtra", "“डेटा और सरल सुझावों से खेत के फैसले समझना आसान हुआ।”"],
              ["Lakshmi Bai", "Tamil Nadu", "“मुझे अपनी फसल की योजना बनाने में मदद मिली।”"]
            ].map(([name, state, quote], i) => (
              <article className="voice-card" key={name}>
                <img src={farmerImages[i]} alt="Farmer" />
                <div><p>{quote}</p><strong>{name}</strong><span>{state}</span><div className="stars">★★★★★</div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="cta-inner"><div className="cta-icon"><Sprout size={42} /></div><div><h2>Ready to Optimize Your Harvest?</h2><p>अपनी फसल को बेहतर बनाने के लिए तैयार हैं?</p></div><button onClick={() => requireLogin()}>Get Started Free <ArrowRight size={18} /></button><button className="download-btn"><Smartphone size={18} /> Download App</button><div className="cta-points"><span>✓ No Registration Required</span><span>✓ 100% Free</span><span>✓ Available 24/7</span></div></div>
      </section>
    </>
  );
}
