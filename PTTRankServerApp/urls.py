from django.conf.urls import url
from .api import ptt
app_name = 'PTTRankServerApp'

urlpatterns = [
    url(r'^hot_topic',ptt.hot_topic, name='hot_topic')
]