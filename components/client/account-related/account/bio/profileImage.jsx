import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BsFillCloudArrowUpFill, BsImages } from "react-icons/bs";
import { DataUpdateLoader } from "../../../../ui-fragments/loaders";
import {
  StatusNotification,
  SuccessfulHoverNotification,
} from "../../../../ui-fragments/notification";
import { ProfileImageUpdateHook } from "../../../../utils/hooks/customerAuth";
import { MdPublishedWithChanges } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { ContextStore } from "../../../../../store/contextStore";

export default function ClientProfileImage({ styles, session }) {
  const { setSession } = ContextStore();

  // Image ref
  const fileInputRef = useRef();

  //component states
  const [profileImageSelected, setProfileImageSelected] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  //when image state changes
  useEffect(() => {
    if (profileImageSelected) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(profileImageSelected);
    } else {
      setProfilePreview(null);
    }
  }, [profileImageSelected]);

  //image change event
  const handleProfileImageSelect = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setProfileImageSelected(file);
    } else {
      setProfileImageSelected(null);
    }
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    // return;
    updateCustomerAvatar({ upload: profileImageSelected });
  };

  const onSuccess = (response) => {
    var user = response?.data?.result;
    sessionStorage.setItem("TM_AC_USR", JSON.stringify(user));
    setSession(user);
    var notifImage, notifType, notifTitle, notifMessage;
    notifImage = "";
    notifType = "success";
    notifTitle = "Profile image updated";
    notifMessage = "Your profile image was updated successfully.";
    SuccessfulHoverNotification(
      notifImage,
      notifType,
      notifTitle,
      notifMessage
    );
  };

  const onError = (response) => {
    console.error(response);
    var notifImage, notifType, notifTitle, notifMessage;
    notifImage = "";
    notifType = "error";
    notifTitle = "We could not update your profile image";
    notifMessage = "An error occured while updating your profile image.";
    SuccessfulHoverNotification(
      notifImage,
      notifType,
      notifTitle,
      notifMessage
    );
  };

  //request handler
  const {
    mutate: updateCustomerAvatar,
    isLoading,
    isError,
    error,
    isSuccess,
  } = ProfileImageUpdateHook(onSuccess, onError);

  return (
    <>
      <Toaster reverseOrder={false} />
      <form onSubmit={handleSubmit} className={styles.basicInfo}>
        <h3>Profile avatar</h3>
        <div className={styles.profileImageSettings}>
          {profilePreview !== null || session?.profile_image?.image_url ? (
            <Image
              src={profilePreview ?? session?.profile_image?.image_url}
              alt={"Avatar"}
              width={205}
              height={205}
              className={styles.avatar}
              loading="lazy"
            />
          ) : (
            <span className={styles.initials}>
              <HiOutlineUser size={70} title={"User"} />
              <h2>
                {session?.first_name?.substring(0, 1)}{" "}
                {session?.last_name?.substring(0, 1)}
              </h2>
            </span>
          )}

          <div className={styles.uploadActions}>
            {profilePreview !== null ? (
              <label
                type="button"
                className={styles.changeImage}
                style={{ border: `1px solid var(--green-darker)` }}
              >
                <MdPublishedWithChanges className="icon" size="20" />
                &nbsp;Change selected image
                <input
                  readOnly={isLoading ? true : false}
                  id="profle-input"
                  name="profileimage"
                  style={{ display: "none", width: "100%" }}
                  type="file"
                  acccept="image/x-png,image/jpeg"
                  ref={fileInputRef}
                  onChange={(event) => {
                    handleProfileImageSelect(event);
                  }}
                />
              </label>
            ) : (
              <label
                className={styles.selectImage}
                style={{
                  cursor: "pointer",
                }}
              >
                <BsImages className="icon" size="20" />
                &nbsp; Upload a new image
                <input
                  id="profle-input"
                  name="profileimage"
                  style={{ display: "none", width: "100%" }}
                  type="file"
                  acccept="image/x-png,image/jpeg"
                  ref={fileInputRef}
                  onChange={(event) => {
                    handleProfileImageSelect(event);
                  }}
                />
              </label>
            )}
          </div>
        </div>
        <div className={styles.formAction}>
          {isSuccess ? (
            <StatusNotification
              type={"success"}
              message={"Profile image  updated successfully"}
            />
          ) : isError ? (
            <StatusNotification
              type={"error"}
              message={error?.response?.data?.error ?? error?.message}
            />
          ) : null}
          {isLoading && <DataUpdateLoader />}
          {profileImageSelected && (
            <button
              type="button"
              onClick={() => {
                setProfileImageSelected(null), setProfilePreview(null);
              }}
              className={styles.clearBtn}
            >
              Remove selected image
            </button>
          )}
          <button
            disabled={profileImageSelected === null}
            type="submit"
            className={styles.submitBtn}
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
}
