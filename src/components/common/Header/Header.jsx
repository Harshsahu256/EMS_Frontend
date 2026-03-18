

// // // // import React, { useEffect, useState, useRef } from "react";
// // // // import { Container, Button, Nav } from "react-bootstrap";
// // // // import { Link, NavLink, useNavigate } from "react-router-dom";

// // // // // Assets
// // // // import logoT from "../../../assets/logoT.png";
// // // // import epaperIcon from "../../../assets/icons/epaper-icon.svg";
// // // // import searchIcon from "../../../assets/icons/search-icon.svg";
// // // // import emstvIcon from "../../../assets/icons/emstvIcon.png";
// // // // import directoryIcon from "../../../assets/icons/directory-icon.svg";
// // // // import loginIcon from "../../../assets/icons/login-icon.svg";

// // // // // Google Translate
// // // // import GoogleTranslateWidget, { useGoogleTranslate } from "../../GoogleTranslateWidget";

// // // // // Icons
// // // // import { FaFacebookF, FaYoutube, FaInstagram, FaUserCircle } from "react-icons/fa";
// // // // import { FaXTwitter, FaBars } from "react-icons/fa6";
// // // // import { MdOutlineSubscriptions } from "react-icons/md";

// // // // // Sidebar
// // // // import LeftSidebar from "../LeftSidebar";

// // // // // API
// // // // import { headline, getStatesByCountry, getCategories } from "../../../Services/authApi";

// // // // // ✅ Static Menu Items (Inko Dropdown se hatana hai)
// // // // const sidebarOptions = [
// // // //   { name: "Home", path: "/" },
// // // //   { name: "India", path: "/india" },
// // // //   { name: "State", path: "/state", isDropdown: true },
// // // //   { name: "Entertainment", path: "/entertainment" },
// // // //   { name: "Astrology", path: "/astrology" },
// // // //   { name: "Sports", path: "/sports" },
// // // //   { name: "Thoughts", path: "/thoughts" },
// // // //   { name: "Business", path: "/business" },
// // // //   { name: "Youth", path: "/youth" },
// // // // ];

// // // // const HeaderActionIcon = ({ icon, text, link, isReactIcon = false, size = 28 }) => {
// // // //   const renderedIcon = isReactIcon ? React.cloneElement(icon, { size }) : <img src={icon} alt={text} height={size} width={size} />;
// // // //   const isExternalLink = link.startsWith("http://") || link.startsWith("https://");

// // // //   const handleExternalLinkClick = (event) => {
// // // //     if (isExternalLink) {
// // // //       event.preventDefault();
// // // //       window.open(link, "_self");
// // // //     }
// // // //   };

// // // //   return isExternalLink ? (
// // // //     <a
// // // //       href={link}
// // // //       onClick={handleExternalLinkClick}
// // // //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// // // //       style={{ color: "#000" }}
// // // //     >
// // // //       {renderedIcon}
// // // //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// // // //         {text}
// // // //       </span>
// // // //     </a>
// // // //   ) : (
// // // //     <Link
// // // //       to={link}
// // // //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// // // //       style={{ color: "#000" }}
// // // //     >
// // // //       {renderedIcon}
// // // //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// // // //         {text}
// // // //       </span>
// // // //     </Link>
// // // //   );
// // // // };

// // // // const Header = () => {
// // // //   const navigate = useNavigate();
// // // //   const { changeLanguage: googleTranslateChangeLanguage } = useGoogleTranslate();

// // // //   const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("userLanguage") || "en");
// // // //   const [headlineData, setHeadlineData] = useState([]);
// // // //   const [allStates, setAllStates] = useState([]);
  
// // // //   // ✅ New State for Categories
// // // //   const [allCategories, setAllCategories] = useState([]);
  
// // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // // //   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  
// // // //   // ✅ New State for "Other" Dropdown
// // // //   const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
  
// // // //   const [isScrolled, setIsScrolled] = useState(false);

// // // //   // Profile/Login
// // // //   const [loggedInUser, setLoggedInUser] = useState(null);
// // // //   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
// // // //   const profileDropdownRef = useRef(null);
// // // //   const stateDropdownRef = useRef(null);
// // // //   const otherDropdownRef = useRef(null);

// // // //   const changeAppLanguage = (lang) => {
// // // //     setCurrentLanguage(lang);
// // // //     localStorage.setItem("userLanguage", lang);
// // // //     navigate("/");
// // // //     window.location.reload();
// // // //   };

// // // //   useEffect(() => {
// // // //     const handleScroll = () => setIsScrolled(window.scrollY > 80);
// // // //     window.addEventListener("scroll", handleScroll);
// // // //     return () => window.removeEventListener("scroll", handleScroll);
// // // //   }, []);

// // // //   // Load user
// // // //   useEffect(() => {
// // // //     const userData = localStorage.getItem("user");
// // // //     if (userData) {
// // // //       try {
// // // //         setLoggedInUser(JSON.parse(userData));
// // // //       } catch {
// // // //         setLoggedInUser(null);
// // // //       }
// // // //     } else setLoggedInUser(null);
// // // //   }, []);

// // // //   // Fetch headlines
// // // //   useEffect(() => {
// // // //     const fetchHeadline = async () => {
// // // //       try {
// // // //         const response = await headline();
// // // //         const dataArray = response?.data || [];
// // // //         const allHeadlines = dataArray
// // // //           .filter((item) => item.headlineText && item.newsId?.slug_en)
// // // //           .map((item) => ({
// // // //             id: item.newsId?._id,
// // // //             slug: item.newsId?.slug_en,
// // // //             text: item.headlineText.trim(),
// // // //           }));
// // // //         setHeadlineData(allHeadlines.length ? allHeadlines : [{ id: "0", slug: "", text: "No headline available" }]);
// // // //       } catch {
// // // //         setHeadlineData([{ id: "0", slug: "", text: "Error loading headlines" }]);
// // // //       }
// // // //     };
// // // //     fetchHeadline();
// // // //   }, [currentLanguage]);

// // // //   // Fetch states
// // // //   useEffect(() => {
// // // //     const fetchStates = async () => {
// // // //       try {
// // // //         const res = await getStatesByCountry("687a1e2185f0230715032380");
// // // //         if (res?.success) setAllStates(res.data);
// // // //       } catch {}
// // // //     };
// // // //     fetchStates();
// // // //   }, []);

// // // //   // ✅ Fetch Categories & FILTER Static Ones
// // // //   useEffect(() => {
// // // //     const fetchAllCategories = async () => {
// // // //       try {
// // // //         const res = await getCategories();
// // // //         if (res?.success) {
// // // //           // 1. Static names ki list nikalo (lowercase me comparison ke liye)
// // // //           const staticNames = sidebarOptions.map(opt => opt.name.toLowerCase());

// // // //           // 2. API Data ko filter karo
// // // //           const filteredCats = res.data.filter(cat => {
// // // //              // Agar category ka naam static list me nahi hai, tabhi show karo
// // // //              return !staticNames.includes(cat.name.toLowerCase());
// // // //           });

// // // //           setAllCategories(filteredCats);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Failed to fetch categories", error);
// // // //       }
// // // //     };
// // // //     fetchAllCategories();
// // // //   }, []);

// // // //   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

// // // //   // Click outside handler
// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event) => {
// // // //       if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
// // // //         setIsStateDropdownOpen(false);
// // // //       }
// // // //       if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) {
// // // //         setIsOtherDropdownOpen(false);
// // // //       }
// // // //       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
// // // //         setIsProfileDropdownOpen(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   const handleLogout = () => {
// // // //     localStorage.removeItem("user");
// // // //     localStorage.removeItem("token");
// // // //     setLoggedInUser(null);
// // // //     setIsProfileDropdownOpen(false);
// // // //     navigate("/");
// // // //     window.location.reload();
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <GoogleTranslateWidget />

// // // //       {/* Blue Header */}
// // // //       <div
// // // //         style={{
// // // //           backgroundColor: "#0d2d62",
// // // //           color: "white",
// // // //           height: "40px",
// // // //           position: "fixed",
// // // //           top: 5,
// // // //           left: 0,
// // // //           right: 0,
// // // //           zIndex: 2000,
// // // //           transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
// // // //           transition: "transform 0.4s ease-in-out",
// // // //         }}
// // // //       >
// // // //         <Container fluid className="d-flex justify-content-between align-items-center py-1 px-3">
// // // //           <div className="d-flex align-items-center" style={{ marginLeft: "70px" }}>
// // // //             <Button
// // // //               variant="link"
// // // //               className="text-white fw-bold p-0 me-3"
// // // //               onClick={() => changeAppLanguage("hi")}
// // // //               style={{ textDecoration: currentLanguage === "hi" ? "underline" : "none" }}
// // // //             >
// // // //               हिंदी
// // // //             </Button>
// // // //             <Button
// // // //               variant="link"
// // // //               className="text-white fw-bold p-0"
// // // //               onClick={() => changeAppLanguage("en")}
// // // //               style={{ textDecoration: currentLanguage === "en" ? "underline" : "none" }}
// // // //             >
// // // //               English
// // // //             </Button>
// // // //           </div>

// // // //           <div className="d-flex align-items-center">
// // // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaFacebookF size={16} /></a>
// // // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaXTwitter size={16} /></a>
// // // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaYoutube size={16} /></a>
// // // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaInstagram size={16} /></a>

// // // //             <div ref={profileDropdownRef} className="position-relative ms-3">
// // // //               {loggedInUser ? (
// // // //                 <Button
// // // //                   variant="link"
// // // //                   onClick={(e) => {
// // // //                     e.stopPropagation();
// // // //                     setIsProfileDropdownOpen((prev) => !prev);
// // // //                   }}
// // // //                   className="p-0 border-0 d-flex align-items-center text-decoration-none"
// // // //                 >
// // // //                   {loggedInUser.profileImage ? (
// // // //                     <img
// // // //                       src={loggedInUser.profileImage}
// // // //                       alt={loggedInUser.name}
// // // //                       className="rounded-circle"
// // // //                       style={{ width: "28px", height: "28px", objectFit: "cover" }}
// // // //                     />
// // // //                   ) : (
// // // //                     <FaUserCircle size={28} color="white" />
// // // //                   )}
// // // //                   <span className="ms-2 text-white fw-bold d-none d-lg-inline">
// // // //                     {loggedInUser.name.split(" ")[0]}
// // // //                   </span>
// // // //                 </Button>
// // // //               ) : (
// // // //                 <Link
// // // //                   to="/login"
// // // //                   className="d-flex align-items-center text-decoration-none text-white fw-bold me-3 ms-3"
// // // //                 >
// // // //                   <img src={loginIcon} alt="Login" height="28" className="me-1" />
// // // //                   <span>Login</span>
// // // //                 </Link>
// // // //               )}

// // // //               {isProfileDropdownOpen && loggedInUser && (
// // // //                 <div
// // // //                   style={{
// // // //                     position: "absolute",
// // // //                     top: "100%",
// // // //                     right: 0,
// // // //                     backgroundColor: "#0d2d62",
// // // //                     color: "white",
// // // //                     padding: "8px 0",
// // // //                     minWidth: "120px",
// // // //                     borderRadius: "4px",
// // // //                     zIndex: 2001,
// // // //                   }}
// // // //                 >
// // // //                   <Link
// // // //                     to="/profile"
// // // //                     className="d-block text-white text-decoration-none px-3 py-1"
// // // //                     onClick={() => setIsProfileDropdownOpen(false)}
// // // //                   >
// // // //                     Profile
// // // //                   </Link>
// // // //                   <Button
// // // //                     variant="link"
// // // //                     className="d-block text-white text-decoration-none w-100 text-start px-3 py-1"
// // // //                     onClick={handleLogout}
// // // //                   >
// // // //                     Logout
// // // //                   </Button>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </Container>
// // // //       </div>

// // // //       <div style={{ marginTop: "40px" }} />

// // // //       {/* White Header, Menu, Icons */}
// // // //       <div className="bg-white border-bottom" style={{ transition: "all 0.5s ease-in-out" }}>
// // // //         <Container fluid className="d-flex justify-content-between align-items-center py-2 px-3">
// // // //           <Link to="/" className="d-flex flex-column align-items-center text-decoration-none" style={{ zIndex: 2100 }}>
// // // //             <video src="/logogif.mp4" autoPlay loop muted style={{ width: "60px", marginRight: "3px", zIndex: 2100, transform: isScrolled ? "translateY(0)" : "translateY(-50px)", transition: "transform 0.5s ease-in-out" }} />
// // // //             <img src={logoT} alt="EMS Tagline" style={{ height: "5px", transform: isScrolled ? "translateY(0)" : "translateY(-50px)", transition: "transform 0.5s ease-in-out" }} />
// // // //           </Link>

// // // //           {/* Center Menu */}
// // // //           <Nav className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold" style={{ gap: "45px" }}>
// // // //             {sidebarOptions.map((opt, index) =>
// // // //               opt.isDropdown ? (
// // // //                 <div key={index} ref={stateDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// // // //                   <span onClick={() => setIsStateDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// // // //                     State ▾
// // // //                   </span>
// // // //                   {isStateDropdownOpen && (
// // // //                     <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#c82333", color: "white", padding: "6px", minWidth: "540px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px", zIndex: 999 }}>
// // // //                       {allStates.map((state) => (
// // // //                         <NavLink
// // // //                           key={state._id}
// // // //                           to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
// // // //                           className="text-white text-decoration-none"
// // // //                           style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// // // //                           onClick={() => setIsStateDropdownOpen(false)}
// // // //                         >
// // // //                           {state.name}
// // // //                         </NavLink>
// // // //                       ))}
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               ) : (
// // // //                 <NavLink key={index} to={opt.path} className="text-decoration-none text-black" style={{ fontWeight: 600 }}>
// // // //                   {opt.name}
// // // //                 </NavLink>
// // // //               )
// // // //             )}

// // // //             {/* ✅ "Other" Dropdown (Filtered Categories Only) */}
// // // //             <div ref={otherDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// // // //               <span onClick={() => setIsOtherDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// // // //                 Other ▾
// // // //               </span>
// // // //               {isOtherDropdownOpen && (
// // // //                 <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#c82333", color: "white", padding: "6px", minWidth: "540px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px", zIndex: 999 }}>
// // // //                   {allCategories.length > 0 ? (
// // // //                     allCategories.map((cat) => (
// // // //                       <NavLink
// // // //                         key={cat._id}
// // // //                         to={`/category/${cat.name}`}
// // // //                         className="text-white text-decoration-none"
// // // //                         style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// // // //                         onClick={() => setIsOtherDropdownOpen(false)}
// // // //                       >
// // // //                         {cat.name}
// // // //                       </NavLink>
// // // //                     ))
// // // //                   ) : (
// // // //                     <span className="text-white p-2" style={{fontSize: '14px'}}>Loading...</span>
// // // //                   )}
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //           </Nav>

// // // //           {/* Right Icons */}
// // // //           <Nav className="d-flex flex-row align-items-center gap-3 gap-md-4">
// // // //             <HeaderActionIcon
// // // //               icon={epaperIcon}
// // // //               text="E-Paper"
// // // //               link="http://www.jabalpurexpress.com/"
// // // //             />
// // // //             <HeaderActionIcon icon={searchIcon} text="Search" link="/search" />
// // // //             <HeaderActionIcon icon={emstvIcon} text="EMS TV" link="/emstv" />
// // // //             <HeaderActionIcon icon={directoryIcon} text="Directory" link="/directory" />
// // // //             <HeaderActionIcon
// // // //               icon={<MdOutlineSubscriptions color="#c41229ff" />}
// // // //               text="Subscriber"
// // // //               link="https://services.emsindia.com/public/authentication/admin_login"
// // // //               isReactIcon
// // // //               size={28}
// // // //             />
// // // //           </Nav>
// // // //         </Container>
// // // //       </div>

// // // //       {/* Live News */}
// // // //       <div className="bg-white border-top border-bottom">
// // // //         <Container fluid className="d-flex align-items-center p-0">
// // // //           <div className="d-flex align-items-center px-2 py-1" style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}>
// // // //             <Button variant="link" className="text-white me-2 p-0" onClick={toggleSidebar} style={{ fontSize: "20px" }}>
// // // //               <FaBars />
// // // //             </Button>
// // // //             <span className="text-white fw-bold px-2 py-0" style={{ minWidth: "120px", fontSize: "14px" }}>
// // // //               Live News
// // // //             </span>
// // // //           </div>

// // // //           <marquee behavior="scroll" direction="left" className="fw-bold py-1" style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}>
// // // //             {headlineData.map((headline) => (
// // // //               <Link key={headline.id} to={headline.slug ? `/news/${headline.slug}` : "#"} className="text-decoration-none text-dark me-4" style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
// // // //                 {headline.text}
// // // //               </Link>
// // // //             ))}
// // // //           </marquee>
// // // //         </Container>
// // // //       </div>

// // // //       <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} states={allStates} />
// // // //     </>
// // // //   );
// // // // };

// // // // export default Header;

// // // import React, { useEffect, useState, useRef } from "react";
// // // import { Container, Button, Nav } from "react-bootstrap";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";

// // // // Assets
// // // import logoT from "../../../assets/logoT.png";
// // // import epaperIcon from "../../../assets/icons/epaper-icon.svg";
// // // import searchIcon from "../../../assets/icons/search-icon.svg";
// // // import emstvIcon from "../../../assets/icons/emstvIcon.png";
// // // import directoryIcon from "../../../assets/icons/directory-icon.svg";
// // // import loginIcon from "../../../assets/icons/login-icon.svg";

// // // // Google Translate
// // // import GoogleTranslateWidget, { useGoogleTranslate } from "../../GoogleTranslateWidget";

// // // // Icons
// // // import { FaFacebookF, FaYoutube, FaInstagram, FaUserCircle } from "react-icons/fa";
// // // import { FaXTwitter, FaBars } from "react-icons/fa6";
// // // import { MdOutlineSubscriptions } from "react-icons/md";

// // // // Sidebar
// // // import LeftSidebar from "../LeftSidebar";

// // // // API
// // // import { headline, getStatesByCountry, getCategories } from "../../../Services/authApi";

// // // // ✅ Static Menu Items
// // // const sidebarOptions = [
// // //   { name: "Home", path: "/" },
// // //   { name: "India", path: "/india" },
// // //   { name: "State", path: "/state", isDropdown: true },
// // //   { name: "Entertainment", path: "/entertainment" },
// // //   { name: "Astrology", path: "/astrology" },
// // //   { name: "Sports", path: "/sports" },
// // //   { name: "Thoughts", path: "/thoughts" },
// // //   { name: "Business", path: "/business" },
// // //   { name: "Youth", path: "/youth" },
// // // ];

// // // const HeaderActionIcon = ({ icon, text, link, isReactIcon = false, size = 28 }) => {
// // //   const renderedIcon = isReactIcon ? React.cloneElement(icon, { size }) : <img src={icon} alt={text} height={size} width={size} />;
// // //   const isExternalLink = link.startsWith("http://") || link.startsWith("https://");

// // //   const handleExternalLinkClick = (event) => {
// // //     if (isExternalLink) {
// // //       event.preventDefault();
// // //       window.open(link, "_self");
// // //     }
// // //   };

// // //   return isExternalLink ? (
// // //     <a
// // //       href={link}
// // //       onClick={handleExternalLinkClick}
// // //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// // //       style={{ color: "#000" }}
// // //     >
// // //       {renderedIcon}
// // //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// // //         {text}
// // //       </span>
// // //     </a>
// // //   ) : (
// // //     <Link
// // //       to={link}
// // //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// // //       style={{ color: "#000" }}
// // //     >
// // //       {renderedIcon}
// // //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// // //         {text}
// // //       </span>
// // //     </Link>
// // //   );
// // // };

// // // const Header = () => {
// // //   const navigate = useNavigate();
// // //   const { changeLanguage: googleTranslateChangeLanguage } = useGoogleTranslate();

// // //   const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("userLanguage") || "en");
// // //   const [headlineData, setHeadlineData] = useState([]);
// // //   const [allStates, setAllStates] = useState([]);
// // //   const [allCategories, setAllCategories] = useState([]);
  
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // //   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
// // //   const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
// // //   const [isScrolled, setIsScrolled] = useState(false);

// // //   const [loggedInUser, setLoggedInUser] = useState(null);
// // //   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
// // //   const profileDropdownRef = useRef(null);
// // //   const stateDropdownRef = useRef(null);
// // //   const otherDropdownRef = useRef(null);

// // //   const changeAppLanguage = (lang) => {
// // //     setCurrentLanguage(lang);
// // //     localStorage.setItem("userLanguage", lang);
// // //     navigate("/");
// // //     window.location.reload();
// // //   };

// // //   useEffect(() => {
// // //     const handleScroll = () => setIsScrolled(window.scrollY > 80);
// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     const userData = localStorage.getItem("user");
// // //     if (userData) {
// // //       try {
// // //         setLoggedInUser(JSON.parse(userData));
// // //       } catch {
// // //         setLoggedInUser(null);
// // //       }
// // //     } else setLoggedInUser(null);
// // //   }, []);

// // //   useEffect(() => {
// // //     const fetchHeadline = async () => {
// // //       try {
// // //         const response = await headline();
// // //         const dataArray = response?.data || [];
// // //         const allHeadlines = dataArray
// // //           .filter((item) => item.headlineText && item.newsId?.slug_en)
// // //           .map((item) => ({
// // //             id: item.newsId?._id,
// // //             slug: item.newsId?.slug_en,
// // //             text: item.headlineText.trim(),
// // //           }));
// // //         setHeadlineData(allHeadlines.length ? allHeadlines : [{ id: "0", slug: "", text: "No headline available" }]);
// // //       } catch {
// // //         setHeadlineData([{ id: "0", slug: "", text: "" }]);
// // //       }
// // //     };
// // //     fetchHeadline();
// // //   }, [currentLanguage]);

// // //   useEffect(() => {
// // //     const fetchStates = async () => {
// // //       try {
// // //         const res = await getStatesByCountry("687a1e2185f0230715032380");
// // //         if (res?.success) setAllStates(res.data);
// // //       } catch {}
// // //     };
// // //     fetchStates();
// // //   }, []);

// // //   useEffect(() => {
// // //     const fetchAllCategories = async () => {
// // //       try {
// // //         const res = await getCategories();
// // //         if (res?.success) {
// // //           const staticNames = sidebarOptions.map(opt => opt.name.toLowerCase());
// // //           const filteredCats = res.data.filter(cat => 
// // //              !staticNames.includes(cat.name.toLowerCase())
// // //           );
// // //           setAllCategories(filteredCats);
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to fetch categories", error);
// // //       }
// // //     };
// // //     fetchAllCategories();
// // //   }, []);

// // //   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
// // //         setIsStateDropdownOpen(false);
// // //       }
// // //       if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) {
// // //         setIsOtherDropdownOpen(false);
// // //       }
// // //       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
// // //         setIsProfileDropdownOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const handleLogout = () => {
// // //     localStorage.removeItem("user");
// // //     localStorage.removeItem("token");
// // //     setLoggedInUser(null);
// // //     setIsProfileDropdownOpen(false);
// // //     navigate("/");
// // //     window.location.reload();
// // //   };

// // //   return (
// // //     <>
// // //       <GoogleTranslateWidget />

// // //       {/* Blue Header */}
// // //       <div
// // //         style={{
// // //           backgroundColor: "#0d2d62",
// // //           color: "white",
// // //           height: "40px",
// // //           position: "fixed",
// // //           top: 5,
// // //           left: 0,
// // //           right: 0,
// // //           zIndex: 2000,
// // //           transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
// // //           transition: "transform 0.4s ease-in-out",
// // //         }}
// // //       >
// // //         <Container fluid className="d-flex justify-content-between align-items-center py-1 px-3">
// // //           <div className="d-flex align-items-center" style={{ marginLeft: "70px" }}>
// // //             <Button
// // //               variant="link"
// // //               className="text-white fw-bold p-0 me-3"
// // //               onClick={() => changeAppLanguage("hi")}
// // //               style={{ textDecoration: currentLanguage === "hi" ? "underline" : "none" }}
// // //             >
// // //               हिंदी
// // //             </Button>
// // //             <Button
// // //               variant="link"
// // //               className="text-white fw-bold p-0"
// // //               onClick={() => changeAppLanguage("en")}
// // //               style={{ textDecoration: currentLanguage === "en" ? "underline" : "none" }}
// // //             >
// // //               English
// // //             </Button>
// // //           </div>

// // //           <div className="d-flex align-items-center">
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaFacebookF size={16} /></a>
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaXTwitter size={16} /></a>
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaYoutube size={16} /></a>
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaInstagram size={16} /></a>

// // //             <div ref={profileDropdownRef} className="position-relative ms-3">
// // //               {loggedInUser ? (
// // //                 <Button
// // //                   variant="link"
// // //                   onClick={(e) => {
// // //                     e.stopPropagation();
// // //                     setIsProfileDropdownOpen((prev) => !prev);
// // //                   }}
// // //                   className="p-0 border-0 d-flex align-items-center text-decoration-none"
// // //                 >
// // //                   {loggedInUser.profileImage ? (
// // //                     <img
// // //                       src={loggedInUser.profileImage}
// // //                       alt={loggedInUser.name}
// // //                       className="rounded-circle"
// // //                       style={{ width: "28px", height: "28px", objectFit: "cover" }}
// // //                     />
// // //                   ) : (
// // //                     <FaUserCircle size={28} color="white" />
// // //                   )}
// // //                   <span className="ms-2 text-white fw-bold d-none d-lg-inline">
// // //                     {loggedInUser.name.split(" ")[0]}
// // //                   </span>
// // //                 </Button>
// // //               ) : (
// // //                 <Link
// // //                   to="/login"
// // //                   className="d-flex align-items-center text-decoration-none text-white fw-bold me-3 ms-3"
// // //                 >
// // //                   <img src={loginIcon} alt="Login" height="28" className="me-1" />
// // //                   <span>Login</span>
// // //                 </Link>
// // //               )}

// // //               {isProfileDropdownOpen && loggedInUser && (
// // //                 <div
// // //                   style={{
// // //                     position: "absolute",
// // //                     top: "100%",
// // //                     right: 0,
// // //                     backgroundColor: "#0d2d62",
// // //                     color: "white",
// // //                     padding: "8px 0",
// // //                     minWidth: "120px",
// // //                     borderRadius: "4px",
// // //                     zIndex: 2001,
// // //                   }}
// // //                 >
// // //                   <Link
// // //                     to="/profile"
// // //                     className="d-block text-white text-decoration-none px-3 py-1"
// // //                     onClick={() => setIsProfileDropdownOpen(false)}
// // //                   >
// // //                     Profile
// // //                   </Link>
// // //                   <Button
// // //                     variant="link"
// // //                     className="d-block text-white text-decoration-none w-100 text-start px-3 py-1"
// // //                     onClick={handleLogout}
// // //                   >
// // //                     Logout
// // //                   </Button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </Container>
// // //       </div>

// // //       <div style={{ marginTop: "40px" }} />

// // //       {/* White Header */}
// // //       <div className="bg-white border-bottom" style={{ transition: "all 0.5s ease-in-out" }}>
// // //         <Container fluid className="d-flex justify-content-between align-items-center py-2 px-3">
// // //           <Link to="/" className="d-flex flex-column align-items-center text-decoration-none" style={{ zIndex: 2100 }}>
// // //             <video src="/logogif.mp4" autoPlay loop muted style={{ width: "60px", marginRight: "3px", zIndex: 2100, transform: isScrolled ? "translateY(0)" : "translateY(-50px)", transition: "transform 0.5s ease-in-out" }} />
// // //             <img src={logoT} alt="EMS Tagline" style={{ height: "5px", transform: isScrolled ? "translateY(0)" : "translateY(-50px)", transition: "transform 0.5s ease-in-out" }} />
// // //           </Link>

// // //           {/* Center Menu */}
// // //           <Nav className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold" style={{ gap: "45px" }}>
// // //             {sidebarOptions.map((opt, index) =>
// // //               opt.isDropdown ? (
// // //                 <div key={index} ref={stateDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// // //                   <span onClick={() => setIsStateDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// // //                     State ▾
// // //                   </span>
// // //                   {isStateDropdownOpen && (
// // //                     <div style={{ 
// // //                         position: "absolute", 
// // //                         top: "100%", 
// // //                         left: 0, 
// // //                         backgroundColor: "#c82333", 
// // //                         color: "white", 
// // //                         padding: "6px", 
// // //                         minWidth: "540px", 
// // //                         display: "grid", 
// // //                         gridTemplateColumns: "repeat(3, 1fr)", 
// // //                         gap: "4px", 
// // //                         zIndex: 999 
// // //                     }}>
// // //                       {allStates.map((state) => (
// // //                         <NavLink
// // //                           key={state._id}
// // //                           to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
// // //                           className="text-white text-decoration-none"
// // //                           style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// // //                           onClick={() => setIsStateDropdownOpen(false)}
// // //                         >
// // //                           {state.name}
// // //                         </NavLink>
// // //                       ))}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               ) : (
// // //                 <NavLink key={index} to={opt.path} className="text-decoration-none text-black" style={{ fontWeight: 600 }}>
// // //                   {opt.name}
// // //                 </NavLink>
// // //               )
// // //             )}

// // //             {/* ✅ "Other" Dropdown with Right Alignment */}
// // //             <div ref={otherDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// // //               <span onClick={() => setIsOtherDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// // //                 Other ▾
// // //               </span>
// // //               {isOtherDropdownOpen && (
// // //                 <div style={{ 
// // //                     position: "absolute", 
// // //                     top: "100%", 
// // //                     right: 0,      // ✅ Changed from left:0 to right:0
// // //                     left: "auto",  // ✅ Ensures it doesn't stick to left
// // //                     backgroundColor: "#c82333", 
// // //                     color: "white", 
// // //                     padding: "6px", 
// // //                     minWidth: "540px", 
// // //                     display: "grid", 
// // //                     gridTemplateColumns: "repeat(3, 1fr)", 
// // //                     gap: "4px", 
// // //                     zIndex: 999,
// // //                     boxShadow: "0 4px 8px rgba(0,0,0,0.15)" 
// // //                 }}>
// // //                   {allCategories.length > 0 ? (
// // //                     allCategories.map((cat) => (
// // //                       <NavLink
// // //                         key={cat._id}
// // //                         to={`/category/${cat.name}`}
// // //                         className="text-white text-decoration-none"
// // //                         style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// // //                         onClick={() => setIsOtherDropdownOpen(false)}
// // //                       >
// // //                         {cat.name}
// // //                       </NavLink>
// // //                     ))
// // //                   ) : (
// // //                     <span className="text-white p-2" style={{fontSize: '14px'}}>Loading...</span>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>

// // //           </Nav>

// // //           {/* Right Icons */}
// // //           <Nav className="d-flex flex-row align-items-center gap-3 gap-md-4">
// // //             <HeaderActionIcon icon={epaperIcon} text="E-Paper" link="http://www.jabalpurexpress.com/" />
// // //             <HeaderActionIcon icon={searchIcon} text="Search" link="/search" />
// // //             <HeaderActionIcon icon={emstvIcon} text="EMS TV" link="/emstv" />
// // //             <HeaderActionIcon icon={directoryIcon} text="Directory" link="/directory" />
// // //             <HeaderActionIcon icon={<MdOutlineSubscriptions color="#c41229ff" />} text="Subscriber" link="https://services.emsindia.com/public/authentication/admin_login" isReactIcon size={28} />
// // //           </Nav>
// // //         </Container>
// // //       </div>

// // //       {/* Live News */}
// // //       <div className="bg-white border-top border-bottom">
// // //         <Container fluid className="d-flex align-items-center p-0">
// // //           <div className="d-flex align-items-center px-2 py-1" style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}>
// // //             <Button variant="link" className="text-white me-2 p-0" onClick={toggleSidebar} style={{ fontSize: "20px" }}>
// // //               <FaBars />
// // //             </Button>
// // //             <span className="text-white fw-bold px-2 py-0" style={{ minWidth: "120px", fontSize: "14px" }}>
// // //               News Headline
// // //             </span>
// // //           </div>

// // //           <marquee behavior="scroll" direction="left" className="fw-bold py-1" style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}>
// // //             {headlineData.map((headline) => (
// // //               <Link key={headline.id} to={headline.slug ? `/news/${headline.slug}` : "#"} className="text-decoration-none text-dark me-4" style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
// // //                 {headline.text}
// // //               </Link>
// // //             ))}
// // //           </marquee>
// // //         </Container>
// // //       </div>

// // //       <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} states={allStates} />
// // //     </>
// // //   );
// // // };

// // // export default Header;



// // // import React, { useEffect, useState, useRef } from "react";
// // // import { Container, Button, Nav } from "react-bootstrap";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
 
// // // // Assets
// // // import logoT from "../../../assets/logoT.png";
// // // import epaperIcon from "../../../assets/icons/epaper-icon.svg";
// // // import searchIcon from "../../../assets/icons/search-icon.svg";
// // // import emstvIcon from "../../../assets/icons/emstvIcon.png";
// // // import directoryIcon from "../../../assets/icons/directory-icon.svg";
// // // import loginIcon from "../../../assets/icons/login-icon.svg";
 
// // // // Google Translate
// // // import GoogleTranslateWidget, { useGoogleTranslate } from "../../GoogleTranslateWidget";
 
// // // // Icons
// // // import { FaFacebookF, FaYoutube, FaInstagram, FaUserCircle } from "react-icons/fa";
// // // import { FaXTwitter, FaBars } from "react-icons/fa6";
// // // import { MdOutlineSubscriptions } from "react-icons/md";
 
// // // // Sidebar
// // // import LeftSidebar from "../LeftSidebar";
 
// // // // API
// // // import { headline, getStatesByCountry, getCategories } from "../../../Services/authApi";

 
// // // // ✅ 1. Translation object for menu items
// // // const translations = {
// // //   en: {
// // //     home: "Home",
// // //     india: "India",
// // //     state: "State",
// // //     entertainment: "Entertainment",
// // //     astrology: "Astrology",
// // //     sports: "Sports",
// // //     thoughts: "Thoughts",
// // //     business: "Business",
// // //     youth: "Youth",
// // //     other: "Other",
// // //     epaper: "E-Paper",
// // //     search: "Search",
// // //     emstv: "EMS TV",
// // //     directory: "Directory",
// // //     subscriber: "Subscriber",
// // //     liveNews: "News Headline",
// // //     login: "Login",
// // //     profile: "Profile",
// // //     logout: "Logout"
// // //   },
// // //   hi: {
// // //     home: "होम",
// // //     india: "देश",
// // //     state: "राज्य",
// // //     entertainment: "मनोरंजन",
// // //     astrology: "राशिफल",
// // //     sports: "खेल",
// // //     thoughts: "विचार",
// // //     business: "बिजनेस",
// // //     youth: "लाइफस्टाइल",
// // //     other: "अन्य",
// // //     epaper: "ई-पेपर",
// // //     search: "खोजें",
// // //     emstv: "ईएमएस टीवी",
// // //     directory: "डायरेक्टरी",
// // //     subscriber: "सब्सक्राइबर",
// // //     liveNews: "न्यूज़ हेडलाइंस",
// // //     login: "लॉगिन",
// // //     profile: "प्रोफ़ाइल",
// // //     logout: "लॉगआउट"
// // //   },
// // // };
 
 
// // // // ✅ 2. Updated static menu items to use keys for translation
// // // const sidebarOptions = [
// // //   { key: "home", path: "/" },
// // //   { key: "india", path: "/india" },
// // //   { key: "state", path: "/state", isDropdown: true },
// // //   { key: "entertainment", path: "/entertainment" },
// // //   { key: "astrology", path: "/astrology" },
// // //   { key: "sports", path: "/sports" },
// // //   { key: "thoughts", path: "/thoughts" },
// // //   { key: "business", path: "/business" },
// // //   { key: "youth", path: "/youth" },
// // // ];
 
// // // const HeaderActionIcon = ({ icon, text, link, isReactIcon = false, size = 28 }) => {
// // //   const renderedIcon = isReactIcon ? React.cloneElement(icon, { size }) : <img src={icon} alt={text} height={size} width={size} />;
// // //   const isExternalLink = link.startsWith("http://") || link.startsWith("https://");
 
// // //   const handleExternalLinkClick = (event) => {
// // //     if (isExternalLink) {
// // //       event.preventDefault();
// // //       window.open(link, "_self");
// // //     }
// // //   };
 
// // //   return isExternalLink ? (
// // //     <a
// // //       href={link}
// // //       onClick={handleExternalLinkClick}
// // //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// // //       style={{ color: "#000" }}
// // //     >
// // //       {renderedIcon}
// // //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// // //         {text}
// // //       </span>
// // //     </a>
// // //   ) : (
// // //     <Link
// // //       to={link}
// // //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// // //       style={{ color: "#000" }}
// // //     >
// // //       {renderedIcon}
// // //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// // //         {text}
// // //       </span>
// // //     </Link>
// // //   );
// // // };
 
// // // const Header = () => {
// // //   const navigate = useNavigate();
// // //   const { changeLanguage: googleTranslateChangeLanguage } = useGoogleTranslate();
 
// // //   const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("userLanguage") || "en");
// // //   const [headlineData, setHeadlineData] = useState([]);
// // //   const [allStates, setAllStates] = useState([]);
// // //   const [allCategories, setAllCategories] = useState([]);
 
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // //   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
// // //   const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
// // //   const [isScrolled, setIsScrolled] = useState(false);
 
// // //   const [loggedInUser, setLoggedInUser] = useState(null);
// // //   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
 
// // //   const profileDropdownRef = useRef(null);
// // //   const stateDropdownRef = useRef(null);
// // //   const otherDropdownRef = useRef(null);
   
// // //   // ✅ 3. Get the correct set of translations based on the current language
// // //   const t = translations[currentLanguage] || translations.en;
 
// // //   const changeAppLanguage = (lang) => {
// // //     setCurrentLanguage(lang);
// // //     localStorage.setItem("userLanguage", lang);
// // //     navigate("/");
// // //     window.location.reload();
// // //   };
 
// // //   useEffect(() => {
// // //     const handleScroll = () => setIsScrolled(window.scrollY > 80);
// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);
 
// // //   useEffect(() => {
// // //     const userData = localStorage.getItem("user");
// // //     if (userData) {
// // //       try {
// // //         setLoggedInUser(JSON.parse(userData));
// // //       } catch {
// // //         setLoggedInUser(null);
// // //       }
// // //     } else setLoggedInUser(null);
// // //   }, []);
 
// // //   useEffect(() => {
// // //     const fetchHeadline = async () => {
// // //       try {
// // //         const response = await headline();
// // //         const dataArray = response?.data || [];
// // //         const allHeadlines = dataArray
// // //           .filter((item) => item.headlineText)
// // //           .map((item) => ({
// // //             id: item.newsId?._id || item._id,
// // //             slug: item.newsId?.slug_en || "",
// // //             text: item.headlineText.trim(),
// // //           }));
 
// // //         setHeadlineData(
// // //           allHeadlines.length
// // //             ? allHeadlines
// // //             : [{ id: "0", slug: "", text: "No headline available" }]
// // //         );
// // //       } catch {
// // //         setHeadlineData([{ id: "0", slug: "", text: "Error loading headlines" }]);
// // //       }
// // //     };
 
// // //     fetchHeadline();
// // //   }, [currentLanguage]);
 
// // //   useEffect(() => {
// // //     const fetchStates = async () => {
// // //       try {
// // //         const res = await getStatesByCountry("687a1e2185f0230715032380");
// // //         if (res?.success) setAllStates(res.data);
// // //       } catch {}
// // //     };
// // //     fetchStates();
// // //   }, []);
 
// // //   useEffect(() => {
// // //     const fetchAllCategories = async () => {
// // //       try {
// // //         const res = await getCategories();
// // //         if (res?.success) {
// // //           const staticNames = sidebarOptions.map(opt => opt.key.toLowerCase());
// // //           const filteredCats = res.data.filter(cat =>
// // //              !staticNames.includes(cat.name.toLowerCase())
// // //           );
// // //           setAllCategories(filteredCats);
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to fetch categories", error);
// // //       }
// // //     };
// // //     fetchAllCategories();
// // //   }, []);
 
// // //   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
 
// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
// // //         setIsStateDropdownOpen(false);
// // //       }
// // //       if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) {
// // //         setIsOtherDropdownOpen(false);
// // //       }
// // //       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
// // //         setIsProfileDropdownOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);
 
// // //   const handleLogout = () => {
// // //     localStorage.removeItem("user");
// // //     localStorage.removeItem("token");
// // //     setLoggedInUser(null);
// // //     setIsProfileDropdownOpen(false);
// // //     navigate("/");
// // //     window.location.reload();
// // //   };
 
// // //   return (
// // //     <>
// // //       <GoogleTranslateWidget />
 
// // //       {/* Blue Header */}
// // //       <div
// // //         style={{
// // //           backgroundColor: "#0d2d62",
// // //           color: "white",
// // //           height: "40px",
// // //           position: "fixed",
// // //           top: 5,
// // //           left: 0,
// // //           right: 0,
// // //           zIndex: 2000,
// // //           transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
// // //           transition: "transform 0.4s ease-in-out",
// // //         }}
// // //       >
// // //         <Container fluid className="d-flex justify-content-between align-items-center py-1 px-3">
// // //           <div className="d-flex align-items-center" style={{ marginLeft: "70px" }}>
// // //             <Button
// // //               variant="link"
// // //               className="text-white fw-bold p-0 me-3"
// // //               onClick={() => changeAppLanguage("hi")}
// // //               style={{ textDecoration: currentLanguage === "hi" ? "underline" : "none" }}
// // //             >
// // //               हिंदी
// // //             </Button>
// // //             <Button
// // //               variant="link"
// // //               className="text-white fw-bold p-0"
// // //               onClick={() => changeAppLanguage("en")}
// // //               style={{ textDecoration: currentLanguage === "en" ? "underline" : "none" }}
// // //             >
// // //               English
// // //             </Button>
// // //           </div>
 
// // //           <div className="d-flex align-items-center">
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaFacebookF size={16} /></a>
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaXTwitter size={16} /></a>
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaYoutube size={16} /></a>
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaInstagram size={16} /></a>
 
// // //             <div ref={profileDropdownRef} className="position-relative ms-3">
// // //               {loggedInUser ? (
// // //                 <Button
// // //                   variant="link"
// // //                   onClick={(e) => {
// // //                     e.stopPropagation();
// // //                     setIsProfileDropdownOpen((prev) => !prev);
// // //                   }}
// // //                   className="p-0 border-0 d-flex align-items-center text-decoration-none"
// // //                 >
// // //                   {loggedInUser.profileImage ? (
// // //                     <img
// // //                       src={loggedInUser.profileImage}
// // //                       alt={loggedInUser.name}
// // //                       className="rounded-circle"
// // //                       style={{ width: "28px", height: "28px", objectFit: "cover" }}
// // //                     />
// // //                   ) : (
// // //                     <FaUserCircle size={28} color="white" />
// // //                   )}
// // //                   <span className="ms-2 text-white fw-bold d-none d-lg-inline">
// // //                     {loggedInUser.name.split(" ")[0]}
// // //                   </span>
// // //                 </Button>
// // //               ) : (
// // //                 <Link
// // //                   to="/login"
// // //                   className="d-flex align-items-center text-decoration-none text-white fw-bold me-3 ms-3"
// // //                 >
// // //                   <img src={loginIcon} alt="Login" height="28" className="me-1" />
// // //                   {/* ✅ Using translated text */}
// // //                   <span>{t.login}</span>
// // //                 </Link>
// // //               )}
 
// // //               {isProfileDropdownOpen && loggedInUser && (
// // //                 <div
// // //                   style={{
// // //                     position: "absolute",
// // //                     top: "100%",
// // //                     right: 0,
// // //                     backgroundColor: "#0d2d62",
// // //                     color: "white",
// // //                     padding: "8px 0",
// // //                     minWidth: "120px",
// // //                     borderRadius: "4px",
// // //                     zIndex: 2001,
// // //                   }}
// // //                 >
// // //                   <Link
// // //                     to="/profile"
// // //                     className="d-block text-white text-decoration-none px-3 py-1"
// // //                     onClick={() => setIsProfileDropdownOpen(false)}
// // //                   >
// // //                     {/* ✅ Using translated text */}
// // //                     {t.profile}
// // //                   </Link>
// // //                   <Button
// // //                     variant="link"
// // //                     className="d-block text-white text-decoration-none w-100 text-start px-3 py-1"
// // //                     onClick={handleLogout}
// // //                   >
// // //                      {/* ✅ Using translated text */}
// // //                     {t.logout}
// // //                   </Button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </Container>
// // //       </div>
 
// // //       <div style={{ marginTop: "40px" }} />
 
// // //       {/* White Header */}
// // //       <div className="bg-white border-bottom" style={{ transition: "all 0.5s ease-in-out" }}>
// // //         <Container fluid className="d-flex justify-content-between align-items-center py-2 px-3">
// // //           <Link to="/" className="d-flex flex-column align-items-center text-decoration-none" style={{ zIndex: 2100 }}>
// // //             <video src="/logogif.mp4" autoPlay loop muted style={{ width: "60px", marginRight: "3px", zIndex: 2100, transform: isScrolled ? "translateY(0)" : "translateY(-50px)", transition: "transform 0.5s ease-in-out" }} />
// // //             <img src={logoT} alt="EMS Tagline" style={{ height: "5px", transform: isScrolled ? "translateY(0)" : "translateY(-50px)", transition: "transform 0.5s ease-in-out" }} />
// // //           </Link>
 
// // //           {/* Center Menu */}
// // //           <Nav className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold" style={{ gap: "45px" }}>
// // //             {sidebarOptions.map((opt, index) =>
// // //               opt.isDropdown ? (
// // //                 <div key={index} ref={stateDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// // //                    {/* ✅ Using translated text for State dropdown */}
// // //                   <span onClick={() => setIsStateDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// // //                     {t[opt.key]} ▾
// // //                   </span>
// // //                   {isStateDropdownOpen && (
// // //                     <div style={{
// // //                         position: "absolute",
// // //                         top: "100%",
// // //                         left: 0,
// // //                         backgroundColor: "#c82333",
// // //                         color: "white",
// // //                         padding: "6px",
// // //                         minWidth: "540px",
// // //                         display: "grid",
// // //                         gridTemplateColumns: "repeat(3, 1fr)",
// // //                         gap: "4px",
// // //                         zIndex: 999
// // //                     }}>
// // //                       {allStates.map((state) => (
// // //                         <NavLink
// // //                           key={state._id}
// // //                           to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
// // //                           className="text-white text-decoration-none"
// // //                           style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// // //                           onClick={() => setIsStateDropdownOpen(false)}
// // //                         >
// // //                           {state.name}
// // //                         </NavLink>
// // //                       ))}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               ) : (
// // //                 <NavLink key={index} to={opt.path} className="text-decoration-none text-black" style={{ fontWeight: 600 }}>
// // //                   {/* ✅ Using translated text for other menu items */}
// // //                   {t[opt.key]}
// // //                 </NavLink>
// // //               )
// // //             )}
 
// // //             <div ref={otherDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// // //                {/* ✅ Using translated text for Other dropdown */}
// // //               <span onClick={() => setIsOtherDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// // //                 {t.other} ▾
// // //               </span>
// // //               {isOtherDropdownOpen && (
// // //                 <div style={{
// // //                     position: "absolute",
// // //                     top: "100%",
// // //                     right: 0,
// // //                     left: "auto",
// // //                     backgroundColor: "#c82333",
// // //                     color: "white",
// // //                     padding: "6px",
// // //                     minWidth: "540px",
// // //                     display: "grid",
// // //                     gridTemplateColumns: "repeat(3, 1fr)",
// // //                     gap: "4px",
// // //                     zIndex: 999,
// // //                     boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
// // //                 }}>
// // //                   {allCategories.length > 0 ? (
// // //                     allCategories.map((cat) => (
// // //                       <NavLink
// // //                         key={cat._id}
// // //                         to={`/category/${cat.name}`}
// // //                         className="text-white text-decoration-none"
// // //                         style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// // //                         onClick={() => setIsOtherDropdownOpen(false)}
// // //                       >
// // //                         {cat.name}
// // //                       </NavLink>
// // //                     ))
// // //                   ) : (
// // //                     <span className="text-white p-2" style={{fontSize: '14px'}}>Loading...</span>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </Nav>
 
// // //           {/* Right Icons */}
// // //           <Nav className="d-flex flex-row align-items-center gap-3 gap-md-4">
// // //              {/* ✅ Using translated text for HeaderActionIcons */}
// // //             <HeaderActionIcon icon={epaperIcon} text={t.epaper} link="http://www.jabalpurexpress.com/" />
// // //             <HeaderActionIcon icon={searchIcon} text={t.search} link="/search" />
// // //             <HeaderActionIcon icon={emstvIcon} text={t.emstv} link="/emstv" />
// // //             <HeaderActionIcon icon={directoryIcon} text={t.directory} link="/directory" />
// // //             <HeaderActionIcon icon={<MdOutlineSubscriptions color="#c41229ff" />} text={t.subscriber} link="https://services.emsindia.com/public/authentication/admin_login" isReactIcon size={28} />
// // //           </Nav>
// // //         </Container>
// // //       </div>
 
// // //       {/* Live News */}
// // //       <div className="bg-white border-top border-bottom">
// // //         <Container fluid className="d-flex align-items-center p-0">
// // //           <div className="d-flex align-items-center px-2 py-1" style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}>
// // //             <Button variant="link" className="text-white me-2 p-0" onClick={toggleSidebar} style={{ fontSize: "20px" }}>
// // //               <FaBars />
// // //             </Button>
// // //             {/* ✅ Using translated text for Live News */}
// // //             <span className="text-white fw-bold px-2 py-0" style={{ minWidth: "120px", fontSize: "14px" }}>
// // //               {t.liveNews}
// // //             </span>
// // //           </div>
 
// // //           <marquee
// // //             behavior="scroll"
// // //             direction="left"
// // //             className="fw-bold py-1"
// // //             style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}
// // //           >
// // //             {headlineData.map((headline) => (
// // //               <Link
// // //                 key={headline.id}
// // //                 to={headline.slug ? `/news/${headline.slug}` : "#"}
// // //                 className="text-decoration-none text-dark me-4"
// // //                 style={{
// // //                   whiteSpace: "nowrap",
// // //                   fontWeight: "bold",
// // //                   pointerEvents: headline.slug ? "auto" : "none",
// // //                   color: headline.slug ? "#000" : "gray"
// // //                 }}
// // //               >
// // //                 {headline.text}
// // //               </Link>
// // //             ))}
// // //           </marquee>
// // //         </Container>
// // //       </div>
 
// // //       <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} states={allStates} />
// // //     </>
// // //   );
// // // };
 
// // // export default Header;
 


// // // import React, { useEffect, useState, useRef } from "react";
// // // import { Container, Button, Nav, Row, Col } from "react-bootstrap";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";

// // // // Assets
// // // import logoT from "../../../assets/logoT.png";
// // // import epaperIcon from "../../../assets/icons/epaper-icon.svg";
// // // import searchIcon from "../../../assets/icons/search-icon.svg";
// // // import emstvIcon from "../../../assets/icons/emstvIcon.png";
// // // import directoryIcon from "../../../assets/icons/directory-icon.svg";
// // // // loginIcon अब Font Awesome icon से बदल दिया गया है, इस इम्पोर्ट की अब सीधे जरूरत नहीं है
// // // // import loginIcon from "../../../assets/icons/login-icon.svg";

// // // // Google Translate
// // // import GoogleTranslateWidget, {
// // //   useGoogleTranslate,
// // // } from "../../GoogleTranslateWidget";

// // // // Icons
// // // import { FaFacebookF, FaYoutube, FaInstagram, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
// // // import { FaXTwitter, FaBars } from "react-icons/fa6";
// // // import { MdOutlineSubscriptions } from "react-icons/md";

// // // // Sidebar
// // // import LeftSidebar from "../LeftSidebar";

// // // // API
// // // import { headline, getStatesByCountry, getCategories } from "../../../Services/authApi";
// // // import TopAdBanner from "../../../components/NewsDetails/TopAdBanner"; // path check kar lena

// // // // ===============================================
// // // // ✅ 1. Heights and Z-index Constants (अपनी विज्ञापन की वास्तविक ऊंचाई के अनुसार AD_BANNER_HEIGHT को एडजस्ट करें)
// // // const GAP_TOP_OF_AD = 5; // विज्ञापन के ऊपर 5px का गैप
// // // const AD_BANNER_HEIGHT = 60; // विज्ञापन बैनर की ऊंचाई (आपकी छवि के आधार पर अनुमानित)
// // // const GAP_BELOW_AD = 5; // विज्ञापन के नीचे 5px का गैप
// // // const BLUE_HEADER_HEIGHT = 40; // ब्लू हेडर की ऊंचाई

// // // // सभी फिक्स्ड हेडर्स की कुल प्रारंभिक ऊंचाई (जब स्क्रॉल टॉप पर हो)
// // // const TOTAL_INITIAL_FIXED_HEIGHT = GAP_TOP_OF_AD + AD_BANNER_HEIGHT + GAP_BELOW_AD + BLUE_HEADER_HEIGHT;
// // // // ===============================================

// // // // ✅ 2. Translation object for menu items
// // // const translations = {
// // //   en: {
// // //     home: "Home",
// // //     india: "India",
// // //     state: "State",
// // //     entertainment: "Entertainment",
// // //     astrology: "Astrology",
// // //     sports: "Sports",
// // //     thoughts: "Thoughts",
// // //     business: "Business",
// // //     youth: "Youth",
// // //     other: "Other",
// // //     epaper: "E-Paper",
// // //     search: "Search",
// // //     emstv: "EMS TV",
// // //     directory: "Directory",
// // //     subscriber: "Subscriber",
// // //     liveNews: "News Headline",
// // //     login: "Login",
// // //     profile: "Profile",
// // //     logout: "Logout"
// // //   },
// // //   hi: {
// // //     home: "होम",
// // //     india: "देश",
// // //     state: "राज्य",
// // //     entertainment: "मनोरंजन",
// // //     astrology: "राशिफल",
// // //     sports: "खेल",
// // //     thoughts: "विचार",
// // //     business: "बिजनेस",
// // //     youth: "लाइफस्टाइल",
// // //     other: "अन्य",
// // //     epaper: "ई-पेपर",
// // //     search: "खोजें",
// // //     emstv: "ईएमएस टीवी",
// // //     directory: "डायरेक्टरी",
// // //     subscriber: "सब्सक्राइबर",
// // //     liveNews: "न्यूज़ हेडलाइंस",
// // //     login: "लॉगिन",
// // //     profile: "प्रोफ़ाइल",
// // //     logout: "लॉगआउट"
// // //   },
// // // };

// // // // ✅ 3. Updated static menu items to use keys for translation
// // // const sidebarOptions = [
// // //   { key: "home", path: "/" },
// // //   { key: "india", path: "/india" },
// // //   { key: "state", path: "/state", isDropdown: true },
// // //   { key: "entertainment", path: "/entertainment" },
// // //   { key: "astrology", path: "/astrology" },
// // //   { key: "sports", path: "/sports" },
// // //   { key: "thoughts", path: "/thoughts" },
// // //   { key: "business", path: "/business" },
// // //   { key: "youth", path: "/youth" },
// // // ];

// // // const HeaderActionIcon = ({ icon, text, link, isReactIcon = false, size = 28 }) => {
// // //   const renderedIcon = isReactIcon ? React.cloneElement(icon, { size }) : <img src={icon} alt={text} height={size} width={size} />;
// // //   const isExternalLink = link.startsWith("http://") || link.startsWith("https://");

// // //   const handleExternalLinkClick = (event) => {
// // //     if (isExternalLink) {
// // //       event.preventDefault();
// // //       window.open(link, "_self");
// // //     }
// // //   };

// // //   return isExternalLink ? (
// // //     <a
// // //       href={link}
// // //       onClick={handleExternalLinkClick}
// // //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// // //       style={{ color: "#000" }}
// // //     >
// // //       {renderedIcon}
// // //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// // //         {text}
// // //       </span>
// // //     </a>
// // //   ) : (
// // //     <Link
// // //       to={link}
// // //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// // //       style={{ color: "#000" }}
// // //     >
// // //       {renderedIcon}
// // //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// // //         {text}
// // //       </span>
// // //     </Link>
// // //   );
// // // };

// // // const Header = () => {
// // //   const navigate = useNavigate();
// // //   const { changeLanguage: googleTranslateChangeLanguage } = useGoogleTranslate();

// // //   const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("userLanguage") || "en");
// // //   const [headlineData, setHeadlineData] = useState([]);
// // //   const [allStates, setAllStates] = useState([]);
// // //   const [allCategories, setAllCategories] = useState([]);

// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // //   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
// // //   const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
// // //   // ✅ isScrolled स्टेट को वापस लाया गया है
// // //   const [isScrolled, setIsScrolled] = useState(false); // ✅ isScrolled for logo animation
// // //   const [scrollY, setScrollY] = useState(0); // ✅ scrollY स्टेट को जोड़ा गया

// // //   const [loggedInUser, setLoggedInUser] = useState(null);
// // //   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

// // //   const profileDropdownRef = useRef(null);
// // //   const stateDropdownRef = useRef(null);
// // //   const otherDropdownRef = useRef(null);
   
// // //   // ✅ 4. Get the correct set of translations based on the current language
// // //   const t = translations[currentLanguage] || translations.en;

// // //   const changeAppLanguage = (lang) => {
// // //     setCurrentLanguage(lang);
// // //     localStorage.setItem("userLanguage", lang);
// // //     navigate("/");
// // //     window.location.reload();
// // //   };

// // //   useEffect(() => {
// // //     // ✅ स्क्रॉल पोजीशन और isScrolled को अपडेट करने के लिए इवेंट लिसनर
// // //     const handleScroll = () => {
// // //       setScrollY(window.scrollY);
// // //       setIsScrolled(window.scrollY > 80); // 80px स्क्रॉल के बाद लोगो एनीमेशन ट्रिगर
// // //     };
// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     const userData = localStorage.getItem("user");
// // //     if (userData) {
// // //       try {
// // //         setLoggedInUser(JSON.parse(userData));
// // //       } catch {
// // //         setLoggedInUser(null);
// // //       }
// // //     } else setLoggedInUser(null);
// // //   }, []);

// // //   useEffect(() => {
// // //     const fetchHeadline = async () => {
// // //       try {
// // //         const response = await headline();
// // //         const dataArray = response?.data || [];
// // //         const allHeadlines = dataArray
// // //           .filter((item) => item.headlineText)
// // //           .map((item) => ({
// // //             id: item.newsId?._id || item._id,
// // //             slug: item.newsId?.slug_en || "",
// // //             text: item.headlineText.trim(),
// // //           }));

// // //         setHeadlineData(
// // //           allHeadlines.length
// // //             ? allHeadlines
// // //             : [{ id: "0", slug: "", text: "No headline available" }]
// // //         );
// // //       } catch {
// // //         setHeadlineData([{ id: "0", slug: "", text: "Error loading headlines" }]);
// // //       }
// // //     };

// // //     fetchHeadline();
// // //   }, [currentLanguage]);

// // //   useEffect(() => {
// // //     const fetchStates = async () => {
// // //       try {
// // //         const res = await getStatesByCountry("687a1e2185f0230715032380");
// // //         if (res?.success) setAllStates(res.data);
// // //       } catch {}
// // //     };
// // //     fetchStates();
// // //   }, []);

// // //   useEffect(() => {
// // //     const fetchAllCategories = async () => {
// // //       try {
// // //         const res = await getCategories();
// // //         if (res?.success) {
// // //           const staticNames = sidebarOptions.map(opt => opt.key.toLowerCase());
// // //           const filteredCats = res.data.filter(cat =>
// // //              !staticNames.includes(cat.name.toLowerCase())
// // //           );
// // //           setAllCategories(filteredCats);
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to fetch categories", error);
// // //       }
// // //     };
// // //     fetchAllCategories();
// // //   }, []);

// // //   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
// // //         setIsStateDropdownOpen(false);
// // //       }
// // //       if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) {
// // //         setIsOtherDropdownOpen(false);
// // //       }
// // //       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
// // //         setIsProfileDropdownOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const handleLogout = () => {
// // //     localStorage.removeItem("user");
// // //     localStorage.removeItem("token");
// // //     setLoggedInUser(null);
// // //     setIsProfileDropdownOpen(false);
// // //     navigate("/");
// // //     window.location.reload();
// // //   };

// // //   // ===============================================
// // //   // ✅ स्क्रॉल के आधार पर डायनामिक ट्रांसफॉर्म और टॉप पोजिशनिंग कैलकुलेट करें

// // //   // विज्ञापन बैनर ब्लॉक का Y ट्रांसफॉर्म (इसमें ऊपर का 5px गैप शामिल है)
// // //   const adBlockTranslateY = Math.max(-(GAP_TOP_OF_AD + AD_BANNER_HEIGHT + GAP_BELOW_AD), -scrollY);
  
// // //   // ब्लू हेडर ब्लॉक का Y ट्रांसफॉर्म
// // //   const blueHeaderTranslateY = Math.max(-BLUE_HEADER_HEIGHT, (GAP_TOP_OF_AD + AD_BANNER_HEIGHT + GAP_BELOW_AD) - scrollY);
// // //   // ===============================================


// // //   return (
// // //     <>
// // //       {/* =============================================== */}
// // //       {/* ✅ Ad Banner (अब `transformY` के साथ गतिशील रूप से स्थित है) */}
// // //       <div
// // //         style={{
// // //           position: "fixed",
// // //           top: 0, // टॉप 0 पर फिक्स, ट्रांसफॉर्म Y से नियंत्रित
// // //           left: 0,
// // //           right: 0,
// // //           height: `${AD_BANNER_HEIGHT + GAP_TOP_OF_AD + GAP_BELOW_AD}px`, // विज्ञापन + दोनों गैप की कुल ऊंचाई
// // //           zIndex: 2001, // ब्लू हेडर से अधिक zIndex
// // //           transform: `translateY(${adBlockTranslateY}px)`, // डायनामिक Y ट्रांसफॉर्म
// // //           transition: "transform 0.3s ease-out", // स्मूथ ट्रांजीशन
// // //           backgroundColor: "transparent", // Ad banner background transparent to show page background, or a specific color if needed
// // //           display: 'flex',
// // //           flexDirection: 'column', // ताकि गैप और बैनर लंबवत रूप से संरेखित हों
// // //           alignItems: 'center',
// // //           justifyContent: 'flex-start', // ऊपर से संरेखित करें
// // //           overflow: 'hidden',
// // //         }}
// // //       >
// // //         <div style={{ height: `${GAP_TOP_OF_AD}px`, width: '100%',  marginTop: "30px", }} /> {/* विज्ञापन के ऊपर 5px का गैप */}
// // //         <div style={{ height: `${AD_BANNER_HEIGHT}px`, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
// // //           <TopAdBanner />
// // //         </div>
// // //         <div style={{ height: `${GAP_BELOW_AD}px`, width: '100%', }} /> {/* विज्ञापन के नीचे 5px का गैप */}
// // //       </div>
// // //       {/* =============================================== */}

// // //       <GoogleTranslateWidget />

// // //       {/* Blue Header */}
// // //       <div
// // //         style={{
// // //           backgroundColor: "#0d2d62",
// // //           color: "white",
// // //           height: `${BLUE_HEADER_HEIGHT}px`, // निश्चित ऊंचाई
// // //           position: "fixed",
// // //           top: 5, // टॉप 0 पर फिक्स, ट्रांसफॉर्म Y से नियंत्रित
// // //           left: 0,
// // //           right: 0,
// // //           zIndex: 2000,
// // //           transform: `translateY(${blueHeaderTranslateY}px)`, // डायनामिक Y ट्रांसफॉर्म
// // //           transition: "transform 0.3s ease-out", // स्मूथ ट्रांजीशन
// // //         }}
// // //       >
// // //         <Container fluid className="d-flex justify-content-between align-items-center py-1 px-3">
// // //           <div className="d-flex align-items-center" style={{ marginLeft: "70px" }}>
// // //             <Button
// // //               variant="link"
// // //               className="text-white fw-bold p-0 me-3"
// // //               onClick={() => changeAppLanguage("hi")}
// // //               style={{ textDecoration: currentLanguage === "hi" ? "underline" : "none" }}
// // //             >
// // //               हिंदी
// // //             </Button>
// // //             <Button
// // //               variant="link"
// // //               className="text-white fw-bold p-0"
// // //               onClick={() => changeAppLanguage("en")}
// // //               style={{ textDecoration: currentLanguage === "en" ? "underline" : "none" }}
// // //             >
// // //               English
// // //             </Button>
// // //           </div>

// // //           <div className="d-flex align-items-center">
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaFacebookF size={16} /></a>
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaXTwitter size={16} /></a>
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaYoutube size={16} /></a>
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaInstagram size={16} /></a>

// // //             <div ref={profileDropdownRef} className="position-relative ms-3">
// // //               {loggedInUser ? (
// // //                 <Button
// // //                   variant="link"
// // //                   onClick={(e) => {
// // //                     e.stopPropagation();
// // //                     setIsProfileDropdownOpen((prev) => !prev);
// // //                   }}
// // //                   className="p-0 border-0 d-flex align-items-center text-decoration-none"
// // //                 >
// // //                   {loggedInUser.profileImage ? (
// // //                     <img
// // //                       src={loggedInUser.profileImage}
// // //                       alt={loggedInUser.name}
// // //                       className="rounded-circle"
// // //                       style={{ width: "28px", height: "28px", objectFit: "cover" }}
// // //                     />
// // //                   ) : (
// // //                     <FaUserCircle size={28} color="white" />
// // //                   )}
// // //                   <span className="ms-2 text-white fw-bold d-none d-lg-inline">
// // //                     {loggedInUser.name.split(" ")[0]}
// // //                   </span>
// // //                 </Button>
// // //               ) : (
// // //                 <Link
// // //                   to="/login"
// // //                   className="d-flex align-items-center text-decoration-none text-white fw-bold me-3 ms-3"
// // //                 >
// // //                   <FaUserCircle size={28} color="white" className="me-1" /> {/* Changed to FaUserCircle */}
// // //                   {/* ✅ Using translated text */}
// // //                   <span>{t.login}</span>
// // //                 </Link>
// // //               )}

// // //               {isProfileDropdownOpen && loggedInUser && (
// // //                 <div
// // //                   style={{
// // //                     position: "absolute",
// // //                     top: "100%",
// // //                     right: 0,
// // //                     backgroundColor: "#0d2d62",
// // //                     color: "white",
// // //                     padding: "8px 0",
// // //                     minWidth: "120px",
// // //                     borderRadius: "4px",
// // //                     zIndex: 2001,
// // //                   }}
// // //                 >
// // //                   <Link
// // //                     to="/profile"
// // //                     className="d-block text-white text-decoration-none px-3 py-1"
// // //                     onClick={() => setIsProfileDropdownOpen(false)}
// // //                   >
// // //                     {/* ✅ Using translated text */}
// // //                     {t.profile}
// // //                   </Link>
// // //                   <Button
// // //                     variant="link"
// // //                     className="d-block text-white text-decoration-none w-100 text-start px-3 py-1"
// // //                     onClick={handleLogout}
// // //                   >
// // //                      {/* ✅ Using translated text */}
// // //                     {t.logout}
// // //                   </Button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </Container>
// // //       </div>

// // //       {/* =============================================== */}
// // //       {/* ✅ Adjusted Margin for White Header (Main Nav) */}
// // //       <div style={{ marginTop: `${TOTAL_INITIAL_FIXED_HEIGHT}px` }} />
// // //       {/* =============================================== */}

// // //       {/* White Header */}
// // //       <div className="bg-white border-bottom" style={{ transition: "all 0.5s ease-in-out" }}>
// // //         <Container fluid className="d-flex justify-content-between align-items-center py-2 px-3">
// // //           <Link to="/" className="d-flex flex-column align-items-center text-decoration-none" style={{ zIndex: 2100 }}>
// // //             {/* ✅ लोगो एनीमेशन बहाल */}
// // //             <video
// // //               src="/logogif.mp4"
// // //               autoPlay
// // //               loop
// // //               muted
// // //               style={{
// // //                 width: "60px",
// // //                 marginRight: "3px",
// // //                 zIndex: 2100,
// // //                 transform: isScrolled ? "translateY(0)" : "translateY(-50px)",
// // //                 transition: "transform 0.5s ease-in-out",
// // //               }}
// // //             />
// // //             <img
// // //               src={logoT}
// // //               alt="EMS Tagline"
// // //               style={{
// // //                 height: "5px",
// // //                 transform: isScrolled ? "translateY(0)" : "translateY(-50px)",
// // //                 transition: "transform 0.5s ease-in-out",
// // //               }}
// // //             />
// // //           </Link>

// // //           {/* Center Menu */}
// // //           <Nav className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold" style={{ gap: "45px" }}>
// // //             {sidebarOptions.map((opt, index) =>
// // //               opt.isDropdown ? (
// // //                 <div key={index} ref={stateDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// // //                    {/* ✅ Using translated text for State dropdown */}
// // //                   <span onClick={() => setIsStateDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// // //                     {t[opt.key]} ▾
// // //                   </span>
// // //                   {isStateDropdownOpen && (
// // //                     <div style={{
// // //                         position: "absolute",
// // //                         top: "100%",
// // //                         left: 0,
// // //                         backgroundColor: "#c82333",
// // //                         color: "white",
// // //                         padding: "6px",
// // //                         minWidth: "540px",
// // //                         display: "grid",
// // //                         gridTemplateColumns: "repeat(3, 1fr)",
// // //                         gap: "4px",
// // //                         zIndex: 999
// // //                     }}>
// // //                       {allStates.map((state) => (
// // //                         <NavLink
// // //                           key={state._id}
// // //                           to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
// // //                           className="text-white text-decoration-none"
// // //                           style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// // //                           onClick={() => setIsStateDropdownOpen(false)}
// // //                         >
// // //                           {state.name}
// // //                         </NavLink>
// // //                       ))}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               ) : (
// // //                 <NavLink key={index} to={opt.path} className="text-decoration-none text-black" style={{ fontWeight: 600 }}>
// // //                   {/* ✅ Using translated text for other menu items */}
// // //                   {t[opt.key]}
// // //                 </NavLink>
// // //               )
// // //             )}

// // //             <div ref={otherDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// // //                {/* ✅ Using translated text for Other dropdown */}
// // //               <span onClick={() => setIsOtherDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// // //                 {t.other} ▾
// // //               </span>
// // //               {isOtherDropdownOpen && (
// // //                 <div style={{
// // //                     position: "absolute",
// // //                     top: "100%",
// // //                     right: 0,
// // //                     left: "auto",
// // //                     backgroundColor: "#c82333",
// // //                     color: "white",
// // //                     padding: "6px",
// // //                     minWidth: "540px",
// // //                     display: "grid",
// // //                     gridTemplateColumns: "repeat(3, 1fr)",
// // //                     gap: "4px",
// // //                     zIndex: 999,
// // //                     boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
// // //                 }}>
// // //                   {allCategories.length > 0 ? (
// // //                     allCategories.map((cat) => (
// // //                       <NavLink
// // //                         key={cat._id}
// // //                         to={`/category/${cat.name}`}
// // //                         className="text-white text-decoration-none"
// // //                         style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// // //                         onClick={() => setIsOtherDropdownOpen(false)}
// // //                       >
// // //                         {cat.name}
// // //                       </NavLink>
// // //                     ))
// // //                   ) : (
// // //                     <span className="text-white p-2" style={{fontSize: '14px'}}>Loading...</span>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </Nav>

// // //           {/* Right Icons */}
// // //           <Nav className="d-flex flex-row align-items-center gap-3 gap-md-4">
// // //              {/* ✅ Using translated text for HeaderActionIcons */}
// // //             <HeaderActionIcon icon={epaperIcon} text={t.epaper} link="http://www.jabalpurexpress.com/" />
// // //             <HeaderActionIcon icon={searchIcon} text={t.search} link="/search" />
// // //             <HeaderActionIcon icon={emstvIcon} text={t.emstv} link="/emstv" />
// // //             <HeaderActionIcon icon={directoryIcon} text={t.directory} link="/directory" />
// // //             <HeaderActionIcon icon={<MdOutlineSubscriptions color="#c41229ff" />} text={t.subscriber} link="https://services.emsindia.com/public/authentication/admin_login" isReactIcon size={28} />
// // //           </Nav>
// // //         </Container>
// // //       </div>

// // //       {/* Live News */}
// // //       <div className="bg-white border-top border-bottom">
// // //         <Container fluid className="d-flex align-items-center p-0">
// // //           <div className="d-flex align-items-center px-2 py-1" style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}>
// // //             <Button variant="link" className="text-white me-2 p-0" onClick={toggleSidebar} style={{ fontSize: "20px" }}>
// // //               <FaBars />
// // //             </Button>
// // //             {/* ✅ Using translated text for Live News */}
// // //             <span className="text-white fw-bold px-2 py-0" style={{ minWidth: "120px", fontSize: "14px" }}>
// // //               {t.liveNews}
// // //             </span>
// // //           </div>

// // //           <marquee
// // //             behavior="scroll"
// // //             direction="left"
// // //             className="fw-bold py-1"
// // //             style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}
// // //           >
// // //             {headlineData.map((headline) => (
// // //               <Link
// // //                 key={headline.id}
// // //                 to={headline.slug ? `/news/${headline.slug}` : "#"}
// // //                 className="text-decoration-none text-dark me-4"
// // //                 style={{
// // //                   whiteSpace: "nowrap",
// // //                   fontWeight: "bold",
// // //                   pointerEvents: headline.slug ? "auto" : "none",
// // //                   color: headline.slug ? "#000" : "gray"
// // //                 }}
// // //               >
// // //                 {headline.text}
// // //               </Link>
// // //             ))}
// // //           </marquee>
// // //         </Container>
// // //       </div>

// // //       <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} states={allStates} />
// // //     </>
// // //   );
// // // };

// // // export default Header;


// // import React, { useEffect, useState, useRef } from "react";
// // import { Container, Button, Nav } from "react-bootstrap";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
 
// // // Assets
// // import logoT from "../../../assets/logoT.png";
// // import epaperIcon from "../../../assets/icons/epaper-icon.svg";
// // import searchIcon from "../../../assets/icons/search-icon.svg";
// // import emstvIcon from "../../../assets/icons/emstvIcon.png";
// // import directoryIcon from "../../../assets/icons/directory-icon.svg";
// // import loginIcon from "../../../assets/icons/login-icon.svg";
 
// // // Google Translate
// // import GoogleTranslateWidget, { useGoogleTranslate } from "../../GoogleTranslateWidget";
 
// // // Icons
// // import { FaFacebookF, FaYoutube, FaInstagram, FaUserCircle } from "react-icons/fa";
// // import { FaXTwitter, FaBars } from "react-icons/fa6";
// // import { MdOutlineSubscriptions } from "react-icons/md";
 
// // // Sidebar
// // import LeftSidebar from "../LeftSidebar";
 
// // // API
// // // ✅ Added fetchActiveAds to imports
// // import { headline, getStatesByCountry, getCategories, fetchActiveAds } from "../../../Services/authApi";

// // // ✅ 1. Translation object for menu items
// // const translations = {
// //   en: {
// //     home: "Home",
// //     india: "India",
// //     state: "State",
// //     entertainment: "Entertainment",
// //     astrology: "Astrology",
// //     sports: "Sports",
// //     thoughts: "Thoughts",
// //     business: "Business",
// //     youth: "Youth",
// //     other: "Other",
// //     epaper: "E-Paper",
// //     search: "Search",
// //     emstv: "EMS TV",
// //     directory: "Directory",
// //     subscriber: "Subscriber",
// //     liveNews: "News Headline",
// //     login: "Login",
// //     profile: "Profile",
// //     logout: "Logout"
// //   },
// //   hi: {
// //     home: "होम",
// //     india: "देश",
// //     state: "राज्य",
// //     entertainment: "मनोरंजन",
// //     astrology: "राशिफल",
// //     sports: "खेल",
// //     thoughts: "विचार",
// //     business: "बिजनेस",
// //     youth: "लाइफस्टाइल",
// //     other: "अन्य",
// //     epaper: "ई-पेपर",
// //     search: "खोजें",
// //     emstv: "ईएमएस टीवी",
// //     directory: "डायरेक्टरी",
// //     subscriber: "सब्सक्राइबर",
// //     liveNews: "न्यूज़ हेडलाइंस",
// //     login: "लॉगिन",
// //     profile: "प्रोफ़ाइल",
// //     logout: "लॉगआउट"
// //   },
// // };
 
// // // ✅ 2. Updated static menu items
// // const sidebarOptions = [
// //   { key: "home", path: "/" },
// //   { key: "india", path: "/india" },
// //   { key: "state", path: "/state", isDropdown: true },
// //   { key: "entertainment", path: "/entertainment" },
// //   { key: "astrology", path: "/astrology" },
// //   { key: "sports", path: "/sports" },
// //   { key: "thoughts", path: "/thoughts" },
// //   { key: "business", path: "/business" },
// //   { key: "youth", path: "/youth" },
// // ];
 
// // const HeaderActionIcon = ({ icon, text, link, isReactIcon = false, size = 28 }) => {
// //   const renderedIcon = isReactIcon ? React.cloneElement(icon, { size }) : <img src={icon} alt={text} height={size} width={size} />;
// //   const isExternalLink = link.startsWith("http://") || link.startsWith("https://");
 
// //   const handleExternalLinkClick = (event) => {
// //     if (isExternalLink) {
// //       event.preventDefault();
// //       window.open(link, "_self");
// //     }
// //   };
 
// //   return isExternalLink ? (
// //     <a
// //       href={link}
// //       onClick={handleExternalLinkClick}
// //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// //       style={{ color: "#000" }}
// //     >
// //       {renderedIcon}
// //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// //         {text}
// //       </span>
// //     </a>
// //   ) : (
// //     <Link
// //       to={link}
// //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// //       style={{ color: "#000" }}
// //     >
// //       {renderedIcon}
// //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// //         {text}
// //       </span>
// //     </Link>
// //   );
// // };
 
// // const Header = () => {
// //   const navigate = useNavigate();
// //   const { changeLanguage: googleTranslateChangeLanguage } = useGoogleTranslate();
 
// //   const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("userLanguage") || "en");
// //   const [headlineData, setHeadlineData] = useState([]);
// //   const [allStates, setAllStates] = useState([]);
// //   const [allCategories, setAllCategories] = useState([]);
  
// //   // ✅ State for Top Ad
// //   const [topAd, setTopAd] = useState(null);
 
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
// //   const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
// //   const [isScrolled, setIsScrolled] = useState(false);
 
// //   const [loggedInUser, setLoggedInUser] = useState(null);
// //   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
 
// //   const fontClass = currentLanguage === "hi" ? "font-hi" : "font-en";
// //   const profileDropdownRef = useRef(null);
// //   const stateDropdownRef = useRef(null);
// //   const otherDropdownRef = useRef(null);
   
// //   const t = translations[currentLanguage] || translations.en;
 
// //   const changeAppLanguage = (lang) => {
// //     setCurrentLanguage(lang);
// //     localStorage.setItem("userLanguage", lang);
// //     navigate("/");
// //     window.location.reload();
// //   };
 
// //   useEffect(() => {
// //     const handleScroll = () => setIsScrolled(window.scrollY > 80);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);
 
// //   useEffect(() => {
// //     const userData = localStorage.getItem("user");
// //     if (userData) {
// //       try {
// //         setLoggedInUser(JSON.parse(userData));
// //       } catch {
// //         setLoggedInUser(null);
// //       }
// //     } else setLoggedInUser(null);
// //   }, []);
 
// //   // ✅ Effect to Fetch Ads
// //   useEffect(() => {
// //     const loadAds = async () => {
// //       try {
// //         const res = await fetchActiveAds();
// //         if (res?.success && Array.isArray(res.ads)) {
// //           const ad = res.ads.find(item => item.position === "top");
// //           setTopAd(ad || null);
// //         }
// //       } catch (error) {
// //         console.log("Top ad not available");
// //         setTopAd(null);
// //       }
// //     };
// //     loadAds();
// //   }, []);
 
// //   useEffect(() => {
// //     const fetchHeadline = async () => {
// //       try {
// //         const response = await headline();
// //         const dataArray = response?.data || [];
// //         const allHeadlines = dataArray
// //           .filter((item) => item.headlineText)
// //           .map((item) => ({
// //             id: item.newsId?._id || item._id,
// //             slug: item.newsId?.slug_en || "",
// //             text: item.headlineText.trim(),
// //           }));
 
// //         setHeadlineData(
// //           allHeadlines.length
// //             ? allHeadlines
// //             : [{ id: "0", slug: "", text: "No headline available" }]
// //         );
// //       } catch {
// //         setHeadlineData([{ id: "0", slug: "", text: "Error loading headlines" }]);
// //       }
// //     };
 
// //     fetchHeadline();
// //   }, [currentLanguage]);
 
// //   useEffect(() => {
// //     const fetchStates = async () => {
// //       try {
// //         const res = await getStatesByCountry("687a1e2185f0230715032380");
// //         if (res?.success) setAllStates(res.data);
// //       } catch {}
// //     };
// //     fetchStates();
// //   }, []);
 
// //   useEffect(() => {
// //     const fetchAllCategories = async () => {
// //       try {
// //         const res = await getCategories();
// //         if (res?.success) {
// //           const staticNames = sidebarOptions.map(opt => opt.key.toLowerCase());
// //           const filteredCats = res.data.filter(cat =>
// //              !staticNames.includes(cat.name.toLowerCase())
// //           );
// //           setAllCategories(filteredCats);
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch categories", error);
// //       }
// //     };
// //     fetchAllCategories();
// //   }, []);
 
// //   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
 
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
// //         setIsStateDropdownOpen(false);
// //       }
// //       if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) {
// //         setIsOtherDropdownOpen(false);
// //       }
// //       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
// //         setIsProfileDropdownOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);
 
// //   const handleLogout = () => {
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("token");
// //     setLoggedInUser(null);
// //     setIsProfileDropdownOpen(false);
// //     navigate("/");
// //     window.location.reload();
// //   };

// //   // ✅ Calculate top gap dynamically
// //   // If ad exists, we don't need 'top: 5' on container because ad takes space. 
// //   // If no ad, we keep 'top: 5' as per original design.
// //   const containerTop = topAd ? 0 : 5;

// //   return (
// //     <>
// //       <GoogleTranslateWidget />
 
// //       {/* ✅ NEW: Wrapper for Ad + Blue Header */}
// //       {/* This wrapper handles the fixed position and scrolling behavior for both */}
// //       <div
// //         style={{
// //           position: "fixed",
// //           top: containerTop,
// //           left: 0,
// //           right: 0,
// //           zIndex: 2000,
// //           transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
// //           transition: "transform 0.4s ease-in-out",
// //           backgroundColor: topAd ? "#fff" : "transparent" // Prevents transparency issues behind ad
// //         }}
// //       >
        
// //         {/* ✅ ADVERTISEMENT SECTION */}
// //         {topAd && (
// //           <div className="d-flex flex-column align-items-center w-100 bg-white">
// //             <div
// //               style={{
// //                 maxWidth: "728px",
// //                 width: "100%",
// //                 aspectRatio: "728 / 90",
// //                 display: "flex",
// //                 justifyContent: "center",
// //                 alignItems: "center",
// //                 overflow: "hidden"
// //               }}
// //             >
// //               {topAd.mediaType === "image" && (
// //                 <a
// //                   href={topAd.link || "#"}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   style={{ width: "100%", height: "100%", display: "block" }}
// //                 >
// //                   <img
// //                     src={topAd.mediaUrl}
// //                     alt={topAd.title || "Advertisement"}
// //                     style={{
// //                       width: "100%",
// //                       height: "100%",
// //                       objectFit: "contain"
// //                     }}
// //                   />
// //                 </a>
// //               )}
// //             </div>
// //             {/* ✅ 5px GAP between Ad and Blue Header */}
// //             <div style={{ height: "5px", width: "100%", backgroundColor: "white" }}></div>
// //           </div>
// //         )}

// //         {/* ✅ BLUE HEADER (Now inside the wrapper) */}
// //         <div
// //           style={{
// //             backgroundColor: "#0d2d62",
// //             color: "white",
// //             height: "40px",
// //             // position: fixed removed from here because parent is fixed
// //             width: "100%"
// //           }}
// //         >
// //           <Container fluid className="d-flex justify-content-between align-items-center py-1 px-3">
// //             <div className="d-flex align-items-center" style={{ marginLeft: "70px" }}>
// //               <Button
// //                 variant="link"
// //                 className="text-white fw-bold p-0 me-3"
// //                 onClick={() => changeAppLanguage("hi")}
// //                 style={{ textDecoration: currentLanguage === "hi" ? "underline" : "none" }}
// //               >
// //                 हिंदी
// //               </Button>
// //               <Button
// //                 variant="link"
// //                 className="text-white fw-bold p-0"
// //                 onClick={() => changeAppLanguage("en")}
// //                 style={{ textDecoration: currentLanguage === "en" ? "underline" : "none" }}
// //               >
// //                 English
// //               </Button>
// //             </div>
 
// //             <div className="d-flex align-items-center">
// //               <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaFacebookF size={16} /></a>
// //               <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaXTwitter size={16} /></a>
// //               <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaYoutube size={16} /></a>
// //               <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaInstagram size={16} /></a>
 
// //               <div ref={profileDropdownRef} className="position-relative ms-3">
// //                 {loggedInUser ? (
// //                   <Button
// //                     variant="link"
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       setIsProfileDropdownOpen((prev) => !prev);
// //                     }}
// //                     className="p-0 border-0 d-flex align-items-center text-decoration-none"
// //                   >
// //                     {loggedInUser.profileImage ? (
// //                       <img
// //                         src={loggedInUser.profileImage}
// //                         alt={loggedInUser.name}
// //                         className="rounded-circle"
// //                         style={{ width: "28px", height: "28px", objectFit: "cover" }}
// //                       />
// //                     ) : (
// //                       <FaUserCircle size={28} color="white" />
// //                     )}
// //                     <span className="ms-2 text-white fw-bold d-none d-lg-inline">
// //                       {loggedInUser.name.split(" ")[0]}
// //                     </span>
// //                   </Button>
// //                 ) : (
// //                   <Link
// //                     to="/login"
// //                     className="d-flex align-items-center text-decoration-none text-white fw-bold me-3 ms-3"
// //                   >
// //                     <img src={loginIcon} alt="Login" height="28" className="me-1" />
// //                     <span>{t.login}</span>
// //                   </Link>
// //                 )}
 
// //                 {isProfileDropdownOpen && loggedInUser && (
// //                   <div
// //                     style={{
// //                       position: "absolute",
// //                       top: "100%",
// //                       right: 0,
// //                       backgroundColor: "#0d2d62",
// //                       color: "white",
// //                       padding: "8px 0",
// //                       minWidth: "120px",
// //                       borderRadius: "4px",
// //                       zIndex: 2001,
// //                     }}
// //                   >
// //                     <Link
// //                       to="/profile"
// //                       className="d-block text-white text-decoration-none px-3 py-1"
// //                       onClick={() => setIsProfileDropdownOpen(false)}
// //                     >
// //                       {t.profile}
// //                     </Link>
// //                     <Button
// //                       variant="link"
// //                       className="d-block text-white text-decoration-none w-100 text-start px-3 py-1"
// //                       onClick={handleLogout}
// //                     >
// //                       {t.logout}
// //                     </Button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </Container>
// //         </div>
// //       </div>
 
// //       {/* ✅ DYNAMIC SPACER: Pushes content down based on Ad presence */}
// //       {/* 
// //           If Ad exists: ~90px (Ad) + 5px (Gap) + 40px (Blue Header) = ~135-140px margin 
// //           If No Ad: 40px margin (Default)
// //       */}
// //       <div style={{ marginTop: topAd ? "140px" : "40px" }} />
 
// //       {/* White Header */}
// //       <div className="bg-white border-bottom" style={{ transition: "all 0.5s ease-in-out" }}>
// //         <Container fluid className="d-flex justify-content-between align-items-center py-2 px-3">
// //           <Link to="/" className="d-flex flex-column align-items-center text-decoration-none" style={{ zIndex: 2100 }}>
// //             <video src="/logogif.mp4" autoPlay loop muted style={{ width: "60px", marginRight: "3px", zIndex: 2100, transform: isScrolled ? "translateY(0)" : "translateY(-60px)", transition: "transform 0.5s ease-in-out" }} />
// //             <img src={logoT} alt="EMS Tagline" style={{ height: "5px", transform: isScrolled ? "translateY(0)" : "translateY(-60px)", transition: "transform 0.5s ease-in-out" }} />
// //           </Link>
 
// //           {/* Center Menu */}
// //           <Nav className={`header-container header-font ${fontClass} flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold`} style={{ gap: "40px" }}>
// //             {sidebarOptions.map((opt, index) =>
// //               opt.isDropdown ? (
// //                 <div key={index} ref={stateDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// //                   <span onClick={() => setIsStateDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// //                     {t[opt.key]} ▾
// //                   </span>
// //                   {isStateDropdownOpen && (
// //                     <div style={{
// //                         position: "absolute",
// //                         top: "100%",
// //                         left: 0,
// //                         backgroundColor: "#c82333",
// //                         color: "white",
// //                         padding: "6px",
// //                         minWidth: "540px",
// //                         display: "grid",
// //                         gridTemplateColumns: "repeat(3, 1fr)",
// //                         gap: "4px",
// //                         zIndex: 999
// //                     }}>
// //                       {allStates.map((state) => (
// //                         <NavLink
// //                           key={state._id}
// //                           to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
// //                           className="text-white text-decoration-none"
// //                           style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// //                           onClick={() => setIsStateDropdownOpen(false)}
// //                         >
// //                           {state.name}
// //                         </NavLink>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               ) : (
// //                 <NavLink key={index} to={opt.path} className="text-decoration-none text-black" style={{ fontWeight: 600 }}>
// //                   {t[opt.key]}
// //                 </NavLink>
// //               )
// //             )}
 
// //             <div ref={otherDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// //               <span onClick={() => setIsOtherDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// //                 {t.other} ▾
// //               </span>
// //               {isOtherDropdownOpen && (
// //                 <div style={{
// //                     position: "absolute",
// //                     top: "100%",
// //                     right: 0,
// //                     left: "auto",
// //                     backgroundColor: "#c82333",
// //                     color: "white",
// //                     padding: "6px",
// //                     minWidth: "540px",
// //                     display: "grid",
// //                     gridTemplateColumns: "repeat(3, 1fr)",
// //                     gap: "4px",
// //                     zIndex: 999,
// //                     boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
// //                 }}>
// //                   {allCategories.length > 0 ? (
// //                     allCategories.map((cat) => (
// //                       <NavLink
// //                         key={cat._id}
// //                         to={`/category/${cat.name}`}
// //                         className="text-white text-decoration-none"
// //                         style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// //                         onClick={() => setIsOtherDropdownOpen(false)}
// //                       >
// //                         {cat.name}
// //                       </NavLink>
// //                     ))
// //                   ) : (
// //                     <span className="text-white p-2" style={{fontSize: '14px'}}>Loading...</span>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </Nav>
 
// //           {/* Right Icons */}
// //           <Nav className="d-flex flex-row align-items-center gap-3 gap-md-4">
// //             <HeaderActionIcon icon={epaperIcon} text={t.epaper} link="http://www.jabalpurexpress.com/" />
// //             <HeaderActionIcon icon={searchIcon} text={t.search} link="/search" />
// //             <HeaderActionIcon icon={emstvIcon} text={t.emstv} link="/emstv" />
// //             <HeaderActionIcon icon={directoryIcon} text={t.directory} link="/directory" />
// //             <HeaderActionIcon icon={<MdOutlineSubscriptions color="#c41229ff" />} text={t.subscriber} link="https://services.emsindia.com/public/authentication/admin_login" isReactIcon size={28} />
// //           </Nav>
// //         </Container>
// //       </div>
 
// //       {/* Live News */}
// //       <div className="bg-white border-top border-bottom">
// //         <Container fluid className="d-flex align-items-center p-0">
// //           <div className="d-flex align-items-center px-2 py-1" style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}>
// //             <Button variant="link" className="text-white me-2 p-0" onClick={toggleSidebar} style={{ fontSize: "20px" }}>
// //               <FaBars />
// //             </Button>
// //             <span className="text-white fw-bold px-2 py-0" style={{ minWidth: "120px", fontSize: "14px" }}>
// //               {t.liveNews}
// //             </span>
// //           </div>
 
// //           <marquee
// //             behavior="scroll"
// //             direction="left"
// //             className="fw-bold py-1"
// //             style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}
// //           >
// //             {headlineData.map((headline) => (
// //               <Link
// //                 key={headline.id}
// //                 to={headline.slug ? `/news/${headline.slug}` : "#"}
// //                 className="text-decoration-none text-dark me-4"
// //                 style={{
// //                   whiteSpace: "nowrap",
// //                   fontWeight: "bold",
// //                   pointerEvents: headline.slug ? "auto" : "none",
// //                   color: headline.slug ? "#000" : "gray"
// //                 }}
// //               >
// //                 {headline.text}
// //               </Link>
// //             ))}
// //           </marquee>
// //         </Container>
// //       </div>
 
// //       <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} states={allStates} />
// //     </>
// //   );
// // };
 
// // export default Header;





// // // import React, { useEffect, useState, useRef } from "react";
// // // import { Container, Button, Nav } from "react-bootstrap";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";

// // // // Assets
// // // import logoT from "../../../assets/logoT.png";
// // // import epaperIcon from "../../../assets/icons/epaper-icon.svg";
// // // import searchIcon from "../../../assets/icons/search-icon.svg";
// // // import emstvIcon from "../../../assets/icons/emstvIcon.png";
// // // import directoryIcon from "../../../assets/icons/directory-icon.svg";
// // // import loginIcon from "../../../assets/icons/login-icon.svg";

// // // // Google Translate
// // // import GoogleTranslateWidget, { useGoogleTranslate } from "../../GoogleTranslateWidget";

// // // // Icons
// // // import { FaFacebookF, FaYoutube, FaInstagram, FaUserCircle } from "react-icons/fa";
// // // import { FaXTwitter, FaBars } from "react-icons/fa6";
// // // import { MdOutlineSubscriptions } from "react-icons/md";

// // // // Sidebar
// // // import LeftSidebar from "../LeftSidebar";

// // // // API
// // // import { headline, getStatesByCountry, getCategories } from "../../../Services/authApi";

// // // // ✅ Static Menu Items (Inko Dropdown se hatana hai)
// // // const sidebarOptions = [
// // //   { name: "Home", path: "/" },
// // //   { name: "India", path: "/india" },
// // //   { name: "State", path: "/state", isDropdown: true },
// // //   { name: "Entertainment", path: "/entertainment" },
// // //   { name: "Astrology", path: "/astrology" },
// // //   { name: "Sports", path: "/sports" },
// // //   { name: "Thoughts", path: "/thoughts" },
// // //   { name: "Business", path: "/business" },
// // //   { name: "Youth", path: "/youth" },
// // // ];

// // // const HeaderActionIcon = ({ icon, text, link, isReactIcon = false, size = 28 }) => {
// // //   const renderedIcon = isReactIcon ? React.cloneElement(icon, { size }) : <img src={icon} alt={text} height={size} width={size} />;
// // //   const isExternalLink = link.startsWith("http://") || link.startsWith("https://");

// // //   const handleExternalLinkClick = (event) => {
// // //     if (isExternalLink) {
// // //       event.preventDefault();
// // //       window.open(link, "_self");
// // //     }
// // //   };

// // //   return isExternalLink ? (
// // //     <a
// // //       href={link}
// // //       onClick={handleExternalLinkClick}
// // //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// // //       style={{ color: "#000" }}
// // //     >
// // //       {renderedIcon}
// // //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// // //         {text}
// // //       </span>
// // //     </a>
// // //   ) : (
// // //     <Link
// // //       to={link}
// // //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// // //       style={{ color: "#000" }}
// // //     >
// // //       {renderedIcon}
// // //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// // //         {text}
// // //       </span>
// // //     </Link>
// // //   );
// // // };

// // // const Header = () => {
// // //   const navigate = useNavigate();
// // //   const { changeLanguage: googleTranslateChangeLanguage } = useGoogleTranslate();

// // //   const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("userLanguage") || "en");
// // //   const [headlineData, setHeadlineData] = useState([]);
// // //   const [allStates, setAllStates] = useState([]);
  
// // //   // ✅ New State for Categories
// // //   const [allCategories, setAllCategories] = useState([]);
  
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // //   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  
// // //   // ✅ New State for "Other" Dropdown
// // //   const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
  
// // //   const [isScrolled, setIsScrolled] = useState(false);

// // //   // Profile/Login
// // //   const [loggedInUser, setLoggedInUser] = useState(null);
// // //   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
// // //   const profileDropdownRef = useRef(null);
// // //   const stateDropdownRef = useRef(null);
// // //   const otherDropdownRef = useRef(null);

// // //   const changeAppLanguage = (lang) => {
// // //     setCurrentLanguage(lang);
// // //     localStorage.setItem("userLanguage", lang);
// // //     navigate("/");
// // //     window.location.reload();
// // //   };

// // //   useEffect(() => {
// // //     const handleScroll = () => setIsScrolled(window.scrollY > 80);
// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   // Load user
// // //   useEffect(() => {
// // //     const userData = localStorage.getItem("user");
// // //     if (userData) {
// // //       try {
// // //         setLoggedInUser(JSON.parse(userData));
// // //       } catch {
// // //         setLoggedInUser(null);
// // //       }
// // //     } else setLoggedInUser(null);
// // //   }, []);

// // //   // Fetch headlines
// // //   useEffect(() => {
// // //     const fetchHeadline = async () => {
// // //       try {
// // //         const response = await headline();
// // //         const dataArray = response?.data || [];
// // //         const allHeadlines = dataArray
// // //           .filter((item) => item.headlineText && item.newsId?.slug_en)
// // //           .map((item) => ({
// // //             id: item.newsId?._id,
// // //             slug: item.newsId?.slug_en,
// // //             text: item.headlineText.trim(),
// // //           }));
// // //         setHeadlineData(allHeadlines.length ? allHeadlines : [{ id: "0", slug: "", text: "No headline available" }]);
// // //       } catch {
// // //         setHeadlineData([{ id: "0", slug: "", text: "Error loading headlines" }]);
// // //       }
// // //     };
// // //     fetchHeadline();
// // //   }, [currentLanguage]);

// // //   // Fetch states
// // //   useEffect(() => {
// // //     const fetchStates = async () => {
// // //       try {
// // //         const res = await getStatesByCountry("687a1e2185f0230715032380");
// // //         if (res?.success) setAllStates(res.data);
// // //       } catch {}
// // //     };
// // //     fetchStates();
// // //   }, []);

// // //   // ✅ Fetch Categories & FILTER Static Ones
// // //   useEffect(() => {
// // //     const fetchAllCategories = async () => {
// // //       try {
// // //         const res = await getCategories();
// // //         if (res?.success) {
// // //           // 1. Static names ki list nikalo (lowercase me comparison ke liye)
// // //           const staticNames = sidebarOptions.map(opt => opt.name.toLowerCase());

// // //           // 2. API Data ko filter karo
// // //           const filteredCats = res.data.filter(cat => {
// // //              // Agar category ka naam static list me nahi hai, tabhi show karo
// // //              return !staticNames.includes(cat.name.toLowerCase());
// // //           });

// // //           setAllCategories(filteredCats);
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to fetch categories", error);
// // //       }
// // //     };
// // //     fetchAllCategories();
// // //   }, []);

// // //   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

// // //   // Click outside handler
// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
// // //         setIsStateDropdownOpen(false);
// // //       }
// // //       if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) {
// // //         setIsOtherDropdownOpen(false);
// // //       }
// // //       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
// // //         setIsProfileDropdownOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const handleLogout = () => {
// // //     localStorage.removeItem("user");
// // //     localStorage.removeItem("token");
// // //     setLoggedInUser(null);
// // //     setIsProfileDropdownOpen(false);
// // //     navigate("/");
// // //     window.location.reload();
// // //   };

// // //   return (
// // //     <>
// // //       <GoogleTranslateWidget />

// // //       {/* Blue Header */}
// // //       <div
// // //         style={{
// // //           backgroundColor: "#0d2d62",
// // //           color: "white",
// // //           height: "40px",
// // //           position: "fixed",
// // //           top: 5,
// // //           left: 0,
// // //           right: 0,
// // //           zIndex: 2000,
// // //           transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
// // //           transition: "transform 0.4s ease-in-out",
// // //         }}
// // //       >
// // //         <Container fluid className="d-flex justify-content-between align-items-center py-1 px-3">
// // //           <div className="d-flex align-items-center" style={{ marginLeft: "70px" }}>
// // //             <Button
// // //               variant="link"
// // //               className="text-white fw-bold p-0 me-3"
// // //               onClick={() => changeAppLanguage("hi")}
// // //               style={{ textDecoration: currentLanguage === "hi" ? "underline" : "none" }}
// // //             >
// // //               हिंदी
// // //             </Button>
// // //             <Button
// // //               variant="link"
// // //               className="text-white fw-bold p-0"
// // //               onClick={() => changeAppLanguage("en")}
// // //               style={{ textDecoration: currentLanguage === "en" ? "underline" : "none" }}
// // //             >
// // //               English
// // //             </Button>
// // //           </div>

// // //           <div className="d-flex align-items-center">
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaFacebookF size={16} /></a>
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaXTwitter size={16} /></a>
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaYoutube size={16} /></a>
// // //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaInstagram size={16} /></a>

// // //             <div ref={profileDropdownRef} className="position-relative ms-3">
// // //               {loggedInUser ? (
// // //                 <Button
// // //                   variant="link"
// // //                   onClick={(e) => {
// // //                     e.stopPropagation();
// // //                     setIsProfileDropdownOpen((prev) => !prev);
// // //                   }}
// // //                   className="p-0 border-0 d-flex align-items-center text-decoration-none"
// // //                 >
// // //                   {loggedInUser.profileImage ? (
// // //                     <img
// // //                       src={loggedInUser.profileImage}
// // //                       alt={loggedInUser.name}
// // //                       className="rounded-circle"
// // //                       style={{ width: "28px", height: "28px", objectFit: "cover" }}
// // //                     />
// // //                   ) : (
// // //                     <FaUserCircle size={28} color="white" />
// // //                   )}
// // //                   <span className="ms-2 text-white fw-bold d-none d-lg-inline">
// // //                     {loggedInUser.name.split(" ")[0]}
// // //                   </span>
// // //                 </Button>
// // //               ) : (
// // //                 <Link
// // //                   to="/login"
// // //                   className="d-flex align-items-center text-decoration-none text-white fw-bold me-3 ms-3"
// // //                 >
// // //                   <img src={loginIcon} alt="Login" height="28" className="me-1" />
// // //                   <span>Login</span>
// // //                 </Link>
// // //               )}

// // //               {isProfileDropdownOpen && loggedInUser && (
// // //                 <div
// // //                   style={{
// // //                     position: "absolute",
// // //                     top: "100%",
// // //                     right: 0,
// // //                     backgroundColor: "#0d2d62",
// // //                     color: "white",
// // //                     padding: "8px 0",
// // //                     minWidth: "120px",
// // //                     borderRadius: "4px",
// // //                     zIndex: 2001,
// // //                   }}
// // //                 >
// // //                   <Link
// // //                     to="/profile"
// // //                     className="d-block text-white text-decoration-none px-3 py-1"
// // //                     onClick={() => setIsProfileDropdownOpen(false)}
// // //                   >
// // //                     Profile
// // //                   </Link>
// // //                   <Button
// // //                     variant="link"
// // //                     className="d-block text-white text-decoration-none w-100 text-start px-3 py-1"
// // //                     onClick={handleLogout}
// // //                   >
// // //                     Logout
// // //                   </Button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </Container>
// // //       </div>

// // //       <div style={{ marginTop: "40px" }} />

// // //       {/* White Header, Menu, Icons */}
// // //       <div className="bg-white border-bottom" style={{ transition: "all 0.5s ease-in-out" }}>
// // //         <Container fluid className="d-flex justify-content-between align-items-center py-2 px-3">
// // //           <Link to="/" className="d-flex flex-column align-items-center text-decoration-none" style={{ zIndex: 2100 }}>
// // //             <video src="/logogif.mp4" autoPlay loop muted style={{ width: "60px", marginRight: "3px", zIndex: 2100, transform: isScrolled ? "translateY(0)" : "translateY(-50px)", transition: "transform 0.5s ease-in-out" }} />
// // //             <img src={logoT} alt="EMS Tagline" style={{ height: "5px", transform: isScrolled ? "translateY(0)" : "translateY(-50px)", transition: "transform 0.5s ease-in-out" }} />
// // //           </Link>

// // //           {/* Center Menu */}
// // //           <Nav className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold" style={{ gap: "45px" }}>
// // //             {sidebarOptions.map((opt, index) =>
// // //               opt.isDropdown ? (
// // //                 <div key={index} ref={stateDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// // //                   <span onClick={() => setIsStateDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// // //                     State ▾
// // //                   </span>
// // //                   {isStateDropdownOpen && (
// // //                     <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#c82333", color: "white", padding: "6px", minWidth: "540px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px", zIndex: 999 }}>
// // //                       {allStates.map((state) => (
// // //                         <NavLink
// // //                           key={state._id}
// // //                           to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
// // //                           className="text-white text-decoration-none"
// // //                           style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// // //                           onClick={() => setIsStateDropdownOpen(false)}
// // //                         >
// // //                           {state.name}
// // //                         </NavLink>
// // //                       ))}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               ) : (
// // //                 <NavLink key={index} to={opt.path} className="text-decoration-none text-black" style={{ fontWeight: 600 }}>
// // //                   {opt.name}
// // //                 </NavLink>
// // //               )
// // //             )}

// // //             {/* ✅ "Other" Dropdown (Filtered Categories Only) */}
// // //             <div ref={otherDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// // //               <span onClick={() => setIsOtherDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// // //                 Other ▾
// // //               </span>
// // //               {isOtherDropdownOpen && (
// // //                 <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#c82333", color: "white", padding: "6px", minWidth: "540px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px", zIndex: 999 }}>
// // //                   {allCategories.length > 0 ? (
// // //                     allCategories.map((cat) => (
// // //                       <NavLink
// // //                         key={cat._id}
// // //                         to={`/category/${cat.name}`}
// // //                         className="text-white text-decoration-none"
// // //                         style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// // //                         onClick={() => setIsOtherDropdownOpen(false)}
// // //                       >
// // //                         {cat.name}
// // //                       </NavLink>
// // //                     ))
// // //                   ) : (
// // //                     <span className="text-white p-2" style={{fontSize: '14px'}}>Loading...</span>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>

// // //           </Nav>

// // //           {/* Right Icons */}
// // //           <Nav className="d-flex flex-row align-items-center gap-3 gap-md-4">
// // //             <HeaderActionIcon
// // //               icon={epaperIcon}
// // //               text="E-Paper"
// // //               link="http://www.jabalpurexpress.com/"
// // //             />
// // //             <HeaderActionIcon icon={searchIcon} text="Search" link="/search" />
// // //             <HeaderActionIcon icon={emstvIcon} text="EMS TV" link="/emstv" />
// // //             <HeaderActionIcon icon={directoryIcon} text="Directory" link="/directory" />
// // //             <HeaderActionIcon
// // //               icon={<MdOutlineSubscriptions color="#c41229ff" />}
// // //               text="Subscriber"
// // //               link="https://services.emsindia.com/public/authentication/admin_login"
// // //               isReactIcon
// // //               size={28}
// // //             />
// // //           </Nav>
// // //         </Container>
// // //       </div>

// // //       {/* Live News */}
// // //       <div className="bg-white border-top border-bottom">
// // //         <Container fluid className="d-flex align-items-center p-0">
// // //           <div className="d-flex align-items-center px-2 py-1" style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}>
// // //             <Button variant="link" className="text-white me-2 p-0" onClick={toggleSidebar} style={{ fontSize: "20px" }}>
// // //               <FaBars />
// // //             </Button>
// // //             <span className="text-white fw-bold px-2 py-0" style={{ minWidth: "120px", fontSize: "14px" }}>
// // //               Live News
// // //             </span>
// // //           </div>

// // //           <marquee behavior="scroll" direction="left" className="fw-bold py-1" style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}>
// // //             {headlineData.map((headline) => (
// // //               <Link key={headline.id} to={headline.slug ? `/news/${headline.slug}` : "#"} className="text-decoration-none text-dark me-4" style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
// // //                 {headline.text}
// // //               </Link>
// // //             ))}
// // //           </marquee>
// // //         </Container>
// // //       </div>

// // //       <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} states={allStates} />
// // //     </>
// // //   );
// // // };

// // // export default Header;

// // import React, { useEffect, useState, useRef } from "react";
// // import { Container, Button, Nav } from "react-bootstrap";
// // import { Link, NavLink, useNavigate } from "react-router-dom";

// // // Assets
// // import logoT from "../../../assets/logoT.png";
// // import epaperIcon from "../../../assets/icons/epaper-icon.svg";
// // import searchIcon from "../../../assets/icons/search-icon.svg";
// // import emstvIcon from "../../../assets/icons/emstvIcon.png";
// // import directoryIcon from "../../../assets/icons/directory-icon.svg";
// // import loginIcon from "../../../assets/icons/login-icon.svg";

// // // Google Translate
// // import GoogleTranslateWidget, { useGoogleTranslate } from "../../GoogleTranslateWidget";

// // // Icons
// // import { FaFacebookF, FaYoutube, FaInstagram, FaUserCircle } from "react-icons/fa";
// // import { FaXTwitter, FaBars } from "react-icons/fa6";
// // import { MdOutlineSubscriptions } from "react-icons/md";

// // // Sidebar
// // import LeftSidebar from "../LeftSidebar";

// // // API
// // import { headline, getStatesByCountry, getCategories } from "../../../Services/authApi";

// // // ✅ Static Menu Items
// // const sidebarOptions = [
// //   { name: "Home", path: "/" },
// //   { name: "India", path: "/india" },
// //   { name: "State", path: "/state", isDropdown: true },
// //   { name: "Entertainment", path: "/entertainment" },
// //   { name: "Astrology", path: "/astrology" },
// //   { name: "Sports", path: "/sports" },
// //   { name: "Thoughts", path: "/thoughts" },
// //   { name: "Business", path: "/business" },
// //   { name: "Youth", path: "/youth" },
// // ];

// // const HeaderActionIcon = ({ icon, text, link, isReactIcon = false, size = 28 }) => {
// //   const renderedIcon = isReactIcon ? React.cloneElement(icon, { size }) : <img src={icon} alt={text} height={size} width={size} />;
// //   const isExternalLink = link.startsWith("http://") || link.startsWith("https://");

// //   const handleExternalLinkClick = (event) => {
// //     if (isExternalLink) {
// //       event.preventDefault();
// //       window.open(link, "_self");
// //     }
// //   };

// //   return isExternalLink ? (
// //     <a
// //       href={link}
// //       onClick={handleExternalLinkClick}
// //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// //       style={{ color: "#000" }}
// //     >
// //       {renderedIcon}
// //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// //         {text}
// //       </span>
// //     </a>
// //   ) : (
// //     <Link
// //       to={link}
// //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// //       style={{ color: "#000" }}
// //     >
// //       {renderedIcon}
// //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// //         {text}
// //       </span>
// //     </Link>
// //   );
// // };

// // const Header = () => {
// //   const navigate = useNavigate();
// //   const { changeLanguage: googleTranslateChangeLanguage } = useGoogleTranslate();

// //   const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("userLanguage") || "en");
// //   const [headlineData, setHeadlineData] = useState([]);
// //   const [allStates, setAllStates] = useState([]);
// //   const [allCategories, setAllCategories] = useState([]);
  
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
// //   const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
// //   const [isScrolled, setIsScrolled] = useState(false);

// //   const [loggedInUser, setLoggedInUser] = useState(null);
// //   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
// //   const profileDropdownRef = useRef(null);
// //   const stateDropdownRef = useRef(null);
// //   const otherDropdownRef = useRef(null);

// //   const changeAppLanguage = (lang) => {
// //     setCurrentLanguage(lang);
// //     localStorage.setItem("userLanguage", lang);
// //     navigate("/");
// //     window.location.reload();
// //   };

// //   useEffect(() => {
// //     const handleScroll = () => setIsScrolled(window.scrollY > 80);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   useEffect(() => {
// //     const userData = localStorage.getItem("user");
// //     if (userData) {
// //       try {
// //         setLoggedInUser(JSON.parse(userData));
// //       } catch {
// //         setLoggedInUser(null);
// //       }
// //     } else setLoggedInUser(null);
// //   }, []);

// //   useEffect(() => {
// //     const fetchHeadline = async () => {
// //       try {
// //         const response = await headline();
// //         const dataArray = response?.data || [];
// //         const allHeadlines = dataArray
// //           .filter((item) => item.headlineText && item.newsId?.slug_en)
// //           .map((item) => ({
// //             id: item.newsId?._id,
// //             slug: item.newsId?.slug_en,
// //             text: item.headlineText.trim(),
// //           }));
// //         setHeadlineData(allHeadlines.length ? allHeadlines : [{ id: "0", slug: "", text: "No headline available" }]);
// //       } catch {
// //         setHeadlineData([{ id: "0", slug: "", text: "" }]);
// //       }
// //     };
// //     fetchHeadline();
// //   }, [currentLanguage]);

// //   useEffect(() => {
// //     const fetchStates = async () => {
// //       try {
// //         const res = await getStatesByCountry("687a1e2185f0230715032380");
// //         if (res?.success) setAllStates(res.data);
// //       } catch {}
// //     };
// //     fetchStates();
// //   }, []);

// //   useEffect(() => {
// //     const fetchAllCategories = async () => {
// //       try {
// //         const res = await getCategories();
// //         if (res?.success) {
// //           const staticNames = sidebarOptions.map(opt => opt.name.toLowerCase());
// //           const filteredCats = res.data.filter(cat => 
// //              !staticNames.includes(cat.name.toLowerCase())
// //           );
// //           setAllCategories(filteredCats);
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch categories", error);
// //       }
// //     };
// //     fetchAllCategories();
// //   }, []);

// //   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
// //         setIsStateDropdownOpen(false);
// //       }
// //       if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) {
// //         setIsOtherDropdownOpen(false);
// //       }
// //       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
// //         setIsProfileDropdownOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("token");
// //     setLoggedInUser(null);
// //     setIsProfileDropdownOpen(false);
// //     navigate("/");
// //     window.location.reload();
// //   };

// //   return (
// //     <>
// //       <GoogleTranslateWidget />

// //       {/* Blue Header */}
// //       <div
// //         style={{
// //           backgroundColor: "#0d2d62",
// //           color: "white",
// //           height: "40px",
// //           position: "fixed",
// //           top: 5,
// //           left: 0,
// //           right: 0,
// //           zIndex: 2000,
// //           transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
// //           transition: "transform 0.4s ease-in-out",
// //         }}
// //       >
// //         <Container fluid className="d-flex justify-content-between align-items-center py-1 px-3">
// //           <div className="d-flex align-items-center" style={{ marginLeft: "70px" }}>
// //             <Button
// //               variant="link"
// //               className="text-white fw-bold p-0 me-3"
// //               onClick={() => changeAppLanguage("hi")}
// //               style={{ textDecoration: currentLanguage === "hi" ? "underline" : "none" }}
// //             >
// //               हिंदी
// //             </Button>
// //             <Button
// //               variant="link"
// //               className="text-white fw-bold p-0"
// //               onClick={() => changeAppLanguage("en")}
// //               style={{ textDecoration: currentLanguage === "en" ? "underline" : "none" }}
// //             >
// //               English
// //             </Button>
// //           </div>

// //           <div className="d-flex align-items-center">
// //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaFacebookF size={16} /></a>
// //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaXTwitter size={16} /></a>
// //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaYoutube size={16} /></a>
// //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaInstagram size={16} /></a>

// //             <div ref={profileDropdownRef} className="position-relative ms-3">
// //               {loggedInUser ? (
// //                 <Button
// //                   variant="link"
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     setIsProfileDropdownOpen((prev) => !prev);
// //                   }}
// //                   className="p-0 border-0 d-flex align-items-center text-decoration-none"
// //                 >
// //                   {loggedInUser.profileImage ? (
// //                     <img
// //                       src={loggedInUser.profileImage}
// //                       alt={loggedInUser.name}
// //                       className="rounded-circle"
// //                       style={{ width: "28px", height: "28px", objectFit: "cover" }}
// //                     />
// //                   ) : (
// //                     <FaUserCircle size={28} color="white" />
// //                   )}
// //                   <span className="ms-2 text-white fw-bold d-none d-lg-inline">
// //                     {loggedInUser.name.split(" ")[0]}
// //                   </span>
// //                 </Button>
// //               ) : (
// //                 <Link
// //                   to="/login"
// //                   className="d-flex align-items-center text-decoration-none text-white fw-bold me-3 ms-3"
// //                 >
// //                   <img src={loginIcon} alt="Login" height="28" className="me-1" />
// //                   <span>Login</span>
// //                 </Link>
// //               )}

// //               {isProfileDropdownOpen && loggedInUser && (
// //                 <div
// //                   style={{
// //                     position: "absolute",
// //                     top: "100%",
// //                     right: 0,
// //                     backgroundColor: "#0d2d62",
// //                     color: "white",
// //                     padding: "8px 0",
// //                     minWidth: "120px",
// //                     borderRadius: "4px",
// //                     zIndex: 2001,
// //                   }}
// //                 >
// //                   <Link
// //                     to="/profile"
// //                     className="d-block text-white text-decoration-none px-3 py-1"
// //                     onClick={() => setIsProfileDropdownOpen(false)}
// //                   >
// //                     Profile
// //                   </Link>
// //                   <Button
// //                     variant="link"
// //                     className="d-block text-white text-decoration-none w-100 text-start px-3 py-1"
// //                     onClick={handleLogout}
// //                   >
// //                     Logout
// //                   </Button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </Container>
// //       </div>

// //       <div style={{ marginTop: "40px" }} />

// //       {/* White Header */}
// //       <div className="bg-white border-bottom" style={{ transition: "all 0.5s ease-in-out" }}>
// //         <Container fluid className="d-flex justify-content-between align-items-center py-2 px-3">
// //           <Link to="/" className="d-flex flex-column align-items-center text-decoration-none" style={{ zIndex: 2100 }}>
// //             <video src="/logogif.mp4" autoPlay loop muted style={{ width: "60px", marginRight: "3px", zIndex: 2100, transform: isScrolled ? "translateY(0)" : "translateY(-50px)", transition: "transform 0.5s ease-in-out" }} />
// //             <img src={logoT} alt="EMS Tagline" style={{ height: "5px", transform: isScrolled ? "translateY(0)" : "translateY(-50px)", transition: "transform 0.5s ease-in-out" }} />
// //           </Link>

// //           {/* Center Menu */}
// //           <Nav className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold" style={{ gap: "45px" }}>
// //             {sidebarOptions.map((opt, index) =>
// //               opt.isDropdown ? (
// //                 <div key={index} ref={stateDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// //                   <span onClick={() => setIsStateDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// //                     State ▾
// //                   </span>
// //                   {isStateDropdownOpen && (
// //                     <div style={{ 
// //                         position: "absolute", 
// //                         top: "100%", 
// //                         left: 0, 
// //                         backgroundColor: "#c82333", 
// //                         color: "white", 
// //                         padding: "6px", 
// //                         minWidth: "540px", 
// //                         display: "grid", 
// //                         gridTemplateColumns: "repeat(3, 1fr)", 
// //                         gap: "4px", 
// //                         zIndex: 999 
// //                     }}>
// //                       {allStates.map((state) => (
// //                         <NavLink
// //                           key={state._id}
// //                           to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
// //                           className="text-white text-decoration-none"
// //                           style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// //                           onClick={() => setIsStateDropdownOpen(false)}
// //                         >
// //                           {state.name}
// //                         </NavLink>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               ) : (
// //                 <NavLink key={index} to={opt.path} className="text-decoration-none text-black" style={{ fontWeight: 600 }}>
// //                   {opt.name}
// //                 </NavLink>
// //               )
// //             )}

// //             {/* ✅ "Other" Dropdown with Right Alignment */}
// //             <div ref={otherDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// //               <span onClick={() => setIsOtherDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// //                 Other ▾
// //               </span>
// //               {isOtherDropdownOpen && (
// //                 <div style={{ 
// //                     position: "absolute", 
// //                     top: "100%", 
// //                     right: 0,      // ✅ Changed from left:0 to right:0
// //                     left: "auto",  // ✅ Ensures it doesn't stick to left
// //                     backgroundColor: "#c82333", 
// //                     color: "white", 
// //                     padding: "6px", 
// //                     minWidth: "540px", 
// //                     display: "grid", 
// //                     gridTemplateColumns: "repeat(3, 1fr)", 
// //                     gap: "4px", 
// //                     zIndex: 999,
// //                     boxShadow: "0 4px 8px rgba(0,0,0,0.15)" 
// //                 }}>
// //                   {allCategories.length > 0 ? (
// //                     allCategories.map((cat) => (
// //                       <NavLink
// //                         key={cat._id}
// //                         to={`/category/${cat.name}`}
// //                         className="text-white text-decoration-none"
// //                         style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// //                         onClick={() => setIsOtherDropdownOpen(false)}
// //                       >
// //                         {cat.name}
// //                       </NavLink>
// //                     ))
// //                   ) : (
// //                     <span className="text-white p-2" style={{fontSize: '14px'}}>Loading...</span>
// //                   )}
// //                 </div>
// //               )}
// //             </div>

// //           </Nav>

// //           {/* Right Icons */}
// //           <Nav className="d-flex flex-row align-items-center gap-3 gap-md-4">
// //             <HeaderActionIcon icon={epaperIcon} text="E-Paper" link="http://www.jabalpurexpress.com/" />
// //             <HeaderActionIcon icon={searchIcon} text="Search" link="/search" />
// //             <HeaderActionIcon icon={emstvIcon} text="EMS TV" link="/emstv" />
// //             <HeaderActionIcon icon={directoryIcon} text="Directory" link="/directory" />
// //             <HeaderActionIcon icon={<MdOutlineSubscriptions color="#c41229ff" />} text="Subscriber" link="https://services.emsindia.com/public/authentication/admin_login" isReactIcon size={28} />
// //           </Nav>
// //         </Container>
// //       </div>

// //       {/* Live News */}
// //       <div className="bg-white border-top border-bottom">
// //         <Container fluid className="d-flex align-items-center p-0">
// //           <div className="d-flex align-items-center px-2 py-1" style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}>
// //             <Button variant="link" className="text-white me-2 p-0" onClick={toggleSidebar} style={{ fontSize: "20px" }}>
// //               <FaBars />
// //             </Button>
// //             <span className="text-white fw-bold px-2 py-0" style={{ minWidth: "120px", fontSize: "14px" }}>
// //               News Headline
// //             </span>
// //           </div>

// //           <marquee behavior="scroll" direction="left" className="fw-bold py-1" style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}>
// //             {headlineData.map((headline) => (
// //               <Link key={headline.id} to={headline.slug ? `/news/${headline.slug}` : "#"} className="text-decoration-none text-dark me-4" style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
// //                 {headline.text}
// //               </Link>
// //             ))}
// //           </marquee>
// //         </Container>
// //       </div>

// //       <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} states={allStates} />
// //     </>
// //   );
// // };

// // export default Header;



// // import React, { useEffect, useState, useRef } from "react";
// // import { Container, Button, Nav } from "react-bootstrap";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
 
// // // Assets
// // import logoT from "../../../assets/logoT.png";
// // import epaperIcon from "../../../assets/icons/epaper-icon.svg";
// // import searchIcon from "../../../assets/icons/search-icon.svg";
// // import emstvIcon from "../../../assets/icons/emstvIcon.png";
// // import directoryIcon from "../../../assets/icons/directory-icon.svg";
// // import loginIcon from "../../../assets/icons/login-icon.svg";
 
// // // Google Translate
// // import GoogleTranslateWidget, { useGoogleTranslate } from "../../GoogleTranslateWidget";
 
// // // Icons
// // import { FaFacebookF, FaYoutube, FaInstagram, FaUserCircle } from "react-icons/fa";
// // import { FaXTwitter, FaBars } from "react-icons/fa6";
// // import { MdOutlineSubscriptions } from "react-icons/md";
 
// // // Sidebar
// // import LeftSidebar from "../LeftSidebar";
 
// // // API
// // import { headline, getStatesByCountry, getCategories } from "../../../Services/authApi";

 
// // // ✅ 1. Translation object for menu items
// // const translations = {
// //   en: {
// //     home: "Home",
// //     india: "India",
// //     state: "State",
// //     entertainment: "Entertainment",
// //     astrology: "Astrology",
// //     sports: "Sports",
// //     thoughts: "Thoughts",
// //     business: "Business",
// //     youth: "Youth",
// //     other: "Other",
// //     epaper: "E-Paper",
// //     search: "Search",
// //     emstv: "EMS TV",
// //     directory: "Directory",
// //     subscriber: "Subscriber",
// //     liveNews: "News Headline",
// //     login: "Login",
// //     profile: "Profile",
// //     logout: "Logout"
// //   },
// //   hi: {
// //     home: "होम",
// //     india: "देश",
// //     state: "राज्य",
// //     entertainment: "मनोरंजन",
// //     astrology: "राशिफल",
// //     sports: "खेल",
// //     thoughts: "विचार",
// //     business: "बिजनेस",
// //     youth: "लाइफस्टाइल",
// //     other: "अन्य",
// //     epaper: "ई-पेपर",
// //     search: "खोजें",
// //     emstv: "ईएमएस टीवी",
// //     directory: "डायरेक्टरी",
// //     subscriber: "सब्सक्राइबर",
// //     liveNews: "न्यूज़ हेडलाइंस",
// //     login: "लॉगिन",
// //     profile: "प्रोफ़ाइल",
// //     logout: "लॉगआउट"
// //   },
// // };
 
 
// // // ✅ 2. Updated static menu items to use keys for translation
// // const sidebarOptions = [
// //   { key: "home", path: "/" },
// //   { key: "india", path: "/india" },
// //   { key: "state", path: "/state", isDropdown: true },
// //   { key: "entertainment", path: "/entertainment" },
// //   { key: "astrology", path: "/astrology" },
// //   { key: "sports", path: "/sports" },
// //   { key: "thoughts", path: "/thoughts" },
// //   { key: "business", path: "/business" },
// //   { key: "youth", path: "/youth" },
// // ];
 
// // const HeaderActionIcon = ({ icon, text, link, isReactIcon = false, size = 28 }) => {
// //   const renderedIcon = isReactIcon ? React.cloneElement(icon, { size }) : <img src={icon} alt={text} height={size} width={size} />;
// //   const isExternalLink = link.startsWith("http://") || link.startsWith("https://");
 
// //   const handleExternalLinkClick = (event) => {
// //     if (isExternalLink) {
// //       event.preventDefault();
// //       window.open(link, "_self");
// //     }
// //   };
 
// //   return isExternalLink ? (
// //     <a
// //       href={link}
// //       onClick={handleExternalLinkClick}
// //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// //       style={{ color: "#000" }}
// //     >
// //       {renderedIcon}
// //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// //         {text}
// //       </span>
// //     </a>
// //   ) : (
// //     <Link
// //       to={link}
// //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// //       style={{ color: "#000" }}
// //     >
// //       {renderedIcon}
// //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// //         {text}
// //       </span>
// //     </Link>
// //   );
// // };
 
// // const Header = () => {
// //   const navigate = useNavigate();
// //   const { changeLanguage: googleTranslateChangeLanguage } = useGoogleTranslate();
 
// //   const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("userLanguage") || "en");
// //   const [headlineData, setHeadlineData] = useState([]);
// //   const [allStates, setAllStates] = useState([]);
// //   const [allCategories, setAllCategories] = useState([]);
 
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
// //   const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
// //   const [isScrolled, setIsScrolled] = useState(false);
 
// //   const [loggedInUser, setLoggedInUser] = useState(null);
// //   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
 
// //   const profileDropdownRef = useRef(null);
// //   const stateDropdownRef = useRef(null);
// //   const otherDropdownRef = useRef(null);
   
// //   // ✅ 3. Get the correct set of translations based on the current language
// //   const t = translations[currentLanguage] || translations.en;
 
// //   const changeAppLanguage = (lang) => {
// //     setCurrentLanguage(lang);
// //     localStorage.setItem("userLanguage", lang);
// //     navigate("/");
// //     window.location.reload();
// //   };
 
// //   useEffect(() => {
// //     const handleScroll = () => setIsScrolled(window.scrollY > 80);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);
 
// //   useEffect(() => {
// //     const userData = localStorage.getItem("user");
// //     if (userData) {
// //       try {
// //         setLoggedInUser(JSON.parse(userData));
// //       } catch {
// //         setLoggedInUser(null);
// //       }
// //     } else setLoggedInUser(null);
// //   }, []);
 
// //   useEffect(() => {
// //     const fetchHeadline = async () => {
// //       try {
// //         const response = await headline();
// //         const dataArray = response?.data || [];
// //         const allHeadlines = dataArray
// //           .filter((item) => item.headlineText)
// //           .map((item) => ({
// //             id: item.newsId?._id || item._id,
// //             slug: item.newsId?.slug_en || "",
// //             text: item.headlineText.trim(),
// //           }));
 
// //         setHeadlineData(
// //           allHeadlines.length
// //             ? allHeadlines
// //             : [{ id: "0", slug: "", text: "No headline available" }]
// //         );
// //       } catch {
// //         setHeadlineData([{ id: "0", slug: "", text: "Error loading headlines" }]);
// //       }
// //     };
 
// //     fetchHeadline();
// //   }, [currentLanguage]);
 
// //   useEffect(() => {
// //     const fetchStates = async () => {
// //       try {
// //         const res = await getStatesByCountry("687a1e2185f0230715032380");
// //         if (res?.success) setAllStates(res.data);
// //       } catch {}
// //     };
// //     fetchStates();
// //   }, []);
 
// //   useEffect(() => {
// //     const fetchAllCategories = async () => {
// //       try {
// //         const res = await getCategories();
// //         if (res?.success) {
// //           const staticNames = sidebarOptions.map(opt => opt.key.toLowerCase());
// //           const filteredCats = res.data.filter(cat =>
// //              !staticNames.includes(cat.name.toLowerCase())
// //           );
// //           setAllCategories(filteredCats);
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch categories", error);
// //       }
// //     };
// //     fetchAllCategories();
// //   }, []);
 
// //   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
 
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
// //         setIsStateDropdownOpen(false);
// //       }
// //       if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) {
// //         setIsOtherDropdownOpen(false);
// //       }
// //       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
// //         setIsProfileDropdownOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);
 
// //   const handleLogout = () => {
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("token");
// //     setLoggedInUser(null);
// //     setIsProfileDropdownOpen(false);
// //     navigate("/");
// //     window.location.reload();
// //   };
 
// //   return (
// //     <>
// //       <GoogleTranslateWidget />
 
// //       {/* Blue Header */}
// //       <div
// //         style={{
// //           backgroundColor: "#0d2d62",
// //           color: "white",
// //           height: "40px",
// //           position: "fixed",
// //           top: 5,
// //           left: 0,
// //           right: 0,
// //           zIndex: 2000,
// //           transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
// //           transition: "transform 0.4s ease-in-out",
// //         }}
// //       >
// //         <Container fluid className="d-flex justify-content-between align-items-center py-1 px-3">
// //           <div className="d-flex align-items-center" style={{ marginLeft: "70px" }}>
// //             <Button
// //               variant="link"
// //               className="text-white fw-bold p-0 me-3"
// //               onClick={() => changeAppLanguage("hi")}
// //               style={{ textDecoration: currentLanguage === "hi" ? "underline" : "none" }}
// //             >
// //               हिंदी
// //             </Button>
// //             <Button
// //               variant="link"
// //               className="text-white fw-bold p-0"
// //               onClick={() => changeAppLanguage("en")}
// //               style={{ textDecoration: currentLanguage === "en" ? "underline" : "none" }}
// //             >
// //               English
// //             </Button>
// //           </div>
 
// //           <div className="d-flex align-items-center">
// //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaFacebookF size={16} /></a>
// //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaXTwitter size={16} /></a>
// //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaYoutube size={16} /></a>
// //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaInstagram size={16} /></a>
 
// //             <div ref={profileDropdownRef} className="position-relative ms-3">
// //               {loggedInUser ? (
// //                 <Button
// //                   variant="link"
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     setIsProfileDropdownOpen((prev) => !prev);
// //                   }}
// //                   className="p-0 border-0 d-flex align-items-center text-decoration-none"
// //                 >
// //                   {loggedInUser.profileImage ? (
// //                     <img
// //                       src={loggedInUser.profileImage}
// //                       alt={loggedInUser.name}
// //                       className="rounded-circle"
// //                       style={{ width: "28px", height: "28px", objectFit: "cover" }}
// //                     />
// //                   ) : (
// //                     <FaUserCircle size={28} color="white" />
// //                   )}
// //                   <span className="ms-2 text-white fw-bold d-none d-lg-inline">
// //                     {loggedInUser.name.split(" ")[0]}
// //                   </span>
// //                 </Button>
// //               ) : (
// //                 <Link
// //                   to="/login"
// //                   className="d-flex align-items-center text-decoration-none text-white fw-bold me-3 ms-3"
// //                 >
// //                   <img src={loginIcon} alt="Login" height="28" className="me-1" />
// //                   {/* ✅ Using translated text */}
// //                   <span>{t.login}</span>
// //                 </Link>
// //               )}
 
// //               {isProfileDropdownOpen && loggedInUser && (
// //                 <div
// //                   style={{
// //                     position: "absolute",
// //                     top: "100%",
// //                     right: 0,
// //                     backgroundColor: "#0d2d62",
// //                     color: "white",
// //                     padding: "8px 0",
// //                     minWidth: "120px",
// //                     borderRadius: "4px",
// //                     zIndex: 2001,
// //                   }}
// //                 >
// //                   <Link
// //                     to="/profile"
// //                     className="d-block text-white text-decoration-none px-3 py-1"
// //                     onClick={() => setIsProfileDropdownOpen(false)}
// //                   >
// //                     {/* ✅ Using translated text */}
// //                     {t.profile}
// //                   </Link>
// //                   <Button
// //                     variant="link"
// //                     className="d-block text-white text-decoration-none w-100 text-start px-3 py-1"
// //                     onClick={handleLogout}
// //                   >
// //                      {/* ✅ Using translated text */}
// //                     {t.logout}
// //                   </Button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </Container>
// //       </div>
 
// //       <div style={{ marginTop: "40px" }} />
 
// //       {/* White Header */}
// //       <div className="bg-white border-bottom" style={{ transition: "all 0.5s ease-in-out" }}>
// //         <Container fluid className="d-flex justify-content-between align-items-center py-2 px-3">
// //           <Link to="/" className="d-flex flex-column align-items-center text-decoration-none" style={{ zIndex: 2100 }}>
// //             <video src="/logogif.mp4" autoPlay loop muted style={{ width: "60px", marginRight: "3px", zIndex: 2100, transform: isScrolled ? "translateY(0)" : "translateY(-50px)", transition: "transform 0.5s ease-in-out" }} />
// //             <img src={logoT} alt="EMS Tagline" style={{ height: "5px", transform: isScrolled ? "translateY(0)" : "translateY(-50px)", transition: "transform 0.5s ease-in-out" }} />
// //           </Link>
 
// //           {/* Center Menu */}
// //           <Nav className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold" style={{ gap: "45px" }}>
// //             {sidebarOptions.map((opt, index) =>
// //               opt.isDropdown ? (
// //                 <div key={index} ref={stateDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// //                    {/* ✅ Using translated text for State dropdown */}
// //                   <span onClick={() => setIsStateDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// //                     {t[opt.key]} ▾
// //                   </span>
// //                   {isStateDropdownOpen && (
// //                     <div style={{
// //                         position: "absolute",
// //                         top: "100%",
// //                         left: 0,
// //                         backgroundColor: "#c82333",
// //                         color: "white",
// //                         padding: "6px",
// //                         minWidth: "540px",
// //                         display: "grid",
// //                         gridTemplateColumns: "repeat(3, 1fr)",
// //                         gap: "4px",
// //                         zIndex: 999
// //                     }}>
// //                       {allStates.map((state) => (
// //                         <NavLink
// //                           key={state._id}
// //                           to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
// //                           className="text-white text-decoration-none"
// //                           style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// //                           onClick={() => setIsStateDropdownOpen(false)}
// //                         >
// //                           {state.name}
// //                         </NavLink>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               ) : (
// //                 <NavLink key={index} to={opt.path} className="text-decoration-none text-black" style={{ fontWeight: 600 }}>
// //                   {/* ✅ Using translated text for other menu items */}
// //                   {t[opt.key]}
// //                 </NavLink>
// //               )
// //             )}
 
// //             <div ref={otherDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// //                {/* ✅ Using translated text for Other dropdown */}
// //               <span onClick={() => setIsOtherDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// //                 {t.other} ▾
// //               </span>
// //               {isOtherDropdownOpen && (
// //                 <div style={{
// //                     position: "absolute",
// //                     top: "100%",
// //                     right: 0,
// //                     left: "auto",
// //                     backgroundColor: "#c82333",
// //                     color: "white",
// //                     padding: "6px",
// //                     minWidth: "540px",
// //                     display: "grid",
// //                     gridTemplateColumns: "repeat(3, 1fr)",
// //                     gap: "4px",
// //                     zIndex: 999,
// //                     boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
// //                 }}>
// //                   {allCategories.length > 0 ? (
// //                     allCategories.map((cat) => (
// //                       <NavLink
// //                         key={cat._id}
// //                         to={`/category/${cat.name}`}
// //                         className="text-white text-decoration-none"
// //                         style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// //                         onClick={() => setIsOtherDropdownOpen(false)}
// //                       >
// //                         {cat.name}
// //                       </NavLink>
// //                     ))
// //                   ) : (
// //                     <span className="text-white p-2" style={{fontSize: '14px'}}>Loading...</span>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </Nav>
 
// //           {/* Right Icons */}
// //           <Nav className="d-flex flex-row align-items-center gap-3 gap-md-4">
// //              {/* ✅ Using translated text for HeaderActionIcons */}
// //             <HeaderActionIcon icon={epaperIcon} text={t.epaper} link="http://www.jabalpurexpress.com/" />
// //             <HeaderActionIcon icon={searchIcon} text={t.search} link="/search" />
// //             <HeaderActionIcon icon={emstvIcon} text={t.emstv} link="/emstv" />
// //             <HeaderActionIcon icon={directoryIcon} text={t.directory} link="/directory" />
// //             <HeaderActionIcon icon={<MdOutlineSubscriptions color="#c41229ff" />} text={t.subscriber} link="https://services.emsindia.com/public/authentication/admin_login" isReactIcon size={28} />
// //           </Nav>
// //         </Container>
// //       </div>
 
// //       {/* Live News */}
// //       <div className="bg-white border-top border-bottom">
// //         <Container fluid className="d-flex align-items-center p-0">
// //           <div className="d-flex align-items-center px-2 py-1" style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}>
// //             <Button variant="link" className="text-white me-2 p-0" onClick={toggleSidebar} style={{ fontSize: "20px" }}>
// //               <FaBars />
// //             </Button>
// //             {/* ✅ Using translated text for Live News */}
// //             <span className="text-white fw-bold px-2 py-0" style={{ minWidth: "120px", fontSize: "14px" }}>
// //               {t.liveNews}
// //             </span>
// //           </div>
 
// //           <marquee
// //             behavior="scroll"
// //             direction="left"
// //             className="fw-bold py-1"
// //             style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}
// //           >
// //             {headlineData.map((headline) => (
// //               <Link
// //                 key={headline.id}
// //                 to={headline.slug ? `/news/${headline.slug}` : "#"}
// //                 className="text-decoration-none text-dark me-4"
// //                 style={{
// //                   whiteSpace: "nowrap",
// //                   fontWeight: "bold",
// //                   pointerEvents: headline.slug ? "auto" : "none",
// //                   color: headline.slug ? "#000" : "gray"
// //                 }}
// //               >
// //                 {headline.text}
// //               </Link>
// //             ))}
// //           </marquee>
// //         </Container>
// //       </div>
 
// //       <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} states={allStates} />
// //     </>
// //   );
// // };
 
// // export default Header;
 


// // import React, { useEffect, useState, useRef } from "react";
// // import { Container, Button, Nav, Row, Col } from "react-bootstrap";
// // import { Link, NavLink, useNavigate } from "react-router-dom";

// // // Assets
// // import logoT from "../../../assets/logoT.png";
// // import epaperIcon from "../../../assets/icons/epaper-icon.svg";
// // import searchIcon from "../../../assets/icons/search-icon.svg";
// // import emstvIcon from "../../../assets/icons/emstvIcon.png";
// // import directoryIcon from "../../../assets/icons/directory-icon.svg";
// // // loginIcon अब Font Awesome icon से बदल दिया गया है, इस इम्पोर्ट की अब सीधे जरूरत नहीं है
// // // import loginIcon from "../../../assets/icons/login-icon.svg";

// // // Google Translate
// // import GoogleTranslateWidget, {
// //   useGoogleTranslate,
// // } from "../../GoogleTranslateWidget";

// // // Icons
// // import { FaFacebookF, FaYoutube, FaInstagram, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
// // import { FaXTwitter, FaBars } from "react-icons/fa6";
// // import { MdOutlineSubscriptions } from "react-icons/md";

// // // Sidebar
// // import LeftSidebar from "../LeftSidebar";

// // // API
// // import { headline, getStatesByCountry, getCategories } from "../../../Services/authApi";
// // import TopAdBanner from "../../../components/NewsDetails/TopAdBanner"; // path check kar lena

// // // ===============================================
// // // ✅ 1. Heights and Z-index Constants (अपनी विज्ञापन की वास्तविक ऊंचाई के अनुसार AD_BANNER_HEIGHT को एडजस्ट करें)
// // const GAP_TOP_OF_AD = 5; // विज्ञापन के ऊपर 5px का गैप
// // const AD_BANNER_HEIGHT = 60; // विज्ञापन बैनर की ऊंचाई (आपकी छवि के आधार पर अनुमानित)
// // const GAP_BELOW_AD = 5; // विज्ञापन के नीचे 5px का गैप
// // const BLUE_HEADER_HEIGHT = 40; // ब्लू हेडर की ऊंचाई

// // // सभी फिक्स्ड हेडर्स की कुल प्रारंभिक ऊंचाई (जब स्क्रॉल टॉप पर हो)
// // const TOTAL_INITIAL_FIXED_HEIGHT = GAP_TOP_OF_AD + AD_BANNER_HEIGHT + GAP_BELOW_AD + BLUE_HEADER_HEIGHT;
// // // ===============================================

// // // ✅ 2. Translation object for menu items
// // const translations = {
// //   en: {
// //     home: "Home",
// //     india: "India",
// //     state: "State",
// //     entertainment: "Entertainment",
// //     astrology: "Astrology",
// //     sports: "Sports",
// //     thoughts: "Thoughts",
// //     business: "Business",
// //     youth: "Youth",
// //     other: "Other",
// //     epaper: "E-Paper",
// //     search: "Search",
// //     emstv: "EMS TV",
// //     directory: "Directory",
// //     subscriber: "Subscriber",
// //     liveNews: "News Headline",
// //     login: "Login",
// //     profile: "Profile",
// //     logout: "Logout"
// //   },
// //   hi: {
// //     home: "होम",
// //     india: "देश",
// //     state: "राज्य",
// //     entertainment: "मनोरंजन",
// //     astrology: "राशिफल",
// //     sports: "खेल",
// //     thoughts: "विचार",
// //     business: "बिजनेस",
// //     youth: "लाइफस्टाइल",
// //     other: "अन्य",
// //     epaper: "ई-पेपर",
// //     search: "खोजें",
// //     emstv: "ईएमएस टीवी",
// //     directory: "डायरेक्टरी",
// //     subscriber: "सब्सक्राइबर",
// //     liveNews: "न्यूज़ हेडलाइंस",
// //     login: "लॉगिन",
// //     profile: "प्रोफ़ाइल",
// //     logout: "लॉगआउट"
// //   },
// // };

// // // ✅ 3. Updated static menu items to use keys for translation
// // const sidebarOptions = [
// //   { key: "home", path: "/" },
// //   { key: "india", path: "/india" },
// //   { key: "state", path: "/state", isDropdown: true },
// //   { key: "entertainment", path: "/entertainment" },
// //   { key: "astrology", path: "/astrology" },
// //   { key: "sports", path: "/sports" },
// //   { key: "thoughts", path: "/thoughts" },
// //   { key: "business", path: "/business" },
// //   { key: "youth", path: "/youth" },
// // ];

// // const HeaderActionIcon = ({ icon, text, link, isReactIcon = false, size = 28 }) => {
// //   const renderedIcon = isReactIcon ? React.cloneElement(icon, { size }) : <img src={icon} alt={text} height={size} width={size} />;
// //   const isExternalLink = link.startsWith("http://") || link.startsWith("https://");

// //   const handleExternalLinkClick = (event) => {
// //     if (isExternalLink) {
// //       event.preventDefault();
// //       window.open(link, "_self");
// //     }
// //   };

// //   return isExternalLink ? (
// //     <a
// //       href={link}
// //       onClick={handleExternalLinkClick}
// //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// //       style={{ color: "#000" }}
// //     >
// //       {renderedIcon}
// //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// //         {text}
// //       </span>
// //     </a>
// //   ) : (
// //     <Link
// //       to={link}
// //       className="d-flex flex-column align-items-center text-decoration-none text-center"
// //       style={{ color: "#000" }}
// //     >
// //       {renderedIcon}
// //       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
// //         {text}
// //       </span>
// //     </Link>
// //   );
// // };

// // const Header = () => {
// //   const navigate = useNavigate();
// //   const { changeLanguage: googleTranslateChangeLanguage } = useGoogleTranslate();

// //   const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("userLanguage") || "en");
// //   const [headlineData, setHeadlineData] = useState([]);
// //   const [allStates, setAllStates] = useState([]);
// //   const [allCategories, setAllCategories] = useState([]);

// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
// //   const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
// //   // ✅ isScrolled स्टेट को वापस लाया गया है
// //   const [isScrolled, setIsScrolled] = useState(false); // ✅ isScrolled for logo animation
// //   const [scrollY, setScrollY] = useState(0); // ✅ scrollY स्टेट को जोड़ा गया

// //   const [loggedInUser, setLoggedInUser] = useState(null);
// //   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

// //   const profileDropdownRef = useRef(null);
// //   const stateDropdownRef = useRef(null);
// //   const otherDropdownRef = useRef(null);
   
// //   // ✅ 4. Get the correct set of translations based on the current language
// //   const t = translations[currentLanguage] || translations.en;

// //   const changeAppLanguage = (lang) => {
// //     setCurrentLanguage(lang);
// //     localStorage.setItem("userLanguage", lang);
// //     navigate("/");
// //     window.location.reload();
// //   };

// //   useEffect(() => {
// //     // ✅ स्क्रॉल पोजीशन और isScrolled को अपडेट करने के लिए इवेंट लिसनर
// //     const handleScroll = () => {
// //       setScrollY(window.scrollY);
// //       setIsScrolled(window.scrollY > 80); // 80px स्क्रॉल के बाद लोगो एनीमेशन ट्रिगर
// //     };
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   useEffect(() => {
// //     const userData = localStorage.getItem("user");
// //     if (userData) {
// //       try {
// //         setLoggedInUser(JSON.parse(userData));
// //       } catch {
// //         setLoggedInUser(null);
// //       }
// //     } else setLoggedInUser(null);
// //   }, []);

// //   useEffect(() => {
// //     const fetchHeadline = async () => {
// //       try {
// //         const response = await headline();
// //         const dataArray = response?.data || [];
// //         const allHeadlines = dataArray
// //           .filter((item) => item.headlineText)
// //           .map((item) => ({
// //             id: item.newsId?._id || item._id,
// //             slug: item.newsId?.slug_en || "",
// //             text: item.headlineText.trim(),
// //           }));

// //         setHeadlineData(
// //           allHeadlines.length
// //             ? allHeadlines
// //             : [{ id: "0", slug: "", text: "No headline available" }]
// //         );
// //       } catch {
// //         setHeadlineData([{ id: "0", slug: "", text: "Error loading headlines" }]);
// //       }
// //     };

// //     fetchHeadline();
// //   }, [currentLanguage]);

// //   useEffect(() => {
// //     const fetchStates = async () => {
// //       try {
// //         const res = await getStatesByCountry("687a1e2185f0230715032380");
// //         if (res?.success) setAllStates(res.data);
// //       } catch {}
// //     };
// //     fetchStates();
// //   }, []);

// //   useEffect(() => {
// //     const fetchAllCategories = async () => {
// //       try {
// //         const res = await getCategories();
// //         if (res?.success) {
// //           const staticNames = sidebarOptions.map(opt => opt.key.toLowerCase());
// //           const filteredCats = res.data.filter(cat =>
// //              !staticNames.includes(cat.name.toLowerCase())
// //           );
// //           setAllCategories(filteredCats);
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch categories", error);
// //       }
// //     };
// //     fetchAllCategories();
// //   }, []);

// //   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
// //         setIsStateDropdownOpen(false);
// //       }
// //       if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) {
// //         setIsOtherDropdownOpen(false);
// //       }
// //       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
// //         setIsProfileDropdownOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("token");
// //     setLoggedInUser(null);
// //     setIsProfileDropdownOpen(false);
// //     navigate("/");
// //     window.location.reload();
// //   };

// //   // ===============================================
// //   // ✅ स्क्रॉल के आधार पर डायनामिक ट्रांसफॉर्म और टॉप पोजिशनिंग कैलकुलेट करें

// //   // विज्ञापन बैनर ब्लॉक का Y ट्रांसफॉर्म (इसमें ऊपर का 5px गैप शामिल है)
// //   const adBlockTranslateY = Math.max(-(GAP_TOP_OF_AD + AD_BANNER_HEIGHT + GAP_BELOW_AD), -scrollY);
  
// //   // ब्लू हेडर ब्लॉक का Y ट्रांसफॉर्म
// //   const blueHeaderTranslateY = Math.max(-BLUE_HEADER_HEIGHT, (GAP_TOP_OF_AD + AD_BANNER_HEIGHT + GAP_BELOW_AD) - scrollY);
// //   // ===============================================


// //   return (
// //     <>
// //       {/* =============================================== */}
// //       {/* ✅ Ad Banner (अब `transformY` के साथ गतिशील रूप से स्थित है) */}
// //       <div
// //         style={{
// //           position: "fixed",
// //           top: 0, // टॉप 0 पर फिक्स, ट्रांसफॉर्म Y से नियंत्रित
// //           left: 0,
// //           right: 0,
// //           height: `${AD_BANNER_HEIGHT + GAP_TOP_OF_AD + GAP_BELOW_AD}px`, // विज्ञापन + दोनों गैप की कुल ऊंचाई
// //           zIndex: 2001, // ब्लू हेडर से अधिक zIndex
// //           transform: `translateY(${adBlockTranslateY}px)`, // डायनामिक Y ट्रांसफॉर्म
// //           transition: "transform 0.3s ease-out", // स्मूथ ट्रांजीशन
// //           backgroundColor: "transparent", // Ad banner background transparent to show page background, or a specific color if needed
// //           display: 'flex',
// //           flexDirection: 'column', // ताकि गैप और बैनर लंबवत रूप से संरेखित हों
// //           alignItems: 'center',
// //           justifyContent: 'flex-start', // ऊपर से संरेखित करें
// //           overflow: 'hidden',
// //         }}
// //       >
// //         <div style={{ height: `${GAP_TOP_OF_AD}px`, width: '100%',  marginTop: "30px", }} /> {/* विज्ञापन के ऊपर 5px का गैप */}
// //         <div style={{ height: `${AD_BANNER_HEIGHT}px`, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
// //           <TopAdBanner />
// //         </div>
// //         <div style={{ height: `${GAP_BELOW_AD}px`, width: '100%', }} /> {/* विज्ञापन के नीचे 5px का गैप */}
// //       </div>
// //       {/* =============================================== */}

// //       <GoogleTranslateWidget />

// //       {/* Blue Header */}
// //       <div
// //         style={{
// //           backgroundColor: "#0d2d62",
// //           color: "white",
// //           height: `${BLUE_HEADER_HEIGHT}px`, // निश्चित ऊंचाई
// //           position: "fixed",
// //           top: 5, // टॉप 0 पर फिक्स, ट्रांसफॉर्म Y से नियंत्रित
// //           left: 0,
// //           right: 0,
// //           zIndex: 2000,
// //           transform: `translateY(${blueHeaderTranslateY}px)`, // डायनामिक Y ट्रांसफॉर्म
// //           transition: "transform 0.3s ease-out", // स्मूथ ट्रांजीशन
// //         }}
// //       >
// //         <Container fluid className="d-flex justify-content-between align-items-center py-1 px-3">
// //           <div className="d-flex align-items-center" style={{ marginLeft: "70px" }}>
// //             <Button
// //               variant="link"
// //               className="text-white fw-bold p-0 me-3"
// //               onClick={() => changeAppLanguage("hi")}
// //               style={{ textDecoration: currentLanguage === "hi" ? "underline" : "none" }}
// //             >
// //               हिंदी
// //             </Button>
// //             <Button
// //               variant="link"
// //               className="text-white fw-bold p-0"
// //               onClick={() => changeAppLanguage("en")}
// //               style={{ textDecoration: currentLanguage === "en" ? "underline" : "none" }}
// //             >
// //               English
// //             </Button>
// //           </div>

// //           <div className="d-flex align-items-center">
// //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaFacebookF size={16} /></a>
// //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaXTwitter size={16} /></a>
// //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaYoutube size={16} /></a>
// //             <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaInstagram size={16} /></a>

// //             <div ref={profileDropdownRef} className="position-relative ms-3">
// //               {loggedInUser ? (
// //                 <Button
// //                   variant="link"
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     setIsProfileDropdownOpen((prev) => !prev);
// //                   }}
// //                   className="p-0 border-0 d-flex align-items-center text-decoration-none"
// //                 >
// //                   {loggedInUser.profileImage ? (
// //                     <img
// //                       src={loggedInUser.profileImage}
// //                       alt={loggedInUser.name}
// //                       className="rounded-circle"
// //                       style={{ width: "28px", height: "28px", objectFit: "cover" }}
// //                     />
// //                   ) : (
// //                     <FaUserCircle size={28} color="white" />
// //                   )}
// //                   <span className="ms-2 text-white fw-bold d-none d-lg-inline">
// //                     {loggedInUser.name.split(" ")[0]}
// //                   </span>
// //                 </Button>
// //               ) : (
// //                 <Link
// //                   to="/login"
// //                   className="d-flex align-items-center text-decoration-none text-white fw-bold me-3 ms-3"
// //                 >
// //                   <FaUserCircle size={28} color="white" className="me-1" /> {/* Changed to FaUserCircle */}
// //                   {/* ✅ Using translated text */}
// //                   <span>{t.login}</span>
// //                 </Link>
// //               )}

// //               {isProfileDropdownOpen && loggedInUser && (
// //                 <div
// //                   style={{
// //                     position: "absolute",
// //                     top: "100%",
// //                     right: 0,
// //                     backgroundColor: "#0d2d62",
// //                     color: "white",
// //                     padding: "8px 0",
// //                     minWidth: "120px",
// //                     borderRadius: "4px",
// //                     zIndex: 2001,
// //                   }}
// //                 >
// //                   <Link
// //                     to="/profile"
// //                     className="d-block text-white text-decoration-none px-3 py-1"
// //                     onClick={() => setIsProfileDropdownOpen(false)}
// //                   >
// //                     {/* ✅ Using translated text */}
// //                     {t.profile}
// //                   </Link>
// //                   <Button
// //                     variant="link"
// //                     className="d-block text-white text-decoration-none w-100 text-start px-3 py-1"
// //                     onClick={handleLogout}
// //                   >
// //                      {/* ✅ Using translated text */}
// //                     {t.logout}
// //                   </Button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </Container>
// //       </div>

// //       {/* =============================================== */}
// //       {/* ✅ Adjusted Margin for White Header (Main Nav) */}
// //       <div style={{ marginTop: `${TOTAL_INITIAL_FIXED_HEIGHT}px` }} />
// //       {/* =============================================== */}

// //       {/* White Header */}
// //       <div className="bg-white border-bottom" style={{ transition: "all 0.5s ease-in-out" }}>
// //         <Container fluid className="d-flex justify-content-between align-items-center py-2 px-3">
// //           <Link to="/" className="d-flex flex-column align-items-center text-decoration-none" style={{ zIndex: 2100 }}>
// //             {/* ✅ लोगो एनीमेशन बहाल */}
// //             <video
// //               src="/logogif.mp4"
// //               autoPlay
// //               loop
// //               muted
// //               style={{
// //                 width: "60px",
// //                 marginRight: "3px",
// //                 zIndex: 2100,
// //                 transform: isScrolled ? "translateY(0)" : "translateY(-50px)",
// //                 transition: "transform 0.5s ease-in-out",
// //               }}
// //             />
// //             <img
// //               src={logoT}
// //               alt="EMS Tagline"
// //               style={{
// //                 height: "5px",
// //                 transform: isScrolled ? "translateY(0)" : "translateY(-50px)",
// //                 transition: "transform 0.5s ease-in-out",
// //               }}
// //             />
// //           </Link>

// //           {/* Center Menu */}
// //           <Nav className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold" style={{ gap: "45px" }}>
// //             {sidebarOptions.map((opt, index) =>
// //               opt.isDropdown ? (
// //                 <div key={index} ref={stateDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// //                    {/* ✅ Using translated text for State dropdown */}
// //                   <span onClick={() => setIsStateDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// //                     {t[opt.key]} ▾
// //                   </span>
// //                   {isStateDropdownOpen && (
// //                     <div style={{
// //                         position: "absolute",
// //                         top: "100%",
// //                         left: 0,
// //                         backgroundColor: "#c82333",
// //                         color: "white",
// //                         padding: "6px",
// //                         minWidth: "540px",
// //                         display: "grid",
// //                         gridTemplateColumns: "repeat(3, 1fr)",
// //                         gap: "4px",
// //                         zIndex: 999
// //                     }}>
// //                       {allStates.map((state) => (
// //                         <NavLink
// //                           key={state._id}
// //                           to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
// //                           className="text-white text-decoration-none"
// //                           style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// //                           onClick={() => setIsStateDropdownOpen(false)}
// //                         >
// //                           {state.name}
// //                         </NavLink>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               ) : (
// //                 <NavLink key={index} to={opt.path} className="text-decoration-none text-black" style={{ fontWeight: 600 }}>
// //                   {/* ✅ Using translated text for other menu items */}
// //                   {t[opt.key]}
// //                 </NavLink>
// //               )
// //             )}

// //             <div ref={otherDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
// //                {/* ✅ Using translated text for Other dropdown */}
// //               <span onClick={() => setIsOtherDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
// //                 {t.other} ▾
// //               </span>
// //               {isOtherDropdownOpen && (
// //                 <div style={{
// //                     position: "absolute",
// //                     top: "100%",
// //                     right: 0,
// //                     left: "auto",
// //                     backgroundColor: "#c82333",
// //                     color: "white",
// //                     padding: "6px",
// //                     minWidth: "540px",
// //                     display: "grid",
// //                     gridTemplateColumns: "repeat(3, 1fr)",
// //                     gap: "4px",
// //                     zIndex: 999,
// //                     boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
// //                 }}>
// //                   {allCategories.length > 0 ? (
// //                     allCategories.map((cat) => (
// //                       <NavLink
// //                         key={cat._id}
// //                         to={`/category/${cat.name}`}
// //                         className="text-white text-decoration-none"
// //                         style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
// //                         onClick={() => setIsOtherDropdownOpen(false)}
// //                       >
// //                         {cat.name}
// //                       </NavLink>
// //                     ))
// //                   ) : (
// //                     <span className="text-white p-2" style={{fontSize: '14px'}}>Loading...</span>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </Nav>

// //           {/* Right Icons */}
// //           <Nav className="d-flex flex-row align-items-center gap-3 gap-md-4">
// //              {/* ✅ Using translated text for HeaderActionIcons */}
// //             <HeaderActionIcon icon={epaperIcon} text={t.epaper} link="http://www.jabalpurexpress.com/" />
// //             <HeaderActionIcon icon={searchIcon} text={t.search} link="/search" />
// //             <HeaderActionIcon icon={emstvIcon} text={t.emstv} link="/emstv" />
// //             <HeaderActionIcon icon={directoryIcon} text={t.directory} link="/directory" />
// //             <HeaderActionIcon icon={<MdOutlineSubscriptions color="#c41229ff" />} text={t.subscriber} link="https://services.emsindia.com/public/authentication/admin_login" isReactIcon size={28} />
// //           </Nav>
// //         </Container>
// //       </div>

// //       {/* Live News */}
// //       <div className="bg-white border-top border-bottom">
// //         <Container fluid className="d-flex align-items-center p-0">
// //           <div className="d-flex align-items-center px-2 py-1" style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}>
// //             <Button variant="link" className="text-white me-2 p-0" onClick={toggleSidebar} style={{ fontSize: "20px" }}>
// //               <FaBars />
// //             </Button>
// //             {/* ✅ Using translated text for Live News */}
// //             <span className="text-white fw-bold px-2 py-0" style={{ minWidth: "120px", fontSize: "14px" }}>
// //               {t.liveNews}
// //             </span>
// //           </div>

// //           <marquee
// //             behavior="scroll"
// //             direction="left"
// //             className="fw-bold py-1"
// //             style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}
// //           >
// //             {headlineData.map((headline) => (
// //               <Link
// //                 key={headline.id}
// //                 to={headline.slug ? `/news/${headline.slug}` : "#"}
// //                 className="text-decoration-none text-dark me-4"
// //                 style={{
// //                   whiteSpace: "nowrap",
// //                   fontWeight: "bold",
// //                   pointerEvents: headline.slug ? "auto" : "none",
// //                   color: headline.slug ? "#000" : "gray"
// //                 }}
// //               >
// //                 {headline.text}
// //               </Link>
// //             ))}
// //           </marquee>
// //         </Container>
// //       </div>

// //       <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} states={allStates} />
// //     </>
// //   );
// // };

// // export default Header;


// import React, { useEffect, useState, useRef } from "react";
// import { Container, Button, Nav } from "react-bootstrap";
// import { Link, NavLink, useNavigate } from "react-router-dom";
 
// // Assets
// import logoT from "../../../assets/logoT.png";
// import epaperIcon from "../../../assets/icons/epaper-icon.svg";
// import searchIcon from "../../../assets/icons/search-icon.svg";
// import emstvIcon from "../../../assets/icons/emstvIcon.png";
// import directoryIcon from "../../../assets/icons/directory-icon.svg";
// import loginIcon from "../../../assets/icons/login-icon.svg";
 
// // Google Translate
// import GoogleTranslateWidget, { useGoogleTranslate } from "../../GoogleTranslateWidget";
 
// // Icons
// import { FaFacebookF, FaYoutube, FaInstagram, FaUserCircle } from "react-icons/fa";
// import { FaXTwitter, FaBars } from "react-icons/fa6";
// import { MdOutlineSubscriptions } from "react-icons/md";
 
// // Sidebar
// import LeftSidebar from "../LeftSidebar";
 
// // API
// // ✅ Added fetchActiveAds to imports
// import { headline, getStatesByCountry, getCategories, fetchActiveAds } from "../../../Services/authApi";

// // ✅ 1. Translation object for menu items
// const translations = {
//   en: {
//     home: "Home",
//     india: "India",
//     state: "State",
//     entertainment: "Entertainment",
//     astrology: "Astrology",
//     sports: "Sports",
//     thoughts: "Thoughts",
//     business: "Business",
//     youth: "Youth",
//     other: "Other",
//     epaper: "E-Paper",
//     search: "Search",
//     emstv: "EMS TV",
//     directory: "Directory",
//     subscriber: "Subscriber",
//     liveNews: "News Headline",
//     login: "Login",
//     profile: "Profile",
//     logout: "Logout"
//   },
//   hi: {
//     home: "होम",
//     india: "देश",
//     state: "राज्य",
//     entertainment: "मनोरंजन",
//     astrology: "राशिफल",
//     sports: "खेल",
//     thoughts: "विचार",
//     business: "बिजनेस",
//     youth: "लाइफस्टाइल",
//     other: "अन्य",
//     epaper: "ई-पेपर",
//     search: "खोजें",
//     emstv: "ईएमएस टीवी",
//     directory: "डायरेक्टरी",
//     subscriber: "सब्सक्राइबर",
//     liveNews: "न्यूज़ हेडलाइंस",
//     login: "लॉगिन",
//     profile: "प्रोफ़ाइल",
//     logout: "लॉगआउट"
//   },
// };
 
// // ✅ 2. Updated static menu items
// const sidebarOptions = [
//   { key: "home", path: "/" },
//   { key: "india", path: "/india" },
//   { key: "state", path: "/state", isDropdown: true },
//   { key: "entertainment", path: "/entertainment" },
//   { key: "astrology", path: "/astrology" },
//   { key: "sports", path: "/sports" },
//   { key: "thoughts", path: "/thoughts" },
//   { key: "business", path: "/business" },
//   { key: "youth", path: "/youth" },
// ];
 
// const HeaderActionIcon = ({ icon, text, link, isReactIcon = false, size = 28 }) => {
//   const renderedIcon = isReactIcon ? React.cloneElement(icon, { size }) : <img src={icon} alt={text} height={size} width={size} />;
//   const isExternalLink = link.startsWith("http://") || link.startsWith("https://");
 
//   const handleExternalLinkClick = (event) => {
//     if (isExternalLink) {
//       event.preventDefault();
//       window.open(link, "_self");
//     }
//   };
 
//   return isExternalLink ? (
//     <a
//       href={link}
//       onClick={handleExternalLinkClick}
//       className="d-flex flex-column align-items-center text-decoration-none text-center"
//       style={{ color: "#000" }}
//     >
//       {renderedIcon}
//       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
//         {text}
//       </span>
//     </a>
//   ) : (
//     <Link
//       to={link}
//       className="d-flex flex-column align-items-center text-decoration-none text-center"
//       style={{ color: "#000" }}
//     >
//       {renderedIcon}
//       <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>
//         {text}
//       </span>
//     </Link>
//   );
// };
 
// const Header = () => {
//   const navigate = useNavigate();
//   const { changeLanguage: googleTranslateChangeLanguage } = useGoogleTranslate();
 
//   const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("userLanguage") || "en");
//   const [headlineData, setHeadlineData] = useState([]);
//   const [allStates, setAllStates] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
  
//   // ✅ State for Top Ad
//   const [topAd, setTopAd] = useState(null);
 
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
//   const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
 
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
 
//   const profileDropdownRef = useRef(null);
//   const stateDropdownRef = useRef(null);
//   const otherDropdownRef = useRef(null);
   
//   const t = translations[currentLanguage] || translations.en;
 
//   const changeAppLanguage = (lang) => {
//     setCurrentLanguage(lang);
//     localStorage.setItem("userLanguage", lang);
//     navigate("/");
//     window.location.reload();
//   };
 
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 80);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
 
//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         setLoggedInUser(JSON.parse(userData));
//       } catch {
//         setLoggedInUser(null);
//       }
//     } else setLoggedInUser(null);
//   }, []);
 
//   // ✅ Effect to Fetch Ads
//   useEffect(() => {
//     const loadAds = async () => {
//       try {
//         const res = await fetchActiveAds();
//         if (res?.success && Array.isArray(res.ads)) {
//           const ad = res.ads.find(item => item.position === "top");
//           setTopAd(ad || null);
//         }
//       } catch (error) {
//         console.log("Top ad not available");
//         setTopAd(null);
//       }
//     };
//     loadAds();
//   }, []);
 
//   useEffect(() => {
//     const fetchHeadline = async () => {
//       try {
//         const response = await headline();
//         const dataArray = response?.data || [];
//         const allHeadlines = dataArray
//           .filter((item) => item.headlineText)
//           .map((item) => ({
//             id: item.newsId?._id || item._id,
//             slug: item.newsId?.slug_en || "",
//             text: item.headlineText.trim(),
//           }));
 
//         setHeadlineData(
//           allHeadlines.length
//             ? allHeadlines
//             : [{ id: "0", slug: "", text: "No headline available" }]
//         );
//       } catch {
//         setHeadlineData([{ id: "0", slug: "", text: "Error loading headlines" }]);
//       }
//     };
 
//     fetchHeadline();
//   }, [currentLanguage]);
 
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const res = await getStatesByCountry("687a1e2185f0230715032380");
//         if (res?.success) setAllStates(res.data);
//       } catch {}
//     };
//     fetchStates();
//   }, []);
 
//   useEffect(() => {
//     const fetchAllCategories = async () => {
//       try {
//         const res = await getCategories();
//         if (res?.success) {
//           const staticNames = sidebarOptions.map(opt => opt.key.toLowerCase());
//           const filteredCats = res.data.filter(cat =>
//              !staticNames.includes(cat.name.toLowerCase())
//           );
//           setAllCategories(filteredCats);
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories", error);
//       }
//     };
//     fetchAllCategories();
//   }, []);
 
//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
 
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
//         setIsStateDropdownOpen(false);
//       }
//       if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) {
//         setIsOtherDropdownOpen(false);
//       }
//       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
//         setIsProfileDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
 
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setLoggedInUser(null);
//     setIsProfileDropdownOpen(false);
//     navigate("/");
//     window.location.reload();
//   };

//   // ✅ Calculate top gap dynamically
//   // If ad exists, we don't need 'top: 5' on container because ad takes space. 
//   // If no ad, we keep 'top: 5' as per original design.
//   const containerTop = topAd ? 0 : 5;

//   return (
//     <>
//       <GoogleTranslateWidget />
 
//       {/* ✅ NEW: Wrapper for Ad + Blue Header */}
//       {/* This wrapper handles the fixed position and scrolling behavior for both */}
//       <div
//         style={{
//           position: "fixed",
//           top: containerTop,
//           left: 0,
//           right: 0,
//           zIndex: 2000,
//           transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
//           transition: "transform 0.4s ease-in-out",
//           backgroundColor: topAd ? "#fff" : "transparent" // Prevents transparency issues behind ad
//         }}
//       >
        
//         {/* ✅ ADVERTISEMENT SECTION */}
//         {topAd && (
//           <div className="d-flex flex-column align-items-center w-100 bg-white">
//             <div
//               style={{
//                 maxWidth: "728px",
//                 width: "100%",
//                 aspectRatio: "728 / 90",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 overflow: "hidden"
//               }}
//             >
//               {topAd.mediaType === "image" && (
//                 <a
//                   href={topAd.link || "#"}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{ width: "100%", height: "100%", display: "block" }}
//                 >
//                   <img
//                     src={topAd.mediaUrl}
//                     alt={topAd.title || "Advertisement"}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "contain"
//                     }}
//                   />
//                 </a>
//               )}
//             </div>
//             {/* ✅ 5px GAP between Ad and Blue Header */}
//             <div style={{ height: "5px", width: "100%", backgroundColor: "white" }}></div>
//           </div>
//         )}

//         {/* ✅ BLUE HEADER (Now inside the wrapper) */}
//         <div
//           style={{
//             backgroundColor: "#0d2d62",
//             color: "white",
//             height: "40px",
//             // position: fixed removed from here because parent is fixed
//             width: "100%"
//           }}
//         >
//           <Container fluid className="d-flex justify-content-between align-items-center py-1 px-3">
//             <div className="d-flex align-items-center" style={{ marginLeft: "70px" }}>
//               <Button
//                 variant="link"
//                 className="text-white fw-bold p-0 me-3"
//                 onClick={() => changeAppLanguage("hi")}
//                 style={{ textDecoration: currentLanguage === "hi" ? "underline" : "none" }}
//               >
//                 हिंदी
//               </Button>
//               <Button
//                 variant="link"
//                 className="text-white fw-bold p-0"
//                 onClick={() => changeAppLanguage("en")}
//                 style={{ textDecoration: currentLanguage === "en" ? "underline" : "none" }}
//               >
//                 English
//               </Button>
//             </div>
 
//             <div className="d-flex align-items-center">
//               <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaFacebookF size={16} /></a>
//               <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaXTwitter size={16} /></a>
//               <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaYoutube size={16} /></a>
//               <a href="#" className="text-white mx-2 d-none d-md-inline-block"><FaInstagram size={16} /></a>
 
//               <div ref={profileDropdownRef} className="position-relative ms-3">
//                 {loggedInUser ? (
//                   <Button
//                     variant="link"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setIsProfileDropdownOpen((prev) => !prev);
//                     }}
//                     className="p-0 border-0 d-flex align-items-center text-decoration-none"
//                   >
//                     {loggedInUser.profileImage ? (
//                       <img
//                         src={loggedInUser.profileImage}
//                         alt={loggedInUser.name}
//                         className="rounded-circle"
//                         style={{ width: "28px", height: "28px", objectFit: "cover" }}
//                       />
//                     ) : (
//                       <FaUserCircle size={28} color="white" />
//                     )}
//                     <span className="ms-2 text-white fw-bold d-none d-lg-inline">
//                       {loggedInUser.name.split(" ")[0]}
//                     </span>
//                   </Button>
//                 ) : (
//                   <Link
//                     to="/login"
//                     className="d-flex align-items-center text-decoration-none text-white fw-bold me-3 ms-3"
//                   >
//                     <img src={loginIcon} alt="Login" height="28" className="me-1" />
//                     <span>{t.login}</span>
//                   </Link>
//                 )}
 
//                 {isProfileDropdownOpen && loggedInUser && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "100%",
//                       right: 0,
//                       backgroundColor: "#0d2d62",
//                       color: "white",
//                       padding: "8px 0",
//                       minWidth: "120px",
//                       borderRadius: "4px",
//                       zIndex: 2001,
//                     }}
//                   >
//                     <Link
//                       to="/profile"
//                       className="d-block text-white text-decoration-none px-3 py-1"
//                       onClick={() => setIsProfileDropdownOpen(false)}
//                     >
//                       {t.profile}
//                     </Link>
//                     <Button
//                       variant="link"
//                       className="d-block text-white text-decoration-none w-100 text-start px-3 py-1"
//                       onClick={handleLogout}
//                     >
//                       {t.logout}
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Container>
//         </div>
//       </div>
 
//       {/* ✅ DYNAMIC SPACER: Pushes content down based on Ad presence */}
//       {/* 
//           If Ad exists: ~90px (Ad) + 5px (Gap) + 40px (Blue Header) = ~135-140px margin 
//           If No Ad: 40px margin (Default)
//       */}
//       <div style={{ marginTop: topAd ? "140px" : "40px" }} />
 
//       {/* White Header */}
//       <div className="bg-white border-bottom" style={{ transition: "all 0.5s ease-in-out" }}>
//         <Container fluid className="d-flex justify-content-between align-items-center py-2 px-3">
//           <Link to="/" className="d-flex flex-column align-items-center text-decoration-none" style={{ zIndex: 2100 }}>
//             <video src="/logogif.mp4" autoPlay loop muted style={{ width: "60px", marginRight: "3px", zIndex: 2100, transform: isScrolled ? "translateY(0)" : "translateY(-60px)", transition: "transform 0.5s ease-in-out" }} />
//             <img src={logoT} alt="EMS Tagline" style={{ height: "5px", transform: isScrolled ? "translateY(0)" : "translateY(-60px)", transition: "transform 0.5s ease-in-out" }} />
//           </Link>
 
//           {/* Center Menu */}
//           <Nav className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold" style={{ gap: "45px" }}>
//             {sidebarOptions.map((opt, index) =>
//               opt.isDropdown ? (
//                 <div key={index} ref={stateDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
//                   <span onClick={() => setIsStateDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
//                     {t[opt.key]} ▾
//                   </span>
//                   {isStateDropdownOpen && (
//                     <div style={{
//                         position: "absolute",
//                         top: "100%",
//                         left: 0,
//                         backgroundColor: "#c82333",
//                         color: "white",
//                         padding: "6px",
//                         minWidth: "540px",
//                         display: "grid",
//                         gridTemplateColumns: "repeat(3, 1fr)",
//                         gap: "4px",
//                         zIndex: 999
//                     }}>
//                       {allStates.map((state) => (
//                         <NavLink
//                           key={state._id}
//                           to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
//                           className="text-white text-decoration-none"
//                           style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
//                           onClick={() => setIsStateDropdownOpen(false)}
//                         >
//                           {state.name}
//                         </NavLink>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <NavLink key={index} to={opt.path} className="text-decoration-none text-black" style={{ fontWeight: 600 }}>
//                   {t[opt.key]}
//                 </NavLink>
//               )
//             )}
 
//             <div ref={otherDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
//               <span onClick={() => setIsOtherDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>
//                 {t.other} ▾
//               </span>
//               {isOtherDropdownOpen && (
//                 <div style={{
//                     position: "absolute",
//                     top: "100%",
//                     right: 0,
//                     left: "auto",
//                     backgroundColor: "#c82333",
//                     color: "white",
//                     padding: "6px",
//                     minWidth: "540px",
//                     display: "grid",
//                     gridTemplateColumns: "repeat(3, 1fr)",
//                     gap: "4px",
//                     zIndex: 999,
//                     boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
//                 }}>
//                   {allCategories.length > 0 ? (
//                     allCategories.map((cat) => (
//                       <NavLink
//                         key={cat._id}
//                         to={`/category/${cat.name}`}
//                         className="text-white text-decoration-none"
//                         style={{ padding: "6px 8px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", display: "block" }}
//                         onClick={() => setIsOtherDropdownOpen(false)}
//                       >
//                         {cat.name}
//                       </NavLink>
//                     ))
//                   ) : (
//                     <span className="text-white p-2" style={{fontSize: '14px'}}>Loading...</span>
//                   )}
//                 </div>
//               )}
//             </div>
//           </Nav>
 
//           {/* Right Icons */}
//           <Nav className="d-flex flex-row align-items-center gap-3 gap-md-4">
//             <HeaderActionIcon icon={epaperIcon} text={t.epaper} link="http://www.jabalpurexpress.com/" />
//             <HeaderActionIcon icon={searchIcon} text={t.search} link="/search" />
//             <HeaderActionIcon icon={emstvIcon} text={t.emstv} link="/emstv" />
//             <HeaderActionIcon icon={directoryIcon} text={t.directory} link="/directory" />
//             <HeaderActionIcon icon={<MdOutlineSubscriptions color="#c41229ff" />} text={t.subscriber} link="https://services.emsindia.com/public/authentication/admin_login" isReactIcon size={28} />
//           </Nav>
//         </Container>
//       </div>
 
//       {/* Live News */}
//       <div className="bg-white border-top border-bottom">
//         <Container fluid className="d-flex align-items-center p-0">
//           <div className="d-flex align-items-center px-2 py-1" style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}>
//             <Button variant="link" className="text-white me-2 p-0" onClick={toggleSidebar} style={{ fontSize: "20px" }}>
//               <FaBars />
//             </Button>
//             <span className="text-white fw-bold px-2 py-0" style={{ minWidth: "120px", fontSize: "14px" }}>
//               {t.liveNews}
//             </span>
//           </div>
 
//           <marquee
//             behavior="scroll"
//             direction="left"
//             className="fw-bold py-1"
//             style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}
//           >
//             {headlineData.map((headline) => (
//               <Link
//                 key={headline.id}
//                 to={headline.slug ? `/news/${headline.slug}` : "#"}
//                 className="text-decoration-none text-dark me-4"
//                 style={{
//                   whiteSpace: "nowrap",
//                   fontWeight: "bold",
//                   pointerEvents: headline.slug ? "auto" : "none",
//                   color: headline.slug ? "#000" : "gray"
//                 }}
//               >
//                 {headline.text}
//               </Link>
//             ))}
//           </marquee>
//         </Container>
//       </div>
 
//       <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} states={allStates} />
//     </>
//   );
// };
 
// export default Header;


import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
 
// Assets
import logoT from "../../../assets/logoT.png";
import epaperIcon from "../../../assets/icons/epaper-icon.svg";
import searchIcon from "../../../assets/icons/search-icon.svg";
import emstvIcon from "../../../assets/icons/emstvIcon.png";
import directoryIcon from "../../../assets/icons/directory-icon.svg";
import loginIcon from "../../../assets/icons/login-icon.svg";
 
// Google Translate
import GoogleTranslateWidget, { useGoogleTranslate } from "../../GoogleTranslateWidget";
 
// Icons
import { FaFacebookF, FaYoutube, FaInstagram, FaUserCircle } from "react-icons/fa";
import { FaXTwitter, FaBars } from "react-icons/fa6";
import { MdOutlineSubscriptions } from "react-icons/md";
 
// Sidebar
import LeftSidebar from "../LeftSidebar";
 
// API
import { headline, getStatesByCountry, getCategories, fetchActiveAds } from "../../../Services/authApi";


const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
};

const translations = {
  en: {
    home: "Home", india: "India", state: "State", entertainment: "Entertainment",
    astrology: "Astrology", sports: "Sports", thoughts: "Thoughts", business: "Business",
    youth: "Youth", other: "Other", epaper: "E-Paper", search: "Search",
    emstv: "EMS TV", directory: "Directory", subscriber: "Subscriber",
    liveNews: "News Headline", login: "Login/Signup", profile: "Profile", logout: "Logout"
  },
  hi: {
    home: "होम", india: "देश", state: "राज्य", entertainment: "मनोरंजन",
    astrology: "ज्योतिष", sports: "खेल", thoughts: "विचार", business: "बिजनेस",
    youth: "लाइफस्टाइल", other: "अन्य", epaper: "ई-पेपर", search: "खोजें",
    emstv: "ईएमएस टीवी", directory: "डायरेक्टरी", subscriber: "सब्सक्राइबर",
    liveNews: "न्यूज़ हेडलाइंस", login: "लॉगिन/साइनअप", profile: "प्रोफ़ाइल", logout: "लॉगआउट"
  },
};
 
const sidebarOptions = [
  { key: "home", path: "/" },
  { key: "india", path: "/india" },
  { key: "state", path: "/state", isDropdown: true },
  { key: "entertainment", path: "/entertainment" },
  { key: "astrology", path: "/astrology" },
  { key: "sports", path: "/sports" },
  { key: "thoughts", path: "/thoughts" },
  { key: "business", path: "/business" },
  { key: "youth", path: "/youth" },
];
 
const HeaderActionIcon = ({ icon, text, link, isReactIcon = false, size = 28 }) => {
  const renderedIcon = isReactIcon ? React.cloneElement(icon, { size }) : <img src={icon} alt={text} height={size} width={size} />;
  const isExternalLink = link.startsWith("http://") || link.startsWith("https://");
 
  const handleExternalLinkClick = (event) => {
    if (isExternalLink) {
      event.preventDefault();
      window.open(link, "_self");
    }
  };
 
  return isExternalLink ? (
    <a href={link} onClick={handleExternalLinkClick} className="d-flex flex-column align-items-center text-decoration-none text-center" style={{ color: "#000" }}>
      {renderedIcon}
      <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>{text}</span>
    </a>
  ) : (
    <Link to={link} className="d-flex flex-column align-items-center text-decoration-none text-center" style={{ color: "#000" }}>
      {renderedIcon}
      <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>{text}</span>
    </Link>
  );
};
 
const Header = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("userLanguage") || "hi");
  const [headlineData, setHeadlineData] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [topAd, setTopAd] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
 
  const profileDropdownRef = useRef(null);
  const stateDropdownRef = useRef(null);
  const otherDropdownRef = useRef(null);
  const t = translations[currentLanguage] || translations.en;
 
  const changeAppLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem("userLanguage", lang);
    navigate("/");
    window.location.reload();
  };
 
  useEffect(() => {
    const handleScroll = () => {
      // scrollY > 20 helps detect scroll earlier and smoother
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try { setLoggedInUser(JSON.parse(userData)); } catch { setLoggedInUser(null); }
    }
  }, []);
 
  useEffect(() => {
    const loadAds = async () => {
      try {
        const res = await fetchActiveAds();
        if (res?.success && Array.isArray(res.ads)) {
          const ad = res.ads.find(item => item.position === "top");
          setTopAd(ad || null);
        }
      } catch (error) { setTopAd(null); }
    };
    loadAds();
  }, []);
 
  useEffect(() => {
    const fetchHeadline = async () => {
      try {
        const response = await headline();
        const dataArray = response?.data || [];
        const allHeadlines = dataArray
          .filter((item) => item.headlineText)
          .map((item) => ({
            id: item.newsId?._id || item._id,
            slug: item.newsId?.slug_en || "",
            text: item.headlineText.trim(),
          }));
        setHeadlineData(allHeadlines.length ? allHeadlines : [{ id: "0", slug: "", text: "No headline available" }]);
      } catch {
        setHeadlineData([{ id: "0", slug: "", text: "Error loading headlines" }]);
      }
    };
    fetchHeadline();
  }, [currentLanguage]);
 
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await getStatesByCountry("687a1e2185f0230715032380");
        if (res?.success) setAllStates(res.data);
      } catch {}
    };
    fetchStates();
  }, []);
 
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await getCategories();
        if (res?.success) {
          const staticNames = sidebarOptions.map(opt => opt.key.toLowerCase());
          const filteredCats = res.data.filter(cat => !staticNames.includes(cat.name.toLowerCase()));
          setAllCategories(filteredCats);
        }
      } catch {}
    };
    fetchAllCategories();
  }, []);
 
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) setIsStateDropdownOpen(false);
      if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) setIsOtherDropdownOpen(false);
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) setIsProfileDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setLoggedInUser(null);
    setIsProfileDropdownOpen(false);
    navigate("/");
    window.location.reload();
  };

  const containerTop = topAd ? 0 : 0; // Removed the 5px top gap to prevent jumping

  return (
    <>
      <GoogleTranslateWidget />
 
      {/* Blue Header + Ad Wrapper */}
      <div
        style={{
          position: "fixed",
          top: containerTop,
          left: 0,
          right: 0,
          zIndex: 2000,
          // scroll behavior: direct move up
          transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.3s ease-in-out", 
          backgroundColor: "#fff" 
        }}
      >
        {topAd && (
          <div className="d-flex flex-column align-items-center w-100 bg-white">
            <div style={{ maxWidth: "728px", width: "100%", aspectRatio: "728 / 90", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
              {topAd.mediaType === "image" && (
                <a href={topAd.link || "#"} target="_blank" rel="noopener noreferrer" style={{ width: "100%", height: "100%", display: "block" }}>
                  <img src={topAd.mediaUrl} alt={topAd.title || "Advertisement"} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </a>
              )}
            </div>
            <div style={{ height: "5px", width: "100%", backgroundColor: "white" }}></div>
          </div>
        )}

        {/* BLUE HEADER */}
        <div style={{ backgroundColor: "#0d2d62", color: "white", height: "40px", width: "100%" }}>
          <Container fluid className="d-flex justify-content-between align-items-center py-1 px-3">
            <div className="d-flex align-items-center" style={{ marginLeft: "70px" }}>
              <Button variant="link" className="text-white fw-bold p-0 me-3" onClick={() => changeAppLanguage("hi")} style={{ textDecoration: currentLanguage === "hi" ? "underline" : "none" }}>हिंदी</Button>
              <Button variant="link" className="text-white fw-bold p-0" onClick={() => changeAppLanguage("en")} style={{ textDecoration: currentLanguage === "en" ? "underline" : "none" }}>English</Button>
            </div>
            <div className="d-flex align-items-center">
              <a href="https://www.facebook.com/profile.php?id=100064235764414" className="text-white mx-2 d-none d-md-inline-block"><FaFacebookF size={16} /></a>
              <a href="https://x.com/EmstvI" className="text-white mx-2 d-none d-md-inline-block"><FaXTwitter size={16} /></a>
              <a href="https://www.youtube.com/@emstvindia" className="text-white mx-2 d-none d-md-inline-block"><FaYoutube size={16} /></a>
              <a href="https://www.instagram.com/emstvmp" className="text-white mx-2 d-none d-md-inline-block"><FaInstagram size={16} /></a>
              <div ref={profileDropdownRef} className="position-relative ms-3">
                {loggedInUser ? (
                  <Button variant="link" onClick={(e) => { e.stopPropagation(); setIsProfileDropdownOpen((prev) => !prev); }} className="p-0 border-0 d-flex align-items-center text-decoration-none">
                    {loggedInUser.profileImage ? <img src={loggedInUser.profileImage} alt={loggedInUser.name} className="rounded-circle" style={{ width: "28px", height: "28px", objectFit: "cover" }} /> : <FaUserCircle size={28} color="white" />}
                    <span className="ms-2 text-white fw-bold d-none d-lg-inline">{loggedInUser.name.split(" ")[0]}</span>
                  </Button>
                ) : (
                  <Link to="/login" className="d-flex align-items-center text-decoration-none text-white fw-bold me-3 ms-3">
                    <img src={loginIcon} alt="Login" height="28" className="me-1" />
                    <span>{t.login}</span>
                  </Link>
                )}
                {isProfileDropdownOpen && loggedInUser && (
                  <div style={{ position: "absolute", top: "100%", right: 0, backgroundColor: "#0d2d62", color: "white", padding: "8px 0", minWidth: "120px", borderRadius: "4px", zIndex: 2001 }}>
                    <Link to="/profile" className="d-block text-white text-decoration-none px-3 py-1" onClick={() => setIsProfileDropdownOpen(false)}>{t.profile}</Link>
                    <Button variant="link" className="d-block text-white text-decoration-none w-100 text-start px-3 py-1" onClick={handleLogout}>{t.logout}</Button>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>
 
      {/* Spacer to push content down */}
      <div style={{ marginTop: topAd ? "135px" : "40px" }} />
 
      {/* White Header (Navigation) */}
      <div className="bg-white border-bottom sticky-top" style={{ zIndex: 1020 }}>
        <Container fluid className="d-flex justify-content-between align-items-center py-2 px-3">
          {/* LOGO FIXED HERE - No more translateY animation */}
          <Link to="/" className="d-flex flex-column align-items-center text-decoration-none">
            <video src="/logogif.mp4" autoPlay loop muted style={{ width: "60px", marginBottom: "2px" }} />
            <img src={logoT} alt="EMS Tagline" style={{ height: "5px" }} />
          </Link>
 
          {/* Center Menu */}
          <Nav className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold" style={{ gap: "45px" }}>
            {sidebarOptions.map((opt, index) =>
              opt.isDropdown ? (
                <div key={index} ref={stateDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
                  <span onClick={() => setIsStateDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>{t[opt.key]} ▾</span>
                  {isStateDropdownOpen && (
                    <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#c82333", color: "white", padding: "6px", minWidth: "540px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px", zIndex: 999 }}>
                      {allStates.map((state) => (
                        <NavLink key={state._id} to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`} className="text-white text-decoration-none" style={{ padding: "6px 8px", fontSize: "14px", borderRadius: "4px" }} onClick={() => setIsStateDropdownOpen(false)}>{state.name}</NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink key={index} to={opt.path} className="text-decoration-none text-black" style={{ fontWeight: 600 }}>{t[opt.key]}</NavLink>
              )
            )}
            <div ref={otherDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
              <span onClick={() => setIsOtherDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>{t.other} ▾</span>
              {isOtherDropdownOpen && (
  <div
    style={{
      position: "absolute",
      top: "100%",
      right: 0,
      backgroundColor: "#c82333",
      color: "white",
      padding: "8px 0",
      minWidth: "200px",
      display: "flex",
      flexDirection: "column",
      zIndex: 999,
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
    }}
  >
                  {allCategories.length > 0 ? allCategories.map((cat) => (
                    <NavLink key={cat._id} to={`/category/${cat.name}`} className="text-white text-decoration-none" style={{ padding: "6px 8px", fontSize: "14px" }} onClick={() => setIsOtherDropdownOpen(false)}>{cat.name}</NavLink>
                  )) : <span className="text-white p-2">Loading...</span>}
                </div>
              )}
            </div>
          </Nav>
 
          {/* Right Icons */}
          <Nav className="d-flex flex-row align-items-center gap-3 gap-md-4">
            <HeaderActionIcon icon={epaperIcon} text={t.epaper} link="http://www.jabalpurexpress.com/" />
            <HeaderActionIcon icon={searchIcon} text={t.search} link="/search" />
            <HeaderActionIcon icon={emstvIcon} text={t.emstv} link="/emstv" />
            <HeaderActionIcon icon={directoryIcon} text={t.directory} link="/directory" />
            <HeaderActionIcon icon={<MdOutlineSubscriptions color="#c41229ff" />} text={t.subscriber} link="https://services.emsindia.com/public/authentication/admin_login" isReactIcon size={28} />
          </Nav>
        </Container>
      </div>
 
      {/* Live News */}
      <div className="bg-white border-top border-bottom">
        <Container fluid className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center px-2 py-1" style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}>
            <Button variant="link" className="text-white me-2 p-0" onClick={toggleSidebar} style={{ fontSize: "20px" }}><FaBars /></Button>
            <span className="text-white fw-bold px-2 py-0" style={{ minWidth: "120px", fontSize: "14px" }}>{t.liveNews}</span>
          </div>
          {/* <marquee behavior="scroll" direction="left" className="fw-bold py-1" style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}>
            {headlineData.map((headline) => (
              <Link key={headline.id} to={headline.slug ? `/news/${headline.slug}` : "#"} className="text-decoration-none text-dark me-4" style={{ whiteSpace: "nowrap", fontWeight: "bold", pointerEvents: headline.slug ? "auto" : "none", color: headline.slug ? "#000" : "gray" }}>{headline.text}</Link>
            ))}
          </marquee> */}

          <marquee
  behavior="scroll"
  direction="left"
  className="fw-bold py-1"
  style={{ flexGrow: 1, color: "#333", marginLeft: "8px" }}
>
  {headlineData.map((headline) => (
    <Link
      key={headline.id}
      to={headline.slug ? `/news/${headline.slug}` : "#"}
      className="text-decoration-none text-dark me-4"
      style={{
        whiteSpace: "nowrap",
        fontWeight: "bold",
        pointerEvents: headline.slug ? "auto" : "none",
        color: headline.slug ? "#000" : "gray",
        display: "inline-block"
      }}
    >
      {stripHtml(headline.text)}
    </Link>
  ))}
</marquee>
        </Container>
      </div>
 
      <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} states={allStates} />
    </>
  );
};
 
export default Header;