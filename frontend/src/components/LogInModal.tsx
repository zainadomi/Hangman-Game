import { useForm } from "react-hook-form";
import * as NotesApi from "../network/api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./TextInputField";
import styleUtils from "../styles/utils.module.css";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_error";
import { LoginCredentials, LoginModalProps } from "./types";



const LogInModal = ({ onDismiss, onLoginSuccsessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {register,handleSubmit,formState: { errors, isSubmitting }} = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
   
    try {
      const response = await NotesApi.login(credentials);
      onLoginSuccsessful(response);

    } catch (error) {

      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      }

      else{
        alert(error);
      }

      console.error(error);
    }
  }
  return (


    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {errorText && 
        <Alert variant="danger">
          {errorText}
        </Alert>
        }
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholde="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />

          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholde="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}; 

export default LogInModal;
