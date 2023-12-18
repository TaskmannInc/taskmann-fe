import DOMPurify from "dompurify";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export const PriceTierDataList = ({
  styles,
  modalEvents,
  currentDataItems,
}) => {
  var iconSize = 18;
  return (
    <tbody>
      {currentDataItems?.map((item, index) => (
        <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>{item?.tier_name}</td>
          <td>
            <span
              className={styles.tagLine}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  item?.description?.length > 40
                    ? `${item?.description?.slice(0, 40)} ...`
                    : item?.description
                ),
              }}
            ></span>
          </td>
          <td>
            {" "}
            <span
              style={{
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "0.8rem",
              }}
            >
              CAD $
            </span>
            &nbsp; {item?.price}
          </td>
          <td>{item?.active === true ? "Active" : "Inactive"}</td>
          <td>
            <button
              className={styles.viewButton}
              onClick={() => modalEvents?.viewDetailModal(item)}
            >
              <FaEye size={"15"} color="gray" />
            </button>
            <button
              className={styles.editButton}
              onClick={() => modalEvents?.viewUpdateModal(item)}
            >
              <FaEdit size={"15"} />
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => modalEvents?.viewDeletionModal(item)}
            >
              <FaTrash size={"15"} color="red" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
