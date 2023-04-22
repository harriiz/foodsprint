import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "./carouselMain.css";

function CarouselMain() {
  function Slider() {
    return (
      <div className="carouselBody">
        <Splide
          options={{
            type: "loop",
            drag: "free",
            perPage: 2,
            gap: 50,
            breakpoints: {
              1750: {
                perPage: 1,
              },
            },
          }}
          aria-label="React Splide Example"
        >
          <SplideSlide className="carouselCard">
            <img
              src={require("./slike/carouselSlika1.png")}
              alt="Image 1"
              className="carouselSlide"
            />
          </SplideSlide>
          <SplideSlide className="carouselCard">
            <img
              src={require("./slike/carouselSlika2.png")}
              alt="Image 2"
              className="carouselSlide"
            />
          </SplideSlide>
          <SplideSlide className="carouselCard">
            <img
              src={require("./slike/carouselSlika1.png")}
              alt="Image 2"
              className="carouselSlide"
            />
          </SplideSlide>
          <SplideSlide className="carouselCard">
            <img
              src={require("./slike/carouselSlika2.png")}
              alt="Image 2"
              className="carouselSlide"
            />
          </SplideSlide>
        </Splide>
      </div>
    );
  }
  return Slider();
}
export default CarouselMain;
