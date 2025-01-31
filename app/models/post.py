from django.db import models
from django_prometheus.models import ExportModelOperationsMixin

from .skill import Skill
from .student import Student


def store_picture(instance, filename: str) -> str:
    extension = filename.split('.')[-1]
    return "post_" + "{}.{}".format(instance.id, extension)


class Post(ExportModelOperationsMixin('post'), models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    content = models.TextField(max_length=1024)
    published_date = models.DateField()
    post_picture = models.ImageField(
        upload_to=store_picture, default='post/default.jpg')
    skills = models.ManyToManyField(Skill)
    interested_students = models.ManyToManyField(
        Student, related_name='interest')

    class Meta:
        indexes = [models.Index(fields=[
            'id',
            'student',
        ])]
