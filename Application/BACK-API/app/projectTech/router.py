import datetime
from fastapi import APIRouter
from . import crud



router = APIRouter(
    prefix='/api/v1'
)


@router.get("/project_technologies/{project_id}")
async def get_technologies(project_id: int):
    tech = await crud.get_tech(project_id)
    return tech


# @router.post("/meeting/create")
# async def create(project_id: int, created_by: int, date: datetime.datetime,  status: str):
#     team = await crud.create_tech(project_id, created_by, date, status)
#     return team


# @router.get("/meeting/project_last/{project_id}")
# async def get_last_meetings(project_id: int):
#     meetings = await crud.get_last_meeting(project_id)
#     return meetings