import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from "@mui/material/Stack";
import token from "../../../../token-apiurl/token";
import apiUrl from "../../../../token-apiurl/apiurl";
import { styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import axios from 'axios';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function EditFormEdu() {
  const { id, EditEduId } = useParams();
  const [empPersonalEducate, setempPersonalEducate] = useState([]);
  const [editDegree, setEditDegree] = useState([]);
  const [editUniversity, setEditUniversity] = useState([]);
  const [editFaculty, setEditFaculty] = useState([]);
  const [editMajor, setEditMajor] = useState([]);

  const [validated, setValidated] = useState(false);
  const updateDegree = useRef();
  const updateUniversity = useRef();
  const updateFaculty = useRef();
  const updateMajor = useRef();
  const updateGpax = useRef();
  const updateTranscript = useRef();



  const apiEdu = "https://portfolio.blackphoenix.digital/getDegree";
  const apiUniversity = "https://portfolio.blackphoenix.digital/getUniversity";
  const apiFaculty = "https://portfolio.blackphoenix.digital/getFaculty";
  const apiMajor = "https://portfolio.blackphoenix.digital/getMajor";

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiUrl, { headers })
      .then((response) => response.json())
      .then((data) => setempPersonalEducate(data));
  }, []);
  // console.log("edit Edu",empPersonalEducate )

  //GET Education
  let arr = [];
  for (let i = 0; i < empPersonalEducate.length; i++) {
    for (let j = 0; j < empPersonalEducate[i].eduCation.length; j++) {
      arr.push(empPersonalEducate[i]?.eduCation[j]);
    }
  }
  // console.log("arr Education : ", arr);

   let arrEdu = []
          for (let i = 0; i < arr.length; i++) {
            if (id == arr[i].employee_id) {
              arrEdu.push(arr[i]);
            }
          }
  // console.log("data Edu",arrEdu)

  let arrEduId = []
  for (let i = 0; i < arrEdu.length; i++) {
    if (EditEduId == arr[i].education_id) {
      arrEduId.push(arr[i]);
    }
  }
// console.log("data Edu by ID :",arrEduId)

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

/*   const formHandler = useCallback(
    () => (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() != false) {
        try {
          const response = axios.put(
            `https://portfolio.blackphoenix.digital/updateEducation`,
            {
              employee_Id: id,
              education_id: EditEduId,
              degree_id: updateDegree.current?.value,
              university_id: updateUniversity.current?.value,
              // faculty_id: updateFaculty.current?.value,
              major_id: updateMajor.current?.value,
              gpax: updateGpax.current?.value,
              transcript: updateTranscript.current?.value,
              update_user_id: id,
            }
          );
          console.log("success");
        } catch (error) {
          // console.error("ไม่สำเร็จ", error.response.data.message);
          console.log(error);
        }
      } else {
        event.preventDefault();
              event.stopPropagation();
      }

      setValidated(true);
    },
    []
  ); */


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
          education_id: EditEduId,
          degree_id: updateDegree.current?.value,
          university_id: updateUniversity.current?.value,
          // faculty_id: updateFaculty.current?.value,
          major_id: updateMajor.current?.value,
          gpax: updateGpax.current?.value,
          transcript: updateTranscript.current?.value,
          update_user_id: id,
        };

        console.log("success",data);
      }

      setValidated(true);
    },
    []
  );
  

/*     const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.put('https://portfolio.blackphoenix.digital/updateEducation', {
          employee_Id: id,
          education_id: EditEduId,
          degree_name: degreename,
          university: university,
          faculty: faculty,
          major: major,
          gpax: gpax,
          update_user_id: update_user_id
        });
  
        console.log(response.data.message);
        alert(`แก้ไขข้อมูลสำเร็จ`);
      } catch (error) {
        console.error(error.response.data.message);
        alert(`แก้ไขข้อมูลไม่สำเร็จ`);
      }
    }; */
  return (
    <>
      <Form noValidate
          validated={validated} onSubmit={formHandler()}>
          {arrEduId.map((val, index) => (
            <div>
              <Row>
            <Col xs={3}>
              <Form.Label>วุฒิการศึกษา :</Form.Label>
              <Form.Select aria-label="degree"  ref={updateDegree} defaultValue={val.degree_id} >
                <option  required  > {val.degree_name}</option>
                {editDegree.map((itemDegree, index) => (
                  <option key={index} value={`${itemDegree.degree_id}`} >
                    {itemDegree.degree_name}
                  </option>
                ))}
                <Form.Control.Feedback type="invalid">
                          กรุณาเลือกวุฒิการศึกษา
                        </Form.Control.Feedback>
              </Form.Select>
            </Col>
            <Col xs={3}>
              <Form.Label>สถานศึกษา :</Form.Label>
              <Form.Select aria-label="university" ref={updateUniversity} defaultValue={val.university_id}>
                <option required>{val.university_name}</option>
                {editUniversity.map((itemUniversity, index) => (
                  <option key={index} value={`${itemUniversity.university_id}`}>
                    {itemUniversity.university_name}
                  </option>
                ))}
                <Form.Control.Feedback type="invalid">
                          กรุณาเลือกสถานศึกษา
                        </Form.Control.Feedback>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <Form.Label>คณะ :</Form.Label>
              <Form.Select aria-label="faculty" >
                <option required>{val.faculty_name}</option>
                {editFaculty.map((itemFaculty, index) => (
                  <option key={index} value={`${itemFaculty.faculty_id}`}>
                    {itemFaculty.faculty_name}
                  </option>
                ))}
                <Form.Control.Feedback type="invalid">
                          กรุณาเลือกคณะ
                        </Form.Control.Feedback>
              </Form.Select>
            </Col>
            <Col xs={3}>
              <Form.Label>สาขาวิชา :</Form.Label>
              <Form.Select aria-label="major" ref={updateMajor} defaultValue={val.major_id}>
                <option required>{val.major_name}</option>
                {editMajor.map((itemDegree, index) => (
                  <option key={index} value={`${itemDegree.major_id}`}>
                    {itemDegree.major_name}
                  </option>
                ))}
                <Form.Control.Feedback type="invalid">
                          กรุณาเลือกสาขา
                        </Form.Control.Feedback>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            
            <Col xs={3}>
            <div>
              <Form.Label>เกรดเฉลี่ย :</Form.Label>
              <Form.Control className="mb-2" id="gpax" placeholder="เกรดเฉลี่ย" defaultValue={val.gpax} ref={updateGpax} required></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอก เกรดเฉลี่ย
                        </Form.Control.Feedback>
                        </div>
            </Col>
            <Col xs={3}>
            <img src={val.transcript} width="50%" height="50%" />
              <Form.Group className="position-relative mb-3">
                <Form.Label>ใบรับรองผลการศึกษา:</Form.Label>
                <Form.Control type="file"  name="transcript" ref={updateTranscript} required/>
                <Form.Control.Feedback type="invalid">
                          กรุณาเลือกไฟล์ใบรับรองผลการศึกษา
                        </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <br />

            </div>
          ))}

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<CancelIcon/>} color="secondary">
              ยกเลิก
            </Button>
            <ColorButton type="submit" variant="contained" endIcon={<SendIcon />}>
              {" "}
              บันทึก
            </ColorButton>
          </Stack>
      </Form>
    </>
  )
}

export default EditFormEdu