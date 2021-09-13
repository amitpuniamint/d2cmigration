from ..base import *
from django.http import HttpResponse



class Dashboard(View):
	template_name = 'api/dashboard.html'
	def get(self,request,*args,**kwargs):
		logger.debug(f'Dashboard GET Initial')
		response = False
		try:
			context = {}
			context['page_name'] = 'dashboard' 
			response = True
			logger.debug(f'Do_Login GET {{Response:{response}}}')
			return render(request,Dashboard.template_name,context)
		except Exception as e:
			logger.critical(f'Do_Login GET {{ERROR:{e},Response:{response}}}')
			messages.error(request,'Login Services is Halt due to System Error,Please Contact With System Admin.')
		
		logger.debug(f'Do_Login GET {{Response:{response}}}')
		return HttpResponse(status=500)