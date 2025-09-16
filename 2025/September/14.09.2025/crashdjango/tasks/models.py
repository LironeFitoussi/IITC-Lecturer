from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200)
    is_done = models.BooleanField(default=False)
    
    # TODO: Self Learn Waht is __str__ in python dajngo
    def __str__(self):
        return self.title
