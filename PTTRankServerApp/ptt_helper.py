import operator
import jieba
from django.db.models import Q

from PTTRankServerApp.models import *
from PTTRankServerApp.serializers import PTTSerializer
import re

class PTTHelper:
    jieba.set_dictionary('dict.txt.big')

    @classmethod
    def top_comments(cls, after_datetimes, limit=20):

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
        top_comments = dict()
        for k, v in sorted_result[:limit]:
            top_comments[k] = v
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
    def hot_topic(cls, start_datetime, end_datetime, limit=20, exposed_weight=10, threshold=30):
        ptt = PTT.objects.filter(Q(date__range=(start_datetime, end_datetime)))
        ptt_json = PTTSerializer(ptt, many=True).data
        all_comments_freq = {}
        article_info = {}
        for article in ptt_json:
            title = article['title']
            comments = article['comments']
            all_comments_freq[title] = all_comments_freq.get(title, 0) + len(comments)
            article_info[title] = article
        article_hot = {}
        for key, value in all_comments_freq.items():
            article_hot[key] = article_hot.get(key, 0) + value
            if re.search('\[爆掛\]', key):
                article_hot[key] = article_hot.get(key, 0) + exposed_weight

        result = []
        for key, value in article_hot.items():
            if value >= threshold and key in article_info:
                info = article_info[key]
                info['weight'] = value
                result.append(info)
        return result

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

