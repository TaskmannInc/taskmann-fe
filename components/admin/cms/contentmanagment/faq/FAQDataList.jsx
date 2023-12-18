import DOMPurify from "dompurify";
import { FaCaretDown, FaCaretUp, FaEdit, FaEye, FaTrash } from "react-icons/fa";

export const FAQList = ({ styles, currentDataItems, modalEvents }) => {
  var iconSize = 18;
  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });
  return (
    <tbody>
      {currentDataItems?.map((item, index) => (
        <div key={(index = +1)}>
          <tr>
            <td>{index + 1}</td>

            <td>
              {item?.question?.length > 35
                ? `${item?.question?.slice(0, 35)}...`
                : item?.question}
            </td>
            <td>
              <p
                dangerouslySetInnerHTML={sanitizedData(
                  item?.answer?.length > 150
                    ? `${item?.answer?.slice(0, 150)}...`
                    : item?.answer
                )}
              ></p>{" "}
            </td>
            <td>{item?.category ?? "None"}</td>
            <td>{item?.active == true ? "Active" : "Inactive"}</td>
            {/* <td>Date added</td> */}
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
        </div>
      ))}
    </tbody>
  );
};
