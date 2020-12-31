from django.contrib import admin

from .models import Category
from .models import Task
from .models import Profile

admin.site.register(Category)
admin.site.register(Task)
admin.site.register(Profile)
