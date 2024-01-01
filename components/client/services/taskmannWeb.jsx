import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaInfoCircle, FaTasks } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import Lottie from "react-lottie";
import styles from "../../../styles/client/Taskmannweb.module.css";
import { GetServicesHook } from "../../utils/hooks/serviceMgmtHook";

import DOMPurify from "dompurify";
import webserviceAnimation from "../../../public/assets/animations/desktop-web-service.json";
import {
  ClientDownTime,
  NoClientData,
} from "../../ui-fragments/dataInteractions";

export default function TaskmannWebCustomServices() {
  //clean up html data
  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });

  //animation options
  const defaultAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: webserviceAnimation,
    renderer: "svg",
  };

  const [taskmannWebServices, setAllServices] = useState([]);

  //--get main service <--> request--//
  const onError = (response) => {
    console.log("error", response);
  };

  const onSuccess = (response) => {
    console.log("response", response?.data?.result);
    const dataInclusion = "description" || "service_name";
    const filterWebServices = response?.data?.result?.filter((webServices) => {
      return webServices?.description?.includes(
        "Taskmann web" ||
          "Taskmann Web" ||
          "taskmann web" ||
          "TASKMANN WEB" ||
          "taskmann Web"
      );
    });
    console.log("filter web services", filterWebServices);
    setAllServices(filterWebServices);
  };

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: serviceData,
  } = GetServicesHook(onSuccess, onError);
  const allMainServices = serviceData?.data?.result;
  return (
    <>
      <section className={styles.servicesBanner}>
        <h5 className={styles.servicesHeading}>
          All your web services and more ...
        </h5>
        <Lottie options={defaultAnimationOptions} height={350} width={350} />
      </section>
      <div className={styles.serviceListing}>
        {isLoading ? (
          <>
            {[...Array(6)].map((_, index) => {
              return (
                <div key={index + 1} className={styles.taskServiceLoading}>
                  <div className={styles.serviceBox}>
                    <h2>
                      <span>
                        <FaTasks size={15} />
                      </span>
                      &nbsp; <Link href={"#"}>Service</Link>
                    </h2>
                    <div className={styles.serviceDetails}>
                      <legend>Related...</legend>

                      <div className={styles.subServices}>
                        {[...Array(6)].map((_, index) => (
                          <Link key={index + 1} href={"#"}>
                            <MdOutlineMiscellaneousServices size={20} />
                            &nbsp;Sub service
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link href={"#"} className={styles.serviceImageContainer}>
                    <Image
                      className={styles.serviceImage}
                      src={"/others/cleaning-2.jpg"}
                      alt="Service placeholder"
                      width={100}
                      height={100}
                      lazy
                    />
                  </Link>
                </div>
              );
            })}
          </>
        ) : isSuccess && allMainServices?.length > 0 ? (
          <div className={styles.taskmannWebServicesWrapper}>
            {taskmannWebServices?.map((service, index) => {
              return (
                <div key={index + 1} className={styles.taskService}>
                  <div className={styles.serviceImageContainer}>
                    <Image
                      className={
                        service?.service_image?.[0]?.image_url
                          ? styles.serviceImage
                          : styles.placeholderImage
                      }
                      src={
                        service?.service_image?.[0]?.image_url ??
                        "/assets/trademarks/taskmann-logo.png"
                      }
                      alt="Service Cover"
                      width={100}
                      height={100}
                      lazy
                    />
                  </div>
                  <div className={styles.serviceBox}>
                    <h4>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: "0.5rem",
                        }}
                      >
                        <FaTasks size={15} />
                        <span>
                          {service?.service_name?.length > 22
                            ? `${service?.service_name?.slice(0, 22)}...`
                            : service?.service_name}
                        </span>
                      </span>
                      &nbsp;{" "}
                      <button onClick={() => console.log("E")} type="button">
                        <FaInfoCircle size={18} />
                      </button>
                    </h4>
                    <div className={styles.serviceDetails}>
                      <span
                        dangerouslySetInnerHTML={sanitizedData(
                          service?.description
                        )}
                      ></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : isSuccess && allMainServices?.length == 0 ? (
          <NoClientData />
        ) : isError ? (
          <ClientDownTime />
        ) : (
          <NoClientData />
        )}
      </div>
    </>
  );
}
