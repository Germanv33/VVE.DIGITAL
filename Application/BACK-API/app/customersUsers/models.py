from pydantic import BaseModel, Field, EmailStr


class UpdateUser(BaseModel):
    fullname: str

class UserSchema(BaseModel):
    id      : int = Field(...)
    fullname: str = Field(...)
    email   : EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "fullname": "German Vybornov",
                "email": "abdulazeez@x.com",
                "password": "weakpassword"
            }
        }

class UserLoginSchema(BaseModel):
    email   : EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "email": "abdulazeez@x.com",
                "password": "weakpassword"
            }
        }