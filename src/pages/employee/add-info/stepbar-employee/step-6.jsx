import React from "react";

import AddStep6 from "../add-button-step/add-step-6";
import { mockUsers } from "./mock";
import { Button, Table, Stack } from "rsuite";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import HomeIcon from '@mui/icons-material/Home';
import {styled } from "@mui/material";
import { purple } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

//data education table
const data = mockUsers(1);
const { Column, HeaderCell, Cell } = Table;

function StepSix({ nextStep, handleFormData, prevStep, values }) {
  return (
    <>
      <div className="InfoStep6">
        <Stack spacing={5}>
        <div className="AddWorkExperience">
              <AddStep6 />
            </div>
          <p>(กรุณากรอกข้อมูลโดยเริ่มจากงานปัจจุบัน)</p>
          
            
        </Stack>
        {/* End AddWorkExperience */}
        <div className="ShowWorkExperience">
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
              <HeaderCell>Company</HeaderCell>
              <Cell dataKey="firstName" />
            </Column>

            <Column width={150}>
              <HeaderCell>Position</HeaderCell>
              <Cell dataKey="lastName" />
            </Column>

            <Column width={100}>
              <HeaderCell>Start Date</HeaderCell>
              <Cell dataKey="gender" />
            </Column>

            <Column width={100}>
              <HeaderCell>End Date</HeaderCell>
              <Cell dataKey="age" />
            </Column>

            <Column width={150}>
              <HeaderCell>Status</HeaderCell>
              <Cell dataKey="postcode" />
            </Column>

            <Column width={300}>
              <HeaderCell>Customer</HeaderCell>
              <Cell dataKey="email" />
            </Column>
            
          </Table>
        </div>{" "}
        {/* End ShowWorkExperience */}
        <Stack
          direction="row"
          spacing={18}
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
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
            endIcon={<HomeIcon />}
          >
            กลับหน้าหลัก
          </ColorButton>
        </Stack>
        
        {/*  <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button appearance="primary" onClick={prevStep}>
            ย้อนกลับ
          </Button>

          <Button appearance="primary" onClick={nextStep}>
            บันทึก
          </Button>
        </div> */}
      </div>{" "}
      {/* End InfoStep6 */}
    </>
  )
}

export default StepSix