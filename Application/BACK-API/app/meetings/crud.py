from passlib.context import CryptContext
from app.utils.dbUtil import database
from .models import Meeting

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_meetings(project_id: int):
    query = "SELECT * FROM meeting WHERE meeting.project_id = :id"
    return database.fetch_all(query, values={"id": id})


def create_meeting(register_info: Meeting):
    query = "INSERT INTO meeting (project_id, created_by, date, status) VALUES (:project_id, :created_by, :date, :status)"
    return database.execute(query, values={"project_id": register_info.project_id, "created_by": register_info.created_by, "date": register_info.date, "status": register_info.status })
    
    