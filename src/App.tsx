import { useState, useEffect, useMemo } from "react";
import Background from "./Background";
import logo from "./assets/img/moosbauer-logo.png";
import Foreground from "./Foreground";
import Modal from "react-bootstrap/Modal";
import CookieConsent from "./cookieconsent/Cookieconsent";
import loadContentComponent from "./contentApi";
import { cookie } from "./cookieconsent/types";

const App = () => {
    const [cookie, setCookie] = useState<cookie>({});
    const [modalShow, setModalShow] = useState(false);
    const [contentComponent, setContentComponent] = useState<JSX.Element>();

    const currentDay = useMemo(() => new Date(), []);
    // const currentDay = useMemo(() => new Date(2022, 11, 3), []);

    // Async loading content component of current day into state of app component
    useEffect(() => {
        loadContentComponent(currentDay, cookie)
            .then((res) => setContentComponent(res))
            .catch((err) => console.error(err));
    }, [currentDay, cookie]);

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
                <footer className="col row justify-content-center pb-3 pb-sm-0">
                    <small className="col text-white text-center">
                        &copy; 2022 Henri Egger |&nbsp;
                        <a
                            className="text-white"
                            href="https://www.moosbauer.com/en/f/credits"
                            target="_blank"
                        >
                            Credits
                        </a>
                    </small>
                </footer>
            </Background>

            <Modal
                show={modalShow}
                onHide={handleModalClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="border-0">
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        aria-label="Close"
                        onClick={handleModalClose}
                    ></button>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="row px-3 px-sm-0">{contentComponent}</div>
                </Modal.Body>
            </Modal>

            <CookieConsent setCookie={setCookie} />
        </>
    );
};

export default App;
