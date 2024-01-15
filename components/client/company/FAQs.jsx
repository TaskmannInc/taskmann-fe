import React, { useState } from "react";
import styles from "../../../styles/client/FAQ.module.css";
import { GetFAQsHook } from "../../utils/hooks/faqHook";
import FAQCategories from "./faq/FaqCats";
import QuestionsAnswers from "./faq/QuestionAnswers";
export default function HowTo() {
  //component states
  const [ShowRegCategory, setShowRegCategory] = useState(true);
  const [ShowACCategory, setShowACCategory] = useState(false);
  const [ShowOrderCategory, setShowOrderCategory] = useState(false);
  const [ShowPaymentCategory, setShowPaymentCategory] = useState(false);
  const [ShowCustomerCategory, setShowCustomerCategory] = useState(false);
  const [ShowDeliveryCategory, setShowDeliveryCategory] = useState(false);
  const [ShowTaskersCategory, setShowTaskersCategory] = useState(false);
  const [ShowOtherCategory, setShowOtherCategory] = useState(false);
  const [ShowMoreFAQS, setShowMoreFAQS] = useState(false);

  const [RegCategoryData, setRegCategoryData] = useState([]);
  const [ACCategoryData, setACCategoryData] = useState([]);
  const [OrderCategoryData, setOrderCategoryData] = useState([]);
  const [PaymentCategoryData, setPaymentCategoryData] = useState([]);
  const [CustomerCategoryData, setCustomerCategoryData] = useState([]);
  const [taskersCategoryData, setTaskersCategoryData] = useState([]);
  const [OtherCategoryData, setOtherCategoryData] = useState([]);

  //event states
  const showRegCat = () => {
    setShowRegCategory(true);
    setShowACCategory(false);
    setShowOrderCategory(false);
    setShowPaymentCategory(false);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(false);
    setShowTaskersCategory(false);
    setShowOtherCategory(false);
  };

  const showACCat = () => {
    setShowRegCategory(false);
    setShowACCategory(true);
    setShowOrderCategory(false);
    setShowPaymentCategory(false);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(false);
    setShowTaskersCategory(false);
    setShowOtherCategory(false);
  };

  const showOrderCat = () => {
    setShowRegCategory(false);
    setShowACCategory(false);
    setShowOrderCategory(true);
    setShowPaymentCategory(false);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(false);
    setShowTaskersCategory(false);
    setShowOtherCategory(false);
  };

  const showPaymentCat = () => {
    setShowRegCategory(false);
    setShowACCategory(false);
    setShowOrderCategory(false);
    setShowPaymentCategory(true);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(false);
    setShowTaskersCategory(false);
    setShowOtherCategory(false);
  };

  const showCustomerCat = () => {
    setShowRegCategory(false);
    setShowACCategory(false);
    setShowOrderCategory(false);
    setShowPaymentCategory(false);
    setShowCustomerCategory(true);
    setShowDeliveryCategory(false);
    setShowTaskersCategory(false);
    setShowOtherCategory(false);
  };

  const showDeliveryCat = () => {
    setShowRegCategory(false);
    setShowACCategory(false);
    setShowOrderCategory(false);
    setShowPaymentCategory(false);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(true);
    setShowTaskersCategory(false);
    setShowOtherCategory(false);
  };

  const showTaskersCat = () => {
    setShowRegCategory(false);
    setShowACCategory(false);
    setShowOrderCategory(false);
    setShowPaymentCategory(false);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(false);
    setShowTaskersCategory(true);
    setShowOtherCategory(false);
  };
  const showOtherCat = () => {
    setShowRegCategory(false);
    setShowACCategory(false);
    setShowOrderCategory(false);
    setShowPaymentCategory(false);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(false);
    setShowTaskersCategory(false);
    setShowOtherCategory(true);
  };

  const showMoreCat = () => {
    setShowRegCategory(false);
    setShowACCategory(false);
    setShowOrderCategory(false);
    setShowPaymentCategory(false);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(false);
    setShowOtherCategory(false);
    setShowMoreFAQS(true);
  };

  const faqChangeEvents = {
    showRegCat,
    showACCat,
    showOrderCat,
    showPaymentCat,
    showCustomerCat,
    showDeliveryCat,
    showOtherCat,
    showTaskersCat,
    showMoreCat,
  };

  //render methods
  const faqRenderEvents = {
    ShowRegCategory,
    ShowACCategory,
    ShowOrderCategory,
    ShowPaymentCategory,
    ShowCustomerCategory,
    ShowDeliveryCategory,
    ShowTaskersCategory,
    ShowOtherCategory,
    ShowMoreFAQS,
  };

  //get other faqs from api
  const onError = (error) => {
    console.log("fetch error", error);
  };

  const onSuccess = (data) => {
    const regFAQ = data?.data?.result?.filter((filterItem) => {
      return filterItem?.category == "Registration";
    });
    const accFAQ = data?.data?.result?.filter((filterItem) => {
      return filterItem?.category == "Account related";
    });
    const ordersFAQ = data?.data?.result?.filter((filterItem) => {
      return filterItem?.category == "Order related";
    });

    const payFAQ = data?.data?.result?.filter((filterItem) => {
      return filterItem?.category == "Payments";
    });

    const cusFAQ = data?.data?.result?.filter((filterItem) => {
      return filterItem?.category == "Customers";
    });

    const taskersFAQ = data?.data?.result?.filter((filterItem) => {
      return filterItem?.category == "Taskers";
    });
    const otherFAQ = data?.data?.result?.filter((filterItem) => {
      return filterItem?.category == "Miscellaneous";
    });

    setRegCategoryData(regFAQ);
    setACCategoryData(accFAQ);
    setOrderCategoryData(ordersFAQ);
    setPaymentCategoryData(payFAQ);
    setCustomerCategoryData(cusFAQ);
    setTaskersCategoryData(taskersFAQ);
    setOtherCategoryData(otherFAQ);
  };

  //get career faqs <--> request
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: FAQs,
  } = GetFAQsHook(onSuccess, onError);

  return (
    <>
      <section className={styles.faqBanner}>
        <h2 className={styles.faqHeading}>
          Revolutionizing Lifestyle For Everyone
        </h2>
        <p className={styles.tagLine}>
          Connecting people with our trusted taskers to provide quality service
          at the cheapest rates.
        </p>
      </section>
      {isLoading ? (
        <div className={styles.faqContent} style={{ filter: "blur(10px)" }}>
          <FAQCategories
            faqChangeEvents={faqChangeEvents}
            faqRenderEvents={faqRenderEvents}
            styles={styles}
          />
          <QuestionsAnswers faqRenderEvents={faqRenderEvents} styles={styles} />
        </div>
      ) : (
        isSuccess && (
          <div className={styles.faqContent}>
            <FAQCategories
              faqChangeEvents={faqChangeEvents}
              faqRenderEvents={faqRenderEvents}
              styles={styles}
            />
            <QuestionsAnswers
              faqRenderEvents={faqRenderEvents}
              styles={styles}
              RegCategoryData={RegCategoryData}
              ACCategoryData={ACCategoryData}
              OrderCategoryData={OrderCategoryData}
              PaymentCategoryData={PaymentCategoryData}
              CustomerCategoryData={CustomerCategoryData}
              taskersCategoryData={taskersCategoryData}
              OtherCategoryData={OtherCategoryData}
            />
          </div>
        )
      )}
    </>
  );
}
