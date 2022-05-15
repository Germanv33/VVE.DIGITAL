import "./input.sass";
import React, { ChangeEvent, ChangeEventHandler, FC } from "react";
import { NavLink } from "react-router-dom";

interface inputvalues {
  value: string | number | readonly string[] | undefined;
  id: string;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
  svg: any;
  placeholderValue: string;
  inputType: string;
  padding: string;
  margin: string;
}

export const MyInput = ({
  id,
  svg,
  value,
  onChange,
  onBlur,
  className,
  placeholderValue,
  inputType,
  padding = "0",
  margin,
}: inputvalues) => {
  const style = {
    backgroundColor: `rgba(0,0,0,0)`,
    backgroundImage: `url(${svg})`,
    margin: margin,
    // or to use a fixed background image
    // backgroundImage: `url(/path/to/static/preview.png)`,
  };
  const labelstyle = {
    padding: padding,
  };

  return (
    <>
      <label style={labelstyle}>
        <input
          //   autoComplete="off"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          className={className + " myinput"}
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
