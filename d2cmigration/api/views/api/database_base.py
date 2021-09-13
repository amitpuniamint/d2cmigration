import time
from api.models import *
import os
from django.conf import settings
from django.db import transaction, IntegrityError
from django.db import connection

import datetime
import pytz
UTC = pytz.utc
India_current_time = pytz.timezone('Asia/Kolkata')


MIGRATE_LOG_PATH = str(settings.BASE_DIR)+'/logs/migration/'

India_current_time = pytz.timezone('Asia/Kolkata')
# Logger 

import logging
import  threading
logger = logging.getLogger('logfile')

MIGRATION_DATABASE = 'migration'
SOURCE_DATABASE = 'source'
DESTINATION_DATABASE = 'destination'


DATABASE_TABLE = [TFirRegistration,TFirComplainantInfo,TFirVictimInfo,TFirAccusedInfo,TFirActSection,TFirFileUploads,TFirLink,TFirLinkOtherCase,TFirMajorMinorHeads,TFirOccurancePlace,TFirReAssign,TFirPropertyInfo,TPropertyInfo,TFirAccusedAddresses,TFirAccusedAlias,TFirAccusedFiles,TFirAccusedIdMarks,TFirAccusedNationalId,TCrimeDetail,TCrimeActSection,TCrimeCharacter,TCrimeComplainant,TCrimeConvUsed,TCrimeFileUploads,TCrimeLanguageUsed,TCrimeMajorMinorHeads,TCrimeMethod,TCrimeMotive,TCrimeOccurancePlace,TCrimeProperty,TCrimeSplFeat,TCrimeVictim,TCrimeWitness,TArrestMemo,TArrestActSection,TArrestEducQualif,TArrestIdentityMarks,TArrestWitness,TSeizureMemo,TSeizureFiles,TPropertySeizeActs,TPropertySeizeWitness,TSeizedFromPerson,TSeizedProperty,TFinalReport,TFinalReportActs,TChargesheetActs,TChargesheetConvictions,TFinalReportSeizure,TFinalReportEnclosures,TFinalReportFiles,TFinalReportWitness,TCourtCompensation,TCourtDisposal,TCourtDisposalProsecutor,TCourtAppeal,TAccusedInfo,TAccusedPunishment,TAccusedAlias,TAccusedAppeal,TAccusedAppealActs,TAccusedChargesheet,TAccusedConvictCases,TAccusedDisposal,TAccusedDisposalActs,TAccusedSplFeature,TAccusedIdentityMarks,TAccusedNationalId,TAccusedProperty,TAccusedAddresses,TAccusedFiles,TAccusedConfessedCases,TPersonInfo,TPersonNationality,TPersonAddress,TPropertyArms,TPropertyAutomobile,TPropertyCultural,TPropertyCurrency,TPropertyCurrencyDet,TPropertyDocuments,TPropertyDrugs,TPropertyElectricGoods,TPropertyElectricId,TPropertyExplosives,TPropertyJewelry,TPropertyOthers]

#Database Table Filteration Wise
DATABASE_TABLE_FIR_REG_NUM = [TFirRegistration,TFirComplainantInfo,TFirVictimInfo,TFirAccusedInfo,TFirActSection,TFirFileUploads,TFirLinkOtherCase,TFirMajorMinorHeads,TFirOccurancePlace,TFirReAssign,TFirPropertyInfo,TCrimeDetail,TCrimeActSection,TCrimeCharacter,TCrimeComplainant,TCrimeConvUsed,TCrimeFileUploads,TCrimeLanguageUsed,TCrimeMajorMinorHeads,TCrimeMethod,TCrimeMotive,TCrimeOccurancePlace,TCrimeProperty,TCrimeSplFeat,TCrimeVictim,TCrimeWitness,TArrestMemo,TSeizureMemo,TFinalReport,TFinalReportActs,TChargesheetActs,TChargesheetConvictions,TFinalReportSeizure,TCourtCompensation,TCourtDisposal,TCourtDisposalProsecutor,TCourtAppeal,TAccusedInfo,TAccusedPunishment,TAccusedAlias,TAccusedAppeal,TAccusedAppealActs,TAccusedChargesheet,TAccusedConvictCases,TAccusedDisposal,TAccusedDisposalActs,TAccusedSplFeature,TAccusedIdentityMarks,TAccusedNationalId,TAccusedProperty,TAccusedConfessedCases]
DATABASE_TABLE_FIR_REGN_NUM = [TPropertyInfo]
DATABASE_TABLE_FIR_ACCUSED_SR_NO = [TFirAccusedAddresses,TFirAccusedAlias,TFirAccusedFiles,TFirAccusedIdMarks,TFirAccusedNationalId]
DATABASE_TABLE_ACCUSED_SR_NO = [TAccusedAddresses,TAccusedFiles]
DATABASE_TABLE_ARR_SURR_SRNO = [TArrestActSection,TArrestEducQualif,TArrestIdentityMarks,TArrestWitness]
DATABASE_TABLE_SEIZURE_NUM = [TSeizureFiles,TPropertySeizeActs,TPropertySeizeWitness,TSeizedFromPerson,TSeizedProperty]
DATABASE_TABLE_FINAL_REP_SRNO = [TFinalReportEnclosures,TFinalReportFiles,TFinalReportWitness]
DATABASE_TABLE_PERSON_CODE =  [TPersonInfo,TPersonNationality,TPersonAddress]
DATABASE_TABLE_PROP_REG_NUM = [TPropertyArms,TPropertyAutomobile,TPropertyCultural,TPropertyCurrency,TPropertyDocuments,TPropertyDrugs,TPropertyElectricGoods,TPropertyElectricId,TPropertyExplosives,TPropertyJewelry,TPropertyOthers]
DATABASE_TABLE_PROP_CURR_SRNO = [TPropertyCurrencyDet]