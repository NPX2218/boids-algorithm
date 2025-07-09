/////////////////////////////////////
// IMPORTING LIBRARIES
/////////////////////////////////////

import React from "react";
import { themeColor } from "../../theme";

/////////////////////////////////////
// COMPONENT: FOOTER
/////////////////////////////////////

const Footer = (): JSX.Element => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <div
          style={{ backgroundColor: themeColor }}
          className={`dm-sans-normal self-stretch mt-32 w-full  min-h-[1px] max-md:mt-10 max-md:max-w-full`}
        ></div>
        <div className="self-start mt-11 ml-16 text-base font-semibold tracking-tight leading-9 text-white max-md:mt-10 max-md:max-w-full">
          Made by <span style={{ color: themeColor }}>Neel Bansal</span>{" "}
          <a href="#/bibliographies">— Copyright {new Date().getFullYear()}</a>
        </div>
      </div>
    </div>
  );
};

/////////////////////////////////////
// EXPORTING FOOTER
/////////////////////////////////////

export default Footer;
