import { useState } from "react";
import { BsWindowStack } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import styles from "../../../../styles/admin/Services.module.css";
import MainServiceManagement from "./subs/mainService";
import SubServiceManagement from "./subs/subServices";
import PriceTierManagement from "./subs/priceTier";

/*Modal Imports*/

export default function ServiceManagement() {
  var iconSize = 15;
  //component states

  const [subComponentType, setSubComponentType] = useState("main-service");

  //---->Modal event triggers<------//
  const viewMainServices = () => {
    setSubComponentType("main-service");
  };

  const viewSubServices = () => {
    setSubComponentType("sub-service");
  };

  const viewPriceTier = () => {
    setSubComponentType("service-price-tier");
  };

  //pagination states
  var itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  return (
    <div className={styles.servicemanagementDashboard}>
      <div className={styles.servicemgmtHeader}>
        <h5>Service Management</h5>
        <div>
          <button
            type="button"
            onClick={() => viewMainServices()}
            className={
              subComponentType == "main-service"
                ? styles.componentBtnActive
                : ""
            }
          >
            <FaTasks size={iconSize} />
            All serivces
          </button>
          {/* <button
            type="button"
            onClick={() => viewSubServices()}
            className={
              subComponentType == "sub-service" ? styles.componentBtnActive : ""
            }
          >
            <BsWindowStack size={iconSize} />
            Sub services
          </button> */}
          <button
            type="button"
            onClick={() => viewPriceTier()}
            className={
              subComponentType == "service-price-tier"
                ? styles.componentBtnActive
                : ""
            }
          >
            {/* <MdPriceChange size={iconSize} /> */}
            Price tier
          </button>
        </div>
      </div>
      {subComponentType == "main-service" && (
        <MainServiceManagement styles={styles} />
      )}
      {subComponentType == "sub-service" && (
        <SubServiceManagement styles={styles} />
      )}
      {subComponentType == "service-price-tier" && (
        <PriceTierManagement styles={styles} />
      )}
    </div>
  );
}
