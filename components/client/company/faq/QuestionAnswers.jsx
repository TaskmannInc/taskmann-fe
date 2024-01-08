import React from "react";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import { FrequentQuest } from "./frequent";
export default function QuestionsAnswers({
  styles,
  faqRenderEvents,
  RegCategoryData,
  ACCategoryData,
  OrderCategoryData,
  PaymentCategoryData,
  CustomerCategoryData,
  OtherCategoryData,
}) {
  return (
    <div className={styles.qaAccordiansContainer}>
      <div className={styles.qaAccordianSection}>
        <h4>FAQs in this section</h4>
        <div className={styles.sectionAccordians}>
          {faqRenderEvents?.ShowRegCategory && (
            <>
              <>
                {RegCategoryData?.map(({ id, question, answer, index }) => (
                  <FrequentQuest
                    key={index + 1}
                    id={id}
                    question={question}
                    answer={answer}
                    BsFillArrowDownCircleFill={BsFillArrowDownCircleFill}
                    BsFillArrowUpCircleFill={BsFillArrowUpCircleFill}
                  />
                ))}
              </>
            </>
          )}
          {faqRenderEvents?.ShowACCategory && (
            <>
              <>
                {ACCategoryData?.map(({ id, question, answer, index }) => (
                  <FrequentQuest
                    key={index + 1}
                    id={id}
                    question={question}
                    answer={answer}
                    BsFillArrowDownCircleFill={BsFillArrowDownCircleFill}
                    BsFillArrowUpCircleFill={BsFillArrowUpCircleFill}
                  />
                ))}
              </>
            </>
          )}
          {faqRenderEvents?.ShowOrderCategory && (
            <>
              <>
                {OrderCategoryData?.map(({ id, question, answer, index }) => (
                  <FrequentQuest
                    key={index + 1}
                    id={id}
                    question={question}
                    answer={answer}
                    BsFillArrowDownCircleFill={BsFillArrowDownCircleFill}
                    BsFillArrowUpCircleFill={BsFillArrowUpCircleFill}
                  />
                ))}
              </>
            </>
          )}
          {faqRenderEvents?.ShowPaymentCategory && (
            <>
              <>
                {PaymentCategoryData?.map(({ id, question, answer, index }) => (
                  <FrequentQuest
                    key={index + 1}
                    id={id}
                    question={question}
                    answer={answer}
                    BsFillArrowDownCircleFill={BsFillArrowDownCircleFill}
                    BsFillArrowUpCircleFill={BsFillArrowUpCircleFill}
                  />
                ))}
              </>
            </>
          )}
          {faqRenderEvents?.ShowCustomerCategory && (
            <>
              <>
                {CustomerCategoryData?.map(
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
            </>
          )}

          {faqRenderEvents?.ShowOtherCategory && (
            <>
              <>
                {OtherCategoryData?.map(({ id, question, answer, index }) => (
                  <FrequentQuest
                    key={index + 1}
                    id={id}
                    question={question}
                    answer={answer}
                    BsFillArrowDownCircleFill={BsFillArrowDownCircleFill}
                    BsFillArrowUpCircleFill={BsFillArrowUpCircleFill}
                  />
                ))}
              </>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
