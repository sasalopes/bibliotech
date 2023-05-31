import Modal from 'react-bootstrap/Modal';
import './ModalLivro.css';

export function ModalLivro ({show, titulo, url, onHide}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // animation={false}
      
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img className="ImgModal" src={url} alt={titulo} />
      </Modal.Body>
      
    </Modal>
  );
}
