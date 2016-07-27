# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-07-27 05:11
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('PTTRankServerApp', '0002_rank'),
    ]

    operations = [
        migrations.AddField(
            model_name='rank',
            name='high_quality_post',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=''),
        ),
        migrations.AddField(
            model_name='rank',
            name='low_quality_post',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=''),
        ),
        migrations.AlterField(
            model_name='rank',
            name='top_comments',
            field=django.contrib.postgres.fields.jsonb.JSONField(default='', null=True),
        ),
    ]
