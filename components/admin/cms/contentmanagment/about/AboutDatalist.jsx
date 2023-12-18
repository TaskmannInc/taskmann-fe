import DOMPurify from "dompurify";
import Image from "next/image";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export const AboutList = ({ styles, modalEvents, currentDataItems }) => {
  var iconSize = 18;
  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });
  return (
    <tbody>
      {currentDataItems?.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td className={styles.coverColumn}>
            {item?.content_image?.image_url ? (
              <Image
                src={item?.content_image?.image_url}
                width={50}
                height={50}
                alt="Cover"
                className={styles.tableImage}
              />
            ) : (
              <BsInfoCircleFill size={25} />
            )}
          </td>
          <td>
            {item?.header?.length > 40
              ? item?.header?.slice(0, 40) + "..."
              : item?.header}
          </td>
          <td>
            <p
              dangerouslySetInnerHTML={sanitizedData(
                item?.content?.length > 150
                  ? `${item?.content?.slice(0, 150)}...`
                  : item?.content
              )}
            ></p>
          </td>
          <td>
            <button
              className={styles.viewButton}
              onClick={() => modalEvents?.viewDetailModal(item)}
            >
              <FaEye size={iconSize} style={{ color: `var(--dark-2)` }} />
            </button>

            <button
              className={styles.editButton}
              onClick={() => modalEvents?.viewUpdateModal(item)}
            >
              <FaEdit size={iconSize} style={{ color: `var(--green-dark)` }} />
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => modalEvents?.viewDeletionModal(item)}
            >
              <FaTrash size={iconSize} style={{ color: `var(--danger)` }} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
