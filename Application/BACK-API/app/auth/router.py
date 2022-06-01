
from fastapi import APIRouter, Depends, Response, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import null
from app.auth import models
from app.auth import crud
from app.utils import hashUtil,  auth_handler, auth_bearer
from app.Exceptions.BusinessException import BusinessException
from app.worker.crud import get_worker
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

router = APIRouter(
    prefix='/api/v1'
)


@router.post("/auth/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await crud.find_existed_user(form_data.username)
    if not user:
        raise BusinessException(status_code=999, detail="User not found")

    user = models.UserPWD(**user)
    is_valid = hashUtil.verify_password(form_data.password, user.password)
    if not is_valid:
        raise BusinessException(status_code=999, detail="Incorrect username or password")


    access_token = auth_handler.signJWT(form_data.username)

  

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


@router.post("/auth/register")
async def register(user: models.UserCreate):
    row = await crud.find_existed_user(user.email)
    row2 = await get_worker(user.email)
    if row and row2:
        raise BusinessException(status_code=999, detail="User already registered!")

    # new user
    user.password = hashUtil.get_password_hash(user.password)
    await crud.save_user(user)

    return {**user.dict()}


@router.post("/auth/token")
async def token_check(token: str):
    payload = auth_handler.decodeJWT(token)

    return payload
  


@router.get("/auth/role", dependencies=[Depends(auth_bearer.JWTBearer())])
async def get_role(request: Request):
    token = request.headers['Authorization'][7:]
    payload = auth_bearer.decodeJWT(token)
    currentEmail = payload['user_id']

    row = await crud.find_existed_user(currentEmail)
    if row:
        role = "customer"
        return Response(content=role, media_type="text/plain")
    
    row2 = await get_worker(currentEmail)
    if row2:
        role = "worker"
        return Response(content=role, media_type="text/plain")

    


