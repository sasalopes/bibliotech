import { Button, Form } from "react-bootstrap";
import {useState} from "react";
import "./PasswordField.css";

export function PasswordField(props) {

    const [visible, setVisible] = useState(false);

    const visibleIcon = <i class="bi bi-eye"></i>;
    const invisibleIcon =<i class="bi bi-eye-slash"></i>


  return (
    <div className="password-field">
      <Form.Control className="password-field" type={visible ? "text" : "password"} {...props} />
        <Button onClick={()=>setVisible(!visible)} className="eye-btn" variant="light">
            {visible ? visibleIcon : invisibleIcon}

        </Button>
      
    </div>
  );
}
