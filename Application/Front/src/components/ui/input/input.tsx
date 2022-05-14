import "./input.sass";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";

interface inputvalues {
  id: string;
  svg: any;
  placeholderValue: string;
  inputType: string;
  padding: string;
  margin: string;
}

export const MyInput = ({
  id,
  svg,
  placeholderValue,
  inputType,
  padding = "0",
  margin = "15 15 0 0",
}: inputvalues) => {
  const style = {
    backgroundColor: `rgba(0,0,0,0)`,
    backgroundImage: `url(${svg})`,
    // or to use a fixed background image
    // backgroundImage: `url(/path/to/static/preview.png)`,
  };
  const labelstyle = {
    padding: padding,
    margin: margin,
  };

  return (
    <>
      <label style={labelstyle}>
        <input
          className="myinput"
          style={style}
          id={id}
          type={inputType}
          placeholder={placeholderValue}
        />
      </label>
    </>
  );
};

export default MyInput;
