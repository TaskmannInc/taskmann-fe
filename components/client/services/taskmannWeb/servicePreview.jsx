import { FaTasks } from "react-icons/fa";
import { CloseButton } from "../../../admin/Globals/closeBtn";
import Image from "next/image";

export default function WebServicePreview({
  service,
  closeForm,
  styles,
  sanitizedData,
}) {
  return (
    <div style={{ width: "100%" }} className={styles.taskmannWebServicePreview}>
      <div className={"modalHeader"}>
        <FaTasks size={25} />
        <h4>
          <small style={{ fontWeight: "600", fontStyle: "italic" }}>
            {service?.service_name?.length > 50
              ? `${service?.service_name?.slice(0, 50)} ...`
              : service?.service_name}
          </small>
        </h4>
        <CloseButton className={"closeBtn"} closeFunc={closeForm} />
      </div>
      <div className={styles.webServiceDetail}>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Image
            src={
              service?.service_image?.[0]?.image_url ??
              "/assets/trademarks/taskmann-logo.png"
            }
            alt={service?.service_name}
            width={100}
            height={100}
            className={styles.webServiceDetailImage}
          />
        </span>

        <div
          className={styles.webServiceDescription}
          dangerouslySetInnerHTML={sanitizedData(service?.description)}
        ></div>
      </div>
    </div>
  );
}
