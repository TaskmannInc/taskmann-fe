import Link from "next/link";
import {
  FaCaretDown,
  FaCaretUp,
  FaEdit,
  FaExternalLinkAlt,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import { MdLink } from "react-icons/md";

export const CareerPostList = ({
  styles,
  modalEvents,
  currentDataItems,
  copyToClipBoard,
}) => {
  var iconSize = 18;
  return (
    <tbody>
      {currentDataItems?.map((item, index) => (
        <div key={(index = +1)}>
          <tr>
            <td>{index + 1}</td>
            <td>
              {item?.position?.length > 20
                ? `${item?.position?.slice(0, 20)}...`
                : item?.position}
            </td>
            <td>
              {" "}
              {item?.location?.length > 20
                ? `${item?.location?.slice(0, 20)}...`
                : item?.location}
            </td>
            <td>
              {" "}
              {item?.description?.length > 45
                ? `${item?.description?.slice(0, 45)}...`
                : item?.description}
            </td>
            <td>{item?.status == true ? "Open" : "Closed"}</td>
            <td>
              <Link
                href={`${item?.link}#${item?._id}`}
                target="_blank"
                title="Visit career page"
              >
                <FaExternalLinkAlt size={15} />
              </Link>
              &nbsp; &nbsp;
              <button
                onClick={() => copyToClipBoard(`${item?.link}#${item?._id}`)}
                title="Copy link"
              >
                <MdLink size={25} />
              </button>
            </td>
            <td>{item?.requirements ? "Yes" : "None"}</td>
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
