
from fastapi import APIRouter, Depends, Request

from app.auth import models
from .models import ChangePassword, UpdateUser
from app.auth import crud as auth_crud
from . import crud
from app.utils import hashUtil, auth_bearer
from app.Exceptions.BusinessException import BusinessException
from app.utils import hashUtil,  auth_handler, auth_bearer
from app.auth.crud import find_existed_user
router = APIRouter(
    prefix='/api/v1'
)


@router.post("/user/update_fullname", dependencies=[Depends(auth_bearer.JWTBearer())])
async def change_fullname(info: UpdateUser,request:Request):
    token = request.headers['Authorization'][7:]
    payload = auth_bearer.decodeJWT(token)
    
    await crud.update_user(request=request, currentEmail=payload['user_id'])


@router.post("/user")
async def user_info(email: str):
    user = await auth_crud.find_existed_user(email=email)
    if user:
        return user
    else:
        raise BusinessException(status_code=999, detail="No such user")


@router.post("/user/change_password", dependencies=[Depends(auth_bearer.JWTBearer())])
async def change_password(passwords: ChangePassword, request:Request):
    token = request.headers['Authorization'][7:]
    payload = auth_bearer.decodeJWT(token)
    user = auth_crud.find_existed_user(email=payload['user_id'])
    if hashUtil.verify_password(passwords.old_password, hashed_password=user['password']):
        if passwords.new_password == passwords.confirm_password:
            await crud.change_password(passwords, payload['user_id'])
            return "Password have been changed!"
        else:
            raise BusinessException(status_code=999, detail="Wrong confirm password!")
    else:
            raise BusinessException(status_code=999, detail="Wrong password!")




# Secure check
# @router.get("/user/secured", dependencies=[Depends(auth_bearer.JWTBearer())])
# async def token(request: Request):
#     return request.headers['Authorization']


@router.get("/customers/token")
async def by_token_info(request: Request):
    token = request.headers['Authorization'][7:]
    print(token)
    payload = auth_handler.decodeJWT(token)
    print(payload)
    
    if payload:
        user = await find_existed_user(str(payload["user_id"]))
        return models.UserList(**user)
            
    # user = models.UserPWD(**user)
    raise BusinessException(status_code=999, detail="Wrong token!")
    