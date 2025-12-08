import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg yowi-navbar shadow-sm">
      <div className="container d-flex align-items-center justify-content-between">

        {/* TEXT LOGO */}
        <NavLink className="navbar-brand yowi-text-logo" to="/">
          Yowisata
        </NavLink>

        {/* TOGGLER MOBILE */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
            <li className="nav-item">
              <NavLink className="nav-link yowi-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link yowi-link" to="/destinasi">Destinasi</NavLink>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
