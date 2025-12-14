from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database.session import Base


class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    name = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    description = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", backref="properties")
