import Image from "next/image";
import Link from "next/link";
import { BsClipboardCheck } from "react-icons/bs";
import { FaRegStar, FaTasks } from "react-icons/fa";

export const ButtonLoader = () => {
  return (
    <span className="button-loader">
      <Image
        className="button-loader-img"
        src="/assets/loaders/infinityloader.svg"
        alt="loading..."
        width={150}
        height={100}
      />
    </span>
  );
};

export const DataSetLoader = () => {
  return (
    <span className="button-loader">
      <Image
        className="data-loader-img"
        src="/assets/loaders/clipboard.svg"
        alt="loading..."
        width={100}
        height={100}
      />
    </span>
  );
};

export const UpdateLoader = () => {
  return (
    <span className="button-loader">
      <Image
        className="update-loader-img"
        src="/assets/loaders/spinner.svg"
        alt="loading..."
        width={100}
        height={100}
      />
    </span>
  );
};

export const DataUpdateLoader = () => {
  return (
    <span className="button-loader">
      <Image
        className="data-update-loader"
        src="/assets/loaders/spinner.svg"
        alt="loading..."
        width={100}
        height={100}
      />
    </span>
  );
};

export const LogoutLoader = () => {
  return (
    <span className="logout-loader">
      <Image
        className="table-loader-animation"
        src="/assets/loaders/spinner.svg"
        alt="loading..."
        width={100}
        height={100}
      />
      <small style={{ color: `var(--danger)` }}>Logging you out...</small>
    </span>
  );
};

export const TableLoader = () => {
  return (
    <div className="table-loader">
      <Image
        className="table-loader-animation"
        src="/assets/loaders/spinner.svg"
        alt="loading..."
        width={150}
        height={150}
      />
      <span className="notice">Fetching your data,{" won't"} be long...</span>
    </div>
  );
};

export const CardsLoader = ({ styles }) => {
  return (
    <>
      {[...Array(8)].map((index) => {
        return (
          <div className={styles.taskCardLoading} key={index + 1}>
            <div className={styles.ImageContainer}>
              <Image
                className={styles.featuredImg}
                width={100}
                height={100}
                src={"/assets/trademarks/taskmann-logo.png"}
                alt="Data loading"
              />
            </div>
            <div className={styles.taskDescription}>
              <span>
                <FaTasks size={20} /> Data loading
              </span>
              <span>
                Price{" "}
                <small>
                  <i>Data loading</i>
                </small>
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export const SubServiceCardsLoader = ({ styles }) => {
  return (
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
                    <BsClipboardCheck size={20} /> Exterior wipe of appliances
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
  );
};
