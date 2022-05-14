import "./checkbox.sass";
import React, { ChangeEventHandler, FC, FunctionComponent } from "react";

export interface ItemProps {
  name: string;
  id: string;
  onChanges: ChangeEventHandler<HTMLInputElement>;
  label_title: string;
}

export const MyCheckbox: FunctionComponent<ItemProps> = ({
  name,
  id,
  onChanges,
  label_title,
}) => {
  return (
    <>
      <div className="checkbox">
        <input
          type="checkbox"
          name={name}
          id={id}
          className="filter__checkbox"
          onChange={onChanges}
        />

        <label htmlFor={id}>{label_title}</label>
      </div>
    </>
  );
};
