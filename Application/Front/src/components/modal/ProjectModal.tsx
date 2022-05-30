import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../../stores/mainStore";
import Modal from "./modal";
import "./ProjectModalStyle.sass";
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import Home from "../stepForm/stepform";
import Stepform from "../stepForm/stepform";

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

  const login_body = (
    <div className="input__body">
      <input placeholder="Телефон" type="text" className="phone__input" />
      <input placeholder="Пароль" type="password" className="password__input" />
    </div>
  );

  return (
    <Modal
      window_style="modalWindow"
      title="Вход"
      isOpen={isOpen}
      onClose={closeModal}
      body={Stepform()}
      footer={<></>}
    />
  );
};

export default observer(FirstLoginModal);
