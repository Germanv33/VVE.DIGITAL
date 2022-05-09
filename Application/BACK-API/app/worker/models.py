from pydantic import BaseModel, Field, EmailStr

class Worker(BaseModel):
    id: str
    fullname: str
    email: str
    team_id: int
    password: str
    

class WorkerCreate(BaseModel):
    fullname: str
    email: str
    password: str
    