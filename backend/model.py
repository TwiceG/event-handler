# from sqlalchemy import Column, Integer, String, ForeignKey, Date
# from sqlalchemy.orm import declarative_base, relationship
#
# Base = declarative_base()
#
#
# class Player(Base):
#     __tablename__ = "players"
#     id = Column(Integer, primary_key=True)
#     name = Column(String(255))
#     events = relationship("Event", secondary="player_event", back_populates="players")
#
#
# class PlayerEvent(Base):
#     __tablename__ = 'player_event'
#     id = Column(Integer, primary_key=True)
#     player_id = Column(Integer, ForeignKey('players.id'), primary_key=True)
#     event_id = Column(Integer, ForeignKey('events.id'), primary_key=True)
#
#
# class Event(Base):
#     __tablename__ = "events"
#     id = Column(Integer, primary_key=True)
#     name = Column(String(255))
#     date = Column(Date)
#     players = relationship("Player", secondary="player_event", back_populates="events")
