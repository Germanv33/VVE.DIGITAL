import datetime
from fastapi import APIRouter
from . import crud
from .models import Meeting


router = APIRouter(
    prefix='/api/v1'
)


@router.get("/meeting/{project_id}")
async def get_meetings(project_id: int):
    meetings = await crud.get_meetings(project_id)
    return meetings


@router.post("/meeting/create")
async def create(project_id: int, created_by: int, date: datetime.datetime,  status: str):
    team = await crud.create_meeting(project_id, created_by, date, status)
    return team


@router.get("/meeting/project_last/{project_id}")
async def get_last_meetings(project_id: int):
    meetings = await crud.get_last_meeting(project_id)
    return meetings