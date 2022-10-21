import React, { useState } from "react";
import Background from "./Background";
import logo from "./img/moosbauer-logo.png";
import Foreground from "./Foreground";
import Modal from "react-bootstrap/Modal";
import { modalContent } from "./types";

const App = () => {
    const [modalShow, setModalShow] = useState(false);
    const modalContent: modalContent = {
        content: null,
        type: null,
        index: null,
    }

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = (loadedContent: modalContent) => {
        setModalShow(true);
        modalContent.content = loadedContent.content;
        modalContent.type = loadedContent.type;
        modalContent.index = loadedContent.index;
    };

    return (
        <>
            <Background>
                <img
                    className="col-6 col-md-4 col-lg-3 py-4"
                    src={logo}
                    alt="logo"
                ></img>
                <div className="col">
                    <Foreground modalShow={handleModalShow} />
                </div>
            </Background>

            <Modal show={modalShow} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Window {modalContent.index}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                </Modal.Body>
            </Modal>
        </>
    );
};

export default App;
