from django.shortcuts import render
from django.views.generic import View
from .models import Todo
from django.http import JsonResponse

# Функция принимает на вход таблицу базы данных (только Todo, написана конкретно для нее) и возвращает список из словарей для каждого объекта в БД
def get_objects_table(db):
    list_objects = []
    for i in db.objects.all():
        list_objects.append({'title': i.title, 'completed': i.complete, 'PK': i.pk})
    return list_objects

# обработчик запросов для основной страницы
class BasicView(View):
    # метод GET вызывается при первичной загрузке страницы, рендерит страницу
    def get(self, request):
        # Проверка на ajax запрос, при ajax запросе, без указанного метода (update/delete), получает данные из таблицы и отправляет их в переменную todo_list медотом JsonResponse
        if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
            # Если запрост содержит delete - удаляет запись из базы данных с полученным от ajax запроса id
            if request.GET.get('my_method') == 'delete':
                a = Todo(pk = request.GET.get('id_of_item'))
                a.delete()
            # Если запрост содержит гзвфеу - обновляет значение title объекта ajax запроса id на новое значение
            if request.GET.get('my_method') == 'update':
                a = Todo(pk = request.GET.get('id_of_item'))
                a.title = request.GET.get('new_value')
                a.save()
            todos = get_objects_table(Todo)
            return JsonResponse({'todo_list': todos}, status=200)
        return render(request, 'base.html')

    # Производит анологичные действия методу GET, но для добавления новой записи в таблицу из основного inputa на странице.
    def post(self, request):
        if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
            a = Todo(title = request.POST.get('input_text'))
            a.save()
            todos = todos = get_objects_table(Todo)
            return JsonResponse({'todo_list': todos}, status=200)
