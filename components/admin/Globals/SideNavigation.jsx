import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { MdContentPaste, MdDisplaySettings, MdSettings } from "react-icons/md";
import { StaffContextStore } from "../../../store/staffContextStore";
export default function SideNavigation({ styles }) {
  //get logged in staff session
  const { session } = StaffContextStore();
  var iconSize = 18;
  const router = useRouter();
  //navigation states
  const [linkState, setLinkState] = useState("");

  //get page route params
  const getRoute = () => {
    const current_route = router?.asPath;
    setLinkState(current_route);
  };

  //on component mount / update - get current path
  useEffect(() => {
    getRoute();
  }, []);

  //admin nav links
  const adminNavLinks = [
    {
      title: "Dashboard",
      icon: <MdDisplaySettings size={iconSize} />,
      route: "/admin/cms/dashboard",
    },
    {
      title: "Users",
      icon: <HiOutlineUsers size={iconSize} />,
      route: "/admin/cms/users",
    },
    {
      title: "Services",
      icon: <FaTasks size={iconSize} />,
      route: "/admin/cms/services",
    },
    {
      title: "Orders & Tasks",
      icon: <BsCart4 size={iconSize} />,
      route: "/admin/cms/orders",
    },
    {
      title: "CMS",
      icon: <MdContentPaste size={iconSize} />,
      route: "/admin/cms/corporatecontent",
    },
    {
      title: "Settings",
      icon: <MdSettings size={iconSize} />,
      route: "/admin/account-settings",
    },
  ];

  return (
    <div className={styles.sideNavigation}>
      {(session?.roles?.[0] == "ADMIN" || session?.roles?.[0] == "MANAGER") && (
        <>
          {adminNavLinks?.map((linkItem, index) => {
            return (
              <Link
                className={styles.adminLink}
                key={index + 1}
                href={linkItem.route}
                title={linkItem.title}
              >
                <span
                  className={
                    linkState === `${linkItem?.route}`
                      ? `${styles.adminnavIconActive}`
                      : `${styles.adminnavIcon}`
                  }
                >
                  {linkItem.icon}
                </span>
                <span style={{ fontSize: "0.8rem" }}>{linkItem.title}</span>
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
}
