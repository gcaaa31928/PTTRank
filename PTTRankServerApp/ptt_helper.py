import operator

from PTTRankServerApp.models import *
from PTTRankServerApp.serializers import PTTSerializer


class PTTHelper:

    @classmethod
    def top_comments(cls, after_datetimes, limit = 20):

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
        print(top_comments)
        return top_comments

    @classmethod
    def post_quality(cls):
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
        return high_quality, low_quality