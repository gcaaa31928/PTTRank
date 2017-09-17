from sqlalchemy import create_engine, Column, Integer, String, Text, Date, Time, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine.url import URL

from PTTRank import settings

DeclarativeBase = declarative_base()


def db_connect():
    return create_engine(URL(**settings.DATABASE), client_encoding='utf8')


def create_table(engine):
    DeclarativeBase.metadata.create_all(engine)


class PTTArticle(DeclarativeBase):
    __tablename__ = "PTTRankServerApp_ptt"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column('title', String(200))
    author_id = Column('author_id', String(200))
    nick_name = Column('nick_name', String(200))
    date = Column('date', DateTime)
    contents = Column('contents', Text)
    comments = Column('comments', JSONB)
    url = Column('url', String(200), unique=True)
    score = Column('score', Integer)
    board = Column('board', String(200))
    hot = Column('hot', Integer)
