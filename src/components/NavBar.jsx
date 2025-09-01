import { useState } from "react";
// import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="contaner">
        <div>
          <button
            className="burger"
            aria-label="Открыть меню"
            onClick={openMenu}
            style={{ display: isOpen ? "none" : undefined }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <button
            className="close"
            aria-label="Закрыть меню"
            onClick={closeMenu}
            style={{ display: isOpen ? "flex" : "none" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>



          <nav className={`nav ${isOpen ? "active" : ""}`}>
            <Link to="/" className="logo">
              Script2Call
            </Link>
            <ul className="nav_menu">
              <li><Link to="/" onClick={closeMenu}>Главная</Link></li>
              <li><Link to="/about" onClick={closeMenu}>О нас</Link></li>
              <li><Link to="/beats" onClick={closeMenu}>Документация</Link></li>
              <li><Link to="/discography" onClick={closeMenu}>Контакты</Link></li>
              <li><Link to="/auth" onClick={closeMenu}>Войти</Link></li>
            </ul>
          </nav>

        </div>
        <div
          className={`overlay ${isOpen ? "active" : ""}`}
          onClick={closeMenu}
        />
      </div>
    </header>
  );
};

export default NavBar;