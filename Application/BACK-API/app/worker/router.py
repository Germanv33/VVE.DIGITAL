from fastapi import APIRouter, Depends

from . import crud
from app.Exceptions.BusinessException import BusinessException


router = APIRouter(
    prefix='/api/v1'
)

@router.get("/worker")
async def project_info(email: str):
    worker = await crud.get_worker(email=email)
    return worker


