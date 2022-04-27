# import databases, sqlalchemy

# ## Postgres Database
# DATABASE_URL = "postgresql://usertest:vvedb@127.0.0.1:5432/dbtest"
# database = databases.Database(DATABASE_URL)
# metadata = sqlalchemy.MetaData()

# users = sqlalchemy.Table(
#     "customers",
#     metadata,
#     sqlalchemy.Column("id"        , sqlalchemy.INTEGER, primary_key=True),
#     sqlalchemy.Column("username"  , sqlalchemy.String),
#     sqlalchemy.Column("password"  , sqlalchemy.String),
#     sqlalchemy.Column("email"     , sqlalchemy.String, nullable=False),
# )

# engine = sqlalchemy.create_engine(
#     DATABASE_URL
# )

# metadata.create_all(engine)