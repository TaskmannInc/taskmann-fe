import Image from "next/image";
import styles from "../../../styles/client/Services.module.css";
import Link from "next/link";
import { FaTasks } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { GetServicesHook } from "../../utils/hooks/serviceMgmtHook";
import { useState } from "react";
import {
  ClientDownTime,
  NoClientData,
} from "../../ui-fragments/dataInteractions";
export default function Allservices() {
  const [allServices, setAllServices] = useState([]);

  //--get main service <--> request--//
  const onError = (response) => {
    console.log("error", response);
  };

  const onSuccess = (response) => {
    setAllServices(response?.data?.result);
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
        <h2 className={styles.servicesHeading}>Our Services</h2>
        <p className={styles.tagLine}>
          Hire our professional taskers with peace of mind
        </p>
        <Link
          href={"/services/request-service"}
          className={styles.serviceReqLink}
        >
          Request a Service
        </Link>
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
          <>
            {allMainServices?.map((service, index) => {
              return (
                <div key={index + 1} className={styles.taskService}>
                  <div className={styles.serviceBox}>
                    <h2>
                      <span>
                        <FaTasks size={15} />
                      </span>
                      &nbsp;{" "}
                      <Link
                        href={`/services/service-pricing?sv=${service?._id}`}
                      >
                        {service?.service_name}
                      </Link>
                    </h2>
                    <div className={styles.serviceDetails}>
                      <legend>Related services</legend>

                      <div className={styles.subServices}>
                        {service?.subservice?.length == 0 ? (
                          <span
                            style={{
                              textTransform: "initial",
                              fontStyle: "italic",
                              fontSize: `var(--text-md)`,
                            }}
                          >
                            There are no related services...
                          </span>
                        ) : service?.subservice?.length > 5 ? (
                          <>
                            {" "}
                            {service?.subservice
                              ?.slice(0, 5)
                              ?.map((subservice, index) => (
                                <Link
                                  className={styles.sub}
                                  key={index + 1}
                                  href={`/services/sub-service-pricing?sv=${subservice?._id}`}
                                >
                                  <MdOutlineMiscellaneousServices size={20} />
                                  &nbsp; {subservice?.sub_service_name}
                                </Link>
                              ))}
                            <Link
                              className={styles.moreServiceInfo}
                              href={`/services/sub-service-pricing?sv=${service?._id}`}
                            >
                              More
                            </Link>
                          </>
                        ) : (
                          <>
                            {service?.subservice?.map((subservice, index) => (
                              <Link
                                className={styles.sub}
                                key={index + 1}
                                href={`/services/sub-service-pricing?sv=${subservice?._id}`}
                              >
                                <MdOutlineMiscellaneousServices size={20} />
                                &nbsp; {subservice?.sub_service_name}
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/services/service-pricing?sv=${service?._id}`}
                    className={styles.serviceImageContainer}
                  >
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
                  </Link>
                </div>
              );
            })}
          </>
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
