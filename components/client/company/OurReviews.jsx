import React, { useState } from "react";
import styles from "../../../styles/client/Reviews.module.css";
import Review, { initialReviews } from "./reviews/allReviews";
import SelectedReviewDetail from "./reviews/reviewDetail";
import ReviewForm from "./reviews/reviewForm";

/*Modal Imports*/
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { GetReviewsHook } from "../../utils/hooks/reviewsMgmtHook";
import ServerReviewPreview from "./reviews/serverReviews";
import { useEffect } from "react";

export default function ReviewPage() {
  //component states
  const [reviews, setReviews] = useState(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReviewDetails, setShowReviewDetails] = useState(false);
  const [screenWidthMobile, setScreenWidthMobile] = useState(
    window.matchMedia("(min-width: 250px) and (max-width: 720px)").matches
  );
  const [screenWidthTablet, setScreenWidthTablet] = useState(
    window.matchMedia("(min-width:724px ) and (max-width:1024px)").matches
  );

  //mobile responsive screen effects and checks
  useEffect(() => {
    window
      .matchMedia("(min-width: 250px) and (max-width: 720px)")
      .addEventListener("change", (e) => setScreenWidthMobile(e.matches));

    window
      .matchMedia("(min-width:724px ) and (max-width:1024px)")
      .addEventListener("change", (e) => setScreenWidthTablet(e.matches));
  }, []);

  //---->Modal event triggers<------//
  const viewReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  const viewReviewDetails = (review) => {
    setShowReviewDetails(!showReviewDetails);
    localStorage.setItem("_view_review", JSON.stringify(review));
  };

  //get other faqs from api
  const onError = (error) => {
    console.log("fetch error", error);
  };

  const onSuccess = (data) => {
    const reviewsData = data?.data?.result;
    setReviews(reviewsData);
  };

  //get reviews data <--> request
  const { isLoading, isError, isSuccess, error } = GetReviewsHook(
    onSuccess,
    onError
  );

  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: screenWidthMobile ? "95%" : screenWidthTablet ? "65%" : 500,
    maxHeight: screenWidthMobile ? "80vh" : screenWidthTablet ? "90vh" : "70vh",
    overflowY: "auto",
    bgcolor: `var(--white)`,
    border: "none",
    boxShadow: 24,
    borderRadius: `var(--radius-sm)`,
    p: 2,
  };
  return (
    <>
      <section className={styles.reviewsBanner}>
        <h2 className={styles.reviewsHeading}>What our clients say...</h2>
      </section>

      {isLoading ? (
        <div className={styles.reviewsSection} style={{ filter: "blur(10px)" }}>
          <span className={styles.sectionHeader}>
            <h1>All reviews</h1>
            <button
              type="button"
              className={styles.addReview}
              onClick={() => viewReviewForm()}
            >
              Review us here...😊
            </button>
          </span>
          <div className={styles.reviewsContainer}>
            {reviews.map((review) => (
              <Review
                styles={styles}
                key={review.id}
                review={review}
                viewReviewDetails={viewReviewDetails}
              />
            ))}
          </div>
        </div>
      ) : isSuccess && reviews?.length > 0 ? (
        <div className={styles.reviewsSection}>
          <span className={styles.sectionHeader}>
            <h1>All reviews</h1>
            <button
              type="button"
              className={styles.addReview}
              onClick={() => viewReviewForm()}
            >
              Review us here...😊
            </button>
          </span>
          <div className={styles.reviewsContainer}>
            {reviews?.map((review) => (
              <ServerReviewPreview
                styles={styles}
                key={review.id}
                review={review}
                viewReviewDetails={viewReviewDetails}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.reviewsSection}>
          <span className={styles.sectionHeader}>
            <h1>All reviews</h1>
            <button
              type="button"
              className={styles.addReview}
              onClick={() => viewReviewForm()}
            >
              Review us here...😊
            </button>
          </span>
          <span>
            Our team is currently populating the reviews and testimonials
            section. Kindly stay tuned in ...
          </span>
        </div>
      )}
      {showReviewForm && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewReviewForm}
          onClose={viewReviewForm}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewReviewForm}>
            <Box sx={ModalStyle}>
              <ReviewForm styles={styles} closeForm={viewReviewForm} />
            </Box>
          </Fade>
        </Modal>
      )}
      {showReviewDetails && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewReviewDetails}
          onClose={viewReviewDetails}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewReviewDetails}>
            <Box sx={ModalStyle}>
              <SelectedReviewDetail
                styles={styles}
                closeForm={viewReviewDetails}
              />
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}
