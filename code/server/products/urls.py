from django.urls import path

from rest_framework_simplejwt import views as jwt_views

from .views import ProductPostAPIView, GetAllProductsAPIView, GetProductByIdAPIView, UpdateProductByIdAPIView, DeleteProductByIdAPIView


urlpatterns = [
    path('/all', GetAllProductsAPIView.as_view()),
    path('/create', ProductPostAPIView.as_view()),
    path('/<int:pd_id>', GetProductByIdAPIView.as_view()),
    path('/update/<int:pd_id>', UpdateProductByIdAPIView.as_view()),
    path('/delete/<int:pd_id>', DeleteProductByIdAPIView.as_view())
    ]


