from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^pay/(?P<sponsor_id>(\d+))/$', views.index, name='index'),
]