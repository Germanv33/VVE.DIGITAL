from pydantic import BaseModel

class Project(BaseModel):
    id: int
    customer_id: int
    name: str
    cost: int
    dev_team_id: int
    status: str
    status_color: str

class ProjectCreate(BaseModel):
    customer_id: int
    name: str
    dev_team_id: int
    
    