from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.shortcuts import redirect
from django.urls import reverse


# Dummy months dictionary
months_tasks = {
    "jan": "Complete a new task: Read a book",
    "feb": "Complete a new task: Start a journal",
    "mar": "Complete a new task: Learn a new recipe",
    "apr": "Complete a new task: Go hiking",
    "may": "Complete a new task: Plant a tree",
    "jun": "Complete a new task: Volunteer for a cause",
    "jul": "Complete a new task: Take a photography walk",
    "aug": "Complete a new task: Try a new sport",
    "sep": "Complete a new task: Write a poem",
    "oct": "Complete a new task: Visit a museum",
    "nov": "Complete a new task: Cook for friends",
    "dec": "Complete a new task: Reflect on your year",
}


# Create your views here.
def home(request):
    """Home page view - simple welcome message"""
    return HttpResponse("<h1>Welcome to Crash Django Tasks</h1><p><a href='/tasks/'>View Monthly Tasks</a></p>")

def task_list(request):
    """Task list view - renders the monthly tasks template"""
    return render(request, 'tasks/list.html', {'months_tasks': months_tasks})

# Monthly tasks by integer month
def monthly_tasks_by_number(request, month):
    """Handle integer month (1-12) and redirect to string month view"""
    try:
        if month < 1 or month > 12:
            raise Http404("Invalid month number. Please use 1-12.")
        
        months_listed = list(months_tasks.keys())
        month_key = months_listed[month - 1]
        url = reverse('monthly_tasks_by_name', args=[month_key])
        return redirect(url)
    except (IndexError, ValueError):
        raise Http404("Invalid month number. Please use 1-12.")

# Monthly tasks by string month
def monthly_tasks_by_name(request, month):
    """Handle string month (jan, feb, etc.) and display the task"""
    try:
        task = months_tasks[month.lower()]
        return HttpResponse(f"<h1>Month {month.capitalize()}: {task}</h1><p><a href='/tasks/'>← Back to all months</a></p>")
    except KeyError:
        raise Http404(f"Invalid month '{month}'. Valid months are: {', '.join(months_tasks.keys())}")