from django.urls import path
from .views import DashboardAPIView, AnnotationAPIView, AnnotationDetailAPIView

urlpatterns = [
    path("dashboard/", DashboardAPIView.as_view()),
    path("annotations/", AnnotationAPIView.as_view()),
    path("annotations/<int:annotation_id>/", AnnotationDetailAPIView.as_view()),
]