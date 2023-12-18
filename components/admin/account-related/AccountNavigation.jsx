import Image from "next/image";
import { BiHelpCircle, BiShieldQuarter, BiUserCircle } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { StaffContextStore } from "../../../store/staffContextStore";

export default function StaffAccountNavigation({
  styles,
  changeComponent,
  activeComponent,
}) {
  //get logged in user session
  const { session } = StaffContextStore();
  var iconSize = 20;
  const linksConfig = [
    {
      name: "Bio Settings",
      value: "bio",
      icon: <BiUserCircle size={iconSize} />,
    },
    {
      name: "Password Settings",
      value: "password",
      icon: <BiShieldQuarter size={iconSize} />,
    },

    // {
    //   name: "Help & Support",
    //   value: "help",
    //   icon: <BiHelpCircle size={iconSize} />,
    // },
  ];
  return (
    <div className={styles.accountRelatedNavigation}>
      <div className={styles.profileSummary}>
        {session?.profile_image?.image_url ? (
          <Image
            src={session?.profile_image?.image_url}
            alt="Profile Image"
            className={styles.profileImage}
            width={150}
            loading="lazy"
            height={150}
          />
        ) : (
          <span className={styles.profileImage}>
            <HiOutlineUser size={70} title={"User"} />
          </span>
        )}
        <span className={styles.profileName}>
          {session?.first_name} {session?.last_name}
        </span>
        <span className={styles.profileDate}>
          Onboarded:{" "}
          {new Date(session?.created_at).toDateString().split("T")[0]}
        </span>
      </div>
      <div className={styles.accountRelatedLinks}>
        {linksConfig?.map((link, index) => {
          return (
            <button
              key={index + 1}
              className={`${styles.linkItem}  ${
                activeComponent == link.value && styles.activeLinkItem
              }`}
              onClick={() => changeComponent(link.value)}
            >
              {link.icon} <span>{link.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
