import React from "react";
import "../../../../css/style.css";
import { Button, Table } from "rsuite";
import { mockUsers } from "./mock";
import AddStep2 from "../add-button-step/add-step-2";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Stack, styled } from "@mui/material";
import { purple } from "@mui/material/colors";

//data education table
const data = mockUsers(1);
const { Column, HeaderCell, Cell } = Table;

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function StepTwo({ nextStep, handleFormData, prevStep, values }) {
  return (
    <>
      <div className="InfoStep2">
        <div className="addEducation">
          <AddStep2 />
        </div>
        {/* End addEducation */}
        <div className="showEducation">
          <Table
            height={400}
            data={data}
            onRowClick={(rowData) => {
              console.log(rowData);
            }}
          >
            <Column width={60} align="center" fixed>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={150}>
              <HeaderCell>Degree</HeaderCell>
              <Cell dataKey="firstName" />
            </Column>

            <Column width={200}>
              <HeaderCell>School/University</HeaderCell>
              <Cell dataKey="lastName" />
            </Column>

            <Column width={200}>
              <HeaderCell>Faculty</HeaderCell>
              <Cell dataKey="gender" />
            </Column>

            <Column width={200}>
              <HeaderCell>Major</HeaderCell>
              <Cell dataKey="age" />
            </Column>

            <Column width={150}>
              <HeaderCell>GPAX</HeaderCell>
              <Cell dataKey="postcode" />
            </Column>

            {/* <Column width={300}>
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
            </Column> */}
          </Table>
        </div>{" "}

      <div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">วุฒิการศึกษา</th>
            <th scope="col">มหาวิทยาลัย</th>
            <th scope="col">คณะ</th>
            <th scope="col">สาขาวิชา</th>
            <th scope="col">เกรดเฉลี่ย</th>
          </tr>
        </thead>
        {/* {arr.map((item, index) => ( */}
          <tbody >
            <tr>
              <th scope="row">{"item.education_id"}</th>
              <td>{"item.degree_name"}</td>
              <td>{"item.university_name"}</td>
              <td>{"item.faculty_name"}</td>
              <td>{"item.major_name"}</td>
              <td>{"item.gpax"}</td>
            </tr>
          </tbody>
        {/* ))}  */}
      </table>
    </div> 
        {/* End showEducation */}
        <Stack direction="row" spacing={2} style={{ display: "flex", justifyContent: "center", padding:"20px" }}>
              <Button
                variant="outlined"
                startIcon={<SkipPreviousIcon />}
                color="secondary"
                onClick={prevStep}
              >
                ย้อนกลับ
              </Button>
              <ColorButton
                variant="contained"
                type="submit"
                endIcon={<SkipNextIcon />}
                onClick={nextStep}
              >
                ถัดไป
              </ColorButton>
            </Stack>
        
        
      </div>
      {/* End InfoStep2 */}
    </>
  )
}

export default StepTwo