import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../../../stores/mainStore";
import Modal from "../modal/modal";
import "./ProjectModal.sass";
import Chat from "../../chat/chat";

const ProjectModal = () => {
  const [isOpen, setOpen] = useState(false);
  const userStore = store.userStore;
  const projectStore = store.projectStore;

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (projectStore.ProjectModalIsOpen == true) {
      setOpen(true);
      projectStore.ProjectModalIsOpen = false;
    }
  }, [projectStore.ProjectModalIsOpen, isOpen]);

  return (
    <Modal
      window_style="ProjectModalWindow"
      title="Вход"
      isOpen={isOpen}
      onClose={closeModal}
      body={<Chat />}
      footer={<></>}
    />
  );
};

export default observer(ProjectModal);
