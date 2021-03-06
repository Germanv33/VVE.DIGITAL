from fastapi import APIRouter, Request
from . import crud
from app.Exceptions.BusinessException import BusinessException
from .models import DevTeam, DevTeamCreate



router = APIRouter(
    prefix='/api/v1'
)


@router.get("/dev_team/{dev_team_id}")
async def project_info(dev_team_id: int):
    team = await crud.get_team(dev_team_id)
    return team


@router.post("/dev_team/change_info")
async def change_password(info: DevTeam):
    team = await crud.change_info(info)
    return team


@router.post("/dev_team/create")
async def create(team: DevTeamCreate):
    # new team
    team = await crud.save_team(team)
    
    return team


