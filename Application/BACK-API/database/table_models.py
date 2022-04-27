from enum import unique
import databases, sqlalchemy
from sqlalchemy import MetaData

metadata = MetaData()

users = sqlalchemy.Table(
    "customers",
    metadata,
    sqlalchemy.Column("id"        , sqlalchemy.INTEGER, primary_key=True),
    sqlalchemy.Column("fullname"  , sqlalchemy.String),
    sqlalchemy.Column("password"  , sqlalchemy.String),
    sqlalchemy.Column("email"     , sqlalchemy.String, nullable=False, unique=True),
)
