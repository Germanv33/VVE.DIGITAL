from fastapi import FastAPI, Request
from app.utils.auth_bearer import JWTBearer
from app.utils.dbUtil import database
from app.Exceptions.BusinessException import BusinessException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.auth import router as auth_router
from app.users import router as user_router
from app.projects import router as project_router
from app.worker import router as worker_router
from app.dev_team import router as dev_team_router
from app.meetings import router as meeting_router
from app.chat import router as chat_router

app = FastAPI(title="VVE API")


origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to VVE Api!."}

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.exception_handler(BusinessException)
async def business_exception_handler(request: Request, e: BusinessException):
    return JSONResponse(
        status_code=418,
        content={"code": e.status_code, "message": e.detail},
    )



app.include_router(auth_router.router, tags=["Customers Auth"])
app.include_router(user_router.router, tags=["Customers"])
app.include_router(project_router.router, tags=["Project"])
app.include_router(worker_router.router, tags=["Workers"])
app.include_router(dev_team_router.router, tags=["Dev_Teams"])
app.include_router(meeting_router.router, tags=["Meetings"])
app.include_router(chat_router.router, tags=["Chat"])




# # ---------POSTS------------------------

# posts = [
#     {
#         "id": 1,
#         "title": "Pancake",
#         "content": "Lorem Ipsum ..."
#     }
# ]

# # users = []

# @app.get("/posts", tags=["posts"])
# async def get_posts() -> dict:
#     return { "data": posts }

# @app.get("/posts/{id}", tags=["posts"])
# async def get_single_post(id: int) -> dict:
#     if id > len(posts):
#         return {
#             "error": "No such post with the supplied ID."
#         }

#     for post in posts:
#         if post["id"] == id:
#             return {
#                 "data": post
#             }

# @app.post("/posts", dependencies=[Depends(JWTBearer())], tags=["posts"])
# async def add_post(post: PostSchema) -> dict:
#     post.id = len(posts) + 1
#     posts.append(post.dict())
#     return {
#         "data": "post added."
#     }


# #  ------------USER----------------------------


# @app.get("/users", response_model=List[UserSchema], tags=["users"])
# async def find_all_users():
#     query = users.select()
#     return await database.fetch_all(query)


# @app.post("/users/signup",  tags=["users"])
# async def create_user(user: UserSchema = Body(...)):
#     # users.append(user)
#     query = users.insert().values(
#         fullname   = user.fullname,
#         password   = pwd_context.hash(user.password),
#     )
#     await database.execute(query)
#     return signJWT(user.email)

# @app.post("/users",  tags=["user"])
# async def update_user(user: UserSchema = Body(...)):
#     # users.append(user)
#     query = users.insert().values(
#         fullname   = user.fullname,
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


#  -----------------------------------------------