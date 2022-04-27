from pydantic import BaseSettings
import os
from pathlib import Path


class Settings(BaseSettings):
    def __init__(self):
        parent_path = Path.cwd()
        super(Settings, self).__init__(
            _env_file=f'{parent_path}/.env',
            _env_file_encoding='utf-8')

    DB_CONNECTION: str = "postgresql"
    DB_HOST: str 
    DB_PORT: str
    DB_DATABASE: str
    DB_USERNAME: str
    DB_PASSWORD: str

    

