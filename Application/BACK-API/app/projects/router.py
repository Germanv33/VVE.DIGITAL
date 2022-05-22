from fastapi import APIRouter, Depends, Request

from app.projects.models import ProjectCreate
from app.utils import hashUtil,  auth_handler, auth_bearer
from . import crud
from app.Exceptions.BusinessException import BusinessException


router = APIRouter(
    prefix='/api/v1'
)

@router.get("/project/{project_id}")
async def project_info(project_id: int):
    project = await crud.get_project(id=project_id)
    return {**project.dict()}


@router.post("/create_project", dependencies=[Depends(auth_bearer.JWTBearer())])
async def project_info(project_info: ProjectCreate):
    project = await crud.create_project(project_info)
    return {**project.dict()}

@router.get("/user_projects/{user_id}", dependencies=[Depends(auth_bearer.JWTBearer())])
async def project_info(user_id: str):
    project = await crud.get_user_projects(int(user_id))
    return {**project.dict()}
