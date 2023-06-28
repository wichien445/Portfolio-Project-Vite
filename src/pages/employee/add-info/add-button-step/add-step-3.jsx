import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  ButtonToolbar,
  Form,
  SelectPicker,
  Message,
  toaster,
  Schema,
  RadioGroup,
  Radio,
  Row,
  Col,
  Stack,
  Divider,
} from "rsuite";
import token from "../../../../token-apiurl/token";

const apiLanguage = "https://portfolio.blackphoenix.digital/getLanguage";

/* const data = ["ไทย", "อังกฤษ", "จีน"].map((item) => ({
  label: item,
  value: item,
})); */

const Field = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group
      controlId={''}
      ref={ref}
      className={error ? "has-error" : ""}
    >
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control
        name={name}
        accepter={accepter}
        errorMessage={error}
        {...rest}
      />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});

const Radios = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group
      controlId={``}
      ref={ref}
      className={error ? "has-error" : ""}
    >
      <Stack divider={<Divider vertical />}>
        <Form.ControlLabel>{label} </Form.ControlLabel>

        <Form.Control
          name={name}
          accepter={accepter}
          errorMessage={error}
          {...rest}
        />
      </Stack>

      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  language: NumberType().isRequired("กรุณาเลือกทักษะภาษา"),
  listening: StringType().isRequired("กรุณาเลือกระดับการฟัง"),
  reading: StringType().isRequired("กรุณาเลือกระดับการอ่าน"),
  writing: StringType().isRequired("กรุณาเลือกระดับการเขียน"),
  speaking: StringType().isRequired("กรุณาเลือกระดับการพูด"),
});

function AddStep3() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editLanguage, setEditLanguage] = useState([]);
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    language: "",
    listening: "",
    reading: "",
    writing: "",
    speaking: "",
  });

   //GET Language
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiLanguage, { headers })
      .then((response) => response.json())
      .then((data) => setEditLanguage(data));
  }, []);
  //  console.log("edit Language:", editLanguage)

  const data = editLanguage.map((item) => ({
    label: item.language_name,
    value: item.language_id,
  }));

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      toaster.push(<Message type="error">Error</Message>);
      return;
    }
    toaster.push(<Message type="success">Success</Message>);
  };
  return (
    <>
      <ButtonToolbar>
        <Button className="ButtonAdd" appearance="primary" onClick={handleOpen}>
          {" "}
          Add
        </Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Language Skills</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            ref={formRef}
            onChange={setFormValue}
            onCheck={setFormError}
            formValue={formValue}
            model={model}
          >
            <Row>
              <Col>
                <Field
                  name="language"
                  label="Language:"
                  accepter={SelectPicker}
                  error={formError.language}
                  style={{ display: "inline-block", width: 300 }}
                  data={data}
                />

                <Radios
                  name="listening"
                  label="Listening:"
                  accepter={RadioGroup}
                  error={formError.listening}
                  inline
                >
                  <Radio value={"Very Good"}>Very Good</Radio>
                  <Radio value={"Good"}>Good</Radio>
                  <Radio value={"Fair"}>Fair</Radio>
                  <Radio value={"Poor"}> Poor </Radio>
                </Radios>

                <Radios
                  name="speaking"
                  label="Speaking:"
                  accepter={RadioGroup}
                  error={formError.speaking}
                  inline
                >
                  <Radio value={"Very Good"}>Very Good</Radio>
                  <Radio value={"Good"}>Good</Radio>
                  <Radio value={"Fair"}>Fair</Radio>
                  <Radio value={"Poor"}> Poor </Radio>
                </Radios>

                <Radios
                  name="reading"
                  label="Reading:"
                  accepter={RadioGroup}
                  error={formError.reading}
                  inline
                >
                  <Radio value={"Very Good"}>Very Good</Radio>
                  <Radio value={"Good"}>Good</Radio>
                  <Radio value={"Fair"}>Fair</Radio>
                  <Radio value={"Poor"}> Poor </Radio>
                </Radios>

                <Radios
                  name="writing"
                  label="Writing:"
                  accepter={RadioGroup}
                  error={formError.writing}
                  inline
                >
                  <Radio value={"Very Good"}>Very Good</Radio>
                  <Radio value={"Good"}>Good</Radio>
                  <Radio value={"Fair"}>Fair</Radio>
                  <Radio value={"Poor"}> Poor </Radio>
                </Radios>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddStep3