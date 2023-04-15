import React from "react";
import "./productCard.css";
function ProductCard() {
  return (
    <div className="partnerPage">
      <h1 className="cardTitle">Postani dio FOODSPRINT-a</h1>
      <h2 className="cardTitle2">U nekoliko klikova pošalji prijavu online!</h2>
      <main className="page-content">
        <div className="card">
          <div className="content">
            <h2 className="title">Postani KURIR</h2>
            <p className="copy">
              Budi sam svoj gazda. Odlični prihodi i idealna prilika da upoznaš
              svoj grad kroz razne isporuke. Prijavi se i postani naš kurir za
              manje od 24hf
            </p>
            <button className="btn">Započni</button>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h2 className="title">Postani PARTNER</h2>
            <p className="copy">
              Budite dio e-commerce revolucije. Nastavite raditi ono u čemu ste
              najbolji, a nama prepustite dovođenje klijenata i dostavu na
              njihovu adresu.
            </p>
            <button className="btn">Započni</button>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h2 className="title">Postanio dio FoodSprint tima</h2>
            <p className="copy">
              Mi stvaramo nešto značajno za naše okruženje. Za to je potrebna
              motivacija, srčanost i puno timskog rada. Da li si spreman
              uskočiti?
            </p>
            <button className="btn">Započni</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductCard;
