from django.urls import path
from . import views

urlpatterns = [
    path('', views.BasicView.as_view(), name='index'),
    # path("add", views.add, name="add"),
    # path("update/<int:todo_id>/", views.update, name="update"),
    # path("delete/<int:todo_id>/", views.delete, name="delete"),
]