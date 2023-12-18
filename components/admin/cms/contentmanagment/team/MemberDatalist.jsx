import Image from "next/image";
import {
  FaCaretDown,
  FaCaretUp,
  FaEdit,
  FaEye,
  FaTrash,
  FaUsers,
} from "react-icons/fa";

export const MembersList = ({ styles, modalEvents, currentDataItems }) => {
  var iconSize = 18;
  return (
    <tbody>
      {currentDataItems?.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td className={styles.coverColumn}>
            {item?.member_image?.image_url ? (
              <Image
                src={item?.member_image?.image_url}
                width={50}
                height={50}
                alt="Cover"
                className={styles.tableImage}
              />
            ) : (
              <FaUsers size={25} />
            )}
          </td>
          <td>
            {item?.name?.length > 40
              ? item?.name?.slice(0, 40) + "..."
              : item?.name}
          </td>
          <td>
            {item?.position?.length > 40
              ? item?.position?.slice(0, 40) + "..."
              : item?.position}
          </td>
          <td>
            {item?.message?.length > 150
              ? item?.message?.slice(0, 150) + "..."
              : item?.message}
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
