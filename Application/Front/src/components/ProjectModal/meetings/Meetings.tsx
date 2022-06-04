import { observer } from "mobx-react-lite";

import { useEffect, useState } from "react";
import store from "../../../stores/mainStore";
import "./Meetings.sass";

interface MeetingsI {
  project_id: number;
}

const Meetings = ({ project_id }: MeetingsI) => {
  const projectStore = store.projectStore;

  useEffect(() => {}, [projectStore.ProjectMeetings]);

  return (
    <>
      <div className="meetings">
        <p> meetings </p>
        {projectStore.ProjectMeetings.filter(
          (meeting) => meeting.project_id == project_id
        ).map((meeting) => {
          return (
            <div key={meeting.id} className="meeting">
              <div className="meeting_main">
                <span>{meeting.date.slice(0, 10)}</span>
                <span>{meeting.status}</span>
              </div>
              <h3 className="created_by">{meeting.created_by}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default observer(Meetings);
