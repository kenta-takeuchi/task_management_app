from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

import uuid


class Profile(models.Model):
    user_profile = models.OneToOneField(User, related_name='user_profile', on_delete=models.CASCADE)

    def __str__(self):
        return self.user_profile.username


class Category(models.Model):
    item = models.CharField(max_length=100)

    def __str__(self):
        return self.item


class Task(models.Model):
    STATUS = (
        ('1', 'TODO'),
        ('2', 'Doing'),
        ('3', 'Done')
    )

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    criteria = models.CharField(max_length=100)
    status = models.CharField(max_length=5, choices=STATUS, default='1')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    estimate = models.IntegerField(validators=[MinValueValidator(0)])
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    responsible = models.ForeignKey(User, on_delete=models.CASCADE, related_name='responsible')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
