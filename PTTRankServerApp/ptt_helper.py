import operator
import jieba
from django.db.models import Q

from PTTRankServerApp.models import *
from PTTRankServerApp.serializers import PTTSerializer
import re


class PTTHelper:
    jieba.set_dictionary('dict.txt.big')

    @classmethod
    def top_comments(cls, after_datetimes, limit=10):

        ptt = PTT.objects.filter(date__gt=after_datetimes)
        ptt_json = PTTSerializer(ptt, many=True).data
        user_comments_times = dict()
        for article in ptt_json:
            comments = article['comments']
            for comment in comments:
                user = comment['user']
                if user in user_comments_times:
                    user_comments_times[user] += 1
                else:
                    user_comments_times[user] = 1

        sorted_result = sorted(user_comments_times.items(), key=operator.itemgetter(1), reverse=True)
        top_comments = []
        for k, v in sorted_result[:limit]:
            top_comments.append({
                'id': k,
                'score': v
            })
        return top_comments

    @classmethod
    def post_quality(cls, after_datetimes, limit=20):
        ptt = PTT.objects.filter(date__gt=after_datetimes)
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
        for k, v in descending_result[:limit]:
            high_quality[k] = v
        for k, v in descending_result[-limit:]:
            low_quality[k] = v
        return high_quality, low_quality

    @classmethod
    def post_frequency(cls, after_datetimes, limit=20):
        ptt = PTT.objects.filter(date__gt=after_datetimes)
        ptt_json = PTTSerializer(ptt, many=True).data
        author_freq = dict()
        for article in ptt_json:
            author_id = article['author_id']
            if author_id in author_freq:
                author_freq[author_id] += 1
            else:
                author_freq[author_id] = 1

        descending_result = sorted(author_freq.items(), key=operator.itemgetter(1), reverse=True)
        high_freq = dict()
        low_freq = dict()
        for k, v in descending_result[:limit]:
            high_freq[k] = v
        for k, v in descending_result[-limit:]:
            low_freq[k] = v
        return high_freq, low_freq

    @classmethod
    def hot_topic(cls, start_datetime, end_datetime, start=0, limit=20, exposed_weight=10, threshold=30):
        ptt = PTT.objects.filter(
            Q(date__range=(start_datetime, end_datetime)),
            Q(hot__gte=threshold),
            ~Q(title__contains="公告")
        )[start:start+limit]
        return ptt

    @classmethod
    def conscience_comments(cls, after_datetimes, limit=20):
        ptt = PTT.objects.filter(date__gt=after_datetimes)
        ptt_json = PTTSerializer(ptt, many=True).data
        commenter_score = dict()
        for article in ptt_json:
            comments = article['comments']
            for comment in comments:
                user = comment['user']
                score = comment['score']
                commenter_score[user] = commenter_score.get(user, 0) + score
        descending_result = sorted(commenter_score.items(), key=operator.itemgetter(1), reverse=True)
        kind = dict()
        evil = dict()
        for k, v in descending_result[:limit]:
            kind[k] = v
        for k, v in descending_result[-limit:]:
            evil[k] = v
        return kind, evil
