import React, { useState } from "react";
import styles from "../../../../styles/client/FAQs.module.css";
import DOMPurify from "dompurify";

export const FrequentQuest = ({
  question,
  answer,
  id,
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
}) => {
  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });

  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.accordionItem}>
      <div
        key={id}
        className={styles.accordionTitle}
        onClick={() => setIsActive(!isActive)}
      >
        <div>{question}</div>
        <div>
          {isActive ? (
            <BsFillArrowUpCircleFill size={20} />
          ) : (
            <BsFillArrowDownCircleFill size={20} />
          )}
        </div>
      </div>
      {isActive && (
        <div
          className={styles.accordionContent}
          dangerouslySetInnerHTML={sanitizedData(answer)}
        ></div>
      )}
    </div>
  );
};
