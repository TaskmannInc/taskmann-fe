import React, { useState, useEffect } from "react";
import styles from "../../../styles/client/About.module.css";
import { slides } from "../../../pages/company/Slideshow";

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentSlide]);

  const handleNext = () => {
    if (slides && slides.length > 0) {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }
  };

  const handlePrevious = () => {
    if (slides && slides.length > 0) {
      setCurrentSlide(
        currentSlide === 0 ? slides.length - 1 : currentSlide - 1
      );
    }
  };

  return (
    <div className={styles.slideshow}>
      <div className={styles.slide}>
        <p>{slides[currentSlide].text}</p>
        <img src={slides[currentSlide].image} alt={slides[currentSlide].text} />
        <h2>{slides[currentSlide].title}</h2>
        <h3>{slides[currentSlide].jobtitle}</h3>
      </div>
      <div className={styles.buttons}>
        <button onClick={handlePrevious}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
 
  );
}


{
  /* export default Slideshow; */
     {/*<div className="main">
        <div class="container1">
          <div class="column">
            <h2>Experts you can always trust </h2>
            <p>
              Let our skilled taskers do the work for you while you relax and
              enjoy the day.
            </p>
            <p>
              The same-day service platform instantly connects you to trained
              professional taskers to assist with cleaning, moving, car wash and
              more.
            </p>
            <p>Get a quote for most of our services within minutes.</p>
          </div>
          <div class="column bg-alt">
            <div class="slideshow-container">
              <div class="mySlides fade">
                <div class="text">
                  "Professional quality and quick service is very hard to come
                  by nowadays. I founded Taskmann with the aim of solving that
                  issue. With Taskmann, you don't need to worry about looking
                  around to find the best deal for the service your looking for,
                  just tell us about your needs and we will take care of the
                  rest."
                </div>
                <div class="numbertext">Shaun</div>
                <div class="numbertext">Co-Founder of Taskmann</div>
              </div>

              <div class="mySlides fade">
                <div class="text">
                  "Before Taskmann was founded, trying to find someone to get a
                  service done was really hard, most places was already booked
                  weeks ahead and sometimes the quality of service will not meet
                  the expectations. Taskmann really helped solving that issue by
                  providing quick service solutions . "
                </div>
                <img src="img_snow_wide.jpg" style="width:100%"></img>
                <div class="numbertext">Tasker 1</div>
                <div class="numbertext">Tasker</div>
              </div>

              <div class="mySlides fade">
                <div class="text">
                  "At first , I was very hesitant to try Taskmann Services but
                  when I tried , it changed my whole life. Excellence to the
                  Taskmann team to provide a quick service at an affordable
                  rate. Had an amazing first experience. "
                </div>
                <img src="img_mountains_wide.jpg" style="width:100%"></img>
                <div class="numbertext">Kathryn Jones</div>
                <div class="numbertext">Customer </div>
              </div>
              <br></br>
              <div style="text-align:center">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </div>
          </div>
        </div>
        <center>
          <h1>Services</h1>
        </center>
        <div classname="row">
          {[...Array(8)].map((index) => {
            return (
              <div class="column" key={index + 1}>
                <div class="card">
                  <img
                    src="https://via.placeholder.com/200x200.png?text=Product+1"
                    alt="Product 1"
                  ></img>
                  <h3>Moving</h3>
                  <p>Starting from $ 50</p>
                </div>
              </div>
            );
          })}
        </div>

        // <div classname={styles.row}>
        // <div className={styles.buttons}>
        //   <button>And More !</button>
        // </div>
    //   </div>
        */}
    }