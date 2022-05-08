
from app.auth import models as auth_models
from .models import UpdateUser, ChangePassword
from passlib.context import CryptContext
from app.utils.dbUtil import database
from app.utils import hashUtil


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def update_user(
    request: UpdateUser,
    currentEmail: str
):
    query = "UPDATE customers SET fullname=:fullname where email=:email"
    return database.execute(query, values={"fullname": request.fullname, "email": currentEmail})

def change_password(
    chgPwd: ChangePassword,
    currentEmail: str
):
    query = "UPDATE customers SET password=:password WHERE email=:email"
    return database.execute(query=query, values={"password": hashUtil.get_password_hash(chgPwd.new_password),
                                                "email": currentEmail})
















# @app.get("/users", response_model=List[UserSchema], tags=["users"])
# async def find_all_users():
#     query = users.select()
#     return await database.fetch_all(query)


# @app.post("/users/signup",  tags=["users"])
# async def create_user(user: UserSchema = Body(...)):
#     # users.append(user)
#     query = users.insert().values(
#         username   = user.username,
#         password   = pwd_context.hash(user.password),
#     )
#     await database.execute(query)
#     return signJWT(user.email)

# @app.post("/users",  tags=["user"])
# async def update_user(user: UserSchema = Body(...)):
#     # users.append(user)
#     query = users.insert().values(
#         username   = user.username,
#         password   = pwd_context.hash(user.password),
#     )
#     await database.execute(query)
#     return signJWT(user.email)


# async def check_user(data: UserLoginSchema):
#     # TODO REDO!
#     query = users.select().where(users.c.id == data.id)

#     return await database.fetch_one(query)


# @app.get("/users/{userId}", response_model=UserSchema, tags=["users"])
# async def find_user_by_id(userId: int):
#     query = users.select().where(users.c.id == userId)
#     return await database.fetch_one(query)


# @app.post("/users/login", tags=["user"])
# async def user_login(user: UserLoginSchema = Body(...)):
#     if check_user(user):
#         return signJWT(user.email)
#     return {
#         "error": "Wrong login details!"
#     }
