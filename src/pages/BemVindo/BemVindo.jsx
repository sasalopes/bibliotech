import { Button, Container } from 'react-bootstrap';
import Quiz1 from "../../assets/images/quiz.png"
import { useNavigate } from "react-router-dom";

export function BemVindo() {
  const navigate = useNavigate();

  function entrarQuiz() {
    navigate("/quiz/perguntas");
  }

  return (
    <Container className="bg-light" style={{ backgroundColor: '#b0e8b4', maxWidth: '600px', margin: 'auto' }}>
      <div className="quiz my-5 text-center">
        <h2>Seja bem vindo(a) ao nosso quiz!</h2>
        <p><img src={Quiz1} alt="inicio-quiz" /></p>
        <p>Clique no botão abaixo para iniciar:</p>
        <Button className="btn btn-success" onClick={entrarQuiz}>Iniciar</Button>
      </div>
    </Container>
  );
}
