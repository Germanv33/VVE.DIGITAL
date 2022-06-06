import datetime
from passlib.context import CryptContext
from app.utils.dbUtil import database


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_full_tech(project_id: int):
    query = "SELECT * FROM project_technology WHERE project_id = :id"
    return database.fetch_all(query, values={"id": project_id})

def get_tech(project_id: int):
    query = "SELECT technology, completeness FROM project_technology WHERE project_id = :id"
    return database.fetch_all(query, values={"id": project_id})

# def create_tech(project_id: int, created_by: int, date: datetime.datetime,  status: str):
#     query = "INSERT INTO meeting (project_id, created_by, date, status) VALUES (:project_id, :created_by, :date, :status)"
#     return database.execute(query, values={"project_id": project_id, "created_by": created_by, "date": date, "status": status })
    

# def get_last_meeting(project_id: int):
#     query = "SELECT * FROM meeting WHERE meeting.project_id = :id ORDER BY date DESC"
#     return database.fetch_all(query, values={"id": project_id})

