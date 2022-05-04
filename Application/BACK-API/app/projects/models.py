from pydantic import BaseModel, Field, EmailStr

class Project(BaseModel):
    customer_id: str
    name: str
    cost: int
    dev_team_id: int
    status: str
    status_color: str

