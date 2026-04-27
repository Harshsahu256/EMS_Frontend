
import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image, Spinner, Alert, Button } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { allNews } from "../../Services/authApi";
import { Link } from "react-router-dom";

// ✅ Media Renderer
const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
  const firstMedia = media?.[0];
  const isVideo = firstMedia && firstMedia.type === "video";
  const mediaUrl = firstMedia?.url;

  const commonStyles = {
    width,
    height,
    objectFit,
    borderRadius,
    backgroundColor: "#e0e0e0",
    display: "block",
  };

  if (isVideo) {
    return mediaUrl ? (
      <video
        src={mediaUrl}
        width={width}
        height={height}
        autoPlay
        muted
        loop
        style={commonStyles}
      />
    ) : (
      <Image
        src={`https://via.placeholder.com/${parseInt(width) || 150}x${parseInt(height) || 90}?text=VIDEO+MISSING`}
        alt={alt}
        style={commonStyles}
      />
    );
  } else {
    const imageSrc =
      mediaUrl ||
      `https://via.placeholder.com/${parseInt(width) || 150}x${parseInt(height) || 90}?text=No+Media`;
    return (
      <Image
        src={imageSrc}
        alt={alt}
        style={commonStyles}
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/${parseInt(width) || 150}x${parseInt(height) || 90}?text=Error`;
        }}
      />
    );
  }
};

// ✅ Author Info
const AuthorInfo = ({ name }) => (
  <div className="d-flex align-items-center text-muted small mt-1">
    <div
      className="rounded-circle bg-warning me-1 d-flex align-items-center justify-content-center"
      style={{ width: "22px", height: "22px" }}
    >
      <BsFillPersonFill className="text-white" size={12} />
    </div>
    <span style={{ fontSize: "0.8rem" }}>By {name || "Unknown"}</span>
  </div>
);

// HOROSCOPE_CATEGORY की अब सीधे जरूरत नहीं है क्योंकि हम केवल "latest" को फ़िल्टर कर रहे हैं
// const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

const HindiNewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10); // ✅ Show only 12 news (6 left + 6 right)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await allNews();
        if (res?.success) {
          // =========================================================================
          // ✅ UPDATED FILTERING LOGIC: Only show news from "Latest" category (case-insensitive)
          const filteredData = res.data.filter((article) => {
            const categoryName = article?.category?.name;
            // सुनिश्चित करें कि categoryName मौजूद है और case-insensitive तरीके से "latest" है
            return categoryName && categoryName.toLowerCase() === "latest news";
          });
          // =========================================================================
          
          setNewsData(filteredData);
        } else {
          setError("Failed to load news");
        }
      } catch (err) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p>Loading News...</p>
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="my-4">
        Error loading news: {error}
      </Alert>
    );

  if (!newsData.length) return null;

  const visibleNews = newsData.slice(0, visibleCount); // ✅ Show only visible count
  const half = Math.ceil(visibleNews.length / 2);
  const linkStyle = { textDecoration: "none", color: "inherit" };

  const getDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleString("hi-IN", {
          day: "numeric",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
        })
      : "";

  const accentColor = "#C00000";
  const linkColor = "#2E6E9E";

  return (
    <Container fluid className="mt-4">
      {/* ✅ Section Header */}
      <div className="d-flex align-items-center mb-3 flex-wrap">
        <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
          <div
            style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
            className="me-2"
          ></div>
          <h5 className="fw-bold m-0">लेटेस्ट न्यूज</h5>
        </div>
        <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
        <Link
          to="/related-news"
          state={{ relatedArticles: newsData }}
          className="text-decoration-none fw-bold small flex-shrink-0"
          style={{ color: linkColor }}
        >
          और देखें
        </Link>
      </div>

      {/* ✅ Two Column Layout */}
      {Array.from({ length: half }).map((_, index) => {
        const leftArticle = visibleNews[index];
        const rightArticle = visibleNews[index + half];

        return (
          <Row
            key={index}
            className="mb-3 pb-2"
            style={{
              borderBottom:
                index !== half - 1 ? "1px solid #d3d3d3" : "none", // ✅ gray line between pairs
            }}
          >
            {/* Left Column */}
            <Col xs={12} lg={6} className="pe-lg-2">
              {leftArticle && (
                <Link
                  to={`/news/${leftArticle?.slug_en || leftArticle?._id}`}
                  state={{ relatedArticles: newsData }}
                  style={linkStyle}
                >
                  <Row className="gx-3 align-items-center" style={{ minHeight: "90px" }}>
                    <Col xs={4} md={3}>
                      <MediaRenderer
                        media={leftArticle?.media}
                        alt={leftArticle?.title_hi || leftArticle?.title_en || "Untitled"}
                        width="100%"
                        height="90px"
                        objectFit="cover"
                        borderRadius="8px"
                      />
                    </Col>
                    <Col xs={8} md={9}>
                    <div
                    // className="fw-bold mb-1"
                        className="news-headline-master mb-1"
                    dangerouslySetInnerHTML={{ __html: leftArticle?.title_hi || leftArticle?.title_en }}
                  />
                      <p className="text-muted small m-0">
                        {getDate(leftArticle?.publishedAt)}
                      </p>
                      <AuthorInfo name={leftArticle?.createdBy?.name || "EMS News"} />
                    </Col>
                  </Row>
                </Link>
              )}
            </Col>

            {/* Right Column */}
            <Col xs={12} lg={6} className="ps-lg-2 mt-3 mt-lg-0">
              {rightArticle && (
                <Link
                  to={`/news/${rightArticle?.slug_en || rightArticle?._id}`}
                  state={{ relatedArticles: newsData }}
                  style={linkStyle}
                >
                  <Row className="gx-3 align-items-center" style={{ minHeight: "90px" }}>
                    <Col xs={4} md={3}>
                      <MediaRenderer
                        media={rightArticle?.media}
                        alt={rightArticle?.title_hi || rightArticle?.title_en || "Untitled"}
                        width="100%"
                        height="90px"
                        objectFit="cover"
                        borderRadius="8px"
                      />
                    </Col>
                    <Col xs={8} md={9}>
                      <div
                    // className="fw-bold mb-1"
                        className="news-headline-master mb-1"
                    dangerouslySetInnerHTML={{ __html: rightArticle?.title_hi || rightArticle?.title_en }}
                  />
                      <p className="text-muted small m-0">
                        {getDate(rightArticle?.publishedAt)}
                      </p>
                      <AuthorInfo name={rightArticle?.createdBy?.name || "EMS News"} />
                    </Col>
                  </Row>
                </Link>
              )}
            </Col>
          </Row>
        );
      })}

    
    </Container>
  );
};

export default HindiNewsSection;