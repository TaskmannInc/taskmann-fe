import DOMPurify from "dompurify";
import { FaInfoCircle } from "react-icons/fa";
import styles from "../../../../styles/client/Form.module.css";
import { CloseButton } from "../../../admin/Globals/closeBtn.jsx";

export default function ApplicationProcess({
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
          <FaInfoCircle size={25} />
          <h6>Application process</h6>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>

        <div className={styles.formContainer}>
          <span
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              lineHeightStep: "0.2rem",
              padding: "1rem 1.5rem",
            }}
            className="mini-card"
          >
            <ul>
              <li>
                Click the view {"(eye)"} button to view the job opening detail.
              </li>
              <li>Next, click on the apply button.</li>
              <li>This will launch your {"(default)"} mail application.</li>
              <li>
                Your subject line should be in the format:{" "}
                <b>
                  <i>{"TASKMANN CAREERS - The job opening title"}</i>
                </b>
              </li>
              <li>
                Attach your CV, cover letter{"(optional)"} to your mail body and
                send to:&nbsp;
                <a
                  href="mailto:taskmann@hotmail.com"
                  className="link"
                  style={{ color: "var(--green-primary)" }}
                >
                  taskmann@hotmail.com
                </a>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
}
