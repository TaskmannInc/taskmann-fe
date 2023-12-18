import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { StaffContextStore } from "../../../store/staffContextStore";
import AccountDropdown from "./profileDropdown";

export default function Header({ styles }) {
  //get logged in staff session
  const { session } = StaffContextStore();
  //profile drop events
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const viewDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div className={styles.header}>
      <span className={styles.logoWrapper}>
        <Link href={"/admin/cms/dashboard"}>
          <Image
            width={75}
            height={75}
            src="/assets/trademarks/taskmann-logo.png"
            alt="admin-logo"
            className="admin-logo"
            loading="lazy"
          />
        </Link>
      </span>
      <span className={styles.ProfileOptions}>
        {session && (
          <small>
            <b>
              {session?.first_name}&nbsp;
              {session?.last_name}
            </b>
            &nbsp;&nbsp;
            {`(${session?.roles[0]?.replace("[" && "]", " ")})`}
          </small>
        )}
        {session?.profile_image?.image_url && (
          <Image
            className={"staff-profile"}
            alt="Profile"
            src={session?.profile_image?.image_url}
            loading="lazy"
            onClick={viewDropdown}
            width={50}
            height={50}
          />
        )}
        {!session?.profile_image?.image_url && (
          <button
            className="fallback-staff-profile"
            onClick={() => viewDropdown()}
          >
            <HiOutlineUser size={20} title={"Staff"} />
          </button>
        )}
      </span>
      {showProfileDropdown && <AccountDropdown session={session} />}
    </div>
  );
}
