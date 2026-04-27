
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail, BiShare } from "react-icons/bi";
import { newsshorts, addLikeToShort } from "../../Services/authApi";
import CommentOffcanvas from "./CommentOffcanvas";
import logo from "../../assets/logo.png";
import logoT from "../../assets/logoT.png";
 
const ReelViewer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
 
  const [shorts, setShorts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [activeShort, setActiveShort] = useState(null);
  const [activeShortIndex, setActiveShortIndex] = useState(0);
  const reelsListRef = useRef(null);
  const shortRefs = useRef([]);
 
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
 
  // ✅ API सिर्फ एक बार call होगी
  const fetchAllShorts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await newsshorts();
      const fetchedShorts = response?.data || [];
      setShorts(fetchedShorts);
 
      let initialIndex = 0;
      if (slug) {
        const indexBySlug = fetchedShorts.findIndex((s) => s.slug === slug);
        if (indexBySlug !== -1) {
          initialIndex = indexBySlug;
        }
      } else if (location.state?.initialIndex !== undefined) {
        initialIndex = location.state.initialIndex;
      }
 
      setActiveShortIndex(initialIndex);
      setActiveShort(fetchedShorts[initialIndex] || null);
 
      if (
        fetchedShorts[initialIndex] &&
        location.pathname !== `/shorts/${fetchedShorts[initialIndex].slug}`
      ) {
        navigate(`/shorts/${fetchedShorts[initialIndex].slug}`, {
          replace: true,
        });
      }
    } catch (err) {
      console.error("Error fetching shorts:", err);
      setError("रील्स लोड करने में समस्या हुई");
    } finally {
      setIsLoading(false);
    }
  }, []); // ✅ खाली dependency
 
  useEffect(() => {
    fetchAllShorts();
  }, [fetchAllShorts]);
 
  // ✅ Initial scroll position
  useEffect(() => {
    if (
      shorts.length > 0 &&
      reelsListRef.current &&
      shortRefs.current[activeShortIndex]
    ) {
      const shortElement = shortRefs.current[activeShortIndex];
      if (shortElement) {
        shortElement.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
      }
    }
  }, [activeShortIndex, shorts]);
 
  // ✅ Intersection observer for slug update
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
            const index = parseInt(entry.target.dataset.index, 10);
            if (
              shorts[index] &&
              shorts[index].slug &&
              index !== activeShortIndex
            ) {
              setActiveShortIndex(index);
              setActiveShort(shorts[index]);
              navigate(`/shorts/${shorts[index].slug}`, { replace: true });
            }
          }
        });
      },
      {
        root: reelsListRef.current,
        rootMargin: "0px",
        threshold: 0.95,
      }
    );
 
    shortRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
 
    return () => {
      observer.disconnect();
    };
  }, [shorts, navigate, activeShortIndex]);
 
  // ✅ Infinite scroll (local state duplication only, no API call)
  const handleScroll = () => {
    const el = reelsListRef.current;
    if (!el || isLoading) return;
 
    if (
      el.scrollTop + el.clientHeight >= el.scrollHeight - 50 &&
      shorts.length > 0
    ) {
      const originalLength = shorts.length;
      setShorts((prev) => [...prev, ...prev.slice(0, originalLength)]);
    }
  };
 
  // ✅ Like handler (local update + API)
  const handleLike = async (shortId) => {
    const originalShorts = [...shorts];
    const updatedShorts = shorts.map((s) =>
      s._id === shortId
        ? {
            ...s,
            isLikedByCurrentUser: !s.isLikedByCurrentUser,
            likesCount: s.isLikedByCurrentUser
              ? s.likesCount - 1
              : s.likesCount + 1,
          }
        : s
    );
    setShorts(updatedShorts);
 
    try {
      await addLikeToShort(shortId);
    } catch (err) {
      alert("Something went wrong while liking");
      setShorts(originalShorts);
    }
  };
 
  // ✅ Comment box open
  const openCommentBox = (short) => {
    setActiveShort(short);
    setShowCommentBox(true);
  };
 
  // ✅ Comment posted → सिर्फ local state update
  const handleCommentPosted = (shortId) => {
    setShorts((prev) =>
      prev.map((s) =>
        s._id === shortId
          ? { ...s, commentsCount: (s.commentsCount ?? 0) + 1 }
          : s
      )
    );
  };
 
  // ================= UI =================
  if (isLoading) {
    return (
      <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
        style={{ zIndex: 99999 }}>
        <h5 className="text-white">Reels are loading...</h5>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
        style={{ zIndex: 99999 }}>
        <h5 className="text-white">{error}</h5>
      </div>
    );
  }
 
  if (shorts.length === 0) {
    return (
      <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
        style={{ zIndex: 99999 }}>
        <h5 className="text-white">No reels available.</h5>
      </div>
    );
  }
 
  return (
    <>
      <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
        style={{ zIndex: 99999 }}>
        <IoArrowBack className="position-absolute top-0 start-0 m-3 text-white h2"
          style={{ cursor: "pointer", zIndex: 10 }}
          onClick={() => navigate(-1)} />
        <div className="reels-main-container h-100 position-relative"
          style={{ width: "100%", maxWidth: "420px", backgroundColor: "#000" }}>
          <div className="reels-list h-100 overflow-y-scroll"
            ref={reelsListRef}
            onScroll={handleScroll}
            style={{
              scrollSnapType: "y mandatory",
              msOverflowStyle: "none",
              scrollbarWidth: "none"
            }}>
            {shorts.map((short, index) => (
              <div key={`${short._id}-${index}`}
                ref={(el) => (shortRefs.current[index] = el)}
                data-index={index}
                className="h-100 w-100 d-flex justify-content-center align-items-center position-relative"
                style={{ scrollSnapAlign: "start" }}>
                <video
                  src={short.videoUrl}
                  loop
                  autoPlay
                  muted
                  playsInline
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  onClick={(e) => (e.target.muted = !e.target.muted)}
                ></video>
 
                {/* Logo */}
          {/* <video
  src="/logogif.mp4"  // public folder me rakhi file
  autoPlay
  loop
  muted
  className="position-absolute top-0 start-0 m-3"
  style={{ width: "60px", zIndex: 2100 }}
/> */}

 
                {/* Bottom overlay */}
                <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white d-flex align-items-end"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 10%, transparent)" }}>
                  <div className="flex-grow-1">
                    <h5 className="fw-bold m-0">@{short.createdBy?.name ?? "User"}</h5>
                    <p className="m-0 mt-1 small">{short.title}</p>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-4">
                    <div className="text-center" style={{ cursor: "pointer" }}
                      onClick={() => handleLike(short._id)}>
                      <AiFillHeart
                        className={`h1 ${short.isLikedByCurrentUser ? "text-danger" : "text-white"}`}
                      />
                      <span className="d-block small fw-bold text-white">
                        {short.likesCount ?? 0}
                      </span>
                    </div>
                    <div className="text-center" style={{ cursor: "pointer" }}
                      onClick={() => openCommentBox(short)}>
                      <BiCommentDetail className="h1 text-white" />
                      <span className="d-block small fw-bold text-white">
                        {short.commentsCount ?? 0}
                      </span>
                    </div>
                    <div className="text-center" style={{ cursor: "pointer" }}>
                      <BiShare className="h1 text-white"
                        style={{ transform: "scaleX(-1)" }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      <CommentOffcanvas
        show={showCommentBox}
        onHide={() => setShowCommentBox(false)}
        short={activeShort}
        onCommentPosted={(id) => handleCommentPosted(id)}
      />
    </>
  );
};
 
export default ReelViewer;
 