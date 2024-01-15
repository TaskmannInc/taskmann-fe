import { AiOutlineUserAdd, AiOutlineUserSwitch } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GiPayMoney } from "react-icons/gi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiPsychotherapyLine } from "react-icons/ri";

export default function FAQCategories({
  styles,
  faqChangeEvents,
  faqRenderEvents,
}) {
  return (
    <div className={styles.categoriesContainer}>
      <button
        onClick={faqChangeEvents?.showRegCat}
        className={
          faqRenderEvents?.ShowRegCategory === true
            ? styles.faqBtnActive
            : styles.faqCategoryBtn
        }
      >
        <AiOutlineUserAdd size="25" className="icon" />
        &nbsp; Registration
      </button>
      <button
        onClick={faqChangeEvents?.showACCat}
        className={
          faqRenderEvents?.ShowACCategory === true
            ? styles.faqBtnActive
            : styles.faqCategoryBtn
        }
      >
        <MdOutlineManageAccounts size="25" className="icon" />
        &nbsp;Account related
      </button>
      <button
        onClick={faqChangeEvents?.showOrderCat}
        className={
          faqRenderEvents?.ShowOrderCategory === true
            ? styles.faqBtnActive
            : styles.faqCategoryBtn
        }
      >
        <FiShoppingCart size="25" className="icon" />
        &nbsp; Order related
      </button>
      <button
        onClick={faqChangeEvents?.showPaymentCat}
        className={
          faqRenderEvents?.ShowPaymentCategory === true
            ? styles.faqBtnActive
            : styles.faqCategoryBtn
        }
      >
        <GiPayMoney size="25" className="icon" />
        &nbsp; Payments
      </button>
      <button
        onClick={faqChangeEvents?.showCustomerCat}
        className={
          faqRenderEvents?.ShowCustomerCategory === true
            ? styles.faqBtnActive
            : styles.faqCategoryBtn
        }
      >
        <AiOutlineUserSwitch size="25" className="icon" />
        &nbsp; Customer
      </button>
      <button
        onClick={faqChangeEvents?.showTaskersCat}
        className={
          faqRenderEvents?.ShowTaskersCategory === true
            ? styles.faqBtnActive
            : styles.faqCategoryBtn
        }
      >
        <FaTasks size="25" className="icon" />
        &nbsp; Taskers
      </button>
      <button
        onClick={faqChangeEvents?.showOtherCat}
        className={
          faqRenderEvents?.ShowOtherCategory === true
            ? styles.faqBtnActive
            : styles.faqCategoryBtn
        }
      >
        <RiPsychotherapyLine size="25" className="icon" />
        &nbsp; Others
      </button>
      {/* <button
        onClick={faqChangeEvents?.showMoreCat}
        className={
          faqRenderEvents?.ShowMoreFAQS === true
            ? styles.faqBtnActive
            : styles.faqCategoryBtn
        }
      >
        <TbZoomQuestion size="25" className="icon" />
        &nbsp; More FAQs
      </button> */}
    </div>
  );
}
