import { useState } from "react";
import { MdCancel, MdFormatListBulletedAdd } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import Joi from "joi-browser";
import validation from "../../../utils/helpers/validation";
import { AddReviewHook } from "../../../utils/hooks/reviewsMgmtHook";
import { StatusNotification } from "../../../ui-fragments/notification";

export default function ReviewForm({ onAddReview, styles, closeForm }) {
  //component states
  const [rateHover, setRateHover] = useState(1);
  const [errors, setErrors] = useState({});
  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    rating: "",
    statement: "",
  });

  //defined validation schema
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required().email(),
    rating: Joi.string().optional().allow(null),
    statement: Joi.string().required(),
  };

  //hanlde form input change events
  const handleFormChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const requestBody = {
    name: `${formdata?.firstname} ${formdata?.lastname}`,
    statement: formdata.statement,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formdata, schema);
    setErrors(errors || {});
    if (!errors) {
      addReviewSubmission(requestBody);
    } else {
      console.log(errors);
    }
  };

  const onSuccess = (data) => {
    console.log(data);
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: addReviewSubmission,
    isLoading,
    isError,
    error,
    isSuccess,
  } = AddReviewHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }

  return (
    <form className={styles.reviewform} onSubmit={handleSubmit}>
      <div className={styles.reviewHeader}>
        <span className={styles.closeWrapper}>
          <button className={styles.closeBtn} onClick={closeForm}>
            <MdCancel size={20} />
          </button>
        </span>
        <MdFormatListBulletedAdd size={50} style={{ color: `var(--gold)` }} />
        {/* <FaStar size={20} /> */}
      </div>

      <div className={styles.formGroup}>
        <div className={styles.colGrid}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">First name</label>
            <input
              disabled={isLoading}
              type="text"
              id="name"
              name="firstname"
              defaultValue={""}
              onChange={handleFormChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Last name</label>
            <input
              disabled={isLoading}
              type="text"
              id="name"
              name="lastname"
              defaultValue={""}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <small className="field-validation">
          {(errors.firstname || errors.lastname) &&
            "Your full name is required"}
        </small>
        <div className={styles.inputGroup}>
          <label htmlFor="email">E-mail:</label>
          <input
            disabled={isLoading}
            type="email"
            id="email"
            name="email"
            defaultValue={""}
            onChange={handleFormChange}
          />
        </div>
        <small className="field-validation">
          {errors.email && "Your full email is required"}
        </small>
        <div className={styles.inputGroup}>
          <label htmlFor="rating">Rating:</label>
          <div className={styles.ratings}>
            {[...Array(5)].map((rate, i) => {
              const ratingValue = i + 1;
              return (
                <label className="ratings" key={i} title={ratingValue}>
                  <input
                    disabled={isLoading}
                    type="radio"
                    name="rating"
                    defaultValue={ratingValue}
                    onClick={(e) => {
                      setFormdata({ ...formdata, rating: e.target.value });
                      setRateHover(e.target.value);
                    }}
                  />
                  <AiOutlineStar
                    size={30}
                    className="rate"
                    onMouseEnter={(e) => {
                      setRateHover(e);
                    }}
                    // onMouseLeave={() => {
                    //   setRateHover(null);
                    // }}
                    color={
                      ratingValue <= (rateHover || formdata.rating)
                        ? "#ffc107"
                        : "#e4e5e9"
                    }
                  />
                </label>
              );
            })}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="statement">Message:</label>
          <textarea
            className=""
            disabled={isLoading}
            id="statement"
            name="statement"
            defaultValue={""}
            onChange={handleFormChange}
          ></textarea>
        </div>
        <small className="field-validation">
          {errors.statement && "Message cannot be empty"}
        </small>{" "}
      </div>
      <button
        className={styles.submitBtn}
        type="submit"
        disabled={isLoading || isSuccess}
      >
        {isLoading
          ? "Submitting your review ..."
          : isError
          ? "Retry"
          : "Add review"}
      </button>
      {isSuccess ? (
        <StatusNotification
          type={"success"}
          message={"Your review has been submitted successfully"}
        />
      ) : isError ? (
        <StatusNotification
          type={"error"}
          message={error?.response?.data?.error ?? error?.message}
        />
      ) : null}
    </form>
  );
}
