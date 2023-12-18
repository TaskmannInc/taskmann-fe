import Image from "next/image";
import {
  BiHelpCircle,
  BiLogOut,
  BiShieldQuarter,
  BiUser,
  BiUserCircle,
} from "react-icons/bi";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { ContextStore } from "../../../store/contextStore";
import { HiOutlineUser } from "react-icons/hi";
import Link from "next/link";

export default function ClientAccountNavigation({
  styles,
  changeComponent,
  activeComponent,
}) {
  //get logged in customer session
  const { session } = ContextStore();
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
    //   name: "Orders",
    //   value: "orders",
    //   icon: <MdOutlineShoppingCartCheckout size={iconSize} />,
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
            height={150}
            loading="lazy"
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
          Joined: {new Date(session?.created_at?.split("T")[0]).toDateString()}
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
        <Link href={"/company/contact-us"} className={styles.linkItem}>
          <BiHelpCircle size={iconSize} />
          <span>Help & Support</span>
        </Link>
        <button className={styles.clientLogoutbtn}>
          <BiLogOut size={iconSize} className={styles.icon} />{" "}
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
