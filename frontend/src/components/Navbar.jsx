import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart3, CircleHelp, UserRound, LockKeyhole, LogOut, Menu, X, Globe2, ChevronDown } from "lucide-react";
import BrandMark from "./BrandMark";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onLogin }) {
  const { loggedIn, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const links = [
    ["/", "Home", Home, false],
    ["/prediction", "Prediction", BarChart3, true],
    ["/help", "Help", CircleHelp, false],
    ["/profile", "Profile", UserRound, true]
  ];

  const handleProtected = (e, protectedRoute) => {
    if (protectedRoute && !loggedIn) {
      e.preventDefault();
      onLogin?.("/prediction");
    }
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="top-tricolor" />
      <div className="nav-shell">
        <NavLink to="/" className="brand-link" onClick={() => setOpen(false)}>
          <BrandMark />
        </NavLink>

        <nav className="desktop-nav">
          {links.map(([to, label, Icon, protectedRoute]) => (
            <NavLink
              key={to}
              to={to}
              onClick={(e) => handleProtected(e, protectedRoute)}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          ))}

          <div className="nav-language">
            <Globe2 size={18} />
            <span>English</span>
            <ChevronDown size={15} />
          </div>

          {loggedIn ? (
            <button className="login-button" onClick={logout}>
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <button className="login-button" onClick={() => onLogin?.("/prediction")}>
              <LockKeyhole size={18} /> Login/Signup
            </button>
          )}
        </nav>

        <button className="mobile-menu" aria-label="Open menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mobile-nav">
          {links.map(([to, label, Icon, protectedRoute]) => (
            <NavLink key={to} to={to} onClick={(e) => handleProtected(e, protectedRoute)} className="mobile-nav-item">
              <Icon size={19} /> {label}
            </NavLink>
          ))}
          <button className="mobile-nav-login" onClick={() => { setOpen(false); loggedIn ? logout() : onLogin?.("/prediction"); }}>
            {loggedIn ? <><LogOut size={19} /> Logout</> : <><LockKeyhole size={19} /> Login/Signup</>}
          </button>
        </div>
      )}
    </header>
  );
}
