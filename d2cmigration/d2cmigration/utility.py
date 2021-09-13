import pytz
import datetime
from api.models import * #User,Migration_User,Migration_User_Login_Activity

UTC = pytz.utc
India_current_time = pytz.timezone('Asia/Kolkata')

import logging
logger = logging.getLogger('logfile')

MIGRATION_DATABASE = 'migration'
SOURCE_DATABASE = 'source'
DESTINATION_DATABASE = 'destination'



class Migration_Session():
	def create_session(self,request,state=None,district=None,ps_station=None):
		logger.debug(f'Migration_Session create_session Initial')
		response = False
		try:
			#import pdb; pdb.set_trace()
			username = request.POST.get('username')
			print('username: ', username)
			user_db_instance = User.objects.using(MIGRATION_DATABASE).get(username=username)
			user_instance = Migration_User.objects.using(MIGRATION_DATABASE).get(username=username)
			request.session['username'] = user_db_instance.username
			request.session['first_name'] = user_db_instance.first_name
			request.session['last_name'] = user_db_instance.last_name
			request.session['state'] = state
			request.session['district'] = district
			request.session['ps_station'] = ps_station
			request.session['stream'] = 'migration'
        
			if user_instance.is_admin == 1:
				request.session['is_admin'] = True
			else:
				request.session['is_admin'] = False
			print(f"request.session['is_admin']:{request.session['is_admin']}")
			if user_instance.is_staff == 1:
				request.session['is_staff'] = True
			else:
				request.session['is_staff'] = False

			if user_instance.is_active == 1:
				request.session['is_active'] = True
			else:
				request.session['is_active'] = False

			if user_instance.can_migrate == 1:
				request.session['can_migrate'] = True
			else:
				request.session['can_migrate'] = False

			if user_instance.can_rollback == 1:
				request.session['can_rollback'] = True
			else:
				request.session['can_rollback'] = False
			
			if user_instance.can_test == 1:
				request.session['can_test'] = True
			else:
				request.session['can_test'] = False

			
			request.session['session_create'] = True
			login_time = datetime.datetime.now(India_current_time)
			login_activity = Migration_User_Login_Activity.objects.using(MIGRATION_DATABASE).create(username=username,login_time=login_time)
			request.session['login_activity_pk'] = login_activity.pk
			response=True
			logger.info(f'Migration_Session create_session {{{request.session},{response}}}')
		except Exception as e:
			response=True
			delete_desire_session = self.delete_session(request)
			request = delete_desire_session['request']
			logger.critical(f'Migration_Session create_session {{{request.session},Error:{e}}}')
    	
		logger.debug(f'Migration_Session create_session {{{request.session},{response}}}')
		return ({'request':request,'response':response})

	def delete_session(self,request):
		logger.debug(f'Migration_Session delete_session Initial')
		response = False
		try:
			logout_session_time = datetime.datetime.now(India_current_time)
			if 'username' in request.session:
				del request.session['username']
			if 'first_name' in request.session:
				del request.session['first_name']
			if 'last_name' in request.session:
				del request.session['last_name']
			if 'state' in request.session:
				del request.session['state']
			if 'district' in request.session:
				del request.session['district']
			if 'ps_station' in request.session:
				del request.session['ps_station']
			if 'stream' in request.session:
				del request.session['stream']
			if 'is_admin' in request.session:
				del request.session['is_admin']
			if 'is_staff' in request.session:
				del request.session['is_staff']
			if 'is_active' in request.session:
				del request.session['is_active']
			if 'can_migrate' in request.session:
				del request.session['can_migrate']
			if 'can_rollback' in request.session:
				del request.session['can_rollback']
			if 'can_test' in request.session:
				del request.session['can_test']
				
			if 'login_activity_pk' in request.session:
				if Migration_User_Login_Activity.objects.using(MIGRATION_DATABASE).filter(pk=request.session['login_activity_pk']).exists() is True:
					logout_allowed = Migration_User_Login_Activity.objects.using(MIGRATION_DATABASE).get(pk=request.session['login_activity_pk'])
					logout_allowed.logout_time = logout_session_time
					logout_allowed.save()

				del request.session['login_activity_pk']

			request.session['session_create'] = False
			response = True
		except Exception as e:
			response=False
			logger.critical(f'Migration_Session delete_session {{{request.session},Error:{e},{response}}}')
    	
		logger.debug(f'Migration_Session delete_session {{{request.session},{response}}}')
		return ({'request':request,'response':response})

