from app.utils.auth_handler import signJWT
from app.utils.auth_bearer import JWTBearer
from app.auth.models import auth_models 
# from pg_db import database, users
from passlib.context import CryptContext
from typing import List


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# def update_user(
#     request: UpdateUser,
#     currentUser: auth_models.UserList
# ):
#     query = "UPDATE customers SET fullname=:fullname where email=:email"
#     return database.execute(query, values={"fullname": request.fullname, "email": currentUser.email})


# def change_password(
#     chgPwd: auth_models.ChangePassword,
#     currentUser: auth_models.UserList
# ):
#     query = "UPDATE customers SET password=:password WHERE email=:email"
#     return database.execute(query=query, values={"password": cryptoUtil.get_password_hash(chgPwd.new_password),
#                                                 "email": currentUser.email})

















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
