import React from "react";
import AddStep4 from "../add-button-step/add-step-4"
import { mockUsers } from "./mock";
import {
  Button,
  Table,
} from "rsuite";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Stack, styled } from "@mui/material";
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

function StepFour({ nextStep, handleFormData, prevStep, values }) {
  return (
    <>
      <div className="InfoStep4">
        <div className="AddTechnicalSkill">
          <AddStep4/>
        </div>
        {/* End AddTechnicalSkill */}
        <div className="ShowTechnicalSkill">
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

            <Column width={200}>
              <HeaderCell>Skill</HeaderCell>
              <Cell dataKey="firstName" />
            </Column>

            <Column width={200}>
              <HeaderCell>Framework</HeaderCell>
              <Cell dataKey="lastName" />
            </Column>

            
          </Table>
        </div>{" "}
        {/* End ShowTechnicalSkill */}
        <Stack
          direction="row"
          spacing={2}
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
            endIcon={<SkipNextIcon />}
            onClick={nextStep}
          >
            ถัดไป
          </ColorButton>
        </Stack>
        </div>
      {/* End InfoStep4 */}
    </>
  )
}

export default StepFour