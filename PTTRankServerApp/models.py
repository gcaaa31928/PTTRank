from django.contrib.postgres.fields import JSONField
from django.db import models

# Create your models here.
class PTT(models.Model):
    db_table = 'ptt'
    title = models.CharField(max_length=150, blank=True, default='')
    author_id = models.CharField(max_length=100, blank=True, default='')
    nick_name = models.CharField(max_length=100, blank=True, default= '')
    date = models.DateTimeField(blank=False)
    contents = models.TextField()
    comments = JSONField()
    url = models.CharField(max_length=300, blank=True, default='', unique=True)
    score = models.IntegerField()

class Rank(models.Model):
    top_comments = JSONField(null=True, default='')
    high_quality_post = JSONField(default='')
    low_quality_post = JSONField(default='')