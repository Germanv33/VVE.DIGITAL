import "./checkbox.sass";
import React, { ChangeEventHandler, FC, FunctionComponent } from "react";
import { Field, FieldProps } from "formik";

export interface ItemProps {
  name: string;
  id: string;
  //   onChanges: ChangeEventHandler<HTMLInputElement>;
  label_title: string;
}

// export const MyCheckbox: FunctionComponent<ItemProps> = ({
//   name,
//   id,
//   onChanges,
//   label_title,
// }) => {
//   return (
//     <Field name={name}>
//       <div className="checkbox">
//         <input
//           type="checkbox"
//           name={name}
//           id={id}
//           className="filter__checkbox"
//           onChange={onChanges}
//         />

//         <label htmlFor={id}>{label_title}</label>
//       </div>
//     </Field>
//   );
// };

export const MyCheckbox = ({
  name,
  id,
  //   onChanges,
  label_title,
}: ItemProps): JSX.Element => (
  <Field
    name={name}
    render={({ field }: FieldProps) => (
      <div className="checkbox">
        <input
          {...field}
          type="checkbox"
          name={name}
          id={id}
          className="filter__checkbox"
          //   onChange={onChanges}
          checked={field.value}
        />

        <label htmlFor={id}>{label_title}</label>
      </div>
    )}
  />
);
