from email.policy import default
import enum
from tkinter.tix import INCREASING
import  sqlalchemy
from sqlalchemy import Identity, MetaData

metadata = MetaData()

class StatusColors(enum.Enum):
    GREEN = "green"
    YELLOW = "yellow"
    RED = "red"



users = sqlalchemy.Table(
    "customers",
    metadata,
    sqlalchemy.Column("id"        , sqlalchemy.INTEGER, primary_key=True),
    sqlalchemy.Column("fullname"  , sqlalchemy.String),
    sqlalchemy.Column("password"  , sqlalchemy.String),
    sqlalchemy.Column("email"     , sqlalchemy.String, nullable=False, unique=True),
)

telegram = sqlalchemy.Table(
    "telegram",
    metadata,
    sqlalchemy.Column("customer_id" , sqlalchemy.INTEGER, sqlalchemy.ForeignKey('customers.id', ondelete='CASCADE'), primary_key=True),
    sqlalchemy.Column("agreement"   , sqlalchemy.String),
    sqlalchemy.Column("telegram_id" , sqlalchemy.String),
)

payment = sqlalchemy.Table(
    "payment",
    metadata,
    sqlalchemy.Column("id"             , sqlalchemy.INTEGER, primary_key=True),
    sqlalchemy.Column("customer_id"    , sqlalchemy.INTEGER, sqlalchemy.ForeignKey('customers.id', ondelete='CASCADE')),
    sqlalchemy.Column("status"         , sqlalchemy.String),
    sqlalchemy.Column("project_id"     , sqlalchemy.INTEGER, sqlalchemy.ForeignKey('project.id', ondelete='CASCADE'), nullable=False, unique=True),
)

status_colors = ('red', 'yellow', 'green')

project = sqlalchemy.Table(
    "project",
    metadata,
    sqlalchemy.Column("id"         , sqlalchemy.INTEGER, primary_key=True),
    sqlalchemy.Column("customer_id", sqlalchemy.INTEGER, sqlalchemy.ForeignKey('customers.id', ondelete='CASCADE'), nullable=False),
    sqlalchemy.Column("name"       , sqlalchemy.String),
    sqlalchemy.Column("cost"       , sqlalchemy.Integer, nullable=True),
    sqlalchemy.Column("dev_team_id", sqlalchemy.INTEGER, sqlalchemy.ForeignKey('dev_team.id', ondelete='CASCADE')),
    sqlalchemy.Column("status"     , sqlalchemy.String, default="Project initialization", server_default="Project initialization"),
    sqlalchemy.Column("status_color", sqlalchemy.Enum(*status_colors, name="status_colors"), nullable=False, default="yellow", server_default="yellow")

)

 
dev_team = sqlalchemy.Table(
    "dev_team",
    metadata,
    sqlalchemy.Column("id"         , sqlalchemy.INTEGER, primary_key=True),
    sqlalchemy.Column("name"       , sqlalchemy.String),
    sqlalchemy.Column("description", sqlalchemy.String, nullable=True),
    sqlalchemy.Column("img"        , sqlalchemy.String, nullable=True),
)


worker_status = ('developer', 'project manager', 'helper')

worker = sqlalchemy.Table(
    "worker",
    metadata,
    sqlalchemy.Column("id"        , sqlalchemy.INTEGER, primary_key=True),
    sqlalchemy.Column("team_id"   , sqlalchemy.INTEGER, sqlalchemy.ForeignKey('dev_team.id', ondelete='CASCADE'), nullable=True),
    sqlalchemy.Column("fullname"  , sqlalchemy.String),
    sqlalchemy.Column("password"  , sqlalchemy.String),
    sqlalchemy.Column("email"     , sqlalchemy.String, nullable=False, unique=True),
    sqlalchemy.Column("role"      , sqlalchemy.Enum(*worker_status, name="worker_status"), server_default='developer'),
)


check_point = sqlalchemy.Table(
    "check_point",
    metadata,
    sqlalchemy.Column("project_id", sqlalchemy.INTEGER, sqlalchemy.ForeignKey('project.id', ondelete='CASCADE'), nullable=False),
    sqlalchemy.Column("created_by", sqlalchemy.INTEGER, sqlalchemy.ForeignKey('worker.id', ondelete='CASCADE'), nullable=False),
    sqlalchemy.Column("status"   , sqlalchemy.String),
    sqlalchemy.Column("point"  , sqlalchemy.String),
    sqlalchemy.Column("date"  , sqlalchemy.DateTime),
) 


meeting = sqlalchemy.Table(
    "meeting",
    metadata,
    sqlalchemy.Column("id"        , sqlalchemy.INTEGER, primary_key=True, autoincrement=True),
    sqlalchemy.Column("project_id", sqlalchemy.INTEGER, sqlalchemy.ForeignKey('project.id', ondelete='CASCADE'), nullable=False),
    sqlalchemy.Column("created_by", sqlalchemy.INTEGER, sqlalchemy.ForeignKey('worker.id'), nullable=False),
    sqlalchemy.Column("date"      , sqlalchemy.Date ),
    sqlalchemy.Column("status"    , sqlalchemy.String),
) 

project_workers = sqlalchemy.Table(
    "project_workers",
    metadata,
    sqlalchemy.Column("project_id", sqlalchemy.INTEGER, sqlalchemy.ForeignKey('project.id', ondelete='CASCADE'), nullable=False),
    sqlalchemy.Column("worker_id" , sqlalchemy.INTEGER, sqlalchemy.ForeignKey('worker.id', ondelete='CASCADE'), nullable=False),
) 

stars = ("1",'2','3','4','5')

review = sqlalchemy.Table(
    "review",
    metadata,
    sqlalchemy.Column("id"         , sqlalchemy.INTEGER, primary_key=True),
    sqlalchemy.Column("project_id" , sqlalchemy.INTEGER, sqlalchemy.ForeignKey('project.id'), nullable=False),
    sqlalchemy.Column("customer_id", sqlalchemy.INTEGER, sqlalchemy.ForeignKey('customers.id'), nullable=False),
    sqlalchemy.Column("title"      , sqlalchemy.String),
    sqlalchemy.Column("date"       , sqlalchemy.DateTime),
    sqlalchemy.Column("text"       , sqlalchemy.String),
    sqlalchemy.Column("stars"      , sqlalchemy.Enum(*stars, name = "stars")), 
)


project_technology = sqlalchemy.Table(
    "project_technology",
    metadata,
    sqlalchemy.Column("id"         , sqlalchemy.INTEGER, primary_key=True),
    sqlalchemy.Column("dev_team_id", sqlalchemy.INTEGER, sqlalchemy.ForeignKey('dev_team.id', ondelete='CASCADE'), nullable=False),
    sqlalchemy.Column("technology" , sqlalchemy.String, nullable=False),
    sqlalchemy.Column("completeness" , sqlalchemy.Float, nullable=False)
)


project_design = sqlalchemy.Table(
    "project_design",
    metadata,
    sqlalchemy.Column("id"         , sqlalchemy.INTEGER, primary_key=True),
    sqlalchemy.Column("dev_team_id", sqlalchemy.INTEGER, sqlalchemy.ForeignKey('dev_team.id', ondelete='CASCADE'), nullable=False),
    sqlalchemy.Column("design" , sqlalchemy.String, nullable=False),
    sqlalchemy.Column("completeness" , sqlalchemy.Float, nullable=False)
)
