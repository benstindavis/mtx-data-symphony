# Generated by Django 4.0 on 2022-01-03 06:23

import datetime
import django.core.validators
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='VideoUpload',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('video', models.FileField(null=True, upload_to='videos_uploaded', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['MOV', 'avi', 'mp4', 'webm', 'mkv'])])),
                ('date_uploaded', models.DateTimeField(default=datetime.datetime.now, editable=False)),
                ('proccessed', models.BooleanField(default=False, editable=False)),
                ('timestamps', models.JSONField(editable=False, null=True)),
                ('graph', models.JSONField(editable=False, null=True)),
            ],
        ),
    ]
