import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../../stores/mainStore";
import Modal from "./modal";
import "./ProjectModalStyle.sass";
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";

export const FirstLoginModal = () => {
  const [isOpen, setOpen] = useState(false);
  const projectStore = store.projectStore;
  //  which one modal are open

  const closeModal = () => {
    setOpen(false);
  };

  //   const openSms = () => {
  //     setSmsOpen(true);
  //   };

  useEffect(() => {
    if (projectStore.ModalIsOpen == true) {
      setOpen(true);
      projectStore.ModalIsOpen = false;
    }
  }, [projectStore.ModalIsOpen, isOpen]);

  const Reg_validate = Yup.object({
    company_name: Yup.string()
      .min(3, "company_name must be at least 3 charaters")
      .required("company_name is required"),

    phone: Yup.string()
      .min(9, "Phone number must be at least 9 charaters")
      .required("Phone number is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const login_body = (
    <div className="input__body">
      <input placeholder="Телефон" type="text" className="phone__input" />
      <input placeholder="Пароль" type="password" className="password__input" />
    </div>
  );

  const login_footer = (
    <div className="buttons_footer">
      <button className="button__signin">
        <span className="button__text__signin">Войти</span>
      </button>
      <div className="nets">
        <a href="" className="green_a">
          Войти с помощью смс
        </a>
      </div>
      <button className="button__partner">
        <span className="button__text__partner">Вход для партнёров</span>
      </button>
    </div>
  );

  return (
    <Modal
      window_style="modalWindow"
      title="Вход"
      isOpen={isOpen}
      onClose={closeModal}
      body={login_body}
      footer={login_footer}
    />
  );
};

export default observer(FirstLoginModal);
