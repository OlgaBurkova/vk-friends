const allContainer = document.getElementById('results').lastElementChild;
const bestContainer = document.getElementById('best').lastElementChild;

document.addEventListener("click", function(e) {
    // Событие сработает только на кнопки
    // По умолчанию все кнопки в зоне "Ваши друзья" имеют роль add
    if (e.target.getAttribute("data-role") === "add") {
        // После нажатия кнопка меняет роль и бэкграунд
        e.target.setAttribute("data-role", "delete");
        e.target.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEBSURBVHgBjZHvjYJAEMV3h8BnSrCEu4/8CWcJdx14FZirQK8DrUCtQK0AhRDasAQ/kwC+R1yDKxonIey8md/uzltdluWoruuVUmqstd6JyF8QBCd1DbteVdWvNE0zo8CGtm2/kadsNADzft3zvKlg7ateoNA15nk+5p+5uo+RQDxaYgfiKkOAwlX3EsfxAg1z9UY4jjNJkmSnjVAUxQw7z18BMGjDtRgRrlE4P2Go38booJ5L/hPI77uqDTA0tB2Y/YR3+hS4sR0C+JC2xj7Xdbe83odd5NBRFP0MuUqQ0MEGjEsA/20Q+UGnacojp0h8fOswDB8eO8uyCTb7wpIzLS/fAJQMgU8KrwAAAABJRU5ErkJggg==')";
        // div переносится в зону "Друзья в списке"
        bestContainer.insertBefore(e.target.parentElement.parentElement, bestContainer.querySelector(".friend"));
        if (document.getElementById('inputBest').value) {
            // Если введено что-то в поле фильтра, то срабатывает фильтрация
            document.getElementById('inputBest').onkeyup();
        }
    } else {
        if (e.target.getAttribute("data-role") === "delete") {
            e.target.setAttribute("data-role", "add");
            e.target.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADFSURBVHgBjdDLDYMwDADQ2Cr3jMAIXBGnjNINukHVCTpKR0gPSBzJCBmBExc+qY0aKaAkYCnCOE9OYmjb9iGEeALAgIiqrmsrIoG03rSkc65c11V3XVem4Nf/5DBO03QnYM8wKqXsPM+KcpPD4BOttSyKQlNaBY0GeqRqmsZA2D6H4XjpFMYjlFIK6rCr0Z2HXaXvezmOo6aNKkT8WLiCKMx2NI8hgqxH23gY8cx4dhFkfe22LMuHvlnEgVeQh69/blKI4wekZ64mW8svbgAAAABJRU5ErkJggg==')";
            allContainer.insertBefore(e.target.parentElement.parentElement, allContainer.querySelector(".friend"));
            if (document.getElementById('inputAll').value) {
                document.getElementById('inputAll').onkeyup();
            }
        }
    }
});
