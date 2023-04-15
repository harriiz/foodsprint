import "./heroImage.css";

function HeroImage() {
  return (
    <img
      className="heroImg"
      src={require("./slike/full-mockup.png")}
      alt=""
      width={"650px"}
    />
  );
}

export default HeroImage;
