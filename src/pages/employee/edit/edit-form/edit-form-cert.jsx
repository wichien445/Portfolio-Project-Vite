import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import apiurl from "../../../../token-apiurl/apiurl";
import token from "../../../../token-apiurl/token";
import moment from "moment";
import axios from "axios";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function EditCertificate() {
    const { id, EditCertId } = useParams();
  const [editFormCert, setEditFormCert] = useState([]);
  const [validated, setValidated] = useState(false);

  //Update Certificate
  const updateCertName = useRef();
  const UpdateOrganization = useRef();
  const UpdateCertDetail = useRef();
  const UpdateStartDate = useRef();
  const UpdateEndDate = useRef();
  const UpdateCertPic = useRef();

/*   const formHandler = useCallback(
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
          certificate_id: EditCertId,
          certificate_name: updateCertName.current?.value,
          organization: UpdateOrganization.current?.value,
          certificate_detail: UpdateCertDetail.current?.value,
          start_date: UpdateStartDate.current?.value,
          end_date: UpdateEndDate.current?.value,
          certificate_picture: UpdateCertPic.current?.value,
          update_user_id: id,
        };

        console.log(data);
      }

      setValidated(true);
    },
    []
  ); */

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiurl, { headers })
      .then((response) => response.json())
      .then((data) => setEditFormCert(data));
  }, []);
  // console.log("edit Edu",editFormCert )

  //GET Certificate
  let arr = [];
  for (let i = 0; i < editFormCert.length; i++) {
    for (let j = 0; j < editFormCert[i].cerTificate.length; j++) {
      arr.push(editFormCert[i]?.cerTificate[j]);
    }
  }
  // console.log("arr Education : ", arr);

  //Get Certificate 
  let arrCert = [];
  for (let i = 0; i < arr.length; i++) {
    if (id == arr[i].employee_id) {
      arrCert.push(arr[i]);
    }
  }
  // console.log("data Certficate",arrCert)

  //Certificate by ID
  let arrCertId = [];
  for (let i = 0; i < arrCert.length; i++) {
    if (EditCertId == arrCert[i].certificate_id) {
      arrCertId.push(arrCert[i]);
    }
  }
  // console.log("data Certificate by ID :",arrCertId)

  //Update to DB API
  const formHandler = useCallback(
    () => (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() != false) {
        try {
          const response = axios.put(
            `https://portfolio.blackphoenix.digital/updateCertificate`,
            {
              employee_Id: id,
          certificate_id: EditCertId,
          certificate_name: updateCertName.current?.value,
          organization: UpdateOrganization.current?.value,
          certificate_detail: UpdateCertDetail.current?.value,
          start_date: UpdateStartDate.current?.value,
          end_date: UpdateEndDate.current?.value,
          certificate_picture: UpdateCertPic.current?.value,
          update_user_id: id,
            }
          );
          console.log("success");
          event.preventDefault();
        } catch (error) {
          // console.error("ไม่สำเร็จ", error.response.data.message);
          console.log(error);
          event.preventDefault();
        }
      } else {
        event.preventDefault();
              event.stopPropagation();
      }

      setValidated(true);
    },
    []
  );
  return (
    <div>
      {arrCertId.map((val, index) => (
        <>
          <Form 
          key={index}
           noValidate
           validated={validated}
           onSubmit={formHandler()}>
            <Row>
              <Col xs={3}>
                <Col>
                  <Form.Label>หลักสูตรอบรม :</Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="course"
                    placeholder="หลักสูตร"
                    defaultValue={val.certificate_name}
                    required
                    ref={updateCertName}
                  />
                   <Form.Control.Feedback type="invalid">
                          กรุณากรอก หลักสูตรที่ได้รับการอบรม
                        </Form.Control.Feedback>
                </Col>
                <Col>
                  <Form.Label>สถาบันฝึกอบรม :</Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="organization"
                    placeholder="สถาบันอบรม"
                    defaultValue={val.organization}
                    required
                    ref={UpdateOrganization}
                  />
                   <Form.Control.Feedback type="invalid">
                          กรุณากรอก สถาบันฝึกอบรม
                        </Form.Control.Feedback>
                </Col>
                <Col>
                  <Form.Label>วันที่อบรม :</Form.Label>
                  <Form.Control
                    className="mb-2"
                    name="startdate"
                    id="startdate"
                    type="date"
                    defaultValue={moment(val.start_date).format("YYYY-MM-DD")}
                    required
                    ref={UpdateStartDate}
                  />
                   <Form.Control.Feedback type="invalid">
                   กรุณาเลือก วันที่อบรม
                        </Form.Control.Feedback>
                </Col>
                <Col>
                  <Form.Label>วันสิ้นสุดการอบรม :</Form.Label>
                  <Form.Control
                    className="mb-2"
                    name="enddate"
                    id="enddate"
                    type="date"
                    defaultValue={moment(val.end_date).format("YYYY-MM-DD")}
                    required
                    ref={UpdateEndDate}
                  />
                   <Form.Control.Feedback type="invalid">
                          กรุณาเลือก วันที่สิ้นสุดการอบรม
                        </Form.Control.Feedback>
                </Col>
              </Col>
              <Col xs={3}>
                <Form.Label>รายละเอียดการอบรม :</Form.Label>
                <Form.Control
                  className="mb-2"
                  name="datail"
                  id="datail"
                  rows="3"
                  as="textarea"
                  defaultValue={val.certificate_detail}
                  ref={UpdateCertDetail}
                ></Form.Control>

                <div>
                  <img src={val.certificate_picture} width="50%" height="50%" />
                </div>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>ใบรับรองการอบรม :</Form.Label>
                  <Form.Control type="file" ref={UpdateCertPic}/>
                </Form.Group>
              </Col>
            </Row>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                color="secondary"
              >
                ยกเลิก
              </Button>
              <ColorButton variant="contained" type="submit" endIcon={<SendIcon />}>
                {" "}
                บันทึก
              </ColorButton>
            </Stack>
          </Form>
        </>
      ))}
    </div>
  )
}

export default EditCertificate