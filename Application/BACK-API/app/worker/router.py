from fastapi import APIRouter, Depends, Request
from . import crud
from app.Exceptions.BusinessException import BusinessException
from app.utils import hashUtil, auth_bearer, auth_handler
from .models import WorkerCreate
from app.auth import models as auth_models
from app.users import models as user_models
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    prefix='/api/v1'
)


@router.get("/worker")
async def project_info(email: str):
    worker = await crud.get_worker(email=email)
    return worker


@router.post("/worker/change_password", dependencies=[Depends(auth_bearer.JWTBearer())])
async def change_password(passwords: user_models.ChangePassword, request:Request):
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


@router.post("/worker/register")
async def register(user: WorkerCreate):
    row = await crud.get_worker(user.email)
    if row:
        raise BusinessException(status_code=999, detail="User already registered!")

    # new user
    user.password = hashUtil.get_password_hash(user.password)
    await crud.save_worker(user)

    return {**user.dict()}



@router.post("/worker/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await crud.get_worker(form_data.username)
    if not user:
        raise BusinessException(status_code=999, detail="User not found")

    user = auth_models.UserPWD(**user)
    is_valid = hashUtil.verify_password(form_data.password, user.password)
    if not is_valid:
        raise BusinessException(status_code=999, detail="Incorrect username or password")


    access_token = auth_handler.signJWT(form_data.username)

    # access_token_expires = jwtUtil.timedelta(minutes=constantUtil.ACCESS_TOKEN_EXPIRE_MINUTES)
    # access_token = await jwtUtil.create_access_token(
    #     data={"sub": form_data.username},
    #     expires_delta=access_token_expires,
    # )

    results = {
        "access_token": access_token,
        "token_type": "bearer"
    }

    results.update({
        "user_info": {
            "email": user.email,
            "fullname": user.fullname,
        }
    })

    return results