# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
from sqlalchemy.orm import sessionmaker
from .models import *
class PttrankPipeline(object):

    def __init__(self):
        engine = db_connect()
        create_table(engine)
        self.Session = sessionmaker(bind=engine)

    def process_item(self, item, spider):
        session = self.Session()
        ptt_article = session.query(PTTArticle).filter(PTTArticle.url == item['url']).first()
        if ptt_article:
            # print(item)
            session.query(PTTArticle).filter(PTTArticle.url == item['url']).update(item)
            session.commit()
            return item
        else:
            session = self.Session()
            ptt_article = PTTArticle(**item)
            session.add(ptt_article)
            session.commit()
            return item

