import React, { useState } from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import Validator from "validator";
import { Button } from "rsuite";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { purple } from "@mui/material/colors";
import { Stack, styled } from "@mui/material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function StepOne({ nextStep, handleFormData, values }) {
  //creating error state for validation
  const [error, setError] = useState(false);

  // after form submit validating the form data using Validator
  const SubmitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      Validator.isEmpty(values.image) ||
      Validator.isEmpty(values.fullname) ||
      Validator.isEmpty(values.email) ||
      Validator.isEmpty(values.tel) ||
      Validator.isEmpty(values.birthday) ||
      Validator.isEmpty(values.LineId) ||
      Validator.isEmpty(values.CitizenId) ||
      Validator.isEmpty(values.CitizenAddress) ||
      Validator.isEmpty(values.CurrentAddress)
    ) {
      setError(true);
    } else {
      nextStep();
    }
  }
  return (
    <div className="m-3">
      <Card style={{ marginTop: 100, textAlign: "left" }}>
        <Card.Body>
          <Form onSubmit={SubmitFormData}>
            <Row>
              <Col>
                <Row>
                <input
                      className="form-control"
                      name="id"
                      value="id"
                      placeholder="ID"
                      id="id"
                      type="text"
                      hidden
                    />
                  <div className="form-group m-3">
                    <label>รูปโปรไฟล์</label>
                    <input
                      className="form-control 1"
                      name="image"
                      defaultValue={values.image}
                      placeholder="รูปโปรไฟล์"
                      id="image"
                      style={{ border: error ? "2px solid red" : "" }}
                      onChange={handleFormData("fullname")}
                      type="file"
                    />
                    {error ? (
                      <Form.Text style={{ color: "red" }}>
                        กรุณาเลือกรูปโปรไฟล์
                      </Form.Text>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group m-3">
                    <label>ชื่อ-นามสกุล</label>
                    <input
                      className="form-control"
                      name="fullname"
                      defaultValue={values.email}
                      placeholder="ชื่อ นามสกุล"
                      id="fullname"
                      style={{ border: error ? "2px solid red" : "" }}
                      onChange={handleFormData("fullname")}
                      type="text"
                    />
                    {error ? (
                      <Form.Text style={{ color: "red" }}>
                        กรุณากรอกชื่อ-นามสกุล
                      </Form.Text>
                    ) : (
                      ""
                    )}
                  </div>
                  <Col>
                    <div className="form-group m-3">
                      <label>อีเมล</label>
                      <input
                        className="form-control"
                        name="email"
                        defaultValue={values.email}
                        placeholder="อีเมล"
                        id="email"
                        style={{ border: error ? "2px solid red" : "" }}
                        onChange={handleFormData("email")}
                        type="email"
                      />
                      {error ? (
                        <Form.Text style={{ color: "red" }}>
                          กรุณากรอกอีเมล
                        </Form.Text>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group m-3">
                      <label>เบอร์ติดต่อ</label>
                      <input
                        className="form-control"
                        name="tel"
                        defaultValue={values.tel}
                        placeholder="เบอร์ติดต่อ"
                        id="tel"
                        style={{ border: error ? "2px solid red" : "" }}
                        onChange={handleFormData("tel")}
                        type="tel"
                      />
                      {error ? (
                        <Form.Text style={{ color: "red" }}>
                          กรุณากรอกเบอร์ติดต่อ
                        </Form.Text>
                      ) : (
                        ""
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div className="form-group m-3">
                      <label>วันเกิด</label>
                      <input
                        className="form-control"
                        name="birthday"
                        defaultValue={values.LineId}
                        placeholder="dd/mm/yyyy"
                        id="birthday"
                        style={{ border: error ? "2px solid red" : "" }}
                        onChange={handleFormData("birthday")}
                        type="date"
                      />
                      {error ? (
                        <Form.Text style={{ color: "red" }}>
                          กรุณากรอกวันเกิด
                        </Form.Text>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group m-3">
                      <label>Line ID</label>
                      <input
                        className="form-control"
                        name="LineId"
                        defaultValue={values.LineId}
                        placeholder="Line ID"
                        id="LineId"
                        style={{ border: error ? "2px solid red" : "" }}
                        onChange={handleFormData("LineId")}
                        type="text"
                      />
                      {error ? (
                        <Form.Text style={{ color: "red" }}>
                          กรุณากรอก Line ID
                        </Form.Text>
                      ) : (
                        ""
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col>
                <div className="form-group m-3">
                  <label>เลขบัตรประชาชน</label>
                  <input
                    className="form-control"
                    name="CitizenId"
                    defaultValue={values.CitizenId}
                    placeholder="ID"
                    id="CitizenId"
                    style={{ border: error ? "2px solid red" : "" }}
                    onChange={handleFormData("CitizenId")}
                    type="id"
                  />
                  {error ? (
                    <Form.Text style={{ color: "red" }}>
                      กรุณากรอกเลขบัตรประชาชน
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group m-3">
                  <label>ที่อยู่ตามบัตรประชาชน</label>
                  <textarea
                    className="form-control"
                    name="CitizenAddress"
                    defaultValue={values.CitizenAddress}
                    placeholder="ที่อยู่"
                    id="CitizenAddress"
                    style={{ border: error ? "2px solid red" : "" }}
                    onChange={handleFormData("CitizenAddress")}
                    rows="3"
                  ></textarea>
                  {error ? (
                    <Form.Text style={{ color: "red" }}>
                      กรุณากรอกที่อยู่ตามบัตรประชาชน
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group m-3">
                  <label>ที่อยู่ปัจจุบัน</label>
                  <textarea
                    className="form-control"
                    name="CurrentAddress"
                    defaultValue={values.CurrentAddress}
                    placeholder="ที่อยู่"
                    id="CurrentAddress"
                    style={{ border: error ? "2px solid red" : "" }}
                    onChange={handleFormData("CurrentAddress")}
                    rows="3"
                  ></textarea>
                  {error ? (
                    <Form.Text style={{ color: "red" }}>
                      กรุณากรอกที่อยู่ปัจจุบัน
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group m-3">
                  
                <Stack direction="row" spacing={2} style={{ display: "flex", justifyContent: "right",  }}>
              <Button
                variant="outlined"
                startIcon={<SaveAltIcon />}
                color="secondary"
                // onClick={prevStep}
              >
                บันทึก
              </Button>
              <ColorButton
                variant="contained"
                type="submit"
                endIcon={<SkipNextIcon />}
                onClick={nextStep}
              >
                ถัดไป
              </ColorButton>
            </Stack>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default StepOne