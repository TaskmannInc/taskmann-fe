import Link from "next/link";
import { AiOutlineFileDone, AiOutlineSafetyCertificate } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";

export default function AboutSummarySection({ styles }) {
  return (
    <div className={styles.summaryAbout}>
      <div className={styles.taskMannGeneral}>
        <span>
          <Link
            href={
              "https://www.google.com/maps/place/Halifax+Regional+Municipality,+NS,+Canada/@44.6816506,-63.4178539,10z/data=!4m6!3m5!1s0x4b4513bbd026ebc5:0xcd90670d5a4a675b!8m2!3d44.8857087!4d-63.1005273!16zL20vMDM2azBz"
            }
          >
            <GrMapLocation size={50} />
          </Link>
        </span>
        <h4>Taskmann was founded in Halifax, Nova Scotia.</h4>
        <p>
          {" "}
          We aim in providing the cheapest yet quality services around the
          Atlantic, hence helping in providing a better life.
        </p>
      </div>
      <div className={styles.secureService}>
        <span>
          <AiOutlineSafetyCertificate size={50} />
        </span>
        <h4>Safe and secure transaction with Taskmann</h4>
        <p>
          Customer Satisfaction is our main goal, that is why we only release
          the payment to the taskers after task is completed to your
          satisfaction.
        </p>
      </div>

      <div className={styles.expertService}>
        <span>
          {/* <GrUserExpert size={50} />
            &nbsp; */}
          <AiOutlineFileDone size={50} color="orange" />
        </span>
        <h4>Trusted reviews and ratings</h4>
        <p>
          Having someone reliable to do a task is very important, That is why we
          take the time to hire only the skilled taskers and make sure all
          ratings and reviews are verified.
        </p>
      </div>
    </div>
  );
}
