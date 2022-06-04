import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../../../stores/mainStore";
import Modal from "../modal/modal";
import "./CreationModalStyle.sass";
import Stepform from "../../stepForm/stepform";

export const CreationModal = () => {
  const [isOpen, setOpen] = useState(false);
  const projectStore = store.projectStore;
  //  which one modal are open

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (projectStore.CreationModalIsOpen == true) {
      setOpen(true);
      projectStore.CreationModalIsOpen = false;
    }
  }, [projectStore.CreationModalIsOpen, isOpen]);

  return (
    <Modal
      window_style="CreationProjectModalWindow"
      title=""
      isOpen={isOpen}
      onClose={closeModal}
      body={Stepform()}
      footer={<></>}
    />
  );
};

export default observer(CreationModal);
