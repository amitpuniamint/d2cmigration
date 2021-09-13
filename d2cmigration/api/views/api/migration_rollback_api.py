from .database_base import *


class Migration_API():
	# Migration Process
	def migration_process(self,pk,fir_reg_num_list,file_instance,method_of_type):
		if method_of_type == 'T':
			logger.debug(f'Migration_API Migration Initial')
		
		if method_of_type == 'T':
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Process Start.\n')
		
		EXTRACT_DATA_DICT = {}
		person_code_list = []
		accused_srno_list = []
		property_list = []
		FIR_Accused_Srno = []
		arr_surr_srno_list = []
		seizure_num_list = []
		final_rep_srno_list = []
		currency_det_list = []
		Complete_Table = 0
		Count_Record = 0

		
		
		for table in DATABASE_TABLE_FIR_REG_NUM:
			if self.do_abort_by_user(pk) is True:
				break

			logger.debug(f'table ;{table.__name__} Migration START')
			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(SOURCE_DATABASE).filter(fir_reg_num__in = fir_reg_num_list)
			connection.close()
			table.objects.using(DESTINATION_DATABASE).bulk_create(EXTRACT_DATA_DICT[table.__name__])
			connection.close()
			logger.debug(f'table ;{table.__name__} Migration DONE')
			Complete_Table = Complete_Table + 1
			Migrate_Initial_Per = int((Complete_Table/(len(DATABASE_TABLE) - 1))*100)
			if method_of_type == 'T':
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | {Migrate_Initial_Per}% Migration Process Complete. \n')
			
		if self.do_abort_by_user(pk) is True:
			return False

		for table in DATABASE_TABLE_FIR_REGN_NUM:
			if self.do_abort_by_user(pk) is True:
				break

			logger.debug(f'table ;{table.__name__} Migration START')
			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(SOURCE_DATABASE).filter(fir_regn_num__in = fir_reg_num_list)
			table.objects.using(DESTINATION_DATABASE).bulk_create(EXTRACT_DATA_DICT[table.__name__])
			logger.debug(f'table ;{table.__name__} Migration DONE')
			Complete_Table = Complete_Table + 1
			Migrate_Initial_Per = int((Complete_Table/(len(DATABASE_TABLE) - 1))*100)
			if method_of_type == 'T':
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | {Migrate_Initial_Per}% Migration Process Complete. \n')


		if self.do_abort_by_user(pk) is True:
			return False

		#Get FIR Accused From TFirAccusedInfo
		for fir_accused_list in EXTRACT_DATA_DICT[TFirAccusedInfo.__name__]:
			FIR_Accused_Srno.append(fir_accused_list.accused_srno)

		if self.do_abort_by_user(pk) is True:
			return False

		FIR_Accused_Srno = list(set(FIR_Accused_Srno))
		for table in DATABASE_TABLE_FIR_ACCUSED_SR_NO:
			if self.do_abort_by_user(pk) is True:
				break

			logger.debug(f'table ;{table.__name__} Migration start')
			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(SOURCE_DATABASE).filter(accused_srno__in = FIR_Accused_Srno)
			table.objects.using(DESTINATION_DATABASE).bulk_create(EXTRACT_DATA_DICT[table.__name__])
			logger.debug(f'table ;{table.__name__} Migration DONE')
			Complete_Table = Complete_Table + 1
			Migrate_Initial_Per = int((Complete_Table/(len(DATABASE_TABLE) - 1))*100)
			if method_of_type == 'T':
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | {Migrate_Initial_Per}% Migration Process Complete. \n')

		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code From in TFirComplainantInfo
		for complainant_person_item in EXTRACT_DATA_DICT[TFirComplainantInfo.__name__]:
			person_code_list.append(complainant_person_item.person_code)

		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code From in TFirVictimInfo
		for firvictim_person_item in EXTRACT_DATA_DICT[TFirVictimInfo.__name__]:
			person_code_list.append(firvictim_person_item.person_code)

		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code from TCrimeComplainant
		for crimecomplainant_item in EXTRACT_DATA_DICT[TCrimeComplainant.__name__] :
			person_code_list.append(crimecomplainant_item.person_code)
			
		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code from TCrimeComplainant
		for crimecomplainant_item in EXTRACT_DATA_DICT[TCrimeComplainant.__name__] :
			person_code_list.append(crimecomplainant_item.person_code)
		
		if self.do_abort_by_user(pk) is True:
			return False

		# Get prop_reg_num from TCrimeProperty
		for prop_reg_num_item in EXTRACT_DATA_DICT[TCrimeProperty.__name__] :
			property_list.append(prop_reg_num_item.prop_reg_num)			

		if self.do_abort_by_user(pk) is True:
			return False

		#GET Person Code From  TCrimeVictim
		for crimevictim_item in EXTRACT_DATA_DICT[TCrimeVictim.__name__] :
			person_code_list.append(crimevictim_item.person_code)

		if self.do_abort_by_user(pk) is True:
			return False

		#GET Person Code From  TCrimeWitness
		for crimewitness_item in EXTRACT_DATA_DICT[TCrimeWitness.__name__] :
			person_code_list.append(crimewitness_item.person_code)
			
		if self.do_abort_by_user(pk) is True:
			return False

					
		# Arrest_Surr_Srno
		for arr_surr_srno_item in EXTRACT_DATA_DICT[TArrestMemo.__name__]:
			arr_surr_srno_list.append(arr_surr_srno_item.arr_surr_srno)


		if self.do_abort_by_user(pk) is True:
			return False

		arr_surr_srno_list = list(set(arr_surr_srno_list))
		for table in DATABASE_TABLE_ARR_SURR_SRNO:
			if self.do_abort_by_user(pk) is True:
				break

			logger.debug(f'table ;{table.__name__} Migration START')
			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(SOURCE_DATABASE).filter(arr_surr_srno__in = arr_surr_srno_list)
			table.objects.using(DESTINATION_DATABASE).bulk_create(EXTRACT_DATA_DICT[table.__name__])
			logger.debug(f'table ;{table.__name__} Migration DONE')
			Complete_Table = Complete_Table + 1
			Migrate_Initial_Per = int((Complete_Table/(len(DATABASE_TABLE) - 1))*100)
			if method_of_type == 'T':
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | {Migrate_Initial_Per}% Migration Process Complete. \n')

		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code from TArrestWitness
		for person_code_item in EXTRACT_DATA_DICT[TArrestWitness.__name__] :
			person_code_list.append(person_code_item.person_code)

				
		if self.do_abort_by_user(pk) is True:
			return False

		#Get seizure_num from TSeizureMemo
		for seizure_num_item in EXTRACT_DATA_DICT[TSeizureMemo.__name__] :
			seizure_num_list.append(seizure_num_item.seizure_num)


		if self.do_abort_by_user(pk) is True:
			return False


		seizure_num_list = list(set(seizure_num_list))
		for table in DATABASE_TABLE_SEIZURE_NUM:
			if self.do_abort_by_user(pk) is True:
				break

			logger.debug(f'table ;{table.__name__} Migration START')
			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(SOURCE_DATABASE).filter(seizure_num__in = seizure_num_list)
			table.objects.using(DESTINATION_DATABASE).bulk_create(EXTRACT_DATA_DICT[table.__name__])
			logger.debug(f'table ;{table.__name__} Migration DONE')
			Complete_Table = Complete_Table + 1
			Migrate_Initial_Per = int((Complete_Table/(len(DATABASE_TABLE) - 1))*100)
			if method_of_type == 'T':
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | {Migrate_Initial_Per}% Migration Process Complete. \n')


		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code from TPropertySeizeWitness
		for person_code_item in EXTRACT_DATA_DICT[TPropertySeizeWitness.__name__] :
			person_code_list.append(person_code_item.person_code)

		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code from TSeizedFromPerson
		for person_code_item in EXTRACT_DATA_DICT[TSeizedFromPerson.__name__] :
			person_code_list.append(person_code_item.person_code)
		

		if self.do_abort_by_user(pk) is True:
			return False

		# Get prop_reg_num from TSeizedProperty
		for prop_reg_num_item in EXTRACT_DATA_DICT[TSeizedProperty.__name__] :				
			property_list.append(prop_reg_num_item.prop_reg_num)
			
		if self.do_abort_by_user(pk) is True:
			return False

		# Get final_rep_srno list from TFinalReport
		for final_rep_srno_item in EXTRACT_DATA_DICT[TFinalReport.__name__] :
			final_rep_srno_list.append(final_rep_srno_item.final_rep_srno)
			
		if self.do_abort_by_user(pk) is True:
			return False

		final_rep_srno_list = list(set(final_rep_srno_list))
		for table in DATABASE_TABLE_FINAL_REP_SRNO:
			if self.do_abort_by_user(pk) is True:
				break

			logger.debug(f'table ;{table.__name__} Migration START')
			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(SOURCE_DATABASE).filter(final_rep_srno__in = final_rep_srno_list)
			logger.debug(f'table ;{table.__name__} Migration DONE')
			table.objects.using(DESTINATION_DATABASE).bulk_create(EXTRACT_DATA_DICT[table.__name__])
			Complete_Table = Complete_Table + 1
			Migrate_Initial_Per = int((Complete_Table/(len(DATABASE_TABLE) - 1))*100)
			if method_of_type == 'T':
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | {Migrate_Initial_Per}% Migration Process Complete. \n')


		if self.do_abort_by_user(pk) is True:
			return False

		# Get accused_srno from TAccusedInfo
		for accused_srno_item in EXTRACT_DATA_DICT[TAccusedInfo.__name__] :
			accused_srno_list.append(accused_srno_item.accused_srno)
			

		if self.do_abort_by_user(pk) is True:
			return False

		accused_srno_list = list(set(accused_srno_list))
		for table in DATABASE_TABLE_ACCUSED_SR_NO:
			if self.do_abort_by_user(pk) is True:
				break

			logger.debug(f'table ;{table.__name__} Migration start')
			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(SOURCE_DATABASE).filter(accused_srno__in = accused_srno_list)	
			table.objects.using(DESTINATION_DATABASE).bulk_create(EXTRACT_DATA_DICT[table.__name__])
			logger.debug(f'table ;{table.__name__} Migration stop')
			Complete_Table = Complete_Table + 1
			Migrate_Initial_Per = int((Complete_Table/(len(DATABASE_TABLE) - 1))*100)
			if method_of_type == 'T':
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | {Migrate_Initial_Per}% Migration Process Complete. \n')


		if self.do_abort_by_user(pk) is True:
			return False

		# Get Person Code form TFinalReportWitness
		for person_code_item in EXTRACT_DATA_DICT[TFinalReportWitness.__name__] :
			person_code_list.append(person_code_item.person_code)		

		person_code_list = list(set(person_code_list))
		for table in DATABASE_TABLE_PERSON_CODE:
			if self.do_abort_by_user(pk) is True:
				break

			logger.debug(f'table ;{table.__name__} Migration start')
			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(SOURCE_DATABASE).filter(person_code__in = person_code_list)
			table.objects.using(DESTINATION_DATABASE).bulk_create(EXTRACT_DATA_DICT[table.__name__])
			logger.debug(f'table ;{table.__name__} Migration END')
			Complete_Table = Complete_Table + 1
			Migrate_Initial_Per = int((Complete_Table/(len(DATABASE_TABLE) - 1))*100)
			if method_of_type == 'T':
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | {Migrate_Initial_Per}% Migration Process Complete. \n')

		if self.do_abort_by_user(pk) is True:
			return False

		# Get prop_reg_num from TAccusedProperty
		for prop_reg_num_item in EXTRACT_DATA_DICT[TAccusedProperty.__name__] :
			property_list.append(prop_reg_num_item.prop_reg_num)
			
		if self.do_abort_by_user(pk) is True:
			return False

		property_list = list(set(property_list))
		for table in DATABASE_TABLE_PROP_REG_NUM:
			if self.do_abort_by_user(pk) is True:
				break

			logger.debug(f'table ;{table.__name__} Migration start')
			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(SOURCE_DATABASE).filter(prop_reg_num__in = property_list)
			table.objects.using(DESTINATION_DATABASE).bulk_create(EXTRACT_DATA_DICT[table.__name__])
			logger.debug(f'table ;{table.__name__} Migration END')
			Complete_Table = Complete_Table + 1
			Migrate_Initial_Per = int((Complete_Table/(len(DATABASE_TABLE) - 1))*100)
			if method_of_type == 'T':
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | {Migrate_Initial_Per}% Migration Process Complete. \n')


		if self.do_abort_by_user(pk) is True:
			return False

		# get CurrencyProperty Pk
		for currency_item in EXTRACT_DATA_DICT[TPropertyCurrency.__name__] :
			currency_det_list.append(currency_item.prop_curr_srno)
					

		if self.do_abort_by_user(pk) is True:
			return False

		currency_det_list = list(set(currency_det_list))
		for table in DATABASE_TABLE_PROP_CURR_SRNO:
			if self.do_abort_by_user(pk) is True:
				break

			logger.debug(f'table ;{table.__name__} Migration start')
			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(SOURCE_DATABASE).filter(prop_curr_srno__in = currency_det_list)
			table.objects.using(DESTINATION_DATABASE).bulk_create(EXTRACT_DATA_DICT[table.__name__])
			logger.debug(f'table ;{table.__name__} Migration END')
			Complete_Table = Complete_Table + 1
			Migrate_Initial_Per = int((Complete_Table/(len(DATABASE_TABLE) - 1))*100)
			if method_of_type == 'T':
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | {Migrate_Initial_Per}% Migration Process Complete. \n')

		if self.do_abort_by_user(pk) is True:
			return False

		if method_of_type == 'T':
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Process END.\n')

		if method_of_type == 'T':
			logger.debug(f'Migration_API Migration END')

		return True
	
	def do_abort_by_user(self,pk):
		if Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).get(history_pk=pk).status == 2 :
			logger.info('Migration Abort By User')
			return True
		else:
			return False

	def check_permission(self,pk):
		logger.debug(f'Migration_API check_permission initial ')
		result = {'error':'','status':False,'message':''}
		try:
			History_Instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
			if History_Instance.status == 0:
				result['status'] = True
			else:
				current_status = ''
				if History_Instance.status == 1:
					current_status = 'Running'
				if History_Instance.status == 2:
					current_status = 'Success'
				if History_Instance.status == 3:
					current_status = 'Failed'
				if History_Instance.status == 4:
					current_status = 'Cancle'
				if History_Instance.status == 5:
					current_status = 'Abort'
				result['error'] = f'Already Process Has been done for Batch:{History_Instance.batch_sr_num},Current_Status:{current_status}'
		except Exception as e:
			logger.critical(f'Migration_API check_permission Error:{e}')
			result['error'] = 'System Error'

		logger.debug(f'Migration_API check_permission {{response:{result}}}')
		return result
	
	def check_migration_fir_status(self,pk,batch_sr_num,file_instance):
		file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR List Check Work Start.\n')
		logger.debug(f'Migration_API check_permission initial ')
		result = {'error':'','status':False,}
		try:
			if self.do_abort_by_user(pk) is True:
				result['error'] = 'Migration Abort By User'
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Process has Abort By User..\n')
				logger.debug(f'Migration_API migration_fir_wise_api {{response:{result}}}')
				return result
		
			start_time = datetime.datetime.now(India_current_time)
			batch_fir_reg_num_list = TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=batch_sr_num)
			valid_fir_reg_num_list = []
			for fir_reg_num_instance in batch_fir_reg_num_list:
				if self.do_abort_by_user(pk) is True:
					break 
				all_migrate_fir_instance = TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(fir_reg_num = fir_reg_num_instance.fir_reg_num,current_status='S')
				if all_migrate_fir_instance.count() > 0:
					file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | FIR Nummber:{fir_reg_num_instance.fir_reg_num} Already Migration Batch Number:{all_migrate_fir_instance.first().batch_sr_num}.\n')
					fir_reg_num_instance.current_status = 'F'
					fir_reg_num_instance.failed_reason = f'Already Migration With Batch Number :{all_migrate_fir_instance.first().batch_sr_num}'
					fir_reg_num_instance.start_time  = start_time
					fir_reg_num_instance.complete_time  = start_time
					fir_reg_num_instance.save(using=MIGRATION_DATABASE)
				
			valid_fir_reg_num_list =  TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=batch_sr_num,current_status="N")
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Total FIR FOR Migrations:{valid_fir_reg_num_list.count()}, Failed FIR :{batch_fir_reg_num_list.count()-valid_fir_reg_num_list.count()}.\n')
			
			if valid_fir_reg_num_list.count() > 0:
				result['status'] = True
				result['pending_fir_instance'] = valid_fir_reg_num_list
			else:
				result['error'] = 'No Valid FIR for Migration.All FIR is already Migrate with Other Batch.'
		except Exception as e:
			result['error'] = 'Unable to Check FIR Status.'
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR List Check Is Faild.Due to System Error.\n')
			
		
		file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR List Check Work END.\n')
		if self.do_abort_by_user(pk) is True:
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Migration Process has Abort By User..\n')
			result['status'] = False
			result['error'] = 'Migration Abort By User'
			
		logger.debug(f'Migration_API migration_fir_wise_api {{response:{result}}}')
		return result

	def migration_fir_wise_api(self,pk,file_instance):
		logger.debug(f'Migration_API migration_fir_wise_api initial ')
		result = {'error':'','status':False,}
		try:
			if self.do_abort_by_user(pk) is True:
				result['error'] = 'Migration Abort By User'
				logger.debug(f'Migration_API migration_fir_wise_api {{response:{result}}}')
				return result

			start_time = datetime.datetime.now(India_current_time)
			Migration_Rollback_Process_Instance = Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).get(history_pk=pk)
			Migration_Rollback_Process_Instance.start_time = start_time
			Migration_Rollback_Process_Instance.save(using=MIGRATION_DATABASE)
			TMigration_Batch_History_Instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
			TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=TMigration_Batch_History_Instance.batch_sr_num).update(is_running=1,start_time=start_time)
			TMigration_Batch_History_Instance.status = 1
			TMigration_Batch_History_Instance.start_time = start_time
			TMigration_Batch_History_Instance.save(using=MIGRATION_DATABASE)

			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR List Check Work Start.\n')
			check_fir_currnt_status = self.check_migration_fir_status(pk,TMigration_Batch_History_Instance.batch_sr_num,file_instance)
			if check_fir_currnt_status['status'] is False:
				result['error'] = check_fir_currnt_status['error']
				logger.debug(f'Migration_API migration_fir_wise_api {{response:{result}}}')
				return result
			
			if self.do_abort_by_user(pk) is True:
				result['error'] = 'Migration Abort By User'
				logger.debug(f'Migration_API migration_fir_wise_api {{response:{result}}}')
				return result

			FIR_REG_INSTANCE = check_fir_currnt_status['pending_fir_instance']
			
			Total_FIR = len(FIR_REG_INSTANCE)
			count = 1
			# Start Migration API
			for Single_FIR_REG_Instance in FIR_REG_INSTANCE:
				if self.do_abort_by_user(pk) is True:
					logger.debug('Migration Process Abort By User.')
					break 
				fir_reg_num_list = [Single_FIR_REG_Instance.fir_reg_num]
				print('Single_FIR_REG_Instance: ', Single_FIR_REG_Instance)
				Single_FIR_REG_Instance.start_time = datetime.datetime.now(India_current_time)
				try:
					with transaction.atomic(using=MIGRATION_DATABASE):
						with transaction.atomic(using=SOURCE_DATABASE):
							with transaction.atomic(using=DESTINATION_DATABASE):
								self.migration_process(pk,fir_reg_num_list,file_instance,'F')
								Single_FIR_REG_Instance.current_status='S'
								Single_FIR_REG_Instance.complete_time=datetime.datetime.now(India_current_time)
								Single_FIR_REG_Instance.save(using=MIGRATION_DATABASE)
								file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} |{int((count/Total_FIR)*100)}% Migration Complete .FIR {Single_FIR_REG_Instance.fir_reg_num} is Successfully Migrate.  \n')
				except Exception as e:
					Single_FIR_REG_Instance.failed_reason=str(e)
					Single_FIR_REG_Instance.current_status = 'F'
					file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | {int((count/Total_FIR)*100)}% Migration Complete. FIR {Single_FIR_REG_Instance.fir_reg_num}  is Failed, Error:{e}. \n')
					Single_FIR_REG_Instance.complete_time =datetime.datetime.now(India_current_time)
					Single_FIR_REG_Instance.save(using=MIGRATION_DATABASE)

				count = count + 1
			
			result['status'] = True
			result['messages'] = 'Migration SuccessFull Complete'
		except Exception as e:
			result['status'] = False
			result['error'] = 'System Error'
			logger.critical(f'Migration_API migration_fir_wise_api Error:{e}')
			

		if self.do_abort_by_user(pk) is True:
			result['status'] = False
			result['error'] = 'Migration Abort By User'
			
		logger.debug(f'Migration_API migration_fir_wise_api {{response:{result}}}')
		return result

	def migration_table_wise_api(self,pk,file_instance):
		logger.debug(f'Migration_API migration_table_wise_api initial ')
		result = {'error':'','status':False,}
		try:
			if self.do_abort_by_user(pk) is True:
				result['error'] = 'Migration Abort By User'
				logger.debug(f'Migration_API migration_fir_wise_api {{response:{result}}}')
				return result

			start_time = datetime.datetime.now(India_current_time)
			Migration_Rollback_Process_Instance = Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).get(history_pk=pk)
			Migration_Rollback_Process_Instance.start_time = start_time
			Migration_Rollback_Process_Instance.save(using=MIGRATION_DATABASE)
			TMigration_Batch_History_Instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
			TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=TMigration_Batch_History_Instance.batch_sr_num).update(is_running=1,start_time=start_time)
			TMigration_Batch_History_Instance.status = 1
			TMigration_Batch_History_Instance.start_time = start_time
			TMigration_Batch_History_Instance.save(using=MIGRATION_DATABASE)

			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR List Check Work Start.\n')
			check_fir_currnt_status = self.check_migration_fir_status(pk,TMigration_Batch_History_Instance.batch_sr_num,file_instance)
			if check_fir_currnt_status['status'] is False:
				result['error'] = check_fir_currnt_status['error']
				logger.debug(f'Migration_API migration_fir_wise_api {{response:{result}}}')
				return result
			
			Pending_FIR_REG_LIST = list(check_fir_currnt_status['pending_fir_instance'].values_list('fir_reg_num',flat=True))
			start_time = datetime.datetime.now(India_current_time)
			TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num = TMigration_Batch_History_Instance.batch_sr_num,fir_reg_num__in=Pending_FIR_REG_LIST).update(start_time=start_time)
			if self.do_abort_by_user(pk) is True:
				result['status'] = False
				result['error'] = 'Migration Abort By User'
				logger.debug(f'Migration_API migration_fir_wise_api {{response:{result}}}')
				return result
			try:
				with transaction.atomic(using=MIGRATION_DATABASE):
					with transaction.atomic(using=SOURCE_DATABASE):
						with transaction.atomic(using=DESTINATION_DATABASE):
							check_status = self.migration_process(pk,Pending_FIR_REG_LIST,file_instance,'T')
							if check_status is True:
								result['status'] = True
								result['messages'] = 'Migration SuccessFull Done.'
								logger.debug(f'Migration_API migration_fir_wise_api {{response:{result}}}')
								return result
							else:
								transaction.rollback(using=MIGRATION_DATABASE)
								transaction.rollback(using=SOURCE_DATABASE)
								transaction.rollback(using=DESTINATION_DATABASE)
			except Exception as e:
				transaction.rollback(using=MIGRATION_DATABASE)
				transaction.rollback(using=SOURCE_DATABASE)
				transaction.rollback(using=DESTINATION_DATABASE)
				print(e)
				
			result['status'] = True
			result['messages'] = 'Migration SuccessFull Complete'
		except Exception as e:
			result['status'] = False
			result['error'] = 'System Error'
			logger.critical(f'Migration_API migration_fir_wise_api Error:{e}')
			

		if self.do_abort_by_user(pk) is True:
			result['status'] = False
			result['error'] = 'Migration Abort By User'
		logger.debug(f'Migration_API migration_fir_wise_api {{response:{result}}}')
		return result

	def update_final_fir_type_migration_process(self,pk,current_status,file_instance,failed_reason=''):
		TMigration_Batch_History_Instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
		TMigration_Batch_Details_Instance = TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).get(batch_sr_num = TMigration_Batch_History_Instance.batch_sr_num)
		TMigration_Batch_FIR_Details_Instance =TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=TMigration_Batch_History_Instance.batch_sr_num)
		Success_TMigration_Batch_FIR_Details_Instance = TMigration_Batch_FIR_Details_Instance.filter(current_status='S')
		current_time = datetime.datetime.now(India_current_time)
		if current_status != 'A':
			if current_status == 'S':
				if Success_TMigration_Batch_FIR_Details_Instance.count() > 0:
					TMigration_Batch_Details_Instance.current_status = 'S'
					TMigration_Batch_Details_Instance.is_running = 2
					TMigration_Batch_History_Instance.status = 2
					file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Total :{TMigration_Batch_FIR_Details_Instance.count()}.\n')
					file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Success Migration :{Success_TMigration_Batch_FIR_Details_Instance.count()}.\n')
					file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Failed Migration :{TMigration_Batch_FIR_Details_Instance.count()-Success_TMigration_Batch_FIR_Details_Instance.count()}.\n')
					file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  Process Status:Success.\n')
				else:
					TMigration_Batch_Details_Instance.current_status = 'F'
					TMigration_Batch_Details_Instance.failed_reason = 'No FIR Is Success in This FIR.'
					TMigration_Batch_Details_Instance.is_running = 3
					TMigration_Batch_History_Instance.status = 3
					TMigration_Batch_History_Instance.failed_reason = 'No FIR Is Success in This FIR.'
					file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Total :{TMigration_Batch_FIR_Details_Instance.count()}.\n')
					file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Success Migration :{Success_TMigration_Batch_FIR_Details_Instance.count()}.\n')
					file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Failed Migration :{TMigration_Batch_FIR_Details_Instance.count()-Success_TMigration_Batch_FIR_Details_Instance.count()}.\n')
					file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  Process Status:Failed : Failed_Reason:No FIR Is Success in This FIR.\n')
					
			else:
				TMigration_Batch_FIR_Details_Instance.filter(current_status='N').update(current_status='F',failed_reason='failed_reason',complete_time=current_time)
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Total :{TMigration_Batch_FIR_Details_Instance.count()}.\n')
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Success Migration :{Success_TMigration_Batch_FIR_Details_Instance.count()}.\n')
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Failed Migration :{TMigration_Batch_FIR_Details_Instance.count()-Success_TMigration_Batch_FIR_Details_Instance.count()}.\n')
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  Process Status:Partial Failed:Failed_Reason:{failed_reason}.\n')

				TMigration_Batch_Details_Instance.current_status = 'F'
				TMigration_Batch_Details_Instance.failed_reason = failed_reason
				TMigration_Batch_Details_Instance.is_running = 3
				TMigration_Batch_History_Instance.status = 3
				TMigration_Batch_History_Instance.failed_reason = failed_reason

		else:
			logger.info('Abort update_final_fir_type_migration_process')
			TMigration_Batch_FIR_Details_Instance.filter(current_status='N').update(current_status='A',complete_time=current_time)
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Total :{TMigration_Batch_FIR_Details_Instance.count()}.\n')
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Success Migration :{Success_TMigration_Batch_FIR_Details_Instance.count()}.\n')
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Failed Migration :{TMigration_Batch_FIR_Details_Instance.count() - Success_TMigration_Batch_FIR_Details_Instance.count()} .\n')
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  Process Status:Abort By User.\n')

			TMigration_Batch_Details_Instance.current_status = 'A'
			TMigration_Batch_Details_Instance.is_running = 5
			TMigration_Batch_History_Instance.status = 5
			logger.info('Abort update_final_fir_type_migration_process END')

		TMigration_Batch_Details_Instance.complete_time = current_time
		TMigration_Batch_Details_Instance.save(using=MIGRATION_DATABASE)
		TMigration_Batch_History_Instance.complete_time = current_time
		TMigration_Batch_History_Instance.save(using=MIGRATION_DATABASE)
		file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  Start Time :{TMigration_Batch_Details_Instance.start_time}.\n')
		file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  END Time :{current_time}.\n')
		file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  Process Duration :{current_time - TMigration_Batch_Details_Instance.start_time}.\n')
		file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  Process Complete.\n')			
		
	def update_final_table_type_migration_process(self,pk,current_status,file_instance,failed_reason=''):
		TMigration_Batch_History_Instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
		TMigration_Batch_Details_Instance = TMigration_Batch_Details.objects.using(MIGRATION_DATABASE).get(batch_sr_num = TMigration_Batch_History_Instance.batch_sr_num)
		TMigration_Batch_FIR_Details_Instance =TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=TMigration_Batch_History_Instance.batch_sr_num)
		current_time = datetime.datetime.now(India_current_time)
		if current_status != 'A':
			if current_status == 'S':
				TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=TMigration_Batch_History_Instance.batch_sr_num).update(complete_time=current_time,current_status='S')
				TMigration_Batch_Details_Instance.current_status = 'S'
				TMigration_Batch_Details_Instance.is_running = 2
				TMigration_Batch_History_Instance.status = 2
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Total :{TMigration_Batch_FIR_Details_Instance.count()}.\n')
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Success Migration :{TMigration_Batch_FIR_Details_Instance.count()}.\n')
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Failed Migration :0.\n')
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  Process Status:Success.\n')
			else:
				TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=TMigration_Batch_History_Instance.batch_sr_num).update(complete_time=current_time,current_status='F',failed_reason=failed_reason)
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Total :{TMigration_Batch_FIR_Details_Instance.count()}.\n')
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Success Migration :0\n')
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Failed Migration :{TMigration_Batch_FIR_Details_Instance.count()} .\n')
				file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  Process Status:Faild:Failed_Reason:{failed_reason}.\n')
				TMigration_Batch_Details_Instance.current_status = 'F'
				TMigration_Batch_Details_Instance.failed_reason = failed_reason
				TMigration_Batch_Details_Instance.is_running = 3
				TMigration_Batch_History_Instance.status = 3
				TMigration_Batch_History_Instance.failed_reason = failed_reason
		else:
			TMigration_Batch_FIR_Details.objects.using(MIGRATION_DATABASE).filter(batch_sr_num=TMigration_Batch_History_Instance.batch_sr_num).update(complete_time=current_time,current_status='A')
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Total :{TMigration_Batch_FIR_Details_Instance.count()}.\n')
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Success Migration :0.\n')
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch FIR Failed Migration :{TMigration_Batch_FIR_Details_Instance.count()} .\n')
			file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  Process Status:Abort By User.\n')
			TMigration_Batch_Details_Instance.current_status = 'A'
			TMigration_Batch_Details_Instance.is_running = 5
			TMigration_Batch_History_Instance.status = 5

		TMigration_Batch_Details_Instance.complete_time = current_time
		TMigration_Batch_Details_Instance.save(using=MIGRATION_DATABASE)
		TMigration_Batch_History_Instance.complete_time = current_time
		TMigration_Batch_History_Instance.save(using=MIGRATION_DATABASE)
		file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  Start Time :{TMigration_Batch_Details_Instance.start_time}.\n')
		file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  END Time :{current_time}.\n')
		file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  Process Duration :{current_time - TMigration_Batch_Details_Instance.start_time}.\n')
		file_instance.write(f'{datetime.datetime.now(India_current_time).strftime("%d-%b-%Y %H:%M:%S")} | Batch Migration  Process Complete.\n')			

	def migration_initial(self,pk):
		logger.debug(f'Migration_API migration_initial initial ')
		result = {'error':'','status':False,}
		try:
			check_permission_status = self.check_permission(pk)
			if check_permission_status['status'] is False:
				result['error'] = check_permission_status['error']
				logger.debug(f'Migration_API check_permission {{response:{result}}}')
				return result

			TMigration_Batch_History_Instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
			
			file_path = os.path.join(MIGRATE_LOG_PATH,f'{TMigration_Batch_History_Instance.batch_sr_num}.log')
			file_instance = open(file_path,'a+')
			
			if TMigration_Batch_History_Instance.program_of_type == 'M' and TMigration_Batch_History_Instance.method_of_type == 'F':
				migration_fir_wise_api_status = self.migration_fir_wise_api(pk,file_instance)
				if migration_fir_wise_api_status['status'] is True:
					self.update_final_fir_type_migration_process(pk,'S',file_instance)
					result['status'] = True
					result['messages'] = 'SuccessFully Migration'
				else:
					result['error'] = migration_fir_wise_api_status['error']
					if self.do_abort_by_user(pk) is True:
						result['error'] = 'Migration Abort By User.'
						self.update_final_fir_type_migration_process(pk,'A',file_instance)
					else:
						failed_reason = migration_fir_wise_api_status['error']
						self.update_final_fir_type_migration_process(pk,'F',file_instance,failed_reason)
					 	
			else:
				migration_table_wise_api_status = self.migration_table_wise_api(pk,file_instance)
				if migration_table_wise_api_status['status'] is True:
					self.update_final_table_type_migration_process(pk,'S',file_instance)
					result['status'] = True
					result['messages'] = 'SuccessFully Migration'
				else:
					result['error'] = migration_table_wise_api_status['error']
					if self.do_abort_by_user(pk) is True:
						result['error'] = 'Migration Abort By User.'
						self.update_final_table_type_migration_process(pk,'A',file_instance)
					else:
						failed_reason = migration_table_wise_api_status['error']
						self.update_final_table_type_migration_process(pk,'F',file_instance,failed_reason)

		except Exception as e:
			result['error'] = 'System Error'
			result['status'] = False
			logger.critical(f'initial_api Error:{e}')
			
		logger.debug(f'Migration_API migration_initial {{response:{result}}}')
		return result

class RollBack_API():
	def rollback_process(self,pk,fir_reg_num_list,file_instance,method_of_type):
		
		EXTRACT_DATA_DICT = {}
		person_code_list = []
		accused_srno_list = []
		property_list = []
		FIR_Accused_Srno = []
		arr_surr_srno_list = []
		seizure_num_list = []
		final_rep_srno_list = []
		currency_det_list = []
		Complete_Table = 0
		Count_Record = 0

		
		
		for table in DATABASE_TABLE_FIR_REG_NUM:
			if self.do_abort_by_user(pk) is True:
				break
			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(DESTINATION_DATABASE).filter(fir_reg_num__in = fir_reg_num_list)
			
		if self.do_abort_by_user(pk) is True:
			return False

		for table in DATABASE_TABLE_FIR_REGN_NUM:
			if self.do_abort_by_user(pk) is True:
				break
			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(DESTINATION_DATABASE).filter(fir_regn_num__in = fir_reg_num_list)
			

		if self.do_abort_by_user(pk) is True:
			return False

		#Get FIR Accused From TFirAccusedInfo
		for fir_accused_list in EXTRACT_DATA_DICT[TFirAccusedInfo.__name__]:
			FIR_Accused_Srno.append(fir_accused_list.accused_srno)

		if self.do_abort_by_user(pk) is True:
			return False

		FIR_Accused_Srno = list(set(FIR_Accused_Srno))
		for table in DATABASE_TABLE_FIR_ACCUSED_SR_NO:
			if self.do_abort_by_user(pk) is True:
				break

			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(DESTINATION_DATABASE).filter(accused_srno__in = FIR_Accused_Srno)
			
		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code From in TFirComplainantInfo
		for complainant_person_item in EXTRACT_DATA_DICT[TFirComplainantInfo.__name__]:
			person_code_list.append(complainant_person_item.person_code)

		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code From in TFirVictimInfo
		for firvictim_person_item in EXTRACT_DATA_DICT[TFirVictimInfo.__name__]:
			person_code_list.append(firvictim_person_item.person_code)

		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code from TCrimeComplainant
		for crimecomplainant_item in EXTRACT_DATA_DICT[TCrimeComplainant.__name__] :
			person_code_list.append(crimecomplainant_item.person_code)
			
		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code from TCrimeComplainant
		for crimecomplainant_item in EXTRACT_DATA_DICT[TCrimeComplainant.__name__] :
			person_code_list.append(crimecomplainant_item.person_code)
		
		if self.do_abort_by_user(pk) is True:
			return False

		# Get prop_reg_num from TCrimeProperty
		for prop_reg_num_item in EXTRACT_DATA_DICT[TCrimeProperty.__name__] :
			property_list.append(prop_reg_num_item.prop_reg_num)			

		if self.do_abort_by_user(pk) is True:
			return False

		#GET Person Code From  TCrimeVictim
		for crimevictim_item in EXTRACT_DATA_DICT[TCrimeVictim.__name__] :
			person_code_list.append(crimevictim_item.person_code)

		if self.do_abort_by_user(pk) is True:
			return False

		#GET Person Code From  TCrimeWitness
		for crimewitness_item in EXTRACT_DATA_DICT[TCrimeWitness.__name__] :
			person_code_list.append(crimewitness_item.person_code)
			
		if self.do_abort_by_user(pk) is True:
			return False

					
		# Arrest_Surr_Srno
		for arr_surr_srno_item in EXTRACT_DATA_DICT[TArrestMemo.__name__]:
			arr_surr_srno_list.append(arr_surr_srno_item.arr_surr_srno)


		if self.do_abort_by_user(pk) is True:
			return False

		arr_surr_srno_list = list(set(arr_surr_srno_list))
		for table in DATABASE_TABLE_ARR_SURR_SRNO:
			if self.do_abort_by_user(pk) is True:
				break

			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(DESTINATION_DATABASE).filter(arr_surr_srno__in = arr_surr_srno_list)
			
		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code from TArrestWitness
		for person_code_item in EXTRACT_DATA_DICT[TArrestWitness.__name__] :
			person_code_list.append(person_code_item.person_code)

				
		if self.do_abort_by_user(pk) is True:
			return False

		#Get seizure_num from TSeizureMemo
		for seizure_num_item in EXTRACT_DATA_DICT[TSeizureMemo.__name__] :
			seizure_num_list.append(seizure_num_item.seizure_num)


		if self.do_abort_by_user(pk) is True:
			return False


		seizure_num_list = list(set(seizure_num_list))
		for table in DATABASE_TABLE_SEIZURE_NUM:
			if self.do_abort_by_user(pk) is True:
				break

			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(DESTINATION_DATABASE).filter(seizure_num__in = seizure_num_list)
			

		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code from TPropertySeizeWitness
		for person_code_item in EXTRACT_DATA_DICT[TPropertySeizeWitness.__name__] :
			person_code_list.append(person_code_item.person_code)

		if self.do_abort_by_user(pk) is True:
			return False

		#Get Person Code from TSeizedFromPerson
		for person_code_item in EXTRACT_DATA_DICT[TSeizedFromPerson.__name__] :
			person_code_list.append(person_code_item.person_code)
		

		if self.do_abort_by_user(pk) is True:
			return False

		# Get prop_reg_num from TSeizedProperty
		for prop_reg_num_item in EXTRACT_DATA_DICT[TSeizedProperty.__name__] :				
			property_list.append(prop_reg_num_item.prop_reg_num)
			
		if self.do_abort_by_user(pk) is True:
			return False

		# Get final_rep_srno list from TFinalReport
		for final_rep_srno_item in EXTRACT_DATA_DICT[TFinalReport.__name__] :
			final_rep_srno_list.append(final_rep_srno_item.final_rep_srno)
			
		if self.do_abort_by_user(pk) is True:
			return False

		final_rep_srno_list = list(set(final_rep_srno_list))
		for table in DATABASE_TABLE_FINAL_REP_SRNO:
			if self.do_abort_by_user(pk) is True:
				break

			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(DESTINATION_DATABASE).filter(final_rep_srno__in = final_rep_srno_list)
			

		if self.do_abort_by_user(pk) is True:
			return False

		# Get accused_srno from TAccusedInfo
		for accused_srno_item in EXTRACT_DATA_DICT[TAccusedInfo.__name__] :
			accused_srno_list.append(accused_srno_item.accused_srno)
			

		if self.do_abort_by_user(pk) is True:
			return False

		accused_srno_list = list(set(accused_srno_list))
		for table in DATABASE_TABLE_ACCUSED_SR_NO:
			if self.do_abort_by_user(pk) is True:
				break

			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(DESTINATION_DATABASE).filter(accused_srno__in = accused_srno_list)	
			
		if self.do_abort_by_user(pk) is True:
			return False

		# Get Person Code form TFinalReportWitness
		for person_code_item in EXTRACT_DATA_DICT[TFinalReportWitness.__name__] :
			person_code_list.append(person_code_item.person_code)		

		person_code_list = list(set(person_code_list))
		for table in DATABASE_TABLE_PERSON_CODE:
			if self.do_abort_by_user(pk) is True:
				break

			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(DESTINATION_DATABASE).filter(person_code__in = person_code_list)
			
		if self.do_abort_by_user(pk) is True:
			return False

		# Get prop_reg_num from TAccusedProperty
		for prop_reg_num_item in EXTRACT_DATA_DICT[TAccusedProperty.__name__] :
			property_list.append(prop_reg_num_item.prop_reg_num)
			
		if self.do_abort_by_user(pk) is True:
			return False

		property_list = list(set(property_list))
		for table in DATABASE_TABLE_PROP_REG_NUM:
			if self.do_abort_by_user(pk) is True:
				break

			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(DESTINATION_DATABASE).filter(prop_reg_num__in = property_list)
			

		if self.do_abort_by_user(pk) is True:
			return False

		# get CurrencyProperty Pk
		for currency_item in EXTRACT_DATA_DICT[TPropertyCurrency.__name__] :
			currency_det_list.append(currency_item.prop_curr_srno)
					

		if self.do_abort_by_user(pk) is True:
			return False

		currency_det_list = list(set(currency_det_list))
		for table in DATABASE_TABLE_PROP_CURR_SRNO:
			if self.do_abort_by_user(pk) is True:
				break

			EXTRACT_DATA_DICT[table.__name__] = table.objects.using(DESTINATION_DATABASE).filter(prop_curr_srno__in = currency_det_list)
			
		if self.do_abort_by_user(pk) is True:
			return False

		for table_instance in EXTRACT_DATA_DICT:
			table_instance.delete()

		return True
	
	def do_abort_by_user(self,pk):
		if Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).get(history_pk=pk).status == 2 :
			logger.info('RollBack Abort By User')
			return True
		else:
			return False

	def check_permission(self,pk):
		logger.debug(f'Migration_API check_permission initial ')
		result = {'error':'','status':False,'message':''}
		try:
			History_Instance = TMigration_Batch_History.objects.using(MIGRATION_DATABASE).get(pk=pk)
			if History_Instance.status == 0:
				result['status'] = True
			else:
				current_status = ''
				if History_Instance.status == 1:
					current_status = 'Running'
				if History_Instance.status == 2:
					current_status = 'Success'
				if History_Instance.status == 3:
					current_status = 'Failed'
				if History_Instance.status == 4:
					current_status = 'Cancle'
				if History_Instance.status == 5:
					current_status = 'Abort'
				result['error'] = f'Already Process Has been done for Batch:{History_Instance.batch_sr_num},Current_Status:{current_status}'
		except Exception as e:
			logger.critical(f'Migration_API check_permission Error:{e}')
			result['error'] = 'System Error'

		logger.debug(f'Migration_API check_permission {{response:{result}}}')
		return result

	
	
	def rollback_initial(self,pk):
		result = {'error':'','status':False,'message':''}
		if self.do_abort_by_user(pk) is True:
			return result
		try:
			check_permission_status = self.check_permission(pk)
			if check_permission_status['status'] is False:
				result['error'] = check_permission_status['error']
				logger.debug(f'RollBack check_permission {{response:{result}}}')
				return result

			History_Instance = TMigration_Batch_History.objects.using(SOURCE_DATABASE).get(pk=pk)
			Rollback_Instance = TRollBack_Batch_Details.objects.using(SOURCE_DATABASE).get(rollback_id=pk)
			for fir_reg_num_list in Rollback_Instance:
				fir_reg_num = fir_reg_num_list.fir_reg_num
				try:
					with transaction.atomic(using=MIGRATION_DATABASE):
						with transaction.atomic(using=SOURCE_DATABASE):
							with transaction.atomic(using=DESTINATION_DATABASE):
								fir_reg_num_list =[fir_reg_num]
								self.rollback_process(pk,fir_reg_num_list)
								if self.do_abort_by_user(pk) is True:
									transaction.rollback(using=MIGRATION_DATABASE)
									transaction.rollback(using=SOURCE_DATABASE)
									transaction.rollback(using=DESTINATION_DATABASE)
								else:
									response = True
				except Exception as e:
					response = False
					
				if response is True:
					TMigration_Batch_FIR_Details.objects.using(SOURCE_DATABASE).filter(fir_reg_num=fir_reg_num_list.fir_reg_num,batch_sr_num=fir_reg_num_list.batch_sr_num).update(current_status='R',)

			result = {'error':'','status':True,'message':'Rollback Done'}
		except Exception as e:
			result['error'] = 'System Error'
			result['status'] = False
			logger.critical(f'initial_api Error:{e}')
			
		logger.debug(f'Migration_API migration_initial {{response:{result}}}')
		return result


class RollBack_Migrate_Process(Migration_API,RollBack_API):
	def initial_process(self):
		logger.debug(f'Migration_API initial  Initial')
		result = {'error':'','status':False,'message':''}
		is_done = False
		try:
			
			Y = Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).all().count()
			while Y != 0:
				Process_list = Migration_Rollback_Process.objects.all().order_by('add_time').first()
				if Process_list.program_of_type == 'M':
					initial_status = self.migration_initial(Process_list.history_pk)
				elif Process_list.program_of_type == 'R':
					initial_status = self.rollback_initial(Process_list.history_pk)
				
				Process_list.delete()
				Y = Migration_Rollback_Process.objects.using(MIGRATION_DATABASE).all().count()

		except Exception as e:
			raise e

class Migation_Rollback_Thread(threading.Thread):
	def __init__(self):
		threading.Thread.__init__(self)
		
	def run(self):
		Migration_API_Instance = RollBack_Migrate_Process()
		Migration_API_Instance.initial_process()
