import { useState } from "react";
import { BiTask } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import styles from "../../../../styles/admin/Orders.module.css";
import AllOrders from "./subs/orders/allCustomerOrders";
import AllTasks from "./subs/tasks/allAssignedTasks";

export default function AllSystemOrders() {
  const iconSize = 18;

  //tab buttons
  const tabButtons = [
    {
      icon: <BsCart4 size={iconSize} color="var(--green-dark)" />,
      title: "Orders",
    },
    {
      icon: <BiTask size={iconSize} color="green" />,
      title: "Tasks",
    },
  ];

  //--component states--//
  //active buttons
  const [activeTab, setActiveTab] = useState("Orders");

  //filter buttons
  const [activeFilterBtn, setActiveFilterBtn] = useState("all");
  const filterBtnOnclick = (param) => {
    setActiveFilterBtn(param?.title);
  };

  return (
    <div className={styles.allserviceTasksLayout}>
      <h4 className={styles.title}>Tasks and Orders</h4>
      <div className={styles.buttonsWrapper}>
        {/*Tabs*/}
        <div className={styles.tabButtonsWrapper}>
          {tabButtons?.map((btnIntance, i) => (
            <button
              key={i + 1}
              type="button"
              title={`Show all ${btnIntance?.title}`}
              onClick={() => setActiveTab(btnIntance?.title)}
              className={
                activeTab == btnIntance?.title ? styles.activeFilterBtn : ""
              }
            >
              {btnIntance?.icon}
              {btnIntance?.title}
            </button>
          ))}
        </div>
      </div>

      {activeTab == "Orders" && (
        <AllOrders styles={styles} iconSize={iconSize} />
      )}
      {activeTab == "Tasks" && <AllTasks styles={styles} iconSize={iconSize} />}
    </div>
  );
}
