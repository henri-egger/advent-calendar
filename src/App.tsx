import { useState, useEffect, useMemo } from "react";
import Background from "./Background";
import logo from "./img/moosbauer-logo.png";
import Foreground from "./Foreground";
import Modal from "react-bootstrap/Modal";
import loadContentComponent from "./contentApi";

const App = () => {
    const [modalShow, setModalShow] = useState(false);
    const [contentComponent, setContentComponent] = useState<JSX.Element>();

    // const currentDay = useMemo(() => new Date(), []);
    const currentDay = useMemo(() => new Date(2022, 11, 3), []);

    // Async loading content component of current day into state of app component
    useEffect(() => {
        loadContentComponent(currentDay)
            .then((res) => setContentComponent(res))
            .catch((err) => console.error(err));
    }, [currentDay]);

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
                <div className="col pb-5">
                    <Foreground
                        modalShow={handleModalShow}
                        currentDay={currentDay}
                    />
                </div>
            </Background>

            <Modal
                show={modalShow}
                onHide={handleModalClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className="p-0">
                    <div className="row">{contentComponent}</div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default App;
