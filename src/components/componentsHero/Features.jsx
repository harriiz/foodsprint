import "./features.css";

function Features() {
  return (
    <div className="featuresDio">
      <h1 className="featuresNaslov">Za samo 30 minuta na vašim vratima</h1>
      <h2>U 3 jednostavna koraka</h2>
      <div className="featuresKoraci">
        <div className="korak korak1">
          <img
            src={require("./slike/undraw1.svg").default}
            alt=""
            className="korakImg"
            width={"320px"}
          />
          <h2>Izaberi jelo</h2>
          <p>
            FoodSprint nudi hiljade jela i specijaliteta, FoodSprint nudi
            hiljade jela i specijaliteta FoodSprint nudi hiljade jela{" "}
          </p>
        </div>
        <div className="korak korak2">
          <img
            src={require("./slike/undraw_2.svg").default}
            alt=""
            className="korakImg"
            width={"320px"}
          />
          <h2>Naruči hranu</h2>
          <p>
            FoodSprint nudi hiljade jela i specijaliteta, FoodSprint nudi
            hiljade jela i specijaliteta FoodSprint nudi hiljade jela
          </p>
        </div>
        <div className="korak korak3">
          <img
            src={require("./slike/undraw_3.svg").default}
            alt=""
            className="korakImg"
            width={"320px"}
            height={"280px"}
          />
          <h2>Preuzmi dostavu</h2>
          <p>
            FoodSprint nudi hiljade jela i specijaliteta, FoodSprint nudi
            hiljade jela i specijaliteta FoodSprint nudi hiljade jela
          </p>
        </div>
      </div>
    </div>
  );
}

export default Features;
