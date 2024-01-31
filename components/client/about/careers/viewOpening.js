import DOMPurify from "dompurify";
import Link from "next/link.js";
import { FaGraduationCap } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdKeyboardCommandKey } from "react-icons/md";
import { TbMapPinPin } from "react-icons/tb";
import styles from "../../../../styles/client/Form.module.css";
import { CloseButton } from "../../../admin/Globals/closeBtn.jsx";

export default function ViewCareerOpening({
  screenWidthMobile,
  screenWidthTablet,
  __selected_data,
  closeForm,
}) {
  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.modalForm}>
        <div className={styles.modalFormHeader}>
          <FaGraduationCap size={25} />
          <h6>Job opening details</h6>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>

        <div className={styles.formContainer}>
          <span
            className="mini-card"
            style={{
              backgroundColor: `${
                __selected_data?.status == true
                  ? `var(--green-darker)`
                  : `var(--danger)`
              }`,
              color: `var(--white)`,
              display: "flex",
              flexDirection:
                screenWidthMobile || screenWidthTablet ? "column" : "row",
              justifyContent:
                screenWidthMobile || screenWidthTablet
                  ? "flex-start"
                  : "space-between",
              alignItems:
                screenWidthMobile || screenWidthTablet
                  ? "flex-start"
                  : "center",
              rowGap: 5,
            }}
          >
            <small style={{ fontSize: `var(--text-md)` }}>
              Status:&nbsp;
              {__selected_data?.status == true
                ? "Open / Accepting applications"
                : "Closed / Not accepting applications"}
            </small>
            <small style={{ fontSize: `var(--text-md)` }}>
              Posted:&nbsp;&nbsp;
              {new Date(
                __selected_data?.created_at?.split("T"[0])
              ).toLocaleDateString()}{" "}
              &nbsp;
              {new Date(
                __selected_data?.created_at?.split("T"[1])
              ).toLocaleTimeString()}
            </small>
          </span>
          <span className="mini-card">
            <GoDotFill size={20} />
            &nbsp;&nbsp;
            {__selected_data?.position}
          </span>
          <span className="mini-card">
            <TbMapPinPin size={15} />
            &nbsp;&nbsp;
            {__selected_data?.location}
          </span>
          <span
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              lineHeightStep: "0.2rem",
              padding: "1rem 1.5rem",
            }}
            className="mini-card"
            dangerouslySetInnerHTML={sanitizedData(
              __selected_data?.description
            )}
          ></span>
          {__selected_data?.requirement && (
            <span className="mini-card">
              <MdKeyboardCommandKey size={20} />
              &nbsp;&nbsp;{__selected_data?.requirement}
            </span>
          )}
        </div>
        {__selected_data?.status == true && (
          <Link
            href={"mailto:taskmann@hotmail.com"}
            className={"submitBtn"}
            style={{
              backgroundColor: `var(--green-primary)`,
              color: `var(--white)`,
              borderRadius: `var(--radius-md)`,
            }}
          >
            Apply
          </Link>
        )}
      </div>
    </div>
  );
}
