from django.urls import path

from rest_framework_simplejwt import views as jwt_views

from .views import ProductPostAPIView


urlpatterns = [
    path("products", ProductPostAPIView.as_view()),
    ]


