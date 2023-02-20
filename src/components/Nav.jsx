import React, { useState } from "react";

export const Nav = () => {
  const [navBar, setNavbar] = useState(false);

  const showNavBar = () => {
    if (window.scrollY >= 200) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", showNavBar);

  return (
    <div className={navBar ? "header active" : "header"}>
      <div className="wrapper">
        <ul className="nav">
          <li>Home</li>
          <li>Contact</li>
          <li>Text</li>
        </ul>
      </div>
    </div>
  );
};
