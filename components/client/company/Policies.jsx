import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { PrimaryPolicies } from "../../utils/data/PoliciesData";
import styles from "../../../styles/client/Policies.module.css";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";

export default function ServiceUsagePolicies() {
  const [clicked, setClicked] = useState(false);

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <>
      <section className={styles.policiesBanner}>
        <h2 className={styles.policiesHeading}>Policies & Terms of usage</h2>
        <p className={styles.tagLine}>
          Legal information and resources for using the Taskmann platform.
        </p>
      </section>

      <div className={styles.policiesSection}>
        <h3>
          Please note that <i>Taskmann Services, Inc.</i> may be referred as
          <i>Taskmann</i> for simplicity throughout the Policy sections.{" "}
        </h3>
        <div className={styles.policiesAccordionsContainer}>
          {PrimaryPolicies.map((item, index) => {
            return (
              <>
                <div
                  className={styles.accordianItem}
                  onClick={() => toggle(index)}
                  key={index}
                >
                  <span className={styles.heading}>{item.question}</span> &nbsp;
                  <span className={styles.icon}>
                    {clicked === index ? (
                      <BsFillArrowUpCircleFill size={20} />
                    ) : (
                      <BsFillArrowDownCircleFill size={20} />
                    )}
                  </span>
                </div>
                {clicked === index ? (
                  <div className={styles.accordianContent}>
                    <p>{item.answer}</p>
                  </div>
                ) : null}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
