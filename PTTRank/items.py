# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class PttrankItem(scrapy.Item):
    title = scrapy.Field()
    author_id = scrapy.Field()
    nick_name = scrapy.Field()
    date = scrapy.Field()
    contents = scrapy.Field()
    comments = scrapy.Field()
    url = scrapy.Field()
    score = scrapy.Field()
    board = scrapy.Field()
    hot = scrapy.Field()