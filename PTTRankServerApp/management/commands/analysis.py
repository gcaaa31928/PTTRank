from django.core import serializers
from django.core.management import BaseCommand
from PTTRankServerApp.models import *
from PTTRankServerApp.serializers import PTTSerializer


class Command(BaseCommand):
    help_text = 'my test command'

    def handle(self, *args, **options):
        ptt = PTT.objects.get(pk=1)
        serializer = PTTSerializer(ptt)
        print(serializer.data['comments'][0]['user'])
        print(serializer.data)