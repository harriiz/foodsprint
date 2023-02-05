import "./kosturMain.css";
import CarouselMain from "./CarouselMain";
import Restorani from "../../features/restorani/Restorani";
import RestoraniList from "../../features/restorani/RestoraniList";
import { useState } from "react";

function KosturMain({}) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (idx) => {
    if (selectedCategory === idx) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(idx);
    }
  };

  return (
    <div className="kosturBody">
      <CarouselMain />
      <div className="kosturMain">
        <div className="kategorije">
          <div
            className={`kategorijaBox ${
              selectedCategory === "Fast Food" ? "kategorijaSelected" : ""
            }`}
            onClick={() => handleCategoryClick("Fast Food")}
          >
            <img src={require("./slike/fastfood.png")} alt="" />
            <p className="kategorijaTekst">Fast Food</p>
          </div>
          <div
            className={`kategorijaBox ${
              selectedCategory === "Pekara" ? "kategorijaSelected" : ""
            }`}
            onClick={() => handleCategoryClick("Pekara")}
          >
            <img src={require("./slike/pekara2.png")} alt="" />
            <p className="kategorijaTekst">Pekara</p>
          </div>
          <div
            className={`kategorijaBox ${
              selectedCategory === "Slasticarna" ? "kategorijaSelected" : ""
            }`}
            onClick={() => handleCategoryClick("Slasticarna")}
          >
            <img
              src={require("./slike/slasticarna.png")}
              alt=""
              className="slst"
            />
            <p className="kategorijaTekst">Slastičarna</p>
          </div>
          <div
            className={`kategorijaBox ${
              selectedCategory === "Pizzeria" ? "kategorijaSelected" : ""
            }`}
            onClick={() => handleCategoryClick("Pizzeria")}
          >
            <img src={require("./slike/pizzeria.png")} alt="" />
            <p className="kategorijaTekst">Pizzeria</p>
          </div>
          <div
            className={`kategorijaBox ${
              selectedCategory === "Restoran" ? "kategorijaSelected" : ""
            }`}
            onClick={() => handleCategoryClick("Restoran")}
          >
            <img src={require("./slike/restoran.png")} alt="" />
            <p className="kategorijaTekst">Restoran</p>
          </div>
          <div
            className={`kategorijaBox ${
              selectedCategory === "Market" ? "kategorijaSelected" : ""
            }`}
            onClick={() => handleCategoryClick("Market")}
          >
            <img src={require("./slike/prodavnica.png")} alt="" />
            <p className="kategorijaTekst">Market</p>
          </div>

          <div
            className={`kategorijaBox ${
              selectedCategory === "Kafic" ? "kategorijaSelected" : ""
            }`}
            onClick={() => handleCategoryClick("Kafic")}
          >
            <img src={require("./slike/kafic.png")} alt="" />
            <p className="kategorijaTekst">Kafić</p>
          </div>
        </div>
        <div className="restoranBody">
          <RestoraniList selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

export default KosturMain;
