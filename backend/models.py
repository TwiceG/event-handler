from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Sequence, Boolean
from sqlalchemy.orm import declarative_base, relationship
from flask_sqlalchemy import SQLAlchemy


Base = declarative_base()
db = SQLAlchemy()


class Player(Base):
    __tablename__ = "players"
    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    events = relationship("Event", secondary="player_event", back_populates="players")


class PlayerEvent(Base):
    __tablename__ = 'player_event'
    id = Column(Integer, Sequence('player_event_id_seq', start=1, increment=1), primary_key=True, autoincrement=True)
    player_id = Column(Integer, ForeignKey('players.id'), primary_key=True)
    event_id = Column(Integer, ForeignKey('events.id'), primary_key=True)


class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    date = Column(DateTime)
    ongoing = Column(Boolean)
    players = relationship("Player", secondary="player_event", back_populates="events")


class Match(Base):
    __tablename__ = "matches"
    id = Column(Integer, primary_key=True)
    player_1_id = Column(Integer, ForeignKey("players.id"), primary_key=True)
    player_2_id = Column(Integer, ForeignKey("players.id"), primary_key=True)
    event_id = Column(Integer, ForeignKey("events.id"), primary_key=True)
    winner = Column(Integer, ForeignKey("players.id"), primary_key=True, nullable=True)
