import Image from "next/image";
import { FaBlogger, FaEdit, FaEye, FaTrash } from "react-icons/fa";

export const BlogPostList = ({ styles, modalEvents, currentDataItems }) => {
  var iconSize = 18;
  return (
    <tbody>
      {currentDataItems?.map((item, index) => (
        <div key={index + 1}>
          <tr>
            <td>{index + 1}</td>

            <td className={styles.coverColumn}>
              {item?.blog_image?.image_url ? (
                <Image
                  src={item?.blog_image?.image_url}
                  width={50}
                  height={50}
                  alt="Cover"
                  className={styles.tableImage}
                  unoptimized
                />
              ) : (
                <FaBlogger size={35} />
              )}
            </td>
            <td>
              {item?.author?.length > 20
                ? `${item?.author?.slice(0, 20)}...`
                : item?.author}
            </td>
            <td>
              {item?.title?.length > 25
                ? `${item?.title?.slice(0, 25)}...`
                : item?.title}
            </td>
            <td>{item?.category}</td>

            <td>{item?.active == true ? "Active" : "Inactive"}</td>
            <td>{item?.created_at?.split("T")[0] ?? "Unavailable"}</td>

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
