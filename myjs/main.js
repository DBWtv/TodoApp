// Определяем переменную хранящую данные, полученные от сервера
    let todo_list 

// Функция для получения csrf токена, использующегося при отправке формы на сервер
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Функция добавляющая данные получиенные от сервера на страницу
const upd = function () {

    $('.segment').empty()
    
    todo_list.forEach(element => {
        $('.segment').append('<div class="input-group mb-3 id'+element.PK+'">')
        $('.id'+element.PK+'').append('<span class="input-group-text" id="addon-wrapping'+ element.PK +'"><input type="checkbox" id="complete_'+ element.PK +'" value="'+ element.completed +'"></span>')
        $('.id'+element.PK+'').append('<input aria-describedby="addon-wrapping'+ element.PK +'" class="form-control" id="new_'+ element.PK +'" value="'+ element.title +'">')
        $('.id'+element.PK+'').append('<a type="button" class="btn btn-success upd" id="'+ element.PK +'">Update</a>')
        $('.id'+element.PK+'').append('<a type="button" class="btn btn-danger del" id="'+ element.PK +'">Delete</a>')
        $('.segment').append('</div>')
    });

}

// ajax запрос получающий данные с сервера при загрузке страницы.
$.ajax({
    type: "get",
    url: "",
    success: function (response) {
        todo_list = response.todo_list
        upd()
    }
});

$(document).ready(function(){

    // Событие при нажатие на кнопку "обновить" - отпраляет новое значение в уже имеющуюся запись в бд
    $('body').on('click', '.upd', function(e){
        $.ajax({
            type: "get",
            url: "",
            data: {
                new_value: $('#new_' + e.target.id).val(),
                my_method: 'update',
                id_of_item: e.target.id,
            },
            success: function(response){
                todo_list = response.todo_list
                upd()
            }
        });
        
    });

    // Событие при нажатии на кнопку "удалить" - отправляет id объекта в базе данных
    $('body').on('click', '.del', function(e){
        $.ajax({
            type: "get",
            url: "",
            data: {
                my_method: 'delete',
                id_of_item: e.target.id,
            },
            success: function(response){
                todo_list = response.todo_list
                upd()
            }
        });
        
    });
    
    // Событие при нажатии на кнопку "Добавить" - отправляет значение введенное в основной input и csrf token
    $('body').on('click', '.add', function(){
        $.ajax({
            type: "post",
            url: "",
            data: {
                input_text: $('.inp').val(),
                csrfmiddlewaretoken: getCookie('csrftoken')
            },
            success: function(response){
                $('.inp').val('')
                todo_list = response.todo_list
                upd()
            }
        });
        
    });

    upd()
});
