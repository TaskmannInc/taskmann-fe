import Link from "next/link";
import styles from "../../../styles/client/Services.module.css";
import { FaRegStar } from "react-icons/fa";
import { BsClipboardCheck } from "react-icons/bs";
import { useRouter } from "next/router";
import { GetSelectedServiceHook } from "../../utils/hooks/serviceMgmtHook";
import {
  ClientDownTime,
  NoClientData,
} from "../../ui-fragments/dataInteractions";
import { useState } from "react";
import { primaryCurrency } from "../../utils/constants/constants";
import DOMPurify from "dompurify";

export default function ServicePricing() {
  //next router definition
  const router = useRouter();

  var queryParams = router?.query?.sv;
  const [selectedService, setSelectedService] = useState([]);

  //--get main service <--> request--//
  const onError = (response) => {
    console.log("error", response);
  };

  const onSuccess = (response) => {
    setSelectedService(response?.data?.result);
  };

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: selectedServiceInfo,
  } = GetSelectedServiceHook(onSuccess, onError, queryParams);
  const selectedInfo = selectedServiceInfo?.data?.result;

  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });

  return (
    <>
      {isLoading ? (
        <section className={styles.servicesBannerLoading}>
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
      ) : isSuccess ? (
        <section
          className={styles.servicesBanner}
          style={{
            backgroundImage:
              `url(${selectedInfo?.service_image?.[0]?.image_url})` ??
              `url("/assets/backgrounds/cleaningserviceBg.jpg")`,
            backgroundPosition: `center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
            backgroundColor: `var(--dark)`,
            backgroundBlendMode: `overlay`,
          }}
        >
          <h2 className={styles.servicesHeading}>
            {selectedInfo?.service_name}
          </h2>
          <p
            className={styles.tagLine}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(selectedInfo?.description),
            }}
          ></p>
          <Link
            href={"/services/request-service"}
            className={styles.serviceReqLink}
          >
            Request a Service
          </Link>
        </section>
      ) : (
        isError && (
          <section className={styles.servicesBanner}>
            <h2 className={styles.servicesHeading}>Service pricing</h2>
            <p className={styles.tagLine}>
              Check out the amazing catalogue of services we render at
              affordable prices.
            </p>
            <Link
              href={"/services/request-service"}
              className={styles.serviceReqLink}
            >
              Request a Service
            </Link>
          </section>
        )
      )}
      <div className={styles.pricingContainer}>
        {isLoading ? (
          <>
            <div className={styles.pricesLoading}>
              {[...Array(3)].map((_, index) => (
                <div key={index + 1} className={styles.priceCard}>
                  <span className={styles.priceHeader}>
                    <h4>Basic Cleaning</h4>
                    <FaRegStar size={20} color="gold" />
                  </span>
                  <span className={styles.priceBody}>
                    <span className={styles.priceTag}>
                      <sup>$</sup>&nbsp;<h1>79</h1>&nbsp;<sup>99</sup>
                    </span>
                    <div className={styles.subServices}>
                      {[...Array(7)].map((_, index) => {
                        return (
                          <span key={index + 1} className={styles.item}>
                            <BsClipboardCheck size={20} /> Exterior wipe of
                            appliances
                          </span>
                        );
                      })}
                    </div>
                  </span>
                  <span className={styles.priceFooter}>
                    <Link
                      href={"/services/sub-service?sv=123"}
                      className={styles.getStartedLink}
                    >
                      {" "}
                      Get Started
                    </Link>
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : isSuccess && selectedInfo?.subservice?.length > 0 ? (
          <>
            <div className={styles.prices}>
              {selectedInfo?.subservice?.map((subs, index) => (
                <div key={index + 1} className={styles.priceCard}>
                  <span className={styles.priceHeader}>
                    <h4>{subs?.sub_service_name}</h4>
                    <FaRegStar size={20} color="gold" />
                  </span>
                  <span className={styles.priceBody}>
                    <span className={styles.priceTag}>
                      {subs?.pricetier?.length > 0 ? (
                        <>
                          <sup>{primaryCurrency}</sup>&nbsp;
                          <h1>{subs?.pricetier?.[0]?.price}</h1>
                        </>
                      ) : (
                        <span style={{ fontWeight: "bold" }}>
                          Dynamic pricing
                        </span>
                      )}
                    </span>
                    <div className={styles.subServices}>
                      <span key={index + 1} className={styles.item}>
                        <small
                          dangerouslySetInnerHTML={sanitizedData(
                            subs?.description
                          )}
                        ></small>
                      </span>
                    </div>
                  </span>
                  <span className={styles.priceFooter}>
                    <Link
                      href={`/services/sub-service-pricing?sv=${subs?._id}`}
                      className={styles.getStartedLink}
                    >
                      {" "}
                      Get Started
                    </Link>
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : isSuccess && selectedInfo?.subservice?.length == 0 ? (
          <div style={{ padding: "3rem 0" }}>
            <NoClientData
              notification={
                "There are no services here for booking. Our team is working tirelessly to get all our services up and running"
              }
            />
          </div>
        ) : isError ? (
          <div style={{ padding: "3rem 0" }}>
            <ClientDownTime />
          </div>
        ) : (
          <div style={{ padding: "3rem 0" }}>
            <NoClientData
              notification={
                "There are no services here for booking. Our team is working tirelessly to get all our services up and running"
              }
            />
          </div>
        )}
      </div>
    </>
  );
}
