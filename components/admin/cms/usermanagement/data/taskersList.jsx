import { BsBuildingLock, BsGear } from "react-icons/bs";
import { FaEdit, FaEye, FaTrash, FaUserShield } from "react-icons/fa";
import { NoTableData } from "../../../../ui-fragments/dataInteractions";
import { TableLoader } from "../../../../ui-fragments/loaders";
import TablePaginationInstance from "../../../Globals/Pagination";

export default function TaskersDataList({
  styles,
  isStaffLoading,
  taskerUsers,
  isStaffSuccess,
  modalEvents,
  pageCount,
  handlePageClick,
  currentDataItems,
}) {
  var iconSize = 18;
  var totalDataSet = taskerUsers?.length;
  return (
    <>
      {isStaffLoading ? (
        <TableLoader />
      ) : isStaffSuccess && taskerUsers?.length == 0 ? (
        <NoTableData />
      ) : isStaffSuccess && taskerUsers?.length > 0 ? (
        <>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Role</th>
                <th>Status</th>
                <th>
                  <BsGear size={"20"} />
                </th>
              </tr>
            </thead>
            <tbody>
              {taskerUsers?.map((rowItem, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{rowItem?.first_name}</td>
                  <td>{rowItem?.last_name}</td>
                  <td>{rowItem?.email}</td>
                  <td>{rowItem?.phone}</td>
                  <td>
                    {rowItem?.address} - {rowItem?.city}.
                  </td>
                  <td>
                    {rowItem?.roles?.[0] ? rowItem?.roles?.[0] : "Customer"}
                  </td>
                  <td>{rowItem?.active == true ? "Active" : "Inactive"}</td>
                  <td>
                    <button
                      title="View user details"
                      className={styles.viewButton}
                      onClick={() => modalEvents?.viewUserDetails(rowItem)}
                    >
                      <FaEye size={iconSize} color="#00c2a2" />
                    </button>
                    {rowItem?.roles?.[0] && (
                      <button
                        title="Update user role"
                        className={styles.viewButton}
                        onClick={() => modalEvents?.viewRoleUpdate(rowItem)}
                      >
                        <BsBuildingLock size={iconSize} color="#feb236" />
                      </button>
                    )}
                    <button
                      title="Change user status"
                      className={styles.editButton}
                      onClick={() => modalEvents?.viewStatusUpdate(rowItem)}
                    >
                      <FaUserShield size={iconSize} color="#b30012" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {taskerUsers?.length > 0 && (
            <div className="pagination-section">
              <div className="pagination-text">
                <p>
                  Showing <strong>{taskerUsers?.length ?? 0}</strong> out of{" "}
                  <strong>{totalDataSet ?? 0}</strong> items.
                </p>
              </div>
              <TablePaginationInstance
                pageCount={pageCount}
                changePage={handlePageClick}
              />
            </div>
          )}
        </>
      ) : (
        <NoTableData />
      )}
    </>
  );
}
