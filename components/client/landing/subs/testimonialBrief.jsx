import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function TestimonialBriefSection({ styles }) {
  return (
    <div className={styles.landingTestimonials}>
      <h4>We are the experts you can trust</h4>
      <div className={styles.testimonialColumns}>
        <section className={styles.testimonialDescription}>
          <p>
            Let our skilled taskers do the work for you while you relax and
            enjoy the day.
          </p>
          <p>
            The same-day service platform instantly connects you to trained
            professional taskers to assist with cleaning, moving, car wash and
            more.
          </p>
          <p>Get a quote for most of our services within minutes.</p>
        </section>
        <section className={styles.testimonialSlider}>
          {/* <TestimonialBanner styles={styles} /> */}
          <Link href={"/company/reviews"} className={styles.testimonialsLink}>
            <span>Testimonials</span> &nbsp;&nbsp;&nbsp;
            <FaArrowRight size={"30"} />
          </Link>
        </section>
      </div>
    </div>
  );
}
