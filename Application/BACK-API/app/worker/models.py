import typing
from pydantic import BaseModel, Field, EmailStr
from sqlalchemy import null


class Worker(BaseModel):
    id: str
    fullname: str
    email: str
    team_id: typing.Union[int,None] 
    password: str
    

class WorkerCreate(BaseModel):
    fullname: str
    email: str
    password: str


class ProjectWorker(BaseModel):
    project_id: int
    