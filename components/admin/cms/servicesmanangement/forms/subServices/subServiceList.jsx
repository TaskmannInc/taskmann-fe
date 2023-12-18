import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FcParallelTasks } from "react-icons/fc";
import DOMPurify from "dompurify";
export const SubServicesList = ({ item, styles, subModalEvents }) => {
  var iconSize = 18;
  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });
  return (
    <div className={styles.subServiceTable}>
      <div className={styles.subHeader}>
        <span>
          <BsImages size={20} />
        </span>
        <span>Sub service name</span>
        <span>Description</span>
        <span>Status</span>
        <span>Sub actions</span>
      </div>
      <div className={styles.subBody}>
        {item?.subservice?.length > 0 ? (
          <>
            {item?.subservice?.map((sub, i) => {
              return (
                <div className={styles.subRow} key={i + 1}>
                  <span>
                    {sub?.subservice_image?.[0]?.image_url ? (
                      <Image
                        src={
                          sub?.subservice_image?.[0]?.image_url ??
                          "/assets/trademarks/taskmann-logo.png"
                        }
                        width={40}
                        height={40}
                        alt="cover"
                        className={styles.subServiceCover}
                        unoptimized
                      />
                    ) : (
                      <FcParallelTasks size={iconSize} />
                    )}
                  </span>
                  <span className={styles.subName}>
                    {sub?.sub_service_name}
                  </span>
                  <span
                    dangerouslySetInnerHTML={sanitizedData(
                      sub?.description?.length > 150
                        ? `${sub?.description?.slice(0, 150)}...`
                        : sub?.description
                    )}
                  ></span>
                  <span>{sub?.active == true ? "Active" : "Inactive"}</span>
                  <span>
                    <button
                      className={styles.viewButton}
                      onClick={() => subModalEvents?.viewSubDetailModal(sub)}
                    >
                      {
                        <FaEye
                          size={iconSize}
                          style={{ color: `var(--dark-2)` }}
                        />
                      }
                    </button>
                    &nbsp; &nbsp;
                    <button
                      className={styles.editButton}
                      onClick={() => subModalEvents?.viewSubUpdateModal(sub)}
                    >
                      <FaEdit
                        size={iconSize}
                        style={{ color: `var(--green-dark)` }}
                      />
                    </button>
                    &nbsp; &nbsp;
                    <button
                      className={styles.deleteButton}
                      onClick={() => subModalEvents?.viewSubDeletionModal(sub)}
                    >
                      <FaTrash
                        size={iconSize}
                        style={{ color: `var(--danger)` }}
                      />
                    </button>
                  </span>
                </div>
              );
            })}
          </>
        ) : (
          <span className={styles.noSubs}>
            <small>There are no related sub services</small>
          </span>
        )}{" "}
        <button
          onClick={() => subModalEvents?.viewSubAddititonModal(item)}
          type="button"
          className={styles.subAddition}
        >
          Add sub service
        </button>
      </div>
    </div>
  );
};
