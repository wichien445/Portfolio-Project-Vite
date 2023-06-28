import React from "react";

import {
  Modal,
  Button,
  ButtonToolbar,
  Form,
  Input,
  Message,
  toaster,
  Schema,
  Row,
  Col,
  DatePicker,
  Uploader,
} from "rsuite";

const Textarea = React.forwardRef((props, ref) => (
    <Input {...props} as="textarea" ref={ref} />
));
  
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
        type
        name={name}
        accepter={accepter}
        errorMessage={error}
        {...rest}
      />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});
  
  
const { StringType, DateType } = Schema.Types;
const model = Schema.Model({
  course: StringType().isRequired("กรุณาเลือกหลักสูตร"),
  organization: StringType().isRequired("กรุณาเลือกสถาบันการอบรม"),
  startdate: DateType().isRequired("กรุณาเลือกวันที่เริ่มอบรม"),
  enddate: DateType().isRequired("กรุณาเลือกวันที่สิ้นสุดการอบรม"),
});

function AddCertificate() {
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState();
  const handleOpen = value => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    course: "",
    organization: "",
    // startdate: new Date(),
    // enddate: new Date(),
  });

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
        <Button className="ButtonAdd" appearance="primary" onClick={() => handleOpen('md')}> Add</Button>
      </ButtonToolbar>

      <Modal size={size} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Certification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            ref={formRef}
            onChange={setFormValue}
            onCheck={setFormError}
            formValue={formValue}
            model={model}
            style={{ display: "flex",
            alignItems: "center",
            justifyContent: "center"}}
          >
            <Row>
              <Col>
                <Field
                  name="course"
                  label="Course:"
                  accepter={Input}
                  error={formError.course}
                />

                <Field
                  name="organization"
                  label="Organization:"
                  accepter={Input}
                  error={formError.organization}
                  
                />
                <Row>
                  <Col>
                    <Field
                      name="startdate"
                      label="Start date:"
                      accepter={DatePicker}
                      error={formError.startdate}
                      style={{ width: 145 }}
                      
                      format="dd-MM-yyyy"
                    />
                  </Col>
                  <Col>
                    <Field
                      name="enddate"
                      label="End date:"
                      accepter={DatePicker}
                      error={formError.enddate}
                      style={{ width: 145 }}
                      format="dd-MM-yyyy"
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Field
                  name="detail"
                  label="Detail:"
                  accepter={Textarea}
                  error={formError.detail}
                />

                <Field
                  name="certificate"
                  label="Certificate Image:"
                  accepter={Uploader}
                  error={formError.certificate}
                  style={{ width: 300 }}
                  listType="picture-text"
                  action="//jsonplaceholder.typicode.com/posts/"
                />
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

export default AddCertificate