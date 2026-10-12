import React from "react";
import "./aboutSection.css";
import { Typography, Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import profilePlaceholder from "../../../images/Profile.png";

const About = () => {
  const { user } = useSelector((state) => state.user);
  const portrait = user && user.avatar && user.avatar.url
    ? user.avatar.url
    : profilePlaceholder;

  return (
    <div className="aboutSection">
      <div className="aboutSectionContainer">
        <div className="aboutSectionIntro">
          <Typography component="p" className="aboutEyebrow">
            The person behind Ecomify
          </Typography>
          <Typography component="h1">About me</Typography>
          <Typography component="p" className="aboutDescription">
            I’m Harshit Sharma, the creator of Ecomify. This project brings
            together my interest in full-stack development and thoughtful
            online shopping.
          </Typography>
        </div>

        <div className="aboutSectionContent">
          <div className="founderProfile">
            <Avatar
              className="founderPortrait"
              src={portrait}
              alt="Harshit Sharma"
            />
            <Typography component="h2">Harshit Sharma</Typography>
            <Typography component="p">Creator &amp; developer</Typography>
          </div>

          <div className="aboutSocials">
            <Typography component="h2">Find me online</Typography>
            <a
              href="https://www.youtube.com/@harshitsharma716"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube aria-hidden="true" />
              <span>YouTube</span>
            </a>
            <a
              href="https://www.instagram.com/harshit_123s/?__pwa=1#"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram aria-hidden="true" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/in/harshit-sharma-9299402ab/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
