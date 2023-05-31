import { Button, Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./PerfilUsuario.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getAuth, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../firebase/user";
import { toast } from "react-hot-toast";




export function PerfilUsuario() {
    const auth = getAuth();
    const user = auth.currentUser;
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        reset(user)
    }, []);


    function onSubmit(data) {
        updateUser(data).then(() => {
            toast.success("Informações editadas", { duration: 2000, position: "bottom-right" })
            navigate("/perfil/usuario")
        })
        .catch((error) => {
            toast.error(`Aconteceu um erro. Código:${error.code}`)
        })
    }

    function onDelete() {
        const deletar = window.confirm(`Tem certeza que deseja excluir o usuário ${user.displayName}?`);
        if (deletar){
            deleteUser(user).then(() => {

            })
            .catch((error) => {
                toast.error(`Aconteceu um erro. Código:${error.code}`)
            })
        }
    }

    return (
        <div className="center">
            <h1>Perfil de {user.displayName}</h1>
            <div className="area-usuario">
                <div className="foto-upload">
                    <img src="#" alt="upload+foto" />
                </div>
                <div className="linha-vertical"></div>
                <div className="form-larg">
                    <Container className="my-5">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email: </Form.Label>
                                <Form.Control type="text" {...register("email", { required: "O email é obrigatório", maxLength: 30 })} />
                                <Form.Text className="text-danger">
                                    {errors.email?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome: </Form.Label>
                                <Form.Control type="text" {...register("displayName", { required: "O nome é obrigatório", maxLength: 30 })} />
                                <Form.Text className="text-danger">
                                    {errors.nome?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Senha: </Form.Label>
                                <Form.Control type="text" {...register("senha", { required: "A senha é obrigatória", maxLength: 30 })} />
                                <Form.Text className="text-danger">
                                    {errors.senha?.message}
                                </Form.Text>
                            </Form.Group>
                            <div className="botoes">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Clique para editar</Tooltip>}>
                                    <Button type="submit" variant="success">Editar</Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Clique para editar</Tooltip>}>
                                    <Button type="button" onClick={() => {onDelete(user)}} className="ml-5" variant="danger">Deletar</Button>
                                </OverlayTrigger>
                            </div>
                        </Form>
                    </Container>
                </div>
            </div>
        </div >
    )
}