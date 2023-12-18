import React from "react";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import {
  RegistrationQuestionsAnswers__,
  AccountRelatedQuestionsAnswers__,
  OrderRelatedQuestionsAnswers__,
  PaymentsQuestionsAnswers__,
  CustomerQuestionsAnswers__,
  DeliveryQuestionsAnswers__,
  OthersQuestionsAnswers__,
} from "./faqData";
import { FrequentQuest } from "./frequent";
import { OtherFAQS } from "./others";
export default function QuestionsAnswers({
  styles,
  faqRenderEvents,
  user_faqs,
}) {
  return (
    <div className={styles.qaAccordiansContainer}>
      <div className={styles.qaAccordianSection}>
        <h4>FAQs in this section</h4>
        <div className={styles.sectionAccordians}>
          {faqRenderEvents?.ShowRegCategory && (
            <>
              {RegistrationQuestionsAnswers__.map(
                ({ id, question, answer, index }) => (
                  <FrequentQuest
                    key={index + 1}
                    id={id}
                    question={question}
                    answer={answer}
                    BsFillArrowDownCircleFill={BsFillArrowDownCircleFill}
                    BsFillArrowUpCircleFill={BsFillArrowUpCircleFill}
                  />
                )
              )}
            </>
          )}
          {faqRenderEvents?.ShowACCategory && (
            <>
              {AccountRelatedQuestionsAnswers__.map(
                ({ id, question, answer, index }) => (
                  <FrequentQuest
                    key={index + 1}
                    id={id}
                    question={question}
                    answer={answer}
                    BsFillArrowDownCircleFill={BsFillArrowDownCircleFill}
                    BsFillArrowUpCircleFill={BsFillArrowUpCircleFill}
                  />
                )
              )}
            </>
          )}
          {faqRenderEvents?.ShowOrderCategory && (
            <>
              {OrderRelatedQuestionsAnswers__.map(
                ({ id, question, answer, index }) => (
                  <FrequentQuest
                    key={index + 1}
                    id={id}
                    question={question}
                    answer={answer}
                    BsFillArrowDownCircleFill={BsFillArrowDownCircleFill}
                    BsFillArrowUpCircleFill={BsFillArrowUpCircleFill}
                  />
                )
              )}
            </>
          )}
          {faqRenderEvents?.ShowPaymentCategory && (
            <>
              {PaymentsQuestionsAnswers__.map(
                ({ id, question, answer, index }) => (
                  <FrequentQuest
                    key={index + 1}
                    id={id}
                    question={question}
                    answer={answer}
                    BsFillArrowDownCircleFill={BsFillArrowDownCircleFill}
                    BsFillArrowUpCircleFill={BsFillArrowUpCircleFill}
                  />
                )
              )}
            </>
          )}
          {faqRenderEvents?.ShowCustomerCategory && (
            <>
              {CustomerQuestionsAnswers__.map(
                ({ id, question, answer, index }) => (
                  <FrequentQuest
                    key={index + 1}
                    id={id}
                    question={question}
                    answer={answer}
                    BsFillArrowDownCircleFill={BsFillArrowDownCircleFill}
                    BsFillArrowUpCircleFill={BsFillArrowUpCircleFill}
                  />
                )
              )}
            </>
          )}
          {faqRenderEvents?.ShowDeliveryCategory && (
            <>
              {DeliveryQuestionsAnswers__.map(
                ({ id, question, answer, index }) => (
                  <FrequentQuest
                    key={index + 1}
                    id={id}
                    question={question}
                    answer={answer}
                    BsFillArrowDownCircleFill={BsFillArrowDownCircleFill}
                    BsFillArrowUpCircleFill={BsFillArrowUpCircleFill}
                  />
                )
              )}
            </>
          )}
          {faqRenderEvents?.ShowOtherCategory && (
            <>
              {OthersQuestionsAnswers__.map(
                ({ id, question, answer, index }) => (
                  <FrequentQuest
                    key={index + 1}
                    id={id}
                    question={question}
                    answer={answer}
                    BsFillArrowDownCircleFill={BsFillArrowDownCircleFill}
                    BsFillArrowUpCircleFill={BsFillArrowUpCircleFill}
                  />
                )
              )}
            </>
          )}
          {faqRenderEvents?.ShowMoreFAQS && (
            <>
              {user_faqs === [] || user_faqs === undefined ? (
                <span className={styles.faqNoData}>Nothing in this secton</span>
              ) : (
                <>
                  {user_faqs?.map(({ id, question, answer, index }) => (
                    <OtherFAQS
                      key={index + 1}
                      id={id}
                      question={question}
                      answer={answer}
                      BsFillArrowDownCircleFill={BsFillArrowDownCircleFill}
                      BsFillArrowUpCircleFill={BsFillArrowUpCircleFill}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
