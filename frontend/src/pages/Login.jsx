import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

import nriLogo from "../assets/nri-logo-transparent.png";
import libraryBg from "../assets/library-bg.jpeg";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setStatus({ loading: false, error: "Enter your roll no / email and password.", success: "" });
      return;
    }
    setStatus({ loading: true, error: "", success: "" });

    try {
      // Attempt backend API call via Axios
      const { data } = await axios.post("/api/auth/login", {
        identifier,
        password,
        remember,
      });
      localStorage.setItem("token", data.token);
      if (remember) {
        localStorage.setItem("rememberedUser", identifier);
      }
      setStatus({ loading: false, error: "", success: "Signed in successfully!" });
    } catch (err) {
      // If backend is not available yet, provide seamless frontend fallback for testing
      if (!err.response || err.code === "ERR_NETWORK" || err.response?.status === 404) {
        setTimeout(() => {
          const mockToken = "mock_jwt_token_" + Date.now();
          localStorage.setItem("token", mockToken);
          if (remember) {
            localStorage.setItem("rememberedUser", identifier);
          }
          setStatus({
            loading: false,
            error: "",
            success: `Welcome back, ${identifier}! (Frontend Demo Mode - Backend Offline)`,
          });
        }, 600);
      } else {
        setStatus({
          loading: false,
          error:
            err?.response?.data?.message ||
            "Couldn't sign you in. Check your credentials and try again.",
          success: "",
        });
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Single shared backdrop — one picture spanning the whole card, mirrored so
            the shelves sit on the right, fading to black on the left. */}
        <div className="auth-bg-image" style={{ backgroundImage: `url(${libraryBg})` }} />
        <div className="auth-bg-fade" />

        {/* LEFT PANEL — Credentials */}
        <div className="auth-left">
          <div className="auth-brand">
            <img src={nriLogo} alt="NRI Logo" className="auth-brand-logo" />
            <div className="auth-brand-text">
              <span className="auth-brand-name">Library</span>
              <span className="auth-brand-sub">ACCESS PORTAL</span>
            </div>
          </div>

          <div className="auth-credentials-body">
            <div className="auth-badge">✦ MEMBER ACCESS  ·  NRI CENTRAL LIBRARY</div>

            <h2 className="auth-title">
              Welcome back,
              <br />
              reader.
            </h2>
            <p className="auth-subtitle">
              Sign in with your student credentials to renew titles, hold
              reservations and enter the digital archive.
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="identifier">ROLL NO / EMAIL</label>
                <div className="auth-input-wrap">
                  <span className="auth-icon">✉</span>
                  <input
                    id="identifier"
                    type="text"
                    placeholder="2XKN1AXXXX or rollno@nriit.edu.in"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="password">PASSWORD</label>
                <div className="auth-input-wrap">
                  <span className="auth-icon">🔒</span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="auth-eye"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <div className="auth-row-between">
                <label className="auth-remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember this device
                </label>
                <a href="#forgot" className="auth-link">
                  Forgot password?
                </a>
              </div>

              {status.error && <div className="auth-error">{status.error}</div>}
              {status.success && <div className="auth-success">{status.success}</div>}

              <button type="submit" className="auth-submit" disabled={status.loading}>
                {status.loading ? "Signing in…" : "Next  →"}
              </button>
            </form>

            <div className="auth-footer">
              New to the library?{" "}
              <a href="#create" className="auth-link-strong">
                Create an account
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — quote sits directly on the shared backdrop, no card */}
        <div className="auth-right">
          <div className="auth-signin-tag">Sign In</div>

          <div className="auth-quote-wrap">
            <p className="auth-quote">A room without books is like a body without a soul.</p>
            <span className="auth-quote-attribution">— Marcus Tullius Cicero</span>
          </div>
        </div>
      </div>
    </div>
  );
}
