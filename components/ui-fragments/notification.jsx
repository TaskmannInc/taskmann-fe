import { toast } from "react-hot-toast";

//form status  notifications
export const StatusNotification = ({ type, message }) => {
  return (
    <span
      className={
        type === "error"
          ? "form-status form-status-error"
          : type === "success"
          ? "form-status form-status-success"
          : type === "unknown"
          ? "form-status form-status-unknown"
          : "form-status form-status-other"
      }
    >
      {message}
    </span>
  );
};

//successful toast notification
export const SuccessfulHoverNotification = ({
  notifImage,
  notifType,
  notifTitle,
  notifMessage,
}) => {
  toast.custom(
    (t) => (
      <div
        className={`toastNotif
          ${
            notifType === "success"
              ? "toastSuccess"
              : notifType === "error"
              ? "toastSuccess"
              : notifType === "info"
              ? "toastInfo"
              : "toastGeneric"
          }`}
      >
        <div className="toast-image">{notifImage}</div>
        <span className="toast-content">
          <p>{notifTitle}</p>
          <p>{notifMessage}</p>
        </span>
        <button onClick={() => toast.dismiss(t.id)} className="close-toast-btn">
          Close
        </button>
      </div>
    ),
    { id: "notification", position: "top-right", duration: 10000 }
  );
};
