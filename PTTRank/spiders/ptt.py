# -*- coding: utf-8 -*-
from datetime import datetime

import re
import scrapy
from scrapy.http import FormRequest

from PTTRank.items import PttrankItem


def boards_to_url(boards):
    return map(lambda board: 'http://www.ptt.cc/bbs/' + board + '/index.html', boards)


class PttSpider(scrapy.Spider):
    name = "ptt"
    allowed_domains = ["ptt.cc"]

    boards = ['Gossiping', 'WomenTalk', 'LOL', 'PokemonGO', 'movie', 'Tech_Job', 'Boy-Girl',
              'joke', 'Soft_job', 'StupidClown', 'PC_Shopping']

    start_urls = tuple(boards_to_url(boards))

    max_pages = 20
    current_page = 0
    all_pages_url = []

    def over18_notice(self, response):
        return len(response.css('.over18-notice')) > 0


    def parse(self, response):


        if self.over18_notice(response):
            yield FormRequest.from_response(response,
                                            formdata={'yes': 'yes'},
                                            callback=self.parse)
        else:
            for href in reversed(response.css('.r-ent > div.title > a::attr(href)')):
                # print(href.extract())
                self.all_pages_url.append(response.urljoin(href.extract()))
                # yield scrapy.Request(response.urljoin(href.extract()), callback=self.parse_article)
            previous_page = response.xpath(
                "//a[contains(text(), '上頁')]/@href")
            if previous_page:
                self.current_page += 1
                if self.current_page <= self.max_pages:
                    url = response.urljoin(previous_page[0].extract())
                    yield scrapy.Request(url, callback=self.parse)
            if self.current_page > self.max_pages:
                for href in reversed(self.all_pages_url):
                    yield scrapy.Request(href, callback=self.parse_article)




    def parse_article(self, response):
        item = PttrankItem()
        item['title'] = response.xpath(
            '//meta[@property="og:title"]/@content')[0].extract()

        author = response.xpath(
            '//div[@class="article-metaline"]/span[text()="作者"]/following-sibling::span[1]/text()')[
            0].extract()
        item['author_id'] = author.split(' ')[0]
        item['nick_name'] = author.split(' ')[1]
        datetime_str = response.xpath(
            '//div[@class="article-metaline"]/span[text()="時間"]/following-sibling::span[1]/text()')[0]\
            .extract()
        item['date'] = datetime.strptime(datetime_str, '%a %b %d %H:%M:%S %Y')
        item['board'] = response.css('#topbar .board::text')[0].extract()
        item['contents'] = response.css('#main-content::text')[0].extract()

        comments = []
        total_score = 0
        for comment in response.xpath('//div[@class="push"]'):
            push_tag = comment.css('span.push-tag::text')[0].extract()
            push_user = comment.css('span.push-userid::text')[0].extract()
            push_content = comment.css('span.push-content::text')[0].extract()

            if '推' in push_tag:
                score = 1
            elif '噓' in push_tag:
                score = -1
            else:
                score = 0

            total_score += score

            comments.append({'user': push_user,
                             'content': push_content,
                             'score': score})

        item['comments'] = comments
        item['score'] = total_score
        item['url'] = response.url
        item['hot'] = self.count_hot_weight(item)
        yield item


    def count_hot_weight(self, item, exposed_weight=10, threshold=30):
        weight = 0
        if re.search('\[爆掛\]', item['title']):
            weight += exposed_weight
        weight += len(item['comments'])
        return weight

