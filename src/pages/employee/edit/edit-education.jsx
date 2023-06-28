import React, { useEffect, useState } from "react";
import "../../../css/style.css";
import AddEducation from "../edit/add-in-edit/add-education";
import { Button} from "rsuite";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import token from "../../../token-apiurl/token";
import apiUrl from "../../../token-apiurl/apiurl";

function EditEducation() {
    const { id } = useParams();
  const [empPersonalEducate, setempPersonalEducate] = useState([]);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiUrl, { headers })
      .then((response) => response.json())
      .then((data) => setempPersonalEducate(data));
  }, []);

  let arrPersonal = [];

  for (let i = 0; i < empPersonalEducate.length; i++) {
    if (id == empPersonalEducate[i].employee_id) {
      // console.log(empPersonalEducate[i]);
      arrPersonal.push(empPersonalEducate[i]);
    }
  }

  let arr = [];
  for (let i = 0; i < arrPersonal.length; i++) {
    for (let j = 0; j < arrPersonal[i].eduCation.length; j++) {
      arr.push(arrPersonal[i]?.eduCation[j]);
    }
  }
  // console.log("arr Education : ", arr);
  return (
    <div>
      <AddEducation/>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">วุฒิการศึกษา</th>
            <th scope="col">มหาวิทยาลัย</th>
            <th scope="col">คณะ</th>
            <th scope="col">สาขาวิชา</th>
            <th scope="col">เกรดเฉลี่ย</th>
            <th scope="col">แก้ไข</th>
            <th scope="col">ลบ</th>
          </tr>
        </thead>
        {arr.map((item, index) => (
          <tbody key={index}>
            <tr>
              <th scope="row">{item.education_id}</th>
              <td>{item.degree_name}</td>
              <td>{item.university_name}</td>
              <td>{item.faculty_name}</td>
              <td>{item.major_name}</td>
              <td>{item.gpax}</td>
              <td width={50}>
                <Link to={`/EditEmployee/${id}/EditEducate/${item.education_id}`}>
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

export default EditEducation