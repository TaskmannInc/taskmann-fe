import Link from "next/link";
import { BsFacebook, BsWhatsapp, BsInstagram } from "react-icons/bs";
export default function Footer() {
  return (
    <div className="footer">
      <div className={"footer-sections"}>
        <div className="col">
          <h4>Services</h4>
          <div className={"footerLinkGroup"}>
            <Link
              href={"/services/all-service-pricings"}
              className="footerLinkItem"
            >
              Pricing
            </Link>
            <Link href={"/services/all-services"} className="footerLinkItem">
              All Services
            </Link>
            <Link href={"/company/faq"} className="footerLinkItem">
              FAQ
            </Link>
          </div>
        </div>
        <div className="col">
          <h4 className="company">Company</h4>
          <div className={"footerLinkGroup"}>
            <Link href={"/company/about"} className="footerLinkItem">
              Overview
            </Link>
            <Link href={"/company/safety"} className="footerLinkItem">
              Safety
            </Link>
            <Link
              href={"/company/legal-policies-terms"}
              className="footerLinkItem"
            >
              Policies
            </Link>

            <Link href={"/company/reviews"} className="footerLinkItem">
              Our Reviews
            </Link>
            <Link href={"/company/contact-us"} className="footerLinkItem">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="col">
          <h4 className="popular-categories">Popular Categories</h4>
          <div className={"footerLinkGroup"}>
            <Link href={"/"} className="footerLinkItem">
              Moving
            </Link>
            <Link href={"/"} className="footerLinkItem">
              Car Wash
            </Link>
            <Link href={"/"} className="footerLinkItem">
              Furniture Services
            </Link>
          </div>
        </div>
        <div className="col">
          <h4 className="about">About</h4>
          <div className={"footerLinkGroup"}>
            <Link href={"/blog"} className="footerLinkItem">
              Blog
            </Link>
            <Link href={"/about/careerpage"} className="footerLinkItem">
              Careers
            </Link>
            <Link href={"/usage-and-more"} className="footerLinkItem">
              Usage & More
            </Link>
            <Link href={"/"} className="footerLinkItem">
              Taskers
            </Link>
          </div>
        </div>
      </div>
      <span className="social-icons">
        <Link
          href={"#"}
          className={"socialLink"}
          title="Connect with us Facebook"
        >
          <BsFacebook size={25} color="#4267B2" />
        </Link>
        <Link
          href={"#"}
          className={"socialLink"}
          title="Connect with us WhatsApp"
        >
          <BsWhatsapp size={25} color="#25D366" />
        </Link>
        <Link
          href={"#"}
          className={"socialLink"}
          title="Connect with us Instagram"
        >
          <BsInstagram size={25} color="#C13584" />
        </Link>
      </span>
      <div className={"bottomFooter"}>
        <span className="copyright">Taskmann ©️ All rights reserved.</span>
      </div>
    </div>
  );
}
