import DOMPurify from "dompurify";
import { FaCaretDown, FaCaretUp, FaEdit, FaEye, FaTrash } from "react-icons/fa";

export const PoliciesList = ({ styles, modalEvents, currentDataItems }) => {
  var iconSize = 18;
  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });
  return (
    <tbody>
      {currentDataItems?.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            {item?.policy_name?.length > 40
              ? item?.policy_name?.slice(0, 40) + "..."
              : item?.policy_name}
          </td>
          <td>
            <p
              dangerouslySetInnerHTML={sanitizedData(
                item?.policy_description?.length > 150
                  ? `${item?.policy_description?.slice(0, 150)}...`
                  : item?.policy_description
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
