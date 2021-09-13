from ..base import *
from ..api import Migation_Rollback_Thread

class Migration_RollBack_HTML_API_Handler():
	def create_migration_history(self,request,batch_sr_num,program_of_type,method_of_type,username):
		logger.debug(f'Migration_RollBack_HTML_API_Handler create_migration_history Initial')
		TMigration_Batch_History_Instance = TMigration_Batch_History()
		TMigration_Batch_History_Instance.batch_sr_num = batch_sr_num
		TMigration_Batch_History_Instance.program_of_type = program_of_type
		TMigration_Batch_History_Instance.method_of_type = method_of_type
		TMigration_Batch_History_Instance.user = username
		TMigration_Batch_History_Instance.create_time = datetime.datetime.now(India_current_time)
		TMigration_Batch_History_Instance.save(using=MIGRATION_DATABASE)
		self.TMigration_Batch_History_Instance_pk = TMigration_Batch_History_Instance.pk
		logger.debug(f'Migration_RollBack_HTML_API_Handler create_migration_history {{Response:True}}')

	def create_migration_batch(self,request,batch_sr_num,fir_reg_num_list,username):
		logger.debug(f'Migration_RollBack_HTML_API_Handler create_migration_batch Initial')
		self.create_migration_batch_time = datetime.datetime.now(India_current_time)
		self.batch_instance = TMigration_Batch_Details()
		self.batch_instance.batch_sr_num = batch_sr_num
		self.batch_instance.fir_sr_count = len(fir_reg_num_list)
		self.batch_instance.user = username
		self.batch_instance.create_time = self.create_migration_batch_time
		self.batch_instance.save(using=MIGRATION_DATABASE)
		self.create_migration_batch_fir(request,batch_sr_num,fir_reg_num_list)
		self.create_migration_history(request,batch_sr_num,'M','T',username)
		self.batch_instance.migration_history_pk = self.TMigration_Batch_History_Instance_pk
		self.batch_instance.save(using=MIGRATION_DATABASE)
		logger.debug(f'Migration_RollBack_HTML_API_Handler create_migration_batch {{Response:True}}')

	def create_migration_batch_fir(self,request,batch_sr_num,fir_reg_num_list):
		logger.debug(f'Migration_RollBack_Batch_Handler create_migration_batch_fir Initial')
		all_fir_reg_num_details = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in =fir_reg_num_list)
		for fir_reg_num in fir_reg_num_list:
			per_fir_details = all_fir_reg_num_details.filter(fir_reg_num = fir_reg_num).first()
			instance = TMigration_Batch_FIR_Details()
			instance.fir_reg_num = fir_reg_num
			instance.batch_sr_num = batch_sr_num
			instance.state_cd = per_fir_details.state_cd
			instance.district_cd = per_fir_details.district_cd
			instance.ps_cd = per_fir_details.ps_cd
			instance.reg_year = per_fir_details.reg_year
			instance.fir_srno = per_fir_details.fir_srno
			instance.create_time = self.create_migration_batch_time
			instance.save(using=MIGRATION_DATABASE)
		logger.debug(f'Migration_RollBack_Batch_Handler create_migration_batch_fir {{Response:True}}')

	def cancle_migration_batch(self,request,histroy_instance,cancle_username):
		logger.debug(f'Migration_RollBack_HTML_API_Handler cancle_migration_batch Initial')
		cancle_time = datetime.datetime.now(India_current_time)
		TMigration_Batch_Details_Instance = TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).get(migration_history_pk=histroy_instance.pk)
		TMigration_Batch_FIR_Details_list = TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=TMigration_Batch_Details_Instance.batch_sr_num)
		for fir_reg_num in TMigration_Batch_FIR_Details_list:
			logger.debug(f'Migration_RollBack_HTML_API_Handler cancle_migration_batch  {{TMigration_Batch_FIR_Details PK:{histroy_instance.pk},User:{histroy_instance.user},Cancle_User:{cancle_username},Batch:{fir_reg_num.batch_sr_num},Fir_Reg_No:{fir_reg_num.fir_reg_num},Start}}')
			fir_reg_num.current_status = 'C'
			fir_reg_num.start_time = cancle_time
			fir_reg_num.complete_time = cancle_time
			fir_reg_num.save(using=MIGRATION_DATABASE)
			logger.debug(f'Migration_RollBack_HTML_API_Handler cancle_migration_batch  {{TMigration_Batch_FIR_Details PK:{histroy_instance.pk},User:{histroy_instance.user},Cancle_User:{cancle_username},Batch:{fir_reg_num.batch_sr_num},Fir_Reg_No:{fir_reg_num.fir_reg_num},END}}')

		logger.debug(f'Migration_RollBack_HTML_API_Handler cancle_migration_batch  {{TMigration_Batch_Details PK:{histroy_instance.pk},User:{histroy_instance.user},Cancle_User:{cancle_username},Batch:{TMigration_Batch_Details_Instance.batch_sr_num} START}}')
		TMigration_Batch_Details_Instance.current_status = 'CN'
		TMigration_Batch_Details_Instance.start_time = cancle_time
		TMigration_Batch_Details_Instance.complete_time = cancle_time
		TMigration_Batch_Details_Instance.save(using=MIGRATION_DATABASE)
		logger.debug(f'Migration_RollBack_HTML_API_Handler cancle_migration_batch  {{TMigration_Batch_Details PK:{histroy_instance.pk},User:{histroy_instance.user},Cancle_User:{cancle_username},Batch:{TMigration_Batch_Details_Instance.batch_sr_num} END}}')

		logger.debug(f'Migration_RollBack_HTML_API_Handler cancle_migration_batch  {{TMigration_Batch_History PK:{histroy_instance.pk},User:{histroy_instance.user},Cancle_User:{cancle_username},Batch:{TMigration_Batch_Details_Instance.batch_sr_num} START}}')
		histroy_instance.status = 4
		histroy_instance.cancle_user = cancle_username
		histroy_instance.is_auth = 1
		histroy_instance.start_time = cancle_time
		histroy_instance.complete_time = cancle_time
		histroy_instance.save(using=MIGRATION_DATABASE)
		logger.debug(f'Migration_RollBack_HTML_API_Handler cancle_migration_batch  {{TMigration_Batch_History PK:{histroy_instance.pk},User:{histroy_instance.user},Cancle_User:{cancle_username},Batch:{TMigration_Batch_Details_Instance.batch_sr_num} END}}')
		logger.debug(f'Migration_RollBack_HTML_API_Handler cancle_migration_batch {{Response:True}}')

	def unauthorized_migration_batch(self,request,histroy_instance):
		logger.debug(f'Migration_RollBack_HTML_API_Handler unauthorized_migration_batch Initial')
		failed_time = datetime.datetime.now(India_current_time)
		failed_reason = "Not Provide Valid Password For authentication."
		TMigration_Batch_Details_Instance = TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).get(batch_sr_num=histroy_instance.batch_sr_num)
		TMigration_Batch_FIR_Details_list = TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=TMigration_Batch_Details_Instance.batch_sr_num)

		logger.debug(f'Migration_RollBack_HTML_API_Handler unauthorized_migration_batch  {{TMigration_Batch_FIR_Details PK:{histroy_instance.pk},User:{histroy_instance.user},Batch:{TMigration_Batch_Details_Instance.batch_sr_num} START}}')
		TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=TMigration_Batch_Details_Instance.batch_sr_num).update(current_status='F',failed_reason=failed_reason,start_time=failed_time,complete_time=failed_time)
		logger.debug(f'Migration_RollBack_HTML_API_Handler unauthorized_migration_batch  {{TMigration_Batch_FIR_Details PK:{histroy_instance.pk},User:{histroy_instance.user},Batch:{TMigration_Batch_Details_Instance.batch_sr_num} END}}')
		
		logger.debug(f'Migration_RollBack_HTML_API_Handler unauthorized_migration_batch  {{TMigration_Batch_Details PK:{histroy_instance.pk},User:{histroy_instance.user},Batch:{TMigration_Batch_Details_Instance.batch_sr_num} START}}')
		TMigration_Batch_Details_Instance.current_status = 'F'
		TMigration_Batch_Details_Instance.failed_reason = "Not Provide Valid Password For authentication."
		TMigration_Batch_Details_Instance.start_time = failed_time
		TMigration_Batch_Details_Instance.complete_time = failed_time
		TMigration_Batch_Details_Instance.save(using=MIGRATION_DATABASE)
		logger.debug(f'Migration_RollBack_HTML_API_Handler unauthorized_migration_batch  {{TMigration_Batch_Details PK:{histroy_instance.pk},User:{histroy_instance.user},Batch:{TMigration_Batch_Details_Instance.batch_sr_num} END}}')

		logger.debug(f'Migration_RollBack_HTML_API_Handler unauthorized_migration_batch  {{TMigration_Batch_History PK:{histroy_instance.pk},User:{histroy_instance.user},Batch:{TMigration_Batch_Details_Instance.batch_sr_num} START}}')
		histroy_instance.status = 3
		histroy_instance.is_auth = 1
		histroy_instance.failed_reason = "Not Provide Valid Password For authentication." 
		histroy_instance.start_time = failed_time
		histroy_instance.complete_time = failed_time
		histroy_instance.save(using=MIGRATION_DATABASE)
		logger.debug(f'Migration_RollBack_HTML_API_Handler unauthorized_migration_batch  {{TMigration_Batch_History PK:{histroy_instance.pk},User:{histroy_instance.user},Batch:{TMigration_Batch_Details_Instance.batch_sr_num} END}}')
		logger.debug(f'Migration_RollBack_HTML_API_Handler unauthorized_migration_batch {{Response:True}}')

	def create_rollback_history(self,request,batch_sr_num,program_of_type,method_of_type,username):
		logger.debug(f'Migration_RollBack_HTML_API_Handler create_rollback_history Initial')
		TMigration_Batch_History_Instance = TMigration_Batch_History()
		TMigration_Batch_History_Instance.batch_sr_num = batch_sr_num
		TMigration_Batch_History_Instance.program_of_type = program_of_type
		TMigration_Batch_History_Instance.method_of_type = method_of_type
		TMigration_Batch_History_Instance.user = username
		TMigration_Batch_History_Instance.create_time = datetime.datetime.now(India_current_time)
		TMigration_Batch_History_Instance.save(using=MIGRATION_DATABASE)
		self.TMigration_Batch_History_Instance_pk = TMigration_Batch_History_Instance.pk
		logger.debug(f'Migration_RollBack_HTML_API_Handler create_rollback_history {{Response:True}}')


	def create_rollback_details(self,request,pk,fir_wise_list,username):
		logger.debug(f'Migration_RollBack_HTML_API_Handler create_rollback_details Initial')
		create_time = datetime.datetime.now(India_current_time)
		TRollBack_Batch_Details.objects.using(MIGRATION_DATABASE).bulk_create([TRollBack_Batch_Details(rollback_id=pk,batch_sr_num=FIR_REG_INSTANCE.batch_sr_num,fir_reg_num=FIR_REG_INSTANCE.fir_reg_num,username=username,create_time=create_time) for FIR_REG_INSTANCE in fir_wise_list])
		logger.debug(f'Migration_RollBack_HTML_API_Handler create_rollback_details {{Response:True}}')

	def create_rollback_single_fir_details(self,request,pk,batch_list,username):
		logger.debug(f'Migration_RollBack_HTML_API_Handler create_rollback_single_fir_details Initial')
		create_time = datetime.datetime.now(India_current_time)
		TRollBack_Batch_Details.objects.using(MIGRATION_DATABASE).bulk_create([TRollBack_Batch_Details(rollback_id=pk,batch_sr_num=BATCH_INSTANCE.batch_sr_num,fir_reg_num=BATCH_INSTANCE.fir_reg_num,username=username,create_time=create_time) for BATCH_INSTANCE in batch_list])
		logger.debug(f'Migration_RollBack_HTML_API_Handler create_rollback_single_fir_details Initial')
		
	def unauthorized_rollback_batch(self,request,histroy_instance):
		logger.debug(f'Migration_RollBack_HTML_API_Handler unauthorized_rollback_batch Initial')
		failed_time = datetime.datetime.now(India_current_time)
		failed_reason = "Not Provide Valid Password For authentication."
		# Update in RollBak 
		TRollBack_Batch_Details.objects.using(MIGRATION_DATABASE).filter(rollback_id=histroy_instance.pk).update(start_time = failed_time,complete_time = failed_time,status = 3,failed_reason=failed_reason)
		
		# Update in Histroy
		histroy_instance.status = 3
		histroy_instance.is_auth = 1
		histroy_instance.failed_reason = "Not Provide Valid Password For authentication." 
		histroy_instance.start_time = failed_time
		histroy_instance.complete_time = failed_time
		histroy_instance.save(using=MIGRATION_DATABASE) 

		logger.debug(f'Migration_RollBack_HTML_API_Handler unauthorized_rollback_batch {{Response:True}}')

	def authorized_rollback_batch(self,request,histroy_instance,rollback_reason,auth_count):
		logger.debug(f'Migration_RollBack_HTML_API_Handler authorized_rollback_batch Initial')
		histroy_instance.rollback_reason = rollback_reason
		histroy_instance.is_auth = 1
		histroy_instance.auth_count = auth_count
		histroy_instance.save(using=MIGRATION_DATABASE) 
		logger.debug(f'Migration_RollBack_HTML_API_Handler authorized_rollback_batch {{Response:True}}')

	def start_migration_rollback_process(self,request,histroy_instance):
		print('start_migration_rollback_process start')
		logger.debug(f'Migration_RollBack_HTML_API_Handler start_migration_rollback_process Initial')
		Migration_Rollback_Process_Instance = Migration_Rollback_Process()
		Migration_Rollback_Process_Instance.history_pk = histroy_instance.pk
		Migration_Rollback_Process_Instance.program_of_type = histroy_instance.program_of_type
		Migration_Rollback_Process_Instance.add_time = datetime.datetime.now(India_current_time)
		Migration_Rollback_Process_Instance.save(using=MIGRATION_DATABASE)
		
		logger.debug(f'Migration_RollBack_HTML_API_Handler start_migration_rollback_process {{Response:True}}')
		print('start_migration_rollback_process end')
	
	def stop_migration_rollback_process(self,request,process_instance):
		print('enter stop_migration_rollback_process')
		logger.debug(f'Migration_RollBack_HTML_API_Handler stop_migration_rollback_process Initial')
		process_instance.status = 2
		process_instance.save(using=MIGRATION_DATABASE)
		logger.debug(f'Migration_RollBack_HTML_API_Handler stop_migration_rollback_process {{Response:True}}')
		print('out stop_migration_rollback_process')

class Migration_Batch_Process(Migration_RollBack_HTML_API_Handler):
	def initial_all_fir(self,request,username,*args,**kwargs):
		logger.debug(f'Migration_Batch_Process initial_all_fir Initial')
		response = False
		try:
			self.Success_FIR_Batch_List = TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(current_status='S').values_list('fir_reg_num',flat=True)
			batch_sr_num = str(datetime.datetime.now(India_current_time).strftime("%Y%m%d%H%M%S"))
			if request.session['is_admin'] is True:
				all_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).all().values_list('fir_reg_num',flat=True) # later here Query where to find
			else:
				state = MState.objects.using(SOURCE_DATABASE).get(lang_cd='99', record_status='C',state = request.session['state'])
				district = MDistrict.objects.using(SOURCE_DATABASE).get(lang_cd='99', record_status='C',district= request.session['district']) 
				ps_station = MPoliceStation.objects.using(SOURCE_DATABASE).get(lang_cd='99', record_status='C',ps= request.session['ps_station']) 
				all_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(state_cd=state.state_cd,district_cd=district.district_cd,ps_cd=ps_station.ps_cd).values_list('fir_reg_num',flat=True) # later here Query where to find
			
			self.peding_fir_reg_num_list = []
			for fir_reg_num in all_fir_reg_num_list:
				if fir_reg_num not in self.Success_FIR_Batch_List:
					self.peding_fir_reg_num_list.append(fir_reg_num)
			
			if len(self.peding_fir_reg_num_list) > 0:
				try:
					with transaction.atomic(using=MIGRATION_DATABASE):
						self.create_migration_batch(request,batch_sr_num,self.peding_fir_reg_num_list,username)
						messages.success(request,f'Batch {batch_sr_num} Create Successfully Created.')
						response = True
						logger.debug(f'Migration_Batch_Process initial_all_fir {{Response:{response}}}')
						return response
				except IntegrityError:
					messages.error(request,'Due to Database Error ,Unable to Created Migration Batch.Please contact your Techinical Team.')
					logger.critical(f'Migration_Batch_Process initial_all_fir {{Error:{IntegrityError}}}')
					transaction.rollback(using=MIGRATION_DATABASE)
				except Exception as e:
					logger.critical(f'Migration_Batch_Process initial_all_fir {{Error:{e}}}')
					messages.error(request,'Due to System Error ,Unable to Created Migration Batch.Please contact your Techinical Team.')
					transaction.rollback(using=MIGRATION_DATABASE)		
			else:
				messages.info(request,'No FIR is Pending for Migration.')
		except Exception as e:
			messages.error(request,'Due to System Error ,Unable to Created Migration Batch.Please contact your Techinical Team.')
			logger.critical(f'Migration_Batch_Process initial_all_fir Error:{e}')

		logger.debug(f'Migration_Batch_Process initial_all_fir {{Response:{response}}}')
		return response

	def custom_fir_reg_list(self,request,*args,**kwargs):
		logger.debug(f'Migration_Batch_Process custom_fir_reg_list Initial')
		response = False
		try:
			ALL_LIST = ['ALL']
			fir_reg_no = request.POST.get('fir_sr_no')
			self.final_peding_fir_reg_num_list = []

			if (set(ALL_LIST).issubset(set(self.state_code))) and (set(ALL_LIST).issubset(set(self.district_code))) and (set(ALL_LIST).issubset(set(self.ps_code))):
				if (set(ALL_LIST).issubset(set(self.year))):
					if fir_reg_no != '':
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,fir_srno=fir_reg_no).values_list('fir_reg_num',flat=True)
					else:
						self.final_peding_fir_reg_num_list = self.peding_fir_reg_num_list
				else:
					if fir_reg_no != '':
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,reg_year__in=self.year,fir_srno=fir_reg_no).values_list('fir_reg_num',flat=True)
					else:
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,reg_year__in=self.year).values_list('fir_reg_num',flat=True)
			
			elif (set(ALL_LIST).issubset(set(self.state_code))) is False and (set(ALL_LIST).issubset(set(self.district_code))) and (set(ALL_LIST).issubset(set(self.ps_code))) :
				if (set(ALL_LIST).issubset(set(self.year))):
					if fir_reg_no != '':
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,state_cd__in=self.state_code,fir_srno=fir_reg_no).values_list('fir_reg_num',flat=True)
					else:
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,state_cd__in=self.state_code).values_list('fir_reg_num',flat=True)
				else:
					if fir_reg_no != '':
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,state_cd__in=self.state_code,reg_year__in=self.year,fir_srno=fir_reg_no).values_list('fir_reg_num',flat=True)
					else:
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,state_cd__in=self.state_code,reg_year__in=self.year).values_list('fir_reg_num',flat=True)
			elif (set(ALL_LIST).issubset(set(self.state_code))) is False and (set(ALL_LIST).issubset(set(self.district_code))) is False and (set(ALL_LIST).issubset(set(self.ps_code))) :
				if (set(ALL_LIST).issubset(set(self.year))):
					if fir_reg_no != '':
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,state_cd__in=self.state_code,district_cd__in=self.district_code,fir_srno=fir_reg_no).values_list('fir_reg_num',flat=True)
					else:
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,state_cd__in=self.state_code,district_cd__in=self.district_code).values_list('fir_reg_num',flat=True)
				else:
					if fir_reg_no != '':
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,state_cd__in=self.state_code,district_cd__in=self.district_code,reg_year__in=self.year,fir_srno=fir_reg_no).values_list('fir_reg_num',flat=True)
					else:
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,state_cd__in=self.state_code,district_cd__in=self.district_code,reg_year__in=self.year).values_list('fir_reg_num',flat=True)
			
			elif (set(ALL_LIST).issubset(set(self.state_code))) is False and (set(ALL_LIST).issubset(set(self.district_code))) is False and (set(ALL_LIST).issubset(set(self.ps_code))) is False :
				if (set(ALL_LIST).issubset(set(self.year))):
					if fir_reg_no != '':
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,state_cd__in=self.state_code,district_cd__in=self.district_code,ps_cd__in=self.ps_code,fir_srno=fir_reg_no).values_list('fir_reg_num',flat=True)
					else:
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,state_cd__in=self.state_code,district_cd__in=self.district_code,ps_cd__in=self.ps_code).values_list('fir_reg_num',flat=True)
				else:
					if fir_reg_no != '':
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,state_cd__in=self.state_code,district_cd__in=self.district_code,ps_cd__in=self.ps_code,reg_year__in=self.year,fir_srno=fir_reg_no).values_list('fir_reg_num',flat=True)
					else:
						self.final_peding_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in=self.peding_fir_reg_num_list,state_cd__in=self.state_code,district_cd__in=self.district_code,ps_cd__in=self.ps_code,reg_year__in=self.year).values_list('fir_reg_num',flat=True)
			
			if len(self.final_peding_fir_reg_num_list) > 0:
				self.peding_fir_reg_num_list = self.final_peding_fir_reg_num_list
				response = True
			else:
				messages.info(request,'No FIR Number is pending According your Custom Search.')
		except Exception as e:
			messages.error(request,'Due to System Error ,Unable to Created Migration Batch.Please contact your Techinical Team.')
			logger.critical(f'Migration_Batch_Process custom_fir_reg_list {{Response:{response},Error:{e}}}')

		logger.debug(f'Migration_Batch_Process custom_fir_reg_list {{Response:{response}}}')
		return response
		
	def initial_coustm_search(self,request,username,*args,**kwargs):
		logger.debug(f'Migration_Batch_Process initial_coustm_search Initial')
		response = False
		try:
			# Get Pendig FIR List
			self.Success_FIR_Batch_List = TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(current_status='S').values_list('fir_reg_num',flat=True)
			batch_sr_num = str(datetime.datetime.now(India_current_time).strftime("%Y%m%d%H%M%S"))
			self.peding_fir_reg_num_list = []
			all_fir_reg_num_list = TFirRegistration.objects.using(SOURCE_DATABASE).all().values_list('fir_reg_num',flat=True) # later here Query where to find
			print(all_fir_reg_num_list.count())
			for fir_reg_num in all_fir_reg_num_list:
				if fir_reg_num not in self.Success_FIR_Batch_List:
					self.peding_fir_reg_num_list.append(fir_reg_num)

			if len(self.peding_fir_reg_num_list) > 0:
				custom_fir_reg_list_response = self.custom_fir_reg_list(request,*args,**kwargs)
				if custom_fir_reg_list_response is True:
					try:
						with transaction.atomic(using=MIGRATION_DATABASE):
							self.create_migration_batch(request,batch_sr_num,self.peding_fir_reg_num_list,username)
							messages.success(request,f'{batch_sr_num} Success Batch Create.')
							response = True
							logger.debug(f'Migration_Batch_Process initial_coustm_search {{Response:{response}}}')
							return response
					except IntegrityError:
							logger.critical(f'Migration_Batch_Process initial_coustm_search Error:{IntegrityError}')
							messages.error(request,'Due to Database Error ,Unable to Created Migration Batch.Please contact With Techinical Team.')
							transaction.rollback(using=MIGRATION_DATABASE)
					except Exception as e:
						logger.critical(f'Migration_Batch_Process initial_coustm_search Error:{e}')
						messages.error(request,'Due to System Error,Unable to Create Batch.Please contact With Techinical Team.')
						transaction.rollback(using=MIGRATION_DATABASE)
						
			else:
				messages.info(request,'No FIR is Pending for Migration.')
		except Exception as e:
			messages.error(request,'Due to System Error ,Unable to Created Migration Batch.Please contact your Techinical Team.')
			logger.critical(f'Migration_Batch_Process initial_coustm_search Error:{e}')

		logger.debug(f'Migration_Batch_Process initial_coustm_search {{Response:{response}}}')
		return response

class RollBack_Batch_Process(Migration_RollBack_HTML_API_Handler):
	
	def initial_by_batch(self,request,batch_sr_num,file_instance,*args,**kwargs):
		if request.session['can_rollback'] is False:
			messages.error(request,'You Have Not Permission for RollBack.')
			return False

		if request.session['is_admin'] is False:
			Batch_Details = TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).get(batch_sr_num=batch_sr_num)
		else:
			Batch_Details = TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).get(batch_sr_num=batch_sr_num,user=request.session['username'])
		
		if Batch_Details.current_status not in ['S','PR'] :
			if Batch_Details.current_status == 'C':
				messages.error(request,f'Batch {batch_sr_num} is Created only.Please Start Migration. Not Perform RollBack.')
			if Batch_Details.current_status == 'CN':
				messages.error(request,f'Batch {batch_sr_num} has been Cancled by Used. Not Perform RollBack.')
			if Batch_Details.current_status == 'F':
				messages.error(request,f'Batch {batch_sr_num} Migration has been Failed. Not Perform RollBack.')
			if Batch_Details.current_status == 'A':
				messages.error(request,f'Batch {batch_sr_num} Migration abort by User. Not Perform RollBack.')
			if Batch_Details.current_status == 'R':
				messages.error(request,f'Batch {batch_sr_num} Already RollBack.Can not Perform RollBack Again.')
			return False

		Batch_FIR_List = TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=batch_sr_num) #,current_status='S')
		
		if len(Batch_FIR_List) == 0:
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Rollback Batch Creation Failed.Error:{Error} \n')
			messages.error(request,'No Pending FIR is Persent For RollBack.')
			Batch_Details.current_status = 'R'
			Batch_Details.save(using=MIGRATION_DATABASE)
			return True

		file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Total Fir Number For RollBack: {Batch_FIR_List.count()} \n')
		self.create_rollback_history(request,batch_sr_num,'R','B',request.session['username'])
		self.create_rollback_details(request,self.TMigration_Batch_History_Instance_pk,Batch_FIR_List,request.session['username'])
		messages.success(request,'RollBack Batch is Successfull Created.Please Start it.')

	def initial_by_batch_fir_wise(self,request,batch_sr_num,fir_list_array,file_instance,*args,**kwargs):
		if request.session['can_rollback'] is False:
			messages.error(request,'You Have Not Permission for RollBack.')
			return False

		if request.session['is_admin'] is False:
			Batch_Details = TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).get(batch_sr_num=batch_sr_num)
		else:
			Batch_Details = TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).get(batch_sr_num=batch_sr_num,user=request.session['username'])
		

		Batch_FIR_List = TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=batch_sr_num,fir_reg_num__in = list(fir_list_array)) #,current_status='S')
		FINAL_FIR_LIST = list(Batch_FIR_List.values_list('fir_reg_num',flat=True))
		
		if Batch_FIR_List.count() == len(fir_list_array):
			FIR_Not_Persent = list(set(fir_list_array) ^ set(FINAL_FIR_LIST))
			# Check Pending FIR is Persent in batch or not
			Check_FIR_LIST = TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(fir_reg_num__in=FIR_Not_Persent).values_list('fir_reg_num',flat=True)
			not_persent = list(set(FIR_Not_Persent) ^ set(list(Check_FIR_LIST)))
			not_success = list(set(FIR_Not_Persent) ^ set(not_persent))
			
			if len(not_success) > 0:
				messages.info(request,f'{len(not_success)} will Be remove from Batch due to  Current Status is Not Success.FIR Number:{not_success}')
			if len(not_persent) > 0:
				messages.info(request,f'{len(not_success)} will Be remove from Batch due to  not persent in Migration Batch.FIR Number:{not_success}')

		if Batch_FIR_List.count() == 0:
			messages.error(request,f'No FIR is Available For Rollback For this Coustom Search.')
			return False

		
		file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Total Fir Number For RollBack: {Batch_FIR_List.count()} \n')
		self.create_rollback_history(request,batch_sr_num,'R','B',request.session['username'])
		self.create_rollback_details(request,self.TMigration_Batch_History_Instance_pk,Batch_FIR_List,request.session['username'])
		messages.success(request,f'RollBack Batch is Created.Initial FIR Count:{len(fir_list_array)}, Process FIR Count {len(FINAL_FIR_LIST)}.')

	def initial_by_single_fir_wise(self,request,*args,**kwargs):
		single_fir_list_array = request.POST.getlist('single_fir_list_array')
		batch_fir_details = TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(fir_reg_num__in=single_fir_list_array) #,current_status='S')
		batch_fir_list = single_fir_list_array
		batch_list = []

		for item in batch_fir_details:
			batch_list.append(item.batch_sr_num)
		
		batch_list = list(set(batch_list))

		print(batch_fir_list)
		print(batch_list)
		self.create_rollback_history(request,batch_list,'R','F',request.session['username'])
		self.create_rollback_details(request,self.TMigration_Batch_History_Instance_pk,batch_fir_details,request.session['username'])







# District List
def get_district_list(request,state_code):
	logger.debug(f'get_district_list Initial')
	response = {'status':False}
	try:
		required_data = []
		lists = MDistrict.objects.using(SOURCE_DATABASE).filter(state_cd=state_code, lang_cd='99', record_status='C').order_by('district')
		for item in lists:
			values = {'district_cd':item.district_cd,'district':item.district}
			required_data.append(values)

		response['district_list'] = required_data
		response['status'] = True
	except Exception as e:
		response['status'] = False
		logger.critical(f'get_district_list {{ERROR:{e},Response:{response["status"]}}}')
   
	logger.debug(f'get_district_list {{Response:{response["status"]}}}')
	return HttpResponse(json.dumps(response), content_type='application/x-json')

# Police Station
def get_police_station_list(request,state_code,district_code):
    logger.debug(f'get_police_station_list Initial')
    response = {'status':False}
    try:
        required_data = []
        lists = MPoliceStation.objects.using(SOURCE_DATABASE).filter(district_cd=district_code, state_cd=state_code, lang_cd='99', record_status='C').order_by('ps')
        for item in lists:
            values = {'ps_cd':item.ps_cd,'ps':item.ps}
            required_data.append(values)

        response['pstation_list'] = required_data
        response['status'] = True
    except Exception as e:
        response['status'] = False
        logger.critical(f'get_police_station_list {{ERROR:{e},Response:{response["status"]}}}')
    
    logger.debug(f'get_police_station_list {{Response:{response["status"]}}}')
    return HttpResponse(json.dumps(response), content_type='application/x-json')