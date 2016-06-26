from django.contrib import admin

from django.utils.html import format_html
from django.http import HttpResponseRedirect
from django.core.mail import send_mail, BadHeaderError, send_mass_mail,EmailMultiAlternatives
from django.conf import settings
from django.template.loader import get_template, render_to_string

from django_object_actions import DjangoObjectActions

from .models import Sponsor

import os
import sys
import razorpay

@admin.register(Sponsor)
class SponsorAdmin(DjangoObjectActions,admin.ModelAdmin):
    list_display =('name','email','payment_status','sponsorship_amount','razorpay_capture_status')
    
    def send_payment_link(self,request,obj):
        subject = 'Thank you for agreeing to sponsor us. Payment link inside ! '
        from_email = "Team InOut <"+settings.DEFAULT_FROM_EMAIL+">"
        to_email = [ obj.email ]
        context = {

             "sponsor_name": obj.name,
             "amount" : obj.sponsorship_amount,
             "id": obj.id,
         }

        email_template_html = "sponsorship_mail_body.html"
        email_template_txt  = "sponsorship_mail_body.txt"
        text_content = render_to_string(email_template_txt, context)
        html_content = render_to_string(email_template_html, context)
        headers = {'X-Priority':1}
        if subject and to_email and from_email :
            try:
                msg=EmailMultiAlternatives(subject, text_content, from_email, to_email,headers = headers)
                msg.attach_alternative(html_content,"text/html")
                msg.send()
            except BadHeaderError:
                return HttpResponse('Invalid header found.')

        return HttpResponseRedirect('/admin/sponsorship/sponsor/')
    send_payment_link.label = "Send Link"  # optional
    send_payment_link.short_description = "Send payment link to sponsor"  # optional

    def capture_payment(self,request,obj):
        razor = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        capture = razor.payment.capture(obj.razorpay_payment_id, obj.sponsorship_amount+"00")
        if capture['error_code']==None:
             obj.razorpay_capture_status = True
             obj.save()
        return HttpResponseRedirect('/admin/sponsorship/sponsor/')
    capture_payment.label = "Capture"
    capture_payment.short_description = "Capture sponsor payment"
    objectactions = ('send_payment_link','capture_payment', )
    
    
