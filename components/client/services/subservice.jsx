import DOMPurify from "dompurify";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import styles from "../../../styles/client/Services.module.css";
import {
  ClientDownTime,
  NoClientData,
} from "../../ui-fragments/dataInteractions";
import { SubServiceCardsLoader } from "../../ui-fragments/loaders";
import { primaryCurrency } from "../../utils/constants/constants";
import { GetSelectedSubServiceHook } from "../../utils/hooks/serviceMgmtHook";
export default function SubServiceDetails() {
  // next router definition
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
    data: subserviceData,
  } = GetSelectedSubServiceHook(onSuccess, onError, queryParams);
  const selectedSubServiceData = subserviceData?.data?.result;

  //book service
  const bookSelectedPackage = (subDet) => {
    sessionStorage.setItem("selectedPackage", JSON.stringify(selectedService));
    sessionStorage.setItem("selectedPackageTier", JSON.stringify(subDet));
    router.push(`/services/book-service?i=${selectedService?._id}`);
  };

  return (
    <>
      {isLoading ? (
        <section className={styles.servicesBannerLoading}>
          <h2 className={styles.servicesHeading}>Our Services</h2>
          <p className={styles.tagLine}>
            Hire our professional taskers with peace of mind
          </p>
          <Link href={"#"} className={styles.serviceReqLink}>
            Request a Service
          </Link>
        </section>
      ) : isSuccess ? (
        <section className={styles.servicesBanner}>
          <h2 className={styles.servicesHeading}>
            {selectedSubServiceData?.sub_service_name ?? "Sub services offered"}
          </h2>
          <p className={styles.tagLine}>
            Check out the amazing catalogue of pricing plans we have for{" "}
            {selectedSubServiceData?.sub_service_name ?? "us"}.
          </p>
          <Link
            href={"/services/request-service"}
            className={styles.serviceReqLink}
          >
            Request on your own terms
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
        ) : isSuccess && selectedSubServiceData?.pricetier?.length > 0 ? (
          <>
            <div className={styles.prices}>
              {selectedSubServiceData?.pricetier?.map((subDet, index) => (
                <div key={index + 1} className={styles.priceCard}>
                  <span className={styles.priceHeader}>
                    <h4>{subDet?.tier_name}</h4>
                    <FaRegStar size={20} color="gold" />
                  </span>
                  <span className={styles.priceBody}>
                    <span className={styles.priceTag}>
                      {subDet?.price > 0 ? (
                        <>
                          <sup>{primaryCurrency}</sup>&nbsp;
                          <h1>{subDet?.price}</h1>
                        </>
                      ) : (
                        <span style={{ fontWeight: "bold" }}>
                          Dynamic pricing
                        </span>
                      )}
                    </span>
                    <div className={styles.subServices}>
                      <span key={index + 1} className={styles.item}>
                        <p
                          className={styles.tagLine}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(subDet?.description),
                          }}
                        ></p>{" "}
                      </span>
                    </div>
                  </span>
                  <span className={styles.priceFooter}>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => bookSelectedPackage(subDet)}
                      className={styles.getStartedLink}
                    >
                      {" "}
                      Book now
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : isSuccess && selectedSubServiceData?.subservice?.length == 0 ? (
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
