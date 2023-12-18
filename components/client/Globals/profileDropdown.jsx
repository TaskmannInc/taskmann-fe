import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import { FaRegMoneyBillAlt, FaRegUserCircle } from "react-icons/fa";
import {
  MdManageAccounts,
  MdOutlineMail,
  MdShoppingCartCheckout,
} from "react-icons/md";
import Cookies from "universal-cookie";
import { useLoadingProvider } from "../../../store/loadingState";
import { LogoutLoader } from "../../ui-fragments/loaders";
import { CustomerLogoutRequestHook } from "../../utils/hooks/customerAuth";
export default function AccountDropdown({ session }) {
  //initlaizations
  const { sessionLoader, setSessionLoader } = useLoadingProvider();
  const cookie = new Cookies();
  const router = useRouter();

  const logoutNotif = (message) => toast(message);

  const logoutUser = () => {
    setSessionLoader(true);
    LogoutRequest();
  };
  //on logout success
  const onSuccess = () => {
    logoutNotif(
      <span style={{ color: `var(--green-primary)` }}>
        Logout successful. Redirecting to login...
      </span>
    );
    sessionStorage.removeItem("TM_AC_USR");
    sessionStorage.removeItem("TM_AC_TK");
    cookie.remove("TM_AC_USR");
    cookie.remove("TM_AC_TK");
    router.asPath == "/" ? router.reload() : router.push("/");
  };

  //on logout error
  const onError = (error) => {
    console.log("error: ", error.message);
    if (error?.message?.includes("401")) {
      logoutNotif(
        <span style={{ color: `var(--warning)` }}>
          An error occured while logging you out. You will be logged out of this
          current session now.
        </span>
      );
      sessionStorage.removeItem("TM_AC_USR");
      sessionStorage.removeItem("TM_AC_TK");
      cookie.remove("TM_AC_USR");
      cookie.remove("TM_AC_TK");
      router.asPath == "/" ? router.reload() : router.push("/");
    } else {
      logoutNotif(
        <span style={{ color: `var(--danger)` }}>
          An error occured: &nbsp;{error?.message}
        </span>
      );
    }
  };

  const { mutate: LogoutRequest } = CustomerLogoutRequestHook(
    onSuccess,
    onError
  );
  return (
    <>
      <Toaster reverseOrder={false} />
      <div className="account-profile-dropdown">
        <div className="drop-user-info">
          {sessionLoader ? (
            <LogoutLoader />
          ) : (
            <>
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
              {!session?.profile_image?.image_url && (
                <FaRegUserCircle size={30} />
              )}
              <span className="user-name">
                {session?.first_name}&nbsp;{session?.last_name}
              </span>
            </>
          )}

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
        </div>
        <Link
          href={"/account/account-settings"}
          className="profile-dropdown-action"
        >
          <MdManageAccounts size={20} />
          &nbsp;&nbsp; Account
        </Link>
        <Link href={"/orders"} className="profile-dropdown-action">
          <FaRegMoneyBillAlt size={20} />
          &nbsp;&nbsp; Orders
        </Link>
        <Link href={"/cart"} className="profile-dropdown-action">
          <MdShoppingCartCheckout size={20} />
          &nbsp;&nbsp; Cart
        </Link>
        <button
          className="profile-dropdown-action"
          onClick={() => logoutUser()}
        >
          <BiLogOut size={20} />
          &nbsp;&nbsp; Logout
        </button>
      </div>
    </>
  );
}
