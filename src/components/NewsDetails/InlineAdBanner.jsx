
// import React, { useEffect, useState } from "react";
// import { fetchActiveAds } from "../../Services/authApi";

// const InlineAdBanner = () => {
//   const [ad, setAd] = useState(null);

//   useEffect(() => {
//     const loadAd = async () => {
//       try {
//         const res = await fetchActiveAds();
//         if (res?.success && Array.isArray(res.ads)) {
//           // ✅ sirf EK inline ad
//           const inlineAd = res.ads.find(a => a.position === "inline");
//           setAd(inlineAd || null);
//         }
//       } catch {
//         console.log("Inline ad not available");
//       }
//     };

//     loadAd();
//   }, []);

//   // ❌ ad nahi → kuch bhi render nahi
//   if (!ad) return null;

//   return (
//     <div className="inline-ad-wrapper">
//       <a
//         href={ad.link || "#"}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <img
//           src={ad.mediaUrl}
//           alt={ad.title || "Advertisement"}
//         />
//       </a>

//       <style>{`
//         /* 🖥️ Desktop – 728 × 90 */
//         .inline-ad-wrapper {
//           width: 100%;
//           max-width: 728px;
//           margin: 20px auto;
//         }

//         .inline-ad-wrapper img {
//           width: 100%;
//           height: auto;
//           aspect-ratio: 728 / 90;
//           object-fit: cover;
//           border-radius: 4px;
//         }

//         /* 📱 Mobile / Tablet – responsive */
//         @media (max-width: 991px) {
//           .inline-ad-wrapper {
//             max-width: 100%;
//             padding: 0 10px;
//           }

//           .inline-ad-wrapper img {
//             aspect-ratio: 728 / 90;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default InlineAdBanner;


// import React, { useEffect, useState } from "react";
// import { fetchActiveAds } from "../../Services/authApi";

// // 🟢 props me 'category' receive kiya
// const InlineAdBanner = ({ category }) => {
//   const [ad, setAd] = useState(null);

//   useEffect(() => {
//     const loadAd = async () => {
//       try {
//         const res = await fetchActiveAds();
//         if (res?.success && Array.isArray(res.ads)) {
          
//           // 🔹 Filter Logic Updated
//           const inlineAd = res.ads.find(a => {
//             // 1. Check Position
//             const isPosMatch = a.position === "inline";
            
//             // 2. Check Category (Agar category pass ki hai to match karo, nahi to True)
//             const isCatMatch = category 
//               ? a.categories?.some(c => c.toLowerCase() === category.toLowerCase())
//               : true;

//             return isPosMatch && isCatMatch;
//           });

//           setAd(inlineAd || null);
//         }
//       } catch {
//         console.log("Inline ad not available");
//       }
//     };

//     loadAd();
//   }, [category]); // 🟢 Dependency added

//   // ❌ ad nahi (ya category match nahi hui) → kuch bhi render nahi
//   if (!ad) return null;

//   return (
//     <div className="inline-ad-wrapper">
//       <a href={ad.link || "#"} target="_blank" rel="noopener noreferrer">
//         <img src={ad.mediaUrl} alt={ad.title || "Advertisement"} />
//       </a>
//       {/* CSS Same as before */}
//       <style>{`
//         .inline-ad-wrapper { width: 100%; max-width: 728px; margin: 20px auto; }
//         .inline-ad-wrapper img { width: 100%; height: auto; aspect-ratio: 728 / 90; object-fit: cover; border-radius: 4px; }
//         @media (max-width: 991px) {
//           .inline-ad-wrapper { max-width: 100%; padding: 0 10px; }
//           .inline-ad-wrapper img { aspect-ratio: 728 / 90; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default InlineAdBanner;


import React, { useEffect, useState } from "react";
import { fetchActiveAds } from "../../Services/authApi";

// 🟢 props me 'category' receive kiya
const InlineAdBanner = ({ category }) => {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const loadAd = async () => {
      try {
        const res = await fetchActiveAds();

        if (res?.success && Array.isArray(res.ads)) {
          // 🔹 Filter Logic (same as before)
          const inlineAd = res.ads.find(a => {
            const isPosMatch = a.position === "inline";

            const isCatMatch = category
              ? a.categories?.some(
                  c => c.toLowerCase() === category.toLowerCase()
                )
              : true;

            return isPosMatch && isCatMatch;
          });

          setAd(inlineAd || null);
        }
      } catch (e) {
        console.log("Inline ad not available");
      }
    };

    loadAd();
  }, [category]);

  // ❌ ad nahi → kuch bhi render nahi
  if (!ad) return null;

  // 🔹 MEDIA HANDLER (image / gif / video)
  const renderAdMedia = () => {
    if (ad.mediaType === "video") {
      return (
        <video
          src={ad.mediaUrl}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      );
    }

    // image & gif
    return (
      <img
        src={ad.mediaUrl}
        alt={ad.title || "Advertisement"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 4,
        }}
      />
    );
  };

  return (
    <div className="inline-ad-wrapper">
      {ad.link ? (
        <a href={ad.link} target="_blank" rel="noopener noreferrer">
          {renderAdMedia()}
        </a>
      ) : (
        renderAdMedia()
      )}

      <style>{`
        .inline-ad-wrapper {
          width: 100%;
          max-width: 728px;
          margin: 20px auto;
        }

        .inline-ad-wrapper video,
        .inline-ad-wrapper img {
          width: 100%;
          height: auto;
          aspect-ratio: 728 / 90;
          object-fit: cover;
        }

        @media (max-width: 991px) {
          .inline-ad-wrapper {
            max-width: 100%;
            padding: 0 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default InlineAdBanner;
