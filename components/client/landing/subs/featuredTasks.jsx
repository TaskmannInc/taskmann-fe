import Image from "next/image";
import Link from "next/link";
import { CgMoreAlt } from "react-icons/cg";
import { FaTasks } from "react-icons/fa";
import { primaryCurrency } from "../../../utils/constants/constants";
import { GetServicesHook } from "../../../utils/hooks/serviceMgmtHook";
import {
  ClientDownTime,
  NoClientData,
} from "../../../ui-fragments/dataInteractions";
import { useState } from "react";
import { CardsLoader } from "../../../ui-fragments/loaders";

export default function FeaturedTasksSection({ styles }) {
  const [featuredServices, setFeaturedServices] = useState([]);

  //--get main service <--> request--//
  const onError = (response) => {
    console.log("error", response);
  };

  const onSuccess = (response) => {
    setFeaturedServices(response?.data?.result);
  };

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: serviceData,
  } = GetServicesHook(onSuccess, onError);
  const allMainServices = serviceData?.data?.result;

  //--get main service <--> request--//
  return (
    <div className={styles.featuredTasksContainer}>
      <span className={styles.sectionTitle}>
        <h2>Featured Services</h2>
        <Link className={styles.moreTasklink} href={"/services/all-services"}>
          More&nbsp;
          <CgMoreAlt size={20} />
        </Link>
      </span>
      <div className={styles.tasksContainer}>
        {isLoading && !allMainServices ? (
          <CardsLoader styles={styles} />
        ) : isSuccess && allMainServices?.length > 0 ? (
          <>
            {allMainServices?.slice?.(0, 8)?.map((featured, index) => {
              return (
                <Link
                  href={`/services/service-pricing?sv=${featured?._id}`}
                  className={styles.taskCard}
                  key={index + 1}
                >
                  <div className={styles.ImageContainer}>
                    <Image
                      className={
                        featured?.service_image?.[0]?.image_url
                          ? styles.featuredImg
                          : styles.fallBackImage
                      }
                      width={100}
                      height={100}
                      src={
                        featured?.service_image?.[0]?.image_url ??
                        "/assets/trademarks/taskmann-logo.png"
                      }
                      alt="Featured"
                    />
                  </div>

                  <div className={styles.taskDescription}>
                    <span>
                      <FaTasks size={20} />
                      <small className={styles.serviceTitle}>
                        {featured?.service_name?.length > 20
                          ? `${featured.service_name?.slice(0, 20)}...`
                          : featured?.service_name}
                      </small>
                    </span>
                    {featured?.subservice?.[0]?.pricetier?.length > 0 ? (
                      <span>
                        Price{" "}
                        <small>
                          <b>
                            <i>
                              Starting {primaryCurrency}{" "}
                              {featured?.subservice?.[0]?.pricetier?.[0]?.price}
                            </i>
                          </b>
                        </small>
                      </span>
                    ) : (
                      <span>
                        Price{" "}
                        <small>
                          <b>
                            <i>Dynamic pricing</i>
                          </b>
                        </small>
                      </span>
                    )}
                  </div>
                </Link>
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
    </div>
  );
}
