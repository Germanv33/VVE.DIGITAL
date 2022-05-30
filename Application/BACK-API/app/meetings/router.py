from fastapi import APIRouter, Request
from . import crud
from app.Exceptions.BusinessException import BusinessException
from .models import Meeting


router = APIRouter(
    prefix='/api/v1'
)


@router.get("/meeting/{project_id}")
async def get_meetings(project_id: int):
    meetings = await crud.get_meetings(project_id)
    return meetings


@router.post("/meeting/create")
async def create(team: Meeting):
    # new team
    team = await crud.create_meeting(team)
    return team


