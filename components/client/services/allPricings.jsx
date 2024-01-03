import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsClipboardCheck } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import styles from "../../../styles/client/Services.module.css";
import {
  ClientDownTime,
  NoClientData,
} from "../../ui-fragments/dataInteractions";
import { SubServiceCardsLoader } from "../../ui-fragments/loaders";
import { primaryCurrency } from "../../utils/constants/constants";
import { GetSubServicesHook } from "../../utils/hooks/serviceMgmtHook";
import DOMPurify from "dompurify";

export default function ServicePricing() {
  //initializations
  //clean up html data
  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });

  const router = useRouter();

  var queryParams = router?.query?.sv;
  console.log("query", queryParams);
  const [selectedService, setSelectedService] = useState([]);

  //--get main service <--> request--//
  const onError = (response) => {
    console.log("error", response);
  };

  const onSuccess = (response) => {
    setSelectedService(response?.data?.result);
    console.log("sucesss :", response);
  };

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: subServices,
  } = GetSubServicesHook(onSuccess, onError);
  const allSystemSubServices = subServices?.data?.result;
  console.log("selected", allSystemSubServices);

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
        <section className={styles.servicesBanner}>
          <h2 className={styles.servicesHeading}>All services offered</h2>
          <p className={styles.tagLine}>
            Check out the amazing catalogue of services we render at affordable
            prices.
          </p>
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
          <SubServiceCardsLoader styles={styles} />
        ) : isSuccess && allSystemSubServices?.length > 0 ? (
          <>
            <div className={styles.prices}>
              {allSystemSubServices?.map((subs, index) => (
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
                        <BsClipboardCheck size={20} />{" "}
                        <small
                          dangerouslySetInnerHTML={sanitizedData(
                            subs?.description?.length > 400
                              ? `${subs?.description?.slice(0, 400)} ...`
                              : subs?.description
                          )}
                        ></small>
                      </span>
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
        ) : isSuccess && allSystemSubServices?.subservice?.length == 0 ? (
          <div style={{ padding: "3rem 0" }}>
            <NoClientData />
          </div>
        ) : isError ? (
          <div style={{ padding: "3rem 0" }}>
            <ClientDownTime />
          </div>
        ) : (
          <div style={{ padding: "3rem 0" }}>
            <NoClientData />
          </div>
        )}
      </div>
    </>
  );
}
