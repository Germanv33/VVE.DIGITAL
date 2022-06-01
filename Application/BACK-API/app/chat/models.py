from datetime import datetime
from pydantic import BaseModel, Field, EmailStr

class Meeting(BaseModel):
    project_id: int
    created_by: int
    date: datetime
    status: str
    
