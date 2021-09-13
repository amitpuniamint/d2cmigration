from django.shortcuts import render, redirect
from django.contrib import messages

# Authorization & Authentications Management
def api_login_required(function):
    def wrapper(request, *args, **kwargs):
        if 'username' in request.session and 'session_create' in request.session:
            if request.session['session_create'] is True:
                return function(request, *args, **kwargs)
        else:
            messages.error(request,'Authentication Failed.Please Login Again')
            return redirect('/login/')
    return wrapper


def test_api_login_required(function):
    def wrapper(request, *args, **kwargs):
        if 'username' in request.session and 'session_create' in request.session:
            if request.session['session_create'] is True:
                if 'can_test' in request.session:
                    if request.session['can_test'] is True:
                        return function(request, *args, **kwargs)
                return redirect('/')
        else:
            messages.error(request,'Authentication Failed.Please Login Again')
            return redirect('/login/')
    return wrapper