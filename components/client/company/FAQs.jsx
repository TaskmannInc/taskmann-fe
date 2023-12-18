import React, { useState } from "react";
import styles from "../../../styles/client/faq.module.css";
import { GetFAQsHook } from "../../utils/hooks/faqHook";
import FAQCategories from "./faq/FaqCats";
import QuestionsAnswers from "./faq/QuestionAnswers";
export default function HowTo() {
  const [contentType, setContentType] = useState("customers");

  //component states
  const [ShowRegCategory, setShowRegCategory] = useState(true);
  const [ShowACCategory, setShowACCategory] = useState(false);
  const [ShowOrderCategory, setShowOrderCategory] = useState(false);
  const [ShowPaymentCategory, setShowPaymentCategory] = useState(false);
  const [ShowCustomerCategory, setShowCustomerCategory] = useState(false);
  const [ShowDeliveryCategory, setShowDeliveryCategory] = useState(false);
  const [ShowOtherCategory, setShowOtherCategory] = useState(false);
  const [ShowMoreFAQS, setShowMoreFAQS] = useState(false);

  //event states
  const showRegCat = () => {
    setShowRegCategory(true);
    setShowACCategory(false);
    setShowOrderCategory(false);
    setShowPaymentCategory(false);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(false);
    setShowOtherCategory(false);
    setShowMoreFAQS(false);
  };

  const showACCat = () => {
    setShowRegCategory(false);
    setShowACCategory(true);
    setShowOrderCategory(false);
    setShowPaymentCategory(false);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(false);
    setShowOtherCategory(false);
    setShowMoreFAQS(false);
  };

  const showOrderCat = () => {
    setShowRegCategory(false);
    setShowACCategory(false);
    setShowOrderCategory(true);
    setShowPaymentCategory(false);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(false);
    setShowOtherCategory(false);
    setShowMoreFAQS(false);
  };

  const showPaymentCat = () => {
    setShowRegCategory(false);
    setShowACCategory(false);
    setShowOrderCategory(false);
    setShowPaymentCategory(true);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(false);
    setShowOtherCategory(false);
    setShowMoreFAQS(false);
  };

  const showCustomerCat = () => {
    setShowRegCategory(false);
    setShowACCategory(false);
    setShowOrderCategory(false);
    setShowPaymentCategory(false);
    setShowCustomerCategory(true);
    setShowDeliveryCategory(false);
    setShowOtherCategory(false);
    setShowMoreFAQS(false);
  };

  const showDeliveryCat = () => {
    setShowRegCategory(false);
    setShowACCategory(false);
    setShowOrderCategory(false);
    setShowPaymentCategory(false);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(true);
    setShowOtherCategory(false);
    setShowMoreFAQS(false);
  };

  const showOtherCat = () => {
    setShowRegCategory(false);
    setShowACCategory(false);
    setShowOrderCategory(false);
    setShowPaymentCategory(false);
    setShowCustomerCategory(false);
    setShowDeliveryCategory(false);
    setShowOtherCategory(true);
    setShowMoreFAQS(false);
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
    ShowOtherCategory,
    ShowMoreFAQS,
  };

  //get other faqs from api
  const onError = (error) => {
    console.log("fetch error", error);
  };

  const onSuccess = (userdata) => {
    // console.log("sucesss :", userdata);
  };

  //get faqs
  const { data: all_faqs } = GetFAQsHook(onSuccess, onError);

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
      <div className={styles.faqContent}>
        <FAQCategories
          faqChangeEvents={faqChangeEvents}
          faqRenderEvents={faqRenderEvents}
          styles={styles}
        />
        <QuestionsAnswers
          faqRenderEvents={faqRenderEvents}
          user_faqs={all_faqs?.data}
          styles={styles}
        />
      </div>
    </>
  );
}
