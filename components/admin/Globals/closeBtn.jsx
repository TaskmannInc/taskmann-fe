import { MdCancel } from "react-icons/md";

export const CloseButton = ({ style, closeFunc, disabled }) => {
  return (
    <button
      type="button"
      className={style}
      onClick={() => closeFunc()}
      disabled={disabled}
    >
      <MdCancel size="25" />
    </button>
  );
};
