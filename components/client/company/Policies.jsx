import DOMPurify from "dompurify";
import React, { useState } from "react";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import styles from "../../../styles/client/Policies.module.css";
import { PrimaryPolicies } from "../../utils/data/PoliciesData";
import { GetPoliciesHook } from "../../utils/hooks/policiesHook";

export default function ServiceUsagePolicies() {
  //clean up html data
  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });

  //component states
  const [clicked, setClicked] = useState(false);
  const [allPolicies, setPolicies] = useState([]);

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  //POLICIES FETCH <-> API Request
  const onError = (error) => {
    console.log("fetch error", error);
  };

  const onSuccess = (data) => {
    const policies = data?.data?.result;
    console.log(data?.data?.result);
    console.log(policies);
    setPolicies(policies);
  };

  const { isLoading, isError, isSuccess, error } = GetPoliciesHook(
    onSuccess,
    onError
  );

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
        {isLoading ? (
          <div
            className={styles.policiesAccordionsContainer}
            style={{ filter: "blur(10px)" }}
          >
            {PrimaryPolicies?.map((item, index) => {
              return (
                <>
                  <div
                    className={styles.accordianItem}
                    onClick={() => toggle(index)}
                    key={index}
                  >
                    <span className={styles.heading}>{item.question}</span>{" "}
                    &nbsp;
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
                      <p
                        dangerouslySetInnerHTML={sanitizedData(item?.answer)}
                      ></p>
                    </div>
                  ) : null}
                </>
              );
            })}
          </div>
        ) : (
          isSuccess &&
          allPolicies?.length > 0 && (
            <div className={styles.policiesAccordionsContainer}>
              {allPolicies?.map((pol, _idx) => {
                return (
                  <>
                    <div
                      className={styles.accordianItem}
                      onClick={() => toggle(_idx)}
                      key={_idx}
                    >
                      <span className={styles.heading}>{pol.policy_name}</span>{" "}
                      &nbsp;
                      <span className={styles.icon}>
                        {clicked === _idx ? (
                          <BsFillArrowUpCircleFill size={20} />
                        ) : (
                          <BsFillArrowDownCircleFill size={20} />
                        )}
                      </span>
                    </div>
                    {clicked === _idx ? (
                      <div className={styles.accordianContent}>
                        <p
                          dangerouslySetInnerHTML={sanitizedData(
                            pol?.policy_description
                          )}
                        ></p>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>
          )
        )}
      </div>
    </>
  );
}
