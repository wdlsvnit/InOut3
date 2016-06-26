from django.http import Http404, HttpResponse
from django.shortcuts import redirect,render
from django.conf import settings
import razorpay

from .models import Sponsor
# Create your views here.

def index(request,sponsor_id):
    sponsor = Sponsor.objects.get(id = int(sponsor_id))
    sponsorship = sponsor.sponsorship_amount + "00"
    if request.method == "POST":
        razor = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        payment = razor.payment.fetch(request.POST.get("razorpay_payment_id"))
        print(payment)
        if payment['error_code'] == None and payment['amount']==int(sponsor.sponsorship_amount) and (payment['status']=='created' or payment['status']=='authorized'):
            success = "Payment Successful."
            sponsor.payment_status = True
            sponsor.razorpay_payment_id = payment['id']
            sponsor.save()
            return render(request,'sponsorship/sponsorship.html',{"success": success})
        else:
            success = "Payment Failed."
            return render(request,'sponsorship/sponsorship.html',{"success": success,'sponsor':sponsor,'sponsorship_amount':sponsorship})
        
    else:
        return render(request,'sponsorship/sponsorship.html',{'sponsor':sponsor,'sponsorship_amount':sponsorship})