import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaBook,
  FaChevronDown,
  FaChevronUp,
  FaUser,
  FaObjectGroup,
} from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { AiFillControl } from "react-icons/ai";
import { RiSettings4Fill } from "react-icons/ri";
import { MdDelete, MdOutlinePublishedWithChanges } from "react-icons/md";
import { TbHistoryToggle } from "react-icons/tb";
import { FaMoneyCheck, FaChartBar, FaFileInvoiceDollar } from "react-icons/fa";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const navbarRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const location = useLocation();

  // Detect screen size with debounce
  useEffect(() => {
    let resizeTimer;
    
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const width = window.innerWidth;
        setIsMobile(width <= 768);
        setIsTablet(width > 768 && width <= 1024);
        
        // Close mobile menu on resize to desktop
        if (width > 768 && isOpen) {
          setIsOpen(false);
        }
      }, 150);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Close dropdowns when route changes
  useEffect(() => {
    setOpenDropdown(null);
    if (isMobile || isTablet) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile, isTablet]);

  const toggleNavbar = useCallback(() => {
    setIsOpen(prev => !prev);
    if (!isMobile && !isTablet) {
      setOpenDropdown(null);
    }
  }, [isMobile, isTablet]);

  const toggleDropdown = useCallback((dropdownName) => {
    setOpenDropdown(prev => prev === dropdownName ? null : dropdownName);
  }, []);

  const handleDropdownHover = useCallback((dropdownName) => {
    if (!isMobile && !isTablet) {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      setOpenDropdown(dropdownName);
    }
  }, [isMobile, isTablet]);

  const handleDropdownLeave = useCallback(() => {
    if (!isMobile && !isTablet) {
      dropdownTimeoutRef.current = setTimeout(() => {
        setOpenDropdown(null);
      }, 200);
    }
  }, [isMobile, isTablet]);

  // Memoized navigation structure
  const navStructure = useMemo(() => [
    {
      name: "Dashboard",
      to: "/admin/admindashboard",
      icon: FaChartBar,
      single: true
    },
    {
      name: "Students",
      icon: FaUser,
      dropdown: "Students",
      links: [
        {
          name: "Approve Students",
          to: "/admin/student/approve",
          icon: FaUser
        },
        {
          name: "Students",
          to: "/admin/dashboard",
          icon: FaUser
        },
        {
          name: "Attendance",
          to: "/admin/attendance",
          icon: FaChartBar
        },
        {
          name: "Student Progress",
          to: "/admin/getstudentprogress",
          icon: GiProgression
        },
        {
          name: "Delete Students",
          to: "/admin/deletestudents",
          icon: MdDelete
        },
      ]
    },
    {
      name: "Teacher",
      icon: FaUser,
      dropdown: "Teacher",
      links: [
        {
          name: "Home-Work",
          to: "/admin/student/homework",
          icon: FaUser
        },
        {
          name: "Add Teacher",
          to: "/admin/add-teacher",
          icon: FaChartBar
        },
        {
          name: "Manage Teacher",
          to: "/admin/manage-teacher",
          icon: FaChartBar
        }
      ]
    },
    {
      name: "Payments",
      icon: FaMoneyCheck,
      dropdown: "payments",
      links: [
        {
          name: "Groups",
          to: "/admin/payments",
          icon: FaObjectGroup
        },
        {
          name: "Fees Status",
          to: "/admin/payments/mark",
          icon: FaFileInvoiceDollar
        },
      ]
    },
    {
      name: "Exams",
      icon: FaBook,
      dropdown: "exams",
      links: [
        {
          name: "Manage Exams",
          to: "/admin/exam",
          icon: FaBook
        },
        {
          name: "Access Control",
          to: "/admin/manageexamsvisibility",
          icon: AiFillControl
        }
      ]
    },
    {
      name: "History",
      to: "/admin/history",
      icon: TbHistoryToggle,
      single: true
    },
    {
      name: "Settings",
      icon: RiSettings4Fill,
      dropdown: "settings",
      links: [
        {
          name: "Manage Notes",
          to: "/admin/notescontroll",
          icon: FaBook
        },
        {
          name: "Registration Options",
          to: "/admin/adminoptions",
          icon: RiSettings4Fill
        },
        {
          name: "Change Password",
          to: "/admin/changepassword",
          icon: MdOutlinePublishedWithChanges
        }
      ]
    }
  ], []);

  // Check if dropdown has active child
  const isDropdownActive = useCallback((dropdownLinks) => {
    return dropdownLinks.some(link => location.pathname === link.to);
  }, [location.pathname]);

  const handleLogout = useCallback((e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Do you want to logout?");
    if (confirmLogout) {
      setIsOpen(false);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/";
    }
  }, []);

  // Memoized NavLink component
  const NavLinkItem = useCallback(({ to, icon: Icon, name, onClick, isDropdownItem = false }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link ${isActive ? "active" : ""} ${isDropdownItem ? "dropdown-item" : ""}`
      }
      onClick={() => {
        onClick?.();
        if (isMobile || isTablet) {
          setIsOpen(false);
        }
      }}
    >
      <Icon className="nav-icon" />
      <span>{name}</span>
    </NavLink>
  ), [isMobile, isTablet]);

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-container">
        {/* Brand/Logo */}
        <div className="navbar-brand">
          <NavLink to="/admin" className="brand-link">
            <div className="logo-container">
              <img
                src="/logo2.jpg"
                alt="Ligand Software Solutions Logo"
                className="logo-image"
                loading="lazy"
              />
              <span className="logo-text-container">
                <span className="logo-gradient">Ligand Software Solutions</span>
                <span className="logo-subtitle">
                  Exclusive Software for Innovative Minds
                </span>
              </span>
            </div>
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className={`navbar-toggle ${isOpen ? "active" : ""}`}
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes className="toggle-icon" /> : <FaBars className="toggle-icon" />}
        </button>

        {/* Navigation links */}
        <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <div className="navbar-nav">
            {navStructure.map((item, index) => {
              if (item.single) {
                return (
                  <NavLinkItem
                    key={item.name}
                    to={item.to}
                    icon={item.icon}
                    name={item.name}
                    onClick={() => setIsOpen(false)}
                  />
                );
              }

              if (item.dropdown) {
                const isDropdownOpen = openDropdown === item.dropdown;
                const hasActiveChild = isDropdownActive(item.links);

                return (
                  <div 
                    key={item.name} 
                    className="dropdown-container"
                    onMouseEnter={() => handleDropdownHover(item.dropdown)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      className={`dropdown-toggle ${hasActiveChild ? 'active' : ''} ${isDropdownOpen ? 'open' : ''}`}
                      onClick={() => toggleDropdown(item.dropdown)}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                    >
                      <item.icon className="nav-icon" />
                      <span>{item.name}</span>
                      {/* Always show arrow for dropdown items */}
                      <span className="dropdown-arrow-container">
                        {isDropdownOpen ? 
                          <FaChevronUp className="dropdown-arrow" /> : 
                          <FaChevronDown className="dropdown-arrow" />
                        }
                      </span>
                    </button>
                    <div 
                      className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}
                      onMouseEnter={() => handleDropdownHover(item.dropdown)}
                      onMouseLeave={handleDropdownLeave}
                      role="menu"
                      aria-labelledby={`dropdown-${item.dropdown}`}
                    >
                      {item.links.map((link) => (
                        <NavLinkItem
                          key={link.name}
                          to={link.to}
                          icon={link.icon}
                          name={link.name}
                          onClick={() => setOpenDropdown(null)}
                          isDropdownItem={true}
                        />
                      ))}
                    </div>
                  </div>
                );
              }

              return null;
            })}

            {/* Logout button */}
            <button
              className="nav-link logout-link"
              onClick={handleLogout}
            >
              <FaSignInAlt className="nav-icon" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          padding: 0.8rem 1.5rem;
          position: relative;
          z-index: 1000;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1600px;
          margin: 0 auto;
        }

        .navbar-brand {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .brand-link {
          text-decoration: none;
          color: white;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .logo-image {
          height: 40px;
          width: 40px;
          object-fit: contain;
          animation: pulse 2s infinite, float 3s ease-in-out infinite;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 5px;
        }

        .logo-text-container {
          display: flex;
          flex-direction: column;
        }

        .logo-gradient {
          background: linear-gradient(90deg, #f0f0f0ff, #cad3eeff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          font-size: 1.3rem;
          line-height: 1.2;
        }

        .logo-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.7rem;
          font-weight: 500;
          line-height: 1.2;
        }

        .navbar-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: white;
          font-size: 1.5rem;
          z-index: 1001;
          transition: transform 0.3s ease;
        }

        .navbar-toggle:hover {
          transform: scale(1.1);
        }

        .navbar-menu {
          display: flex;
          align-items: center;
        }

        .navbar-nav {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 0.5rem;
          align-items: center;
        }

        .nav-link {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          white-space: nowrap;
          cursor: pointer;
          border: none;
          font-family: inherit;
          font-size: 14px;
        }

        .nav-link:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .nav-link.active {
          color: #fff;
          background: linear-gradient(90deg, #ff6b6b, #ff8e53);
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
        }

        .nav-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        /* Dropdown Styles */
        .dropdown-container {
          position: relative;
        }

        .dropdown-toggle {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          white-space: nowrap;
          border: none;
          font-family: inherit;
          font-size: 14px;
        }

        .dropdown-toggle:hover,
        .dropdown-toggle.open {
          color: #fff;
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .dropdown-toggle.active {
          color: #fff;
          background: linear-gradient(90deg, #ff6b6b, #ff8e53);
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
        }

        .dropdown-arrow-container {
          display: flex;
          align-items: center;
          margin-left: 0.25rem;
        }

        .dropdown-arrow {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .dropdown-toggle.open .dropdown-arrow {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          min-width: 220px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 1000;
          margin-top: 0.8rem;
          padding: 0.5rem 0;
          overflow: hidden;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-menu .nav-link {
          border-radius: 0;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          padding: 0.8rem 1rem;
          margin: 0;
          justify-content: flex-start;
        }

        .dropdown-menu .nav-link:last-child {
          border-bottom: none;
        }

        .dropdown-menu .nav-link:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        .logout-link {
          margin-left: 0.5rem;
        }

        .logout-link:hover {
          background: rgba(255, 107, 107, 0.3);
        }

        /* Logo animations */
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }

        /* Tablet styles (768px - 1024px) */
        @media (max-width: 1024px) {
          .navbar {
            padding: 0.7rem 1rem;
          }

          .logo-gradient {
            font-size: 1.2rem;
          }

          .logo-subtitle {
            font-size: 0.7rem;
          }

          .nav-link, .dropdown-toggle {
            padding: 0.5rem 0.8rem;
            font-size: 0.9rem;
          }

          .dropdown-menu {
            min-width: 200px;
          }
        }

        /* Mobile styles (up to 768px) */
        @media (max-width: 768px) {
          .navbar {
            padding: 0.6rem 1rem;
            position: sticky;
            top: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .navbar-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .logo-container {
            gap: 0.6rem;
          }

          .logo-image {
            height: 35px;
            width: 35px;
          }

          .logo-gradient {
            font-size: 1.1rem;
          }

          .logo-subtitle {
            font-size: 0.65rem;
            display: none;
          }

          .navbar-menu {
            position: fixed;
            top: 0;
            right: 0;
            height: 100vh;
            width: 85%;
            max-width: 320px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            box-shadow: -5px 0 25px rgba(0, 0, 0, 0.2);
            flex-direction: column;
            align-items: flex-start;
            padding: 70px 1rem 2rem;
            transform: translateX(100%);
            opacity: 0;
            visibility: hidden;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                        opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                        visibility 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 999;
            overflow-y: auto;
            overscroll-behavior: contain;
          }

          .navbar-menu.active {
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
          }

          .navbar-nav {
            flex-direction: column;
            width: 100%;
            gap: 0.5rem;
            align-items: stretch;
          }

          .nav-link, .dropdown-toggle {
            width: 100%;
            padding: 0.9rem 1rem;
            border-radius: 6px;
            justify-content: space-between;
            font-size: 1rem;
          }

          .dropdown-container {
            width: 100%;
          }

          .dropdown-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .dropdown-menu {
            position: static;
            box-shadow: none;
            background: rgba(255, 255, 255, 0.08);
            margin-top: 0.5rem;
            border-radius: 6px;
            min-width: auto;
            transform: none;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            opacity: 1;
            visibility: visible;
            display: block;
            padding: 0;
          }

          .dropdown-menu.open {
            max-height: 500px;
          }

          .dropdown-menu .nav-link {
            padding: 0.7rem 1rem 0.7rem 2rem;
            font-size: 0.95rem;
          }

          .logout-link {
            margin-left: 0;
            margin-top: 1rem;
            background: rgba(255, 107, 107, 0.2);
          }

          .logout-link:hover {
            background: rgba(255, 107, 107, 0.3);
          }

          /* Mobile menu backdrop overlay */
          .navbar-menu.active::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: -1;
          }
        }

        /* Small mobile devices */
        @media (max-width: 480px) {
          .logo-gradient {
            font-size: 1rem;
          }

          .logo-image {
            height: 32px;
            width: 32px;
          }

          .navbar-menu {
            width: 90%;
          }

          .nav-link, .dropdown-toggle {
            padding: 0.8rem;
            font-size: 0.95rem;
          }

          .dropdown-menu .nav-link {
            padding: 0.6rem 1rem 0.6rem 2rem;
          }
        }

        /* Animation for menu items */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Optimize animations */
        @media (prefers-reduced-motion: no-preference) {
          .navbar-menu.active .nav-link,
          .navbar-menu.active .dropdown-toggle {
            animation: slideIn 0.3s ease forwards;
          }

          /* Staggered animation for menu items */
          .navbar-menu.active .nav-link,
          .navbar-menu.active .dropdown-toggle {
            animation: slideIn 0.3s ease forwards;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .navbar-menu.active .nav-link,
          .navbar-menu.active .dropdown-toggle {
            animation: none;
            opacity: 1;
            transform: none;
          }
          
          .dropdown-arrow {
            transition: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default React.memo(AdminNavbar);