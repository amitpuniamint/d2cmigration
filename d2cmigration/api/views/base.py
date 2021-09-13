"""
Description : All Import Package
"""
import functools

from django.contrib.auth.decorators import user_passes_test
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseRedirect


# Basic Package
from django.contrib import messages

#File Read Package
from django.conf import settings
import os
MIGRATE_LOG_PATH = os.path.join(settings.BASE_DIR,'logs','migration')

#ALL DATABASE
from django.db import transaction, IntegrityError
from api.models import *

MIGRATION_DATABASE = 'migration'
SOURCE_DATABASE = 'source'
DESTINATION_DATABASE = 'destination'


#Templete Package 
from django.views import View
from django.shortcuts import render, redirect
from django.http import HttpResponse 
import json

# Database Package Import 

# Logger 
import logging
logger = logging.getLogger('logfile')



# Local TimeStamp
import datetime
import pytz
UTC = pytz.utc
India_current_time = pytz.timezone('Asia/Kolkata')


