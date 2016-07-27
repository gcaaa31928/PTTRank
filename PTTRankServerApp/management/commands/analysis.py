# -*- coding: utf-8 -*-
import datetime
import json
import operator

from django.core import serializers
from django.core.management import BaseCommand
from PTTRankServerApp.models import *
from PTTRankServerApp.ptt_helper import PTTHelper
from PTTRankServerApp.serializers import PTTSerializer


class Command(BaseCommand):
    help_text = 'my test command'

    def handle(self, *args, **options):
        rank_object = Rank.objects.create()
        rank_object.top_comments = PTTHelper.top_comments(datetime.datetime(2017, 1, 3))
        rank_object.save()


    def post_quality(self, rank_object):
        ptt = PTT.objects.all()
        ptt_json = PTTSerializer(ptt, many=True).data
        author_score = dict()
        for article in ptt_json:
            author_id = article['author_id']
            score = article['score']
            if author_id in author_score:
                author_score[article['author_id']] += score
            else:
                author_score[article['author_id']] = score

        descending_result = sorted(author_score.items(), key=operator.itemgetter(1), reverse=True)
        high_quality = dict()
        low_quality = dict()
        for k, v in descending_result[:20]:
            high_quality[k] = v
        for k, v in descending_result[-20:]:
            low_quality[k] = v
        rank_object.high_quality_post = high_quality
        rank_object.low_quality_post = low_quality