import Link from "next/link";
import styles from "../../../styles/admin/Auth.module.css";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { useState } from "react";
import { StaffMailVerificationHook } from "../../utils/hooks/adminAuth";
import { StatusNotification } from "../../ui-fragments/notification";
import { ButtonLoader } from "../../ui-fragments/loaders";
export default function TaskerConfirmation() {
  const [errors, setErrors] = useState("");
  //next router definition
  const router = useRouter();

  //get email confirmation code
  let confirmationCode = router?.query?.code;

  //function to submit form data
  const handleSubmit = (e) => {
    setErrors("");
    e.preventDefault();
    if (!confirmationCode) {
      setErrors(
        "We could not confirm your verifcation code. Please check your mail for verification instructions and try again."
      );
    } else {
      verificationRequest(confirmationCode);
    }
  };
  const onSuccess = (data) => {
    router.push("/staff/auth/login");
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: verificationRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = StaffMailVerificationHook(onSuccess, onError);
  return (
    <>
      <div className={"staffAuthBg"}>
        <div className={"authForm"}>
          <div
            className={"authFormHeader"}
            style={{ backgroundColor: "var(--green-dark)" }}
          >
            <FaUserAlt size={20} />
            <h4>
              {isLoading ? (
                "Verifying..."
              ) : isSuccess ? (
                <StatusNotification
                  type={"success"}
                  message={
                    "Email verification successful. Redirecting to login..."
                  }
                />
              ) : isError || errors !== "" ? (
                <StatusNotification
                  type={"error"}
                  message={
                    error?.response?.data?.error ?? error?.message ?? errors
                  }
                />
              ) : (
                "Account Confirmation"
              )}
            </h4>
          </div>
          <form
            className={"formContainer"}
            style={{ backgroundColor: "var(--green-dark)" }}
            onSubmit={handleSubmit}
          >
            <label>Please confirm your account to continue...</label>

            <button type="submit" className={"submitBtn"} disabled={isLoading}>
              {isLoading ? <ButtonLoader /> : "Confirm"}
            </button>
            <Link href={"/staff/auth/login"} className={"pageLink"}>
              Forgot Password
            </Link>
          </form>
        </div>
        <div className={"PageNotice"}></div>
      </div>
    </>
  );
}
