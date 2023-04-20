import "./appBanner.css";

function AppBanner() {
  return (
    <div className="appBanner">
      <div className="appBannerLijevo">
        <img
          className="appBannerImg"
          src={require("./slike/appBannerMockup.png")}
          alt=""
          width={"620px"}
        />
      </div>
      <div className="appBannerDesno">
        <h1 className="appBannerTitle">Preuzmite našu aplikaciju!</h1>
        <p className="appBannerTekst">
          Ako želite koristiti FoodSprint aplikaciju za naručivanje hrane iz
          svojih omiljenih restorana, jednostavno morate posjetiti naš web sajt
          i preuzeti aplikaciju. Aplikacija je besplatna i dostupna je na web
          stranici. Nakon preuzimanja aplikacije, možete se registrirati ili
          prijaviti sa postojećim računom.
        </p>
        <div className="appBannerBtn">
          <div className="qrBtn">
            <div className="flex social-btns">
              <a className="app-btn blu flex vert" href="http:apple.com">
                <img src={require("./slike/apple.png")} alt="" />
                <p>
                  GET IT ON <br /> <span className="big-txt">App Store</span>
                </p>
              </a>

              <a className="app-btn blu flex vert" href="http:google.com">
                <img src={require("./slike/gplay.png")} alt="" />
                <p>
                  Get it on <br /> <span className="big-txt">Google Play</span>
                </p>
              </a>
            </div>
            <img className="qrCode" src={require("./slike/qr-code.png")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppBanner;
