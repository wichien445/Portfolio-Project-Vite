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

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function EditTechnical() {
    const { id, EditTechnicId } = useParams();
  const [empPersonalSkillLanguage, setempPersonalSkillLanguage] = useState([]);
  const [editCategory, setEditCategory] = useState([]);
  const [editFramework, setEditFramework] = useState([]);
  const [validated, setValidated] = useState(false);
  const [updatetoData, setUpdatetoData] = useState({});

  //Update Technical Skill
  const UpdateCategory_id = useRef();
  const UpdateFramework_id = useRef();

  const apiCategory = "https://portfolio.blackphoenix.digital/getCategory";
  const apiFramework = "https://portfolio.blackphoenix.digital/getFramework";

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
    for (
      let j = 0;
      j < empPersonalSkillLanguage[i].technicalSkill.length;
      j++
    ) {
      arr.push(empPersonalSkillLanguage[i]?.technicalSkill[j]);
    }
  }
  // console.log("arr Education : ", arr);

  let arrWork = [];
  for (let i = 0; i < arr.length; i++) {
    if (id == arr[i].employee_id) {
      arrWork.push(arr[i]);
    }
  }
  // console.log("data Edu",arrWork)

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

  //GET Category by ID
  let arrWorkID = [];
  for (let i = 0; i < editCategory.length; i++) {
    if (EditTechnicId == editCategory[i].category_id) {
      arrWorkID.push(editCategory[i].category_name);
    }
  }
  // console.log("data language by ID :", arrWorkID);

  //GET Framework by ID
  let arrFrameWorkID = [];
  for   ( let i = 0;  i < arrWork.length; i++) {
    if (EditTechnicId == arrWork[i].category_id) {
      arrFrameWorkID.push(arrWork[i].framework_name);
    }
  }
  // console.log("data Framework by ID :", arrFrameWorkID);


  //check Framework checked
  const   checkFramework = async (dataFrameWork) => {
    let skill = dataFrameWork.framework_name;
    console.log(skill, arrFrameWorkID)
    // console.log(skill, arrFrameWorkID, arrFrameWorkID.filter((v)=> v == skill))
    // if (arrFrameWorkID.filter((v)=> v == skill).length > 0) {
    //  return true;
    // }
    // else return false;
    if (arrFrameWorkID.find((v, i) => v == skill)) {
      let skillID = skill;
      var arrFramework = false;
      // console.log(skillID)
      // console.log(dataFrameWork.framework_name);
      // console.log(arrFrameWorkID);
      if (skill == skillID) {
        // console.log("skill:", skill, "\n Skill ID:", skillID);
        arrFramework = true;
      } else {
        // arrFramework.push("false");
        arrFramework = false;
      }
    } else {
      // arrFramework.push("false");
      arrFramework = false;
    }
    return arrFramework;
  };

  const updateData = (e) => {
    setUpdatetoData({
      ...updatetoData,
      [e.target.name]: e.target.value,
    });
  };

  const formHandler = useCallback(
    () => (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() == false) {
        // console.log("yes");
        event.preventDefault();
        event.stopPropagation();
      } else {
        // event.preventDefault();
        // for (var i = 0; i < 2; i++) {
        const data = {
          employee_Id: id,
          technical_skill_id: UpdateCategory_id.current?.value,
          // technical_skill_id: 1,
          category_id: EditTechnicId,
          framework_id: updatetoData,
          // update_user_id: id,
        };

        console.log(data);
        // }
      }

      setValidated(true);
    },
    []
  );
  return (
    <>
      <Form noValidate validated={validated} onSubmit={formHandler()}>
        <Form>
          {arrWork.map((val, index) => (
            <Form.Control
              key={index}
              className="mb-2"
              id="gpax"
              placeholder="id"
              defaultValue={val.technical_skill_id}
              ref={UpdateCategory_id}
              hidden
            />
          ))}
        </Form>

        {/* {arrWorkID.map((val, index) => ( */}
        <Col xs={3}>
          <Form.Label>ทักษะด้านคอมพิวเตอร์ :</Form.Label>
          <Form.Control
            // key={index}
            className="mb-2"
            id="gpax"
            placeholder="ทักษะ"
            defaultValue={arrWorkID}
            disabled
          />
        </Col>

        <br />
        <Form>
          <Col>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column xs={2}>
                เครื่องมือ/ชุดคำสั่ง :
              </Form.Label>
              <Col sm={4}>
                {/* {CheckRadio(editFramework)} */}
                {editFramework.length > 0 && (
                  <div>
                    {editFramework.map((item, index) => (
                      <Form.Check
                        key={index}
                        defaultChecked={checkFramework(item)}
                        label={item.framework_name}
                        value={item.framework_id}
                        name={item.framework_name}
                        id="{item.framework_id}"
                        onClick={updateData}
                        // onChange={updateData(index)}
                        // onChange={(e) =>
                        //   setUpdatetoData({...updatetoData, index})
                        // }

                        // required
                        // ref={UpdateFramework_id}
                      />
                    ))}
                  </div>
                )}
              </Col>
            </Form.Group>
          </Col>
        </Form>
        <br />

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

      {/* {updatetoData == 0
        ? "0"
        : updatetoData == 1
        ? "1"
        : updatetoData == 2
        ? "2"
        : updatetoData == 3
        ? 3
        : "11"} */}
    </>
  )
}

export default EditTechnical