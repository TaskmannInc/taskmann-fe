import React from "react";
import { BiArrowBack } from "react-icons/bi";
import styles from "../../../styles/client/About.module.css";
import Lottie from "react-lottie";
import visionAnimation from "../../../public/assets/animations/93463-vision-animation.json";
import Link from "next/link";
import Image from "next/image";
import companyData from "../../utils/data/companyInfo.json";
import memberData from "../../utils/data/teamInfo.json";
export default function AboutCompany() {
  //vision animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: visionAnimation,
    renderer: "svg",
  };
  return (
    <>
      <section className={styles.aboutBanner}>
        <h2 className={styles.aboutHeading}>
          Revolutionizing Lifestyle For Everyone
        </h2>
        <p className={styles.tagLine}>
          Connecting people with our trusted taskers to provide quality service
          at the cheapest rates.
        </p>
      </section>
      <div className={styles.aboutContent}>
        <div className={styles.vision}>
          <h3>Our vision</h3>
          <div className={styles.mainVisionText}>
            <p>
              {"Taskmann's"} vision is to provide everyone with the service they
              require at an affordable rate . All our taskers are trained with
              experience to ensure quality of service. Anyone can join our
              platform and take advantages of the services we provide.
            </p>
            <BiArrowBack
              size={30}
              color="gray"
              className={styles.visionArrow}
            />
            <span className={styles.visionAnimation}>
              <Lottie options={defaultOptions} height={150} width={150} />
            </span>
          </div>
        </div>
        <div className={styles.foundersLetter}>
          <div className={styles.leftSection}>
            <h3>A letter from our founder</h3>
            <p>
              Read about our {"team’s"} commitment to provide everyone on our
              platform with services to better help our community.{" "}
            </p>
            <Link href={`/blog?123`} className={styles.founderBlogLink}>
              Read {"Varish's"} Letter
            </Link>
          </div>
          <div className={styles.rightSection}>
            <Image
              className={styles.companyLogo}
              width={150}
              height={150}
              src="/assets/trademarks/taskmann-logo.png"
              alt="logo"
            />
          </div>
        </div>
        {/*Bragging rights*/}
        <div className={styles.braggingRights}>
          <div className={styles.braggingContainer}>
            <div className={styles.leftSection}>
              <Image
                className={styles.illustrationImage}
                width={300}
                height={350}
                src="/others/why-mirrored.jpg"
                alt="Why us?"
                style={{ borderRadius: `var(--radius-min)` }}
              />
            </div>
            <div className={styles.rightSection}>
              <h2>Why Us</h2>
              <p>
                Ever had feeling of struggling through several website to find
                out if the service they provide are reliable or not.
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
          <div className={styles.braggingContainer}>
            <div className={styles.leftSection}>
              <h2>Your safety drives us</h2>
              <p>
                Whether {"you’re"} a customer or a tasker, your safety is
                essential, we are committed to doing our part and technology is
                at the heart of our approach.
              </p>
              <p>
                We specifically designed protocols to improve safety and help
                make it easier for everyone to get around.
              </p>
            </div>
            <div className={styles.rightSection}>
              <Image
                className={styles.illustrationImage}
                width={320}
                height={250}
                src="/others/keyboard-safety.jpg"
                alt="Safety"
                style={{ borderRadius: `var(--radius-min)` }}
              />
            </div>
          </div>
        </div>
        {/*Info*/}
        <div className={styles.companyInfo}>
          <h3>Company Info</h3>
          <div className={styles.infoItems}>
            {companyData?.map((info, index) => {
              return (
                <div key={index + 1} className={styles.infoItem}>
                  <Image
                    className={styles.infoImage}
                    width={300}
                    height={300}
                    src={info?.image}
                    alt="Info"
                  />
                  <h4>{info?.topic}</h4>
                  <p>{info?.data}</p>
                </div>
              );
            })}
          </div>
        </div>
        {/*Team*/}
        <div className={styles.teamInfo}>
          <h3>Meet the team</h3>
          <div className={styles.teamMembers}>
            {memberData?.map((member, index) => {
              return (
                <div key={index + 1} className={styles.teamMember}>
                  <Image
                    className={styles.memberImage}
                    width={200}
                    height={200}
                    src={member?.image}
                    alt="Member"
                  />
                  <h4>{member?.topic}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
