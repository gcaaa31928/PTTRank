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
        # rank_object = Rank.objects.create()
        print(PTTHelper.hot_topic(datetime.datetime(2005, 1,1),datetime.datetime(2017, 1,1)))
        # rank_object.save()
