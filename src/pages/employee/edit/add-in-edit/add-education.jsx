import React, { useEffect, useState } from "react";
import token from "../../../../token-apiurl/token";
import {
  Modal,
  Button,
  ButtonToolbar,
  Form,
  SelectPicker,
  Message,
  toaster,
  Schema,
  Input,
  Row,
  Col,
  Uploader,
} from "rsuite";

const apiEdu = "https://portfolio.blackphoenix.digital/getDegree";
const apiUniversity = "https://portfolio.blackphoenix.digital/getUniversity";
const apiFaculty = "https://portfolio.blackphoenix.digital/getFaculty";
const apiMajor = "https://portfolio.blackphoenix.digital/getMajor";

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
  
const { NumberType } = Schema.Types;
const model = Schema.Model({
  degree: NumberType().isRequired("กรุณาเลือกวุฒิการศึกษา"),
  gpax: NumberType()
    .isRequired("กรุณากรอกเกรดเฉลี่ย")
    .pattern(/^[0-4][.][0-9][0-9]{1}$/, "กรุณากรอกเกรดเฉลี่ยการศึกษา"),
  education_name: NumberType().isRequired("กรุณาเลือกสถานศึกษา"),
  faculty: NumberType().isRequired("กรุณาเลือกคณะ"),
  major: NumberType().isRequired("กรุณาเลือกสาขา"),
});


function AddEducation() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editDegree, setEditDegree] = useState([]);
  const [editUniversity, setEditUniversity] = useState([]);
  const [editFaculty, setEditFaculty] = useState([]);
  const [editMajor, setEditMajor] = useState([]);

  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    degree: "",
    gpax: "",
    education_name: "",
    faculty: "",
    major: "",
  });

  //GET Degree
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiEdu, { headers })
      .then((response) => response.json())
      .then((data) => setEditDegree(data));
  }, []);
  // console.log("edit Degree:", editDegree)

  //GET University
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiUniversity, { headers })
      .then((response) => response.json())
      .then((data) => setEditUniversity(data));
  }, []);
  // console.log("edit University:", editUniversity)

  //GET Faculty
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiFaculty, { headers })
      .then((response) => response.json())
      .then((data) => setEditFaculty(data));
  }, []);
  // console.log("edit Faculty:", editFaculty)

  //GET Major
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiMajor, { headers })
      .then((response) => response.json())
      .then((data) => setEditMajor(data));
  }, []);
  // console.log("edit Major:", editMajor)

  const edu_Degree = editDegree.map((item) => ({
    label: item.degree_name,
    value: item.degree_id,
  }));

  const edu_University = editUniversity.map((item) => ({ 
    label: item.university_name, value: item.university_id 
  }));

  const edu_Faculty = editFaculty.map(
    (item) => ({ label: item.faculty_name, value: item.faculty_id })
  );
  
  const edu_Major = editMajor.map((item) => ({
    label: item.major_name,
    value: item.major_id,
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
          <Modal.Title>การศึกษา</Modal.Title>
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
                <Row>
                  <Col>
                    <Field
                      name="degree"
                      label="วุฒิการศึกษา:"
                      accepter={SelectPicker}
                      error={formError.degree}
                      style={{ display: "inline-block", width: 200 }}
                      data={edu_Degree}
                    />
                  </Col>
                  <Col>
                    <Field
                      name="gpax"
                      label="GPAX:"
                      accepter={Input}
                      error={formError.gpax}
                      style={{ width: 200 }}
                    />
                  </Col>
                </Row>

                <Field
                  name="education_name"
                  label="School/University:"
                  accepter={SelectPicker}
                  error={formError.education_name}
                  style={{ display: "inline-block", width: 200 }}
                  data={edu_University}
                />
                <Row>
                  <Col>
                    <Field
                      name="faculty"
                      label="Faculty:"
                      accepter={SelectPicker}
                      error={formError.faculty}
                      style={{ display: "inline-block", width: 200 }}
                      data={edu_Faculty}
                    />
                  </Col>
                  <Col>
                    <Field
                      name="major"
                      label="Major:"
                      accepter={SelectPicker}
                      error={formError.major}
                      style={{ display: "inline-block", width: 200 }}
                      data={edu_Major}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            <Uploader
              listType="picture-text"
              action="//jsonplaceholder.typicode.com/posts/"
            />
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

export default AddEducation