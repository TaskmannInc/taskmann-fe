import Link from "next/link";
import styles from "../../../styles/client/Services.module.css";

export default function SubServiceDetails() {
  return (
    <>
      <section className={styles.servicesBanner}>
        <h2 className={styles.servicesHeading}>Our Services</h2>
        <p className={styles.tagLine}>
          Hire our professional taskers with peace of mind
        </p>
        <Link
          href={"/services/request-service"}
          className={styles.serviceReqLink}
        >
          Request a Service
        </Link>
      </section>
      <div className={styles.subServices}>Sub services</div>
    </>
  );
}
