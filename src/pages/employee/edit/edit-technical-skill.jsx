import React, { useEffect, useState } from "react";
import "../../../css/style.css";
import { Button, Tag } from "rsuite";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import token from "../../../token-apiurl/token";
import apiUrl from "../../../token-apiurl/apiurl";
import { Link, useParams } from "react-router-dom";
import AddTechnical from "./add-in-edit/add-technical";

function EditTechnical() {
    const { id } = useParams();
  const [empPersonalSkillCom, setempPersonalSkillCom] = useState([]);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiUrl, { headers })
      .then((response) => response.json())
      .then((data) => setempPersonalSkillCom(data));
  }, []);

  let arrPersonal = [];
  for (let i = 0; i < empPersonalSkillCom.length; i++) {
    if (id == empPersonalSkillCom[i].employee_id) {
      // console.log(empPersonalSkillCom[i]);
      arrPersonal.push(empPersonalSkillCom[i]);
    }
  }

  let arr = [];
  for (let i = 0; i < arrPersonal.length; i++) {
    for (let j = 0; j < arrPersonal[i].technicalSkill.length; j++) {
      arr.push(arrPersonal[i]?.technicalSkill[j]);
    }
  }
  // console.log("arr technicalSkill : ", arr);

  let skill = arr;
  let arrSkill = [];
  skill.forEach((val, index) => {
    if (arrSkill.find((v, i) => v.id == val.category_name)) {
      let i = arrSkill.findIndex((v, i) => v.id == val.category_name);
      arrSkill[i].val.push(val.framework_name);
    } else
      arrSkill.push({
        id: val.category_name,
        val: [val.framework_name],
        cate: [val.category_id],
      });
  });
  // console.log("arrSkill", arrSkill);

  return (
    <div>
      <AddTechnical/>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">ประเภท</th>
            <th scope="col">ทักษะ</th>
            <th scope="col">แก้ไข</th>
            <th scope="col">ลบ</th>
          </tr>
        </thead>
        {arrSkill.map((item, index) => (
          <tbody key={index}>
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{item.id}</td>
              <td>
                {item.val.map((skill, index) => (
                  <Tag color="violet">{skill}</Tag>
                ))}
              </td>
              <td width={50}>
                <Link to={`/EditEmployee/${id}/EditTechnical/${item.cate}`}>
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

export default EditTechnical