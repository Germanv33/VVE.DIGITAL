import "./animText.sass";
import React, {
  ChangeEventHandler,
  FC,
  FunctionComponent,
  useEffect,
} from "react";
import { Field, FieldProps } from "formik";
import Letterize from "letterizejs";
import anime from "animejs";

export const AnimText: FC = () => {
  useEffect(() => {
    const test = new Letterize({
      targets: ".animate-me",
    });

    const animation = anime.timeline({
      targets: test.listAll,
      delay: anime.stagger(100, {
        grid: [test.list[0].length, test.list.length],
        from: "center",
      }),
      loop: true,
    });

    animation
      .add({ scale: 0.5 })
      .add({ letterSpacing: "10px" })
      .add({ scale: 1 })
      .add({ letterSpacing: "6px" });
  });

  return (
    <>
      <div>
        <div className="animate-me">vve.digital vve</div>
        <div className="animate-me">vve.digital vve</div>
        <div className="animate-me">vve.digital vve</div>
        <div className="animate-me">vve.digital vve</div>
        <div className="animate-me">vve.digital vve</div>
        <div className="animate-me">vve.digital vve</div>
      </div>
    </>
  );
};
