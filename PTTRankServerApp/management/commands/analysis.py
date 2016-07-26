# -*- coding: utf-8 -*-
import operator

from django.core import serializers
from django.core.management import BaseCommand
from PTTRankServerApp.models import *
from PTTRankServerApp.serializers import PTTSerializer


class Command(BaseCommand):
    help_text = 'my test command'

    def handle(self, *args, **options):
       self.top_comments()

    def top_comments(self):
        ptt = PTT.objects.all()
        ptt_json = PTTSerializer(ptt, many=True).data
        user_comments_times = dict()
        for json in ptt_json:
            comments = json['comments']
            for comment in comments:
                user = comment['user']
                if user in user_comments_times:
                    user_comments_times[user] += 1
                else:
                    user_comments_times[user] = 1

        sorted_result = sorted(user_comments_times.items(), key=operator.itemgetter(1), reverse=True)
        for k, v in sorted_result:
            print(k,v)

