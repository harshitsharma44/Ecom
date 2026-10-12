import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2026 &copy; MeHarshitSharma</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/harshit_123s">Instagram</a>
        <a href="https://youtube.com/@damnedits.4280?si=lB5Zp4OjHSBdwAyl">Youtube</a>
        <a href="https://x.com/Harshit75841871">X</a>
      </div>
    </footer>
  );
};

export default Footer;
