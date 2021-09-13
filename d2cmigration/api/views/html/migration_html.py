from ..base import *
from .migration_rollback import *

class Migration_Initial_HTML_Handler(View,Migration_Batch_Process):
	template_name = 'api/migration/m_initial.html'
	def get(self,request,*args,**kwargs):
		logger.debug(f'Migration_Initial_HTML_Handler GET Initial')
		response = False
		try:

			if request.session['can_migrate'] is False:
				logger.debug(f'Migration_Initial_HTML_Handler GET {{Response:{response},User:{request.session["username"]},Not Permission}}')
				return redirect('/')
			
			context = {}
			context['page_name'] = 'migration'
			context['sub_page'] = 'migration_initial'
			
			# Check Is Running Any Migration or RollBack
			is_running = Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).all().exclude(status =2)
			get_pk = is_running.values_list('history_pk',flat=True)
			is_running_history = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).filter(pk__in=list(get_pk))
			context['is_running'] = is_running_history

			#Check Migration Query Set for User
			if request.session['is_admin'] is True and request.session['is_staff'] is True:
				context['history_query_get'] = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).filter(program_of_type__in = ['M'],user=request.session['username'],status=0).exclude(pk__in=list(Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).all().values_list('history_pk',flat=True))).order_by('-create_time')
				context['state_list'] = MState.objects.using(SOURCE_DATABASE).filter(lang_cd='99', record_status='C').exclude(state='').order_by('state')
			elif request.session['is_admin'] is False and request.session['is_staff'] is True:
				context['history_query_get'] = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).filter(program_of_type__in = ['M'],status=0).exclude(pk__in=list(Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).all().values_list('history_pk',flat=True))).order_by('-create_time')
				context['state'] = MState.objects.using(SOURCE_DATABASE).get(lang_cd='99', record_status='C',state=request.session['state'])
				context['district'] = MDistrict.objects.using(SOURCE_DATABASE).get(lang_cd='99', record_status='C',district=request.session['district'])
				context['ps_station'] = MPoliceStation.objects.using(SOURCE_DATABASE).get(lang_cd='99', record_status='C',ps=request.session['ps_station'])
				
			# Year Getting
			context['year'] = []
			for item in range(2000,2022):
				context['year'].append(item)
			
			response = True
			logger.debug(f'Migration_Initial_HTML_Handler GET {{Response:{response}}}')
			return render(request,Migration_Initial_HTML_Handler.template_name,context)
		except Exception as e:
			logger.critical(f'Migration_Initial_HTML_Handler GET {{ERROR:{e},Response:{response}}}')
			messages.error(request,'Migration Servics is Down.Please Contact With Techinical Team.')

		logger.debug(f'Migration_Initial_HTML_Handler GET {{Response:{response}}}')
		return redirect('/')

	def post(self,request,*args,**kwargs):
		logger.debug(f'Migration_Initial_HTML_Handler POST Initial')
		response = False
		try:
			if request.session['can_migrate'] is False:
				logger.debug(f'Migration_Initial_HTML_Handler POST {{Response:{response},User:{request.session["username"]},Not Permission}}')
				return redirect('/')

			if 'search_type' in request.POST:
				search_type = request.POST.get('search_type')
				print('Search Type: ', search_type)
			else:
				messages.error(request,f'Please choose valid Create Batch Type Method.')
				logger.error(f'Migration_Initial_HTML_Handler Not Choose Search Type by User.{{user:{request.session["username"]}}}')
				logger.debug(f'Migration_Initial_HTML_Handler POST {{Response:{response}}}')
				return redirect('/migration/')

			if search_type == '1':
				initial_method_response = self.initial_all_fir(request,request.session['username'],*args,**kwargs)
				print('initial_method_response: ', initial_method_response)
				if initial_method_response is True:
					file_path = os.path.join(MIGRATE_LOG_PATH,f'{self.batch_instance.batch_sr_num}.log')
					f = open(file_path,'a+')
					f.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Batch:{self.batch_instance.batch_sr_num} Successfully Created \n')				
					f.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Batch:{self.batch_instance.batch_sr_num} ,Total FIR Count:{self.batch_instance.fir_sr_count} \n')				
					f.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Batch:{self.batch_instance.batch_sr_num} ,Created Time:{self.batch_instance.create_time} \n')	
					f.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Batch:{self.batch_instance.batch_sr_num} ,Created User:{request.session["username"]} \n')				
					f.close()
					response = True
			elif search_type == '2':
				self.state_code = [request.POST.get('state')]
				self.district_code = [request.POST.get('district')]
				self.ps_code = [request.POST.get('pstation')]
				self.year = [request.POST.get('year')]
				blank = ['SS']
				if (set(blank).issubset(set(self.state_code))) is False and (set(blank).issubset(set(self.district_code))) is False and (set(blank).issubset(set(self.ps_code))) is False and (set(blank).issubset(set(self.year))) is False:
					if request.session['is_admin'] is True:
						initial_method_response = self.initial_coustm_search(request,request.session['username'],*args,**kwargs)
					else:
						state = MState.objects.using(SOURCE_DATABASE).get(lang_cd='99', record_status='C',state_cd = self.state_code[0])
						district = MDistrict.objects.using(SOURCE_DATABASE).get(lang_cd='99', record_status='C',district_cd=self.district_code[0]) 
						ps_station = MPoliceStation.objects.using(SOURCE_DATABASE).get(lang_cd='99', record_status='C',ps_cd=self.ps_code[0])
						if request.session['state'] == state.state and request.session['district'] == district.district and request.session['ps_station'] == ps_station.ps:
							initial_method_response = self.initial_method(request,search_type,request.session['username'])
							if initial_method_response is True:
								file_path = os.path.join(MIGRATE_LOG_PATH,f'{self.batch_instance.batch_sr_num}.log')
								f = open(file_path,'a+')
								f.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Batch:{self.batch_instance.batch_sr_num} Successfully Created \n')				
								f.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Batch:{self.batch_instance.batch_sr_num} ,Total FIR Count:{self.batch_instance.fir_sr_count} \n')				
								f.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Batch:{self.batch_instance.batch_sr_num} ,Created Time:{self.batch_instance.create_time} \n')	
								f.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Batch:{self.batch_instance.batch_sr_num} ,Created User:{request.session["username"]} \n')				
								f.close()
								response = True
						else:
							messages.error(request,'You Have No Permission for Create Migration.')				
				else:
					if (set(blank).issubset(set(self.state_code))):
						messages.error(request,'Please choose FIR Registration State')
					elif (set(blank).issubset(set(self.district_code))):
						messages.error(request,'Please choose FIR Registration District')
					elif (set(blank).issubset(set(self.ps_code))):
						messages.error(request,'Please choose FIR Registration Police Station')
					elif (set(blank).issubset(set(self.year))):
						messages.error(request,'Please choose FIR Registration Year')
		except Exception as e:
			print(e)
			messages.error(request,'Due to System Error ,Unable to Created Migration Batch.Please contact your Techinical Team.')
			logger.critical(f'Migration_Initial_HTML_Handler POST {{ERROR:{e},Response:{response}}}')

		logger.debug(f'Migration_Initial_HTML_Handler POST {{Response:{response}}}')
		return redirect('/migration/')

class Migration_Cancle_HTML_Handler(View,Migration_Batch_Process):
	def get(self,request,pk,*args,**kwargs):
		logger.debug(f'Migration_Cancle_HTML_Handler GET Initial')
		response = False
		try:
			if request.session['can_migrate'] is False:
				messages.error(request,'Have No Permission for Cancle Request.')
				logger.debug(f'Migration_Cancle_HTML_Handler GET {{Response:{response}}}')
				return redirect('/')

			history_Batch = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
			if request.session['is_admin'] is False:
				if history_Batch.user != request.session['username']:
					messages.error(request,'Invalid Request.Please Not try again.')
					logger.critical(f'Migration_Cancle_HTML_Handler GET {{Response:{response},Error:Unauthorized Cancle Request.,Username{request.session["username"]},Pk:{pk} }}')
					logger.debug(f'Migration_Cancle_HTML_Handler GET {{Response:{response}}}')
					return redirect('/migration/')
				
			if history_Batch.status != 0:
				if history_Batch.status == 1:
					messages.error(request,'Rollback Process is running,Due to which unable to cancle')
				if history_Batch.status == 2:
					messages.error(request,'Rollback Process is Complete Success.Unable to cancle')
				if history_Batch.status == 3:
					messages.error(request,'Rollback Process is Failed.Unable to cancle')
				if history_Batch.status == 4:
					messages.error(request,'Already Cancle this Rollback Process .')
				if history_Batch.status == 5:
					messages.error(request,'Rollback Process is Abort by User.Due to which unable to cancle')

				logger.debug(f'Migration_Cancle_HTML_Handler GET {{Response:{response}}}')
				return redirect('/migration/')
				
			batch_sr_num = history_Batch.batch_sr_num
			file_path = os.path.join(MIGRATE_LOG_PATH,f'{batch_sr_num}.log')
			f = open(file_path,'a+')
			f.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Batch:{batch_sr_num} Cancle Request Start \n')
			try:
				with transaction.atomic(using=MIGRATION_DATABASE):
					f.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Batch:{batch_sr_num} Cancle Request, User:{request.session["username"]} \n')
					self.cancle_migration_batch(request,history_Batch,request.session["username"])
					f.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Batch:{batch_sr_num} Successfull Cancle. \n')				
					f.close()
					messages.success(request,f'Migration Batch {batch_sr_num} Successfull Cancle.')
					response = True
					logger.debug(f'Migration_Cancle_HTML_Handler GET {{Response:{response}}}')
					return redirect('/migration/')
			except IntegrityError:
				messages.error(request,'Due to Database Error ,Unable to Cancle Migration Batch.Please contact your Techinical Team.')
				logger.critical(f'Migration_Batch_Process initial_method {{Error:{IntegrityError}}}')
				transaction.rollback(using=MIGRATION_DATABASE)		
				f.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Batch:{batch_sr_num} Cancle Failed Due to Database Error \n')				
			except Exception as e:
				messages.error(request,'Due to System Error ,Unable to Cancle Migration Batch.Please contact your Techinical Team.')
				logger.critical(f'Migration_Batch_Process initial_method {{Error:{e}}}')
				transaction.rollback(using=MIGRATION_DATABASE)		
				f.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Batch:{batch_sr_num} Cancle Failed Due to System Error \n')	
			f.close()			
		
		except TMigration_Batch_History.DoesNotExist:
			logger.critical(f'Migration_Batch_Details GET {{Table:TMigration_Batch_History,ERROR:InValid PK,PK:{pk},user:{request.session["username"]},Response:{response}}}')
			messages.error(request,'Invalid Request.Please not Try again')
		
		except Exception as e:
			logger.critical(f'Migration_Cancle_HTML_Handler GET {{ERROR:{e},Response:{response}}}')
			messages.error(request,'Migration Cancle Servics is Down.Please Contact With Techinical Team.')

		logger.debug(f'Migration_Cancle_HTML_Handler GET {{Response:{response}}}')
		return redirect('/migration/')

class Migration_Auth_Handler(View,Migration_Batch_Process):
	template_name = 'api/migration/m_auth.html'
	def get(self,request,pk,*args,**kwargs):
		logger.debug(f'Migration_Auth_Handler GET Initial')
		response = False
		try:
			if request.session['can_migrate'] is False:
				messages.error(request,'Have No Permission for this Request.')
				logger.debug(f'Migration_Auth_Handler GET {{Response:{response}}}')
				return redirect('/')

			history_Batch = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
			if history_Batch.user != request.session['username']:
				messages.error(request,'Invalid Request.Please Not try again.')
				logger.critical(f'Migration_Auth_Handler GET {{Response:{response},Error:Unauthorized Auth Request.,Username:{request.session["username"]},Pk:{pk} }}')
				logger.debug(f'Migration_Auth_Handler GET {{Response:{response}}}')
				return redirect('/migration/')

			if history_Batch.is_auth == 1:
				response = True
				logger.debug(f'Migration_Auth_Handler GET {{Response:{response}}}')
				return redirect(f'/migration/details/{pk}/')

			context = {}
			context['page_name'] = 'migration'
			context['sub_page'] = 'migration_initial'
			response = True
			logger.debug(f'Migration_Auth_Handler GET {{Response:{response}}}')
			return render(request,Migration_Auth_Handler.template_name,context)
		except TMigration_Batch_History.DoesNotExist:
			logger.critical(f'Migration_Batch_Details GET {{Table:TMigration_Batch_History,ERROR:InValid PK,PK:{pk},user:{request.session["username"]},Response:{response}}}')
			messages.error(request,'Invalid Request.Please not Try again')
		
		except Exception as e:
			logger.critical(f'Migration_Auth_Handler GET {{ERROR:{e},Response:{response}}}')
			messages.error(request,'Migration Authentication Serives is down.Please Contact With Techinical Team.')

		logger.debug(f'Migration_Auth_Handler GET {{Response:{response}}}')
		return redirect('/migration/')

	def post(self,request,pk,*args,**kwargs):
		logger.debug(f'Migration_Auth_Handler POST Initial')
		response = False
		try:
			# Check Can Migrate
			if request.session['can_migrate'] is False:
				messages.error(request,'Have No Permission for this Request.')
				logger.debug(f'Migration_Auth_Handler POST {{Response:{response}}}')
				return redirect('/')

			history_Batch = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
			
			# Check Can Own Username
			if history_Batch.user != request.session['username']:
				messages.error(request,'Invalid Request.Please Not try again.')
				logger.critical(f'Migration_Auth_Handler POST {{Response:{response},Error:Unauthorized Auth Request.,Username:{request.session["username"]},Pk:{pk} }}')
				logger.debug(f'Migration_Auth_Handler POST {{Response:{response}}}')
				return redirect('/migration/')

			# Check Auth Process is complete
			if history_Batch.is_auth == 1:
				response = True
				logger.debug(f'Migration_Auth_Handler POST {{Response:{response}}}')
				return redirect(f'/migration/details/{pk}/')

			password = request.POST.get('password')
			method_type = request.POST.get('migration_method')

			# Check Input Value
			if password == '' or method_type not in ['F','T']:
				if password == '':
					messages.error(request,'Please enter Valid Password')
				if method_type not in ['F','T']:
					messages.error(request,'Please Choose Valid Method')

				logger.debug(f'Migration_Auth_Handler POST {{Response:{response}}}')
				return redirect(f'/migration/authentication/{pk}/')
				

			# Check Auth Count
			current_Auth_Count = history_Batch.auth_count
			if current_Auth_Count >= 4:
				logger.debug(f'Migration_Auth_Handler POST {{Response:{response}}}')
				return redirect(f'/migration/details/{pk}/')


			# Authentication Start
			username = request.session['username']
			user_instance = User.objects.using(MIGRATION_DATABASE).get(username=username)
			try:
				current_Auth_Count = current_Auth_Count + 1
				from django.contrib.auth import authenticate
				user = authenticate(username=username, password=password)
				if user is not None:
					if current_Auth_Count >=4 :
						if current_Auth_Count == 4:
							messages.error(request,'You Have Complete Authentication Attempt.Batch has been cancle due to Unauthorized.This Will be save for further use.')
							self.unauthorized_migration_batch(request,history_Batch)
							logger.debug(f'Migration_Auth_Handler POST {{Response:{response}}}')
							return redirect(f'/migration/')

						history_Batch.auth_count = 4
						history_Batch.save(using=MIGRATION_DATABASE)
					else:
						history_Batch.auth_count = current_Auth_Count
						history_Batch.save(using=MIGRATION_DATABASE)
						if current_Auth_Count == 3:
							messages.error(request,'You have last chance for enter Password.Please Enter Valid Password.Otherwise we do failed this Migration Batch.')
						else:
							messages.error(request,'Password is Invalid.Please Try again.')

					logger.debug(f'Migration_Auth_Handler POST {{Response:{response}}}')
					return redirect(f'/migration/authentication/{pk}/')

				# Succesful Code
				history_Batch.auth_count = current_Auth_Count
				history_Batch.is_auth = 1
				history_Batch.method_of_type = method_type
				history_Batch.save(using=MIGRATION_DATABASE)
				messages.success(request,'Successfull Authentication')
				response = True
				logger.debug(f'Migration_Auth_Handler POST {{Response:{response}}}')
				return redirect(f'/migration/details/{pk}/')
			except IntegrityError:
				logger.critical(f'Migration_Auth_Handler POST {{ERROR:{IntegrityError},Response:{response}}}')
				messages.error(request,'Unable to authenticate due to Database Error.Please Contact with Techinical Team')
				transaction.rollback(using=MIGRATION_DATABASE)
			except Exception as e:
				logger.critical(f'Migration_Auth_Handler POST {{ERROR:{e},Response:{response}}}')
				messages.error(request,'Unable to authenticate due to System Error.Please Contact with Techinical Team')
				transaction.rollback(using=MIGRATION_DATABASE)
		except TMigration_Batch_History.DoesNotExist:
			logger.critical(f'Migration_Batch_Details GET {{Table:TMigration_Batch_History,ERROR:InValid PK,PK:{pk},user:{request.session["username"]},Response:{response}}}')
			messages.error(request,'Invalid Request.Please not Try again')
		except User.DoesNotExist:
			logger.critical(f'Migration_Batch_Details GET {{Table:User,ERROR:InValid PK,PK:{pk},user:{request.session["username"]},Response:{response}}}')
			messages.error(request,'Invalid Request.Please not Try again')
		except Exception as e:
			logger.critical(f'Migration_Auth_Handler POST {{ERROR:{e},Response:{response}}}')
			messages.error(request,'Unable to authenticate due to System Error.Please Contact with Techinical Team')

		logger.debug(f'Migration_Auth_Handler POST {{Response:{response}}}')
		return redirect(f'/migration/authentication/{pk}/')

class Migration_Batch_Details(View):
	template_name = 'api/migration/m_details.html'
	def get(self,request,pk,history=None,*args,**kwargs):
		logger.debug(f'Migration_Confirm_HTML_Handler GET Initial')
		response = False
		try:
			if request.session['is_admin'] is True:
				history_Batch = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
			else:
				history_Batch = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk,user=request.session['username'])

			context = {}
			
			if history == 'True':
				context['page_name'] = 'migration'
				context['sub_page'] = 'migration_history'
			elif history is None:
				context['page_name'] = 'migration'
				context['sub_page'] = 'migration_initial'
			else:
				logger.debug(f'Migration_Batch_Details GET {{Response:{response}}}')
				return redirect('/migration/')

			response = True
			context['history_batch_query_set'] = history_Batch
			context['batch_query_set'] = TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).get(batch_sr_num=history_Batch.batch_sr_num)
			logger.debug(f'Migration_Batch_Details GET {{Response:{response}}}')
			return render(request,Migration_Batch_Details.template_name,context)
		except TMigration_Batch_History.DoesNotExist:
			logger.critical(f'Migration_Batch_Details GET {{Table:TMigration_Batch_History,ERROR:InValid PK,PK:{pk},user:{request.session["username"]},Response:{response}}}')
			messages.error(request,'Invalid Request.Please not Try again')
		except TMigration_Batch_Details.DoesNotExist:
			logger.critical(f'Migration_Batch_Details GET {{Table:TMigration_Batch_Details,ERROR:InValid PK,PK:{pk},user:{request.session["username"]},Response:{response}}}')
			messages.error(request,'Invalid Request.Please not Try again')
		except Exception as e:
			logger.critical(f'Migration_Batch_Details GET {{ERROR:{e},Response:{response}}}')
			messages.error(request,'Due to System Error Unable to Open Batch Details Page.Please Contact with Teachinal Team.')
		
		logger.debug(f'Migration_Batch_Details GET {{Response:{response}}}')
		return redirect('/migration/')

class Migration_History_Handler(View):
	template_name = 'api/migration/m_history.html'
	def get(self,request,*args,**kwargs):
		logger.debug(f'Migration_History_Handler GET Initial')
		response = False
		try:
			if request.session['can_migrate'] is False:
				messages.error(request,'You Have no Permission for This Page.')
				logger.debug(f'Migration_History_Handler GET {{Response:{response}}}')
				return redirect('/')


			if request.session['is_admin'] is True:
				history_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).filter(program_of_type='M').order_by('-create_time')
			else:
				history_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).filter(user=request.session['username'],program_of_type='M').order_by('-create_time')

			context = {}
			context['page_name'] = 'migration'
			context['sub_page'] = 'migration_history'
			context['query_set'] = history_details
			response = True
			logger.debug(f'Migration_History_Handler GET {{Response:{response}}}')
			return render(request,Migration_History_Handler.template_name,context)
		except Exception as e:
			logger.critical(f'Migration_History_Handler GET {{ERROR:{e},Response:{response}}}')
			messages.error(request,'Migration History Services is Down.Please Contact with Techinical Team.')

		logger.debug(f'Migration_History_Handler GET {{Response:{response}}}')
		return redirect('/')

class Migration_FIR_Details_Handler(View):
	def get(self,request,pk,*args,**kwargs):
		logger.debug(f'Migration_FIR_Details_Handler GET Initial')
		result={'error':None,'status':False}
		try:
			if request.session['is_admin'] is True:
				batch_instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
			else:
				batch_instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk,user=request.session['username'])

			fir_reg_num_list= TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=batch_instance.batch_sr_num)
			state_cd_list = fir_reg_num_list.values_list('state_cd',flat=True)
			district_cd_list = fir_reg_num_list.values_list('district_cd',flat=True)
			ps_cd_list = fir_reg_num_list.values_list('ps_cd',flat=True)
			state_list = MState.objects.using(SOURCE_DATABASE).filter(state_cd__in=list(state_cd_list),lang_cd=99)
			district_list = MDistrict.objects.using(SOURCE_DATABASE).filter(district_cd__in=list(district_cd_list),lang_cd=99)
			ps_list = MPoliceStation.objects.using(SOURCE_DATABASE).filter(ps_cd__in=list(ps_cd_list),lang_cd=99)
			required_data = []
			for fir_reg_num in fir_reg_num_list:
				state_name = state_list.filter(state_cd=fir_reg_num.state_cd).first().state
				district_name = district_list.filter(district_cd=fir_reg_num.district_cd).first().district
				ps_name = ps_list.filter(ps_cd=fir_reg_num.ps_cd).first().ps
				required_data.append({'fir_reg_num':fir_reg_num.fir_reg_num,'reg_year':fir_reg_num.reg_year,'current_status':fir_reg_num.current_status,'rollback_reason':fir_reg_num.rollback_reason,'failed_reason':fir_reg_num.failed_reason,'state':state_name,'district':district_name,'ps':ps_name})
			result['data'] = json.dumps(required_data)
			result['status'] = True
		except TMigration_Batch_History.DoesNotExist:
			result['error'] = 'InValid Request.'
			logger.critical(f'Migration_START_Handler POST {{Response:{result},Error:{e}}}')
		except Exception as e:
			logger.critical(f'Migration_FIR_Details_Handler GET Error:{e}')
			result['error'] = 'Due to System Error Unable to able get FIR Details.Please Contact with Techinical Team'

		logger.debug(f'Migration_FIR_Details_Handler GET {{Response:{result}}}')
		return HttpResponse(json.dumps(result), content_type='application/x-json')

class Migration_START_Handler(View,Migration_Batch_Process):
	def post(self,request,pk,*args,**kwargs):
		logger.debug(f'Migration_START_Handler GET Initial')
		result={'error':None,'status':False}
		try:
			if request.session['is_admin'] is True:
				batch_instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
			else:
				batch_instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk,user=request.session['username'])

			#Check Status in History Table
			if batch_instance.status != 0:
				if batch_instance.status == 1:
					result['status'] = True
					result['messages'] = f'Batch {batch_instance.batch_sr_num} already Running Please Wait for Complete.'
				if batch_instance.status == 2:
					result['status'] = True
					result['messages'] = f'Batch {batch_instance.batch_sr_num} Successfully Done.'
				if batch_instance.status == 3:
					result['error'] = f'Batch {batch_instance.batch_sr_num} Has been failed .'
				if batch_instance.status == 4:
					result['error'] = f'Batch {batch_instance.batch_sr_num} Has been cancled by user.'
				if batch_instance.status == 5:
					result['error'] = f'Batch {batch_instance.batch_sr_num} Has Abort by user.'
				logger.debug(f'Migration_START_Handler GET {{Response:{result}}}')
				return HttpResponse(json.dumps(result), content_type='application/x-json')
			
			#Migration_Rollback_Process.objects.all().delete()
			try:
				with transaction.atomic(using=MIGRATION_DATABASE):
					with transaction.atomic(using=SOURCE_DATABASE):
						with transaction.atomic(using=DESTINATION_DATABASE):
							self.start_migration_rollback_process(request,batch_instance)
							result={'error':None,'status':True,'messages':'Successfully Enter is Migration Pool.'}
				transaction.commit(using=MIGRATION_DATABASE)
				if  Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).all().count() == 1:
					thread_initial = Migation_Rollback_Thread()
					thread_initial.start()
				
			except Exception as e:
				print(e)
				result['error']= 'Unable to START Migration Due to System Error.Please Contact With Techinical Team.'

			
			
		except TMigration_Batch_History.DoesNotExist:
			result['error'] = 'InValid Request.'
			logger.critical(f'Migration_START_Handler POST {{Response:{result},Error:{e}}}')
		except Exception as e:
			logger.critical(f'Migration_START_Handler GET {{ERROR:{e},Response:{result}}}')
			result['error']= 'Unable to START Migration Due to System Error.Please Contact With Techinical Team.'

		logger.debug(f'Migration_START_Handler GET {{Response:{result}}}')
		return HttpResponse(json.dumps(result), content_type='application/x-json')

class Migration_STOP_Handler(View,Migration_Batch_Process):
	def post(self,request,pk,*args,**kwargs):
		logger.debug(f'Migration_STOP_Handler GET Initial')
		result={'error':None,'status':False}
		try:
			if request.session['is_admin'] is True:
				batch_instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
			else:
				batch_instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk,user=request.session['username'])

			#Check Status in History Table
			if batch_instance.status != 1:
				if batch_instance.status == 0:
					result['status'] = True
					result['messages'] = f'Batch {batch_instance.batch_sr_num} Migration Not be Start .Please Start Migration.'
				if batch_instance.status == 2:
					result['status'] = True
					result['messages'] = f'Batch {batch_instance.batch_sr_num} Successfully Done.'
				if batch_instance.status == 3:
					result['error'] = f'Batch {batch_instance.batch_sr_num} Has been failed .'
				if batch_instance.status == 4:
					result['error'] = f'Batch {batch_instance.batch_sr_num} Has been cancled by user.'
				if batch_instance.status == 5:
					result['error'] = f'Batch {batch_instance.batch_sr_num} Has Abort by user.'
				logger.debug(f'Migration_START_Handler GET {{Response:{result}}}')
				return HttpResponse(json.dumps(result), content_type='application/x-json')

			Migration_Rollback_Process_Instance = Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).get(history_pk=pk)
			self.stop_migration_rollback_process(request,Migration_Rollback_Process_Instance)
			result={'error':None,'status':True,'messages':'Successfully Migration Stop.'}
		except TMigration_Batch_History.DoesNotExist:
			result['error'] = 'InValid Request.'
			logger.critical(f'Migration_STOP_Handler POST {{Response:{result},Error:PK is not Persnet in Migration_Rollback_Process}}')
		except TMigration_Batch_History.DoesNotExist:
			result['error'] = 'InValid Request.'
			logger.critical(f'Migration_STOP_Handler POST {{Response:{result},Error:PK is not Persnet in TMigration_Batch_History}}')
		except Exception as e:
			print(e)
			logger.critical(f'Migration_STOP_Handler GET {{ERROR:{e},Response:{result}}}')
			result['error']= 'Unable to STOP Migration Due to System Error.Please Contact With Techinical Team.'

		logger.debug(f'Migration_STOP_Handler POST {{Response:{result}}}')
		return HttpResponse(json.dumps(result), content_type='application/x-json')

class Migration_Log_File_Reader_Handler(View):
	def post(self,request,pk,line_number,*args,**kwargs):
		logger.debug(f'Migration_Log_File_Reader_Handler POST Initial')
		result={'error':None,'status':False}
		try:
			if request.session['is_admin'] is True:
				batch_instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
			else:
				batch_instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk,user=request.session['username'])

			required_data = []
			line = line_number
			file_name = batch_instance.batch_sr_num
			
			file_path = os.path.join(MIGRATE_LOG_PATH,f'{file_name}.log') 
			f = open(file_path,'r')
			all_lines_variable = f.readlines()	
			result['total_line'] = len(all_lines_variable)
			
			if len(all_lines_variable) < line:
				line = 0

			for i in range(line,len(all_lines_variable)):
				required_data.append(all_lines_variable[i])

			f.close()
			
			result['is_migration_running'] = batch_instance.status

			if batch_instance.status != 1:
				if len(required_data) > 0:
					result['is_migration_running'] = 1
				else:
					result['is_migration_running'] =  batch_instance.status
				

			result['data'] = required_data
			result['status'] = True
		except TMigration_Batch_History.DoesNotExist:
			result['error'] = 'InValid Request.'
			logger.critical(f'Migration_Log_File_Reader_Handler POST {{Response:{result},Error:{e}}}')
		except Exception as e:
			result['error'] = 'Unable to able read Logs file'
			logger.critical(f'Migration_Log_File_Reader_Handler POST {{Response:{result},Error:{e}}}')
			
		
		logger.debug(f'Migration_Log_File_Reader_Handler POST {{Response:{result}}}')
		return HttpResponse(json.dumps(result), content_type='application/x-json')


# RollBack
class RollBack_Initial_HTML_Handler(View,RollBack_Batch_Process):
	template_name = 'api/rollback/r_initial.html'
	def get(self,request,*args,**kwargs):
		logger.debug(f'RollBack_Initial_HTML_Handler GET Initial')
		response = False
		try:
			if request.session['can_rollback'] is False:
				messages.error(request,"Invalid Request.You Have No Permission for RollBack.")
				logger.info(f"RollBack_Initial_HTML_Handler GET {{User:{request.session['username']},Error:Unauthorized,Status-code:404}}")
				logger.debug(f"RollBack_Initial_HTML_Handler GET {{Response:{response}}}")
				return redirect('/')

			context = {}
			context['page_name'] = 'rollback'
			context['sub_page'] = 'rollback_initial'
			user_db_instance = User.objects.using(SOURCE_DATABASE).get(username=request.session['username'])
			if  request.session['is_admin'] is False  and request.session['is_staff'] is True:
				context['bath_details'] = TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).filter(current_status__in = ['S','PR'],user=username).order_by('-create_time')
				context['state'] = MState.objects.using(SOURCE_DATABASE).get(lang_cd='99', record_status='C',state_cd=user_db_instance.state)#.values_list('state_cd','state')
				context['district'] = MDistrict.objects.using(SOURCE_DATABASE).get(lang_cd='99', record_status='C',district_cd=user_db_instance.district)#.values_list('district_cd','district')
				context['police_station'] = MPoliceStation.objects.using(SOURCE_DATABASE).get(lang_cd='99', record_status='C',ps_cd=user_db_instance.police_station)#.values_list('ps_cd','ps')
				context['rollback_details'] = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).filter(program_of_type__in = ['R','PR'],user=request.session['username'],status=0).exclude(pk__in=list(Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).all().values_list('history_pk',flat=True))).order_by('-create_time')
			elif  request.session['is_admin'] is True  and request.session['is_staff'] is True:
				context['bath_details'] = TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).filter(current_status__in = ['S','PR']).order_by('-create_time')
				context['state_list'] = MState.objects.using(SOURCE_DATABASE).filter(lang_cd='99', record_status='C').exclude(state='').order_by('state')
				context['rollback_details'] = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).filter(program_of_type__in = ['R','PR'],status=0).exclude(pk__in=list(Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).all().values_list('history_pk',flat=True))).order_by('-create_time')

			for i in context['rollback_details']:
				print(i.status)
			context['year'] = []
			for item in range(2000,2022):
				context['year'].append(item)
			
			context['process_item'] = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).filter(pk__in = list(Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).all().values_list('history_pk',flat=True)))
			return render(request,RollBack_Initial_HTML_Handler.template_name,context)
		except Exception as e:
			logger.critical(f"RollBack_Initial_HTML_Handler GET {{ERROR:{e},Response:{response}}}")
			messages.error(request,"RollBack Servics is Down.Please Contact With Techinical Team.")

		logger.debug(f"RollBack_Initial_HTML_Handler GET {{Response:{response}}}")
		return redirect('/')


	def post(self,request,*args,**kwargs):
		logger.debug(f'RollBack_Initial_HTML_Handler POST Initial')
		response = False
		try:
			if request.session['can_rollback'] is False:
				messages.error(request,'You Have No Permission for RollBack.')
				return redirect('/rollback/')

			# Check Search Type
			search_type = request.POST.get('search_type')
			if search_type not  in ['1','2','3']:
				messages.error(request,'Please choose valid Search Type.')
				return redirect('/rollback/')

			if search_type == '1':
				logger.debug(f'RollBack_Initial_HTML_Handler POST {{Search_Type:Complete Batch Rollback}}')
				batch_sr_num = request.POST.get('batch_sr_num_1')
				if batch_sr_num == 'null':
					messages.error(request,'Please select Batch Number in Batch Wise RollBack.')
					return redirect('/rollback/')
				file_path = os.path.join(MIGRATE_LOG_PATH,f'{batch_sr_num}.log')
				file_instance = open(file_path,'a+')
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Rollback Batch Creation Start By User:{request.session["username"]} \n')
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | RollBack Type: Partial RollBack.\n')
				try:
					with transaction.atomic(using=MIGRATION_DATABASE):
						with transaction.atomic(using=SOURCE_DATABASE):
							with transaction.atomic(using=DESTINATION_DATABASE):
								self.initial_by_batch(request,batch_sr_num,file_instance,*args,**kwargs)
								response = True
								logger.debug(f"RollBack_Initial_HTML_Handler POST {{Response:{response}}}")
								file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Rollback Batch Creation END. \n')
								file_instance.close()
								return redirect('/rollback/')
				except TMigration_Batch_Details.DoesNotExist:
					logger.critical(f"RollBack_Initial_HTML_Handler POST initial_by_batch {{ERROR:Invalid Request,User:{request.session['username']},Batch_Sr_num:{batch_sr_num}}}")
					messages.error(request,'Invalid Request.')
					transaction.rollback(using=MIGRATION_DATABASE)	
					transaction.rollback(using=SOURCE_DATABASE)	
					transaction.rollback(using=DESTINATION_DATABASE)	
				except Exception as e:
					logger.critical(f"RollBack_Initial_HTML_Handler POST initial_by_batch {{ERROR:{e},User:{request.session['username']},Batch_Sr_num:{batch_sr_num}}}")
					Error = 'System Error'
					messages.error(request,'Due to System Error Unable to Create Rollback Process.')
					transaction.rollback(using=MIGRATION_DATABASE)	
					transaction.rollback(using=SOURCE_DATABASE)	
					transaction.rollback(using=DESTINATION_DATABASE)	
			
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Rollback Batch Creation Failed.Error:{Error} \n')
				file_instance.close()
			
			elif search_type == '2':
				logger.debug(f'RollBack_Initial_HTML_Handler POST {{Search_Type:Coustom FIR Batch RollBack}}')
				batch_sr_num = request.POST.get('batch_sr_num_2')
				if batch_sr_num == 'null':
					messages.error(request,'Please select Batch Number in Batch Wise RollBack.')
					return redirect('/rollback/')

				# Check FIR is Choosed
				if 'fir_list_array' in request.POST:
					if request.POST.get('fir_list_array') == '':
						messages.error(request,'Please Choose FIR Number in Batch FIR Wise RollBack')
						return redirect('/rollback/')
				else:
					messages.error(request,'Please Choose FIR Number in Batch FIR Wise RollBack')
					return redirect('/rollback/')

				file_path = os.path.join(MIGRATE_LOG_PATH,f'{batch_sr_num}.log')
				file_instance = open(file_path,'a+')
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Rollback Batch Creation Start By User:{request.session["username"]} \n')
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | RollBack Type: Partial RollBack.\n')
				try:
					with transaction.atomic(using=MIGRATION_DATABASE):
						with transaction.atomic(using=SOURCE_DATABASE):
							with transaction.atomic(using=DESTINATION_DATABASE):
								fir_list_array = request.POST.getlist('fir_list_array')
								self.initial_by_batch_fir_wise(request,batch_sr_num,fir_list_array,file_instance,*args,**kwargs)
								response = True
								logger.debug(f"RollBack_Initial_HTML_Handler POST {{Response:{response}}}")
								file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Rollback Batch Creation END. \n')
								file_instance.close()
								return redirect('/rollback/')
				except TMigration_Batch_Details.DoesNotExist:
					logger.critical(f"RollBack_Initial_HTML_Handler POST initial_by_batch_fir_wise {{ERROR:Invalid Request,User:{request.session['username']},Batch_Sr_num:{batch_sr_num}}}")
					messages.error(request,'Invalid Request.')
					transaction.rollback(using=MIGRATION_DATABASE)	
					transaction.rollback(using=SOURCE_DATABASE)	
					transaction.rollback(using=DESTINATION_DATABASE)	
				except Exception as e:
					logger.critical(f"RollBack_Initial_HTML_Handler POST initial_by_batch_fir_wise {{ERROR:{e},User:{request.session['username']},Batch_Sr_num:{batch_sr_num}}}")
					messages.error(request,'Due to System Error Unable to Create Rollback Process.')
					Error = 'System Error'
					transaction.rollback(using=MIGRATION_DATABASE)	
					transaction.rollback(using=SOURCE_DATABASE)	
					transaction.rollback(using=DESTINATION_DATABASE)	
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Rollback Batch Creation Failed.Error:{Error} \n')
				file_instance.close()
			
			elif search_type == '3':
				logger.debug(f'RollBack_Initial_HTML_Handler POST {{Search_Type:FIR WISE RollBack}}')
				if 'single_fir_list_array' in request.POST:
					single_fir_list_array = request.POST.get('single_fir_list_array')
					if single_fir_list_array == '' or single_fir_list_array is None:
						messages.error(request,'Please input Fir Number in Single FIR Wise RollBack')
						return redirect('/rollback/')	
				else:
					messages.error(request,'Please input Fir Number in Single FIR Wise RollBack')
					return redirect('/rollback/')

				try:
					with transaction.atomic(using=MIGRATION_DATABASE):
						with transaction.atomic(using=SOURCE_DATABASE):
							with transaction.atomic(using=DESTINATION_DATABASE):
								self.initial_by_single_fir_wise(request,*args,**kwargs)
								response = True
								logger.debug(f"RollBack_Initial_HTML_Handler POST {{Response:{response}}}")
								return redirect('/rollback/')
				except TMigration_Batch_Details.DoesNotExist:
					logger.critical(f"RollBack_Initial_HTML_Handler POST initial_by_batch_fir_wise {{ERROR:Invalid Request,User:{request.session['username']}}}")
					messages.error(request,'Invalid Request.')
					transaction.rollback(using=MIGRATION_DATABASE)
					transaction.rollback(using=SOURCE_DATABASE)
					transaction.rollback(using=DESTINATION_DATABASE)
				except Exception as e:
					logger.critical(f"RollBack_Initial_HTML_Handler POST initial_by_batch_fir_wise {{ERROR:{e},User:{request.session['username']}}}")
					messages.error(request,'Due to System Error Unable to Create Rollback Process.')
					Error = 'System Error'
					transaction.rollback(using=MIGRATION_DATABASE)	
					transaction.rollback(using=SOURCE_DATABASE)	
					transaction.rollback(using=DESTINATION_DATABASE)	

		except Exception as e:
			logger.critical(f"RollBack_Initial_HTML_Handler GET {{ERROR:{e},Response:{response}}}")
			messages.error(request,"RollBack Servics is Down.Please Contact With Techinical Team.")

		logger.debug(f"RollBack_Initial_HTML_Handler POST {{Response:{response}}}")
		return redirect('/rollback/')

class RollBack_GET_Migration_Batch_FIR_Details_Handler(View):
	def get(self,request,batch_sr_num,*args,**kwargs):
		logger.debug(f'RollBack_GET_Migration_Batch_FIR_Details_Handler GET Initial')
		result={'error':'Invalid Request','status':False}
		response = False
		logger.debug(f'RollBack_GET_Migration_Batch_FIR_Details_Handler GET {{Response:{response}}}')
		return HttpResponse(json.dumps(result), content_type='application/x-json')
	
	def post(self,request,batch_sr_num,*args,**kwargs):
		logger.debug(f'RollBack_GET_Migration_Batch_FIR_Details_Handler GET Initial')
		result={'error':None,'status':False}
		try:
			if request.session['is_admin'] is True:
				batch_instance = TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).get(batch_sr_num=batch_sr_num)
			else:
				batch_instance = TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).get(batch_sr_num=batch_sr_num,user=request.session['username'])

			fir_reg_num_list= TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=batch_instance.batch_sr_num)[:40] #,current_status='S')

			if fir_reg_num_list.count() == 0:
				result['error'] = 'No FIR Is Pending For RollBack'
				logger.debug(f'RollBack_GET_Migration_Batch_FIR_Details_Handler GET {{Response:{result}}}')
				return HttpResponse(json.dumps(result), content_type='application/x-json')
			state_cd_list = fir_reg_num_list.values_list('state_cd',flat=True)
			district_cd_list = fir_reg_num_list.values_list('district_cd',flat=True)
			ps_cd_list = fir_reg_num_list.values_list('ps_cd',flat=True)
			state_list = MState.objects.using(SOURCE_DATABASE).filter(state_cd__in=list(state_cd_list),lang_cd=99)
			district_list = MDistrict.objects.using(SOURCE_DATABASE).filter(district_cd__in=list(district_cd_list),lang_cd=99)
			ps_list = MPoliceStation.objects.using(SOURCE_DATABASE).filter(ps_cd__in=list(ps_cd_list),lang_cd=99)
			required_data = []
			for fir_reg_num in fir_reg_num_list:
				state_name = state_list.filter(state_cd=fir_reg_num.state_cd).first().state
				district_name = district_list.filter(district_cd=fir_reg_num.district_cd).first().district
				ps_name = ps_list.filter(ps_cd=fir_reg_num.ps_cd).first().ps
				required_data.append({'fir_reg_num':fir_reg_num.fir_reg_num,'reg_year':fir_reg_num.reg_year,'current_status':fir_reg_num.current_status,'rollback_reason':fir_reg_num.rollback_reason,'failed_reason':fir_reg_num.failed_reason,'state':state_name,'district':district_name,'ps':ps_name})
			result['data'] = json.dumps(required_data)
			result['status'] = True
		except TMigration_Batch_Details.DoesNotExist:
			result['error'] = 'InValid Request.'
			logger.critical(f'RollBack_GET_Migration_Batch_FIR_Details_Handler POST {{Response:{result},Error:{e}}}')
		except Exception as e:
			logger.critical(f'RollBack_GET_Migration_Batch_FIR_Details_Handler POST Error:{e}')
			result['error'] = 'Due to System Error Unable to able get FIR Details.Please Contact with Techinical Team'

		logger.debug(f'RollBack_GET_Migration_Batch_FIR_Details_Handler GET {{Response:{result}}}')
		return HttpResponse(json.dumps(result), content_type='application/x-json')

class RollBack_GET_Migration_SINGLE_FIR_Details_Handler(View):
	def get(self,request,*args,**kwargs):
		logger.debug(f'RollBack_GET_Migration_Batch_FIR_Details_Handler GET Initial')
		result={'error':'Invalid Request','status':False}
		response = False
		logger.debug(f'RollBack_GET_Migration_Batch_FIR_Details_Handler GET {{Response:{response}}}')
		return HttpResponse(json.dumps(result), content_type='application/x-json')
	
	
	def get_fir_list(self,request,state,district,ps_code,year,fir_reg_num):
		state_name = MState.objects.using(SOURCE_DATABASE).get(state_cd=state,lang_cd=99).state
		district_name = MDistrict.objects.using(SOURCE_DATABASE).get(district_cd=district,lang_cd=99).district
		ps_name = MPoliceStation.objects.using(SOURCE_DATABASE).get(ps_cd =ps_code,lang_cd=99).ps
		if year == 'ALL':
			fir_list  = TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(state_cd=state ,district_cd = district ,ps_cd = ps_code,fir_srno=fir_reg_num) #current_status='S'
		else:
			fir_list  = TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(state_cd=state ,district_cd = district ,ps_cd = ps_code,fir_srno=fir_reg_num,reg_year=year) #current_status='S'

		self.required_data = []
		for item in fir_list:
			dict_data = {'fir_reg_num':item.fir_reg_num,'batch_sr_num':item.batch_sr_num,'state':state_name,'district':district_name,'ps_name':ps_name,'year':item.reg_year}
			self.required_data.append(dict_data)

	def post(self,request,*args,**kwargs):
		logger.debug(f'RollBack_GET_Migration_Batch_FIR_Details_Handler POST Initial')
		result={'error':'Success Request','status':False}
		try:
			state = request.POST.get('state')
			district = request.POST.get('district')
			ps_code = request.POST.get('ps_code')
			year = request.POST.get('year')
			fir_reg_num = request.POST.get('fir_reg_num')
			print(state,district,ps_code,year,fir_reg_num)
			is_valid = True
			error = []
			if state == 'SS':
				is_valid = False
				error.append('Please Choose Valid State.|')

			if district == 'SS':
				is_valid = False
				error.append('Please Choose Valid District.|')
			
			if ps_code == 'SS':
				is_valid = False
				error.append('Please Choose Valid Police Station.|')
			
			if year == 'SS':
				is_valid = False
				error.append('Please Choose Valid Year.|')
			
			
			if is_valid is False:
				result['error'] = error
				logger.debug(f'RollBack_GET_Migration_Batch_FIR_Details_Handler POST {{Response:False}}')
				return HttpResponse(json.dumps(result), content_type='application/x-json')

			# Check Permission 
			
			if request.session['is_admin'] is False:
				error = []
				user_instance = User.objects.using(SOURCE_DATABASE).get(username=request.session['username'])
				if user_instance.state ==  state:
					is_valid = False
					error.append('Not Permission for this State.|')

				if user_instance.district ==  district:
					is_valid = False
					error.append('Not Permission for this District.|')

				if user_instance.police_station ==  ps_code:
					is_valid = False
					error.append('Not Permission for this Police Station.|')
			
				if is_valid is False:
					result['error'] = error
					logger.debug(f'RollBack_GET_Migration_Batch_FIR_Details_Handler POST {{Response:False}}')
					return HttpResponse(json.dumps(result), content_type='application/x-json')

			### Create LIST 

			self.get_fir_list(request,state,district,ps_code,year,fir_reg_num)
			if len(self.required_data) == 0:
				result['error'] = 'No FIR Number is Persent for this Coustom Search'
				logger.debug(f'RollBack_GET_Migration_Batch_FIR_Details_Handler POST {{Response:False}}')
				return HttpResponse(json.dumps(result), content_type='application/x-json')
				
			result['data'] = self.required_data
			result['status'] = True
		except Exception as e:
			result['status'] = False
			logger.critical(f'RollBack_GET_Migration_SINGLE_FIR_Details_Handler POST Error:{e}')
			result['error'] = 'Due to System Error Unable to able get FIR Details.Please Contact with Techinical Team'
		
		logger.debug(f'RollBack_GET_Migration_Batch_FIR_Details_Handler POST {{Response:False}}')
		return HttpResponse(json.dumps(result), content_type='application/x-json')
	

class RollBack_Cancle_HTML_Handler(View):
	def get(self,request,pk,*args,**kwargs):
		logger.debug(f'RollBack_Cancle_HTML_Handler GET Initial')
		response = False
		try:
			if request.session['can_rollback'] is False:
				messages.error(request,"Invalid Request.You Have No Permission for RollBack.")
				logger.info(f"RollBack_Cancle_HTML_Handler GET {{User:{request.session['username']},Error:Unauthorized,Status-code:404}}")
				logger.debug(f"RollBack_Cancle_HTML_Handler GET {{Response:{response}}}")
				return redirect('/')

			if request.session['is_admin'] is False and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk,user=request.session['username'])
			elif request.session['is_admin'] is True and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)

			if Rollback_details.status != 0:
				if Rollback_details.status == 1:
					messages.error(request,'Rollback Process is running,Due to which unable to cancle')
				if Rollback_details.status == 2:
					messages.error(request,'Rollback Process is Complete Success.Unable to cancle')
				if Rollback_details.status == 3:
					messages.error(request,'Rollback Process is Failed.Unable to cancle')
				if Rollback_details.status == 4:
					messages.error(request,'Already Cancle this Rollback Process .')
				if Rollback_details.status == 5:
					messages.error(request,'Rollback Process is Abort by User.Due to which unable to cancle')

				logger.debug(f"RollBack_Cancle_HTML_Handler GET {{Response:{response}}}")
				return redirect('/rollback/')
			
			try:
				with transaction.atomic(using=SOURCE_DATABASE):
					with transaction.atomic(using=DESTINATION_DATABASE):
						with transaction.atomic(using=MIGRATION_DATABASE):
							current_time = datetime.datetime.now(India_current_time)
							Rollback_FIR_Details = TRollBack_Batch_Details.objects.using(MIGRATION_DATABASE).filter(rollback_id=pk).update(start_time = current_time,complete_time = current_time,status = 4)
							Rollback_details.status = 4
							Rollback_details.cancle_user= request.session['username']
							Rollback_details.is_auth = 1
							Rollback_details.start_time = current_time
							Rollback_details.complete_time = current_time
							Rollback_details.save(using=MIGRATION_DATABASE)
							messages.success(request,f'{Rollback_details.batch_sr_num} Rollback Batch has Successfull Cancle.')
							response = True
							logger.debug(f"RollBack_Cancle_HTML_Handler POST {{Response:{response}}}")
							return redirect('/rollback/')
			except TRollBack_Batch_Details.DoesNotExist:
				messages.error(request,'Not Valid RollBack Batch.Please Choose Valid')
				logger.critical(f"RollBack_Cancle_HTML_Handler GET {{ERROR:Invalid PK TRollBack_Batch_Details,PK:{pk},Response:{response}}}")
			except Exception as e:
				messages.error(request,'Due to System Error,Unable to Cancle .Please Contact with Techinical Team.')
				logger.critical(f"RollBack_Cancle_HTML_Handler GET {{ERROR:{e},Response:{response}}}")
				

		except TMigration_Batch_History.DoesNotExist:
			messages.error(request,'Not Valid RollBack Batch.Please Choose Valid')
			logger.critical(f"RollBack_Cancle_HTML_Handler GET {{ERROR:Invalid PK TRollBack_Batch_Details,PK:{pk},Response:{response}}}")
		except Exception as e:
			messages.error(request,'Due to System Error,Unable to Cancle .Please Contact with Techinical Team.')
			logger.critical(f"RollBack_Cancle_HTML_Handler GET {{ERROR:{e},Response:{response}}}")

		logger.debug(f"RollBack_Cancle_HTML_Handler POST {{Response:{response}}}")
		return redirect('/rollback/')

class RollBack_Auth_Handler(View,RollBack_Batch_Process):
	template_name = 'api/rollback/r_auth.html'

	def get(self,request,pk,*args,**kwargs):
		logger.debug(f'RollBack_Auth_Handler GET Initial')
		response = False
		try:
			if request.session['can_rollback'] is False:
				messages.error(request,"Invalid Request.You Have No Permission for RollBack.")
				logger.info(f"RollBack_Auth_Handler GET {{User:{request.session['username']},Error:Unauthorized,Status-code:404}}")
				logger.debug(f"RollBack_Auth_Handler GET {{Response:{response}}}")
				return redirect('/')

			if request.session['is_admin'] is False and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk,user=request.session['username'])
			elif request.session['is_admin'] is True and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)


			if Rollback_details.is_auth == 1:
				response = True
				logger.debug(f'RollBack_Auth_Handler GET {{Response:{response}}}')
				return redirect(f'/rollback/details/{pk}/') 

			if  Rollback_details.user != request.session['username'] :
				messages.error(request,"Rollback Process is not Authentication by Create User.Please Wait for it.")
				logger.debug(f"RollBack_Auth_Handler POST {{Response:{response}}}")
				return redirect('/rollback/')

			context = {}
			context['page_name'] = 'rollback'
			context['sub_page'] = 'rollback_initial'
			return render(request,RollBack_Auth_Handler.template_name,context)
		except Exception as e:
			logger.critical(f'RollBack_Auth_Handler GET {{ERROR:{e},Response:{response}}}')
			messages.error(request,'RollBack Service is Down.Please contact with Technical Team.')

		logger.debug(f'RollBack_Auth_Handler GET {{Response:{response}}}')
		return redirect('/rollback/')

	def post(self,request,pk,*args,**kwargs):
		logger.debug(f'RollBack_Auth_Handler POST Initial')
		response = True
		try:
			if request.session['can_rollback'] is False:
				messages.error(request,"Invalid Request.You Have No Permission for RollBack.")
				logger.info(f"RollBack_Auth_Handler POST {{User:{request.session['username']},Error:Unauthorized,Status-code:404}}")
				logger.debug(f"RollBack_Auth_Handler POST {{Response:{response}}}")
				return redirect('/')

			if request.session['is_admin'] is False and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk,user=request.session['username'])
			elif request.session['is_admin'] is True and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)


			if Rollback_details.is_auth == 1:
				response = True
				logger.debug(f'RollBack_Auth_Handler POST {{Response:{response}}}')
				return redirect(f'/rollback/details/{pk}/')

			if  Rollback_details.user != request.session['username'] :
				messages.error(request,"You Have no Permission for Authentication.")
				logger.debug(f"RollBack_Auth_Handler POST {{Response:{response}}}")
				return redirect('/rollback/')

			password = request.POST.get('password')
			RollBack_Reason = request.POST.get('rollback_reason')
			is_verified = True

			if password == '':
				is_verified = False
				messages.error(request,'Password filed is not blank .Please enter valid password.')

			if RollBack_Reason == '':
				is_verified = False
				messages.error(request,'Rollback Reason Must Be Provide.')

			if is_verified is False:
				logger.debug(f"RollBack_Auth_Handler POST {{Response:{response},Password:{password},RollBack_Reason:{RollBack_Reason}}}")
				return redirect(f'/rollback/authentication/{pk}/')

			current_Auth_Count = Rollback_details.auth_count
			try:
				with transaction.atomic(using=MIGRATION_DATABASE):
						with transaction.atomic(using=SOURCE_DATABASE):
							with transaction.atomic(using=DESTINATION_DATABASE):
								current_Auth_Count = current_Auth_Count + 1
								if '['in Rollback_details.batch_sr_num:
									file_path = os.path.join(MIGRATE_LOG_PATH,f'RollBack_Multi_Batch_{pk}.log')
								else:
									file_path = os.path.join(MIGRATE_LOG_PATH,f'{Rollback_details.batch_sr_num}.log')
								file_instance = open(file_path,'a+')
								from django.contrib.auth import authenticate
								user = authenticate(username=request.session['username'], password=password)
								if user is not None:
									# Check current_Auth_Count
									if current_Auth_Count >= 4:
										if current_Auth_Count == 4:
											messages.error(request,'Rollback Process failed due to multiple Wrong Authentication Attempt.Only 4 Attempt Allow.')
											self.unauthorized_rollback_batch(request,Rollback_details)
											file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Rollback Batch Failed.Error:Authentication Failed \n')
											file_instance.close()
											logger.debug(f'Migration_Auth_Handler POST {{Response:{response},Message:Authentication Failed.}}')
											return redirect(f'/rollback/')
										else:
											self.unauthorized_rollback_batch(request,Rollback_details)
											logger.debug(f'Migration_Auth_Handler POST {{Response:{response},Message:Authentication Failed.}}')
											return redirect(f'/rollback/details/{pk}/')
										
									else:
										if current_Auth_Count == 3:
											messages.error(request,'Last Attempt will be left .Please enter Valid Password .Current Username and Password are not available.')
										else:
											messages.error(request,'Wrong Username Passowrd.Please enter Valid Password.')
										
										Rollback_details.auth_count = current_Auth_Count
										Rollback_details.save(using=MIGRATION_DATABASE)
										logger.debug(f'RollBack_Auth_Handler POST {{Response:{response}}}')
										return redirect(f'/rollback/authentication/{pk}/')
								else:
									self.authorized_rollback_batch(request,Rollback_details,RollBack_Reason,current_Auth_Count)
									messages.success(request,'Successfull Authentication Process.Now You Can Start RollBack Process.')
									logger.debug(f'RollBack_Auth_Handler POST {{Response:{response}}}')
									return redirect(f'/rollback/details/{pk}/') 

			except Exception as e:
				response = False
				logger.critical(f'RollBack_Auth_Handler POST {{ERROR:{e},Response:{response}}}')
				messages.error(request,'RollBack Service is Down.Please contact with Technical Team.')
			

		except TMigration_Batch_History.DoesNotExist:
			pass
		except Exception as e:
			response = False
			logger.critical(f'RollBack_Auth_Handler POST {{ERROR:{e},Response:{response}}}')
			messages.error(request,'RollBack Service is Down.Please contact with Technical Team.')

		logger.debug(f'RollBack_Auth_Handler POST {{Response:{response}}}')
		return redirect(f'/rollback/authentication/{pk}/')

class RollBack_Details(View):
	template_name = 'api/rollback/r_details.html'
	def get(self,request,pk,history=False,*args,**kwargs):
		logger.debug(f'RollBack_Details GET Initial')
		response = True
		try:
			context = {}
			if history == 'details':
				context['page_name'] = 'rollback'
				context['sub_page'] = 'rollback_history'
			elif history is False:
				context['page_name'] = 'rollback'
				context['sub_page'] = 'rollback_initial'
			else:
				return redirect('/rollback/')

			if request.session['can_rollback'] is False:
				messages.error(request,"Invalid Request.You Have No Permission for RollBack.")
				logger.info(f"RollBack_Auth_Handler POST {{User:{request.session['username']},Error:Unauthorized,Status-code:404}}")
				logger.debug(f"RollBack_Auth_Handler POST {{Response:{response}}}")
				return redirect('/')

			if request.session['is_admin'] is False and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk,user=request.session['username'])
			elif request.session['is_admin'] is True and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)

			if Rollback_details.is_auth == 0:
				logger.debug(f'RollBack_Details GET {{Response:{response}}}')
				return redirect('/rollback/authentication/{pk}/')


			context['query_set'] = Rollback_details
			context['rollback_fir_count'] = TRollBack_Batch_Details.objects.using(MIGRATION_DATABASE).filter(rollback_id=pk).count()
			created_user = User.objects.using(SOURCE_DATABASE).get(username=Rollback_details.user)
			context['create_username'] = f'{created_user.first_name} {created_user.last_name}'
			if Rollback_details.status == 4:
				cancle_user = User.objects.using(SOURCE_DATABASE).get(username=Rollback_details.cancle_user)
				context['cancle_username'] = f'{cancle_user.first_name} {cancle_user.last_name}'

			# Check is persent in RollBack Process.
			if Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).filter(history_pk=pk).exists() is True:
				context['is_persent_rollback_process'] = True
			else:
				context['is_persent_rollback_process'] = False



			logger.debug(f'RollBack_Details GET {{Response:{response}}}')
			return render(request,RollBack_Details.template_name,context)
		except TMigration_Batch_History.DoesNotExist:
			response = False
			logger.critical(f'RollBack_Details GET {{ERROR:Invalid User,,PK:{pk},User:{request.session["username"]},Response:{response}}}')
			messages.error(request,'Invalid User.')
			logger.debug(f'RollBack_Details GET {{Response:{response}}}')
			return redirect('/')
		except TMigration_Batch_History.DoesNotExist:
			response = False
			logger.critical(f'RollBack_Details GET {{ERROR:Invalid Request,,PK:{pk},User:{request.session["username"]},Response:{response}}}')
			messages.error(request,'Invalid Request.')
			logger.debug(f'RollBack_Details GET {{Response:{response}}}')
			return redirect('/')
		except Exception as e:
			response = False
			logger.critical(f'RollBack_Details GET {{ERROR:{e},Response:{response}}}')
			messages.error(request,'Due to System Error.Unable to get RollBack Details Page.Please contact with Technical Team.')

		logger.debug(f'RollBack_Details GET {{Response:{response}}}')
		if history is True:
			return redirect('/rollback/history/')
		else:
			return redirect('/rollback/')

class RollBack_FIR_Batch_List(View):
	def get(self,request,pk,*args,**kwargs):
		logger.debug(f'RollBack_FIR_Batch_List GET Initial')
		result={'error':'Invalid Request','status':False}
		response = False
		logger.debug(f'RollBack_FIR_Batch_List GET {{Response:{response}}}')
		return HttpResponse(json.dumps(result), content_type='application/x-json')


	def post(self,request,pk,*args,**kwargs):
		logger.debug(f'RollBack_FIR_Batch_List POST Initial')
		result={'error':None,'status':False}
		response = False
		try:
			if request.session['can_rollback'] is False:
				messages.error(request,"Invalid Request.You Have No Permission for RollBack.")
				logger.info(f"RollBack_Auth_Handler POST {{User:{request.session['username']},Error:Unauthorized,Status-code:404}}")
				logger.debug(f"RollBack_Auth_Handler POST {{Response:{response}}}")
				return redirect('/')

			if request.session['is_admin'] is False and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk,user=request.session['username'])
			elif request.session['is_admin'] is True and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)

			Rollback_FIR_Details = TRollBack_Batch_Details.objects.using(MIGRATION_DATABASE).filter(rollback_id=pk)
			fir_list = Rollback_FIR_Details.values_list('fir_reg_num',flat=True)
			batch_list = Rollback_FIR_Details.values_list('batch_sr_num',flat=True)
			get_fir_details_rollback = TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(fir_reg_num__in = list(fir_list))#,current_status='S')
			get_fir_details_with_batch = get_fir_details_rollback.filter(batch_sr_num__in=list(batch_list))
			state_list = MState.objects.using(SOURCE_DATABASE).filter(lang_cd='99', record_status='C').exclude(state='').values('state_cd','state').order_by('state') 
			district_list = MDistrict.objects.using(SOURCE_DATABASE).filter(lang_cd='99', record_status='C').values('district_cd','district').order_by('district_cd')
			police_station_list = MPoliceStation.objects.using(SOURCE_DATABASE).filter(lang_cd='99', record_status='C').values('ps_cd','ps').order_by('ps')
			
			result['data'] = []
			for fir_item in get_fir_details_with_batch:
				state_details = state_list.filter(state_cd =fir_item.state_cd).first()
				district_details = district_list.filter(district_cd=fir_item.district_cd).first()
				ps_details = police_station_list.filter(ps_cd=fir_item.ps_cd).first()
				result['data'].append([fir_item.batch_sr_num,fir_item.fir_reg_num,state_details['state'],district_details['district'],ps_details['ps'],fir_item.reg_year,fir_item.get_current_status_display()])

			result['status'] = True
		except TMigration_Batch_History.DoesNotExist:
			response = False
			result['error'] = 'Invaild Request.'
		except Exception as e:
			response = False
			logger.critical(f'RollBack_FIR_Batch_List POST {{ERROR:{e},Response:{response}}}')
			result['error'] = 'Due to System Error ,Unable to get FIR Details.'
			

		logger.debug(f'RollBack_FIR_Batch_List POST {{Response:{response}}}')
		return HttpResponse(json.dumps(result), content_type='application/x-json')

class RollBack_Log_Reader_Handler(View):
	def post(self,request,pk,line_number,*args,**kwargs):
		logger.debug(f'RollBack_Log_Reader_Handler POST Initial')
		result={'error':None,'status':False}
		try:
			required_data = []
			line = line_number
			pk = pk
			if request.session['can_rollback'] is False:
				messages.error(request,"Invalid Request.You Have No Permission for RollBack.")
				logger.info(f"RollBack_Auth_Handler POST {{User:{request.session['username']},Error:Unauthorized,Status-code:404}}")
				logger.debug(f"RollBack_Auth_Handler POST {{Response:{response}}}")
				return redirect('/')

			if request.session['is_admin'] is False and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk,user=request.session['username'])
			elif request.session['is_admin'] is True and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)

			rollback_batch_sr_num = Rollback_details.batch_sr_num
			if '[' in rollback_batch_sr_num:
				file_name = pk
				file_path = os.path.join(MIGRATE_LOG_PATH,f'RollBack_Multi_Batch_{file_name}.log') 
			else:
				file_name = rollback_batch_sr_num
				file_path = os.path.join(MIGRATE_LOG_PATH,f'{file_name}.log') 

			f = open(file_path,'r')
			all_lines_variable = f.readlines()	
			result['total_line'] = len(all_lines_variable)
			
			if len(all_lines_variable) < line:
				line = 0

			for i in range(line,len(all_lines_variable)):
				required_data.append(all_lines_variable[i])

			f.close()
			result['is_rollback_running'] = Rollback_details.status
			if Rollback_details.status != 1:
				if len(required_data) > 0:
					result['is_rollback_running'] = 1
				else:
					result['is_rollback_running'] =  Rollback_details.status
			
			result['data'] = required_data
			result['status'] = True		
		except TMigration_Batch_History.DoesNotExist:
			result['error'] = 'Invalid Request By You.'
		except Exception as e:
			logger.critical(f'RollBack_Log_Reader_Handler POST {{Response:{result},Error:{e}}}')
			result['error'] = 'Due to System Error,Unable to able read Logs file.Please Contact With Techinical Team.'
		
		logger.debug(f'RollBack_Log_Reader_Handler POST {{Response:{result}}}')
		return HttpResponse(json.dumps(result), content_type='application/x-json')

class RollBack_START_Handler(View,RollBack_Batch_Process):
	def post(self,request,pk,*args,**kwargs):
		logger.debug(f'RollBack_START_Handler POST Initial')
		result={'error':None,'status':False}
		try:
			if request.session['can_rollback'] is False:
				messages.error(request,"Invalid Request.You Have No Permission for RollBack.")
				logger.info(f"RollBack_Auth_Handler POST {{User:{request.session['username']},Error:Unauthorized,Status-code:404}}")
				logger.debug(f"RollBack_Auth_Handler POST {{Response:{response}}}")
				return redirect('/')

			if request.session['is_admin'] is False and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk,user=request.session['username'])
			elif request.session['is_admin'] is True and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)

			if Rollback_details.status != 0:
				if Rollback_details.status == 1:
					result['error'] = 'Rollback Process Already Running.'
				elif Rollback_details.status == 2:
					result['error'] = 'Rollback Process is Successfully Complete.'
				elif Rollback_details.status == 3:
					result['error'] = 'Rollback Process is Failed. Unable to Start Again RollBack.'
				elif Rollback_details.status == 4:
					result['error'] = 'Rollback Process is Cancle By User. Unable to Start Again RollBack.'
				elif Rollback_details.status == 5:
					result['error'] = 'Rollback Process is Abort By User. Unable to Start Again RollBack.'
				else:
					result['error'] = 'Done Know of Status of Rollback.Unable to Start RollBack'
				
				logger.debug(f'RollBack_START_Handler POST {{Response:{result}}}')
				return HttpResponse(json.dumps(result), content_type='application/x-json')
	
			
			try:
				with transaction.atomic(using=MIGRATION_DATABASE):
					with transaction.atomic(using=SOURCE_DATABASE):
						with transaction.atomic(using=DESTINATION_DATABASE):
							self.start_migration_rollback_process(request,Rollback_details)
							result={'error':None,'status':True,'messages':'Successfully Rollback Request Send.'}
				transaction.commit(using=MIGRATION_DATABASE)
				if  Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).all().count() == 1:
					thread_initial = Migation_Rollback_Thread()
					thread_initial.start()
				
				logger.debug(f'RollBack_START_Handler GET {{Response:{result}}}')
				return HttpResponse(json.dumps(result), content_type='application/x-json')
			except Exception as e:
				print(e)
				result['error']= 'Unable to START Rollback Due to System Error.Please Contact With Techinical Team.'

		except TMigration_Batch_History.DoesNotExist:
			result['error'] = 'Invalid Request..'
			logger.critical(f'RollBack_START_Handler GET {{ERROR:Invalid Request,PK:{pk},User:{request.session["username"]},Response:{result}}}')
		except Exception as e:
			result['error'] = 'Rollback Process unable to start due to System Error.Please Contact with Techinical Team.'
			logger.critical(f'RollBack_START_Handler GET {{ERROR:{e},Response:{result}}}')

		logger.debug(f'RollBack_START_Handler GET {{Response:{result}}}')
		return HttpResponse(json.dumps(result), content_type='application/x-json')

class RollBack_STOP_Handler(View,RollBack_Batch_Process):
	def post(self,request,pk,*args,**kwargs):
		logger.debug(f'RollBack_STOP_Handler POST Initial')
		result={'error':None,'status':False}
		try:
			if request.session['can_rollback'] is False:
				messages.error(request,"Invalid Request.You Have No Permission for RollBack.")
				logger.info(f"RollBack_STOP_Handler POST {{User:{request.session['username']},Error:Unauthorized,Status-code:404}}")
				logger.debug(f"RollBack_STOP_Handler POST {{Response:{response}}}")
				return redirect('/')

			if request.session['is_admin'] is False and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk,user=request.session['username'])
			elif request.session['is_admin'] is True and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)

			if Rollback_details.status != 1:
				if Rollback_details.status == 0:
					result['error'] = 'Rollback Process is not Start.Please Start RollBack First.'
				elif Rollback_details.status == 2:
					result['error'] = 'Rollback Process is Successfully Complete.'
				elif Rollback_details.status == 3:
					result['error'] = 'Rollback Process is Failed. Unable to Start Again RollBack.'
				elif Rollback_details.status == 4:
					result['error'] = 'Rollback Process is Cancle By User. Unable to Start Again RollBack.'
				elif Rollback_details.status == 5:
					result['error'] = 'Rollback Process is Abort By User. Unable to Start Again RollBack.'
				else:
					result['error'] = 'Dont Know of Status of Rollback.Unable to Start RollBack'
			
				logger.debug(f'RollBack_STOP_Handler POST {{Response:{result}}}')
				return HttpResponse(json.dumps(result), content_type='application/x-json')

			Migration_Rollback_Process_Instance = Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).get(history_pk=pk)
			self.stop_migration_rollback_process(request,Migration_Rollback_Process_Instance)
			result={'error':None,'status':True,'messages':'Successfully Rollback Stop Request Send.'}
		except TMigration_Batch_History.DoesNotExist:
			result['error'] = 'No RollBack is initial For this RollBack ID.'
			logger.critical(f'RollBack_STOP_Handler POST {{ERROR:{e},Response:{result}}}')
		except Exception as e:
			result['error'] = 'Rollback Process unable to Stop due to System Error.Please Contact with Techinical Team.'
			logger.critical(f'RollBack_STOP_Handler POST {{ERROR:{e},Response:{result}}}')

		logger.debug(f'RollBack_STOP_Handler POST {{Response:{result}}}')
		return HttpResponse(json.dumps(result), content_type='application/x-json')

class RollBack_History_Handler(View):
	template_name = 'api/rollback/r_history.html'
	def get(self,request,*args,**kwargs):
		logger.debug(f'RollBack_History_Handler GET Initial')
		response = False
		try:
			if request.session['can_rollback'] is False:
				messages.error(request,"Invalid Request.You Have No Permission for RollBack.")
				logger.info(f"RollBack_History_Handler GET {{User:{request.session['username']},Error:Unauthorized,Status-code:404}}")
				logger.debug(f"RollBack_History_Handler GET {{Response:{response}}}")
				return redirect('/')

			if request.session['is_admin'] is False and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).filter(program_of_type='R',user=request.session['username']).order_by('-create_time')
			elif request.session['is_admin'] is True and request.session['is_staff'] is True:
				Rollback_details = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).filter(program_of_type='R').order_by('-create_time')

			context = {}
			context['page_name'] = 'rollback'
			context['sub_page'] = 'rollback_history'
			context['query_set'] = Rollback_details
			return render(request,RollBack_History_Handler.template_name,context)
		except Exception as e:
			logger.critical(f'RollBack_History_Handler GET {{ERROR:{e},Response:{response}}}')
			messages.error(request,'Due to System Error. Unable to get History Page.Please Contact With System Admin.')

		logger.debug(f'RollBack_History_Handler GET {{Response:{response}}}')
		return redirect('/rollback/')