import React, { useState } from "react";

export const OtherFAQS = ({
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
            <BsFillArrowUpCircleFill />
          ) : (
            <BsFillArrowDownCircleFill />
          )}
        </div>
      </div>
      {isActive && <div className={styles.accordionContent}>{answer}</div>}
    </div>
  );
};
