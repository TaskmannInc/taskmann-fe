import { useState } from "react";
import { BsGear } from "react-icons/bs";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdAddTask } from "react-icons/md";
import styles from "../../../../../styles/admin/Services.module.css";

/*Modal Imports*/
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import AddSystemService from "../forms/addService";
import DeleteSystemService from "../forms/deleteService";
import UpdateSystemService from "../forms/updateService";
import ViewSystemService from "../forms/viewService";

export default function SubServiceManagement({ styles }) {
  var iconSize = 15;
  //component states
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [showAdditionModal, setshowAdditionModal] = useState(false);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);

  //---->Modal event triggers<------//
  const viewDetailModal = () => {
    setShowPreviewModal(!showPreviewModal);
  };

  const viewAddititonModal = () => {
    setshowAdditionModal(!showAdditionModal);
  };

  const viewUpdateModal = (service) => {
    setshowUpdateModal(!showUpdateModal);
    localStorage.setItem("__service", JSON.stringify(service));
  };

  const viewDeletionModal = (service) => {
    setshowDeleteModal(!showDeleteModal);
    localStorage.setItem("__service", JSON.stringify(service));
  };

  const modalEvents = {
    viewDetailModal,
    viewAddititonModal,
    viewUpdateModal,
    viewDeletionModal,
  };

  //pagination states
  var itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  return (
    <>
      <div className={styles.servicedataset}>
        <div className={styles.tableHeader}>
          <h6>Showing results for all sub services</h6>
          <div className={styles.headerActions}>
            <span className={styles.searchContainer}>
              <FiSearch size={iconSize} />{" "}
              <input
                type="search"
                className={styles.searchinput}
                placeholder="Search here..."
              />
            </span>
            <button type="button" onClick={viewAddititonModal}>
              Add sub service <MdAddTask size="20" />
            </button>
          </div>
        </div>
        <div className={styles.tableData}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Sub service name</th>
                <th>Description</th>
                <th>Status</th>
                <th>
                  <BsGear size={"20"} />
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((item, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>

                  <td>Cleaning</td>
                  <td>Home cleaning</td>
                  <td>Active</td>
                  <td>
                    <button
                      className={styles.viewButton}
                      onClick={modalEvents?.viewDetailModal}
                    >
                      <FaEye size={"15"} color="gray" />
                    </button>
                    <button
                      className={styles.editButton}
                      onClick={modalEvents?.viewUpdateModal}
                    >
                      <FaEdit size={"15"} />
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={modalEvents?.viewDeletionModal}
                    >
                      <FaTrash size={"15"} color="red" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.tableFooter}>
          <span>Showing 20 out of 136 records</span>
          <div className="table-pagination">Pagination</div>
        </div>
      </div>
      {showAdditionModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewAddititonModal}
          onClose={viewAddititonModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewAddititonModal}>
            <Box sx={ModalStyle}>
              <AddSystemService
                styles={ModalStyle}
                closeForm={viewAddititonModal}
              />
            </Box>
          </Fade>
        </Modal>
      )}
      {showPreviewModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewDetailModal}
          onClose={viewDetailModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewDetailModal}>
            <Box sx={ModalStyle}>
              <ViewSystemService
                styles={ModalStyle}
                closeForm={viewDetailModal}
              />
            </Box>
          </Fade>
        </Modal>
      )}
      {showUpdateModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewUpdateModal}
          onClose={viewUpdateModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewUpdateModal}>
            <Box sx={ModalStyle}>
              <UpdateSystemService
                styles={ModalStyle}
                closeForm={viewDeletionModal}
              />
            </Box>
          </Fade>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewDeletionModal}
          onClose={viewDeletionModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewDeletionModal}>
            <Box sx={ModalStyle}>
              <DeleteSystemService
                styles={ModalStyle}
                closeForm={viewDeletionModal}
              />
            </Box>
          </Fade>
        </Modal>
      )}
    </>
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
  p: 2,
};
