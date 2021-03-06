# Generated by Django 3.2.5 on 2021-07-14 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Migration_Rollback_Process',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('history_pk', models.IntegerField(db_column='HISTORY_PK', unique=True)),
                ('program_of_type', models.CharField(choices=[('M', 'Migration'), ('R', 'Rollback')], db_column='PROGRAM_OF_TYPE', max_length=1)),
                ('add_time', models.DateTimeField(db_column='ADD_TIME')),
                ('start_time', models.DateTimeField(blank=True, db_column='START_TIME', null=True)),
                ('status', models.IntegerField(db_column='STATUS', default=0)),
            ],
            options={
                'db_table': 't_migration_rollback_process',
            },
        ),
        migrations.CreateModel(
            name='Migration_User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(db_column='USERNAME', max_length=150, unique=True)),
                ('is_admin', models.IntegerField(db_column='IS_ADMIN', default=0)),
                ('is_staff', models.IntegerField(db_column='IS_STAFF', default=0)),
                ('is_active', models.IntegerField(db_column='IS_ACTIVE', default=0)),
                ('can_migrate', models.IntegerField(db_column='CAN_MIGRATE', default=0)),
                ('can_rollback', models.IntegerField(db_column='CAN_ROLLBACK', default=0)),
                ('can_test', models.IntegerField(db_column='CAN_TEST', default=0)),
                ('create_time', models.DateTimeField(blank=True, db_column='CREATE_TIME', null=True)),
                ('created_by', models.CharField(db_column='CREATED_BY', max_length=150)),
                ('activate_by', models.CharField(blank=True, db_column='ACTIVATE_BY', max_length=150, null=True)),
                ('activate_on', models.DateTimeField(blank=True, db_column='ACTIVATE_ON', null=True)),
                ('deactivate_by', models.CharField(blank=True, db_column='DEACTIVATE_BY', max_length=150, null=True)),
                ('deactivate_on', models.DateTimeField(blank=True, db_column='DEACTIVATE_ON', null=True)),
            ],
            options={
                'db_table': 't_migration_user',
            },
        ),
        migrations.CreateModel(
            name='Migration_User_Login_Activity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(db_column='USERNAME', max_length=150)),
                ('login_time', models.DateTimeField(db_column='LOGIN_TIME')),
                ('logout_time', models.DateTimeField(blank=True, db_column='LOGOUT_TIME', null=True)),
            ],
            options={
                'db_table': 't_migration_user_login_activity',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='TMigration_Batch_Details',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('batch_sr_num', models.CharField(db_column='BATCH_SR_NUM', max_length=100, unique=True)),
                ('fir_sr_count', models.IntegerField(db_column='FIR_SR_COUNT')),
                ('user', models.CharField(db_column='USER', max_length=100)),
                ('failed_reason', models.TextField(blank=True, db_column='FAILED_REASON', null=True)),
                ('is_running', models.IntegerField(db_column='IS_RUNNING', default=0)),
                ('create_time', models.DateTimeField(blank=True, db_column='CREATE_TIME', null=True)),
                ('start_time', models.DateTimeField(blank=True, db_column='START_TIME', null=True)),
                ('complete_time', models.DateTimeField(blank=True, db_column='COMPLETE_TIME', null=True)),
                ('current_status', models.CharField(choices=[('C', 'Created'), ('CN', 'Cancle'), ('S', 'Success'), ('F', 'Failed'), ('A', 'Abort'), ('R', 'Rollback'), ('PR', 'Partial Rollback')], db_column='CURRENT_STATUS', default='C', max_length=2)),
            ],
            options={
                'db_table': 't_migration_batch_details',
            },
        ),
        migrations.CreateModel(
            name='TMigration_Batch_FIR_Details',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fir_reg_num', models.CharField(db_column='FIR_REG_NUM', max_length=100)),
                ('state_cd', models.IntegerField(db_column='STATE_CD')),
                ('district_cd', models.IntegerField(db_column='DISTRICT_CD')),
                ('ps_cd', models.IntegerField(db_column='PS_CD')),
                ('reg_year', models.IntegerField(db_column='REG_YEAR')),
                ('fir_srno', models.IntegerField(db_column='FIR_SRNO')),
                ('batch_sr_num', models.CharField(db_column='BATCH_SR_NUM', max_length=100)),
                ('create_time', models.DateTimeField(blank=True, db_column='CREATE_TIME', null=True)),
                ('start_time', models.DateTimeField(blank=True, db_column='START_TIME', null=True)),
                ('complete_time', models.DateTimeField(blank=True, db_column='COMPLETE_TIME', null=True)),
                ('current_status', models.CharField(choices=[('N', 'NONE'), ('C', 'CANCLE'), ('S', 'Success'), ('F', 'Failed'), ('A', 'Abort'), ('R', 'Rollback')], db_column='CURRENT_STATUS', default='N', max_length=2)),
                ('rollback_time', models.DateTimeField(blank=True, db_column='ROLLBACK_TIME', null=True)),
                ('rollback_user', models.CharField(blank=True, db_column='ROLLBACK_USER', max_length=100, null=True)),
                ('rollback_reason', models.TextField(blank=True, db_column='ROLLBACK_REASON', null=True)),
                ('failed_reason', models.TextField(blank=True, db_column='FAILED_REASON', null=True)),
            ],
            options={
                'db_table': 't_migration_batch_number_details',
            },
        ),
        migrations.CreateModel(
            name='TMigration_Batch_History',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('batch_sr_num', models.TextField(db_column='BATCH_SR_NUM')),
                ('program_of_type', models.CharField(choices=[('M', 'Migration'), ('R', 'Rollback')], db_column='PROGRAM_OF_TYPE', max_length=2)),
                ('method_of_type', models.CharField(choices=[('B', 'Batch Wise'), ('T', 'Table Wise'), ('F', 'FIR Wise')], db_column='METHOD_OF_TYPE', max_length=2)),
                ('status', models.IntegerField(db_column='STATUS', default=0)),
                ('user', models.CharField(db_column='USER', max_length=100)),
                ('cancle_user', models.CharField(db_column='CANCLE_USER', max_length=100)),
                ('auth_count', models.IntegerField(db_column='AUTH_COUNT', default=0)),
                ('failed_reason', models.TextField(blank=True, db_column='FAILED_REASON', null=True)),
                ('create_time', models.DateTimeField(blank=True, db_column='CREATE_TIME', null=True)),
                ('rollback_reason', models.CharField(blank=True, db_column='ROLLBACK_REASON', max_length=100, null=True)),
                ('rollback_fir_count', models.IntegerField(blank=True, db_column='ROLLBACK_FIR_COUNT', null=True)),
                ('is_auth', models.IntegerField(db_column='IS_AUTH', default=0)),
                ('start_time', models.DateTimeField(blank=True, db_column='START_TIME', null=True)),
                ('complete_time', models.DateTimeField(blank=True, db_column='COMPLETE_TIME', null=True)),
            ],
            options={
                'db_table': 't_migration_batch_history',
            },
        ),
        migrations.CreateModel(
            name='TRollBack_Batch_Details',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rollback_id', models.IntegerField(db_column='ROLLBACK_ID')),
                ('batch_sr_num', models.CharField(db_column='BATCH_SR_NUM', max_length=100)),
                ('fir_reg_num', models.CharField(db_column='FIR_REG_NUM', max_length=100)),
                ('username', models.CharField(db_column='USERNAME', max_length=100)),
                ('create_time', models.DateTimeField(blank=True, db_column='CREATE_TIME', null=True)),
                ('start_time', models.DateTimeField(blank=True, db_column='START_TIME', null=True)),
                ('complete_time', models.DateTimeField(blank=True, db_column='COMPLETE_TIME', null=True)),
                ('status', models.IntegerField(db_column='STATUS', default=0)),
                ('failed_reason', models.TextField(blank=True, db_column='FAILED_REASON', null=True)),
            ],
            options={
                'db_table': 't_rollback_batch_details',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('password', models.CharField(max_length=128)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('username', models.CharField(max_length=150, unique=True)),
                ('email', models.CharField(max_length=255)),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=150)),
                ('is_staff', models.IntegerField(null=True)),
                ('is_active', models.IntegerField(null=True)),
                ('is_superuser', models.IntegerField(null=True)),
                ('date_joined', models.DateTimeField(null=True)),
                ('district', models.IntegerField(null=True)),
                ('police_station', models.IntegerField(null=True)),
                ('state', models.IntegerField(null=True)),
                ('process', models.IntegerField(null=True)),
                ('stream', models.CharField(max_length=50, null=True)),
                ('permission', models.CharField(max_length=100, null=True)),
            ],
            options={
                'db_table': 'authuser_user',
                'managed': True,
            },
        ),
        migrations.AddConstraint(
            model_name='user',
            constraint=models.UniqueConstraint(fields=('username', 'email'), name='constraints UserAuth'),
        ),
    ]
