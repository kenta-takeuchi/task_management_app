from django.urls import path, include
from rest_framework import routers

from .views import ListUserView, LoginUserView, CreateUserView
from .views import CategoryViewSet, ProfileViewSet, TaskViewSet

router = routers.DefaultRouter()
router.register('category', CategoryViewSet)
router.register('profile', ProfileViewSet)
router.register('task', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('create/', CreateUserView.as_view(), name='create'),
    path('users/', ListUserView.as_view(), name='list'),
    path('loginuser/', LoginUserView.as_view(), name='loginuser'),
]
