import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBars,
  FaChevronDown,
  FaClipboardList,
  FaRegUser,
  FaShoppingBag,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTimes,
} from "react-icons/fa";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import profilePlaceholder from "../../../images/Profile.png";
import "./Header.css";

const navigation = [
  { label: "Home", to: "/", exact: true },
  { label: "Shop", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountAreaRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  useEffect(() => {
    setMenuOpen(false);
    setAccountMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!accountMenuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (accountAreaRef.current && !accountAreaRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setAccountMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [accountMenuOpen]);

  const handleLogout = () => {
    setAccountMenuOpen(false);
    dispatch(logout());
    alert.success("Logout Successfully");
  };

  return (
    <>
      <div className="announcement-bar">
        <span>Thoughtful essentials, made for everyday.</span>
        <NavLink to="/products">
          Explore the collection <span aria-hidden="true">&#8594;</span>
        </NavLink>
      </div>
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink className="brand-mark" to="/" aria-label="Ecomify home">
            eco<span>mify</span><i aria-hidden="true">.</i>
          </NavLink>

          <nav
            className={`primary-nav${menuOpen ? " primary-nav--open" : ""}`}
            id="primary-navigation"
            aria-label="Main navigation"
          >
            {navigation.map(({ label, to, exact }) => (
              <NavLink
                key={to}
                exact={exact}
                to={to}
                className="primary-nav__link"
                activeClassName="primary-nav__link--active"
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              className="mobile-account-link"
              to={isAuthenticated ? "/account" : "/login"}
            >
              {isAuthenticated ? "My account" : "Sign in"}
            </NavLink>
          </nav>

          <div className="header-actions" ref={accountAreaRef}>
            {isAuthenticated ? (
              <button
                className="account-action account-action--menu"
                type="button"
                aria-label={`Account menu for ${user.name}`}
                aria-haspopup="menu"
                aria-expanded={accountMenuOpen}
                aria-controls="account-menu"
                onClick={() => setAccountMenuOpen((open) => !open)}
              >
                <img
                  className="header-avatar"
                  src={user.avatar && user.avatar.url ? user.avatar.url : profilePlaceholder}
                  alt=""
                />
                <span>{user.name.split(" ")[0]}</span>
                <FaChevronDown className="account-action__chevron" aria-hidden="true" />
              </button>
            ) : (
              <NavLink className="account-action" to="/login" aria-label="Sign in">
                <FaRegUser aria-hidden="true" />
                <span>Sign in</span>
              </NavLink>
            )}
            {isAuthenticated && accountMenuOpen && (
              <div className="account-menu" id="account-menu" role="menu">
                <div className="account-menu__identity">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                {user.role === "admin" && (
                  <NavLink to="/admin/dashboard" role="menuitem">
                    <FaTachometerAlt aria-hidden="true" /> Dashboard
                  </NavLink>
                )}
                <NavLink to="/orders" role="menuitem">
                  <FaClipboardList aria-hidden="true" /> My orders
                </NavLink>
                <NavLink to="/account" role="menuitem">
                  <FaRegUser aria-hidden="true" /> My account
                </NavLink>
                <button type="button" role="menuitem" onClick={handleLogout}>
                  <FaSignOutAlt aria-hidden="true" /> Sign out
                </button>
              </div>
            )}
            <NavLink
              className="cart-action"
              to="/cart"
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <FaShoppingBag aria-hidden="true" />
              <span>Bag</span>
              <span className="cart-action__count" aria-live="polite">
                {cartCount}
              </span>
            </NavLink>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
