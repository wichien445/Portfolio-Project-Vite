import React, { useEffect, useState } from "react";

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
  SelectPicker,
  Toggle,
} from "rsuite";
import token from "../../../../token-apiurl/token";

const apiPosition = "https://portfolio.blackphoenix.digital/getPosition";
const apiCustomer = "https://portfolio.blackphoenix.digital/getCustomer";

/* const Position = [
  "Managing Director",
  "General Manager",
  "Full Stack Developer",
  "Front End Web Developer",
  "Mobile Developer",
  "Back End Developer",
  "UX/UI Designer",
  "Software Tester",
  "System Analyst",
  "Business Analyst",
  "DevOps Engineer",
  "Project Manager",
].map((item) => ({ label: item, value: item }));

const Customer = [
  "บริษัท ที.ซี.ซี. เทคโนโลยี จำกัด",
  "ตลาดหลักทรัพย์แห่งประเทศไทย",
].map((item) => ({ label: item, value: item })); */

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
        name={name}
        accepter={accepter}
        errorMessage={error}
        {...rest}
      />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});

const Toggles = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group
      controlId={`${name}-10`}
      ref={ref}
      className={error ? "has-error" : ""}
    >
      <Row>
        <Col>
          <Form.ControlLabel>{label} </Form.ControlLabel>
        </Col>
        <Col>
          <Form.Control
            name={name}
            accepter={accepter}
            errorMessage={error}
            {...rest}
          />
        </Col>
      </Row>

      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});

const { StringType, DateType , NumberType} = Schema.Types;
const model = Schema.Model({
  company: StringType().isRequired("กรุณาเลือกบริษัท"),
  position: StringType().isRequired("กรุณาเลือกตำแหน่ง"),
  startdateWexp: DateType().isRequired("กรุณาเลือกวันที่เริ่มงาน"),
  //   startdateWexp: DateType().max(new Date(),"กรุณาเลือกวันที่เริ่มงาน"),
  enddateWexp: DateType().isRequired("กรุณาเลือกวันที่สิ้นสุดการทำงาน"),
  // customer: NumberType().isRequired("กรุณาเลือกบริษัท"),
  // startdateStatus: DateType().isRequired("กรุณาเลือกวันที่เริ่มงาน"),
  // enddateStatus: DateType().isRequired("กรุณาเลือกวันที่สิ้นสุดการทำงาน"),
});

function AddStep6() {
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState();
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [editPosition, setEditPosition] = useState([]);
  const [editCustomer, setEditCustomer] = useState([]);
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    company: "",
    organization: "",
    // startdateWexp: new Date(),
    // enddateWexp: new Date(),
    detail: "",
    status: false,
    customer: "",
    // startdateStatus:new Date(),
    // enddateStatus: new Date(),
    start: "",
  });

  //GET Position
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiPosition, { headers })
      .then((response) => response.json())
      .then((data) => setEditPosition(data));
  }, []);

  //GET Customer
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiCustomer, { headers })
      .then((response) => response.json())
      .then((data) => setEditCustomer(data));
  }, []);

  const Position = editPosition.map((item) => ({ label: item.position_name, value: item.position_id }));
  const Customer = editCustomer.map((item) => ({ label: item.customer_name, value: item.customer_id }));

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
        <Button className="ButtonAdd" appearance="primary" onClick={() => handleOpen("md")}> Add</Button>
      </ButtonToolbar>

      <Modal size={size} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Work Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            ref={formRef}
            onChange={setFormValue}
            onCheck={setFormError}
            formValue={formValue}
            model={model}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Row>
              <Col>
                <Field
                  name="company"
                  label="Company:"
                  accepter={Input}
                  error={formError.company}
                />
                <Row>
                  <Col>
                    <Field
                      name="position"
                      label="Position:"
                      accepter={SelectPicker}
                      error={formError.position}
                      style={{ display: "inline-block", width: 145 }}
                      data={Position}
                    />
                  </Col>
                  <Col>
                    <Field
                      name="department"
                      label="Department:"
                      accepter={Input}
                      error={formError.department}
                      style={{ width: 145 }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Field
                      name="startdateWexp"
                      label="Start date:"
                      accepter={DatePicker}
                      error={formError.startdateWexp}
                      style={{ width: 145 }}
                      format="dd-MM-yyyy"
                    />
                  </Col>
                  <Col>
                    <Field
                      name="enddateWexp"
                      label="End date:"
                      accepter={DatePicker}
                      error={formError.enddate}
                      style={{ width: 145 }}
                      format="dd-MM-yyyy"
                    />
                  </Col>
                </Row>
                <Field
                  name="detail"
                  label="Detail:"
                  accepter={Textarea}
                  error={formError.detail}
                />
              </Col>
              <Col>
                <Toggles
                  accepter={Toggle}
                  name="status"
                  label="On-site Status:"
                  errorMessage={formError.status}
                />

                <Field
                  name="customer"
                  label="Customer:"
                  accepter={SelectPicker}
                  error={formError.customer}
                  style={{ display: "inline-block", width: 300 }}
                  data={Customer}
                />
                <Row>
                  <Col>
                    {" "}
                    <Field
                      name="startdateStatus"
                      label="Start date:"
                      accepter={DatePicker}
                      error={formError.startdateStatus}
                      style={{ width: 145 }}
                      format="dd-MM-yyyy"
                    />
                  </Col>
                  <Col>
                    {" "}
                    <Field
                      name="enddateStatus"
                      label="End date:"
                      accepter={DatePicker}
                      error={formError.enddateStatus}
                      style={{ width: 145 }}
                      format="dd-MM-yyyy"
                    />
                  </Col>
                </Row>
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

export default AddStep6