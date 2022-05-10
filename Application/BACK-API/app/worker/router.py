from fastapi import APIRouter, Depends, Request
from . import crud
from app.Exceptions.BusinessException import BusinessException
from app.utils import hashUtil, auth_bearer
from .models import WorkerCreate, ChangePassword

router = APIRouter(
    prefix='/api/v1'
)


@router.get("/worker")
async def project_info(email: str):
    worker = await crud.get_worker(email=email)
    return worker


@router.post("/user/change_password", dependencies=[Depends(auth_bearer.JWTBearer())])
async def change_password(passwords: ChangePassword, request:Request):
    token = request.headers['Authorization'][7:]
    payload = auth_bearer.decodeJWT(token)
    user = crud.get_worker(email=payload['user_id'])
    if hashUtil.verify_password(passwords.old_password, hashed_password=user['password']):
        if passwords.new_password == passwords.confirm_password:
            await crud.change_password(passwords, payload['user_id'])
            return "Password have been changed!"
        else:
            raise BusinessException(status_code=999, detail="Wrong confirm password!")
    else:
            raise BusinessException(status_code=999, detail="Wrong password!")


@router.post("/auth/register")
async def register(user: WorkerCreate):
    row = await crud.get_worker(user.email)
    if row:
        raise BusinessException(status_code=999, detail="User already registered!")

    # new user
    user.password = hashUtil.get_password_hash(user.password)
    await crud.save_worker(user)

    return {**user.dict()}