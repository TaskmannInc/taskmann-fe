import Link from "next/link";
import styles from "../../../../styles/admin/Contentmgmt.module.css";
import {
  FaBlogger,
  FaQuestion,
  FaStar,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import {
  MdOutlineMarkUnreadChatAlt,
  MdOutlinePolicy,
  MdOutlineQuestionMark,
  MdQuestionAnswer,
} from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";

export default function ContentManagement() {
  var iconSize = 35;
  //
  const cmsLinks = [
    {
      title: "Blog",
      link: "/admin/cms/corporatecontent/blog-mgmt",
      icon: <FaBlogger size={iconSize} />,
      description: "Blog management",
      color: "var(--dark)",
      background: "linear-gradient(to right, #ece9e6, #ffffff)",
    },
    {
      title: "Careers",
      link: "/admin/cms/corporatecontent/careers-mgmt",
      icon: <FaUserGraduate size={iconSize} />,
      description: "Careers management",
      color: "var(--white)",
      background: "linear-gradient(to right, #1488cc, #2b32b2)",
    },
    {
      title: "Chats / Contacts / Messages",
      link: "/admin/cms/corporatecontent/contact-mgmt",
      icon: <MdQuestionAnswer size={iconSize} />,
      description: "Customer messages, complaints, etc.",
      color: "var(--black)",
      background: "",
    },
    {
      title: "FAQ",
      link: "/admin/cms/corporatecontent/faq-mgmt",
      icon: <MdOutlineQuestionMark size={iconSize} />,
      description: "FAQ management",
      color: "var(--white)",
      background: "linear-gradient(to right, #e44d26, #f16529)",
    },
    {
      title: "Policies",
      link: "/admin/cms/corporatecontent/policies-mgmt",
      icon: <MdOutlinePolicy size={iconSize} />,
      description: "Company policies and more",
      color: "#fff",
      background: "linear-gradient(to right, #000000, #434343)",
    },
    {
      title: "Reviews",
      link: "/admin/cms/corporatecontent/reviews-mgmt",
      icon: <FaStar size={iconSize} />,
      description: "Reviews/testimonials management",
      color: "#e44d26",
      background: "linear-gradient(to right, #ece9e6, #ffffff)",
    },
    {
      title: "Team members",
      link: "/admin/cms/corporatecontent/team-mgmt",
      icon: <FaUsers size={iconSize} />,
      description: "Corporate team members management",
      color: "var(--dark)",
      background: "linear-gradient(to right, #ece9e6, #ffffff)",
    },
    {
      title: "About",
      link: "/admin/cms/corporatecontent/about-mgmt",
      icon: <BsInfoCircleFill size={iconSize} />,
      description: "Corporate information and more",
      color: "var(--black)",
      background: "",
    },
  ];
  return (
    <div className={styles.cmsLayout}>
      <h4>Content Management</h4>
      <div className={styles.managementTabs}>
        {cmsLinks?.map((item, index) => {
          return (
            <Link
              href={item.link}
              key={index + 1}
              className={styles.tabCard}
              style={{ background: item.background, color: item.color }}
            >
              <h5>{item.title}</h5>
              <span>{item.icon}</span>
              <span>{item.description}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
