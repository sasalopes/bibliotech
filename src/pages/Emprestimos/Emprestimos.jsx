import { useEffect, useState } from "react";
import { Badge, Button, Container, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEmprestimos } from "../../firebase/emprestimos";
import { Loader } from "../../components/Loader/Loader";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export function Emprestimos() {

    const [emprestimos, setEmprestimos] = useState(null);

    const resultado = useContext(ThemeContext);
    const temaEscuro = resultado.temaEscuro;

    useEffect(() => {
        getEmprestimos().then(busca => {
            setEmprestimos(busca);
        })
    }, [])

    return (
        <div className={`${temaEscuro ? "bg-dark text-light" : "bg-light text-dark"} emprestimos`}>
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Emprestimos</h1>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Clique para adicionar</Tooltip>}>
                        <Button as={Link} to="/emprestimos/adicionar" variant={temaEscuro ? "dark" : "success"}>Adicionar emprestimo</Button>
                    </OverlayTrigger>
                </div>
                <hr />
                {
                    emprestimos === null ?
                        <Loader />
                        :
                        <Table striped bordered hover className={temaEscuro ? "table table-dark" : ""}>
                            <thead>
                                <tr>
                                    <th>Leitor</th>
                                    <th>E-mail</th>
                                    <th>Telefone</th>
                                    <th>Livro</th>
                                    <th>Status</th>
                                    <th>Data de Empréstimo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {emprestimos.map(emprestimo => {
                                    const dataEmprestimo = emprestimo.dataEmprestimo.toDate().toLocaleDateString('pt-br');
                                    return (
                                        <tr key={emprestimo.id}>
                                            <td>{emprestimo.leitor}</td>
                                            <td>{emprestimo.email}</td>
                                            <td>{emprestimo.telefone}</td>
                                            <td>{emprestimo.livro.titulo}</td>
                                            <td>
                                                <Badge bg={emprestimo.status === "Pendente" ? "warning" : "success"}>{emprestimo.status}</Badge>
                                            </td>
                                            <td>{dataEmprestimo}</td>
                                            <td>
                                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Clique para editar</Tooltip>}>
                                                    <Button
                                                        as={Link}
                                                        to={`/emprestimos/editar/${emprestimo.id}`}
                                                        variant="warning"
                                                        size="sm"
                                                    >
                                                        <i className="bi bi-pencil-fill"></i>
                                                    </Button>
                                                </OverlayTrigger>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                }

            </Container>
        </div>
    )
}