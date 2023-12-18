import { useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function TestimonialBanner({ styles }) {
  return (
    <Slide easing="ease">
      <div className={"eachSlide"}>
        <div
          className="bannerPreloader"
          style={{
            backgroundImage: `url('/assets/backgrounds/customerAuthBg.svg')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </Slide>
  );
}
