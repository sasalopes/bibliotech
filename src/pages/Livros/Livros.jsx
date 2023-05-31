import { useEffect, useState } from "react";
import { Button, Container, OverlayTrigger, Table, Tooltip, Badge, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ModalLivro } from "../../components/ModalLivro/ModalLivro";

export function Livros() {

    const [livros, setLivros] = useState(null);
    const [show, setShow] = useState(false);
    const [livroSelecionado, setLivroSelecionado] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [livroDestacado, setlivroDestacado] = useState({ titulo: "", url: "" }); 


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const resultado = useContext(ThemeContext);
    const temaEscuro = resultado.temaEscuro;

    useEffect(() => {
        initializeTable();
    }, []);

    function handleShowModalLivro(titulo, url) { 
        setModalShow(true); 
        setlivroDestacado({ titulo, url });
    }


    function initializeTable() {
        getLivros().then(resultados => {
            setLivros(resultados)
        })
    }

    function onDeleteLivro(id, titulo) {
        const deletar = window.confirm(`Tem certeza que deseja excluir o livro ${titulo}?`);
        if (deletar) {
            deleteLivro(id).then(() => {
                toast.success(`${titulo} apagado com sucesso!`, { duration: 2000, position: "bottom-right" });
                initializeTable();
            })
        }
    }

    return (
        <div className={`${temaEscuro ? "bg-dark text-light" : "bg-light text-dark"} livros`}>
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Livros</h1>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Clique para adicionar</Tooltip>}>
                        <Button as={Link} to="/livros/adicionar" variant={temaEscuro ? "dark" : "success"}>
                            Adicionar Livro
                        </Button>
                    </OverlayTrigger>
                </div>
                <hr />
                {livros === null ?
                    <Loader />
                    :
                    <div>
                        <Table striped bordered hover className={temaEscuro ? "table table-dark" : ""}>
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Autor</th>
                                    <th>Categorias</th>
                                    <th>ISBN</th>
                                    <th>Imagem</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {livros.map((livro) => {
                                    return (
                                        <tr key={livro.id}>
                                            <td>{livro.titulo}</td>
                                            <td>{livro.autor}</td>
                                            <td style={{ maxWidth: "250px" }}>
                                                {livro.categorias.map(categoria => {
                                                    return <Badge bg="success" className="me-1" key={categoria}>{categoria}</Badge>
                                                })}
                                            </td>
                                            <td>{livro.isbn}</td>
                                            <td>
                                                <img
                                                    src={livro.urlCapa}
                                                    alt={livro.titulo}
                                                    onClick={() => handleShowModalLivro(livro.titulo, livro.urlCapa)} 
                                                />
                                            </td>
                                            <td>
                                                <div className="botoes">
                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Clique para editar</Tooltip>}>
                                                        <Button
                                                            as={Link}
                                                            to={`/livros/editar/${livro.id}`}
                                                            variant="warning"
                                                            size="sm"
                                                            className="me-2"
                                                        >
                                                            <i className="bi bi-pencil-fill"></i>
                                                        </Button>
                                                    </OverlayTrigger>

                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Clique para excluir</Tooltip>}>
                                                        <Button size="sm" variant="danger" onClick={() => onDeleteLivro(livro.id, livro.titulo)}>
                                                            <i className="bi bi-trash3-fill"></i>
                                                        </Button>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Clique para saber as informações</Tooltip>}>
                                                        <Button
                                                            size="sm"
                                                            variant="success"
                                                            onClick={() => { setLivroSelecionado(livro); handleShow(); }}
                                                            className="mx-2"
                                                        >
                                                            <i class="bi bi-info-circle-fill"></i>
                                                        </Button>
                                                    </OverlayTrigger>
                                                </div>

                                                <Modal show={show} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>{livroSelecionado?.titulo}</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <ul>
                                                            <li><b>Livro</b>: {livroSelecionado?.titulo}</li>
                                                            <li><b>Categoria: </b> {livroSelecionado?.categoria}</li>
                                                            <li><b>Autor: </b> {livroSelecionado?.autor}</li>
                                                        </ul>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                        </Button>

                                                    </Modal.Footer>
                                                </Modal>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <ModalLivro 
                            show={modalShow}
                            onHide={() => setModalShow(false)} 
                            titulo={livroDestacado.titulo}
                            url={livroDestacado.url}
                        />
                    </div>
                }

            </Container>
        </div>
    )
}