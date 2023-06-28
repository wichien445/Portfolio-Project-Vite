import React, { useState, useEffect } from 'react'
import "../../css/style.css"
import { Link } from "react-router-dom"
import {
    Panel,
    Row,
    Col,
    IconButton,
    Dropdown,
    Grid,
    Badge,
    Avatar,
    Stack,
    MultiCascader,
} from "rsuite";
import PlusIcon from "@rsuite/icons/Plus"
import MoreIcon from "@rsuite/icons/More"
import EditIcon from "@rsuite/icons/Edit"
import UserInfoIcon from "@rsuite/icons/UserInfo"
import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline"
import EmailFillIcon from "@rsuite/icons/EmailFill"
import PhoneFillIcon from "@rsuite/icons/PhoneFill"
//Token
import token from "../../token-apiurl/token.jsx"
import apiUrl from "../../token-apiurl/apiurl.jsx"

const RenderIconButton = (props, ref) => {
    return (
        <IconButton appearance="subtle" {...props} ref={ref} icon={<MoreIcon />} />
    )
}

const linkStyle = {
    textDecoration: "none",
}

var cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "200px",
}

function Employee() {
    const [sortField, setSortField] = useState("")
    const [empList, setempList] = useState([])

    //GET ข้อมูลพนักงานทั้งหมด
    useEffect(() => {
        const headers = { Authorization: `Bearer ${token}` };
        fetch(apiUrl, { headers })
            .then((response) => response.json())
            .then((data) => setempList(data));
    }, [])

    //Get technicalSkill เก็บไว้ใน arr
    let arr = [];
    for (let i = 0; i < empList.length; i++) {
        for (let j = 0; j < empList[i].technicalSkill.length; j++) {
            arr.push(empList[i]?.technicalSkill[j]);
        }
    }
    // console.log("arr : ", arr);
    
  //GET Category Technical Skill
  const CheckFramework = (data) => {
    let arrFramework = [];
    data.technicalSkill.forEach((v, i) => {
      if (v.framework_name == null) {
        arrFramework.push("ไม่มีข้อมูล");
      }
      arrFramework.push(v.framework_name);
    });
    // console.log("emp", arrGpax);
    return arrFramework.join(" , ");
  };

  const handSort = (field) => {
    const sortedItems = [...empList].sort((a, b) =>
      a[field] > b[field] ? 1 : -1
    );
    setempList(sortedItems);
    setSortField(field);
  };


  //เช็ค onsite status
  const CheckStatus = (data) => {
    let arrWorkStatus = [];
    if (data.workExperience !== "") {
      data.workExperience.forEach((v, i) => {
        if (v.onsite_status === 0) {
          arrWorkStatus.push("green");
        }
        if (v.onsite_status === 1) {
          arrWorkStatus.push("yellow");
        }
      });
    } else {
      arrWorkStatus.push("red");
    }
    return arrWorkStatus;
  };

  const options = [
    {
      label: "ตำแหน่ง",
      value: "position",
      children: [
        {
          label: "Front Web Developer",
          value: "Front Web Developer",
          children: [
            {
              label: "สุจินันท์",
              value: "สุจินันท์",
            },
            {
              label: "พุธิตา",
              value: "พุธิตา",
            },
          ],
        },
        {
          label: "Back End Developer",
          value: "Back End Developer",
          children: [
            {
              label: "อัครเดช",
              value: 6,
            },
            {
              label: "คณิน",
              value: 7,
            },
            {
              label: "สิทธิพงศ์",
              value: 8,
            },
          ],
        },
      ],
    },
    {
      label: "ทักษะ",
      value: "skill",
      children: [
        {
          label: "CSS",
          value: "CSS",
          children: [
            {
              label: "สุจินันท์",
              value: "สุจินันท์",
            },
            {
              label: "พุธิตา",
              value: "พุธิตา",
            },
          ],
        },
        {
          label: "JavaScript",
          value: 11,
          children: [
            {
              label: "อัครเดช",
              value: 14,
            },
            {
              label: "คณิน",
              value: 15,
            },
            {
              label: "สิทธิพงศ์",
              value: 16,
            },
          ],
        },
      ],
    },
  ];
  return (
    <div className="Content">
      <div className="addButton">
        <Stack gap={3} spacing={12}>
          <Link to="/Information">
            <IconButton icon={<PlusIcon />} appearance="primary" color="violet">
              Add
            </IconButton>
          </Link>

          <div>
            <Stack spacing={5}>
              <span>เรียงลำดับตาม: </span>
              <select
                className="form-control"
                value={sortField}
                onChange={(e) => handSort(e.target.value)}
              >
                <option value="" disabled>
                  เลือกรายการ
                </option>
                <option value="name">ชื่อ</option>
                <option value="position_name">ตำแหน่ง</option>
                <option value="email">สถานะการทำงาน</option>
              </select>
            </Stack>
          </div>
          <MultiCascader
            style={{ width: 250 }}
            placeholder="เลือกตำแหน่ง, ทักษะ"
            data={options}
            menuWidth={250}
            onCheck={(value) => {
              // console.log(value); // console แสดงค่า filters
              handSort(value);
            }}
          />
        </Stack>
      </div>

      <div>
        {empList.map((ItemP, index) => (
          <Panel
            key={index}
            shaded
            bordered
            bodyFill
            style={{ display: "inline-block", width: 300, margin: "1rem" }}
            id="Container"
          >
            <Grid fluid>
              <div className="cardIMG">
                <Row gutter={24}>
                  <Col xs={6}>
                    <div className="AvatarImg">
                      <Badge color={CheckStatus(ItemP)}>
                        <Avatar size="lg" circle src={ItemP.picture} />
                      </Badge>{" "}
                    </div>
                  </Col>
                  <Col>
                    <div className="cardDropdown">
                      <Dropdown
                        renderToggle={RenderIconButton}
                        placement="bottomEnd"
                      >
                        <Link
                          to={`/ViewEmployee/${ItemP.employee_id}`}
                          style={linkStyle}
                        >
                          <Dropdown.Item icon={<UserInfoIcon />}>
                            ดูข้อมูล
                          </Dropdown.Item>
                        </Link>
                        <Link
                          to={`/EditEmployee/${ItemP.employee_id}`}
                          style={linkStyle}
                        >
                          <Dropdown.Item icon={<EditIcon />}>
                            แก้ไข
                          </Dropdown.Item>
                        </Link>
                        <Dropdown.Item icon={<CollaspedOutlineIcon />}>
                          ลบ
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                  </Col>
                </Row>
              </div>
            </Grid>
            <Panel>
              <div className="card-body" style={cardStyle}>
                <p className="card-text">ชื่อ: {ItemP?.employee_name}</p>
                <p className="card-text">ตำแหน่ง: {ItemP?.position_name}</p>
                <p
                  className="card-text"
                  // style={{ height: "3vw" }}
                >
                  ทักษะ:&nbsp;{(onchange = CheckFramework(ItemP))}
                </p>
                <p className="card-text">
                  <EmailFillIcon /> {ItemP?.email}
                </p>
                <p className="card-text">
                  <PhoneFillIcon /> {ItemP?.phone}
                </p>
              </div>
            </Panel>
          </Panel>
        ))}
      </div>
    </div>
  )
}

export default Employee