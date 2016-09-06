from datetime import datetime
import time

from rest_framework import status
from rest_framework.decorators import api_view

from PTTRankServerApp.views import JSONResponse
from ..ptt_helper import *
from ..serializers import *

def epoch_to_datetime(current_epoch):
    current_datetime = datetime.utcfromtimestamp(float(current_epoch))
    return current_datetime

@api_view(['GET'])
def hot_topic(request):
    start_date = epoch_to_datetime(request.GET.get('start_epoch', None))
    end_date = epoch_to_datetime(request.GET.get('end_epoch', int(time.mktime(datetime.now().timetuple()))))
    articles = PTTHelper.hot_topic(start_date, end_date)
    ptt_json = PTTBriefSerializer(articles, many=True).data
    return JSONResponse(ptt_json, status=status.HTTP_200_OK)

@api_view(['GET'])
def top_commenters(request):
    start_date = epoch_to_datetime(request.GET.get('start_epoch', None))
    commenters = PTTHelper.top_comments(start_date)
    return JSONResponse(commenters, status=status.HTTP_200_OK)

