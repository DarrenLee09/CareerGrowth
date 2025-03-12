import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import './navbar.css';

const Navbar: React.FC = () => {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [avatarError, setAvatarError] = useState(false);

    const userMenuRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const navLinksRef = useRef<HTMLUListElement>(null);

    // Debounced scroll handler for better performance
    const handleScroll = useCallback(() => {
        const offset = window.scrollY;
        requestAnimationFrame(() => {
            setScrolled(offset > 50);
        });
    }, []);

    useEffect(() => {
        let scrollTimeout: number;
        const debouncedScroll = () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(() => {
                handleScroll();
            });
        };

        window.addEventListener('scroll', debouncedScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', debouncedScroll);
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
        };
    }, [handleScroll]);

    // Handle click outside to close menus
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Prevent body scroll when menu is open
        document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
        // Announce menu state to screen readers
        const menuAnnouncement = !isMenuOpen ? 'Menu opened' : 'Menu closed';
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'visually-hidden';
        announcement.textContent = menuAnnouncement;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);

        // Focus management
        if (!isMenuOpen && navLinksRef.current) {
            const firstLink = navLinksRef.current.querySelector('a');
            setTimeout(() => firstLink?.focus(), 100);
        } else if (hamburgerRef.current) {
            hamburgerRef.current.focus();
        }
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsMenuOpen(false);
            setIsUserMenuOpen(false);
            document.body.style.overflow = '';
            hamburgerRef.current?.focus();
        }

        // Handle arrow key navigation in user menu
        if (isUserMenuOpen && userMenuRef.current) {
            const menuItems = userMenuRef.current.querySelectorAll('[role="menuitem"]');
            const currentIndex = Array.from(menuItems).findIndex(item => item === document.activeElement);

            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                event.preventDefault();
                const nextIndex = currentIndex + 1 >= menuItems.length ? 0 : currentIndex + 1;
                (menuItems[nextIndex] as HTMLElement).focus();
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                event.preventDefault();
                const prevIndex = currentIndex - 1 < 0 ? menuItems.length - 1 : currentIndex - 1;
                (menuItems[prevIndex] as HTMLElement).focus();
            } else if (event.key === 'Home') {
                event.preventDefault();
                (menuItems[0] as HTMLElement).focus();
            } else if (event.key === 'End') {
                event.preventDefault();
                (menuItems[menuItems.length - 1] as HTMLElement).focus();
            }
        }
    };

    // Close menus when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
        document.body.style.overflow = '';
    }, [location]);

    const handleAvatarError = () => {
        setAvatarError(true);
        // Set fallback initials from user name
        const initials = 'JD'; // In real app, get from user's name
    };

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            setError(null);
            // Simulate logout API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsLoggedIn(false);
            setIsUserMenuOpen(false);
        } catch (err) {
            setError('Failed to logout. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <nav
            className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
            role="navigation"
            aria-label="Main navigation"
            onKeyDown={handleKeyDown}
        >
            <div className="navbar-brand">
                <Link to="/" className="logo" aria-label="CareerBoost Home">
                    <img src="/logo.svg" alt="" width="40" height="40" />
                    <span>CareerBoost</span>
                </Link>

                <button
                    ref={hamburgerRef}
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls="navigation-menu"
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    <span className="hamburger-box">
                        <span className="hamburger-inner" aria-hidden="true"></span>
                    </span>
                </button>
            </div>

            <div
                id="navigation-menu"
                className={`nav-content ${isMenuOpen ? 'active' : ''}`}
                role="menu"
                aria-hidden={!isMenuOpen}
            >
                <ul ref={navLinksRef} className="nav-links" role="menubar">
                    <li role="none">
                        <Link
                            to="/"
                            className={location.pathname === "/" ? "active" : ""}
                            aria-current={location.pathname === "/" ? "page" : undefined}
                            role="menuitem"
                            tabIndex={isMenuOpen ? 0 : -1}
                        >
                            Home
                        </Link>
                    </li>
                    <li role="none">
                        <Link
                            to="/resume"
                            className={location.pathname === "/resume" ? "active" : ""}
                            aria-current={location.pathname === "/resume" ? "page" : undefined}
                            role="menuitem"
                            tabIndex={isMenuOpen ? 0 : -1}
                        >
                            Resume Builder
                        </Link>
                    </li>
                    <li role="none">
                        <Link
                            to="/jobs"
                            className={location.pathname === "/jobs" ? "active" : ""}
                            aria-current={location.pathname === "/jobs" ? "page" : undefined}
                            role="menuitem"
                            tabIndex={isMenuOpen ? 0 : -1}
                        >
                            Job Search
                        </Link>
                    </li>
                </ul>

                <div className="nav-buttons">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        tabIndex={isMenuOpen ? 0 : -1}
                    >
                        {theme === 'light' ? (
                            <svg className="theme-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm7.071 7.071a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm-14.142 0a1 1 0 0 1 1.414 0l.707.707A1 1 0 1 1 5.636 12.2l-.707-.707a1 1 0 0 1 0-1.414zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-9 2a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2h1zm17 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1zM5.636 15.8a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707zm11.314 0a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707zM12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1z" />
                            </svg>
                        ) : (
                            <svg className="theme-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 3z" />
                            </svg>
                        )}
                    </button>

                    {isLoggedIn ? (
                        <div ref={userMenuRef} className="user-menu-container">
                            <button
                                className="user-menu-button"
                                onClick={toggleUserMenu}
                                aria-expanded={isUserMenuOpen}
                                aria-controls="user-menu"
                                aria-haspopup="true"
                                tabIndex={isMenuOpen ? 0 : -1}
                                disabled={isLoading}
                            >
                                {avatarError ? (
                                    <div className="user-avatar-fallback" aria-label="User initials">
                                        JD
                                    </div>
                                ) : (
                                    <img
                                        src="/default-avatar.png"
                                        alt={`${isLoggedIn ? 'Your profile picture' : 'Default avatar'}`}
                                        className="user-avatar"
                                        width="32"
                                        height="32"
                                        onError={handleAvatarError}
                                    />
                                )}
                                <span className="user-name">John Doe</span>
                                <svg
                                    className={`dropdown-arrow ${isUserMenuOpen ? 'open' : ''}`}
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    <path d="M7 10l5 5 5-5H7z" />
                                </svg>
                            </button>
                            {isUserMenuOpen && (
                                <div
                                    id="user-menu"
                                    className="user-menu"
                                    role="menu"
                                    aria-label="User menu"
                                >
                                    {error && (
                                        <div className="menu-error" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    <Link
                                        to="/profile"
                                        className="user-menu-item"
                                        role="menuitem"
                                        tabIndex={0}
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                        </svg>
                                        Profile
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="user-menu-item"
                                        role="menuitem"
                                        tabIndex={0}
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                                        </svg>
                                        Settings
                                    </Link>
                                    <button
                                        className={`user-menu-item logout ${isLoading ? 'loading' : ''}`}
                                        role="menuitem"
                                        tabIndex={0}
                                        onClick={handleLogout}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="loading-spinner" aria-label="Logging out..."></div>
                                        ) : (
                                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                                            </svg>
                                        )}
                                        {isLoading ? 'Logging out...' : 'Logout'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="login-btn"
                            role="button"
                            tabIndex={isMenuOpen ? 0 : -1}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
