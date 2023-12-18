import { BsMinecartLoaded } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { FaTasks } from "react-icons/fa";
export default function Statistics({
  styles,
  allMainServices,
  allUsers,
  allCustomerOrders,
}) {
  const iconSize = 35;

  const stats = [
    {
      title: "Users",
      val: allMainServices?.length,
      icon: <HiOutlineUsers size={iconSize} />,
      brief: "Total users onboarded",
    },
    {
      title: "Services",
      val: allUsers?.length,
      icon: <FaTasks size={iconSize} />,
      brief: "Main service offered",
    },
    {
      title: "Orders",
      val: allCustomerOrders?.length,
      icon: <BsMinecartLoaded size={iconSize} />,
      brief: "All-time customer orders",
    },
    {
      title: "CMS Categories",
      val: 8,
      icon: <MdOutlineContentCopy size={iconSize} />,
      brief: "Content categories  managed",
    },
  ];
  return (
    <section className={styles.statsLayout}>
      {stats.map((data, index) => {
        return (
          <div key={index + 1} className={styles.statsCard}>
            <span>{data?.icon}</span>
            <h6>{data?.title}</h6> <h5>{data?.val ?? 0}</h5>
            <span>{data?.brief}</span>
          </div>
        );
      })}
    </section>
  );
}
