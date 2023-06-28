import React from "react";
import AddStep3 from "../add-button-step/add-step-3";
import { mockUsers } from "./mock";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button, Table } from "rsuite";
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

function StepThree({ nextStep, handleFormData, prevStep, values }) {
  return (
    <>
      <div className="InfoStep3">
        <div className="AddLanguageSkill">
          <AddStep3 />
        </div>
        {/* End AddLanguageSkill */}
        <div className="ShowLanguageSkill">
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
              <HeaderCell>Language</HeaderCell>
              <Cell dataKey="firstName" />
            </Column>

            <Column width={150}>
              <HeaderCell>Listening</HeaderCell>
              <Cell dataKey="lastName" />
            </Column>

            <Column width={100}>
              <HeaderCell>Speaking</HeaderCell>
              <Cell dataKey="gender" />
            </Column>

            <Column width={100}>
              <HeaderCell>Writing</HeaderCell>
              <Cell dataKey="age" />
            </Column>

            <Column width={150}>
              <HeaderCell>Reading</HeaderCell>
              <Cell dataKey="postcode" />
            </Column>
          </Table>
        </div>{" "}
        {/* End ShowLanguageSkill */}
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

      {/* End InfoStep3 */}
    </>
  )
}

export default StepThree