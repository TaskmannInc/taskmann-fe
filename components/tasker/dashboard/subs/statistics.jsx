import Image from "next/image";
import { BsTelephoneInbound } from "react-icons/bs";
import { FaRegFlag } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
/*Modal Imports*/
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import ContactAdmin from "./contactModal";
export default function SummaryInformation({
  styles,
  session,
  pendingTasks,
  completedTasks,
  cancelledTasks,
}) {
  const [showContactInfo, setshowContactInfo] = useState(false);

  const viewContactInfo = () => {
    setshowContactInfo(!showContactInfo);
  };
  const iconSize = 25;

  const stats = [
    {
      title: "Pending tasks",
      // icon: <BsMinecartLoaded size={iconSize} />,
      val: pendingTasks?.length ?? 0,
    },
    {
      title: "Completed tasks",
      // icon: <FaTasks size={iconSize} />,
      val: completedTasks?.length ?? 0,
    },
    {
      title: "Cancelled tasks",
      // icon: <BsMinecartLoaded size={iconSize} />,
      val: cancelledTasks?.length ?? 0,
    },
  ];
  return (
    <>
      <section className={styles.summaryLayout}>
        <div className={styles.taskerSummary}>
          {session ? (
            <>
              {session?.profile_image?.image_url ? (
                <Image
                  src={session?.profile_image?.image_url}
                  alt={"Avatar"}
                  width={205}
                  height={205}
                  className={styles.avatar}
                  loading="lazy"
                />
              ) : (
                <Image
                  src={"/assets/illustrations/male-avatar.png"}
                  alt={"Avatar"}
                  width={205}
                  height={205}
                  className={styles.avatar}
                  loading="lazy"
                />
              )}
              <div className={styles.taskerBio}>
                <h3>
                  {session?.first_name}&nbsp;
                  {session?.last_name}
                </h3>

                <span>{session?.email}</span>
              </div>

              {session && (
                <button
                  className={styles.contactLink}
                  onClick={() => viewContactInfo()}
                >
                  Contact admin
                </button>
              )}
            </>
          ) : (
            <h3>Your session expired</h3>
          )}
        </div>
        <div className={styles.taskerGeography}>
          <h2>Address</h2>
          {session ? (
            <>
              <div className={styles.adressInfo}>
                <span className={styles.iconWrapper}>
                  <BsTelephoneInbound size={25} />
                </span>
                <div className={styles.infoWrapper}>
                  <span>Phone / Mobile</span>
                  <span>{session?.phone ?? "Unavailable"}</span>
                </div>
              </div>
              <div className={styles.adressInfo}>
                <span className={styles.iconWrapper}>
                  <MdMyLocation size={25} />
                </span>
                <div className={styles.infoWrapper}>
                  <span>Location address</span>
                  <span>{session?.address ?? "Unavailable"}</span>
                </div>
              </div>
              <div className={styles.adressInfo}>
                <span className={styles.iconWrapper}>
                  <FaRegFlag size={25} />
                </span>
                <div className={styles.infoWrapper}>
                  <span>Country / Province / State</span>
                  <span>
                    {session?.city ? `${session?.city}, ` : ""}Canada.
                  </span>
                </div>
              </div>
            </>
          ) : (
            <h3>Your session expired</h3>
          )}
        </div>
        <div className={styles.taskerActivities}>
          {stats?.map((data, index) => {
            return (
              <div key={index + 1} className={styles.statsCard}>
                <h3>{data?.title}</h3>
                <span className={styles.amount}>{data?.val}</span>
              </div>
            );
          })}
        </div>
      </section>
      {showContactInfo && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewContactInfo}
          // onClose={viewContactInfo}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewContactInfo}>
            <Box sx={ModalStyle}>
              <ContactAdmin closeForm={viewContactInfo} />
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}

//--Material ui modal wrapper  styles--//
const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "70vh",
  overflowY: "auto",
  bgcolor: `var(--white)`,
  border: "none",
  boxShadow: 24,
  borderRadius: `var(--radius-md)`,
  p: 2,
};
