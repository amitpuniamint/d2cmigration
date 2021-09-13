from django.views import View
from django.shortcuts import render, redirect
from .utility import Migration_Session
from django.contrib import messages
from api.models import *
import logging
logger = logging.getLogger('logfile')

MIGRATION_DATABASE = 'migration'
SOURCE_DATABASE = 'source'
DESTINATION_DATABASE = 'destination'


class Login(View,Migration_Session):
	template_name = 'api/login.html'
	def get(self,request,*args,**kwargs):
		logger.debug(f'Login GET Initial')
		response = False
		try:
			if 'username' in request.session and 'session_create' in request.session:
				if request.session['session_create'] is True:
					response = True
					logger.debug(f'Login GET:{{response:{response}}}')
					return redirect('/')
			
			context = {}
			response = True
			return render(request,Login.template_name,context=context)
		except Exception as e:
			logger.critical(f'Login GET:{{{response},Error:{e}}}')
			messages.error(request,'Login Service is Down.Please contact to Technical Team.')
		
		logger.debug(f'Login GET:{{response:{response}}}')
		return render(request,Login.template_name)

	def post(self,request,*args,**kwargs):
		logger.debug(f'Login POST Initial')
		response = False
		try:
			self.username = request.POST.get('username')
			self.password = request.POST.get('password')
			is_valid_enter = True
			if self.username == '':
				is_valid_enter = False
				messages.error(request,'Please Input Valid Username')

			if self.password == '':
				is_valid_enter = False
				messages.error(request,'Please Input Valid Password')

			if is_valid_enter is True:
				from django.contrib.auth import authenticate
				user = authenticate(username=self.username, password=self.password)
				if user is not None:
					if Migration_User.objects.using(MIGRATION_DATABASE).filter(username=self.username).exists() is True:
						user = Migration_User.objects.using(MIGRATION_DATABASE).get(username=self.username)
						state_name = MState.objects.using(DESTINATION_DATABASE).get(state_cd=user.state,lang_cd='99').state
						district_name = MDistrict.objects.using(DESTINATION_DATABASE).get(district_cd=user.district,lang_cd='99').district
						ps_station = MPoliceStation.objects.using(DESTINATION_DATABASE).get(ps_cd=user.police_station,lang_cd='99').ps
						create_session_response = self.create_session(request,state=state_name,district=district_name,ps_station=ps_station)
						if create_session_response['response'] is True:
							request = create_session_response['request']
							logger.debug(f'Do_Login GET {{Response:{response}}}')
							return redirect('/')
						else:
							messages.error(request,'Login Service is Down.Please contact to Technical Team.')
							logger.debug(f'Do_Login POST {{Response:{response}}}')
							self.delete_session(request)
							return redirect('/login/')	
					else:
						messages.error(request,'InValid Username and Password .')	
				else:
					messages.error(request,'InValid Username and Password .')
			
			response = True
		except Exception as e:
			logger.critical(f'Login POST:{{{response},Error:{e}}}')
			messages.error(request,'Login Service is Down.Please contact to Technical Team.')

		logger.debug(f'Login POST:{{response:{response}}}')
		return render(request,Login.template_name)

class Logout(View,Migration_Session):
	def get(self,request,*args,**kwargs):
		logger.debug(f'Logout GET Initial')
		response = False
		try:
			username = ''
			if 'username' in request.session :
				username = request.session['username']
			self.delete_session(request)
			response = True
			logger.info(f'Logout GET:{{Username:{username} successfully Logout.,}}') 
		except KeyError:
			logger.critical(f'Logout GET:{{{response},Error:{KeyError}}}')
    	
		messages.success(request,'Bye Bye .Please do Login Again')
		logger.debug(f'Logout GET:{{response:{response}}}')
		return redirect('/login/')
	