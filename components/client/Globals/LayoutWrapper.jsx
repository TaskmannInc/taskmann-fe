import { StoreProvider } from "../../../store/contextStore";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function LayoutWrapper({ children }) {
  return (
    <StoreProvider>
      <div className="customer-wrapper">
        <Navigation />
        {children}
        <Footer />
      </div>
    </StoreProvider>
  );
}
