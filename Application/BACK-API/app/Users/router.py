from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.auth import models
from app.auth import crud
from app.utils import hashUtil,  auth_handler, auth_bearer
from app.Exceptions.BusinessException import BusinessException

router = APIRouter(
    prefix='/api/v1'
)



@router.post("/user/update_fullname")
async def update_fullname(user: models.UserCreate):
    row = await crud.find_existed_user(user.email)
    if row:
        raise BusinessException(status_code=999, detail="User already registered!")

    # new user
    user.password = hashUtil.get_password_hash(user.password)
    await crud.save_user(user)

    return {**user.dict()}
