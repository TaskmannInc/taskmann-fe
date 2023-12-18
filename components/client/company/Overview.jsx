import Image from "next/image";
import styles from "../../../styles/client/Overview.module.css";

export default function Overviewpage() {
  return (
    <>
      <section className="hero" id="hero">
        <h2 className="hero_header">Revolutionizing Lifestyle For Everyone</h2>
        <p className="tagline">
          Connecting people with our trusted taskers to provide quality service
          at the cheapest rates
        </p>
      </section>
      <div className={styles.cardrow}>
        <div className={styles.container}>
          <h1>Our Vision</h1>
          <div className={styles.cardrow}>
            <div className={styles.main75}>
              <p>
                Taskmann vision is to provide everyone with the service they
                require at an affordable rate . All our taskers are trained with
                experience to ensure quality of service. Anyone can join our
                platform and take advantages of the services we provide{" "}
              </p>
            </div>
            <div className={styles.main25}>
              <Image src={""} alt={"box"} />
            </div>
          </div>
          <hr style={{ borderTop: "1px solid black" }} />
        </div>
      </div>

      <div
        className={styles.cardrow}
        style={{ backgroundColor: "lightslategrey" }}
      >
        <div className={styles.col}>
          <h1>A letter from our Founder</h1>
          <p>
            Read about our team’s commitment to provide everyone on our platform
            with services to better help our community.
          </p>
          <button>Read {"Varish's"} Letter</button>
        </div>
        <div className={styles.col}>
          <Image src={""} alt={"Avatar"} />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.cardrow}>
          <div className={styles.col}>
            <Image
              src={""}
              className="w3-round w3-image w3-opacity w3-hover-opacity-off"
              alt="Photo of Me"
            />
          </div>
          <div className={styles.col}>
            <h1>Why Us</h1>
            <p>
              Ever had feeling of struggling through several website to find out
              if the service they provide are reliable or not.
            </p>
            <p>
              Ever had this feeling of hiring someone {"you've"} heard of and
              not knowing if they will do a good job or not.
            </p>
            <p>
              With Taskmann, we simplify everything for you. Hire our Taskers
              with peace of mind.
            </p>
          </div>
        </div>
        <hr style={{ borderTop: "1px solid black" }} />
        <div className={styles.cardrow}>
          <div className={styles.col}>
            <h1>Your safety drives us</h1>
            <p>
              Whether {"you’re"} a customer or a tasker, your safety is
              essential, we are committed to doing our part and technology is at
              the heart of our approach. We specifically designed protocols to
              improve safety and help make it easier for everyone to get around.
            </p>
          </div>
          <div className={styles.col}>
            <Image
              src={""}
              className="w3-round w3-image w3-opacity w3-hover-opacity-off"
              alt="Photo of Me"
            />
          </div>
        </div>
        <div className={styles.cardrow}>
          <h1>Company Info</h1>
        </div>
        <div className={styles.cardrow}>
          <div className={styles.card}>
            <Image src={""} alt={"Photo of Me"} className={styles.cardimgtop} />
            <div className={styles.cardbody}>
              <h2 className={styles.cardtitle}>{"Culture"}</h2>
              <p>
                {"We’re"} building a company culture that support involvement
                and provide positive, fun ways for our employees to get together
                for personal and professional development activities, both
                within and outside normal company hours.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <Image src={""} alt={"Photo of Me"} className={styles.cardimgtop} />
            <div className={styles.cardbody}>
              <h2 className={styles.cardtitle}>{"Integrity"}</h2>
              <p>
                Taskmann Ethics and compliance policy outlines our commitment to
                integrity at the highest levels within the company. We encourage
                our taskers to read and understand our ethics within our
                workplace.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <Image src={""} alt={"Photo of Me"} className={styles.cardimgtop} />
            <div className={styles.cardbody}>
              <h2 className={styles.cardtitle}>{"Diversity"}</h2>
              <p>
                It is our goal to create a workplace that promotes inclusion and
                diversity. We believe having a diverse workforce improves our
                readiness to innovate and make better decisions.
              </p>
            </div>
          </div>
        </div>
        <hr style={{ borderTop: "1px solid black" }} />
        <div className={styles.cardrow}>
          <h1>Meet the Team</h1>
        </div>

        <div className={styles.cardrow}>
          <div className={styles.column}>
            <Image src={""} alt={"Avatar"} className={styles.img} />
            <h2>Varish</h2>
          </div>
          <div className={styles.column}>
            <Image src={""} alt={"Avatar"} className={styles.img} />
            <h2>James</h2>
          </div>
          <div className={styles.column}>
            <Image src={""} alt={"Avatar"} className={styles.img} />
            <h2>Shaun Ni</h2>
          </div>
        </div>
        <hr style={{ borderTop: "1px solid black" }} />

        <div className={styles.cardrow}>
          <h1>What our clients Say.</h1>
        </div>
        <div className={styles.cardrow}>
          <div className={styles.col}>
            <Image src={""} alt={"Avatar"} className={styles.img} />
            <h2>Liz.L</h2>
            <p>
              I recently used Taskmann Service Company for a major home cleaning
              , and I {"couldn’t"} be happier with the results. From start to
              finish, the team at Taskmann was professional, reliable, and
              knowledgeable. They listened to my expectation and provided
              valuable input and suggestions to help make it a success.
            </p>
            <p>
              The workmanship was top-notch, and the cleaning was completed on
              time and on budget. The team was also very clean and organized,
              which made the whole experience much less stressful.
            </p>
            <p>
              Overall, I would highly recommend Taskmann Service Company to
              anyone within their reach. They truly exceeded my expectations and
              I am thrilled with the final result
            </p>
          </div>
        </div>
        <hr style={{ borderTop: "1px solid black" }} />

        <div
          className={styles.cardrow}
          style={{ backgroundColor: "lightgray" }}
        >
          <h1>FAQ</h1>
        </div>
        <div
          className={styles.cardrow}
          style={{ backgroundColor: "lightgray" }}
        >
          <div className={styles.col}>
            <h2>What is Taskmann?</h2>
            <p>
              Taskmann is a platform where people with professional skills can
              be hired with a peace of mind.
            </p>
            <p>
              We provide all types of services ranging from cleaning, moving,
              photography, event planner, and many more.
            </p>
            <p>We also provide services for businesses upon request.</p>
            <h2>How is the payment process?</h2>
            <p>
              When a customer hires a tasker, the payment is required to upfront
              through our website. The money is secured through Taskmann Pay as
              a guarantee for the tasker to get paid at the end of the job. When
              the task is completed and verified by one of our quality assurance
              team, the money will be deposited to the worker nominated bank
              account.
            </p>
          </div>
          <div className={styles.col}>
            <h2>Who will I be working with?</h2>
            <p>
              The worker totally depends on the type of job you choose. You can
              check profiles, reviews and recommendations to determine what best
              fits your requirements.
            </p>
            <p>
              If you {"don't"} want to deal with the hassle of choosing and
              wants the best professional on our market to do the job, you can
              choose so on the selection tab and we will take care of the rest.
            </p>
            <h2>Customer Satisfaction?</h2>
            <p>
              Customer satisfaction is our utmost priority. If a task is done
              that {"doesn't"} meet the requirements of the customer, a bad
              review and a refund will be initiated.
            </p>
            <p>
              After 3 consecutive bad review, the tasker will be officially put
              on review and determined by our quality assurance team if they can
              continue using the platform or not.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
