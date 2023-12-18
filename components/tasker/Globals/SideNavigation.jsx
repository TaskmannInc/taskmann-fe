import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { MdDisplaySettings, MdSettings } from "react-icons/md";
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

  //taskers nav links
  const taskersNavLinks = [
    {
      title: "Dashboard",
      icon: <MdDisplaySettings size={iconSize} />,
      route: "/tasker/taskerdashboard",
    },
    {
      title: "Tasks",
      icon: <FaTasks size={iconSize} />,
      route: "/tasker/tasks",
    },
    // {
    //   title: "Payouts",
    //   icon: <BsCart4 size={iconSize} />,
    //   route: "/tasker/payouts",
    // },
    // {
    //   title: "Messaging",
    //   icon: <BiMessageAltDetail size={iconSize} />,
    //   route: "/tasker/messaging",
    // },
    {
      title: "Settings",
      icon: <MdSettings size={iconSize} />,
      route: "/tasker/account-settings",
    },
  ];
  return (
    <div className={styles.sideNavigation}>
      {session && (
        <>
          {" "}
          {taskersNavLinks?.map((linkItem, index) => {
            return (
              <Link
                className={styles.taskerLink}
                key={index + 1}
                href={linkItem.route}
                title={linkItem.title}
              >
                <span
                  className={
                    linkState === `${linkItem?.route}`
                      ? `${styles.taskernavIconActive}`
                      : `${styles.taskernavIcon}`
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
