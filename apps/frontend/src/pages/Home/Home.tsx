import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

import HomeStyles from "./Home.module.scss";
import Menu from "../../components/Menu/Menu";

const Home = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <Menu />
      <div className={HomeStyles.carousel}>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          showDots={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass={HomeStyles.dotsClass}
          itemClass="carousel-item-padding-40-px"
        >
          <div
            className={`${HomeStyles.carousel_item} ${HomeStyles.carousel_item_1}`}
          >
            <div className={HomeStyles.card} style={{ marginRight: "250px" }}>
              <div className={HomeStyles.title}>
                Recrutes un joueur <br /> pour ton équipe.
              </div>
              <p>
                Parce que jouer ensemble, c'est aussi passé de bon moment avec
                des amis.
              </p>
            </div>
          </div>
          <div
            className={`${HomeStyles.carousel_item} ${HomeStyles.carousel_item_2}`}
          >
            <div className={HomeStyles.card} style={{ marginLeft: "250px" }}>
              <div className={HomeStyles.title}>
                Crées ton équipe <br />
                et trouvez tes futurs coéquipiers.
              </div>
              <p>
                Trouve des coéquipiers partageant ta passion et forme une équipe
                soudée pour gravir les échelons ensemble.
              </p>
            </div>
          </div>
          <div
            className={`${HomeStyles.carousel_item} ${HomeStyles.carousel_item_3}`}
          >
            <div className={HomeStyles.card} style={{ marginRight: "250px" }}>
              <div className={HomeStyles.title}>
                Participe à des tournois <br /> et défie d'autres équipes.
              </div>
              <p>
                Affronte d'autres équipes, gagne des récompenses et prouve ta
                valeur sur la scène compétitive !
              </p>
            </div>
          </div>
          <div
            className={`${HomeStyles.carousel_item} ${HomeStyles.carousel_item_4}`}
          >
            <div className={HomeStyles.card} style={{ marginLeft: "250px" }}>
              <div className={HomeStyles.title}>
                Découvre des stratégies <br /> et progresse avec ta team.
              </div>
              <p>
                Partagez des conseils, des astuces et des stratégies pour
                améliorer vos performances en équipe.
              </p>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Home;
