from django.urls import path

from rest_framework_simplejwt import views as jwt_views

from .views import ProductPostAPIView, GetAllProductsAPIView, GetProductByIdAPIView, UpdateProductByIdAPIView, DeleteProductByIdAPIView


urlpatterns = [
    path('products/create', ProductPostAPIView.as_view()),
    path('/products', GetAllProductsAPIView.as_view()),
    path('/products/<int:pd_id>', GetProductByIdAPIView.as_view()),
    path('/products/update/<int:pd_id>', UpdateProductByIdAPIView.as_view()),
    path('/products/delete/<int:pd_id>', DeleteProductByIdAPIView.as_view())
    ]


