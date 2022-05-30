import "./checkbox_card.sass";
import React, { ChangeEventHandler, FC, FunctionComponent } from "react";

import { useField, Form, FormikProps, Formik, FieldProps, Field } from "formik";
import { Link } from "react-router-dom";

export interface ItemProps {
  name: string;
  id: string;
  onChanges: ChangeEventHandler<HTMLInputElement>;
  onCheck: boolean;
  team_name: string;
  team_id: number;
}

// export const MyCheckboxCard = ({ field }: FieldProps) => {
//   return (
//     <article className="feature1">
//       <input
//         type="checkbox"
//         {...field}
//         className="filter__checkbox"
//         //   onChange={onChanges}
//         checked={field.value}
//         onChange={field.onChange}
//       />
//       <div>
//         <span>
//           dev team card
//           <br />
//         </span>
//       </div>
//     </article>
//   );
// };

// export const MyCheckboxCard = ({ field }: FieldProps) => {
//     return (
//       <article className="feature1">
//         <input
//           type="checkbox"
//           {...field}
//           className="filter__checkbox"
//           //   onChange={onChanges}
//           checked={field.value}
//           onChange={field.onChange}
//         />
//         <div>
//           <span>
//             dev team card
//             <br />
//           </span>
//         </div>
//       </article>
//     );
//   };

export const MyCheckboxCard = ({
  name,
  id,
  onCheck,
  team_name,
  onChanges,
  team_id,
}: //   onChanges,
ItemProps): JSX.Element => (
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
        {team_name}
        <br />
      </span>
    </div>
    <Link to={`devs/ ${team_id}`} target="_blank">
      <a>watch</a>
    </Link>
  </article>
);
