from pydantic import BaseModel, Field, EmailStr


class UpdateUser(BaseModel):
    fullname: str
    
class ChangePassword(BaseModel):
    old_password: str = Field(..., example="old password")
    new_password: str = Field(..., example="new password")
    confirm_password: str = Field(..., example="confirm password")