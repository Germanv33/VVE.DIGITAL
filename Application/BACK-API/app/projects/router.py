from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.auth.models import UserCreate
from .models import ChangePassword, UpdateUser
from app.auth import crud as auth_crud
from . import crud
from app.utils import hashUtil,  auth_handler, auth_bearer
from app.Exceptions.BusinessException import BusinessException


router = APIRouter(
    prefix='/api/v1'
)

@router.get("/project")
async def project_info(id: int):
    project = await crud.get_project(id=id)
    return {**project.dict()}