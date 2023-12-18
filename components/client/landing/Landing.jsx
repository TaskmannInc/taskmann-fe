import Link from "next/link";
import styles from "../../../styles/client/Landing.module.css";
// import { BsChatHeart } from "react-icons/bs";
import AboutSummarySection from "./subs/aboutSummary";
import CareerAdsSection from "./subs/careerAds";
import FeaturedTasksSection from "./subs/featuredTasks";
import TestimonialBriefSection from "./subs/testimonialBrief";

export default function Landing() {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.carousel} id="carousel">
        <h2 className="">LIFE MADE EASIER</h2>
        <p>
          <span className={styles.slogan}>
            Ready to go from <i>To Do </i>to <i>Done</i>?
          </span>
          <span className={styles.description}>
            {" "}
            We provide instant quotes for most of our residential and commercial
            services
          </span>
        </p>
        <Link href={"/services/all-services"} className={styles.gotoServices}>
          Explore
        </Link>
      </div>
      <TestimonialBriefSection styles={styles} />
      <FeaturedTasksSection styles={styles} />
      <AboutSummarySection styles={styles} />
      <CareerAdsSection styles={styles} />
    </div>
  );
}
