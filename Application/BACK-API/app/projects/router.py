from typing import Union
from fastapi import APIRouter, Depends, Query, Request

from app.projects.models import ProjectCreate
from app.utils import hashUtil,  auth_handler, auth_bearer
from . import crud
from app.Exceptions.BusinessException import BusinessException


router = APIRouter(
    prefix='/api/v1'
)

@router.get("/project/{project_id}")
async def project_info(project_id: str):
    project = await crud.get_project(id=int(project_id))
    return project

#  dependencies=[Depends(auth_bearer.JWTBearer())]
@router.post("/create_project", dependencies=[Depends(auth_bearer.JWTBearer())])
async def project_create(project_info: ProjectCreate):
    project = await crud.create_project(project_info)
    
    return project

@router.get("/user_projects/{user_id}")
async def user_projects(user_id: str):
    project = await crud.get_user_projects(int(user_id))
    return project


@router.post("/best_dev_team/", dependencies=[Depends(auth_bearer.JWTBearer())])
async def find_dev_team(money:int = Query(default=None), func_list: Union[list[str], None] = Query(default=None)):
    teams = await crud.get_dev_teams()
    return teams




