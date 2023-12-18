import React, { useState } from "react";
import style from "../../../styles/client/Update.module.css";

// export default function Updatepage() {
const tabsData = [
  {
    id: 1,
    title: <h2>Customers</h2>,
    content: (
      <div>
        <h2>Announcements</h2>
        <p>
          Taskmann is please to announce that we will be starting all services
          on Jan 2023.&nbsp;
        </p>
        <p>Follow us on our Social Media Platform to stay up to date:</p>
        <ul>
          <li>Instagram:</li>
          <li>Facebook:&nbsp;</li>
          <li>TikTok:&nbsp;</li>
        </ul>
        <h2>Guide for using Taskmann</h2>
        <p>
          Taskmann is dedicated to provide excellent customer service. Our
          Platform is designed to provide an upfront cost for most of the
          services we provide and all of our taskers goes through a vigorous
          background check, thus giving you peace of mind when hiring our
          taskers.&nbsp;
        </p>
        <p>Hiring a tasker can be as easy as 4 simple steps;</p>
        <ol>
          <li>Choose a task which suits you the best.</li>
          <li>Select the options according to your needs.</li>
          <li>
            Provide us with the details of the job and we will get back to you
            to confirm the details.&nbsp;
          </li>
          <li>Tasker will show up to complete the given task.&nbsp;</li>
        </ol>
        <h2>Policies for Customers</h2>
        <p>
          Taskmann is dedicated to provide an excellent customer service. Any
          service that you choose will be completed by professionally trained
          taskers.&nbsp;
          <br />
          More details can be found on our Customer satisfaction guarantee page:
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: <h2>Taskers</h2>,
    content: (
      <div>
        <h2>Announcements</h2>
        <p>
          Taskmann is please to announce that we will be starting all services
          on Jan 2023.&nbsp;
        </p>
        <p>Follow us on our Social Media Platform to stay up to date:</p>
        <ul>
          <li>Instagram:</li>
          <li>Facebook:&nbsp;</li>
          <li>TikTok:&nbsp;</li>
        </ul>
        <p>
          We are currently accepting application for taskers. Please follow the
          link below to apply.
        </p>
        <h2>Agreeing to terms and conditions</h2>
        <p>
          To be able to use the Uber platform, you would need to review and
          agree to Taskmann terms and conditions. Taskmann&nbsp; requires this
          to be completed before you can receive service requests.&nbsp;
        </p>
        <p>
          Please note that we cannot advise taskers regarding the terms of the
          agreement.
        </p>
        <h2>Task Management</h2>
        <p>
          Services provided by Taskmann are managed through Taskmann.ca.&nbsp;
          To better assist you with managing your daily tasks, please talk to
          your local manager.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    title: <h2>Registration</h2>,
    content: (
      <div>
        <h2>Announcements</h2>
        <p>
          Taskmann is currently hiring. If you want to register as a tasker
          please follow the link below for a guide on how to be part of our
          team.&nbsp;
        </p>
        <h2>3-Step registration process for taskers</h2>
        <ul>
          <li>Application process</li>
          <li>Background checks</li>
          <li>Creating your profile</li>
        </ul>
        <h2>Background and ID checks&nbsp;</h2>
        <p>
          According to our policies, Taskmann is required to run a background
          check and an id check on any applicants. By applying to join our team
          as a tasker, you give consent for Taskmann to run a background check
          and an ID check.
        </p>
        <h2>Account</h2>
        <p>
          All taskers will have an account where all the tasks they carried out
          will be posted and will be rated by our customers. The more higher
          rating the more chances for you to obtain more tasks.&nbsp;
        </p>
        <h2>Policies</h2>
        <p>Policies for taskers can be found by following the link below;</p>
      </div>
    ),
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(tabsData[0]);

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={style.tabscontainer}>
      <div className={style.tabs}>
        {tabsData.map((tab) => (
          <div
            key={tab.id}
            className={`{style.tab} ${activeTab.id === tab.id ? "active" : ""}`}
            onClick={() => handleClick(tab)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className={style.content}>{activeTab.content}</div>
    </div>
  );
};
export default Tabs;
