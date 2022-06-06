from datetime import datetime
from pydantic import BaseModel, Field, EmailStr

class Tech(BaseModel):
    project_id: int
    created_by: int
    date: datetime
    status: str