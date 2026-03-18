 
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Image,
//   Spinner,
//   Alert,
//   Badge
// } from "react-bootstrap";
// import { getLiveNewsById } from "../../Services/authApi";
 
// // ---------------------------
// // Time Ago Function (remains unchanged)
// // ---------------------------
// const timeAgo = (date) => {
//   const now = new Date();
//   const past = new Date(date);
//   const diff = Math.floor((now - past) / 1000);
 
//   if (diff < 60) return "Just now";
//   if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
 
//   return `${Math.floor(diff / 86400)} days ago`;
// };
 
// // ---------------------------
// // Media Renderer (remains unchanged)
// // ---------------------------
// const MediaRenderer = ({ url, type, height }) => {
//   const fallback = "/logogif.mp4"; // public folder fallback
 
//   const finalURL = url || fallback;
//   const finalType = url ? type : "video";
 
//   return finalType === "video" ? (
//     <video
//       src={finalURL}
//       width="100%"
//       height={height}
//       autoPlay
//       muted
//       loop
//       controls={url ? true : false}
//          style={{
//         objectFit: url ? "cover" : "contain",
//         background: "black",
//         borderRadius: "8px",
//       }}
//     />
//   ) : (
//     <Image
//       src={finalURL}
//       width="100%"
//       height={height}
//       style={{ objectFit: "cover", borderRadius: "8px" }}
//     />
//   );
// };
 
// // ---------------------------
// // Main Component
// // ---------------------------
// const LiveNewsDetails = () => {
//   const { id } = useParams();
//   const [liveNews, setLiveNews] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState("");
 
//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await getLiveNewsById(id);
//         if (res.success) setLiveNews(res.data);
//         else setErrorMsg(res.message);
//       } catch (err) {
//         setErrorMsg(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetails();
//   }, [id]);
 
//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" />
//         <p>Loading Live News...</p>
//       </div>
//     );
 
//   if (errorMsg)
//     return (
//       <Container className="mt-4">
//         <Alert variant="danger">{errorMsg}</Alert>
//       </Container>
//     );
 
//   if (!liveNews)
//     return (
//       <Container className="mt-4">
//         <Alert variant="warning">Live news not available.</Alert>
//       </Container>
//     );
 
//   const mainMedia =
//     liveNews.coverImage?.url ||
//     liveNews.updates?.[0]?.media?.[0]?.url ||
//     null;
 
//   const mainType =
//     liveNews.coverImage ? "image" : liveNews.updates?.[0]?.media?.[0]?.type;
 
//   // Custom CSS for the timeline (IDEALLY, this should be in a separate .css file)
//   const timelineStyles = `
//     .timeline-wrapper {
//       position: relative;
//       padding-left: 30px; /* Space for the line and dots */
//     }
 
//     .timeline-wrapper::before {
//       content: '';
//       position: absolute;
//       top: 0;
//       bottom: 0;
//       left: 10px; /* Vertical line position */
//       width: 2px;
//       background-color: #0d6efd; /* Bootstrap primary blue */
//     }
 
//     .timeline-item-wrapper {
//       position: relative;
//       margin-bottom: 25px;
//       display: flex;
//       align-items: flex-start; /* Align dot and content start at the top */
//     }
 
//     .timeline-dot-indicator {
//       position: absolute;
//       left: 4px; /* Adjust to align with the vertical line (10px center of 12px dot = 4px left) */
//       top: 3px; /* Adjust to vertically align with the time text, considering small font-size */
//       width: 12px;
//       height: 12px;
//       border-radius: 50%;
//       background-color: #0d6efd; /* Bootstrap primary blue */
//       border: 2px solid white; /* To make it stand out on the line */
//       z-index: 1; /* Ensure dot is above the line */
//     }
 
//     .timeline-content-block {
//       flex-grow: 1;
//       margin-left: 20px; /* Space between dot and content */
//     }
 
//     .timeline-card {
//       border: 1px solid #e0e0e0;
//       border-radius: 8px;
//       background-color: #f8f9fa; /* bg-light */
//     }
 
//     /* Ensure MediaRenderer's internal video/image respects the card's rounded corners */
//     .timeline-card .MediaRenderer video,
//     .timeline-card .MediaRenderer img {
//         border-radius: 8px;
//     }
//     .bi-share {
//         cursor: pointer;
//         color: #6c757d; /* Muted color for the icon */
//     }
//     .bi-share:hover {
//         color: #0d6efd; /* Hover effect */
//     }
//   `;
 
//   return (
//     <Container className="mt-4" style={{ maxWidth: "900px" }}>
//       {/* Headline */}
//       <h3 className="fw-bold" style={{ lineHeight: "1.4" }}>
//         {liveNews.title_hi}
//       </h3>
 
//       <div className="d-flex gap-2 align-items-center mt-1">
//         <small className="text-muted">
//           {liveNews.createdBy?.name || "EMS News"} •{" "}
//           {timeAgo(liveNews.createdAt)}
//         </small>
//         <Badge bg="danger">LIVE</Badge>
//       </div>
 
//       {/* Main Media */}
//       <div className="mt-3">
//         <MediaRenderer url={mainMedia} type={mainType} height="350px" />
//       </div>
 
//       {/* Main Content */}
//       <p className="mt-3" style={{ fontSize: "18px", lineHeight: 1.6 }}>
//         {liveNews.summary_hi}
//       </p>
 
//       {/* Full Content */}
//       {liveNews.content_hi && (
//         <div
//           className="mt-3"
//           dangerouslySetInnerHTML={{ __html: liveNews.content_hi }}
//         ></div>
//       )}
 
//       <hr />
 
//       {/* Updates Section */}
//       <h5 className="fw-bold mb-3">लाइव अपडेट्स</h5>
 
//       {liveNews.updates?.length === 0 && (
//         <Alert variant="info">No live updates yet.</Alert>
//       )}
 
//       {/* Embedding styles for demonstration. In production, use a separate CSS file. */}
//       <style>{timelineStyles}</style>
 
//       <div className="timeline-wrapper">
//         {liveNews.updates?.map((u, index) => {
//           const uMedia = u.media?.[0]?.url || null;
//           const uType = u.media?.[0]?.type || "video";
 
//           return (
//             <div key={index} className="timeline-item-wrapper">
//               {/* The dot for this item */}
//               <div className="timeline-dot-indicator"></div>
 
//               {/* The content for this item */}
//               <div className="timeline-content-block">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <small className="text-muted">{timeAgo(u.createdAt)}</small>
//                   {/* Share Icon (using a Bootstrap Icons SVG for demonstration) */}
//                   {/* In a real project, consider using a React icon library like react-bootstrap-icons */}
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
//                     <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
//                   </svg>
//                 </div>
//                 <div className="timeline-card p-3 shadow-sm rounded bg-light">
//                   <p className="fw-bold mb-2">{u.text_hi}</p>
//                   {uMedia && (
//                     <div className="mt-2">
//                       <MediaRenderer url={uMedia} type={uType} height="150px" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </Container>
//   );
// };
 
// export default LiveNewsDetails;
 
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Container,
//   Image,
//   Spinner,
//   Alert,
//   Badge
// } from "react-bootstrap";
// import { getLiveNewsById } from "../../Services/authApi";

// const timeAgo = (date) => {
//   const now = new Date();
//   const past = new Date(date);
//   const diff = Math.floor((now - past) / 1000);

//   if (diff < 60) return "Just now";
//   if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;

//   return `${Math.floor(diff / 86400)} days ago`;
// };

// const MediaRenderer = ({ url, type, height }) => {
//   const fallback = "/logogif.mp4";
//   const finalURL = url || fallback;
//   const finalType = url ? type : "video";

//   return finalType === "video" ? (
//     <video
//       src={finalURL}
//       width="100%"
//       height={height}
//       autoPlay
//       muted
//       loop
//       controls={url ? true : false}
//       style={{
//         objectFit: url ? "cover" : "contain",
//         background: "black",
//         borderRadius: "8px",
//       }}
//     />
//   ) : (
//     <Image
//       src={finalURL}
//       width="100%"
//       height={height}
//       style={{ objectFit: "cover", borderRadius: "8px" }}
//     />
//   );
// };

// const LiveNewsDetails = () => {
//   const { id } = useParams();
//   const [liveNews, setLiveNews] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState("");

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await getLiveNewsById(id);
//         if (res.success) setLiveNews(res.data);
//         else setErrorMsg(res.message);
//       } catch (err) {
//         setErrorMsg(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetails();
//   }, [id]);

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" />
//         <p>Loading Live News...</p>
//       </div>
//     );

//   if (errorMsg)
//     return (
//       <Container className="mt-4">
//         <Alert variant="danger">{errorMsg}</Alert>
//       </Container>
//     );

//   if (!liveNews)
//     return (
//       <Container className="mt-4">
//         <Alert variant="warning">Live news not available.</Alert>
//       </Container>
//     );

//   const mainMedia =
//     liveNews.coverImage?.url ||
//     liveNews.updates?.[0]?.media?.[0]?.url ||
//     null;

//   const mainType =
//     liveNews.coverImage ? "image" : liveNews.updates?.[0]?.media?.[0]?.type;

//   return (
//     <Container className="mt-4" style={{ maxWidth: "900px" }}>

//       {/* TIMELINE CSS */}
//       <style>
//         {`
//           .timeline-wrapper {
//             position: relative;
//             padding-left: 30px;
//           }

//           .timeline-wrapper::before {
//             content: '';
//             position: absolute;
//             top: 0;
//             bottom: 0;
//             left: 10px;
//             width: 2px;
//             background-color: #d00000;
//             z-index: 5;
//           }

//           .timeline-item {
//             position: relative;
//             margin-bottom: 30px;
//           }

//           .timeline-dot {
//             width: 12px;
//             height: 12px;
//             background: #d00000;
//             border-radius: 50%;
//             position: absolute;
//             left: 4px;
//             top: 0px;
//             z-index: 10;
//           }

//           .timeline-card {
//             background: white;
//             border-radius: 8px;
//             padding: 10px;
//             margin-left: 20px;
//             border: 1px solid #eee;
//           }
//         `}
//       </style>

//       {/* HEADLINE */}
//       <h3 className="fw-bold" style={{ lineHeight: "1.4" }}>
//         {liveNews.title_hi}
//       </h3>

//       <div className="d-flex gap-2 align-items-center mt-1">
//         <small className="text-muted">
//           {liveNews.createdBy?.name || "EMS News"} • {timeAgo(liveNews.createdAt)}
//         </small>
//         <Badge bg="danger">LIVE</Badge>
//       </div>

//       {/* MAIN MEDIA */}
//       <div className="mt-3">
//         <MediaRenderer url={mainMedia} type={mainType} height="350px" />
//       </div>

//       {/* SUMMARY */}
//       <p className="mt-3" style={{ fontSize: "18px", lineHeight: 1.6 }}>
//         {liveNews.summary_hi}
//       </p>

//       {/* FULL CONTENT */}
//       {liveNews.content_hi && (
//         <div
//           className="mt-3"
//           dangerouslySetInnerHTML={{ __html: liveNews.content_hi }}
//         ></div>
//       )}

//       <hr />

//       <h5 className="fw-bold mb-3">लाइव अपडेट्स</h5>

//       {/* TIMELINE */}
//       <div className="timeline-wrapper">
//         {liveNews.updates?.map((u, index) => {
//           const uMedia = u.media?.[0]?.url || null;
//           const uType = u.media?.[0]?.type || "video";

//           return (
//             <div key={index} className="timeline-item">

//               {/* DOT */}
//               <div className="timeline-dot"></div>

//               {/* TIME – background removed + dot ke baad */}
//               <div
//                 style={{
//                   position: "relative",
//                   left: "25px",
//                   top: "-5px",
//                   background: "none",
//                   color: "black",
//                   padding: 0,
//                   fontSize: "12px",
//                   fontWeight: 600,
//                 }}
//               >
//                 {timeAgo(u.createdAt)}
//               </div>

//               {/* CONTENT CARD */}
//               <div className="timeline-card">
//                 <p className="fw-bold mb-2">{u.text_hi}</p>

//                 {uMedia && (
//                   <div className="mt-2">
//                     <MediaRenderer url={uMedia} type={uType} height="100%" />
//                   </div>
//                 )}
//               </div>

//             </div>
//           );
//         })}
//       </div>
//     </Container>
//   );
// };

// export default LiveNewsDetails;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Image, Spinner, Alert, Badge } from "react-bootstrap";
// import { getLiveNewsById } from "../../Services/authApi";
 
// const timeAgo = (date) => {
//   const now = new Date();
//   const past = new Date(date);
//   const diff = Math.floor((now - past) / 1000);
//   if (diff < 60) return "Just now";
//   if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
//   return `${Math.floor(diff / 86400)} days ago`;
// };
 
// const MediaRenderer = ({ url, type, height }) => {
//   const fallback = "/logogif.mp4";
//   const finalURL = url || fallback;
//   const finalType = url ? type : "video";
 
//   return finalType === "video" ? (
//     <video
//       src={finalURL}
//       width="100%"
//       height={height}
//       autoPlay
//       muted
//       loop
//       controls={url ? true : false}
//       style={{
//         objectFit: url ? "cover" : "contain",
//         background: "black",
//         borderRadius: "8px",
//       }}
//     />
//   ) : (
//     <Image
//       src={finalURL}
//       width="100%"
//       height={height}
//       style={{ objectFit: "cover", borderRadius: "8px" }}
//     />
//   );
// };
 
// const LiveNewsDetails = () => {
//   const { slug } = useParams();
//   const id = slug.slice(-24);
 
//   const [liveNews, setLiveNews] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState("");
 
//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await getLiveNewsById(id);
//         if (res.success) setLiveNews(res.data);
//         else setErrorMsg(res.message);
//       } catch (err) {
//         setErrorMsg(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetails();
//   }, [id]);
 
//   if (loading)
//     return (
//       <div className="text-center my-5">
//         <Spinner animation="border" />
//         <p>Loading Live News...</p>
//       </div>
//     );
 
//   if (errorMsg)
//     return (
//       <Container className="mt-4">
//         <Alert variant="danger">{errorMsg}</Alert>
//       </Container>
//     );
 
//   if (!liveNews)
//     return (
//       <Container className="mt-4">
//         <Alert variant="warning">Live news not available.</Alert>
//       </Container>
//     );
 
//   const mainMedia =
//     liveNews.coverImage?.url || liveNews.updates?.[0]?.media?.[0]?.url || null;
//   const mainType = liveNews.coverImage
//     ? "image"
//     : liveNews.updates?.[0]?.media?.[0]?.type;
 
//   return (
//     <Container className="mt-4" style={{ maxWidth: "900px" }}>
//       {/* Headline */}
//       <h3 className="fw-bold" style={{ lineHeight: 1.4 }}>
//         {liveNews.title_hi}
//       </h3>
//       <div className="d-flex gap-2 align-items-center mt-2">
//         <small className="text-muted">
//           {liveNews.createdBy?.name || "EMS News"} • {timeAgo(liveNews.createdAt)}
//         </small>
//         <Badge bg="danger">LIVE</Badge>
//       </div>
 
//       {/* Main Media */}
//       <div className="mt-3">
//         <MediaRenderer url={mainMedia} type={mainType} height="350px" />
//       </div>
 
//       {/* Summary */}
//       <p className="mt-3" style={{ fontSize: "18px", lineHeight: 1.6 }}>
//         {liveNews.summary_hi}
//       </p>
 
//       {/* Full Content */}
//       {liveNews.content_hi && (
//         <div
//           className="mt-3"
//           dangerouslySetInnerHTML={{ __html: liveNews.content_hi }}
//         />
//       )}
 
//       <hr />
 
//       {/* Timeline */}
//       <h5 className="fw-bold mb-3">लाइव अपडेट्स</h5>
//       <div
//         className="timeline-wrapper"
//         style={{
//           position: "relative",
//           paddingLeft: "30px",
//           borderLeft: "2px solid #d00000",
//         }}
//       >
//         {liveNews.updates?.map((u, index) => {
//           const uMedia = u.media?.[0]?.url || null;
//           const uType = u.media?.[0]?.type || "video";
//           return (
//             <div
//               key={index}
//               className="timeline-item"
//               style={{ position: "relative", marginBottom: "30px" }}
//             >
//               <div
//                 className="timeline-dot"
//                 style={{
//                   width: "12px",
//                   height: "12px",
//                   background: "#d00000",
//                   borderRadius: "50%",
//                   position: "absolute",
//                   left: "-7px",
//                   top: "0",
//                   zIndex: 10,
//                 }}
//               />
//               <div
//                 style={{
//                   position: "relative",
//                   left: "15px",
//                   top: "-5px",
//                   fontSize: "12px",
//                   fontWeight: 600,
//                 }}
//               >
//                 {timeAgo(u.createdAt)}
//               </div>
//               <div
//                 className="timeline-card"
//                 style={{
//                   background: "white",
//                   borderRadius: "8px",
//                   padding: "12px",
//                   marginLeft: "20px",
//                   border: "1px solid #eee",
//                   boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//                 }}
//               >
//                 <p className="fw-bold mb-2">{u.text_hi}</p>
//                 {uMedia && <MediaRenderer url={uMedia} type={uType} height="100%" />}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </Container>
//   );
// };
 
// export default LiveNewsDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Image, Spinner, Alert, Badge } from "react-bootstrap";
import { getLiveNewsById } from "../../Services/authApi";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure icons are imported

// --- Helper: Clean HTML for Responsive Images ---
const cleanHtmlForImages = (htmlString) => {
  if (!htmlString) return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const images = doc.querySelectorAll('img');
  images.forEach(img => {
    img.removeAttribute('width');
    img.removeAttribute('height');
    if (img.style.width) img.style.width = ''; 
    if (img.style.height) img.style.height = ''; 
    img.classList.add('img-fluid', 'rounded', 'my-2'); // Bootstrap classes
  });
  return doc.body.innerHTML;
};

// --- Helper: Time Ago ---
const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now - past) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

// --- Component: Media Renderer ---
const MediaRenderer = ({ url, type }) => {
  if (!url) return null;

  return type === "video" ? (
    <video
      src={url}
      className="w-100 rounded mb-3"
      autoPlay
      muted
      loop
      controls
      style={{
        maxHeight: "500px",
        objectFit: "cover",
        backgroundColor: "#000",
      }}
    />
  ) : (
    <Image
      src={url}
      className="w-100 rounded mb-3"
      fluid
      style={{ maxHeight: "500px", objectFit: "cover" }}
    />
  );
};

const LiveNewsDetails = () => {
  const { slug } = useParams();
  // Safe extraction of ID
  const id = slug ? slug.slice(-24) : null;
 
  const [liveNews, setLiveNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [cleanedContent, setCleanedContent] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      try {
        const res = await getLiveNewsById(id);
        if (res.success) {
          setLiveNews(res.data);
          // Clean HTML content immediately
          if (res.data.content_hi) {
            setCleanedContent(cleanHtmlForImages(res.data.content_hi));
          }
        } else {
          setErrorMsg(res.message);
        }
      } catch (err) {
        setErrorMsg(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);
 
  if (loading)
    return (
      <Container className="text-center my-5" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="danger" />
        <p className="mt-2 fw-bold">Loading Live News...</p>
      </Container>
    );
 
  if (errorMsg)
    return (
      <Container className="mt-4">
        <Alert variant="danger">{errorMsg}</Alert>
      </Container>
    );
 
  if (!liveNews)
    return (
      <Container className="mt-4">
        <Alert variant="warning">Live news not available.</Alert>
      </Container>
    );
 
  // Main Media Logic
  const mainMedia = liveNews.coverImage?.url || liveNews.updates?.[0]?.media?.[0]?.url || null;
  const mainType = liveNews.coverImage ? "image" : liveNews.updates?.[0]?.media?.[0]?.type;
 
  return (
    <Container className="my-4" style={{ maxWidth: "1000px" }}>
      {/* Main Card Container (Matches NewsDetailPage style) */}
      <div className="bg-white p-3 p-md-4 shadow-sm rounded border">
        
        {/* Header Section */}
        <h1 className="fw-bold mb-3" style={{ fontSize: "1.6rem", lineHeight: 1.4 }}>
          {liveNews.title_hi}
        </h1>
        
        <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
          <Badge bg="danger" className="px-3 py-2">🔴 LIVE</Badge>
          <small className="text-muted border-start ps-2 ms-1">
            {liveNews.createdBy?.name || "EMS News"}
          </small>
          <small className="text-muted">
             • Started {timeAgo(liveNews.createdAt)}
          </small>
        </div>
 
        {/* Main Media */}
        <MediaRenderer url={mainMedia} type={mainType} />
 
        {/* Summary */}
        {liveNews.summary_hi && (
          <div className="alert alert-light border-start border-4 border-danger p-3 mb-4" style={{ backgroundColor: "#fff5f5" }}>
            <p className="mb-0 fs-5" style={{ lineHeight: 1.6 }}>{liveNews.summary_hi}</p>
          </div>
        )}
 
        {/* Full HTML Content */}
        {cleanedContent && (
          <div
            className="article-content mb-4"
            style={{ fontSize: "1rem", lineHeight: "1.7", whiteSpace: "pre-wrap" }}
            dangerouslySetInnerHTML={{ __html: cleanedContent }}
          />
        )}
 
        <hr className="my-4" />
 
        {/* Live Timeline Section */}
        <h4 className="fw-bold mb-4">
            <i className="bi bi-broadcast text-danger me-2"></i> 
            Live Updates
        </h4>
        
        <div className="timeline-wrapper">
          {liveNews.updates?.map((u, index) => {
            const uMedia = u.media?.[0]?.url || null;
            const uType = u.media?.[0]?.type || "video";
            
            return (
              <div key={index} className="d-flex mb-4 position-relative">
                {/* Timeline Line & Dot */}
                <div className="d-flex flex-column align-items-center me-3" style={{ minWidth: "24px" }}>
                    {/* Pulsing Dot */}
                    <div 
                        className="bg-danger rounded-circle" 
                        style={{ width: "16px", height: "16px", marginTop: "6px", boxShadow: "0 0 0 4px rgba(220, 53, 69, 0.2)" }} 
                    />
                    {/* Vertical Line */}
                    {index !== liveNews.updates.length - 1 && (
                        <div className="bg-light border-start" style={{ width: "2px", flexGrow: 1, marginTop: "5px" }}></div>
                    )}
                </div>

                {/* Content Card */}
                <div className="flex-grow-1">
                    <div className="mb-2">
                        <small className="text-danger fw-bold text-uppercase" style={{ fontSize: "0.8rem" }}>
                            {timeAgo(u.createdAt)}
                        </small>
                    </div>
                    
                    <div className="bg-light p-3 rounded border shadow-sm">
                        <p className="fw-bold mb-2 fs-5">{u.title_hi}</p> {/* If title exists, otherwise remove */}
                        <p className="mb-2" style={{ whiteSpace: "pre-wrap" }}>{u.text_hi}</p>
                        
                        {uMedia && (
                            <div className="mt-2">
                                <MediaRenderer url={uMedia} type={uType} />
                            </div>
                        )}
                    </div>
                </div>
              </div>
            );
          })}
          
          {liveNews.updates?.length === 0 && (
              <p className="text-center text-muted">No updates yet.</p>
          )}
        </div>

      </div>
    </Container>
  );
};
 
export default LiveNewsDetails;