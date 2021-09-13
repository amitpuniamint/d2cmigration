from django.db import models
from django.contrib.auth.models import User
'''
Status Code 
0: Created
1: Running
2. Success
3. Failed
4. Cancle
5. Abort
'''

# Create your models here.
class Migration_User(models.Model):
	username = models.CharField(db_column='USERNAME',max_length=150,unique=True)
	is_admin = models.IntegerField(db_column='IS_ADMIN',default=0)
	is_staff = models.IntegerField(db_column='IS_STAFF',default=0)
	is_active = models.IntegerField(db_column='IS_ACTIVE',default=0)
	state = models.IntegerField(db_column='STATE_CD',default=0)
	district = models.IntegerField(db_column='DISTRICT_CD',default=0)
	police_station = models.IntegerField(db_column='POLICE_STATION_CD',default=0)
	can_migrate = models.IntegerField(db_column='CAN_MIGRATE',default=0)
	can_rollback = models.IntegerField(db_column='CAN_ROLLBACK',default=0)
	can_test = models.IntegerField(db_column='CAN_TEST',default=0)
	create_time = models.DateTimeField(db_column='CREATE_TIME', blank=True, null=True)  # Field name made lowercase.
	created_by = models.CharField(db_column='CREATED_BY',max_length=150)
	activate_by = models.CharField(db_column='ACTIVATE_BY',max_length=150,blank=True, null=True)
	activate_on = models.DateTimeField(db_column='ACTIVATE_ON', blank=True, null=True)  # Field name made lowercase.
	deactivate_by = models.CharField(db_column='DEACTIVATE_BY',max_length=150,blank=True, null=True)
	deactivate_on = models.DateTimeField(db_column='DEACTIVATE_ON', blank=True, null=True)  # Field name made lowercase.

	class Meta:
		db_table = 't_migration_user'

	def __str__(self):
		return self.username

class Migration_User_Login_Activity(models.Model):
	username = models.CharField(db_column='USERNAME',max_length=150)
	login_time = models.DateTimeField(db_column='LOGIN_TIME')  # Field name made lowercase.
	logout_time = models.DateTimeField(db_column='LOGOUT_TIME', blank=True, null=True)  # Field name made lowercase.

	class Meta:
		managed = True
		db_table = 't_migration_user_login_activity'

	def __str__(self):
		return self.username

class Migration_Rollback_Process(models.Model):
	'''
	0: Queue
	1: Running
	2: Stop
	'''
	type_of_program = (
		('M','Migration'),
		('R','Rollback'),
		)
	history_pk = models.IntegerField(db_column='HISTORY_PK',unique=True)
	program_of_type = models.CharField(db_column='PROGRAM_OF_TYPE', max_length=1,choices=type_of_program)
	add_time = models.DateTimeField(db_column='ADD_TIME')
	start_time = models.DateTimeField(db_column='START_TIME', blank=True, null=True)
	status =  models.IntegerField(db_column='STATUS',default=0)

	
	class Meta:
		db_table = 't_migration_rollback_process'

	def __str__(self):
		return self.batch_sr_num

class TMigration_Batch_Details(models.Model):
	status_current = (
		('C','Created'),
		('CN','Cancle'),
		('S','Success'),
		('F','Failed'),
		('A','Abort'),
		('R','Rollback'),
		('PR','Partial Rollback')
		)
	batch_sr_num = models.CharField(db_column='BATCH_SR_NUM', max_length=100,unique=True)
	fir_sr_count = models.IntegerField(db_column='FIR_SR_COUNT')
	user = models.CharField(db_column='USER', max_length=100)
	failed_reason = models.TextField(db_column='FAILED_REASON',blank=True,null=True)
	is_running = models.IntegerField(db_column='IS_RUNNING',default=0)
	create_time = models.DateTimeField(db_column='CREATE_TIME', blank=True, null=True)  # Field name made lowercase.
	start_time = models.DateTimeField(db_column='START_TIME', blank=True, null=True)  # Field name made lowercase.
	complete_time = models.DateTimeField(db_column='COMPLETE_TIME', blank=True, null=True)  # Field name made lowercase.
	current_status = models.CharField(db_column='CURRENT_STATUS', max_length=2,choices=status_current,default='C')
	

	class Meta:
		db_table = 't_migration_batch_details'

	def __str__(self):
		return self.batch_sr_num

class TMigration_Batch_History(models.Model):
	type_of_program = (
		('M','Migration'),
		('R','Rollback'),
		)
	type_of_method = (
		('B','Batch Wise'),
		('T','Table Wise'),
		('F','FIR Wise')
		)

	batch_sr_num = models.TextField(db_column='BATCH_SR_NUM')
	program_of_type = models.CharField(db_column='PROGRAM_OF_TYPE', max_length=2,choices=type_of_program)
	method_of_type = models.CharField(db_column='METHOD_OF_TYPE', max_length=2,choices=type_of_method)
	status = models.IntegerField(db_column='STATUS',default=0)
	user = models.CharField(db_column='USER', max_length=100)
	cancle_user = models.CharField(db_column='CANCLE_USER', max_length=100)
	auth_count = models.IntegerField(db_column='AUTH_COUNT',default=0)
	failed_reason = models.TextField(db_column='FAILED_REASON',blank=True,null=True)
	create_time = models.DateTimeField(db_column='CREATE_TIME', blank=True, null=True)  # Field name made lowercase.
	rollback_reason = models.CharField(db_column='ROLLBACK_REASON', max_length=100,blank=True,null=True)
	rollback_fir_count = models.IntegerField(db_column='ROLLBACK_FIR_COUNT',null=True,blank=True)
	is_auth = models.IntegerField(db_column='IS_AUTH',default=0)
	start_time = models.DateTimeField(db_column='START_TIME', blank=True, null=True)  # Field name made lowercase.
	complete_time = models.DateTimeField(db_column='COMPLETE_TIME', blank=True, null=True)  # Field name made lowercase.

	class Meta:
		db_table = 't_migration_batch_history'
		
	def __str__(self):
		return (self.batch_sr_num)

class TMigration_Batch_FIR_Details(models.Model):
	status_current = (
		('N','NONE'),
		('C','CANCLE'),
		('S','Success'),
		('F','Failed'),
		('A','Abort'),
		('R','Rollback')
		)
	fir_reg_num = models.CharField(db_column='FIR_REG_NUM', max_length=100)
	state_cd = models.IntegerField(db_column='STATE_CD')  # Field name made lowercase.
	district_cd = models.IntegerField(db_column='DISTRICT_CD')  # Field name made lowercase.
	ps_cd = models.IntegerField(db_column='PS_CD')  # Field name made lowercase.
	reg_year = models.IntegerField(db_column='REG_YEAR')  # Field name made lowercase.
	fir_srno = models.IntegerField(db_column='FIR_SRNO')  # Field name made lowercase.
	batch_sr_num = models.CharField(db_column='BATCH_SR_NUM', max_length=100)
	create_time = models.DateTimeField(db_column='CREATE_TIME', blank=True, null=True)  # Field name made lowercase.
	start_time = models.DateTimeField(db_column='START_TIME', blank=True, null=True)  # Field name made lowercase.
	complete_time = models.DateTimeField(db_column='COMPLETE_TIME', blank=True, null=True)  # Field name made lowercase.
	current_status = models.CharField(db_column='CURRENT_STATUS', max_length=2,choices=status_current,default='N')
	rollback_time = models.DateTimeField(db_column='ROLLBACK_TIME', blank=True, null=True)  # Field name made lowercase.
	rollback_user = models.CharField(db_column='ROLLBACK_USER', max_length=100,blank=True,null=True)
	rollback_reason = models.TextField(db_column='ROLLBACK_REASON',blank=True,null=True)
	failed_reason = models.TextField(db_column='FAILED_REASON',blank=True,null=True)

	class Meta:
		db_table = 't_migration_batch_number_details'

	def __str__(self):
		return str(self.batch_sr_num)


class TRollBack_Batch_Details(models.Model):
	'''
	Status Code 
	0: Created
	2. Success
	3. Failed
	4. Cancle
	5. Abort
	'''

	rollback_id = models.IntegerField(db_column='ROLLBACK_ID')
	batch_sr_num = models.CharField(db_column='BATCH_SR_NUM', max_length=100)
	fir_reg_num = models.CharField(db_column='FIR_REG_NUM', max_length=100)
	username = models.CharField(db_column='USERNAME', max_length=100)
	create_time = models.DateTimeField(db_column='CREATE_TIME', blank=True, null=True)  # Field name made lowercase.
	start_time = models.DateTimeField(db_column='START_TIME', blank=True, null=True)  # Field name made lowercase.
	complete_time = models.DateTimeField(db_column='COMPLETE_TIME', blank=True, null=True)  # Field name made lowercase.
	status =  models.IntegerField(db_column='STATUS',default=0)
	failed_reason = models.TextField(db_column='FAILED_REASON',blank=True,null=True)
	class Meta:
		db_table = 't_rollback_batch_details'

	def __str__(self):
		return self.rollback_id