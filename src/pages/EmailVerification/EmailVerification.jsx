import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { firebaseError } from '../../firebase/firebaseError';
import { Button } from 'react-bootstrap';




export function EmailVerification () {
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          window.location.href = "http://localhost:3000/";
          
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        toast.success(`Verifique seu email para saber se sua conta foi confirmada: ${auth.actionCode.email}`, {
          position: "bottom-right",
          duration: 3000,
        });
        
      })
      .catch((erro) => {
        toast.error(`Error.  ${firebaseError(erro.code)}`, {
          position: "bottom-right",
          duration: 3000,
        });
      });
  }

  return (
    <div className='confirmacao' style={{ textAlign: 'center' }} >
      <section>
      
      <h2 style={{color: 'black', fontSize: '22px',  marginTop: '15px'}} className='conclusao'>Conclusão de cadastro após confirmação de email:</h2>

      <Button style={{backgroundColor: ' white;', color: 'rgb(189, 13, 13);' , display: 'inline-block', margin: '15px'}} variant="success" size="lg" onClick={handleSendEmailVerification}>
            Enviar e-mail de confirmação
      </Button>
      
        <h5 style={{color: 'black', fontSize: '22px',  marginBottom: '15px'}}className='mensagem-final'>Ao enviar a confirmação de email, verifique sua caixa de entrada e não esqueça de atualizar a página para efetuar o login. </h5>

        </section>

    </div>
  );
}

