import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../../../stores/mainStore";
import Modal from "../modal/modal";
import "./ProjectModal.sass";
import Chat from "../../chat/chat";

import { IProjectMeetings } from "../../../stores/projectStore";
import Meetings from "../../ProjectModal/meetings/Meetings";
import Info from "../../ProjectModal/info/info";

export interface ProjectModalI {
  project_id: number;
}

const ProjectModal = ({ project_id }: ProjectModalI) => {
  const [isOpen, setOpen] = useState(false);
  const userStore = store.userStore;
  const [activeButton, setActiveButton] = useState("info");
  const projectStore = store.projectStore;
  const project = projectStore.Projects.find(
    (project) => project.id == project_id
  );
  const [InProcess, setInProcess] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (projectStore.ProjectModalIsOpen == true) {
      setOpen(true);
      projectStore.ProjectModalIsOpen = false;
    }
  }, [projectStore.ProjectModalIsOpen, isOpen]);

  const projectSlides = (
    <>
      <div className="slides">
        <button
          onClick={(e) => {
            setActiveButton("info");
          }}
          className={
            "slide__tittle " + (activeButton == "info" ? "active" : "")
          }
        >
          {" "}
          Info{" "}
        </button>

        <button
          onClick={(e) => {
            setActiveButton("Checkpoints");
          }}
          className={
            "slide__tittle " + (activeButton == "Checkpoints" ? "active" : "")
          }
        >
          {" "}
          Checkpoints{" "}
        </button>

        <button
          onClick={(e) => {
            setActiveButton("Meetings");
          }}
          className={
            "slide__tittle " + (activeButton == "Meetings" ? "active" : "")
          }
        >
          {" "}
          Meetings{" "}
        </button>

        <button
          onClick={(e) => {
            setActiveButton("Telegram");
          }}
          className={
            "slide__tittle " + (activeButton == "Telegram" ? "active" : "")
          }
        >
          {" "}
          Telegram{" "}
        </button>

        <button
          onClick={(e) => {
            setActiveButton("Chat");
          }}
          className={
            "slide__tittle " + (activeButton == "Chat" ? "active" : "")
          }
        >
          {" "}
          Chat{" "}
        </button>
      </div>
    </>
  );

  const info = (
    <>
      <div className="project_info">
        <p> Info </p>
        <p>{project?.name}</p>
      </div>
    </>
  );

  const checkpoints = (
    <>
      <div className="checkpoints">
        <p> checkpoints </p>
      </div>
    </>
  );

  const telegram = (
    <>
      <div className="telegram">
        <p> telegram </p>
      </div>
    </>
  );

  const chat = (
    <>
      <div className="chat">
        <p> chat </p>
        <Chat />
      </div>
    </>
  );

  const body = (
    <>
      {activeButton == "info" ? <Info project_id={project_id} /> : null}
      {activeButton == "Checkpoints" ? checkpoints : null}
      {activeButton == "Meetings" ? <Meetings project_id={project_id} /> : null}
      {activeButton == "Telegram" ? telegram : null}
      {activeButton == "Chat" ? chat : null}
    </>
  );

  return (
    <Modal
      window_style="ProjectModalWindow"
      isOpen={isOpen}
      onClose={closeModal}
      body={body}
      footer={<></>}
      title={projectSlides}
    />
  );
};

export default observer(ProjectModal);
