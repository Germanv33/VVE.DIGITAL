from pydantic import BaseModel, Field, EmailStr

class DevTeam(BaseModel):
    id: int
    name: str
    description: str
    img: str
    

class DevTeamCreate(BaseModel):
    name: str
    description: str
