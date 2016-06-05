# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sponsor',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('payment_status', models.BooleanField(default=False)),
                ('sponsorship_amount', models.CharField(max_length=30)),
                ('razorpay_payment_id', models.CharField(max_length=30, blank=True, null=True)),
                ('razorpay_capture_status', models.BooleanField(default=False)),
            ],
        ),
    ]
