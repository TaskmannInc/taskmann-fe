import { useEffect, useState } from "react";
import { BsFunnel, BsPersonGear, BsPersonLinesFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { TbUserDollar } from "react-icons/tb";
import styles from "../../../../styles/admin/Usermanagement.module.css";

/*Modal Imports*/
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import {
  GetAllCustomersDataHook,
  GetAllStaffMembersDataHook,
} from "../../../utils/hooks/usermgmtHook";
import AdminDataList from "./data/adminList";
import CustomersDataList from "./data/customerList";
import TaskersDataList from "./data/taskersList";
import UserDataList from "./data/userList";
import ChangeUserRole from "./forms/changeRole";
import UpdateUserStatus from "./forms/updateStatus";
import ViiewSystemUser from "./forms/viewUser";
export default function UsersManagement() {
  //data set
  const filterButtons = [
    { icon: <RxDashboard size={iconSize} />, title: "users" },
    { icon: <TbUserDollar size={iconSize} />, title: "customers" },
    { icon: <BsPersonLinesFill size={iconSize} />, title: "taskers" },
    { icon: <BsPersonGear size={iconSize} />, title: "administrators" },
  ];
  var iconSize = 15;
  //component states
  const [activeComponent, setActiveComponent] = useState("users");
  const [activeFilterBtn, setActiveFilterBtn] = useState("users");

  const [staffUsers, setStaffUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [taskerUsers, setTaskerUsers] = useState([]);
  const [customerUsers, setCustomerUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [showRoleUpdate, setshowRoleUpdate] = useState(false);
  const [showStatusChange, setshowStatusChange] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setsearchInput] = useState("");

  //pagination states
  var itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  const filterBtnOnclick = (param) => {
    setActiveFilterBtn(param?.title);
    setActiveComponent(param?.title);
  };

  const viewUserDetails = (param) => {
    setSelectedUser(param);
    setShowDetails(!showDetails);
  };

  //---->Modal event triggers<------//
  const viewRoleUpdate = (param) => {
    console.log(param);
    setSelectedUser(param);
    setshowRoleUpdate(!showRoleUpdate);
  };

  const viewStatusUpdate = (param) => {
    setSelectedUser(param);
    setshowStatusChange(!showStatusChange);
  };

  const modalEvents = {
    viewUserDetails,
    viewRoleUpdate,
    viewStatusUpdate,
  };

  //get all staff members
  const onStaffError = (response) => {
    console.log("error", response);
    setStaffUsers([]);
  };

  const onStaffSuccess = (response) => {
    setStaffUsers(response?.data?.result);

    //filter tasker users
    const filterTaskers = response?.data?.result?.filter(function (item) {
      return item?.roles?.[0] == "TASKER";
    });
    console.log("filtered taskers", filterTaskers);
    setTaskerUsers(filterTaskers);

    //filter admin users
    const filterAdmins = response?.data?.result?.filter(function (item) {
      return item?.roles?.[0] == "ADMIN";
    });
    console.log("filtered Admins", filterAdmins);
    setAdminUsers(filterAdmins);
  };

  const {
    data: staffData,
    isLoading: isStaffLoading,
    isError: isStaffError,
    isSuccess: isStaffSuccess,
    error: staffError,
  } = GetAllStaffMembersDataHook(onStaffSuccess, onStaffError);
  const allStaffUsers = staffData?.data?.result;

  //get all customers
  const onCustomerError = (response) => {
    setCustomerUsers([]);
    console.log("error", response);
  };

  const onCustomerSuccess = (response) => {
    setCustomerUsers(response?.data?.result);
  };

  const {
    data: customerData,
    isLoading: isCustomerLoading,
    isError: isCustomerError,
    isSuccess: isCustomerSuccess,
    error: customerError,
  } = GetAllCustomersDataHook(onCustomerSuccess, onCustomerError);
  const allCustomerUsers = customerData?.data?.result;

  //join staff and customer users data sets
  const concatenateUsers = () => {
    var concatUsers = allStaffUsers?.concat(allCustomerUsers);
    setAllUsers(concatUsers);
  };

  useEffect(() => {
    concatenateUsers();
  }, [staffData, customerData]);

  // Pagination
  var currentDataItems = (
    allUsers ||
    staffUsers ||
    adminUsers ||
    taskerUsers
  )?.slice(itemOffset, endOffset);
  var pageCount = Math.ceil(allUsers?.length / itemsPerPage);

  // //page numbers click event handler
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allUsers?.length;
    setItemOffset(newOffset);
  };

  // //search feature
  const handleSearchChange = (e) => {
    e.preventDefault();
    setsearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    currentDataItems = (
      allUsers ||
      staffUsers ||
      adminUsers ||
      taskerUsers
    )?.filter((result) => {
      pageCount = Math.ceil(currentDataItems?.length / itemsPerPage);
      return (
        result?.first_name?.match(new RegExp(searchInput, "i")) ||
        result?.last_name?.match(new RegExp(searchInput, "i")) ||
        result?.phone?.match(new RegExp(searchInput, "i")) ||
        result?.email?.match(new RegExp(searchInput, "i")) ||
        (result?.first_name + " " + result?.last_name)?.match(
          new RegExp(searchInput, "i")
        ) ||
        (result?.last_name + " " + result?.first_name)?.match(
          new RegExp(searchInput, "i")
        )
      );
    });
  }
  return (
    <div className={styles.usermanagementDashboard}>
      <div className={styles.usermgmtHeader}>
        <h5>User Management</h5>
        <div>
          <BsFunnel size={iconSize} title="Click on an option to filter" />
          {filterButtons?.map((btnIntance, i) => (
            <button
              key={i + 1}
              type="button"
              title="Show all users"
              onClick={() => filterBtnOnclick(btnIntance)}
              disabled={isStaffLoading && isCustomerLoading}
              className={
                activeFilterBtn == btnIntance?.title
                  ? styles.activeFilterBtn
                  : ""
              }
            >
              {btnIntance?.icon}
              all {btnIntance?.title}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.userdataset}>
        <div className={styles.tableHeader}>
          <h6>Showing results for {activeComponent}</h6>
          <div className={styles.headerActions}>
            <span className={styles.searchContainer}>
              <FiSearch size={iconSize} />{" "}
              <input
                readOnly={allUsers?.length == 0}
                type="search"
                className={styles.searchinput}
                placeholder="Search here..."
                disabled={!allUsers}
                onChange={handleSearchChange}
              />
            </span>
            {/* <button type="button" onClick={viewAddititonModal}>
              Add user <MdOutlineGroupAdd size="20" />
            </button> */}
          </div>
        </div>
        <div className={styles.tableData}>
          {activeComponent === "users" && (
            <UserDataList
              styles={styles}
              isCustomerLoading={isCustomerLoading}
              isStaffLoading={isStaffLoading}
              isCustomerSuccess={isCustomerSuccess}
              isStaffSuccess={isStaffSuccess}
              staffUsers={staffUsers}
              customerUsers={customerUsers}
              allUsers={allUsers}
              setAllUsers={setAllUsers}
              modalEvents={modalEvents}
              pageCount={pageCount}
              handlePageClick={handlePageClick}
              currentDataItems={currentDataItems}
            />
          )}
          {activeComponent === "customers" && (
            <CustomersDataList
              styles={styles}
              isCustomerLoading={isCustomerLoading}
              isCustomerSuccess={isCustomerSuccess}
              customerUsers={customerUsers}
              modalEvents={modalEvents}
              pageCount={pageCount}
              handlePageClick={handlePageClick}
              currentDataItems={currentDataItems}
            />
          )}
          {activeComponent === "taskers" && (
            <TaskersDataList
              styles={styles}
              isStaffLoading={isStaffLoading}
              isStaffSuccess={isStaffSuccess}
              taskerUsers={taskerUsers}
              modalEvents={modalEvents}
              pageCount={pageCount}
              handlePageClick={handlePageClick}
              currentDataItems={currentDataItems}
            />
          )}
          {activeComponent === "administrators" && (
            <AdminDataList
              styles={styles}
              isStaffLoading={isStaffLoading}
              isStaffSuccess={isStaffSuccess}
              adminUsers={adminUsers}
              modalEvents={modalEvents}
              pageCount={pageCount}
              handlePageClick={handlePageClick}
              currentDataItems={currentDataItems}
            />
          )}
        </div>
      </div>

      {showDetails && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewUserDetails}
          onClose={viewUserDetails}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewUserDetails}>
            <Box sx={ModalStyle}>
              <ViiewSystemUser
                styles={ModalStyle}
                closeForm={viewUserDetails}
                selectedUser={selectedUser}
              />
            </Box>
          </Fade>
        </Modal>
      )}

      {showRoleUpdate && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewRoleUpdate}
          onClose={viewRoleUpdate}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewRoleUpdate}>
            <Box sx={ModalStyle}>
              <ChangeUserRole
                styles={ModalStyle}
                closeForm={viewRoleUpdate}
                selectedUser={selectedUser}
              />
            </Box>
          </Fade>
        </Modal>
      )}

      {showStatusChange && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewStatusUpdate}
          onClose={viewStatusUpdate}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewStatusUpdate}>
            <Box sx={ModalStyle}>
              <UpdateUserStatus
                styles={ModalStyle}
                closeForm={viewStatusUpdate}
                selectedUser={selectedUser}
              />
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
}
//--Material ui modal wrapper  styles--//
const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "70vh",
  overflowY: "auto",
  bgcolor: `var(--white)`,
  border: "none",
  boxShadow: 24,
  borderRadius: `var(--radius-sm)`,
  p: 3,
};
