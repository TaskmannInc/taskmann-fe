import Image from "next/image";
import styles from "../../../styles/client/Safety.module.css";
import { safetyNotice } from "../../utils/data/safetynotice";

export default function SafetyPage() {
  return (
    <>
      <section className={styles.safetyBanner}>
        <h2 className={styles.safetyHeading}>Our commitment to safety</h2>
        <p className={styles.tagLine}>
          {`We want you to feel safe, make the most out of your time and be
          connected to the tasks that matters most to you. That’s why we’re
          committed to safety – we specifically set a new standard to ensure
          safety of all parties involved.`}
        </p>
      </section>
      <div className={styles.safetyContent}>
        {/*Safety notices*/}
        <div className={styles.safetyInfo}>
          <h3>Safety notice</h3>

          <div className={styles.infoItems}>
            {safetyNotice?.map((info, index) => {
              return (
                <div key={index + 1} className={styles.infoItem}>
                  <Image
                    className={styles.infoImage}
                    width={300}
                    height={320}
                    src={info?.ico}
                    alt="Info"
                  />
                  <h4>{info?.topic}</h4>
                  <p>{info?.data}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/*Safety assurances*/}
        <div className={styles.safetyAssurances}>
          <div className={styles.assuranceContainer}>
            <div className={styles.leftSection}>
              <Image
                className={styles.illustrationImage}
                width={600}
                height={350}
                src="/others/contractcleaner1_1.jpg"
                alt="Why us"
              />
            </div>
            <div className={styles.rightSection}>
              <h2>All Taskers are background Checked before they are hired.</h2>
              <p>
                Before anyone can use Taskmann, they must undergo a multi-step
                safety screening that includes a criminal record check, a
                background check and an ID check. In addition, every taskers is
                rescreened every 6 months.
              </p>
            </div>
          </div>
          <div className={styles.assuranceContainer}>
            <div className={styles.leftSection}>
              <h2>You have our support whenever you need it. </h2>
              <p>
                Taskmann support is available from 7 am to 11 pm ADT, 7 days a
                week and is handled by a team of trained safety agents.
              </p>
            </div>
            <div className={styles.rightSection}>
              <Image
                className={styles.illustrationImage}
                width={600}
                height={300}
                src="/others/parallels-support.png"
                alt="Safety"
              />
            </div>
          </div>
          <div className={styles.assuranceContainer}>
            <div className={styles.leftSection}>
              <Image
                className={styles.illustrationImage}
                width={600}
                height={350}
                src="/others/privacy.jpg"
                alt="Why us"
              />
            </div>
            <div className={styles.rightSection}>
              <h2>Your personal details stay private</h2>
              <p>
                Personal details is very important to us. That’s why we use
                technology to keep your details private. Once a service is
                booked, only our authorized employees will have access to the
                data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
