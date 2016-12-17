var arr = [
    "gallery/1.jpg",
    "gallery/2.jpg",
    "gallery/3.jpg",
    "gallery/4.jpg",
    "gallery/5.jpg",
    "gallery/6.jpg",
    "gallery/7.jpg",
    "gallery/8.jpg",
    "gallery/9.jpg",
    "gallery/10.jpg",
    "gallery/11.jpg",
    "gallery/12.jpg"
];
var to = -1;  // Счетчик, указывающий на текущую картинки

function right_arrow() // Открытие следующей картинки(движение вправо)
{
    var obj = document.getElementById("img");
    if (to < arr.length-1)  to++;
    else
        to = 0;
    obj.src = arr[to];
}

function left_arrow()
{
    var obj = document.getElementById("img");
    if (to > 0) to--;
    else
        to = arr.length-1;
    obj.src = arr[to];
}


function load()   // Ф-ция загрузки "сохраненной" картинки
{
    for (var i = 0 ; i < arr.length; i++)
    {
        if (arr[i] == cook_val)   // Как только встретилась
        {
            document.getElementById("img").src = arr[i];   // Загружаем картинку
            to = i;  // Задаем текущее значение счетчику
            break; // выходим
        }
    }
}

function revealSpinner() {
    document.getElementById('spinner').style.visibility = 'visible';
}

function concealSpinner() {
    document.getElementById('spinner').style.visibility = 'hidden';
}

function setPicture(img)
{
    for (var i = 0; i<arr.length; i++) {
        if (arr[i] === img) {
            document.getElementById("img").src = arr[i];
            to = i;
            break;
        }
    }
}

function showPicture(img) {
    setPicture(img);
    revealSpinner();
    var state = {
        selectedImage: img,
        spinnerVisible: true
    };
    var title = "My portfolio";
    var path = '/' + img;
    window.history.pushState(state, title, path);
}

function onPopstate(event) {
    var state = event.originalEvent.state;

    if (state.selectedImage && state.spinnerVisible) {
        showPicture(state.selectedImage);
    }
    else
        concealSpinner();

}