import { FaTasks } from "react-icons/fa";
import { CloseButton } from "../../../admin/Globals/closeBtn";
import Image from "next/image";
import Link from "next/link";

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
            {service?.sub_service_name?.length > 50
              ? `${service?.sub_service_name?.slice(0, 50)} ...`
              : service?.sub_service_name}
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
              service?.subservice_image?.[0]?.image_url ??
              "/assets/trademarks/taskmann-logo.png"
            }
            alt={service?.service_name}
            width={service?.subservice_image?.[0]?.image_url ? 100 : 80}
            height={service?.subservice_image?.[0]?.image_url ? 100 : 80}
            className={styles.webServiceDetailImage}
          />
          <Link
            href={`/services/sub-service-pricing?sv=${service?._id}`}
            className={styles.bookWebServiceLink}
          >
            Book service
          </Link>
        </span>

        <div
          className={styles.webServiceDescription}
          dangerouslySetInnerHTML={sanitizedData(service?.description)}
        ></div>
      </div>
    </div>
  );
}
