import React, { useCallback, useEffect, useRef, useState } from "react";
import token from "../../../../token-apiurl/token";
import { Col, Form, Row } from "react-bootstrap";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import apiurl from "../../../../token-apiurl/apiurl";
import axios from "axios";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function EditLanguageSkill() {
  const { id, EditLanguageId } = useParams();
  const [empPersonalSkillLanguage, setempPersonalSkillLanguage] = useState([]);
  const [editLanguage, setEditLanguage] = useState([]);
  const [validated, setValidated] = useState(false);

  //Update Language
  const updateLanguage_id = useRef();
  const updateListening_rate = useRef();
  const updateReading_rate = useRef();
  const updateSpeaking_rate = useRef();
  const updateWriting_rate = useRef();

  //Update Language
/*   const [employee_Id, setEmployee_Id] = useState("");
  const [language_skill_id, setLanguage_skill_id] = useState("");
  const [language_id, setLanguage_id] = useState("");
  const [listening_rate, setListening_rate] = useState("");
  const [reading_rate, setReading_rate] = useState("");
  const [speaking_rate, setSpeaking_rate] = useState("");
  const [writing_rate, setWriting_rate] = useState("");
  const [update_user_id, setUpdate_user_id] = useState(""); */

  const apiLanguage = "https://portfolio.blackphoenix.digital/getLanguage";

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
          language_skill_id: EditLanguageId,
          language_id: updateLanguage_id.current?.value,
          listening_rate: updateListening_rate.current?.value,
          reading_rate: updateListening_rate.current?.value,
          speaking_rate: updateListening_rate.current?.value,
          writing_rate: updateListening_rate.current?.value,
          update_user_id: id,
        };

        console.log(data);
      }

      setValidated(true);
    },
    []
  );

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiurl, { headers })
      .then((response) => response.json())
      .then((data) => setempPersonalSkillLanguage(data));
  }, []);
  // console.log("edit Edu",empPersonalEducate )

  //GET Education
  let arr = [];
  for (let i = 0; i < empPersonalSkillLanguage.length; i++) {
    for (let j = 0; j < empPersonalSkillLanguage[i].languageSkill.length; j++) {
      arr.push(empPersonalSkillLanguage[i]?.languageSkill[j]);
    }
  }
  // console.log("arr Education : ", arr);

  let arrLang = [];
  for (let i = 0; i < arr.length; i++) {
    if (id == arr[i].employee_id) {
      arrLang.push(arr[i]);
    }
  }
  // console.log("data Edu",arrEdu)

  let arrlangID = [];
  for (let i = 0; i < arrLang.length; i++) {
    if (EditLanguageId == arrLang[i].language_skill_id) {
      arrlangID.push(arrLang[i]);
    }
  }
  // console.log("data language by ID :", arrlangID);

  //GET Language
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiLanguage, { headers })
      .then((response) => response.json())
      .then((data) => setEditLanguage(data));
  }, []);
  //  console.log("edit Language:", editLanguage)

  const rateLanguage = [
    {
      value: "4",
      label: "ดีมาก",
    },
    {
      value: "3",
      label: "ดี",
    },
    {
      value: "2",
      label: "พอใช้",
    },
    {
      value: "1",
      label: "พื้นฐาน",
    },
  ];

 /*  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        "https://portfolio.blackphoenix.digital/updateLanguage_skill",
        {
          employee_Id: id,
          language_skill_id: EditLanguageId,
          language_id: language_id,
          listening_rate: listening_rate,
          reading_rate: reading_rate,
          speaking_rate: speaking_rate,
          writing_rate: writing_rate,
          update_user_id: id,
        }
      );

      console.log(response.data.message);
      alert(`แก้ไขข้อมูลสำเร็จ`);
    } catch (error) {
      console.error(error.response.data.message);
      alert(`แก้ไขข้อมูลไม่สำเร็จ`);
    }
  };
 */
  const CheckRadio = (data) => {
    if (data == 1) {
      return (
        <Form required>
          <Form.Check
            defaultChecked={false}
            type="radio"
            label="ดีมาก"
            // value={4}
            // defaultValue={data.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
            
          />
          <Form.Check
            defaultChecked={false}
            type="radio"
            label="ดี"
            // value={3}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
           
          />
          <Form.Check
            defaultChecked={false}
            type="radio"
            label="พอใช้"
            // value={2}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
            
          />
          <Form.Check
            defaultChecked={true}
            type="radio"
            label="พื้นฐาน"
            value={1}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
            ref={updateListening_rate}
          />
        </Form>
      );
    } else if (data == 2) {
      return (
        <Form required>
          <Form.Check
            defaultChecked={false}
            type="radio"
            label="ดีมาก"
            // value={val.listening_rate}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
          />
          <Form.Check
            defaultChecked={false}
            type="radio"
            label="ดี"
            // value={val.listening_rate}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
          />
          <Form.Check
            defaultChecked={true}
            type="radio"
            label="พอใช้"
            value={2}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
            ref={updateListening_rate}
          />
          <Form.Check
            defaultChecked={false}
            type="radio"
            label="พื้นฐาน"
            // value={val.listening_rate}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
          />
        </Form>
      );
    } else if (data == 3) {
      return (
        <Form required>
          <Form.Check
            defaultChecked={false}
            type="radio"
            label="ดีมาก"
            // value={val.listening_rate}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
          />
          <Form.Check
            defaultChecked={true}
            type="radio"
            label="ดี"
            value={3}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
            ref={updateListening_rate}
          />
          <Form.Check
            defaultChecked={false}
            type="radio"
            label="พอใช้"
            // value={val.listening_rate}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
          />
          <Form.Check
            defaultChecked={false}
            type="radio"
            label="พื้นฐาน"
            // value={val.listening_rate}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
          />
        </Form>
      );
    } else if (data == 4) {
      return (
        <Form required>
          <Form.Check
            defaultChecked={true}
            type="radio"
            label="ดีมาก"
            value={4}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
            ref={updateListening_rate}
          />
          <Form.Check
            defaultChecked={false}
            type="radio"
            label="ดี"
            // value={val.listening_rate}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
          />
          <Form.Check
            defaultChecked={false}
            type="radio"
            label="พอใช้"
            // value={val.listening_rate}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
          />
          <Form.Check
            defaultChecked={false}
            type="radio"
            label="พื้นฐาน"
            // value={val.listening_rate}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}d
          />
        </Form>
      );
    } else {
      return (
        <Form>
          <Form.Check
            defaultChecked={false}
            type="radio"
            // label={item.label}
            // value={val.listening_rate}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
          />
          <Form.Check
            defaultChecked={false}
            type="radio"
            // label={item.label}
            // value={val.listening_rate}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
          />
          <Form.Check
            defaultChecked={false}
            type="radio"
            // label={item.label}
            // value={val.listening_rate}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
          />
          <Form.Check
            defaultChecked={false}
            type="radio"
            // label={item.label}
            // value={val.listening_rate}
            // defaultValue={val.listening_rate}
            name="formHorizontalRadios"
            id="rateLanguage1"
            // checked={val.listening_rate}
          />
        </Form>
      );
    }
  };
  return (
    <>
      {arrlangID.map((val, index) => (
        <Form
          key={index}
          noValidate
          validated={validated}
          onSubmit={formHandler()}
        >
          <>
            <Form.Control
              className="mb-2"
              id="gpax"
              placeholder="ภาษา"
              value={val.language_id}
              ref={updateLanguage_id}
              hidden
            />

            <Col xs={3}>
              <Form.Label>ทักษะด้านภาษา :</Form.Label>
              <Form.Control
                className="mb-2"
                id="gpax"
                placeholder="ภาษา"
                value={val.language_name}
              />
            </Col>

            <br />
            <Form>
              <Col>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label as="legend" column xs={2}>
                    ระดับการฟัง :
                  </Form.Label>
                  <Col sm={4}>
                    {/* {rateLanguage.map((item) => ( */}
                    {/* <Form.Check
                      defaultChecked={true}
                      type="radio"
                      // label={item.label}
                      // value={val.listening_rate}
                      // defaultValue={val.listening_rate}
                      name="formHorizontalRadios"
                      id="rateLanguage1"
                      // checked={val.listening_rate}
                    /> */}
                    {CheckRadio(val.listening_rate)}
                    {/* ))} */}
                    {/* {val.listening_rate} */}
                  </Col>
                </Form.Group>
              </Col>
              <br />
            </Form>

            <Form>
              <Col>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label as="legend" column xs={2}>
                    ระดับการพูด :
                  </Form.Label>
                  <Col sm={4}>
                    {/* {rateLanguage.map((item) => (
                      <Form.Check
                        defaultChecked={val.speaking_rate}
                        type="radio"
                        label={item.label}
                        value={item.value}
                        name="formHorizontalRadios"
                        id="rateLanguage1"
                      />
                    ))} */}
                    {CheckRadio(val.speaking_rate)}
                  </Col>
                </Form.Group>
              </Col>
              <br />
            </Form>
          </>

          <Form>
            <Col>
              <Form.Group as={Row} className="mb-3">
                <Form.Label as="legend" column xs={2}>
                  ระดับการอ่าน :
                </Form.Label>
                <Col sm={4}>
                  {/* {rateLanguage.map((item) => (
                    <Form.Check
                      defaultChecked={val.reading_rate}
                      type="radio"
                      label={item.label}
                      value={item.value}
                      name="formHorizontalRadios"
                      id="rateLanguage1"
                    />
                  ))} */}
                  {CheckRadio(val.reading_rate)}
                </Col>
              </Form.Group>
            </Col>
          </Form>
          <br />

          <Form>
            <Col>
              <Form.Group as={Row} className="mb-3">
                <Form.Label as="legend" column xs={2}>
                  ระดับการเขียน :
                </Form.Label>
                <Col sm={4}>
                  {/* {rateLanguage.map((item) => (
                    <Form.Check
                      defaultChecked={val.writing_rate}
                      type="radio"
                      label={item.label}
                      value={item.value}
                      name="formHorizontalRadios"
                      id="rateLanguage"
                    />
                  ))} */}

                  {CheckRadio(val.writing_rate)}
                </Col>
              </Form.Group>
            </Col>
          </Form>
          <br />

          <br />

          {/*  <Col xs={3}>
          <Form.Label>ทักษะด้านภาษา :</Form.Label>
          <Form.Select aria-label="degree">
            <option>เลือกภาษา</option>
            {editLanguage.map((itemDegree, index) => (
              <option key={index} value={`${itemDegree.language_id}`}>
                {itemDegree.language_name}
              </option>
            ))}
          </Form.Select>
        </Col> */}

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              color="secondary"
            >
              ยกเลิก
            </Button>
            <ColorButton
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
            >
              {" "}
              บันทึก
            </ColorButton>
          </Stack>
        </Form>
      ))}
    </>
  )
}

export default EditLanguageSkill