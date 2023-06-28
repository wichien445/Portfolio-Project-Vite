import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import token from "../../../../token-apiurl/token";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import apiUrl from "../../../../token-apiurl/apiurl";
import moment from "moment";
import axios from "axios";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function EditWorkExp() {
  const { id, EditWorkExpId } = useParams();
  const [editFormWorkExp, setEditFormWorkExp] = useState([]);
  const [editPosition, setEditPosition] = useState([]);
  const [editCustomer, setEditCustomer] = useState([]);
  const [validated, setValidated] = useState(false);
  const [statusValue, setStatusValue] = useState(false);

  //Update WorkExperience
  const updatecompanyname = useRef();
  const updatePosition_id = useRef();
  const updateDepartment_name = useRef();
  const updateStartDate = useRef();
  const updateEndDate = useRef();
  const updateDetail = useRef();
  const updateOnsite_status = useRef();
  const updateCustomer_id = useRef();
  const updateCustomerStartDate = useRef();
  const updateCustomerEndDate = useRef();

  const apiPosition = "https://portfolio.blackphoenix.digital/getPosition";
  const apiCustomer = "https://portfolio.blackphoenix.digital/getCustomer";

  /*  const formHandler = useCallback(
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
          work_exp_id: EditWorkExpId,
          company_name: updatecompanyname.current?.value,
          position_id: updatePosition_id.current?.value,
          department_name: updateDepartment_name.current?.value,
          start_date: updateStartDate.current?.value,
          end_date: updateEndDate.current?.value,
          responsibility_detail: updateDetail.current?.value,
          onsite_status: updateOnsite_status.current?.value,
          customer_id: updateCustomer_id.current?.value,
          customer_start_date: updateCustomerStartDate.current?.value,
          customer_end_date: updateCustomerEndDate.current?.value,
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
    fetch(apiUrl, { headers })
      .then((response) => response.json())
      .then((data) => setEditFormWorkExp(data));
  }, []);
  // console.log("edit workExp",editFormWorkExp )

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

  //GET WorkExp
  let arr = [];
  for (let i = 0; i < editFormWorkExp.length; i++) {
    for (let j = 0; j < editFormWorkExp[i].workExperience.length; j++) {
      arr.push(editFormWorkExp[i]?.workExperience[j]);
    }
  }
  // console.log("arr workExp : ", arr);

  let arrWorkExp = [];
  for (let i = 0; i < arr.length; i++) {
    if (id == arr[i].employee_id) {
      arrWorkExp.push(arr[i]);
    }
  }
  // console.log("data WorkExp",arrWorkExp)

  let arrWorkExpId = [];
  for (let i = 0; i < arrWorkExp.length; i++) {
    if (EditWorkExpId == arrWorkExp[i].work_exp_id) {
      arrWorkExpId.push(arrWorkExp[i]);
    }
  }
  // console.log("data WorkExperience by ID :", arrWorkExpId);

  let arrWorkStatus;
  //Check OnSite Status
  const CheckStatus = (data) => {
    let WorkStatus = data.onsite_status;
    // console.log("data", WorkStatus);
    arrWorkStatus = false;
    if (WorkStatus == 0) {
      arrWorkStatus = false;
    } else if (WorkStatus == 1) {
      arrWorkStatus = true;
    } else {
      arrWorkStatus = false;
    }
    // console.log(arrWorkStatus)
    return arrWorkStatus;
  };

  const sendValue = (data) => {
    if (data == true) {
      return 1;
    } else {
      return 0;
    }
  };

  const formHandler = useCallback(
    () => (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() != false) {
        try {
          const response = axios.put(
            `https://portfolio.blackphoenix.digital/updateWork_experience`,
            {
              employee_Id: id,
              work_exp_id: EditWorkExpId,
              company_name: updatecompanyname.current?.value,
              position_id: updatePosition_id.current?.value,
              department_name: updateDepartment_name.current?.value,
              start_date: updateStartDate.current?.value,
              end_date: updateEndDate.current?.value,
              responsibility_detail: updateDetail.current?.value,
              onsite_status: updateOnsite_status.current?.value,
              customer_id: updateCustomer_id.current?.value,
              customer_start_date: updateCustomerStartDate.current?.value,
              customer_end_date: updateCustomerEndDate.current?.value,
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
      {arrWorkExpId.map((val, index) => (
        <Form noValidate validated={validated} onSubmit={formHandler()} key={index}>
          <Row>
            <Col xs={3}>
              <Form.Label>ชื่อบริษัท :</Form.Label>
              <Form.Control
                className="mb-2"
                id="company"
                placeholder="บริษัท"
                defaultValue={val.company_name}
                ref={updatecompanyname}
              />

              <Form.Label>ตำแหน่ง :</Form.Label>
              <Form.Select
                aria-label="position"
                required
                ref={updatePosition_id}
                defaultValue={val.position_id}
              >
                <option>{val.position_name}</option>
                {editPosition.map((itemUniversity, index) => (
                  <option key={index} value={`${itemUniversity.position_id}`}>
                    {itemUniversity.position_name}
                  </option>
                ))}
              </Form.Select>

              <Form.Label>วันที่เริ่มงาน :</Form.Label>
              <Form.Control
                className="mb-2"
                name="startdate"
                id="startdate"
                type="date"
                defaultValue={moment(val.start_date).format("YYYY-MM-DD")}
                required
                ref={updateStartDate}
              />

              <Form.Label>วันสิ้นสุดการทำงาน :</Form.Label>
              <Form.Control
                className="mb-2"
                name="enddate"
                id="enddate"
                type="date"
                defaultValue={moment(val.end_date).format("YYYY-MM-DD")}
                
                ref={updateEndDate}
              />

              <Form.Label>รายละเอียดการทำงาน :</Form.Label>
              <Form.Control
                className="mb-2"
                name="datail"
                id="datail"
                rows="3"
                as="textarea"
                defaultValue={val.responsibility_detail}
                ref={updateDetail}
              ></Form.Control>
            </Col>

            <Col xs={3}>
              <Col>
                <Form.Label>สถานะการทำงาน :</Form.Label>
                <Form.Check
                  type="switch"
                  checkedChildren="อยู่หน้างาน"
                  unCheckedChildren="อยู่บริษัท"
                  defaultChecked={(onchange = CheckStatus(val))}
                  // value={val.onsite_status}
                  value={sendValue(statusValue)}
                  ref={updateOnsite_status}
                  onClick={() => setStatusValue(!statusValue)}
                />
              </Col>
              {/* {statusValue ? "True" : "False"} */}
              <Form>
                <Col>
                  <Form.Label>ชื่อบริษัทลูกค้า :</Form.Label>
                  <Form.Select
                    aria-label="company"
                    ref={updateCustomer_id}
                    defaultValue={val.customer_id}
                  >
                    <option>{val.customer_name}</option>
                    {editCustomer.map((itemUniversity, index) => (
                      <option
                        key={index}
                        value={`${itemUniversity.customer_id}`}
                      >
                        {itemUniversity.customer_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Form.Label>วันที่เริ่มงาน :</Form.Label>
                <Form.Control
                  className="mb-2"
                  name="startdate"
                  id="startdate"
                  type="date"
                  defaultValue={moment(val.customer_start_date).format(
                    "YYYY-MM-DD"
                  )}
                  ref={updateCustomerStartDate}
                />
                <Form.Label>วันสิ้นสุดการทำงาน :</Form.Label>
                <Form.Control
                  className="mb-2"
                  name="enddate"
                  id="enddate"
                  type="date"
                  defaultValue={moment(val.customer_end_date).format(
                    "YYYY-MM-DD"
                  )}
                  ref={updateCustomerEndDate}
                />
              </Form>
            </Col>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                color="secondary"
              >
                ยกเลิก
              </Button>
              <ColorButton
                variant="contained"
                type="submit"
                endIcon={<SendIcon />}
              >
                {" "}
                บันทึก
              </ColorButton>
            </Stack>
          </Row>
        </Form>
      ))}
    </div>
  )
}

export default EditWorkExp