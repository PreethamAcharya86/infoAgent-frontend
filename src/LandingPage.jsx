import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  BrainCircuit,
  Database,
  Layers3,
  MessageSquareText,
  Sparkles,
  Zap,
} from "lucide-react";
import { createElement } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const features = [
  {
    number: "01",
    icon: BrainCircuit,
    title: "Choose your model",
    description:
      "Move between capable AI models and find the right balance of speed, depth, and style for the task at hand.",
    accent: "mint",
  },
  {
    number: "02",
    icon: AudioLines,
    title: "Set the tone",
    description:
      "Ask for a clear explainer, a creative collaborator, or a little sarcasm. The conversation can meet your mood.",
    accent: "coral",
  },
  {
    number: "03",
    icon: Database,
    title: "Pick up where you left off",
    description:
      "Your conversations are saved to your account, ready to revisit whenever an idea needs another pass.",
    accent: "blue",
  },
];

const stack = ["MongoDB", "Express", "React", "Node.js", "Groq"];
const galleryScreens = [
  "/images/Screenshot%202025-10-05%20135855.png",
  "/images/Screenshot%202025-10-05%20135958.png",
  "/images/Screenshot%202025-10-05%20140020.png",
  "/images/Screenshot%202025-10-05%20140226.png",
];

export default function LandingPage() {
  const navigate = useNavigate();
  const hasToken = Boolean(localStorage.getItem("token"));

  const startChat = () => navigate(hasToken ? "/chat" : "/login");

  return (
    <main className="landing-page">
      <header className="landing-header">
        <a className="landing-brand" href="/" aria-label="Info Agent home">
          <span className="brand-mark">
            <Sparkles size={17} strokeWidth={2.2} />
          </span>
          <span>
            Info<span className="brand-light"> Agent</span>
          </span>
        </a>
        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#features">What it does</a>
          <a href="#screens">Screens</a>
          <a href="#stack">Built with</a>
        </nav>
        <div className="landing-header-actions">
          {!hasToken && (
            <button
              className="landing-signin"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          )}
          <button className="landing-header-cta" onClick={startChat}>
            {hasToken ? "Open chat" : "Get started"}
            <ArrowUpRight size={15} />
          </button>
        </div>
      </header>

      <section className="landing-hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-pulse" /> YOUR IDEAS, IN GOOD COMPANY
          </div>
          <h1>
            Think out loud.
            <br />
            <span>Get somewhere.</span>
          </h1>
          <p className="hero-description">
            Info Agent is a flexible AI chat space for the questions, drafts,
            and half-formed ideas that deserve a better conversation.
          </p>
          <div className="hero-actions">
            <button className="hero-cta" onClick={startChat}>
              {hasToken ? "Go to your chats" : "Start a conversation"}
              <ArrowRight size={18} />
            </button>
            {!hasToken && (
              <button
                className="hero-text-link"
                onClick={() => navigate("/signup")}
              >
                Create a free account
              </button>
            )}
          </div>
          <div className="hero-note">
            <Zap size={15} fill="currentColor" /> Fast responses, powered by
            Groq
          </div>
        </div>

        <div
          className="hero-visual"
          aria-label="Preview of the Info Agent chat interface"
        >
          <div className="visual-topline">
            <span>
              <span className="window-dot coral-dot" />
              <span className="window-dot yellow-dot" />
              <span className="window-dot green-dot" />
            </span>
            <span className="visual-caption">
              A workspace for better questions
            </span>
            <span className="visual-status">
              <span /> LIVE
            </span>
          </div>
          <div className="product-shot-wrap">
            <img
              className="product-shot"
              src="/images/Screenshot%202025-10-05%20191351.png"
              alt="Info Agent chat interface with model controls and conversation history"
            />
            <div className="shot-fade" />
          </div>
          <div className="visual-foot">
            <div className="visual-foot-icon">
              <MessageSquareText size={17} />
            </div>
            <div>
              <strong>One conversation, many directions.</strong>
              <span>Change the model. Shift the tone. Keep exploring.</span>
            </div>
            <ArrowUpRight size={18} className="visual-foot-arrow" />
          </div>
          <div className="visual-side-note">
            <span>01</span> HUMAN-CENTERED AI
          </div>
        </div>
        <div className="hero-index">
          01 <span>/</span> 03
        </div>
        <a className="scroll-cue" href="#features">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} />
        </a>
      </section>

      <section className="manifesto" id="features">
        <div className="section-intro">
          <p className="section-kicker">A LITTLE MORE THAN A CHATBOX</p>
          <h2>
            Useful by design.
            <br />
            <em>Open-ended by nature.</em>
          </h2>
          <p className="section-description">
            A good tool should adapt to the way you think, not the other way
            around. Info Agent puts model choice, conversation style, and your
            chat history within easy reach.
          </p>
        </div>
        <div className="feature-list">
          {features.map(
            ({ number, icon: Icon, title, description, accent }) => (
              <article className={`feature-row ${accent}`} key={number}>
                <span className="feature-number">{number}</span>
                <span className="feature-icon">
                  {createElement(Icon, { size: 20, strokeWidth: 1.8 })}
                </span>
                <div className="feature-copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <ArrowUpRight size={18} className="feature-arrow" />
              </article>
            ),
          )}
        </div>
      </section>

      <section className="screens-gallery" id="screens">
        <div className="gallery-heading">
          <div>
            <p className="section-kicker">A CLOSER LOOK</p>
            <h2>Inside the workspace.</h2>
          </div>
          <p>
            From a fresh question to a growing conversation, these are a few
            views from Info Agent.
          </p>
        </div>
        <div className="gallery-grid">
          {galleryScreens.map((src, index) => (
            <figure className="gallery-screen" key={src}>
              <div className="gallery-image-wrap">
                <img
                  src={src}
                  alt={`Info Agent application screenshot ${index + 1}`}
                  loading="lazy"
                />
              </div>
              <figcaption>
                <span>INFO AGENT</span>
                <span>SCREEN / 0{index + 1}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="build-band" id="stack">
        <div className="build-copy">
          <span className="section-kicker">THOUGHTFULLY CONNECTED</span>
          <h2>
            From your prompt
            <br />
            to a lasting thread.
          </h2>
          <p>
            React brings the conversation to life. Express and Node handle the
            requests. MongoDB keeps your chats close, while Groq helps responses
            arrive fast.
          </p>
        </div>
        <div className="stack-panel">
          <div className="stack-panel-heading">
            <Layers3 size={17} />
            <span>THE STACK</span>
          </div>
          <div className="stack-list">
            {stack.map((item, index) => (
              <div className="stack-item" key={item}>
                <span className="stack-index">0{index + 1}</span>
                <span>{item}</span>
                <span className="stack-dot" />
              </div>
            ))}
          </div>
          <span className="stack-label">FULL-STACK / HUMAN-FIRST</span>
        </div>
      </section>

      <footer className="landing-footer">
        <a className="landing-brand footer-brand" href="/">
          <span className="brand-mark">
            <Sparkles size={15} strokeWidth={2.2} />
          </span>
          <span>
            Info<span className="brand-light"> Agent</span>
          </span>
        </a>
        <span>Made for the next good question.</span>
        <button onClick={startChat}>
          {hasToken ? "Open your chats" : "Start exploring"}
          <ArrowRight size={15} />
        </button>
      </footer>
    </main>
  );
}
