import { FaCaretDown, FaCaretUp, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { SubServicesList } from "../subServices/subServiceList";
import Image from "next/image";
import DOMPurify from "dompurify";
export const MainServicesList = ({
  styles,
  viewSubServices,
  showSubServices,
  currentDataItems,
  modalEvents,
  subModalEvents,
}) => {
  var iconSize = 18;
  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });
  return (
    <tbody>
      {currentDataItems?.map((item, index) => (
        <div key={index + 1}>
          <tr
            className={
              showSubServices === index ? `${styles.selectedService}` : ""
            }
          >
            <td>{index + 1}</td>
            <td className={styles.coverColumn}>
              <Image
                src={
                  item?.service_image?.[0]?.image_url ??
                  "/assets/trademarks/taskmann-logo.png"
                }
                width={50}
                height={50}
                alt="Cover"
                className={styles.tableImage}
                unoptimized
              />
            </td>

            <td>{item?.service_name}</td>
            <td
              dangerouslySetInnerHTML={sanitizedData(
                item?.description?.length > 150
                  ? `${item?.description?.slice(0, 150)}...`
                  : item?.description
              )}
            ></td>
            <td>{item?.active == true ? "Active" : "Inactive"}</td>
            <td>{item?.created_at?.split("T")[0]}</td>
            <td>
              <button
                className={styles.viewButton}
                onClick={() => viewSubServices(index)}
              >
                {showSubServices === index ? (
                  <FaCaretUp
                    size={iconSize}
                    style={{ color: `var(--black)` }}
                  />
                ) : (
                  <FaCaretDown
                    size={iconSize}
                    style={{ color: `var(--black)` }}
                  />
                )}
              </button>
              <button
                className={styles.viewButton}
                onClick={() => modalEvents?.viewDetailModal(item)}
              >
                {<FaEye size={iconSize} style={{ color: `var(--dark-2)` }} />}
              </button>

              <button
                className={styles.editButton}
                onClick={() => modalEvents?.viewUpdateModal(item)}
              >
                <FaEdit
                  size={iconSize}
                  style={{ color: `var(--green-dark)` }}
                />
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => modalEvents?.viewDeletionModal(item)}
              >
                <FaTrash size={iconSize} style={{ color: `var(--danger)` }} />
              </button>
            </td>
          </tr>
          {showSubServices === index && (
            <SubServicesList
              item={item}
              styles={styles}
              subModalEvents={subModalEvents}
            />
          )}
        </div>
      ))}
    </tbody>
  );
};
