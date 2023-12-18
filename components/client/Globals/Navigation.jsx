import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import AccountDropdown from "./profileDropdown";
import { ContextStore } from "../../../store/contextStore";
import { useRouter } from "next/router";

export default function Navigation() {
  //search events
  const [searchActive, setSearchActive] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const viewDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };
  const [headerbackgroundChange, setHeaderbackgroundChange] = useState(false);
  const [screenWidthMobile, setScreenWidthMobile] = useState(
    window.matchMedia("(min-width: 250px) and (max-width: 1022px)").matches
  );

  const paths = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Services", path: "/services/all-services" },
    { id: 3, title: "Taskmann Web", path: "/company/taskmann-web" },
    { id: 4, title: "About", path: "/company/about" },
    { id: 5, title: "Contact", path: "/company/contact-us" },
  ];
  //initialize router
  const router = useRouter();

  const [activeLink, setActiveLink] = useState("");

  //get current path
  const getPath = () => {
    setActiveLink(router?.asPath);
  };

  useEffect(() => {
    getPath();
  });

  //get logged in user session
  const { session } = ContextStore();

  const showSearchBox = () => {
    setSearchActive(!searchActive);
  };

  //Change top level header background on scroll
  const changeBackground = () => {
    if (window.scrollY >= 150) {
      setHeaderbackgroundChange(true);
    } else {
      setHeaderbackgroundChange(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  }, []);

  //on mobile screens
  useEffect(() => {
    window
      .matchMedia("(min-width: 250px) and (max-width: 1022px)")
      .addEventListener("change", (e) => setScreenWidthMobile(e.matches));
  }, []);

  return (
    <div className="navigation-bar">
      <div
        className={
          headerbackgroundChange ? "top-header header-scrolled" : "top-header"
        }
      >
        <Link href={"/"}>
          <Image
            width={100}
            height={100}
            src={
              headerbackgroundChange
                ? "/assets/trademarks/taskmann-logo-white.png"
                : "/assets/trademarks/taskmann-logo.png"
            }
            alt="logo"
            className="logo"
          />
        </Link>
        <div className="header-action-group">
          {searchActive && (
            <div className="search-container">
              <BiSearch size={20} />
              <input type={"search"} placeholder="Search here..." />
            </div>
          )}
          <button className="search-btn" title="search" onClick={showSearchBox}>
            <BiSearch size={20} />
          </button>
          {/* <AiOutlineBorderRight size={20} /> */}

          <Link className="top-header-links" href={"/cart"}>
            <FiShoppingCart size={20} />
          </Link>
          {session ? (
            <button className="logged-in-btn" onClick={() => viewDropdown()}>
              <HiOutlineUser
                size={20}
                title={`${session?.first_name}'s profile.`}
              />
            </button>
          ) : (
            <Link className="top-header-links" href={"/auth/login"}>
              <HiOutlineUser size={20} title="login" />
            </Link>
          )}
        </div>
      </div>
      {!headerbackgroundChange && (
        <>
          {screenWidthMobile ? (
            <div className="bottom-header-mobile">
              <nav className="navigation">
                {paths?.map((linkItem) => {
                  return (
                    <Link
                      key={linkItem?.id}
                      className={`bt-nav-link ${
                        linkItem?.path == activeLink && "bt-nav-link-active"
                      }`}
                      href={linkItem?.path}
                    >
                      {linkItem?.title}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ) : (
            <div className="bottom-header">
              <h4 className="title">
                <Link href={"/"}>Taskmann</Link>
              </h4>
              <nav className="navigation">
                {paths?.map((linkItem) => {
                  return (
                    <Link
                      key={linkItem?.id}
                      className={`bt-nav-link ${
                        linkItem?.path == activeLink && "bt-nav-link-active"
                      }`}
                      href={linkItem?.path}
                    >
                      {linkItem?.title}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </>
      )}
      {showProfileDropdown && <AccountDropdown session={session} />}
    </div>
  );
}
