import "./checkboxCreationCards.sass";
import React, { ChangeEventHandler, FC, FunctionComponent } from "react";

import { useField, Form, FormikProps, Formik, FieldProps, Field } from "formik";
import { Link } from "react-router-dom";

export interface TechProps {
  name: string;
  id: string;
  onChanges: ChangeEventHandler<HTMLInputElement>;
  onCheck: boolean;
  title: string;
}

export const MyCreationCard = ({
  name,
  id,
  onCheck,
  title,
  onChanges,
}: //   onChanges,
TechProps): JSX.Element => (
  <article className="feature1">
    <input
      type="checkbox"
      name={name}
      id={id}
      className="filter__checkbox"
      //   onChange={onChanges}
      checked={onCheck}
      onChange={onChanges}
    />
    <div>
      <span>
        {title}
        <br />
      </span>
    </div>
  </article>
);
