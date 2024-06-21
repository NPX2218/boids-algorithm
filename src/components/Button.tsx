/////////////////////////////////////
// IMPORTING LIBRARIES
/////////////////////////////////////

import React, { useRef } from "react";

/////////////////////////////////////
// INTERFACE: PROPS
/////////////////////////////////////

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  link?: string;
  className?: string;
}

/////////////////////////////////////
// FUNCTION: BUTTON
/////////////////////////////////////

const Button: React.FC<Props> = ({
  text,
  link,
  className,
  target,
  onClick,
  type,
  ...rest
}): JSX.Element => {
  const container = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={container}
      href={link}
      target={target}
      className={`cursor-pointer ${className ? className : ""}`}
      onClick={onClick}
      type={type}
      {...rest}
    >
      <div className=" items-center justify-center w-60 p-5 rounded-full flex flex-row   font-normal relative overflow-hidden">
        <div
          style={{}}
          className="background absolute inset-0  origin-top transform scaleY-0"
        ></div>
        <div className="text-md  md:text-md text z-2 flex justify-center items-center">
          {text}
        </div>
      </div>
    </a>
  );
};

/////////////////////////////////////
// EXPORTING BUTTON
/////////////////////////////////////

export default Button;
