from rest_framework import serializers
from PTTRankServerApp.models import PTT


class PTTSerializer(serializers.ModelSerializer):
    class Meta:
        model = PTT
        fields = ('id', 'title', 'author_id', 'nick_name', 'date', 'contents', 'comments', 'url', 'score', 'hot')


class PTTBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = PTT
        fields = ('id', 'title', 'author_id', 'nick_name', 'date', 'url', 'score', 'hot', 'board')

