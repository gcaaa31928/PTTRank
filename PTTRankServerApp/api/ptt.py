from datetime import datetime

from django.utils.timezone import activate
import time

from rest_framework import status
from rest_framework.decorators import api_view

from PTTRankServer import settings
from PTTRankServerApp.views import JSONResponse
from ..ptt_helper import *
from ..serializers import *

activate(settings.TIME_ZONE)

def epoch_to_datetime(current_epoch):
    current_datetime = datetime.fromtimestamp(float(current_epoch))
    # current_datetime = datetime.utcfromtimestamp(float(current_epoch))
    return current_datetime

@api_view(['GET'])
def hot_topic(request):
    start_date = epoch_to_datetime(request.GET.get('start_epoch', None))
    end_date = epoch_to_datetime(request.GET.get('end_epoch', int(time.mktime(datetime.now().timetuple()))))
    limit = int(request.GET.get('limit', 20))
    start_page = int(request.GET.get('start_page', 0))
    articles = PTTHelper.hot_topic(start_date, end_date, start_page * limit, limit, threshold=10)
    ptt_json = PTTBriefSerializer(articles, many=True).data
    return JSONResponse(ptt_json, status=status.HTTP_200_OK)

@api_view(['GET'])
def top_commenters(request):
    start_date = epoch_to_datetime(request.GET.get('start_epoch', None))
    commenters = PTTHelper.top_comments(start_date)
    return JSONResponse(commenters, status=status.HTTP_200_OK)

