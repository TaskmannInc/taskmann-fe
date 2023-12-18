import style from "../../../styles/client/Taskers.module.css";
export default function AdminTasker() {
  return (
    <>
      <div className={style.header}>
        <center>
          <h1 className={style.title}>Our Taskers</h1>
        </center>
      </div>
      <div className={style.container}>
        
        <div className={style.row}>
          <div className={style.column}>
            <div className="image-container">
              <img src="https://picsum.photos/300/200" alt="Image 1" />
            </div>

            <h2>Varish</h2>
            <p>Languages : English, French</p>
            <p>
              Varish is an excellent worker who consistently exceeds
              expectations. He is reliable, punctual, and always willing to go
              the extra mile to ensure that tasks are completed to the highest
              standard. Varish is a team player, and his positive attitude and
              strong work ethic make him a valuable asset to any organization.
              He is a pleasure to work with and always willing to lend a helping
              hand to her colleagues. Overall, Varish is a top-performing tasker
              who consistently demonstrates a strong commitment to excellence.
            </p>
            <h2>Tasks</h2>
            <ul>
              <li>Moving</li>
              <li>Cleaning</li>
              <li>Painting</li>
              <li>Car wash</li>
              <li>Furnitures</li>
              <li>Handyman</li>
            </ul>
          </div>
          <div className={style.column}>
            <div className="image-container">
              <img src="https://picsum.photos/300/200" alt="Image 1" />
            </div>

            <h2>James</h2>
            <p>Languages : English</p>
            <p>
              James possess a strong track record of success and a proven
              ability to deliver high-quality results on time, making him a
              reliable and valuable asset for any task or project.
            </p>
            <h2>Tasks</h2>
            <ul>
              <li>Moving</li>
              <li>Cleaning</li>
              <li>Painting</li>
              <li>Car wash</li>
              <li>Furnitures</li>
              <li>Handyman</li>
            </ul>
          </div>
          <div className={style.column}>
            <div className="image-container">
              <img src="https://picsum.photos/300/200" alt="Image 1" />
            </div>

            <h2>Shaun</h2>
            <p>Languages : English, Chinese</p>
            <p>
              I believe in delivering exceptional work and going above and
              beyond to ensure that every task is completed to the highest
              standard. Hire me for your tasks and you can trust that I will
              bring my best effort and dedication to every project.
            </p>
            <h2>Tasks</h2>
            <ul>
              <li>Moving</li>
              <li>Cleaning</li>
              <li>Painting</li>
              <li>Car wash</li>
              <li>Furnitures</li>
              <li>Handyman</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
