from passlib.context import CryptContext
from app.utils.dbUtil import database
from .models import DevTeam, DevTeamCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_team(id: int):
    query = "SELECT * FROM dev_team WHERE dev_team.id = :id"
    return database.fetch_one(query, values={"id": id})


def save_team(register_info: DevTeamCreate):
    query = "INSERT INTO dev_team (name, description) VALUES (:name, :description)"
    return database.execute(query, values={"name": register_info.name, "description": register_info.description})
    

def change_info(team_info: DevTeam):
    query = "UPDATE dev_team SET name=:name, description=:description WHERE id=:id"
    return database.execute(query=query, values={"name": team_info.name, "description": team_info.description, "id": team_info.id})










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
