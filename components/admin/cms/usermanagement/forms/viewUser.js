import {
  FaRegAddressCard,
  FaUser,
  FaUserAlt,
  FaUserShield,
} from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import { CloseButton } from "../../../Globals/closeBtn";
import { MdEmail, MdPhoneInTalk } from "react-icons/md";
import { BsBuildingLock } from "react-icons/bs";

export default function ViiewSystemUser({ selectedUser, closeForm }) {
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaUserAlt size={20} />
          <h5 style={{ fontStyle: "italic" }}>
            {selectedUser?.first_name}
            {`'s`} info
          </h5>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <div className={styles.formContainer}>
          <span className="mini-card" style={{ justifyContent: "center" }}>
            ID:&nbsp;<i style={{ fontWeight: "700" }}>{selectedUser?._id}</i>
          </span>

          <div className={"grid-col-2"}>
            <div className={"formGroupWrapper"}>
              <span className="mini-card" title={selectedUser?.first_name}>
                <FaUser size={15} color="gray" />
                &nbsp;
                <bold>
                  {selectedUser?.first_name?.length > 20
                    ? `${selectedUser?.first_name?.slice(0, 19)}...`
                    : selectedUser?.first_name}
                </bold>
              </span>
            </div>
            <div className={"formGroupWrapper"}>
              <span className="mini-card" title={selectedUser?.last_name}>
                <FaUser size={15} color="gray" />
                &nbsp;
                <bold>
                  {selectedUser?.last_name?.length > 20
                    ? `${selectedUser?.last_name?.slice(0, 19)}...`
                    : selectedUser?.last_name}
                </bold>
              </span>
            </div>
          </div>
          <div className={"grid-col-2"}>
            <div className={"formGroupWrapper"}>
              <span className="mini-card" title={selectedUser?.email}>
                <MdEmail size={15} color="gray" />
                &nbsp;
                <bold>
                  {selectedUser?.email?.length > 20
                    ? `${selectedUser?.email?.slice(0, 19)}...`
                    : selectedUser?.email}
                </bold>
              </span>
            </div>
            <div className={"formGroupWrapper"}>
              <span className="mini-card" title={selectedUser?.phone}>
                <MdPhoneInTalk size={15} color="gray" />
                &nbsp;
                <bold>
                  {selectedUser?.phone?.length > 20
                    ? `${selectedUser?.phone?.slice(0, 19)}...`
                    : selectedUser?.phone}
                </bold>
              </span>
            </div>
          </div>
          <div className={"grid-col-2"}>
            <span className="mini-card">
              <span
                className="badge"
                style={
                  selectedUser?.verify_email == true
                    ? { backgroundColor: `var(--green-primary)` }
                    : { backgroundColor: `var(--danger)` }
                }
              >
                <MdEmail size={15} color="white" />
              </span>
              &nbsp; E-mail{" "}
              {selectedUser?.verify_email == true ? "verified" : "not verified"}
            </span>

            <span className="mini-card">
              <span
                className="badge"
                style={
                  selectedUser?.verify_phone == true
                    ? { backgroundColor: `var(--green-primary)` }
                    : { backgroundColor: `var(--danger)` }
                }
              >
                <MdPhoneInTalk size={15} color="white" />
              </span>
              &nbsp; Phone{" "}
              {selectedUser?.verify_phone == true ? "verified" : "not verified"}
            </span>
          </div>
          <div className={"grid-col-2"}>
            <div className={"formGroupWrapper"}>
              <span className="mini-card" title={`${selectedUser?.roles?.[0]}`}>
                <BsBuildingLock size={15} color="#feb236" />
                &nbsp;Role: &nbsp;
                <i style={{ textDecoration: "initial" }}>
                  {selectedUser?.roles?.[0]}
                </i>
              </span>
            </div>
            <div className={"formGroupWrapper"}>
              <span className="mini-card">
                <FaUserShield size={15} color="#b30012" />
                &nbsp;Status: &nbsp;
                <bold>
                  {selectedUser?.active == true ? "Active" : "Inactive"}
                </bold>
              </span>
            </div>
          </div>
          <div className={"formGroupWrapper"}>
            <span
              className="mini-card"
              title={`${selectedUser?.city && `${selectedUser?.city}, `}
                ${selectedUser?.address}`}
            >
              <FaRegAddressCard size={15} color="gray" /> &nbsp;
              <bold>
                {selectedUser?.city && `${selectedUser?.city}, `}
                {selectedUser?.address}
              </bold>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
