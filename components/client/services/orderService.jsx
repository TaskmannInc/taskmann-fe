import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaMinusCircle } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { MdOutlineAccessTime } from "react-icons/md";
import Cookies from "universal-cookie";
import styles from "../../../styles/client/Services.module.css";
import { DatePickerInstance } from "../../ui-fragments/datePicker";
import { ButtonLoader } from "../../ui-fragments/loaders";
import { StatusNotification } from "../../ui-fragments/notification";
import { primaryCurrency } from "../../utils/constants/constants";
import { AddCartItemsHook } from "../../utils/hooks/cartHook";
const cookie = new Cookies();
export default function OrderPackage() {
  const router = useRouter();

  //get selected service to book
  const orderingState = {
    subservice:
      typeof window !== "undefined"
        ? cookie.get("selectedPackage") ??
          sessionStorage.getItem("selectedPackage")
        : null,
    pricing:
      typeof window !== "undefined"
        ? cookie.get("selectedPackageTier") ??
          sessionStorage.getItem("selectedPackageTier")
        : null,
    session: sessionStorage?.getItem("TM_AC_TK"),
  };

  const [mutableParameters, setMutableParameters] = useState(null);

  const fullPackageDetails = JSON.parse(orderingState?.subservice);
  const priceTierInformation = JSON.parse(orderingState?.pricing);

  //component states
  useEffect(() => {
    var serviceCosts = priceTierInformation?.cost_parameters?.map((param) => {
      var newCosts = {};

      newCosts["max"] = parseInt(param?.max);
      newCosts["min"] = parseInt(param?.min);
      newCosts["name"] = param?.name ?? param?.title;
      newCosts["unitPrice"] = param?.unitPrice;
      newCosts["unitType"] = param?.unitType;
      newCosts["quantity"] = parseInt(param?.min);
      newCosts["duration"] = parseInt(param?.duration);
      return newCosts;
    });
    setMutableParameters(serviceCosts);
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  const [allSelectedOptions, setSelectedOptions] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [serviceCost, setServiceCost] = useState(0);

  //add order options
  const handleSelectOption = (e, option) => {
    const isChecked = e.target?.checked;
    let checked_options = [...allSelectedOptions];
    if (isChecked) {
      // add to array if it is not there are already
      if (!checked_options.includes(option)) {
        checked_options.push(option);
      }
    } else {
      // remove from array
      // checked_options = checked_options.filter((ck) => ck !== option);
      checked_options.splice(
        checked_options.findIndex((cj) => cj.name === option.name),
        1
      );
    }

    // let newCheckedOptions = checked_options?.map((item) => ({
    //   title: item?.name,
    //   quantity: parseInt(item?.quantity),
    //   unitCost: parseInt(item?.unitPrice),
    //   totalCost: parseFloat(item?.quantity * item?.unitPrice),
    // }));
    setSelectedOptions(checked_options);
  };

  //handle cost parameter increment / decrement
  const handleChangeParamQty = (param, op) => {
    var newMutableParams = allSelectedOptions;

    const paramsOnOp = newMutableParams.map((paramItem) => {
      if (paramItem?.name == param) {
        return {
          ...paramItem,
          quantity:
            op == "increase"
              ? parseInt(paramItem?.quantity + 1)
              : paramItem?.quantity - 1,
        };
      }
      return paramItem;
    });
    setSelectedOptions(paramsOnOp);
    console.log("setSelectedOptions", paramsOnOp);
    return;
  };

  //get sub total, taxed amount and service cost of all product options
  const calculateSubTotal = () => {
    var includedCost = [];
    var amountToPay = [];
    var sub = 0;

    //calculate each option's cost
    allSelectedOptions.forEach((item) => {
      amountToPay = item?.unitPrice * item?.quantity;
      includedCost.push(amountToPay);
    });

    for (let i = 0; i < includedCost.length; i++) {
      sub += includedCost[i];
    }

    setSubTotal(sub);
    setServiceCost(sub);
  };

  useEffect(() => {
    calculateSubTotal();
  }, [allSelectedOptions]);

  //cart data handling and api request handlers
  const cartRequestBody = [
    {
      pricetierid: priceTierInformation?._id,
      service_name: fullPackageDetails?.sub_service_name,
      service_date: startDate,
      packageDetails: allSelectedOptions?.map((item) => ({
        title: item?.name,
        quantity: parseInt(item?.quantity),
        unitCost: parseInt(item?.unitPrice),
        totalCost: parseFloat(item?.quantity * item?.unitPrice),
      })),
    },
  ];

  const handleSubmitCartItem = (e) => {
    e.preventDefault();
    addToCart(cartRequestBody);
  };

  const onSuccess = () => {
    window.location.href = "/cart";
  };

  const onError = (error) => {
    console.error(error);
  };

  const {
    mutate: addToCart,
    isLoading: isAddLoading,
    isSuccess: isAddSuccess,
    isError: isAddError,
    error: addToCartError,
  } = AddCartItemsHook(onSuccess, onError);

  if (isAddSuccess) {
    router.push("/cart");
  }

  return (
    <>
      <section className={styles.servicesBanner}>
        <h6
          className={styles.servicesHeading}
          style={{ textTransform: "capitalize" }}
        >
          {priceTierInformation?.tier_name}
        </h6>
        <p className={styles.tagLine}>
          A tasker will be auto assigned to you once your ordering process is
          completed
        </p>
      </section>

      {/*Service request section*/}
      <div className={styles.subServiceOrdering}>
        <div className={styles.subServiceDetails}>
          <h3>Service / Package order</h3>
          <div className={styles.subServiceDetailList}>
            <span className={`${styles.serviceParamater} date-wrapper`}>
              <span>Service date</span>
              <DatePickerInstance
                showTimeSelect={true}
                minDate={new Date()}
                placehoderText={"Select service date"}
                showWeekNumbers={true}
                selected={startDate}
                onDateChange={(selected) => setStartDate(selected)}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </span>
            {mutableParameters?.map((param, i) => {
              return (
                <span
                  className={`${styles.serviceParamater} ${styles.serviceParamaterMobile}`}
                  key={i + 1}
                >
                  <span className={styles.parameterLabel}>
                    <input
                      type="checkbox"
                      defaultValue={allSelectedOptions.includes(param)}
                      // value={param}
                      className={``}
                      style={{
                        width: "1rem",
                        height: "1rem",
                      }}
                      onChange={(e) => handleSelectOption(e, param)}
                    />
                    &nbsp;&nbsp;
                    {param?.name} &nbsp; <FiArrowRight size={22} />
                  </span>
                  <span className={styles.parameter}>
                    {allSelectedOptions?.some(
                      (optionexist) => optionexist?.name == param?.name
                    ) ? (
                      <button
                        title="Decrease"
                        type="button"
                        className="action-btn"
                        onClick={() =>
                          handleChangeParamQty(param?.name, "decrease")
                        }
                        disabled={allSelectedOptions?.some(
                          (optionexist) =>
                            optionexist?.name == param?.name &&
                            optionexist?.quantity == param?.min
                        )}
                      >
                        <FaMinusCircle size={80} color="red" />
                      </button>
                    ) : (
                      <button
                        title="Decrease"
                        type="button"
                        className="action-btn"
                        onClick={() =>
                          handleChangeParamQty(param?.name, "decrease")
                        }
                        disabled={true}
                      >
                        <FaMinusCircle size={80} color="red" />
                      </button>
                    )}
                    <span></span>
                    {allSelectedOptions?.some(
                      (optionexist) => optionexist?.name == param?.name
                    ) ? (
                      <button
                        title="Increase"
                        type="button"
                        className="action-btn"
                        onClick={() =>
                          handleChangeParamQty(param?.name, "increase")
                        }
                        disabled={allSelectedOptions?.some(
                          (optionexist) =>
                            optionexist?.name == param?.name &&
                            optionexist?.quantity == param?.max
                        )}
                      >
                        <BsPlusCircleFill size={80} color="green" />
                      </button>
                    ) : (
                      <button
                        title="Increase"
                        type="button"
                        className="action-btn"
                        onClick={() =>
                          handleChangeParamQty(param?.name, "increase")
                        }
                        disabled={true}
                      >
                        <BsPlusCircleFill size={80} color="green" />
                      </button>
                    )}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
        <form
          onSubmit={handleSubmitCartItem}
          className={styles.subServiceOrder}
        >
          <h3>Order summary</h3>
          <div className={styles.orderSummary}>
            <span className={styles.orderSummaryTitle}>
              {priceTierInformation?.tier_name?.length > 45
                ? `${priceTierInformation?.tier_name?.slice(0, 45)}...`
                : priceTierInformation?.tier_name}
            </span>
            <>
              {allSelectedOptions?.length > 0 ? (
                <>
                  {allSelectedOptions?.map((params, index) => {
                    return (
                      <div key={index + 1} className={styles.summaryInfo}>
                        <span
                          className={styles.orderSummaryLabel}
                          style={{ backgroundColor: `var(--green-dark)` }}
                        >
                          {params?.name}
                        </span>
                        <span className={styles.orderSummaryInfo}>
                          <>
                            {params?.quantity} * {primaryCurrency}
                            {params?.unitPrice}
                          </>
                          &nbsp;&nbsp;
                          {params?.duration ? (
                            <>
                              |&nbsp;&nbsp;
                              <MdOutlineAccessTime size={18} />
                              &nbsp;
                              {params?.quantity * params?.duration} &nbsp;
                              {`(mins)`}
                            </>
                          ) : null}
                        </span>
                      </div>
                    );
                  })}
                </>
              ) : (
                <small>Kindly select one or more options to continue</small>
              )}
            </>

            {/* <div className={styles.summaryInfo}>
              <span
                className={styles.orderSummaryLabel}
                style={{ backgroundColor: `var(--green-dark)` }}
              >
                Sub total
              </span>
              <span
                className={styles.orderSummaryInfo}
                style={{ borderRadius: 0 }}
              >
                {primaryCurrency}&nbsp;{subTotal ?? 0}
              </span>
            </div> */}

            <div className={styles.summaryInfo}>
              <span
                className={styles.orderSummaryLabel}
                style={{
                  borderRadius: 0,
                  backgroundColor: `var(--green-dark)`,
                  padding: "0.55rem 0.75rem",
                }}
              >
                Total
              </span>
              <span className={styles.orderSummaryInfo}>
                {primaryCurrency} {serviceCost ?? 0}
              </span>
            </div>
          </div>
          {orderingState?.session ? (
            <button
              type="submit"
              disabled={
                allSelectedOptions?.length == 0 || isAddLoading || isAddSuccess
              }
              className={styles.addtoCart}
            >
              {isAddLoading ? (
                <ButtonLoader />
              ) : isAddError ? (
                "Retry"
              ) : (
                "Add to cart"
              )}
            </button>
          ) : (
            <Link
              href="/auth/login"
              className={styles.addtoCart}
              style={{ textAlign: "center" }}
            >
              Login to continue
            </Link>
          )}
          {isAddError ? (
            <StatusNotification
              type={"error"}
              message={`An error occured:
              ${
                orderCheckoutError?.response?.data?.error ??
                orderCheckoutError?.message
              }`}
            />
          ) : isAddSuccess ? (
            <StatusNotification
              type={"success"}
              message={`Item added to cart successfully. You will be redirected.`}
            />
          ) : null}
        </form>
      </div>
    </>
  );
}
