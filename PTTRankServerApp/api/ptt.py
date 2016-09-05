from datetime import datetime

from rest_framework import status
from rest_framework.decorators import api_view

from PTTRankServerApp.views import JSONResponse
from ..ptt_helper import *

def epoch_to_datetime(current_epoch):
    current_datetime = datetime.utcfromtimestamp(float(current_epoch))
    return current_datetime

@api_view(['GET'])
def hot_topic(request):
    start_date = epoch_to_datetime(request.GET.get('start_epoch', None))
    end_date = epoch_to_datetime(request.GET.get('end_epoch', None))
    articles = PTTHelper.hot_topic(start_date, end_date)
    return JSONResponse(articles, status=status.HTTP_200_OK)

@api_view(['GET'])
def top_commenters(request):
    start_date = epoch_to_datetime(request.data.get('start_epoch', None))
    commenters = PTTHelper.top_comments(start_date)
    return JSONResponse(commenters, status=status.HTTP_200_OK)

