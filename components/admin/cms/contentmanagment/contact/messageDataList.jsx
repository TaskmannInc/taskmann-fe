import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export const MessageList = ({ styles, currentDataItems, modalEvents }) => {
  var iconSize = 18;
  return (
    <tbody>
      {currentDataItems?.map((item, index) => (
        <div key={(index = +1)}>
          <tr>
            <td>{index + 1}</td>
            <td>{item?.first_name ?? "None"}</td>
            <td>{item?.last_name ?? "None"}</td>

            <td>
              {item?.email?.length > 30
                ? `${item?.email?.slice(0, 30)}...`
                : item?.email}
            </td>

            <td>
              {item?.phone_number?.length > 20
                ? `${item?.phone_number?.slice(0, 20)}...`
                : item?.phone_number}
            </td>
            <td>
              {item?.message?.length > 70
                ? `${item?.message?.slice(0, 70)}...`
                : item?.message}
            </td>
            {/* <td>Date added</td> */}
            <td>
              <button
                className={styles.viewButton}
                onClick={() => modalEvents?.viewDetailModal(item)}
              >
                <FaEye size={iconSize} style={{ color: `var(--dark-2)` }} />
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
