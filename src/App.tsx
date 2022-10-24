import { useState, useEffect } from "react";
import Background from "./Background";
import logo from "./img/moosbauer-logo.png";
import Foreground from "./Foreground";
import Modal from "react-bootstrap/Modal";
import loadContentComponent from "./contentApi";

const App = () => {
    const [modalShow, setModalShow] = useState(false);
    const [contentComponent, setContentComponent] = useState<JSX.Element>();

    const currentDay = new Date();

    useEffect(() => {
        loadContentComponent(currentDay)
            .then((res) => setContentComponent(res))
            .catch((err) => console.error(err));
    }, []);

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);

    return (
        <>
            <Background>
                <img
                    className="col-6 col-md-4 col-lg-3 py-4"
                    src={logo}
                    alt="logo"
                ></img>
                <div className="col">
                    <Foreground
                        modalShow={handleModalShow}
                        currentDay={currentDay}
                    />
                </div>
            </Background>

            <Modal show={modalShow} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Window {contentComponent?.props.index}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                    {contentComponent}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default App;
