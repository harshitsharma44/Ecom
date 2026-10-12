import React from "react";
import "./Contact.css";
import { FaEnvelope, FaArrowRight } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contactContainer">
      <section className="contactContent">
        <p className="contactEyebrow">Get in touch</p>
        <h1>Let’s talk.</h1>
        <p className="contactDescription">
          Have a question about Ecomify or want to connect? Send me a note.
        </p>
        <a className="mailBtn" href="mailto:harshitsharma50169@gmail.com">
          <FaEnvelope aria-hidden="true" />
          <span>harshitsharma50169@gmail.com</span>
          <FaArrowRight className="mailBtnArrow" aria-hidden="true" />
        </a>
      </section>
    </div>
  );
};

export default Contact;
