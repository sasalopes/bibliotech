import { Button, Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addLivro, uploadCapaLivro } from "../../firebase/livros";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export function AdicionarLivro() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const resultado = useContext(ThemeContext);
    const temaEscuro = resultado.temaEscuro;

    function onSubmit(data) {
        const imagem = data.imagem[0];
        if (imagem) {
            const toastId = toast.loading("Upload da imagem...", { position: "top-right" });
            uploadCapaLivro(imagem).then(url => {
                toast.dismiss(toastId);
                data.urlCapa = url;
                delete data.imagem;
                addLivro(data).then(() => {
                    toast.success("Livro adicionado com sucesso!", { duration: 2000, position: "bottom-right" })
                    navigate("/livros");
                })
            })
        }
        else {
            delete data.imagem;
            addLivro(data).then(() => {
                toast.success("Livro adicionado com sucesso!", { duration: 2000, position: "bottom-right" })
                navigate("/livros");
            })
        }
    }

    return (
        <div className={`${temaEscuro ? "bg-dark text-light" : "bg-light text-dark"} adicionar-livro`}>
            <Container>
                <h1>Adicionar livro</h1>
                <hr />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" className={errors.titulo && "is-invalid"} {...register("titulo", { required: "Título é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                        <Form.Text className="text-danger">
                            {errors.titulo?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control type="text" className={errors.autor && "is-invalid"} {...register("autor", { required: "Autor é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                        <Form.Text className="text-danger">
                            {errors.autor?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Label>Categorias</Form.Label>
                    <Form.Group className="mb-3" controlId="computacao">
                        <Form.Check type="checkbox" label="Computação" name={"categorias"} value={"Computação"} {...register("categorias")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="educacao">
                        <Form.Check type="checkbox" label="Educação" name={"categorias"} value={"Educação"} {...register("categorias")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fantasia">
                        <Form.Check type="checkbox" label="Fantasia" name={"categorias"} value={"Fantasia"} {...register("categorias")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="horror">
                        <Form.Check type="checkbox" label="Horror" name={"categorias"} value={"Horror"} {...register("categorias")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ficcaoCientifica">
                        <Form.Check type="checkbox" label="Ficção Científica" name={"categorias"} value={"Ficção Científica"} {...register("categorias")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="suspense">
                        <Form.Check type="checkbox" label="Suspense" name={"categorias"} value={"Suspense"} {...register("categorias")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="romance">
                        <Form.Check type="checkbox" label="Romance" name={"categorias"} value={"Romance"} {...register("categorias")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="text" className={errors.isbn && "is-invalid"} {...register("isbn", { required: "ISBN é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                        <Form.Text className="text-danger">
                            {errors.isbn?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Imagem da capa</Form.Label>
                        <Form.Control type="file" accept=".png,.jpg,.jpeg,.gif" {...register("imagem")} />
                    </Form.Group>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Clique para adicionar</Tooltip>}>
                        <Button type="submit" variant="success">Adicionar</Button>
                    </OverlayTrigger>
                </Form>
            </Container>
        </div>
    )
}