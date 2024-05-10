import './index.css';
import { Todo, Priority, renderTodos } from '../lib/utilities';
import { randomUUID } from '@santi100/random-lib/cjs/random-uuid';

const jsonTodos = localStorage.getItem('todos');
const todos: Todo[] = jsonTodos === null ? [] : JSON.parse(jsonTodos);
const useEnglish = !navigator.language.includes('es-');

const ul = document.querySelector('ul')!;
const form: HTMLFormElement = document.querySelector('form#todo-form')!;
const input: HTMLInputElement = document.querySelector('input#todo-input')!;
const button: HTMLInputElement = document.querySelector('input#todo-submit')!;
const deleteAllTodos: HTMLButtonElement =
  document.querySelector('button#delete-all')!;
const expirationDateInput: HTMLInputElement =
  document.querySelector('input#date')!;
const expirationTimeInput: HTMLInputElement =
  document.querySelector('input#time')!;

const enableNotificationsButton: HTMLButtonElement = document.querySelector(
  'button#enable-notifications'
)!;
const toolSummary = document.querySelector('summary')!;
const prioritySelector: HTMLSelectElement = document.querySelector(
  'select#priority-selector'
)!;
const highPriority: HTMLOptionElement = document.querySelector(
  'option.high-priority'
)!;
const mediumPriority: HTMLOptionElement = document.querySelector(
  'option.medium-priority'
)!;
const lowPriority: HTMLOptionElement = document.querySelector(
  'option.low-priority'
)!;
const priorityLabel: HTMLLabelElement = document.querySelector(
  'label[for="priority-selector"]'
)!;
const expirationDateLabel: HTMLLabelElement =
  document.querySelector('label[for="date"]')!;
const expirationTimeLabel: HTMLLabelElement =
  document.querySelector('label[for="time"]')!;
const description: HTMLMetaElement = document.querySelector('meta#desc')!;
enableNotificationsButton.addEventListener('click', () => {
  Notification.requestPermission();
});

if (!useEnglish) {
  document.title = 'Lista de pendientes';
  description.content = 'Tareas pendientes';
  highPriority.innerText = 'Prioridad alta';
  mediumPriority.innerText = 'Prioridad media';
  lowPriority.innerText = 'Prioridad baja';
  priorityLabel.innerText = 'Prioridad: ';
  expirationDateLabel.innerText = 'Fecha de expiración: ';
  expirationTimeLabel.innerText = 'Hora de expiración: ';
  enableNotificationsButton.innerText = 'Activar notificaciones';
  input.placeholder = 'Escribe tu pendiente...';
  button.value = 'Agregar pendiente';
  toolSummary.innerText = 'Otras opciones';
  deleteAllTodos.innerText = 'Eliminar TODOS los pendientes';
}
if (Notification.permission === 'granted') {
  enableNotificationsButton.innerText = useEnglish
    ? 'Disable Notifications'
    : 'Desactivar notificaciones';
}
if (Notification.permission === 'denied') {
  enableNotificationsButton.innerText = useEnglish
    ? 'Notifications Blocked by Browser'
    : 'Notificaciones bloqueadas por navegador';
  enableNotificationsButton.disabled = true;
}

if (typeof window.Notification === 'undefined') {
  enableNotificationsButton.hidden = true;
}

const todoChannel = new BroadcastChannel('todos');
const useEnglishChannel = new BroadcastChannel('use-english');

useEnglishChannel.postMessage(`{"useEnglish":${useEnglish}}`);
todoChannel.postMessage(JSON.stringify(todos));
renderTodos(ul, todos, useEnglish);

form.addEventListener('submit', event => {
  event.preventDefault();
  const uuid = randomUUID();
  const expirationString = `${expirationDateInput.value}T${expirationTimeInput.value}`;
  const expirationDate = new Date(expirationString);
  const expiration =
    expirationDate.toUTCString() === 'Invalid Date'
      ? -1
      : expirationDate.getTime();
  const creation = Date.now();
  const todo = new Todo(
    input.value,
    uuid,
    prioritySelector.value as Priority,
    expiration,
    creation
  );
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(ul, todos, useEnglish);
  input.value = '';
  todoChannel.postMessage(JSON.stringify(todos));
});

deleteAllTodos.addEventListener('click', () => {
  const confirmation1 = confirm(
    useEnglish
      ? 'Delete ALL todos permanently?'
      : '¿Eliminar TODOS los pendientes permanentemente?'
  );
  if (!confirmation1) return;
  const confirmation2 = confirm(
    useEnglish
      ? 'The deletion CANNOT BE UNDONE. Continue?'
      : 'La eliminación NO SE PUEDE DESHACER. ¿Continuar?'
  );
  if (confirmation1 && confirmation2) {
    todos.length = 0;
    renderTodos(ul, todos, useEnglish);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
});

if (Notification.permission === 'granted') {
  enableNotificationsButton.innerText = useEnglish
    ? 'Disable Notifications'
    : 'Desactivar notificaciones';
}
