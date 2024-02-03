import Link from "next/link";
import styles from "../../../styles/admin/Auth.module.css";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { ButtonLoader } from "../../ui-fragments/loaders";
import { StatusNotification } from "../../ui-fragments/notification";
import { UpdateMailVerificationHook } from "../../utils/hooks/customerAuth";
import { useRouter } from "next/router";
export default function EmailConfirmation() {
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
    router.push("/auth/login");
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: verificationRequest,
    isLoading,
    isError,
    error,
    data: resp,
    isSuccess,
  } = UpdateMailVerificationHook(onSuccess, onError);

  return (
    <>
      <div className={"clientAuthBg"}>
        <div className={"authForm"}>
          <div className={"authFormHeader"}>
            <FaUserAlt size={20} />
            {isLoading ? (
              "Verifying..."
            ) : isSuccess ? (
              <StatusNotification
                type={"success"}
                message={
                  "Email verification successful. Redirecting to login..."
                }
              />
            ) : isError ? (
              <StatusNotification
                type={"error"}
                message={
                  error?.response?.data?.error ||
                  error?.message ||
                  "An unknown error occured"
                }
              />
            ) : (
              "Account Confirmation"
            )}
            {errors !== "" ? (
              <StatusNotification type={"error"} message={errors} />
            ) : null}
          </div>
          <form className={"formContainer"} onSubmit={handleSubmit}>
            <label>Please confirm your account to continue...</label>

            <button type="submit" className={"submitBtn"}>
              {isLoading ? <ButtonLoader /> : "Verify"}
            </button>
            <Link href={"/auth/signup"} className={"pageLink"}>
              Back to sign up
            </Link>
            <Link
              href={"/auth/login"}
              className={"pageLink"}
              style={{
                padding: "0.5rem 0.5rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--gray)",
              }}
            >
              Login
            </Link>
          </form>
        </div>
        <div className={"PageNotice"}></div>
      </div>
    </>
  );
}
