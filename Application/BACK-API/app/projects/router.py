from fastapi import APIRouter, Depends

from . import crud
from app.Exceptions.BusinessException import BusinessException


router = APIRouter(
    prefix='/api/v1'
)

@router.get("/project")
async def project_info(id: int):
    project = await crud.get_project(id=id)
    return {**project.dict()}