import Link from "next/link";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FaArrowCircleRight } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlineScatterPlot } from "react-icons/md";

export default function CareerAdsSection({ styles }) {
  return (
    <div className={styles.careerAds}>
      <div className={styles.leftSection}>
        <h2>Do you want to make easy side money?</h2>
        <h3>Do you have a specific skill?</h3>
        <h5>Tell us about your skills and benefit from Taskmann</h5>
        <div className={styles.taskmannBenefits}>
          <span>
            <AiOutlineFieldTime size={20} />
            &nbsp; Earn Extra income on your time schedule.
          </span>
          <span>
            <GiReceiveMoney size={20} />
            &nbsp; Depending on the job you can earn up to $40/Hr.
          </span>
          <span>
            <MdOutlineScatterPlot size={20} />
            &nbsp; Access thousands of job opportunities, for free...
          </span>
        </div>
      </div>
      <div className={styles.rightSection}>
        <Link href={"staff/auth/onboarding"} className={styles.taskerAuthLink}>
          Earn Money As a Tasker &nbsp;
          <FaArrowCircleRight size={30} />
        </Link>
      </div>
    </div>
  );
}
