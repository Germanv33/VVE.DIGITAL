from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.auth import models
from app.auth import crud
from app.utils import hashUtil,  auth_handler, auth_bearer
from app.Exceptions.BusinessException import BusinessException

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


@router.post("/auth/register")
async def register(user: models.UserCreate):
    row = await crud.find_existed_user(user.email)
    if row:
        raise BusinessException(status_code=999, detail="User already registered!")

    # new user
    user.password = hashUtil.get_password_hash(user.password)
    await crud.save_user(user)

    return {**user.dict()}