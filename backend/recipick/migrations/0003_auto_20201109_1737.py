# Generated by Django 3.1.2 on 2020-11-09 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipick', '0002_remove_imagemodel_description_index'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='thumbnail',
            field=models.ImageField(null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='duration',
            field=models.IntegerField(default='0'),
        ),
    ]
