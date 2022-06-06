import datetime
from passlib.context import CryptContext
from app.projects.models import ProjectCreate, Project
from app.utils.dbUtil import database
from app.meetings import crud as meetingsCrud
from app.meetings import models as meetingsModels

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_project(id: int):
    query = "SELECT * FROM project WHERE project.id = :id"
    return database.fetch_one(query, values={"id": id})


async def create_project(project_info: ProjectCreate):
    query = "INSERT INTO project (customer_id, name, dev_team_id, cost) VALUES (:customer_id, :name, :dev_team_id, :cost)"
    values = {"customer_id": project_info.customer_id, "name": project_info.name, "dev_team_id": project_info.dev_team_id, "cost": project_info.cost}
    await database.execute(query, values=values)
    id = await database.execute(query="SELECT id FROM project WHERE project.customer_id=:customer_id AND project.name=:name AND project.dev_team_id=:dev_team_id AND cost=:cost", values=values)
    for technology in project_info.tecnologies:
        query = "INSERT INTO project_technology (project_id, dev_team_id, technology, completeness) VALUES (:project_id , :dev_team_id, :technology, :completeness)" 
        values = {"project_id": id,  "dev_team_id": project_info.dev_team_id, "completeness": 0, "technology": technology}
        await database.execute(query, values=values)
    return await meetingsCrud.create_meeting(int(id), 1, datetime.datetime.now(), "Creation meeting!")
    

def get_user_projects(user_id: int):
    query = "SELECT * FROM project WHERE project.customer_id = :customer_id"
    return database.fetch_all(query, values={"customer_id": user_id})


def get_dev_teams():
    query = "SELECT * FROM dev_team ORDER BY id LIMIT 3"
    dev_teams =  database.fetch_all(query)
    return dev_teams
















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
