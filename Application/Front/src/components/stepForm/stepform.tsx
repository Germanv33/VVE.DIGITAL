import { Field, FieldArray, Formik } from "formik";
import { Component, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MyCheckbox } from "../ui/checkbox/checkbox";
import MyInput from "../ui/input/input";
import * as Yup from "yup";
import email_svg from "../../assets/img/signin/email.svg";
import password_svg from "../../assets/img/signin/password.svg";
import "./stepForm.sass";
import { FC } from "react";
import { render } from "react-dom";
import { MyCheckboxCard } from "../ui/checkbox_card/checkbox_card";
import axios from "axios";
import projectStore, { IProject } from "../../stores/projectStore";
import userStore from "../../stores/userStore";
import { fetchToken } from "../../utils/auth";
import store from "../../stores/mainStore";
import { values } from "mobx";

export interface FormData {
  name: string;
  pages: number;
  design: string;
}

export interface ITeam {
  id: number;
  name: string;
  description: string;
  img: any;
}

export default function Stepform() {
  const projectStore = store.projectStore;
  const userStore = store.userStore;

  const [data, setData] = useState({
    name: "",
    team: 0,
    pages: 0,
    design: "",
  });

  const [currentTeam, setcurrentTeam] = useState({
    first_team: false,
    second_team: false,
    thirst_team: false,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const [inProcess, setinProcess] = useState(false);
  const [isFound, setisFound] = useState(false);
  const [teams, setTeams] = useState<ITeam[]>([]);

  async function find_dev_team(
    cost: number,
    technology: String[],
    design: String
  ) {
    let config = {
      headers: {
        Authorization: "BEARER " + fetchToken(),
      },
    };
    var tech_query: string = "";
    for (var tech in technology) {
      tech_query += "&" + "func_list=" + tech;
    }
    await axios
      .post(
        "http://localhost:8081/api/v1/best_dev_team/",
        // "money=" + cost + tech_query,
        config
      )
      .then(function (response) {
        console.log(" project query results:");

        if (response.status === 200) {
          console.log("Query Successful");
          if (!(response.data === [])) {
            const teams: ITeam[] = response.data;
            setTeams(teams);
            setinProcess(false);
            setisFound(true);
          }
        }
      })
      .catch(function (error) {
        setinProcess(false);
        console.log("Invalid");
        console.log(error, "error");
      });
  }

  async function create_project(name: string, dev_team: number) {
    console.log("dev team number to creation:" + dev_team);
    let config = {
      headers: {
        Authorization: "BEARER " + fetchToken(),
      },
    };

    await axios
      .post(
        "http://localhost:8081/api/v1/create_project/",
        // "customer_id=" +
        //   userStore.id +
        //   "&name=" +
        //   name +
        //   "&dev_team_id=" +
        //   dev_team,

        {
          customer_id: userStore.id,
          name: name,
          dev_team_id: dev_team,
        },
        (config = config)
      )
      .then(function (response) {
        console.log(" project creation query results:");

        if (response.status === 200) {
          console.log("Query Successful");
          console.log(response.data);
          setinProcess(false);
          setCurrentStep((step) => step + 1);
          projectStore.IsNeedToUpdate = true;
        }
      })
      .catch(function (error) {
        setinProcess(false);
        console.log("Invalid");
        console.log(error, "error");
      });
  }

  const makeRequest = (data: FormData) => {
    console.log("Form Submitted: ", data);
  };

  const handleNextStep = async (newData?: any, finalStep: boolean = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (finalStep && currentStep === 4) {
      makeRequest(data);
      create_project(data.name, data.team);
    }

    if (finalStep && !isFound) {
      makeRequest(data);
      setinProcess(true);
      await find_dev_team(15000, ["shop", "profile"], data.design);
      console.log("teams are founded");
      console.log(teams);
    }

    if (!inProcess) {
      setCurrentStep((prev) => prev + 1);
      console.log(currentStep);
    }
  };

  const handlPrevStep = (newData: any) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const StepZero = () => {
    return (
      <>
        {" "}
        <h1>Welcome</h1>
        <button
          className="signin__button"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          type="submit"
        >
          Next
        </button>
      </>
    );
  };

  const one_validate = Yup.object({
    name: Yup.string()
      .min(6, "Name must be at least 6 charaters")
      .required("Name is required"),
  });

  const StepOne = () => {
    return (
      <>
        <Formik
          initialValues={{
            name: data.name,
          }}
          validationSchema={one_validate}
          onSubmit={(values) => {
            //   signin(values.password, values.email);
            handleNextStep(values);
            console.log(values);
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              handleSubmit,
            } = props;
            return (
              <form
                id="form"
                onSubmit={handleSubmit}
                action="submit"
                method="post"
              >
                <h1>Project name will be...</h1>
                <div className="input__handler">
                  <MyInput
                    value={values.name}
                    className={`email__input ${
                      touched.name && errors.name && "is-invalid"
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="name"
                    inputType="text"
                    placeholderValue={data.name}
                    padding="0"
                    margin={
                      touched.name && errors.name ? "0px" : "0px 0px 15px 0px"
                    }
                  />
                  {touched.name && errors.name && (
                    <p className={"error"}> {errors.name}</p>
                  )}
                </div>

                <button className="signin__button" type="submit">
                  Next
                </button>
              </form>
            );
          }}
        </Formik>
      </>
    );
  };

  const two_validate = Yup.object({
    pages: Yup.number()
      .min(1, "Site must be at least 1 page")
      .required("Pages are required"),
  });

  const StepTwo = () => {
    return (
      <>
        <Formik
          initialValues={{
            pages: data.pages,
          }}
          validationSchema={two_validate}
          onSubmit={(values) => {
            //   signin(values.password, values.email);
            handleNextStep(values);
            console.log(values);
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              handleSubmit,
            } = props;
            return (
              <form
                id="form"
                onSubmit={handleSubmit}
                action="submit"
                method="post"
              >
                <h1>How many pages will be?</h1>
                <div className="input__handler">
                  <MyInput
                    value={values.pages}
                    className={`email__input ${
                      touched.pages && errors.pages && "is-invalid"
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="pages"
                    inputType="number"
                    placeholderValue={String(data.pages)}
                    padding="0"
                    margin={
                      touched.pages && errors.pages ? "0px" : "0px 0px 15px 0px"
                    }
                  />
                  {touched.pages && errors.pages && (
                    <p className={"error"}> {errors.pages}</p>
                  )}
                </div>

                <div className="buttons">
                  <button
                    className="signin__button"
                    type="button"
                    onClick={() => handlPrevStep(values)}
                  >
                    Back
                  </button>

                  <button className="signin__button" type="submit">
                    Next
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </>
    );
  };

  const three_validate = Yup.object({
    design: Yup.string()
      .min(1, "design must be at least 1 choice")
      .required("design are required"),
  });

  const StepThree = () => {
    return (
      <>
        <Formik
          initialValues={{
            design: data.design,
          }}
          validationSchema={three_validate}
          onSubmit={(values) => {
            //   signin(values.password, values.email);
            console.log(values);
            handleNextStep(values, true);
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              handleSubmit,
            } = props;
            return (
              <form
                id="form"
                onSubmit={handleSubmit}
                action="submit"
                method="post"
              >
                <h1>Write type of design that you prefer more</h1>
                <div className="input__handler">
                  <MyInput
                    value={values.design}
                    className={`email__input ${
                      touched.design && errors.design && "is-invalid"
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="design"
                    inputType="text"
                    placeholderValue={data.design}
                    padding="0"
                    margin={
                      touched.design && errors.design
                        ? "0px"
                        : "0px 0px 15px 0px"
                    }
                  />
                  {touched.design && errors.design && (
                    <p className={"error"}> {errors.design}</p>
                  )}
                </div>

                <div className="buttons">
                  <button
                    className="signin__button"
                    type="button"
                    onClick={() => handlPrevStep(values)}
                  >
                    Back
                  </button>
                  {!isFound ? (
                    <button
                      disabled={inProcess}
                      className="signin__button"
                      type="submit"
                    >
                      {inProcess ? "Searching" : "Find Dev Team"}
                    </button>
                  ) : (
                    <button className="signin__button" type="submit">
                      Next
                    </button>
                  )}
                </div>
              </form>
            );
          }}
        </Formik>
      </>
    );
  };

  const firstChange = () => {
    currentTeam.first_team = !currentTeam.first_team;
    if (currentTeam.first_team === true) {
      currentTeam.second_team = false;
      currentTeam.thirst_team = false;
      data.team = teams[0].id;
    }
    console.log(currentTeam);
  };

  const secondChange = () => {
    currentTeam.second_team = !currentTeam.second_team;
    if (currentTeam.second_team === true) {
      currentTeam.first_team = false;
      currentTeam.thirst_team = false;
      data.team = teams[1].id;
    }
    console.log(currentTeam);
  };

  const thirstChange = () => {
    currentTeam.thirst_team = !currentTeam.thirst_team;
    if (currentTeam.thirst_team === true) {
      currentTeam.second_team = false;
      currentTeam.first_team = false;
      data.team = teams[2].id;
    }
    console.log(currentTeam);
  };

  const StepFour = () => {
    return (
      <>
        <Formik
          initialValues={{
            first_team: false,
            second_team: false,
            thirst_team: false,
          }}
          onSubmit={(values) => {
            //   signin(values.password, values.email);
            handleNextStep(data, true);
            console.log(values);
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              handleSubmit,
            } = props;
            return (
              <form
                id="form"
                onSubmit={handleSubmit}
                action="submit"
                method="post"
              >
                <h1>Choose a team</h1>
                <div className="input__handler">
                  <div className="checkbox__wrapper">
                    <MyCheckboxCard
                      team_name={teams[0].name ? teams[0].name : "team1"}
                      name="first_team"
                      id="first_team"
                      onCheck={currentTeam.first_team}
                      team_id={teams[0].id ? teams[0].id : 1}
                      onChanges={(e) => {
                        firstChange();
                        values.first_team = !values.first_team;
                        console.log(data);

                        handleChange(e);
                      }}
                    />

                    <MyCheckboxCard
                      // team_name={teams[1].name ? teams[1].name : "team2"}
                      name="second_team"
                      id="second_team"
                      team_name={teams[1].name ? teams[1].name : "team2"}
                      onCheck={currentTeam.second_team}
                      team_id={teams[1].id ? teams[1].id : 2}
                      onChanges={(e) => {
                        secondChange();
                        values.second_team = !values.second_team;
                        console.log(data);
                        handleChange(e);
                      }}
                    />

                    <MyCheckboxCard
                      // team_name={teams[2].name ? teams[2].name : "team2"}
                      name="thirst_team"
                      id="thirst_team"
                      team_name={teams[2].name ? teams[2].name : "team3"}
                      onCheck={currentTeam.thirst_team}
                      team_id={teams[2].id ? teams[2].id : 3}
                      onChanges={(e) => {
                        thirstChange();
                        values.thirst_team = !values.thirst_team;
                        console.log(data);
                        handleChange(e);
                      }}
                    />
                  </div>

                  {!(
                    currentTeam.first_team ||
                    currentTeam.second_team ||
                    currentTeam.thirst_team
                  ) ? (
                    <p className={"error"}> You have to choose one team</p>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="buttons">
                  <button
                    disabled={
                      inProcess ||
                      !(
                        currentTeam.first_team ||
                        currentTeam.second_team ||
                        currentTeam.thirst_team
                      )
                    }
                    className="signin__button"
                    type="submit"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </>
    );
  };

  const StepFinal = () => {
    return (
      <>
        {" "}
        <h1>Your Project have been created</h1>
      </>
    );
  };

  const steps = [
    <StepZero />,
    <StepOne />,
    <StepTwo />,
    <StepThree />,
    <StepFour />,
    <StepFinal />,
  ];

  return <div className="StepForm">{steps[currentStep]}</div>;
}
