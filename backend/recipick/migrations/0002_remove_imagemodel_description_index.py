# Generated by Django 3.1.1 on 2020-11-09 07:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipick', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='imagemodel',
            name='description_index',
        ),
    ]
