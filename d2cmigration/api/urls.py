from api.views import *
from django.urls import path

urlpatterns = [
    path('',Dashboard.as_view(),name='dashboard'),
    # Basic
    path('district/<int:state_code>/',get_district_list,name='district_list'),
    path('police_code/<int:state_code>/<int:district_code>/',get_police_station_list,name='pstation_list'),
    # Migration
    path('migration/',Migration_Initial_HTML_Handler.as_view(),name='migration'),
    path('migration/cancle/<str:pk>/',Migration_Cancle_HTML_Handler.as_view(),name='migration_batch_cancle'),# History PK
    path('migration/authentication/<int:pk>/',Migration_Auth_Handler.as_view(),name='migration_batch_auth'), # Pk=History PK
    path('migration/details/<int:pk>/',Migration_Batch_Details.as_view(),name='migration_batch_details'), # Pk=History PK
    path('migration/fir_details/<int:pk>/',Migration_FIR_Details_Handler.as_view(),name='migration_batch_fir_list'), # Pk=History PK
    path('migration/start/<int:pk>/',Migration_START_Handler.as_view(),name='migration_start'), # Pk=History PK
    path('migration/stop/<int:pk>/',Migration_STOP_Handler.as_view(),name='migration_stop'), # Pk=History PK
    path('migration/log_file/<int:pk>/<int:line_number>/',Migration_Log_File_Reader_Handler.as_view(),name='migration_batch_fir_list'), # Pk=History PK
    path('migration/history/',Migration_History_Handler.as_view(),name='migration_history'), # Pk=History PK
    path('migration/details/<int:pk>/<str:history>/',Migration_Batch_Details.as_view(),name='migration_history_details'), # Pk=History PK
    # RollBack
    path('rollback/',RollBack_Initial_HTML_Handler.as_view(),name='rollback'),
    path('rollback/batch_fir/<str:batch_sr_num>/',RollBack_GET_Migration_Batch_FIR_Details_Handler.as_view(),name='rollback_get_migration_batch_fir_list'),
    path('rollback/get_migration_single_fir_details/',RollBack_GET_Migration_SINGLE_FIR_Details_Handler.as_view(),name='rollback_get_migration_single_fir_list'),
    path('rollback/cancle/<str:pk>/',RollBack_Cancle_HTML_Handler.as_view(),name='rollback_cancle'),
    path('rollback/authentication/<int:pk>/',RollBack_Auth_Handler.as_view(),name='rollback_auth'), # Pk=History PK
    path('rollback/details/<int:pk>/',RollBack_Details.as_view(),name='rollback_details'), # Pk=History PK
    path('rollback/r_fir_details/<int:pk>/',RollBack_FIR_Batch_List.as_view(),name='rollback_fir_details'), # Pk=History PK
    path('rollback/log_file/<int:pk>/<int:line_number>/',RollBack_Log_Reader_Handler.as_view(),name='rollback_log_reader'), # Pk=History PK
    path('rollback/start/<int:pk>/',RollBack_START_Handler.as_view(),name='rollback_start'), # Pk=History PK
    path('rollback/stop/<int:pk>/',RollBack_STOP_Handler.as_view(),name='rollback_stop'), # Pk=History PK
    path('rollback/history/',RollBack_History_Handler.as_view(),name='rollback_history'),
    path('rollback/history/<int:pk>/<str:history>/',RollBack_Details.as_view(),name='rollback_history_details'), # Pk=History PK
    

]


