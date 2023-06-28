import React, { useEffect, useState } from "react";
import "../../../css/style.css";
import { Table, Button, Drawer } from "rsuite";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import token from "../../../token-apiurl/token";
import apiUrl from "../../../token-apiurl/apiurl";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import AddWorkExp from "./add-in-edit/add-workexp";

function EditWorkExp() {
  //Update Framework Skill
  const [framework_id, setFramework_id] = useState("");

  const { id , EditTechnicId} = useParams();
  const [empPersonalWorkExp, setempPersonalWorkExp] = useState([]);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiUrl, { headers })
      .then((response) => response.json())
      .then((data) => setempPersonalWorkExp(data));
  }, []);

  let arrPersonal = [];
  for (let i = 0; i < empPersonalWorkExp.length; i++) {
    if (id == empPersonalWorkExp[i].employee_id) {
      // console.log(empPersonalWorkExp[i]);
      arrPersonal.push(empPersonalWorkExp[i]);
    }
  }

  let arr = [];
  for (let i = 0; i < arrPersonal.length; i++) {
    for (let j = 0; j < arrPersonal[i].workExperience.length; j++) {
      arr.push(arrPersonal[i]?.workExperience[j]);
    }
  }
  // console.log("arr workExperience  : ", arr);

/*   let arrZero = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].work_exp_id == 0) {
      arrZero.push(arr[i]);
    }
  }
  // console.log("arrZero workExperience (งานปัจจุบัน) : ", arrZero);

  let arrNotZero = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].work_exp_id != 0) {
      arrNotZero.push(arr[i]);
    }
  }
  // console.log("arrNotZero workExperience (ประสบกาณ์ทำงาน) :  ", arrNotZero); */

  const CheckStatusDetail = (data) => {
    let arrWorkStatusDetail = [];
    if (data.workExperience != "") {
      if (data == 0) {
        arrWorkStatusDetail.push("อยู่ที่บริษัท");
      } else {
        arrWorkStatusDetail.push("ไม่อยู่ที่บริษัท");
      }
    } else {
      arrWorkStatusDetail.push("ไม่มีข้อมูล");
    }
    return arrWorkStatusDetail;
  };

  const CheckEndDetail = (data) => {
    let newData = moment(data).format("YYYY-MM-DD");
    let arrEndDetail = [];
    if (data != "") {
      if (newData == "0000-00-00") {
        arrEndDetail.push("ไม่มีข้อมูล");
      } else {
        arrEndDetail.push(newData);
      }
    } else {
      arrEndDetail.push("ไม่มีข้อมูล");
    }
    return moment(arrEndDetail).format("DD/MM/YYYY");
  };

  const CheckEndDate = (data) => {
    let newData = moment(data).format("YYYY-MM-DD");
    let arrEndDate = [];
    if (data != "") {
      if (newData == "0000-00-00") {
        arrEndDate.push("ไม่มีข้อมูล");
      } else {
        arrEndDate.push(newData);
      }
    } else {
      arrEndDate.push("ไม่มีข้อมูล");
    }
    return arrEndDate;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put('https://portfolio.blackphoenix.digital/appendTechSkills', {
        employee_Id: id,
        language_skill_id: EditTechnicId,
        language_id: EditTechnicId,
        framework_id: framework_id,
        update_user_id: id
      });

      console.log(response.data.message);
       alert(`แก้ไขข้อมูลสำเร็จ`);
    } catch (error) {
      console.error(error.response.data.message);
      alert(`แก้ไขข้อมูลไม่สำเร็จ`);
    }
  };
  return (
    <div>
      <AddWorkExp/>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">ลำดับ</th>
            <th scope="col">ชื่อบริษัท</th>
            <th scope="col">ตำแหน่ง</th>
            <th scope="col">วันที่เริ่มทำงาน</th>
            <th scope="col">วันสิ้นสุดการทำงาน</th>
            <th scope="col">สถานะการทำงาน</th>
            <th scope="col">ชื่อบริษัทลูกค้า</th>
            <th scope="col">วันที่เริ่มทำงาน (บริษัทลูกค้า)</th>
            <th scope="col">วันสิ้นสุดการทำงาน (บริษัทลูกค้า)</th>
            <th scope="col">แก้ไข</th>
            <th scope="col">ลบ</th>
          </tr>
        </thead>
        {arr.map((item, index) => (
          <tbody key={index}>
            <tr>
            <td>{item.work_exp_id}</td>
              <td>{item.company_name}</td>
              <td>{item.position_name}</td>
              <td>{moment(item.start_date).format("DD/MM/YYYY")}</td>
              <td>{CheckEndDetail(item.end_date)}</td>
              <td>{CheckStatusDetail(item.onsite_status)}</td>
              <td>{item.customer_name}</td>
              <td>{moment(item.customer_start_date).format("DD/MM/YYYY")}</td>
              <td>{CheckEndDate(item.customer_end_date)}</td>
              <td width={50}>
                <Link
                  to={`/EditEmployee/${id}/EditWorkExp/${item.work_exp_id}`}
                >
                  <Button>
                    <FaRegEdit />
                  </Button>
                </Link>
              </td>
              <td width={50}>
                <Button>
                  <FaRegTrashAlt />
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default EditWorkExp