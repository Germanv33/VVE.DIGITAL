import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../../../stores/mainStore";
import Modal from "./../modal/modal";
import "./InfoModal.sass";

export const InfoModal = () => {
  const [isOpen, setOpen] = useState(false);
  const userStore = store.userStore;

  const closeModal = () => {
    setOpen(false);
  };
  const message = <h2 className="InfoMessage"> {userStore.Modalinfo} </h2>;
  useEffect(() => {
    if (userStore.userModalisOpen == true) {
      setOpen(true);
      userStore.userModalisOpen = false;
    }
  }, [userStore.userModalisOpen, isOpen]);

  return (
    <Modal
      window_style="InfoModalWindow"
      title="Вход"
      isOpen={isOpen}
      onClose={closeModal}
      body={message}
      footer={<></>}
    />
  );
};

export default observer(InfoModal);
