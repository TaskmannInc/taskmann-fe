import { FaCaretDown, FaCaretUp, FaEdit, FaEye, FaTrash } from "react-icons/fa";

export const ReviewList = ({ styles, modalEvents, currentDataItems }) => {
  var iconSize = 18;
  return (
    <tbody>
      {currentDataItems?.map((item, index) => (
        <div key={(index = +1)}>
          <tr>
            <td>{index + 1}</td>

            <td>{item?.name}</td>
            <td>
              {item?.statement?.length > 70
                ? `${item?.statement?.slice(0, 70)}...`
                : item?.statement}
            </td>
            <td>{item?.created_at ?? "Time stamp unavailable"}</td>
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
