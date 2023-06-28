import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import StepOne from "./stepbar-employee/step-1";
import StepTwo from "./stepbar-employee/step-2";
import StepThree from "./stepbar-employee/step-3";
import StepFour from "./stepbar-employee/step-4"
import StepFive from "./stepbar-employee/step-5"
import StepSix from './stepbar-employee/step-6';
//import UploadInfoForm from "./UploadInfoForm"; 
import {Steps} from "rsuite";

function Information() {
  //state for steps
  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState({
    image: "",
    fullname: "",
    email: "",
    tel: "",
    birthday: "",
    LineId: "",
    CitizenId: "",
    CitizenAddress: "",
    CurrentAddress: "",
    age: "",
    testt: ""
  })

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = input => e => {
    // input value from the form
    const {value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData(prevState => ({
      ...prevState,
      [input]: value
  }));
  }


// javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div className="Information">
          <Container>
            <Row>
              <Col>
              <Steps current={step-1}>
              <Steps.Item title="Personal" description="ข้อมูลพนักงาน" />
              <Steps.Item title="Education" description="การศึกษา" />
              <Steps.Item title="Language Skills" description="ทักษะทางด้านภาษา" />
              <Steps.Item title="Technical Skills" description="ทักษาทางด้านคอมพิวเตอร์" />
              <Steps.Item title="Certification" description="ประกาศนียบัตร" />
              <Steps.Item title="Work Experience" description="ประสบการณ์ทำงาน" />
            </Steps>
                <StepOne nextStep={nextStep} handleFormData={handleInputData} values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className="Information">
          <Container>
            <Row>
            <Steps current={step-1}>
              <Steps.Item title="Personal" description="ข้อมูลพนักงาน" />
              <Steps.Item title="Education" description="การศึกษา" />
              <Steps.Item title="Language Skills" description="ทักษะทางด้านภาษา" />
              <Steps.Item title="Technical Skills" description="ทักษาทางด้านคอมพิวเตอร์" />
              <Steps.Item title="Certification" description="ประกาศนียบัตร" />
              <Steps.Item title="Work Experience" description="ประสบการณ์ทำงาน" />
            </Steps>
              <Col className="custom-margin">
                <StepTwo nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );
      // Only formData is passed as prop to show the WorkExperience value at form submit
    case 3:
      return (
        <div className="Information">
          <Container>
            <Row>
            <Steps current={step-1}>
              <Steps.Item title="Personal" description="ข้อมูลพนักงาน" />
              <Steps.Item title="Education" description="การศึกษา" />
              <Steps.Item title="Language Skills" description="ทักษะทางด้านภาษา" />
              <Steps.Item title="Technical Skills" description="ทักษาทางด้านคอมพิวเตอร์" />
              <Steps.Item title="Certification" description="ประกาศนียบัตร" />
              <Steps.Item title="Work Experience" description="ประสบการณ์ทำงาน" />
            </Steps>
              <Col className="custom-margin">
              <StepThree nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );

      case 4:
      return (
        <div className="Information">
          <Container>
            <Row>
            <Steps current={step-1}>
              <Steps.Item title="Personal" description="ข้อมูลพนักงาน" />
              <Steps.Item title="Education" description="การศึกษา" />
              <Steps.Item title="Language Skills" description="ทักษะทางด้านภาษา" />
              <Steps.Item title="Technical Skills" description="ทักษาทางด้านคอมพิวเตอร์" />
              <Steps.Item title="Certification" description="ประกาศนียบัตร" />
              <Steps.Item title="Work Experience" description="ประสบการณ์ทำงาน" />
            </Steps>
              <Col className="custom-margin">
                <StepFour nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );

      case 5:
        return (
          <div className="Information">
            <Container>
              <Row>
              <Steps current={step-1}>
                <Steps.Item title="Personal" description="ข้อมูลพนักงาน" />
                <Steps.Item title="Education" description="การศึกษา" />
                <Steps.Item title="Language Skills" description="ทักษะทางด้านภาษา" />
                <Steps.Item title="Technical Skills" description="ทักษาทางด้านคอมพิวเตอร์" />
                <Steps.Item title="Certification" description="ประกาศนียบัตร" />
                <Steps.Item title="Work Experience" description="ประสบการณ์ทำงาน" />  
              </Steps>
                <Col className="custom-margin">
                  <StepFive nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
                </Col>
              </Row>
            </Container>
          </div>
        );

        case 6:
          return (
            <div className="Information">
              <Container>
                <Row>
                <Steps current={step-1}>
                  <Steps.Item title="Personal" description="ข้อมูลพนักงาน" />
                  <Steps.Item title="Education" description="การศึกษา" />
                  <Steps.Item title="Language Skills" description="ทักษะทางด้านภาษา" />
                  <Steps.Item title="Technical Skills" description="ทักษาทางด้านคอมพิวเตอร์" />
                  <Steps.Item title="Certification" description="ประกาศนีบัตร" />
                  <Steps.Item title="Work Experience" description="ประสบการณ์ทำงาน" />  
                </Steps>
                  <Col className="custom-margin">
                    <StepSix prevStep={prevStep} handleFormData={handleInputData} values={formData}  />
                  </Col>
                </Row>
              </Container>
            </div>
          ); 
    // default case to show nothing
    default:
      return (
        <div className="App">
          case : default
        </div>
      );
  }
}

export default Information