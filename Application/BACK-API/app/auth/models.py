from pydantic import BaseModel, Field


class UserCreate(BaseModel):
    email: str = Field(..., example="sjdecode@gmail.com")
    password: str = Field(..., example="sjdecode")
    fullname: str = Field(..., example="KaokoKaoko")

class UserList(BaseModel):
    id: int 
    email: str
    fullname: str

class UserPWD(UserList):
    password: str

class UserBasicInfo(BaseModel):
    id: str
    email: str
    fullname: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_info: UserBasicInfo

class TokenData(BaseModel):
    email: str = None

class EmailRequest(BaseModel):
    email: str

class ResetPassword(BaseModel):
    new_password: str
    confirm_password: str
