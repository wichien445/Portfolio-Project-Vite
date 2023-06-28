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
  Row,
  Col,
  Checkbox,
} from "rsuite";
import token from "../../../../token-apiurl/token";

const apiCategory = "https://portfolio.blackphoenix.digital/getCategory";
const apiFramework = "https://portfolio.blackphoenix.digital/getFramework";

const Field = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group
      controlId={`${name}-10`}
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

const { ArrayType, NumberType } = Schema.Types;
const model = Schema.Model({
  skill: NumberType().isRequired("กรุณาเลือกทักษะ"),
  // framework: ArrayType().minLength(1, 'อย่างน้อย 1 ทักษะ').isRequired("กรุณาเลือกชุดคำสั่ง/เครื่องมือ"),
});

function AddTechnical() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editCategory, setEditCategory] = useState([]);
  const [editFramework, setEditFramework] = useState([]);
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    skill: "",
    framework: "",
  });

    //GET Category
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiCategory, { headers })
      .then((response) => response.json())
      .then((data) => setEditCategory(data));
  }, []);
  //  console.log("edit Language:", editCategory)

  //GET Framework
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiFramework, { headers })
      .then((response) => response.json())
      .then((data) => setEditFramework(data));
  }, []);

  // console.log("edit Framework:", editFramework);

  const data = editCategory.map((item) => ({
    label: item.category_name,
    value: item.category_id,
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
          Add
        </Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Technical Skills</Modal.Title>
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
                  name="skill"
                  label="Skill:"
                  accepter={SelectPicker}
                  error={formError.skill}
                  style={{ display: "inline-block", width: 300 }}
                  data={data}
                />

                <Field
                  name="framework"
                  label="Framework:"
                  accepter={Checkbox} 
                  error={formError.framework}
                  inline
                >
                  {editFramework.map((item, index) => (
                  <Checkbox value={item.framework_id}>{item.framework_name}</Checkbox>
                ))}
                </Field>
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

export default AddTechnical