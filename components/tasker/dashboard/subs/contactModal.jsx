import { MdMail, MdOutlineQuestionMark } from "react-icons/md";
import styles from "../../../../styles/admin/Forms.module.css";
import { CloseButton } from "../../../admin/Globals/closeBtn";
import { FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import { taskmannContacts } from "../../../utils/constants/constants";

export default function ContactAdmin({ closeForm }) {
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaInfoCircle size={30} />
          <h4>Contact admin</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <div className={styles.formContainer}>
          <div
            title="Call taskmann admin"
            className="mini-card"
            style={{
              justifyContent: "space-between",
              backgroundColor: `var(--dark)`,
              color: `var(--white)`,
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <FaPhoneAlt size={25} />
              &nbsp; Call
            </span>
            <Link
              href={`tel:${taskmannContacts[1]?.val}`}
              className="link"
              style={{
                padding: "0.25rem 0.5rem",
                textDecoration: "underline",
                backgroundColor: `var(--white)`,
                color: `var(--dark)`,
                fontWeight: "800",
                fontSize: "13px",
              }}
            >
              {taskmannContacts[1]?.val}
            </Link>
          </div>
          <div
            title="Mail taskmann admin"
            className="mini-card"
            style={{
              justifyContent: "space-between",
              backgroundColor: `var(--green-dark)`,
              color: `var(--white)`,
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <MdMail size={25} />
              &nbsp; Mail
            </span>
            <Link
              href={`mailto:${taskmannContacts[0]?.val}`}
              className="link"
              style={{
                padding: "0.25rem 0.5rem",
                textDecoration: "underline",
                backgroundColor: `var(--white)`,
                color: `var(--dark)`,
                fontWeight: "800",
                fontSize: "13px",
              }}
            >
              {taskmannContacts[0]?.val}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
