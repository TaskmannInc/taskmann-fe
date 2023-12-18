import { useState } from "react";
import { GrView } from "react-icons/gr";
import { MdOutlineIosShare } from "react-icons/md";
import { TbMapPinPin } from "react-icons/tb";
import styles from "../../../styles/client/careerpage.module.css";
import {
  ClientDownTime,
  NoAvailableOpenings,
} from "../../ui-fragments/dataInteractions";

import Image from "next/image";
import { useRouter } from "next/router";
import { GetCareerOpeningsHook } from "../../utils/hooks/careerOpeningsMgmtHook";
/*Modal Imports*/
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { Toaster, toast } from "react-hot-toast";
import ViewCareerOpening from "./viewOpening";
import { FRONTEND_HOST } from "../../utils/constants/constants";
import { useEffect } from "react";

export default function SessionCart() {
  //modal styles
  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    maxHeight: "60vh",
    overflowY: "auto",
    bgcolor: `var(--white)`,
    border: "none",
    boxShadow: 24,
    borderRadius: `var(--radius-md)`,
    p: 2,
  };

  //initializations
  const router = window.location;
  var HOST = window.location.host;
  const hashParam = router.hash?.replace("#", "");
  console.debug("hash", hashParam);

  const currentPath = router.pathname;
  //component states
  const [careerListings, setCareerListings] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [__selected_data, setSelectedData] = useState(null);
  const [highlightCard, setHighlightCard] = useState(false);

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const viewDetailModal = (opening) => {
    setSelectedData(opening);
    setShowPreviewModal(!showPreviewModal);
  };

  //get current job openings
  const onGetCareersSuccess = (data) => {
    console.log("daata--->", data?.data);
    setCareerListings(data?.data?.result);
    if (hashParam) {
      setHighlightCard(true);
    }
    console.log(hashParam);
  };

  const onGetCareersError = (error) => {
    console.error(error);
  };

  const {
    isSuccess: getListingsSuccess,
    isError: getListingsError,
    isLoading: listingsLoading,
  } = GetCareerOpeningsHook(onGetCareersSuccess, onGetCareersError);

  //search function
  const handleSearchOpenings = (e) => {
    setSearchInput(e.target.value);
  };

  //copy to clipboard
  const copyToClipBoard = (param) => {
    navigator.clipboard.writeText(param);
    toast(`Shareable link copied`, {
      position: "top-center",
      icon: "✅",
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
    });
  };

  const triggerHighlight = () => {};

  useEffect(() => {
    triggerHighlight();
  }, []);
  return (
    <div className={styles.openingsContainer}>
      <Toaster reverseOrder={false} />
      <div className={styles.openingsHeader}>
        <h1>Career openings</h1>
        <div className={styles.openingsSearchWrapper}>
          <input
            type="search"
            value={searchInput}
            className="search-opening"
            placeholder="Search openings here ..."
            onChange={handleSearchOpenings}
          />
        </div>
      </div>
      {listingsLoading ? (
        <div className={`${styles.cartBody} blurred`}>
          {[...Array(3)]?.map((_, i) => {
            return (
              <div
                className={styles.jobOpeningsBody}
                key={i + 1}
                style={{ filter: `blur(10px)` }}
              ></div>
            );
          })}
        </div>
      ) : getListingsSuccess && careerListings?.length > 0 ? (
        <div className={styles.jobOpeningsBody}>
          {careerListings?.map((item, i) => {
            return (
              <div
                className={styles.listingItem}
                style={
                  highlightCard && item?._id == hashParam
                    ? { backgroundColor: `var(--green-light)` }
                    : {}
                }
                key={i + 1}
                id={item?._id}
              >
                <span className={styles.listitemImageWrapper}>
                  <Image
                    src={"/assets/trademarks/taskmann-logo-white.png"}
                    alt={"Logo"}
                    width={400}
                    height={300}
                    className={"logo"}
                    loading="lazy"
                  />
                </span>

                <div className={styles.listingItemInfo}>
                  <div className={styles.careerListigDetail}>
                    <span
                      className={styles.status}
                      style={{
                        backgroundColor: `${
                          item?.status == true
                            ? `var(--green-darker)`
                            : `var(--danger)`
                        }`,
                      }}
                    >
                      {item?.status == true ? "Open" : "Closed"}
                    </span>
                    <span className={styles.roleTitle}>{item?.position}</span>
                    <span className={styles.location}>
                      <TbMapPinPin size={15} />
                      &nbsp;&nbsp;
                      {item?.location}
                    </span>
                    <span className={styles.detailMisc}>
                      <small>
                        Posted:&nbsp;&nbsp;
                        {new Date(
                          item?.created_at?.split("T"[0])
                        ).toLocaleDateString()}
                      </small>
                      <small>
                        {new Date(
                          item?.created_at?.split("T"[1])
                        ).toLocaleTimeString()}
                      </small>
                    </span>
                  </div>
                  <div className={styles.careerListigActions}>
                    <button type="button" onClick={() => viewDetailModal(item)}>
                      <GrView size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipBoard(`${HOST}${currentPath}#${item?._id}`)
                      }
                    >
                      <MdOutlineIosShare size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (getListingsSuccess && careerListings?.length == 0) ||
        careerListings?.length == "undefined" ? (
        <NoAvailableOpenings
          notification={
            "Hey, there. We currently have no listings avaibale. Kindly, do check back later"
          }
        />
      ) : getListingsError ? (
        <ClientDownTime
          notification={
            "An error occured while getting the current openings at Taskmann and its partner organizations."
          }
        />
      ) : (
        <NoAvailableOpenings
          notification={
            "There are currently no openings at taskmann nor its partner organizations"
          }
        />
      )}
      {showPreviewModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewDetailModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewDetailModal}>
            <Box sx={ModalStyle}>
              <ViewCareerOpening
                styles={styles}
                closeForm={viewDetailModal}
                __selected_data={__selected_data}
              />
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
}
