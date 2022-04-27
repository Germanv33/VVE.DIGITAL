from app.utils.dbUtil import database
from app.auth import models


def save_user(user: models.UserCreate):
    query = "INSERT INTO customers (email, password, fullname) VALUES ( :email, :password, :fullname)"
    return database.execute(query, values={"email": user.email, "password": user.password, "fullname": user.fullname})


def reset_password(new_password: str, email: str):
    query = "UPDATE customers SET password=:password WHERE email=:email"
    return database.execute(query=query, values={"password": new_password, "email": email})


def find_existed_user(email: str):
    query = "select * from customers where email=:email"
    return database.fetch_one(query, values={"email": email})

