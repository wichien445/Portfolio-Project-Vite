import React, { useEffect, useState, useRef, useCallback } from "react";

import "../../../css/style.css";
import { useParams } from "react-router-dom";
import {Button, Card, Col, Form, Row } from "react-bootstrap";
import moment from "moment";

import token from "../../../token-apiurl/token";
import apiUrl from "../../../token-apiurl/apiurl";
import { styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import axios from "axios";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function EditEmployee() {
  const { id } = useParams();
  const [empPersonal, setEmpPersonal] = useState("");
  const [validated, setValidated] = useState(false);
  
  const updateFullname = useRef();
  const updateImageEmp = useRef();
  const updateEmailEmp = useRef();
  const updateBirthdayEmp = useRef();
  const updateTelEmp = useRef();
  const updateLineId = useRef();
  const updateCitizenId = useRef();
  const updateCitizenAddress = useRef();
  const updateCurrentAddress = useRef();

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiUrl, { headers })
      .then((response) => response.json())
      .then((data) => setEmpPersonal(data));
  }, []);

  let arrPersonal = [];
  for (let i = 0; i < empPersonal.length; i++) {
    if (id == empPersonal[i].employee_id) {
      // console.log(empPersonal[i]);
      arrPersonal.push(empPersonal[i]);
    }
  }
  // console.log(arrPersonal)

  //Update Employee
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://portfolio.blackphoenix.digital/updateEmployee`,
        {
          employee_Id: id,
          employee_name: updateFullname.current?.value,
          picture: updateImageEmp.current?.value,
          birth_date: updateBirthdayEmp.current?.value,
          email: updateEmailEmp.current?.value,
          phone: updateTelEmp.current?.value,
          line: updateLineId.current?.value,
          citizen_id: updateCitizenId.current?.value,
          address_citizen: updateCitizenAddress.current?.value,
          address_current: updateCurrentAddress.current?.value,
          update_user_id: id,
        }
      );
      console.log("success");
    } catch (error) {
      // console.error("ไม่สำเร็จ", error.response.data.message);
      console.log(error);
    }
  };


  // const formHandler = useCallback(
  //     () => (event) => {
  //       const form = event.currentTarget;
  //       if (form.checkValidity() != false) {
  //         try {
  //           const response = axios.put(
  //             `https://portfolio.blackphoenix.digital/updateEmployee`,
  //             {
  //               employee_Id: id,
  //               employee_name: updateFullname.current?.value,
  //               picture: updateImageEmp.current?.value,
  //               birth_date: updateBirthdayEmp.current?.value,
  //               email: updateEmailEmp.current?.value,
  //               phone: updateTelEmp.current?.value,
  //               line: updateLineId.current?.value,
  //               citizen_id: updateCitizenId.current?.value,
  //               address_citizen: updateCitizenAddress.current?.value,
  //               address_current: updateCurrentAddress.current?.value,
  //               update_user_id: id,
  //             }
  //           );
  //           console.log("success");
  //         } catch (error) {
  //           // console.error("ไม่สำเร็จ", error.response.data.message);
  //           console.log(error);
  //         }
  //       } else {
  //         event.preventDefault();
  //               event.stopPropagation();
  //       }
  
  //       setValidated(true);
  //     },
  //     []
  //   );



  const formHandler = useCallback(
    () => (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() == false) {
        // console.log("yes");
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        const data = {
          employee_Id: id,
          employee_name: updateFullname.current?.value,
          picture: updateImageEmp.current?.value,
          birth_date: updateBirthdayEmp.current?.value,
          email: updateEmailEmp.current?.value,
          phone: updateTelEmp.current?.value,
          line: updateLineId.current?.value,
          citizen_id: updateCitizenId.current?.value,
          address_citizen: updateCitizenAddress.current?.value,
          address_current: updateCurrentAddress.current?.value,
          update_user_id: id,
        };

        console.log(data);
      }

      setValidated(true);
    },
    []
  );
  return (
    <div className="m-3">
      {arrPersonal.map((ItemPersonal, index) => (
        <Card style={{ marginTop: 20, textAlign: "left" }} key={index}>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              // onSubmit={handleSubmit}
              // onSubmit={checkValidateSubmit}
              onSubmit={formHandler()}
            >
              <Row>
                <Col>
                  <Row>
                    <div className="form-group m-3">
                      <img
                        alt={ItemPersonal.picture}
                        src={ItemPersonal.picture}
                        style={{ width: 150, height: 150, borderRadius: 75 }}
                        // value={imageEmp}
                        // value={ItemPersonal.picture}
                      />
                    </div>

                    <div className="form-group m-3">
                      <label>รูปโปรไฟล์</label>
                    </div>
                    <div className="form-group m-3">
                      <input
                        className="form-control 1"
                        name="imageEmp"
                        placeholder="รูปโปรไฟล์"
                        id="imageEmp"
                        type="file"
                        // onChange={(event) => setImageEmp(event.target.value)}
                        // fileName={console.log(ItemPersonal.picture)}
                        ref={updateImageEmp}
                        // url={ItemPersonal.picture}
                        required
                      />
                      <Form.Control.Feedback>
                        ข้อมูลถูกต้อง
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        กรุณาเลือก รูปโปรไฟล์
                      </Form.Control.Feedback>
                      {/* <Uploader
                        listType="picture-text"
                        action="//jsonplaceholder.typicode.com/posts/"
                      /> */}
                    </div>
                    <div className="form-group m-3">
                      <label>ชื่อ-นามสกุล</label>
                      <input
                        className="form-control"
                        name="fullname"
                        // placeholder={ItemPersonal.employee_name}
                        id="fullname"
                        type="text"
                        defaultValue={ItemPersonal.employee_name}
                        // onChange={(event) => setFullname(event.target.value)}
                        // value={fullname }
                        ref={updateFullname}
                        required
                      />
                      <Form.Control.Feedback>
                        ข้อมูลถูกต้อง
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        กรุณากรอก ชื่อและนามสกุล
                      </Form.Control.Feedback>
                    </div>
                    <Col>
                      <div className="form-group m-3">
                        <label>อีเมล</label>
                        <input
                          className="form-control"
                          name="emailEmp"
                          defaultValue={ItemPersonal.email}
                          id="emailEmp"
                          type="email"
                          // value={emailEmp}
                          // onChange={(event) => setEmailEmp(event.target.value)}
                          ref={updateEmailEmp}
                          required
                        />
                        <Form.Control.Feedback>
                          ข้อมูลถูกต้อง
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอก อีเมล
                        </Form.Control.Feedback>
                      </div>
                      <div className="form-group m-3">
                        <label>เบอร์ติดต่อ</label>
                        <input
                          className="form-control"
                          name="telEmp"
                          value={ItemPersonal.phone}
                          id="telEmp"
                          type="tel"
                          // onChange={(event) => setTelEmp(event.target.value)}
                          ref={updateTelEmp}
                          disabled
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="form-group m-3">
                        <label>วันเกิด</label>
                        <input
                          className="form-control"
                          name="birthdayEmp"
                          id="birthdayEmp"
                          type="date"
                          defaultValue={moment(ItemPersonal.birth_date).format(
                            "YYYY-MM-DD"
                          )}
                          // onChange={(event) =>
                          //   setBirthdayEmp(event.target.value)
                          // }
                          ref={updateBirthdayEmp}
                          // placeholder= {moment(ItemPersonal.birth_date).format(
                          //   "YYYY-MM-DD"
                          // )}
                          // onChange={(event) =>
                          //   setBirthdayEmp(event.target.value)
                          // }
                          // value={birthdayEmp}
                          required
                        />
                        <Form.Control.Feedback>
                          ข้อมูลถูกต้อง
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอก วัน/เดือน/ปี เกิด
                        </Form.Control.Feedback>
                      </div>
                      <div className="form-group m-3">
                        <label>Line ID</label>
                        <input
                          className="form-control"
                          name="lineId"
                          id="lineId"
                          type="text"
                          defaultValue={ItemPersonal.line}
                          //  value={lineId}
                          // onChange={(event) => setLineId(event.target.value)}
                          ref={updateLineId}
                          required
                        />
                        <Form.Control.Feedback>
                          ข้อมูลถูกต้อง
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอก ไลน์ไอดี
                        </Form.Control.Feedback>
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row>
                    <Col>
                      <div className="form-group m-3">
                        <label>เลขบัตรประชาชน</label>
                        <input
                          className="form-control"
                          name="CitizenId"
                          id="CitizenId"
                          type="text"
                          defaultValue={ItemPersonal.citizen_id}
                          // value={CitizenId}
                          // onChange={(event) => setCitizenId(event.target.value)}
                          ref={updateCitizenId}
                          required
                        />
                        <Form.Control.Feedback>
                          ข้อมูลถูกต้อง
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอก เลขบัตรประชาชาน
                        </Form.Control.Feedback>
                      </div>
                      <div className="form-group m-3">
                        <label>ที่อยู่ตามบัตรประชาชน</label>
                        <textarea
                          className="form-control"
                          name="CitizenAddress"
                          id="CitizenAddress"
                          rows="3"
                          defaultValue={ItemPersonal.address_citizen}
                          // value={CitizenAddress}
                          // onChange={(event) =>
                          //   setCitizenAddress(event.target.value)
                          // }
                          ref={updateCitizenAddress}
                          required
                        ></textarea>{" "}
                        <Form.Control.Feedback>
                          ข้อมูลถูกต้อง
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอก ที่อยู่ตามบัตรประชาชน
                        </Form.Control.Feedback>
                      </div>

                      <div className="form-group m-3">
                        <label>ที่อยู่ปัจจุบัน</label>
                        <textarea
                          className="form-control"
                          name="CurrentAddress"
                          id="CurrentAddress"
                          rows="3"
                          defaultValue={ItemPersonal.address_current}
                          // value={CurrentAddress}
                          // onChange={(event) =>
                          //   setCurrentAddress(event.target.value)
                          // }
                          ref={updateCurrentAddress}
                          required
                        ></textarea>{" "}
                        <Form.Control.Feedback>
                          ข้อมูลถูกต้อง
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอก ที่อยู่ปัจจุบัน
                        </Form.Control.Feedback>
                      </div>
                    </Col>
                  </Row>
                </Col>

                <div
                  className="form-group m-3"
                  style={{ textAlign: "center", color: "#d554bf" }}
                >
                  <ColorButton type="submit" variant="contained">
                    {" "}
                    บันทึก
                  </ColorButton>
                </div>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default EditEmployee