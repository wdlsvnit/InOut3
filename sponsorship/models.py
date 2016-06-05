from django.db import models

# Create your models here.


class Sponsor(models.Model):
    
    # Sponsor Name
    name = models.CharField(max_length=30, unique = True)
    # Sponsor contact email
    email = models.EmailField(unique = True)

    # Payment status of the Sponsor
    payment_status = models.BooleanField(default=False)
    
    sponsorship_amount = models.CharField(max_length = 30)
    
    razorpay_payment_id = models.CharField(max_length=30,blank=True,null=True)
    
    razorpay_capture_status = models.BooleanField(default=False)