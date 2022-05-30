import React, { FunctionComponent } from "react";
import Portal from "../portal/portal";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import store from "../../stores/mainStore";
import { CSSTransition } from "react-transition-group";

import "./modal.sass";

export interface ModalProps {
  window_style: string;
  isOpen: boolean;
  onClose: () => void;
  body: JSX.Element;
  footer: JSX.Element;
  title: string;
}

export const Modal: FunctionComponent<ModalProps> = ({
  window_style,
  isOpen,
  onClose,
  body,
  footer,
  title,
}) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <div className="modalOverlay">
            <div className={window_style}>
              <div className="modalHeader">
                <div className="modalTitle"></div>

                <svg
                  onClick={onClose}
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.7071 1.70711C18.0976 1.31658 18.0976 0.683417 17.7071 0.292893C17.3166 -0.0976311 16.6834 -0.097631 16.2929 0.292893L9 7.58579L1.70711 0.292893C1.31658 -0.097631 0.683417 -0.097631 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L7.58579 9L0.292894 16.2929C-0.0976301 16.6834 -0.0976301 17.3166 0.292894 17.7071C0.683419 18.0976 1.31658 18.0976 1.70711 17.7071L9 10.4142L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L10.4142 9L17.7071 1.70711Z"
                    fill="#873AA9"
                    fill-opacity="0.72"
                  />
                </svg>
              </div>

              <div className="modalBody">{body}</div>
              {/* <div className="modalFooter">{footer}</div> */}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default observer(Modal);
