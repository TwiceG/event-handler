from backend.model.base import Base
from database_config import engine

Base.metadata.create_all(engine)
