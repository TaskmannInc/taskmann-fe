import { useState } from "react";
import { MdCancel, MdFormatListBulletedAdd } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

export default function ReviewForm({ onAddReview, styles, closeForm }) {
  //component states
  const [rateHover, setRateHover] = useState(1);
  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    rating: "",
    message: "",
  });

  //hanlde form input change events
  const handleFormChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  //form submission function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formdata);
  };

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
              type="text"
              id="name"
              name="lastname"
              defaultValue={""}
              onChange={handleFormChange}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={""}
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="rating">Rating:</label>
          <div className={styles.ratings}>
            {[...Array(5)].map((rate, i) => {
              const ratingValue = i + 1;
              return (
                <label className="ratings" key={i} title={ratingValue}>
                  <input
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
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            defaultValue={""}
            onChange={handleFormChange}
          ></textarea>
        </div>
      </div>
      <button className={styles.submitBtn} type="submit">
        Add review
      </button>
    </form>
  );
}
