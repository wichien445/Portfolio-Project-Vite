import { Container, Panel, Stack, Row, Col, Grid, Divider, Tag } from "rsuite";
import DetailPersonal from "./add-info/tab-detail-employee/detail-employee";
import DetailEducation from "./add-info/tab-detail-employee/detail-education";
import DetailWorkExp from "./add-info/tab-detail-employee/detail-workexp";
import DetailCert from "./add-info/tab-detail-employee/detail-certificate";
import DetailSkillLanguage from "./add-info/tab-detail-employee/detail-language";

import token from "../../token-apiurl/token.jsx";
import apiUrl from "../../token-apiurl/apiurl.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";

const StyleCol = {
  backgroundColor: "rgb(250 ,250, 250 )",
  borderRadius: "25px",
  padding: "20px",
  margin: "10px",
};

function ViewEmployee() {
  const { id } = useParams();
  const [empViewPersonal, setViewPersonal] = useState([]);
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(apiUrl, { headers })
      .then((response) => response.json())
      .then((data) => setViewPersonal(data));
  }, []);

  let arrView = [];
  for (let i = 0; i < empViewPersonal.length; i++) {
    if (id == empViewPersonal[i].employee_id) {
      // console.log(empViewPersonal[i]);
      arrView.push(empViewPersonal[i]);
    }
  }

  //function เช็ค color onsite-status
  const CheckStatus = (data) => {
    let arrWorkStatus = [];

    if (data.workExperience != "") {
      data.workExperience.forEach((v, i) => {
        if (v.onsite_status == 0) {
          arrWorkStatus.push("green");
        }
        if (v.onsite_status == 1) {
          arrWorkStatus.push("yellow");
        }
      });
    } else {
      arrWorkStatus.push("red");
    }
    return arrWorkStatus;
  };

  //function เช็ค onsite-status
  const CheckStatusDetail = (data) => {
    let arrWorkStatusDetail = [];
    if (data.workExperience != "") {
      // console.log('workExperience',data.workExperience[0])
      if (data.workExperience[0].onsite_status == '0') {
        arrWorkStatusDetail.push("อยู่บริษัท");
        return arrWorkStatusDetail;
      } else {
        arrWorkStatusDetail.push("ไม่อยู่ที่บริษัท");
      }

    } else {
      arrWorkStatusDetail.push("รอสถานะ");
    }
    return arrWorkStatusDetail;
  };

  //function เช็คบริษัทลูกค้า หาก employee onsite
  const checkCustomer = (data) => {
    let arrCus = [];
    var v= data.workExperience[0]
    if (data.workExperience != "") {
      if (v.onsite_status == 0) {
        arrCus.push(v.company_name);
      }
      if (v.onsite_status == 1) {
        arrCus.push(v.customer_name);
      }
    } else {
      arrCus.push("ไม่มีข้อมูล");
    }
    return arrCus;
  };

  //function เช็ค ว/ด/ป เริ่มงานและสิ้นสุดการทำงาน
  const checkDate = (data) => {
    let arrDate = [];
    let eDate = [];
    // console.log(data.workExperience);
    if (data.workExperience != []) {
      var v= data.workExperience[0]
      if (v.onsite_status == 0) {
        if (v.start_date != null && v.end_date != null) {
          eDate = moment(v.end_date).format("YYYY-MM-DD");
          if (eDate == "0000-00-00") {
            arrDate.push(
              moment(v.start_date).format("DD/MM/YYYY"),
              " - ปัจจุบัน"
            );
          } else {
            arrDate.push(
              moment(v.start_date).format("DD/MM/YYYY"),
              " - ",
              moment(v.end_date).format("DD/MM/YYYY")
            );
          }
        } else if (v.start_date != null && v.end_date == null) {
          arrDate.push(
            moment(v.start_date).format("DD/MM/YYYY"),
            " - ปัจจุบัน"
          );
        } else if (v.start_date == null) {
          arrDate.push("ไม่พบข้อมูล");
        }
      } else {
        if (v.customer_start_date != null && v.customer_end_date != null) {
          eDate = moment(v.end_date).format("YYYY-MM-DD");
          if (eDate == "0000-00-00") {
            arrDate.push(
              moment(v.customer_start_date).format("DD/MM/YYYY"),
              " - ปัจจุบัน"
            );
          } else {
            arrDate.push(
              moment(v.customer_start_date).format("DD/MM/YYYY"),
              " - ",
              moment(v.customer_end_date).format("DD/MM/YYYY")
            );
          }
        } else if (
          v.customer_start_date != null &&
          v.customer_end_date == null
        ) {
          arrDate.push(
            moment(v.customer_start_date).format("DD/MM/YYYY"),
            " - ปัจจุบัน"
          );
        } else if (v.customer_start_date == null) {
          arrDate.push("ไม่พบข้อมูล");
        }
      }
    } else {
      arrDate.push("ไม่พบข้อมูล");
    }
    // return arrDate;
    return arrDate;
  };

  return (
    <div className="Content">
      <Container>
        <div className="headEmployeeDetail">
          <Panel
            bordered
            header={
              <Stack justifyContent="space-between">
                <span>
                  {arrView.map((ItemPersonal, index) => (
                    <Row key={index}>
                      <Col>
                        <div>
                          <h4>คุณ{ItemPersonal.employee_name}</h4>
                          <p style={{ color: "#575757" }}>
                            {ItemPersonal.position_name}
                          </p>
                        </div>
                      </Col>
                      <Col>
                        <Stack>
                          <Tag color={(onchange = CheckStatus(ItemPersonal))}>
                            {(onchange = CheckStatusDetail(ItemPersonal))}
                          </Tag>
                          <Divider vertical />
                          <h6 style={{ color: "#575757" }}>
                            {(onchange = checkCustomer(ItemPersonal))}
                            <br />
                            {(onchange = checkDate(ItemPersonal))}
                          </h6>
                        </Stack>
                      </Col>
                    </Row>
                  ))}
                </span>
              </Stack>
            }
          >
            <Grid fluid>
              <Row className="show-grid">
                <Col xsHidden xs={16}>
                  <DetailPersonal />
                </Col>
                <Col xs={8}>
                  <DetailEducation />
                </Col>
              </Row>

              <Row className="show-grid" gutter={30}>
                <Col xsHidden xs={7} style={StyleCol}>
                  <DetailSkillLanguage />
                </Col>
                <Col xs={8} style={StyleCol}>
                  <DetailWorkExp />
                </Col>
                <Col xs={7} style={StyleCol}>
                  <DetailCert />
                </Col>
              </Row>
            </Grid>
          </Panel>
        </div>
      </Container>
    </div>
  );
}
export default ViewEmployee;