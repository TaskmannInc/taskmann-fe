import DOMPurify from "dompurify";
import Image from "next/image";
import React, { useState } from "react";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import styles from "../../../styles/client/Taskers.module.css";
import { PrimaryPolicies } from "../../utils/data/PoliciesData";
import { GetPoliciesHook } from "../../utils/hooks/policiesHook";
import { GetTaskTeamMembersHook } from "../../utils/hooks/taskersHook";

export default function TaskersUsagePolicies() {
  //clean up html data
  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });

  //component states
  const [clicked, setClicked] = useState(false);
  const [allPolicies, setPolicies] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }
    setClicked(index);
  };

  //POLICIES FETCH <-> API Request
  const onPoliciesError = (error) => {
    console.log("fetch error", error);
  };

  const onPoliciesSuccess = (data) => {
    const policies = data?.data?.result;
    setPolicies(policies);
  };

  const onTeamFetchError = (error) => {
    console.log("fetch error", error);
  };

  const onTeamFetchSuccess = (data) => {
    const teamMembers = data?.data?.result;
    setTeamMembers(teamMembers);
  };

  const {
    isLoading: isPoliciesLoading,
    isError: isPoliciesError,
    isSuccess: IsPolicesSuccess,
    error: policiesError,
  } = GetPoliciesHook(onPoliciesSuccess, onPoliciesError);

  const {
    isLoading: isMembersLoading,
    isError: isMembersError,
    isSuccess: isMembersSuccess,
    error: membersError,
  } = GetTaskTeamMembersHook(onTeamFetchSuccess, onTeamFetchError);

  return (
    <>
      <section className={styles.taskersBanner}>
        <h2 className={styles.taskersHeading}>
          Our Taskers, work ethics and more...
        </h2>
        <p className={styles.tagLine}>
          Policies, work ethics and legal and behavioural compliances our
          taskers ought to abide by as taskmann members.
        </p>
      </section>

      <div className={styles.policiesSection}>
        <h3>Taskers guidelines and Virtues</h3>
        <h4>
          Please note that <i>Taskmann Services, Inc.</i> may be referred as
          <i>Taskmann</i> for simplicity throughout the taskers guidlines
          sections.{" "}
        </h4>

        {/*Taskers policies*/}
        {isPoliciesLoading ? (
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
          IsPolicesSuccess &&
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

        {/*Taskers*/}
        <h3 style={{ marginTop: "1.5rem" }}>Some of our taskers</h3>

        {isMembersLoading ? (
          <div
            className={styles.teamMembersContainer}
            style={{ filter: "blur(10px)" }}
          ></div>
        ) : (
          isMembersSuccess &&
          teamMembers?.length > 0 && (
            <div className={styles.teamMembersContainer}>
              {teamMembers?.map((members, _idx) => (
                <div className={styles.teamMember} key={_idx + 1}>
                  <Image
                    className={styles.memberAvatar}
                    width={70}
                    height={70}
                    src={
                      members?.member_image?.image_url ??
                      "/assets/trademarks/taskmann-logo.png"
                    }
                    alt="member-image"
                  />
                  <h3 className={styles.memberName}>{members?.name}</h3>
                  <h3
                    className={styles.memberName}
                    style={{ fontSize: "0.8rem" }}
                  >
                    {members?.position}
                  </h3>

                  <p className={styles.memberBio}>
                    {members?.message?.length > 600
                      ? `${members?.message?.slice(0, 599)}...`
                      : members?.message}
                  </p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </>
  );
}
