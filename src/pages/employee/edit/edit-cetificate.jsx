import React, { useEffect, useState } from "react";
import "../../../css/style.css";
import { Button } from "rsuite";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import token from "../../../token-apiurl/token";
import apiUrl from "../../../token-apiurl/apiurl";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import AddCertificate from "./add-in-edit/add-certificate";

function EditCertificate() {
  const { id } = useParams();
  const [empPersonalCert, setempPersonalCert] = useState([]);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiUrl, { headers })
      .then((response) => response.json())
      .then((data) => setempPersonalCert(data));
  }, []);

  let arrPersonal = [];
  for (let i = 0; i < empPersonalCert.length; i++) {
    if (id == empPersonalCert[i].employee_id) {
      // console.log(empPersonalCert[i]);
      arrPersonal.push(empPersonalCert[i]);
    }
  }

  let arr = [];
  for (let i = 0; i < arrPersonal.length; i++) {
    for (let j = 0; j < arrPersonal[i].cerTificate.length; j++) {
      arr.push(arrPersonal[i]?.cerTificate[j]);
    }
  }
  // console.log("arr cerTificate : ", arr);
  return (
    <div>
      <AddCertificate/>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">หลักสูตร</th>
            <th scope="col">สถาบันการฝึกอบรม</th>
            <th scope="col">วันที่อบรม</th>
            <th scope="col">วันจบหลักสูตรการอบรม</th>
            <th scope="col">แก้ไข</th>
            <th scope="col">ลบ</th>
          </tr>
        </thead>
        {arr.map((item, index) => (
          <tbody key={index}>
            <tr>
              <th scope="row">{item.certificate_id}</th>
              <td>{item.certificate_name}</td>
              <td>{item.organization}</td>
              <td>{moment(item.start_date).format("DD/MM/YYYY")}</td>
              <td>{moment(item.end_date).format("DD/MM/YYYY")}</td>
              <td width={50}>
                <Link to={`/EditEmployee/${id}/EditCertificate/${item.certificate_id}`}>
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

export default EditCertificate