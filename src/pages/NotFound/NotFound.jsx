import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import notFoundImage from '../../assets/images/notfoundimage.jpeg';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./NotFound.css"


const NotFound = () => {
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

       return (
      <div className="not_found">
      <h1>404 - Página não encontrada</h1>
      <img src={notFoundImage} alt="Imagem de página não encontrada" />

      <div className="button">

      <Button variant="green" href="/">Voltar</Button>
      <Button variant="green" href="/login">Login</Button>
      <Button variant="dark" onClick={openModal}>Reportar </Button>
      </div>

      <Modal show={show} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Reportar Erro</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form>
          <Form.Group
                className="mb-3"
                controlId="textarea"
              >
                <Form.Label>Descreva o erro:</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>

            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={closeModal}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
    
      </div>

    );
}

export default NotFound;