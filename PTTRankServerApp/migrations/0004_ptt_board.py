# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-04 08:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PTTRankServerApp', '0003_auto_20160727_1311'),
    ]

    operations = [
        migrations.AddField(
            model_name='ptt',
            name='board',
            field=models.CharField(blank=True, default='', max_length=150),
        ),
    ]
