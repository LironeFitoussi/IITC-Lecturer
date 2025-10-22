from django.urls import path
from tasks.views import home, task_list, monthly_tasks_by_number, monthly_tasks_by_name

urlpatterns = [
    path('', home, name='home'),
    path('tasks/', task_list, name='task_list'),
    # month tasks with number (must come BEFORE string pattern)
    path('tasks/<int:month>/', monthly_tasks_by_number, name='monthly_tasks_by_number'),
    # month tasks with name
    path('tasks/<str:month>/', monthly_tasks_by_name, name='monthly_tasks_by_name'),
]