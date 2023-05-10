import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ModalComponent(props) {
    const { show, handleClose, handleSubmit, title, children } = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalComponent;