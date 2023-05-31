import { Container, Spinner } from "react-bootstrap";

export function Loader() {
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Spinner variant="success"></Spinner>
            <span className="ms-1">só um momento...</span>
        </Container>
    )
}