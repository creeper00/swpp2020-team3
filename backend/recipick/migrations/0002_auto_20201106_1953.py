# Generated by Django 3.1.1 on 2020-11-06 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipick', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='description_list',
            field=models.JSONField(null=True),
        ),
    ]
