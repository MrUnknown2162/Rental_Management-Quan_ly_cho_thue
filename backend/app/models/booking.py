from sqlalchemy import Column, Integer, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database.session import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    unit_id = Column(Integer, ForeignKey("units.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    unit = relationship("Unit", backref="bookings")
    user = relationship("User", backref="bookings")
