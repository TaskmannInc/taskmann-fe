import DOMPurify from "dompurify";
import { FaTasks } from "react-icons/fa";
import styles from "../../../../../../styles/admin/Forms.module.css";
import { GeneralTextInput } from "../../../../../ui-fragments/input.jsx";
import { CloseButton } from "../../../../Globals/closeBtn";

export default function ViewServicePriceTier({ closeForm, __selected_tier }) {
  //clean html data from selected tier
  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });

  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaTasks size={25} />
          <h4>{__selected_tier?.tier_name} price tier</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <div className={styles.formContainer}>
          <div className={"grid-col-2"}>
            <div className={"formGroupWrapper"}>
              <span className="mini-card" title={__selected_tier?.tier_name}>
                Tier title: &nbsp;
                <bold>
                  {__selected_tier?.tier_name?.length > 20
                    ? `${__selected_tier?.tier_name?.slice(0, 19)}...`
                    : __selected_tier?.tier_name}
                </bold>
              </span>
            </div>
            <div className={"formGroupWrapper"}>
              <span className="mini-card" title={__selected_tier?.price}>
                Base price: &nbsp;
                <bold>
                  {__selected_tier?.price?.length > 20
                    ? `${__selected_tier?.price?.slice(0, 19)}...`
                    : __selected_tier?.price}
                </bold>
              </span>
            </div>
          </div>
          <div className={"grid-col-2"}>
            <div className={"formGroupWrapper"}>
              <span
                className="mini-card"
                title={__selected_tier?.active == true ? "Active" : "In-active"}
              >
                Status: &nbsp;
                <bold>
                  {__selected_tier?.active == true ? "Active" : "In-active"}
                </bold>
              </span>
            </div>
            <div className={"formGroupWrapper"}>
              <span className="mini-card" title={__selected_tier?.last_name}>
                {" "}
                Date added:
                <bold>
                  {new Date(__selected_tier?.created_at)?.toDateString()}
                </bold>
              </span>
            </div>
          </div>
          <label
            className="label"
            style={{
              display: "flex",
              width: "90%",
              fontSize: `var(--text-nm)`,
              fontWeight: "700",
              borderTop: `1pt solid green`,
              padding: `0.5rem 0`,
            }}
          >
            Cost parameters{" "}
          </label>
          {__selected_tier?.cost_parameters?.map((param, i) => {
            return (
              <div
                key={i + 1}
                className={"formGroupWrapper"}
                style={{
                  width: "100%",
                  padding: "0.65rem 0",
                  borderBottom: "1pt solid var(--green-dark)",
                  rowGap: "0.35rem",
                }}
              >
                {i + 1}
                <GeneralTextInput
                  label={`Parameter name/title `}
                  placeholder={"Eg: Bedroom"}
                  type={"text"}
                  name={"name"}
                  value={param?.name}
                  readOnly={true}
                />
                <br></br>
                <div className={"grid-col-2"}>
                  <div className={"formGroupWrapper"}>
                    <GeneralTextInput
                      label={"Unit type"}
                      placeholder={"Eg: cm, km, 1/2"}
                      type={"text"}
                      name={"unitType"}
                      value={param?.unitType}
                      readOnly={true}
                    />
                  </div>
                  <div className={"formGroupWrapper"}>
                    <GeneralTextInput
                      label={"Unit Price"}
                      placeholder={"Eg: 20.00"}
                      type={"number"}
                      name={"unitPrice"}
                      value={param?.unitPrice}
                      readOnly={true}
                    />
                  </div>

                  <div className={"formGroupWrapper"}>
                    <GeneralTextInput
                      label={"Minimum"}
                      placeholder={"Minimun value"}
                      type={"number"}
                      name={"min"}
                      value={param?.min}
                      readOnly={true}
                    />
                  </div>
                  <div className={"formGroupWrapper"}>
                    <GeneralTextInput
                      label={"Maximum"}
                      placeholder={"Maximum value"}
                      type={"number"}
                      name={"max"}
                      value={param?.max}
                      readOnly={true}
                    />
                  </div>
                  <div className={"formGroupWrapper"}>
                    <GeneralTextInput
                      label={"Duration (minutes)"}
                      placeholder={"Maximum value"}
                      type={"number"}
                      name={"max"}
                      value={param?.duration}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <span className="mini-card" title={__selected_tier?.last_name}>
            <small
              dangerouslySetInnerHTML={sanitizedData(
                __selected_tier?.description
              )}
            ></small>
          </span>
        </div>
      </div>
    </div>
  );
}
