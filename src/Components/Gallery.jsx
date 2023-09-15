import LightGallery from "lightgallery/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Gallery.css";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgRotate from "lightgallery/plugins/rotate";
function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // Number of items per page

  useEffect(() => {
    const apiUrl = `https://picsum.photos/v2/list?page=${currentPage}&limit=${itemsPerPage}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      });
  }, [currentPage]);

  return (
    <div className="photo-gallery">
      <h2>Photo Gallery</h2>
      <div className="photo-list">
        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate]}
        >
          {photos.map((image, index) => {
            return (
              <Link to={image.download_url} key={index}>
                <img alt={image.alt} src={image.download_url} />
              </Link>
            );
          })}
        </LightGallery>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Gallery;
