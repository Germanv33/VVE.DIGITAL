import { observer } from "mobx-react-lite";

import { useEffect, useState } from "react";
import store from "../../../stores/mainStore";
import { get_meeting_list } from "../../../utils/AxiosQueries/customerQueries";

import "./Meetings.sass";

interface MeetingsI {
  project_id: number;
}

const Meetings = ({ project_id }: MeetingsI) => {
  const projectStore = store.projectStore;
  const userStore = store.userStore;
  useEffect(() => {
    userStore.modal_in_process = true;
    get_meeting_list(project_id);
  }, [projectStore.ProjectMeetings]);

  return (
    <>
      <div className="meetings">
        <p className="meeting__title"> meetings </p>
        {projectStore.ProjectMeetings.filter(
          (meeting) => meeting.project_id == project_id
        ).map((meeting) => {
          return (
            <div key={meeting.id} className="meeting">
              <div className="meeting_main">
                <span className="m_date">{meeting.date.slice(0, 10)}</span>
                <span className="m_status">{meeting.status}</span>
              </div>
              {/* <span className="created_by">{meeting.created_by}</span> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default observer(Meetings);
