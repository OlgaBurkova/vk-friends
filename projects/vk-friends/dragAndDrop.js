let currentDrag;

document.addEventListener('dragstart', (e) => {
  const zone = getCurrentZone(e.target);

  if (zone) {
    currentDrag = { startZone: zone, node: e.target };
    e.dataTransfer.setData('text/html', 'dragstart');
  }
});

document.addEventListener('dragover', (e) => {
  const zone = getCurrentZone(e.target);

  if (zone) {
    e.preventDefault();
  }
});

document.addEventListener('drop', (e) => {
  e.preventDefault();
  const zone = getCurrentZone(e.target);

  if (currentDrag) {
    if (zone && currentDrag.startZone !== zone) {
      let elem;
      if (zone.querySelector('#results')) {
        // Отпустили в зону "Ваши друзья"
        elem = zone.querySelector('#results').lastElementChild;
        // Кнопка меняет роль и бэкграунд
        currentDrag.node.querySelector('.button').setAttribute('data-role', 'add');
        currentDrag.node.querySelector('.button').style.backgroundImage =
          "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADFSURBVHgBjdDLDYMwDADQ2Cr3jMAIXBGnjNINukHVCTpKR0gPSBzJCBmBExc+qY0aKaAkYCnCOE9OYmjb9iGEeALAgIiqrmsrIoG03rSkc65c11V3XVem4Nf/5DBO03QnYM8wKqXsPM+KcpPD4BOttSyKQlNaBY0GeqRqmsZA2D6H4XjpFMYjlFIK6rCr0Z2HXaXvezmOo6aNKkT8WLiCKMx2NI8hgqxH23gY8cx4dhFkfe22LMuHvlnEgVeQh69/blKI4wekZ64mW8svbgAAAABJRU5ErkJggg==')";
        // Удаление из localStorage
        const id = currentDrag.node.getAttribute('id');
        const temp = JSON.parse(localStorage.getItem('bestFriends'));
        for (let i = 0; i < temp.length; i++) {
          if (temp[i] === id) {
            temp.splice(i, 1);
          }
        }
        localStorage.setItem('bestFriends', JSON.stringify(temp));
      } else {
        // Отпустили в зону "Друзья в списке"
        elem = zone.lastElementChild.lastElementChild;
        currentDrag.node.querySelector('.button').setAttribute('data-role', 'delete');
        currentDrag.node.querySelector('.button').style.backgroundImage =
          "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEBSURBVHgBjZHvjYJAEMV3h8BnSrCEu4/8CWcJdx14FZirQK8DrUCtQK0AhRDasAQ/kwC+R1yDKxonIey8md/uzltdluWoruuVUmqstd6JyF8QBCd1DbteVdWvNE0zo8CGtm2/kadsNADzft3zvKlg7ateoNA15nk+5p+5uo+RQDxaYgfiKkOAwlX3EsfxAg1z9UY4jjNJkmSnjVAUxQw7z18BMGjDtRgRrlE4P2Go38booJ5L/hPI77uqDTA0tB2Y/YR3+hS4sR0C+JC2xj7Xdbe83odd5NBRFP0MuUqQ0MEGjEsA/20Q+UGnacojp0h8fOswDB8eO8uyCTb7wpIzLS/fAJQMgU8KrwAAAABJRU5ErkJggg==')";
        // Добавление в localStorage
        const id = currentDrag.node.getAttribute('id');
        const storage = JSON.parse(localStorage.getItem('bestFriends')) || [];
        localStorage.setItem('bestFriends', JSON.stringify(storage.concat(id)));
      }
      if (e.target.classList.contains('friend')) {
        // Перетянули и попали на div
        elem.insertBefore(currentDrag.node, e.target.nextElementSibling);
      } else {
        if (e.target.parentElement.classList.contains('friend')) {
          // Перетянули и попали на img, надпись или кнопку
          elem.insertBefore(currentDrag.node, e.target.parentElement.nextElementSibling);
        } else {
          elem.insertBefore(currentDrag.node, elem.querySelector('.friend'));
        }
      }
      if (document.getElementById('inputBest').value) {
        // Если введено что-то в поле фильтра, то срабатывает фильтрация
        document.getElementById('inputBest').onkeyup();
      }
    }

    currentDrag = null;
  }
});

function getCurrentZone(from) {
  do {
    if (from.classList.contains('drop-zone')) {
      return from;
    }
  } while ((from = from.parentElement));

  return null;
}
