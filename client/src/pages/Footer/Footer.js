import React from "react";
import Layout from "../../components/Layout/Layout";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer_wrapper">
      <div className="footer_container f_container">
        <div className="nav_footer">
          <ul className="nav_footer_list">
            <li>
              <a href="#"> HOME </a>
            </li>
          </ul>
          <ul className="social_media_icon">
            <li className="meida_icon">
              <a
                href="https://www.facebook.com/Zaw-Financial-Solutions-109955530749240"
                target="_blank"
              >
                <i
                  class="facebook square icon"
                  aria-label="https://www.facebook.com/Zaw-Financial-Solutions-109955530749240 (Open in a new window)"
                ></i>
              </a>
            </li>
          </ul>
        </div>

        <section className="section_devider"></section>

        <div className="copy_right">
          <p className="msg_left">
            Zaw Finances <span> &copy; </span>
            2021
          </p>
        </div>
      </div>
      {/* footer area end */}
      {/* <div className="notification"></div> */}
    </div>
  );
};
export default Footer;
