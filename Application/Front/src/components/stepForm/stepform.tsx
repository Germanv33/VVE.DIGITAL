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
import { MyCreationCard } from "../ui/checkboxCreationCards/checkboxCreationCards";

export interface FormData {
  name: string;
  technologies: string[];
  team: number;
  cost: number;
}

interface Data {
  name: string;
  technologies: string[];
  team: number;
  type: string;
  cost: number;
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

  const [data, setData] = useState<Data>({
    name: "",
    team: 0,
    technologies: [],
    type: "",
    cost: 0,
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

  async function find_dev_team(cost: number, technology: String[]) {
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

  async function create_project(
    name: string,
    dev_team: number,
    technology: String[],
    cost: number
  ) {
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
          cost: cost,
          tecnologies: technology,
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

    if (finalStep && currentStep === 5) {
      makeRequest(data);
      create_project(data.name, data.team, data.technologies, data.cost);
    }

    if (finalStep && !isFound) {
      makeRequest(data);
      setinProcess(true);
      await find_dev_team(data.cost, data.technologies);
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
        <h1>Welcome to the project creation</h1>
        <span>Tell us as much as you can about your desired project!</span>
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
                <h1>The best Project name will be...</h1>
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

  const onehalf_validate = Yup.object({
    type: Yup.string().required(),
  });

  const Steponehalf = () => {
    return (
      <>
        <Formik
          initialValues={{
            type: data.type,
          }}
          validationSchema={onehalf_validate}
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
                <h1>Choose type</h1>
                <div className="type__handler">
                  <MyCreationCard
                    name="Commercial"
                    id="Commercial"
                    title="Commercial"
                    onChanges={(e) => {
                      console.log(data);

                      data.type = "Commercial";
                      values.type = "Commercial";
                      data.technologies = [];

                      handleChange(e);
                    }}
                    onCheck={data.type == "Commercial"}
                  />
                  <MyCreationCard
                    name="Informative"
                    id="Informative"
                    title="Informative"
                    onChanges={(e) => {
                      console.log(data);
                      data.type = "Informative";
                      values.type = "Informative";
                      data.technologies = [];
                      handleChange(e);
                    }}
                    onCheck={data.type == "Informative"}
                  />
                  <MyCreationCard
                    name="Social"
                    id="Social"
                    title="Social"
                    onChanges={(e) => {
                      console.log(data);
                      data.type = "Social";
                      values.type = "Social";
                      data.technologies = [];
                      handleChange(e);
                    }}
                    onCheck={data.type == "Social"}
                  />
                  <MyCreationCard
                    name="Web Service"
                    id="Web Service"
                    title="Web Service"
                    onChanges={(e) => {
                      console.log(data);
                      data.type = "Web Service";
                      values.type = "Web Service";
                      data.technologies = [];
                      handleChange(e);
                    }}
                    onCheck={data.type == "Web Service"}
                  />
                  <MyCreationCard
                    name="Other"
                    id="Other"
                    title="Other"
                    onChanges={(e) => {
                      console.log(data);
                      data.type = "Other";
                      values.type = "Other";
                      data.technologies = [];
                      handleChange(e);
                    }}
                    onCheck={data.type == "Other"}
                  />
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

  const two_validate = Yup.object({
    technologies: Yup.array().of(Yup.string()).required(),
  });

  const StepTwo = () => {
    var techList: string[] = [];
    if (data.type == "Commercial") {
      techList = ["Shop", "Profile", "Shop filters", "Cart", "Chat"];
    }
    if (data.type == "Social") {
      techList = ["News", "Profile", "Post Creation", "Comments", "Chat"];
    }
    if (data.type == "Informative") {
      techList = ["News", "Profile", "Search", "Comments", "Chat"];
    }
    if (data.type == "Web Service") {
      techList = ["Specialized functions"];
    }
    if (data.type == "Other") {
      techList = [
        "Search",
        "News",
        "Profile",
        "Post Creation",
        "Comments",
        "Shop",
        "Profile",
        "Shop filters",
        "Cart",
        "Chat",
        "Specialized functions",
      ];
    }
    return (
      <>
        <Formik
          initialValues={{
            technologies: data.technologies,
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
                <h1>Choose technologies</h1>
                <div className="technologies__handler">
                  {techList.map((func) => {
                    return (
                      <MyCreationCard
                        key={func}
                        name={func}
                        id={func}
                        title={func}
                        onChanges={(e) => {
                          console.log(data);
                          var index = data.technologies.indexOf(func, 0);
                          if (index > -1) {
                            data.technologies.splice(index, 1);
                          } else {
                            data.technologies.push(func);
                          }
                          handleChange(e);
                        }}
                        onCheck={data.technologies.includes(func)}
                      />
                    );
                  })}
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
    cost: Yup.number()
      .min(13000, "cost must be at least 13000")
      .required("cost are required"),
  });

  const StepThree = () => {
    return (
      <>
        <Formik
          initialValues={{
            cost: data.cost,
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
                <h1>
                  How much does it cost to create your project in your opinion?
                </h1>
                <div className="input__handler">
                  <MyInput
                    value={values.cost}
                    className={`email__input ${
                      touched.cost && errors.cost && "is-invalid"
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="cost"
                    inputType="number"
                    placeholderValue={String(data.cost)}
                    padding="0"
                    margin={
                      touched.cost && errors.cost ? "0px" : "0px 0px 15px 0px"
                    }
                  />
                  {touched.cost && errors.cost && (
                    <p className={"error"}> {errors.cost}</p>
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
    <Steponehalf />,
    <StepTwo />,
    <StepThree />,
    <StepFour />,
    <StepFinal />,
  ];

  return <div className="StepForm">{steps[currentStep]}</div>;
}
