import React, { useEffect, useState } from "react";
import "../../../css/style.css";
import { Button } from "rsuite";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import token from "../../../token-apiurl/token";
import apiUrl from "../../../token-apiurl/apiurl";
import { Link, useParams } from "react-router-dom";
import AddLanguage from "./add-in-edit/add-language";

function EditLanguage() {
  const { id } = useParams();
  const [empPersonalSkillLanguage, setempPersonalSkillLanguage] = useState([]);
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiUrl, { headers })
      .then((response) => response.json())
      .then((data) => setempPersonalSkillLanguage(data));
  }, []);

  
  let arrPersonal = [];
  for (let i = 0; i < empPersonalSkillLanguage.length; i++) {
    if (id == empPersonalSkillLanguage[i].employee_id) {
      // console.log(empPersonalSkillLanguage[i]);
      arrPersonal.push(empPersonalSkillLanguage[i]);
    }
  }

  let arr = [];
  for (let i = 0; i < arrPersonal.length; i++) {
    for (let j = 0; j < arrPersonal[i].languageSkill.length; j++) {
      arr.push(arrPersonal[i]?.languageSkill[j]);
    }
  }
  // console.log("arr languageSkill : ", arr);

  //รับค่ามาเช็ค ระดับทักษะทางภาษา
  const checkRateLanguge = (data) => {
    let arrRate = [];
    if (data == 1) {
      arrRate.push("พื้นฐาน");
    } else if (data == 2) {
      arrRate.push("พอใช้");
    } else if (data == 3) {
      arrRate.push("ดี");
    } else if (data == 4) {
      arrRate.push("ดีมาก");
    } else {
      arrRate.push("ไม่มีข้อมูล");
    }
    return arrRate;
  };
  return (
    <div>
      <AddLanguage/>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">ภาษา</th>
            <th scope="col">การฟัง</th>
            <th scope="col">การพูด</th>
            <th scope="col">การอ่าน</th>
            <th scope="col">การเขียน</th>
            <th scope="col">แก้ไข</th>
            <th scope="col">ลบ</th>
          </tr>
        </thead>
        {arr.map((item, index) => (
          <tbody key={index}>
            <tr>
              <th scope="row">{item.language_skill_id}</th>
              <td>{item.language_name}</td>
              <td>{checkRateLanguge(item.listening_rate)}</td>
              <td>{checkRateLanguge(item.speaking_rate)}</td>
              <td>{checkRateLanguge(item.reading_rate)}</td>
              <td>{checkRateLanguge(item.writing_rate)}</td>
              <td width={50}>
                <Link to={`/EditEmployee/${id}/EditLanguageSkill/${item.language_skill_id}`}>
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

export default EditLanguage