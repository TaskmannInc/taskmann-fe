import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiLogOut } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdManageAccounts, MdOutlineMail } from "react-icons/md";
import Cookies from "universal-cookie";
import { StaffLogoutRequestHook } from "../../utils/hooks/adminAuth";

export default function AccountDropdown({ session }) {
  const cookie = new Cookies();
  const router = useRouter();

  const __logoutCallBack = () => {
    sessionStorage.removeItem("TM_STF_USR");
    sessionStorage.removeItem("TM_STF_TK");
    sessionStorage.removeItem("TM_STF_ROLE");
    cookie.remove("TM_STF_USR");
    cookie.remove("TM_STF_TK");
    cookie.remove("TM_STF_ROLE");
    router.push("/staff/auth/login");
  };
  //on logout success
  const onSuccess = () => {
    __logoutCallBack();
  };

  //on logout error
  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const staffLogout = () => {
    LogoutRequest();
  };

  const sessionCleanLogout = () => {
    __logoutCallBack();
  };

  const {
    mutate: LogoutRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = StaffLogoutRequestHook(onSuccess, onError);
  return (
    <div className="account-profile-dropdown">
      <div className="drop-user-info">
        {session?.profile_image?.image_url && (
          <Image
            className="avatar"
            src={session?.profile_image?.image_url}
            alt="Profile"
            width={100}
            height={100}
            loading="lazy"
          />
        )}
        {!session?.profile_image?.image_url && <FaRegUserCircle size={30} />}
        {session ? (
          <span className="user-name">
            {session?.first_name}&nbsp;
            {session?.last_name}
          </span>
        ) : (
          <span className="user-name">Session timed out</span>
        )}
        {session && (
          <Link
            href={`mail-to: ${session?.email}`}
            className="user-mail"
            title={session?.email}
          >
            <MdOutlineMail size={15} />
            &nbsp;&nbsp;{" "}
            {session?.email?.length > 22
              ? session?.email?.slice(0, 22) + "..."
              : session?.email}
          </Link>
        )}
      </div>
      {session && (
        <Link
          href={"/tasker/account-settings"}
          className="profile-dropdown-action"
        >
          <MdManageAccounts size={20} />
          &nbsp;&nbsp; Account
        </Link>
      )}
      {session && (
        <button
          className="profile-dropdown-action"
          onClick={() => staffLogout()}
        >
          <BiLogOut size={20} />
          &nbsp;&nbsp; Logout
        </button>
      )}
      {!session && (
        <button
          className="profile-dropdown-action"
          onClick={() => sessionCleanLogout()}
        >
          <BiLogOut size={20} />
          &nbsp;&nbsp; Logout
        </button>
      )}
    </div>
  );
}
