import { FC } from "react";
import title_svg from "../../assets/img/profile/title.svg";
import team_svg from "../../assets/img/profile/team.svg";
import date_svg from "../../assets/img/profile/date.svg";
import "./projectCardStyle.sass";

interface ProjectCardI {
  name: string;
  date: string;
  team: string;
  status_color: string;
}

export const ProjectCardComponent = ({
  name,
  date,
  team,
  status_color,
}: ProjectCardI) => {
  return (
    <>
      <div className="project__card">
        <div className="card__info">
          {/* <div className="title__block"> */}
          <img src={title_svg} alt="title logo" />
          <span className="card__title">{name}</span>
          {/* </div> */}
          {/* <div className="date__block"> */}
          <img src={date_svg} alt="title logo" />
          <span className="secondary__span">{date}</span>
          {/* </div> */}
          {/* <div className="team__block"> */}
          <img src={team_svg} alt="title logo" />
          <span className="secondary__span">{team}</span>
          {/* </div> */}
        </div>
        <button>
          <span style={{ color: status_color }}>Status</span>
        </button>
      </div>
    </>
  );
};

export default ProjectCardComponent;
