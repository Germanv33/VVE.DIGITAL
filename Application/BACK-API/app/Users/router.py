
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


@router.post("/user/update_fullname", dependencies=[Depends(auth_bearer.JWTBearer())])
async def change_fullname(user: UserCreate, request: UpdateUser):
    await crud.update_user(request=request, currentUser=user)


@router.get("/user")
async def user_info(email: str):
    user = await auth_crud.find_existed_user(email=email)
    if user:
        return {**user.dict()}
    else:
        raise BusinessException(status_code=999, detail="No such user")


@router.post("/user/cahnge_password", dependencies=[Depends(auth_bearer.JWTBearer())])
async def change_password(user: UserCreate, passwords: ChangePassword):
    if hashUtil.verify_password(passwords.old_password, user.password):
        if passwords.new_password == passwords.confirm_password:
            await crud.change_password(passwords, user)
            return "Password have been changed!"
        else:
            raise BusinessException(status_code=999, detail="Wrong confirm password!")
    else:
            raise BusinessException(status_code=999, detail="Wrong password!")
