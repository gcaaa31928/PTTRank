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
        high_quality_post, low_quality_post = PTTHelper.post_quality(datetime.datetime(2005, 1, 1))
        rank_object.high_quality_post = high_quality_post
        rank_object.low_quality_post = low_quality_post
        PTTHelper.post_frequency(datetime.datetime(2005, 1, 1))
        rank_object.save()
