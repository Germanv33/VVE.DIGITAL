from passlib.context import CryptContext
from app.utils.dbUtil import database
from .models import WorkerCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_worker(email: str):
    query = "SELECT * FROM worker WHERE worker.email = :email"
    return database.fetch_one(query, values={"email": email})


def save_worker(register_info: WorkerCreate):
    query = "INSERT INTO worker (email, fullname, password) VALUES (:email, :fullname, :password)"
    return database.execute(query, values={"email": register_info.email, "password": register_info.password, "fullname": register_info.fullname})


def create_manager(register_info: WorkerCreate):
    query = "INSERT INTO worker (email, fullname, password, role) VALUES (:email, :fullname, :password, :role)"
    return database.execute(query, values={"email": register_info.email, "password": register_info.password, "fullname": register_info.fullname, "role": 'project manager'})


def reset_password(new_password: str, email: str):
    query = "UPDATE worker SET password=:password WHERE email=:email"
    return database.execute(query=query, values={"password": new_password, "email": email})


def find_projects(id:int):
    query = "SELECT project_id FROM project_workers WHERE worker_id=:id"
    return database.fetch_all(query=query, values={"id": id})









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
