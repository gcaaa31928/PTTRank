from time import sleep

import scrapy
from scrapy.utils.project import get_project_settings
from scrapy.utils.log import configure_logging
from twisted.internet import reactor
from scrapy.crawler import CrawlerRunner

from PTTRank.spiders.ptt import PttSpider

settings = get_project_settings()
runner = CrawlerRunner(settings)
runner.crawl(PttSpider)
d = runner.join()
d.addBoth(lambda _: reactor.stop())
reactor.run()


