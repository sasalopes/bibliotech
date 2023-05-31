import { useContext } from "react";
import { Button, Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-white.svg";
import facebookIcon from "../../assets/icons/facebook.png";
import githubIcon from "../../assets/icons/github.svg";

import loginImg from "../../assets/images/login.png";
import { PasswordField } from "../../components/PasswordField/PasswordField";
import { AuthContext } from "../../contexts/AuthContext";
import { loginGoogle, loginEmailSenha, loginFacebook, loginGithub } from "../../firebase/auth";
import { Footer } from "../../components/Footer/Footer";


export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, senha } = data;
    loginEmailSenha(email, senha)
      .then((user) => {
        toast.success(`Entrando como ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginGoogle() {
    loginGoogle()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginFacebook() {
loginFacebook()
.then((user) => {
  toast.success(`Bem-vindo(a) ${user.email}`, {
    position: "bottom-right",
    duration: 2500,
  });
  navigate("/");
}) 
.catch((erro) => {
  
  toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
    position: "bottom-right",
    duration: 2500,
  });
});

  }

  function onLoginGithub() {
    loginGithub()
    .then((user) => {
      toast.success(`Bem-vindo(a) ${user.email}`, {
        position: "bottom-right",
        duration: 2500,
      });
      navigate("/");
    }) 
    .catch((erro) => {
      
      toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
        position: "bottom-right",
        duration: 2500,
      });
    });
    
      }

  const usuarioLogado = useContext(AuthContext);

  // Se tiver dados no objeto, está logado
  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid className="my-5">
      <p className="text-center">
        <img src={loginImg} width="256" alt="Logo" />
      </p>
      <h4>Bem-vindo(a) de volta!</h4>
      <p className="text-muted">
        Não tem conta? <OverlayTrigger  placement="bottom" overlay={<Tooltip id="button-tooltip-2">Cadastre-se aqui</Tooltip>} >
<Link to="/cadastro">Cadastre-se</Link></OverlayTrigger>
      </p>
      <hr />
      <div class="d-flex">
  <button class="btn btn-danger mx-3 mb-3" onClick={onLoginGoogle}>
    <img src={googleIcon} width="32" alt="Ícone do Google" /> Entrar com o Google
  </button>
  <Button className="btn btn-primary mx-3 mb-3" onClick={onLoginFacebook}>
    <img src={facebookIcon} width="32" alt="Ícone do Facebook" /> Entrar com o Facebook
  </Button>
  <Button className="btn btn-dark mx-3 mb-3" onClick={onLoginGithub}>
    <img src={githubIcon} width="32" alt="Ícone do Github" /> Entrar com o Github
  </Button>
</div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Seu email"
            className={errors.email ? "is-invalid" : ""}
            {...register("email", { required: "Email é obrigatório" })}
          />
          <Form.Text className="invalid-feedback">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="senha">
          <Form.Label>Senha</Form.Label>
          {/* <Form.Control
            type="password"
            placeholder="Sua senha"
            className={errors.senha ? "is-invalid" : ""}
            {...register("senha", { required: "Senha é obrigatória" })}
          /> */}
          <PasswordField/>
          <Form.Text className="invalid-feedback">
            {errors.senha?.message}
          </Form.Text>
        </Form.Group>
        <OverlayTrigger  placement="bottom" overlay={<Tooltip id="button-tooltip-2">Clique para entrar</Tooltip>} >
        <Button type="submit" variant="success">
          Entrar
        </Button>
        </OverlayTrigger>
      </Form>
      <Footer/>
      </Container>

  
    
      
  );
  
  
}
