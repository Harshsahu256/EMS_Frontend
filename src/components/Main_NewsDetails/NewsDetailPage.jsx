



// // // import React, { useState, useEffect } from "react";
// // // import { useParams, useLocation, useNavigate } from "react-router-dom";
// // // import {
// // //   getNewsById,
// // //   addLikeToNews,
// // //   addCommentToNews,
// // //   allNews,
// // // } from "../../Services/authApi";
// // // import RelatedNews from "./RelatedNews";
// // // import UserAvatar from "../Main_NewsDetails/UserAvatar";
// // // import "bootstrap-icons/font/bootstrap-icons.css";
// // // import { Container, Spinner } from "react-bootstrap";

// // // // --- HELPER FUNCTIONS ---

// // // // 1. .env से Base URL लेना (Vite के लिए VITE_BASE_URL इस्तेमाल करें)
// // // const BASE_FRONTEND_URL = import.meta.env.VITE_BASE_URL || "https://news.aasmo.in";

// // // // 2. हिंदी टाइटल को URL Friendly Slug बनाने के लिए
// // // const createSlug = (title) => {
// // //   if (!title) return "";
// // //   return title
// // //     .toString()
// // //     .trim()
// // //     .replace(/\s+/g, "-") // स्पेस को डैश (-) से बदलें
// // //     .replace(/[^\u0900-\u097F\w-]+/g, "") // केवल हिंदी अक्षर और शब्द रखें
// // //     .replace(/--+/g, "-") // डबल डैश हटाएं
// // //     .replace(/^-+|-+$/g, ""); // शुरुआत और अंत से डैश हटाएं
// // // };

// // // const MediaRenderer = ({ mediaItem }) => {
// // //   if (!mediaItem) {
// // //     return <div className="bg-light w-100 rounded mb-3" style={{ height: '300px' }}></div>;
// // //   }
// // //   switch (mediaItem.type) {
// // //     case "video":
// // //       return (
// // //         <video
// // //           src={mediaItem.url}
// // //           controls
// // //           className="img-fluid w-100 rounded mb-3"
// // //           style={{ maxHeight: "500px", backgroundColor: "#000" }}
// // //         />
// // //       );
// // //     case "image":
// // //     default:
// // //       return <img src={mediaItem.url} alt={mediaItem.caption || "News Media"} className="img-fluid w-100 rounded mb-3" />;
// // //   }
// // // };

// // // const cleanHtmlForImages = (htmlString) => {
// // //   if (!htmlString) return '';
// // //   const parser = new DOMParser();
// // //   const doc = parser.parseFromString(htmlString, 'text/html');
// // //   const images = doc.querySelectorAll('img');
// // //   images.forEach(img => {
// // //     img.removeAttribute('width');
// // //     img.removeAttribute('height');
// // //     if (img.style.width) img.style.width = ''; 
// // //     if (img.style.height) img.style.height = ''; 
// // //   });
// // //   return doc.body.innerHTML;
// // // };

// // // const NewsDetailPage = () => {
// // //   const { slugId } = useParams();
// // //   const newsId = slugId ? slugId.split("-").pop() : null; 
// // //   const location = useLocation();
// // //   const navigate = useNavigate();

// // //   const [article, setArticle] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [relatedNews, setRelatedNews] = useState([]);
// // //   const [likeCount, setLikeCount] = useState(0);
// // //   const [isLiked, setIsLiked] = useState(false);
// // //   const [comments, setComments] = useState([]);
// // //   const [showComments, setShowComments] = useState(false);
// // //   const [newComment, setNewComment] = useState("");
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [cleanedArticleContent, setCleanedArticleContent] = useState('');

// // //   const formatFullDateTime = (dateString) => {
// // //     if (!dateString) return '';
// // //     const options = { day: 'numeric',  month: "2-digit", year: 'numeric', hour: '2-digit', minute: '2-digit' };
// // //     return new Date(dateString).toLocaleString("hi-IN", options);
// // //   };

// // //   useEffect(() => {
// // //     if (!newsId) {
// // //         setLoading(false);
// // //         setError("News ID not found in URL.");
// // //         return;
// // //     }

// // //     const fetchArticleAndRelated = async () => {
// // //       try {
// // //         setLoading(true);
// // //         setArticle(null);
// // //         setError(null);
// // //         setCleanedArticleContent(''); 
// // //         window.scrollTo(0, 0);

// // //         const articleRes = await getNewsById(newsId);
// // //         if (!articleRes.success) throw new Error(articleRes.message || "Failed to fetch article");

// // //         const currentArticle = articleRes.data || {};
// // //         setArticle(currentArticle);
// // //         setLikeCount(currentArticle.likesCount || 0);
// // //         setComments(currentArticle.comments || []);
// // //         setIsLiked(currentArticle.isLiked || false);

// // //         if (currentArticle.content_hi) {
// // //           setCleanedArticleContent(cleanHtmlForImages(currentArticle.content_hi));
// // //         }

// // //         let related = [];
// // //         const allNewsRes = await allNews();
// // //         if (allNewsRes.success) {
// // //           related = allNewsRes.data.filter(item => item._id !== currentArticle._id).slice(0, 6);
// // //         }
// // //         setRelatedNews(related);

// // //       } catch (err) {
// // //         setError(err.message || "A network error occurred.");
// // //         if (String(err).includes("401")) navigate('/login');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchArticleAndRelated();
// // //   }, [newsId, navigate]);

// // //   // --- SHARING LOGIC (FIXED) ---
  
// // //   const getShareUrl = () => {
// // //     if (!article) return "";
// // //     const slug = createSlug(article.title_hi);
// // //     // Base URL के अंत से स्लैश हटाकर सही फॉर्मेट बनाना
// // //     const cleanBase = BASE_FRONTEND_URL.endsWith('/') ? BASE_FRONTEND_URL.slice(0, -1) : BASE_FRONTEND_URL;
// // //     return `${cleanBase}/news/${slug}-${article._id}`;
// // //   };

// // //   const finalShareUrl = getShareUrl();
// // //   const shareTitle = article?.title_hi || "News Update";

// // //   const handleShareClick = async () => {
// // //     if (!article) return;

// // //     if (navigator.share) {
// // //       try {
// // //         await navigator.share({
// // //           title: shareTitle,
// // //           text: shareTitle,
// // //           url: finalShareUrl, // यहाँ अब सही .env वाला लिंक जाएगा
// // //         });
// // //       } catch (err) {
// // //         console.error("Share failed", err);
// // //       }
// // //     } else {
// // //       // Fallback: अगर Share API काम न करे तो लिंक कॉपी कर लें
// // //       navigator.clipboard.writeText(finalShareUrl);
// // //       alert("Link copied to clipboard!");
// // //     }
// // //   };

// // //   // --- ACTIONS ---

// // //   const handleLikeClick = async () => {
// // //     if (!article) return;
// // //     const prevLiked = isLiked;
// // //     const prevCount = likeCount;
// // //     setIsLiked(!prevLiked);
// // //     setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);

// // //     try {
// // //       const res = await addLikeToNews(article._id);
// // //       if (!res.success) {
// // //         setIsLiked(prevLiked);
// // //         setLikeCount(prevCount);
// // //       }
// // //     } catch (err) {
// // //       setIsLiked(prevLiked);
// // //       setLikeCount(prevCount);
// // //       if (String(err).includes("401")) navigate("/login");
// // //     }
// // //   };

// // //   const handleCommentSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!newComment.trim() || !article) return;
// // //     setIsSubmitting(true);
// // //     try {
// // //       const res = await addCommentToNews(article._id, { text: newComment });
// // //       if (res.success) {
// // //         setComments(res.data?.comments || [...comments, res.comment]);
// // //         setNewComment("");
// // //       }
// // //     } catch (err) {
// // //       if (String(err).includes("401")) navigate('/login');
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   if (loading) return <Container className="text-center my-5"><Spinner animation="border" /></Container>;
// // //   if (error || !article) return <Container className="text-center my-5"><p>{error || "Article not found"}</p></Container>;

// // //   return (
// // //     <Container className="my-4">
// // //       <div className="bg-white p-3 p-md-4 shadow-sm" style={{ border: "1px solid #eee", borderRadius: "8px" }}>
// // //         <h1 className="fw-bold mb-3" style={{ fontSize: "1.6rem" }}>{article.title_hi}</h1>
// // //         <MediaRenderer mediaItem={article.media?.[0]} />

// // //         <div className="d-flex align-items-center mb-3">
// // //           <UserAvatar user={article.createdBy} />
// // //           <small className="ms-2 text-muted">{article.createdBy?.name || "EMS"} | {formatFullDateTime(article.createdAt)}</small>
// // //         </div>

// // //         <div className="article-content mb-3" style={{ fontSize: "1.1rem", lineHeight: "1.8" }} dangerouslySetInnerHTML={{ __html: cleanedArticleContent }}></div>

// // //         {/* Action Buttons */}
// // //         <div className="d-flex flex-wrap align-items-center gap-4 mt-3 pt-2 border-top">
          
// // //           {/* Like */}
// // //           <div onClick={handleLikeClick} className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
// // //             <i className={`fs-5 bi ${isLiked ? "bi-hand-thumbs-up-fill text-danger" : "bi-hand-thumbs-up"}`}></i>
// // //             <span>{likeCount}</span>
// // //           </div>

// // //           {/* Comment */}
// // //           <div onClick={() => setShowComments(!showComments)} className="d-flex align-items-center gap-2 text-primary" style={{ cursor: "pointer" }}> 
// // //             <i className="bi bi-chat-dots fs-5"></i>
// // //             <span>{comments.length}</span>
// // //           </div>

// // //           {/* Main Share Button (Updated) */}
// // //           <div onClick={handleShareClick} className="d-flex align-items-center gap-2 text-muted" style={{ cursor: "pointer" }}>
// // //             <i className="bi bi-share fs-5"></i>
           
// // //           </div>

// // //           {/* WhatsApp Share */}
// // //           <a 
// // //             href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " - " + finalShareUrl)}`} 
// // //             target="_blank" 
// // //             rel="noopener noreferrer" 
// // //             className="d-flex align-items-center gap-2 text-success"
// // //             title="Share on WhatsApp"
// // //             style={{ textDecoration: "none" }}
// // //           >
// // //             <i className="bi bi-whatsapp fs-5"></i>
// // //           </a>

// // //           {/* Facebook Share */}
// // //           <a 
// // //             href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(finalShareUrl)}`} 
// // //             target="_blank" 
// // //             rel="noopener noreferrer" 
// // //             className="d-flex align-items-center gap-2 text-primary"
// // //             title="Share on Facebook"
// // //             style={{ textDecoration: "none" }}
// // //           >
// // //             <i className="bi bi-facebook fs-5"></i>
// // //           </a>
// // //         </div>

// // //         {showComments && (
// // //           <div className="mt-4 border-top pt-3">
// // //             <h4 className="mb-3">Comments ({comments.length})</h4>
// // //             <form onSubmit={handleCommentSubmit} className="d-flex gap-2 mb-4">
// // //               <input type="text" className="form-control" placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
// // //               <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Post</button>
// // //             </form>
// // //             {comments.map(comment => (
// // //               <div key={comment._id} className="border-bottom pb-2 mb-2">
// // //                 <strong>{comment.user?.name || "Anonymous"}</strong>
// // //                 <p className="mb-0">{comment.text}</p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //       <RelatedNews articles={relatedNews} currentArticleId={article._id} />
// // //     </Container>
// // //   );
// // // };

// // // export default NewsDetailPage;



// // import React, { useState, useEffect } from "react";
// // import { useParams, useLocation, useNavigate } from "react-router-dom";
// // import {
// //   getNewsById,
// //   addLikeToNews,
// //   addCommentToNews,
// //   allNews,
// // } from "../../Services/authApi";
// // import RelatedNews from "./RelatedNews";
// // import UserAvatar from "../Main_NewsDetails/UserAvatar";
// // import "bootstrap-icons/font/bootstrap-icons.css";
// // import { Container, Spinner } from "react-bootstrap";

// // // --- HELPER FUNCTIONS ---

// // const BASE_FRONTEND_URL = import.meta.env.VITE_BASE_URL || "https://news.aasmo.in";

// // const createSlug = (title) => {
// //   if (!title) return "";
// //   return title.toString().trim()
// //     .replace(/\s+/g, "-") 
// //     .replace(/[^\u0900-\u097F\w-]+/g, "") 
// //     .replace(/--+/g, "-") 
// //     .replace(/^-+|-+$/g, ""); 
// // };

// // const cleanHtmlForImages = (htmlString) => {
// //   if (!htmlString) return '';
// //   const parser = new DOMParser();
// //   const doc = parser.parseFromString(htmlString, 'text/html');
// //   const images = doc.querySelectorAll('img');
// //   images.forEach(img => {
// //     img.removeAttribute('width');
// //     img.removeAttribute('height');
// //     if (img.style.width) img.style.width = ''; 
// //     if (img.style.height) img.style.height = ''; 
// //   });
// //   return doc.body.innerHTML;
// // };

// // const MediaRenderer = ({ mediaItem }) => {
// //   if (!mediaItem) return <div className="bg-light w-100 rounded mb-3" style={{ height: '300px' }}></div>;
// //   if (mediaItem.type === "video") {
// //     return <video src={mediaItem.url} controls className="img-fluid w-100 rounded mb-3" style={{ maxHeight: "500px", backgroundColor: "#000" }} />;
// //   }
// //   return <img src={mediaItem.url} alt={mediaItem.caption || "News Media"} className="img-fluid w-100 rounded mb-3" />;
// // };

// // const NewsDetailPage = () => {
// //   const { slugId } = useParams();
// //   const newsId = slugId ? slugId.split("-").pop() : null; 
// //   const navigate = useNavigate();

// //   const [article, setArticle] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [relatedNews, setRelatedNews] = useState([]);
// //   const [likeCount, setLikeCount] = useState(0);
// //   const [isLiked, setIsLiked] = useState(false);
// //   const [comments, setComments] = useState([]);
// //   const [showComments, setShowComments] = useState(false);
// //   const [newComment, setNewComment] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [cleanedArticleContent, setCleanedArticleContent] = useState('');

// //   const formatFullDateTime = (dateString) => {
// //     if (!dateString) return '';
// //     return new Date(dateString).toLocaleString("hi-IN", { day: 'numeric', month: "2-digit", year: 'numeric', hour: '2-digit', minute: '2-digit' });
// //   };

// //   // --- 1. एड्रेस बार को साफ़ हिंदी में बदलना ---
// //   useEffect(() => {
// //     if (article && article.title_hi) {
// //       const slug = createSlug(article.title_hi);
// //       const cleanPath = `/news/${slug}-${article._id}`;
// //       try {
// //         window.history.replaceState(null, "", decodeURIComponent(cleanPath));
// //       } catch (e) { console.error(e); }
// //     }
// //   }, [article]);

// //   useEffect(() => {
// //     if (!newsId) {
// //       setLoading(false);
// //       setError("News ID missing.");
// //       return;
// //     }

// //     const fetchArticleAndRelated = async () => {
// //       try {
// //         setLoading(true);
// //         window.scrollTo(0, 0);
// //         const articleRes = await getNewsById(newsId);
// //         if (!articleRes.success) throw new Error(articleRes.message || "Failed to fetch");
        
// //         const currentArticle = articleRes.data || {};
// //         setArticle(currentArticle);
// //         setLikeCount(currentArticle.likesCount || 0);
// //         setComments(currentArticle.comments || []);
// //         setIsLiked(currentArticle.isLiked || false);
// //         setCleanedArticleContent(cleanHtmlForImages(currentArticle.content_hi));

// //         const allNewsRes = await allNews();
// //         if (allNewsRes.success) {
// //           setRelatedNews(allNewsRes.data.filter(item => item._id !== currentArticle._id).slice(0, 6));
// //         }
// //       } catch (err) {
// //         setError(err.message);
// //         if (String(err).includes("401")) navigate('/login');
// //       } finally { setLoading(false); }
// //     };
// //     fetchArticleAndRelated();
// //   }, [newsId, navigate]);

// //   // --- 2. SHARING LOGIC (FIXED FOR DOUBLE URL PROBLEM) ---
  
// //   const getShareUrl = () => {
// //     if (!article) return "";
// //     const slug = createSlug(article.title_hi);
// //     const cleanBase = BASE_FRONTEND_URL.endsWith('/') ? BASE_FRONTEND_URL.slice(0, -1) : BASE_FRONTEND_URL;
// //     // यहाँ decodeURIComponent का उपयोग किया है ताकि साफ़ हिंदी लिंक बने
// //     return decodeURIComponent(`${cleanBase}/news/${slug}-${article._id}`);
// //   };

// //   const finalShareUrl = getShareUrl();
// //   const shareTitle = article?.title_hi || "Aasmo News";
// //   const shareIamage = article?.media?.[0]?.url || "";

// //   const handleShareClick = async () => {
// //     if (!article) return;

// //     // मोबाइल शेयर लॉजिक
// //     if (navigator.share) {
// //       try {
// //         await navigator.share({
// //           title: shareTitle,
// //           // समाधान: लिंक को 'text' के अंदर ही डाल दें और 'url' को खाली रखें
// //           // इससे फोन दो-दो लिंक (एक हिंदी, एक गंदा) नहीं दिखाएगा
// //           text: `${shareTitle}\n\nपूरी खबर यहाँ पढ़ें: ${finalShareUrl}`, 
// //         });
// //       } catch (err) { console.log("Share failed"); }
// //     } else {
// //       navigator.clipboard.writeText(finalShareUrl);
// //       alert("Link copied to clipboard!");
// //     }
// //   };

// //   // --- 3. LIKE & COMMENT LOGIC (FIXED) ---

// //   const handleLikeClick = async () => {
// //     if (!article) return;
// //     const prevLiked = isLiked;
// //     const prevCount = likeCount;

// //     setIsLiked(!prevLiked);
// //     setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);

// //     try {
// //       const res = await addLikeToNews(article._id);
// //       if (!res.success) {
// //         setIsLiked(prevLiked);
// //         setLikeCount(prevCount);
// //       }
// //     } catch (err) {
// //       setIsLiked(prevLiked);
// //       setLikeCount(prevCount);
// //       if (String(err).includes("401")) navigate("/login");
// //     }
// //   };

// //   const handleCommentSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!newComment.trim() || !article) return;
// //     setIsSubmitting(true);
// //     try {
// //       const res = await addCommentToNews(article._id, { text: newComment });
// //       if (res.success) {
// //         // नया कमेंट तुरंत लिस्ट में जोड़ें
// //         const addedComment = res.comment || res.data?.comment;
// //         if (addedComment) setComments(prev => [...prev, addedComment]);
// //         setNewComment("");
// //       }
// //     } catch (err) {
// //       if (String(err).includes("401")) navigate('/login');
// //     } finally { setIsSubmitting(false); }
// //   };

// //   if (loading) return <Container className="text-center my-5"><Spinner animation="border" /></Container>;
// //   if (error || !article) return <Container className="text-center my-5"><p>{error || "Article not found"}</p></Container>;

// //   return (
// //     <Container className="my-4">
// //       <div className="bg-white p-3 p-md-4 shadow-sm" style={{ border: "1px solid #eee", borderRadius: "8px" }}>
// //         <h1 className="fw-bold mb-3" style={{ fontSize: "1.6rem" }}>{article.title_hi}</h1>
// //         <MediaRenderer mediaItem={article.media?.[0]} />

// //         <div className="d-flex align-items-center mb-3">
// //           <UserAvatar user={article.createdBy} />
// //           <small className="ms-2 text-muted">{article.createdBy?.name || "EMS"} | {formatFullDateTime(article.createdAt)}</small>
// //         </div>

// //         <div className="article-content mb-3" style={{ fontSize: "1.1rem", lineHeight: "1.8" }} dangerouslySetInnerHTML={{ __html: cleanedArticleContent }}></div>

// //         {/* Buttons Section */}
// //         <div className="d-flex flex-wrap align-items-center gap-4 mt-3 pt-2 border-top">
          
// //           {/* Like */}
// //           <div onClick={handleLikeClick} className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
// //             <i className={`fs-5 bi ${isLiked ? "bi-hand-thumbs-up-fill text-danger" : "bi-hand-thumbs-up"}`}></i>
// //             <span className="fw-semibold">{likeCount}</span>
// //           </div>

// //           {/* Comment */}
// //           <div onClick={() => setShowComments(!showComments)} className="d-flex align-items-center gap-2 text-primary" style={{ cursor: "pointer" }}> 
// //             <i className="bi bi-chat-dots fs-5"></i>
// //             <span className="fw-semibold">{comments.length}</span>
// //           </div>

// //           {/* Share Button (Fixed Mobile Logic) */}
// //           <div onClick={handleShareClick} className="d-flex align-items-center gap-2 text-muted" style={{ cursor: "pointer" }}>
// //             <i className="bi bi-share fs-5"></i>
// //           </div>

// //           {/* WhatsApp Icon */}
// //           <a 
// //             href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + shareIamage+ "\n\n" + finalShareUrl)}`} 
// //             target="_blank" 
// //             rel="noopener noreferrer" 
// //             className="text-success"
// //           >
// //             <i className="bi bi-whatsapp fs-5"></i>
// //           </a>

// //           {/* Facebook Icon */}
// //           <a 
// //             href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(finalShareUrl)}`} 
// //             target="_blank" 
// //             rel="noopener noreferrer" 
// //             className="text-primary"
// //           >
// //             <i className="bi bi-facebook fs-5"></i>
// //           </a>
// //         </div>

// //         {/* Comments section... */}
// //         {showComments && (
// //           <div className="mt-4 border-top pt-3">
// //             <h4 className="mb-3">टिप्पणियाँ ({comments.length})</h4>
// //             <form onSubmit={handleCommentSubmit} className="d-flex gap-2 mb-4">
// //               <input type="text" className="form-control" placeholder="अपनी टिप्पणी लिखें..." value={newComment} onChange={(e) => setNewComment(e.target.value)} disabled={isSubmitting} />
// //               <button type="submit" className="btn btn-primary" disabled={isSubmitting || !newComment.trim()}>Post</button>
// //             </form>
// //             <div className="comments-box">
// //               {comments.map((comment, index) => (
// //                 <div key={comment._id || index} className="border-bottom pb-2 mb-2">
// //                   <div className="d-flex align-items-center mb-1">
// //                     <UserAvatar user={comment.user} size={25} />
// //                     <strong className="ms-2">{comment.user?.name || "Anonymous"}</strong>
// //                   </div>
// //                   <p className="mb-0 ps-4">{comment.text}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //       <RelatedNews articles={relatedNews} currentArticleId={article._id} />
// //     </Container>
// //   );
// // };

// // export default NewsDetailPage;


// import React, { useState, useEffect } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import {
//   getNewsById,
//   addLikeToNews,
//   addCommentToNews,
//   allNews,
// } from "../../Services/authApi";
// import RelatedNews from "./RelatedNews";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { Container, Spinner } from "react-bootstrap";

// // --- HELPER FUNCTIONS ---
// const BASE_FRONTEND_URL = import.meta.env.VITE_BASE_URL || "https://news.aasmo.in";

// const createSlug = (title) => {
//   if (!title) return "";
//   return title
//     .toString()
//     .trim()
//     .replace(/\s+/g, "-")
//     .replace(/[^\u0900-\u097F\w-]+/g, "")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const cleanHtmlForImages = (htmlString) => {
//   if (!htmlString) return "";
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlString, "text/html");
//   const images = doc.querySelectorAll("img");
//   images.forEach((img) => {
//     img.removeAttribute("width");
//     img.removeAttribute("height");
//     img.style.width = "";
//     img.style.height = "";
//   });
//   return doc.body.innerHTML;
// };

// const MediaRenderer = ({ mediaItem }) => {
//   if (!mediaItem)
//     return (
//       <div
//         className="bg-light w-100 rounded mb-3"
//         style={{ height: "300px" }}
//       ></div>
//     );

//   if (mediaItem.type === "video") {
//     return (
//       <video
//         src={mediaItem.url}
//         controls
//         className="img-fluid w-100 rounded mb-3"
//         style={{ maxHeight: "500px", backgroundColor: "#000" }}
//       />
//     );
//   }

//   return (
//     <img
//       src={mediaItem.url}
//       alt={mediaItem.caption || "News Media"}
//       className="img-fluid w-100 rounded mb-3"
//     />
//   );
// };

// const NewsDetailPage = () => {
//   const { slugId } = useParams();
//   const newsId = slugId ? slugId.split("-").pop() : null;
//   const navigate = useNavigate();

//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [relatedNews, setRelatedNews] = useState([]);
//   const [likeCount, setLikeCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [cleanedArticleContent, setCleanedArticleContent] = useState("");

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleString("hi-IN", {
//       day: "numeric",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // -------- UPDATE CLEAN URL --------
//   useEffect(() => {
//     if (article && article.title_hi) {
//       const slug = createSlug(article.title_hi);
//       const cleanPath = `/news/${slug}-${article._id}`;
//       try {
//         window.history.replaceState(null, "", decodeURIComponent(cleanPath));
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   }, [article]);

//   // -------- FETCH NEWS + RELATED --------
//   useEffect(() => {
//     if (!newsId) {
//       setLoading(false);
//       setError("News ID missing.");
//       return;
//     }

//     const fetchArticleAndRelated = async () => {
//       try {
//         setLoading(true);
//         window.scrollTo(0, 0);

//         const articleRes = await getNewsById(newsId);
//         if (!articleRes.success) throw new Error(articleRes.message);

//         const currentArticle = articleRes.data;
//         setArticle(currentArticle);
//         setLikeCount(currentArticle.likesCount || 0);
//         setComments(currentArticle.comments || []);
//         setIsLiked(currentArticle.isLiked || false);
//         setCleanedArticleContent(cleanHtmlForImages(currentArticle.content_hi));

//         const allNewsRes = await allNews();
//         if (allNewsRes.success) {
//           setRelatedNews(
//             allNewsRes.data
//               .filter((item) => item._id !== currentArticle._id)
//               .slice(0, 6)
//           );
//         }
//       } catch (err) {
//         setError(err.message);
//         if (String(err).includes("401")) navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticleAndRelated();
//   }, [newsId, navigate]);

//   // -------- FINAL SHARE URL (Frontend clean URL) --------
//   const getShareUrl = () => {
//     if (!article) return "";
//     const slug = createSlug(article.title_hi);
//     const cleanBase = BASE_FRONTEND_URL.endsWith("/")
//       ? BASE_FRONTEND_URL.slice(0, -1)
//       : BASE_FRONTEND_URL;
//     return decodeURIComponent(`${cleanBase}/news/${slug}-${article._id}`);
//   };

//   const finalShareUrl = getShareUrl();

//   // -------- BACKEND SHARE URL (FOR WHATSAPP) --------
//   const getWhatsappShareUrl = () => {
//     if (!article) return "";
//     const slug = createSlug(article.title_hi);
//     return `https://newsapp.aasmo.in/api/v1/user/share/${slug}-${article._id}`;
//   };

//   // -------- Mobile Share API --------
//   const handleShareClick = async () => {
//     if (!article) return;

//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: article.title_hi,
//           text: `${article.title_hi}\n\nपूरी खबर यहाँ पढ़ें: ${finalShareUrl}`,
//         });
//       } catch (err) {}
//     } else {
//       navigator.clipboard.writeText(finalShareUrl);
//       alert("Link copied!");
//     }
//   };

//   // -------- Like --------
//   const handleLikeClick = async () => {
//     if (!article) return;
//     const prevLiked = isLiked;
//     const prevCount = likeCount;

//     setIsLiked(!prevLiked);
//     setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);

//     try {
//       const res = await addLikeToNews(article._id);
//       if (!res.success) {
//         setIsLiked(prevLiked);
//         setLikeCount(prevCount);
//       }
//     } catch (err) {
//       setIsLiked(prevLiked);
//       setLikeCount(prevCount);
//       if (String(err).includes("401")) navigate("/login");
//     }
//   };

//   // -------- Comment Submit --------
//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim() || !article) return;

//     setIsSubmitting(true);
//     try {
//       const res = await addCommentToNews(article._id, { text: newComment });
//       if (res.success) {
//         const addedComment = res.comment || res.data?.comment;
//         if (addedComment) setComments((prev) => [...prev, addedComment]);
//         setNewComment("");
//       }
//     } catch (err) {
//       if (String(err).includes("401")) navigate("/login");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading)
//     return (
//       <Container className="text-center my-5">
//         <Spinner animation="border" />
//       </Container>
//     );

//   if (error || !article)
//     return (
//       <Container className="text-center my-5">
//         <p>{error || "Article not found"}</p>
//       </Container>
//     );

//   return (
//     <Container className="my-4">
//       <div
//         className="bg-white p-3 p-md-4 shadow-sm"
//         style={{ border: "1px solid #eee", borderRadius: "8px" }}
//       >
//         <h1 className="fw-bold mb-3" style={{ fontSize: "1.6rem" }}>
//           {article.title_hi}
//         </h1>

//         <MediaRenderer mediaItem={article.media?.[0]} />

//         <div className="d-flex align-items-center mb-3">
//           <UserAvatar user={article.createdBy} />
//           <small className="ms-2 text-muted">
//             {article.createdBy?.name || "EMS"} |{" "}
//             {formatFullDateTime(article.createdAt)}
//           </small>
//         </div>

//         <div
//           className="article-content mb-3"
//           style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
//           dangerouslySetInnerHTML={{ __html: cleanedArticleContent }}
//         ></div>

//         <div className="d-flex flex-wrap align-items-center gap-4 mt-3 pt-2 border-top">
//           {/* LIKE */}
//           <div
//             onClick={handleLikeClick}
//             className="d-flex align-items-center gap-2"
//             style={{ cursor: "pointer" }}
//           >
//             <i
//               className={`fs-5 bi ${
//                 isLiked ? "bi-hand-thumbs-up-fill text-danger" : "bi-hand-thumbs-up"
//               }`}
//             ></i>
//             <span className="fw-semibold">{likeCount}</span>
//           </div>

//           {/* COMMENTS */}
//           <div
//             onClick={() => setShowComments(!showComments)}
//             className="d-flex align-items-center gap-2 text-primary"
//             style={{ cursor: "pointer" }}
//           >
//             <i className="bi bi-chat-dots fs-5"></i>
//             <span className="fw-semibold">{comments.length}</span>
//           </div>

//           {/* SHARE (Mobile) */}
//           <div
//             onClick={handleShareClick}
//             className="d-flex align-items-center gap-2 text-muted"
//             style={{ cursor: "pointer" }}
//           >
//             <i className="bi bi-share fs-5"></i>
//           </div>

//           {/* WHATSAPP (OG PREVIEW FIXED) */}
//           <a
//             href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
//               getWhatsappShareUrl()
//             )}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-success"
//           >
//             <i className="bi bi-whatsapp fs-5"></i>
//           </a>

//           {/* FACEBOOK */}
//           <a
//             href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//               finalShareUrl
//             )}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-primary"
//           >
//             <i className="bi bi-facebook fs-5"></i>
//           </a>
//         </div>

//         {/* COMMENTS */}
//         {showComments && (
//           <div className="mt-4 border-top pt-3">
//             <h4 className="mb-3">टिप्पणियाँ ({comments.length})</h4>

//             <form onSubmit={handleCommentSubmit} className="d-flex gap-2 mb-4">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="अपनी टिप्पणी लिखें..."
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 disabled={isSubmitting}
//               />
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={isSubmitting || !newComment.trim()}
//               >
//                 Post
//               </button>
//             </form>

//             <div className="comments-box">
//               {comments.map((comment, index) => (
//                 <div
//                   key={comment._id || index}
//                   className="border-bottom pb-2 mb-2"
//                 >
//                   <div className="d-flex align-items-center mb-1">
//                     <UserAvatar user={comment.user} size={25} />
//                     <strong className="ms-2">
//                       {comment.user?.name || "Anonymous"}
//                     </strong>
//                   </div>
//                   <p className="mb-0 ps-4">{comment.text}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <RelatedNews
//         articles={relatedNews}
//         currentArticleId={article._id}
//       />
//     </Container>
//   );
// };

// export default NewsDetailPage;




import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  getNewsById,
  addLikeToNews,
  addCommentToNews,
  allNews,
} from "../../Services/authApi";
import RelatedNews from "./RelatedNews";
import UserAvatar from "../Main_NewsDetails/UserAvatar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Spinner } from "react-bootstrap";

// --- HELPER FUNCTIONS ---
const BASE_FRONTEND_URL = import.meta.env.VITE_BASE_URL || "https://news.aasmo.in";

// 1. HTML टैग्स को जड़ से साफ करने वाला फंक्शन
const stripHtmlTags = (str) => {
  if (!str) return "";
  return str
    .replace(/<[^>]*>/g, '')         // सारे HTML टैग्स हटाए
    .replace(/&nbsp;/g, ' ')        // &nbsp; हटाए
    .replace(/&[a-z0-9]+;/gi, '')    // बाकी Entities (&amp; आदि) हटाए
    .replace(/\s+/g, ' ')           // एक्स्ट्रा स्पेस हटाए
    .trim();
};

// 2. साफ़ सुथरा Slug बनाने वाला फंक्शन
const createSlug = (title) => {
  const cleanTitle = stripHtmlTags(title); 
  if (!cleanTitle) return "";
  return cleanTitle
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")                               // स्पेस को डैश (-) बनाए
    .replace(/[^\u0900-\u097F\w-]+/g, "")               // सिर्फ हिंदी, इंग्लिश और डैश रखे
    .replace(/-+/g, "-")                                // डबल -- हटाए
    .replace(/^-+|-+$/g, "");                           // आगे-पीछे के डैश हटाए
};

const cleanHtmlForImages = (htmlString) => {
  if (!htmlString) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const images = doc.querySelectorAll("img");
  images.forEach((img) => {
    img.removeAttribute("width");
    img.removeAttribute("height");
    img.style.width = "";
    img.style.height = "";
  });
  return doc.body.innerHTML;
};

const MediaRenderer = ({ mediaItem }) => {
  if (!mediaItem) return <div className="bg-light w-100 rounded mb-3" style={{ height: "300px" }}></div>;
  if (mediaItem.type === "video") {
    return <video src={mediaItem.url} controls className="img-fluid w-100 rounded mb-3" style={{ maxHeight: "500px", backgroundColor: "#000" }} />;
  }
  return <img src={mediaItem.url} alt={mediaItem.caption || "News Media"} className="img-fluid w-100 rounded mb-3" />;
};

const NewsDetailPage = () => {
  const { slugId } = useParams();
  const newsId = slugId ? slugId.split("-").pop() : null;
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cleanedArticleContent, setCleanedArticleContent] = useState("");

  const formatFullDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("hi-IN", {
      day: "numeric", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  // ✅ सुधार 1: ब्राउज़र URL को डेटाबेस वाले साफ़ स्लॉग से अपडेट करें
  useEffect(() => {
    if (article) {
      // अगर बैकएंड से slug_en आ रहा है तो उसी को यूज़ करें, वरना साफ़ स्लॉग बनाएँ
      const finalSlug = article.slug_en || `${createSlug(article.title_hi || article.title_en)}-${article._id}`;
      const cleanPath = `/news/${finalSlug}`;
      try {
        window.history.replaceState(null, "", decodeURIComponent(cleanPath));
      } catch (e) { console.error(e); }
    }
  }, [article]);

  // -------- FETCH NEWS --------
  useEffect(() => {
    if (!newsId) { setLoading(false); setError("News ID missing."); return; }
    const fetchArticleAndRelated = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const articleRes = await getNewsById(newsId);
        if (!articleRes.success) throw new Error(articleRes.message);
        const currentArticle = articleRes.data;
        setArticle(currentArticle);
        setLikeCount(currentArticle.likesCount || 0);
        setComments(currentArticle.comments || []);
        setIsLiked(currentArticle.isLiked || false);
        setCleanedArticleContent(cleanHtmlForImages(currentArticle.content_hi));

        const allNewsRes = await allNews();
        if (allNewsRes.success) {
          setRelatedNews(allNewsRes.data.filter((item) => item._id !== currentArticle._id).slice(0, 6));
        }
      } catch (err) {
        setError(err.message);
        if (String(err).includes("401")) navigate("/login");
      } finally { setLoading(false); }
    };
    fetchArticleAndRelated();
  }, [newsId, navigate]);

  // ✅ सुधार 2: शेयरिंग URL के लिए डेटाबेस स्लॉग का सीधा इस्तेमाल
  const getShareUrl = () => {
    if (!article) return "";
    const finalSlug = article.slug_en || `${createSlug(article.title_hi || article.title_en)}-${article._id}`;
    const cleanBase = BASE_FRONTEND_URL.endsWith("/") ? BASE_FRONTEND_URL.slice(0, -1) : BASE_FRONTEND_URL;
    return decodeURIComponent(`${cleanBase}/news/${finalSlug}`);
  };

  const finalShareUrl = getShareUrl();

  const getWhatsappShareUrl = () => {
    if (!article) return "";
    const finalSlug = article.slug_en || `${createSlug(article.title_hi || article.title_en)}-${article._id}`;

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
    // return `https://newsapp.aasmo.in/api/v1/user/share/${finalSlug}`;
  return `${baseUrl}/api/v1/user/share/${finalSlug}`;
  };

  // -------- Mobile Share API --------
  const handleShareClick = async () => {
    if (!article) return;
    const plainTitle = stripHtmlTags(article.title_hi || article.title_en);
    if (navigator.share) {
      try {
        await navigator.share({
          title: plainTitle,
          text: `${plainTitle}\n\nपूरी खबर यहाँ पढ़ें: ${finalShareUrl}`,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(finalShareUrl);
      alert("Link copied!");
    }
  };

  // ... Like और Comment हैंडलर वही रहेंगे ...
  const handleLikeClick = async () => {
    if (!article) return;
    const prevLiked = isLiked;
    const prevCount = likeCount;
    setIsLiked(!prevLiked);
    setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);
    try {
      const res = await addLikeToNews(article._id);
      if (!res.success) { setIsLiked(prevLiked); setLikeCount(prevCount); }
    } catch (err) {
      setIsLiked(prevLiked); setLikeCount(prevCount);
      if (String(err).includes("401")) navigate("/login");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !article) return;
    setIsSubmitting(true);
    try {
      const res = await addCommentToNews(article._id, { text: newComment });
      if (res.success) {
        const addedComment = res.comment || res.data?.comment;
        if (addedComment) setComments((prev) => [...prev, addedComment]);
        setNewComment("");
      }
    } catch (err) {
      if (String(err).includes("401")) navigate("/login");
    } finally { setIsSubmitting(false); }
  };

  if (loading) return <Container className="text-center my-5"><Spinner animation="border" /></Container>;
  if (error || !article) return <Container className="text-center my-5"><p>{error || "Article not found"}</p></Container>;

  return (
    <Container className="my-4">
      <div className="bg-white p-3 p-md-4 shadow-sm" style={{ border: "1px solid #eee", borderRadius: "8px" }}>
        
        {/* ✅ सुधार 3: हेडलाइन को HTML फॉर्मेट में दिखाएँ (टैग्स गायब हो जाएंगे) */}
        <h1 
          // className="fw-bold mb-3" 
           className="news-headline-master full-view" 
          style={{ fontSize: "1.6rem" }}
          dangerouslySetInnerHTML={{ __html: article.title_hi || article.title_en }} 
        />

        <MediaRenderer mediaItem={article.media?.[0]} />

        <div className="d-flex align-items-center mb-3">
          <UserAvatar user={article.createdBy} />
          <small className="ms-2 text-muted">
            {article.createdBy?.name || "EMS"} | {formatFullDateTime(article.createdAt)}
          </small>
        </div>

        <div
          className="article-content mb-3"
          style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
          dangerouslySetInnerHTML={{ __html: cleanedArticleContent }}
        ></div>

        {/* ... सोशल बटन्स और कमेंट्स वाला हिस्सा वही रहेगा ... */}
        <div className="d-flex flex-wrap align-items-center gap-4 mt-3 pt-2 border-top">
          <div onClick={handleLikeClick} className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
            <i className={`fs-5 bi ${isLiked ? "bi-hand-thumbs-up-fill text-danger" : "bi-hand-thumbs-up"}`}></i>
            <span className="fw-semibold">{likeCount}</span>
          </div>
          <div onClick={() => setShowComments(!showComments)} className="d-flex align-items-center gap-2 text-primary" style={{ cursor: "pointer" }}>
            <i className="bi bi-chat-dots fs-5"></i>
            <span className="fw-semibold">{comments.length}</span>
          </div>
          <div onClick={handleShareClick} className="d-flex align-items-center gap-2 text-muted" style={{ cursor: "pointer" }}>
            <i className="bi bi-share fs-5"></i>
          </div>
          <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getWhatsappShareUrl())}`} target="_blank" rel="noopener noreferrer" className="text-success">
            <i className="bi bi-whatsapp fs-5"></i>
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(finalShareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-primary">
            <i className="bi bi-facebook fs-5"></i>
          </a>
        </div>

        {showComments && (
          <div className="mt-4 border-top pt-3">
            <h4 className="mb-3">टिप्पणियाँ ({comments.length})</h4>
            <form onSubmit={handleCommentSubmit} className="d-flex gap-2 mb-4">
              <input type="text" className="form-control" placeholder="अपनी टिप्पणी लिखें..." value={newComment} onChange={(e) => setNewComment(e.target.value)} disabled={isSubmitting} />
              <button type="submit" className="btn btn-primary" disabled={isSubmitting || !newComment.trim()}>Post</button>
            </form>
            <div className="comments-box">
              {comments.map((comment, index) => (
                <div key={comment._id || index} className="border-bottom pb-2 mb-2">
                  <div className="d-flex align-items-center mb-1">
                    <UserAvatar user={comment.user} size={25} />
                    <strong className="ms-2">{comment.user?.name || "Anonymous"}</strong>
                  </div>
                  <p className="mb-0 ps-4">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <RelatedNews articles={relatedNews} currentArticleId={article._id} />
    </Container>
  );
};

export default NewsDetailPage;