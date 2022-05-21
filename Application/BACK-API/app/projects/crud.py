from passlib.context import CryptContext
from app.projects.models import ProjectCreate
from app.utils.dbUtil import database


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_project(id: int):
    query = "SELECT * FROM project WHERE project.id = :id"
    return database.execute(query, values={"id": id})


def create_project(project_info: ProjectCreate):
    query = "INSERT INTO project (customer_id, name, dev_team_id) VALUES (:customer_id, :name, :dev_team_id)"
    return database.execute(query, values={"customer_id": project_info.customer_id, "name": project_info.name, "dev_team_id": project_info.customer_id})


def get_user_projects(user_id: int):
    query = "SELECT * FROM projects WHERE project.customer_id = :customer_id"
    return database.execute(query, values={"customer_id": user_id})















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
