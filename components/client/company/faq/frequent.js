import React, { useState } from "react";
import styles from "../../../../styles/client/faq.module.css";
export const FrequentQuest = ({
  question,
  answer,
  id,
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
}) => {
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
      {isActive && <div className={styles.accordionContent}>{answer}</div>}
    </div>
  );
};
