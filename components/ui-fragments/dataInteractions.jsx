import Image from "next/image";

export const NoTableData = ({ notification }) => {
  return (
    <div className={"noTableData"}>
      <Image
        src={"/assets/illustrations/desk-illustration.svg"}
        alt={"No data"}
        width={400}
        height={300}
        className={"noTableData-illustration"}
        loading="lazy"
      />
      <span className={"noTableData-caption"}>
        {notification ??
          "There happens to be no data available. We will keep this space updated once there is something to show."}
      </span>
    </div>
  );
};

export const NoClientData = ({ notification }) => {
  return (
    <div className={"noTableData"}>
      <Image
        src={"/assets/illustrations/person-working.svg"}
        alt={"No data"}
        width={400}
        height={300}
        className={"noTableData-illustration"}
        loading="lazy"
      />
      <span className={"noTableData-caption"}>
        {notification ??
          "Hey there, seems there are no items in this section at the moment. Our team is working around the clock to get all services restored"}
      </span>
    </div>
  );
};
export const NoCartData = ({ notification }) => {
  return (
    <div className={"noTableData"}>
      <Image
        src={"/assets/illustrations/cart.svg"}
        alt={"No data"}
        width={400}
        height={300}
        className={"noTableData-illustration"}
        loading="lazy"
      />
      <span className={"noTableData-caption"}>
        {notification ??
          "Hey there, seems there are no items in this section at the moment. Our team is working around the clock to get all services restored"}
      </span>
    </div>
  );
};

export const NoOrderData = ({ notification }) => {
  return (
    <div className={"noTableData"}>
      <Image
        src={"/assets/illustrations/package.svg"}
        alt={"No data"}
        width={400}
        height={300}
        className={"noTableData-illustration"}
        loading="lazy"
      />
      <span className={"noTableData-caption"}>
        {notification ??
          "Hey there, seems there are no items in this section at the moment. Our team is working around the clock to get all services restored"}
      </span>
    </div>
  );
};

export const SuccessInteraction = ({ notification }) => {
  return (
    <div className={"noTableData"}>
      <Image
        src={"/assets/illustrations/dancing-jubilation.svg"}
        alt={"No data"}
        width={400}
        height={300}
        className={"noTableData-illustration"}
        loading="lazy"
      />
      <span
        className={"noTableData-caption"}
        style={{ color: `var(--success)` }}
      >
        {notification ?? "Your request was processed successfully ..."}
      </span>
    </div>
  );
};
export const ErrorInteraction = ({ notification }) => {
  return (
    <div className={"noTableData"}>
      <Image
        src={"/assets/illustrations/payment-error.svg"}
        alt={"No data"}
        width={400}
        height={300}
        className={"noTableData-illustration"}
        loading="lazy"
      />
      <span
        className={"noTableData-caption"}
        style={{ color: `var(--danger)` }}
      >
        {notification ??
          "An error occured while processing your request. Please try again later."}
      </span>
    </div>
  );
};

export const ClientDownTime = ({ notification }) => {
  return (
    <div className={"noTableData"}>
      <Image
        src={"/assets/illustrations/server-woman-colour.svg"}
        alt={"No data"}
        width={400}
        height={300}
        className={"noTableData-illustration"}
        loading="lazy"
      />
      <span className={"noTableData-caption"}>
        {notification ??
          "Hey there, we encountered an issue while getting you the requested information. Kindly try again later or reach out to us for assistance"}
      </span>
    </div>
  );
};

export const NoAvailableOpenings = ({ notification }) => {
  return (
    <div className={"noTableData"}>
      <Image
        src={"/assets/illustrations/careers-illustration.svg"}
        alt={"No data"}
        width={400}
        height={300}
        className={"noTableData-illustration"}
        loading="lazy"
      />
      <span className={"noTableData-caption"}>
        {notification ??
          "Hey there, seems there are no items in this section at the moment. Our team is working around the clock to get all services restored"}
      </span>
    </div>
  );
};
