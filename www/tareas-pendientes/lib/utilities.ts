export function todoToListItem(
  todo: Todo,
  useEnglish: boolean,
  todos: Todo[],
  container: HTMLUListElement | HTMLOListElement
): HTMLLIElement {
  const li = document.createElement('li');
  const textSpan = document.createElement('span');
  const metadataSpan = document.createElement('span');
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('danger');
  deleteButton.addEventListener('click', () => {
    const confirmation = confirm(useEnglish ? 'Delete?' : '¿Eliminar?');
    if (confirmation) deleteTodo(todo, todos, useEnglish, container);
    localStorage.setItem('todos', JSON.stringify(todos));
  });
  deleteButton.innerText = useEnglish ? 'Delete' : 'Eliminar';
  textSpan.innerText = todo.text;
  const expirationDate = new Date(todo.expiration);
  metadataSpan.style.color = 'gray';
  metadataSpan.style.fontStyle = 'italic';
  metadataSpan.innerText =
    ' ' +
    `${new Date(todo.creation).toLocaleString()} ${
      todo.expiration === -1 ? '' : '-> ' + expirationDate.toLocaleString()
    }`;
  if (todo.expiration <= Date.now() && todo.expiration >= 0) {
    textSpan.style.fontWeight = 'bold';
  }
  li.append(textSpan, metadataSpan, deleteButton);
  li.classList.add(todo.priority?.concat('-priority'));
  return li;
}
export function deleteTodo(
  todo: Todo,
  todos: Todo[],
  useEnglish: boolean,
  container: HTMLUListElement | HTMLOListElement
) {
  const idx = todoIndex(todos, todo.id);
  todos.splice(idx, 1);
  renderTodos(container, todos, useEnglish);
}
export function removeAllChildren(element: Element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
export function renderTodos(
  container: HTMLUListElement | HTMLOListElement,
  todos: Todo[],
  useEnglish: boolean
) {
  removeAllChildren(container);
  for (const todo of todos) {
    const li = todoToListItem(todo, useEnglish, todos, container);
    container.appendChild(li);
  }
}

export function todoExists(todos: Todo[], id: string) {
  const ids: string[] = [];
  for (const { id } of todos) {
    ids.push(id);
  }
  return ids.indexOf(id) !== -1;
}
function todoIndex(todos: Todo[], id: string) {
  const ids: string[] = [];
  for (const { id } of todos) {
    ids.push(id);
  }
  return ids.indexOf(id);
}

export function generateDate(ts: number) {
  const date = new Date(ts);
  const year = date.getFullYear();
  let month: number | string = date.getMonth();
  let day: number | string = date.getDay();
  if (month < 10) month = '0'.concat(String(month));
  if (day < 10) day = '0'.concat(String(day));

  return `${year}-${month}-${day}`;
}
export type Priority = 'high' | 'medium' | 'low';
export class Todo {
  readonly text: string;
  readonly id: string;
  readonly priority: Priority;
  readonly expiration: number;
  readonly creation: number;
  constructor(
    text: string,
    id: string,
    priority: Priority,
    expiration: number,
    creation: number
  ) {
    this.text = text;
    this.id = id;
    this.priority = priority;
    this.expiration = expiration;
    this.creation = creation;
  }
}
