import { fetchUser, createUser, updateUser, deleteUser } from './modules/fetchUser.js';

const loginUser = document.querySelector('section#login input#username');
const loginPass = document.querySelector('section#login input#password');
const loginBtn = document.querySelector('button#loginBtn');
const signupUser = document.querySelector('section#signup input#username');
const signupPass = document.querySelector('section#signup input#password');
const nam = document.querySelector('section#signup input#name');
const fname = document.querySelector('section#signup input#fullname');
const ema = document.querySelector('section#signup input#email');

const signupBtn = document.querySelector('button#signupBtn');
const updateBtn = document.querySelector('button#updateBtn');
const deleteBtn = document.querySelector('button#deleteBtn');
const dataBanner = document.querySelector('div#banner');

loginBtn.addEventListener('click', async () => {
    const [ { value: username }, { value: password } ] = [ loginUser, loginPass ];
    dataBanner.innerHTML = 'Cargando...';
    const userData = await fetchUser(username, password);
    if (!userData.error) {
        alert('¡Inic. ses. con éxito!'); 
        const { email, name, fullname } = userData;
        dataBanner.innerHTML = `
        <strong>Nombre:</strong> ${name}. <br>
        <strong>Nombre completo:</strong> ${fullname}. <br>
        <strong>Correo electrónico:</strong> ${email}. 
        `;
    }
    else {
        alert('Error.')
        console.table(userData.error);
        const { status, statusText, error: { message, details } } = userData;
        dataBanner.innerHTML = `
        <font color="red">
            <strong>Estado HTTP:</strong> ${status} ${statusText}. <br>
            <strong>Mensaje:</strong> ${message}. <br>
            <strong>Detalles:</strong> ${details}
        </font>
        `
    }
});
signupBtn.addEventListener('click', async () => {
    const [ 
        { value: username }, 
        { value: password }, 
        { value: name },
        { value: fullName },
        { value: email },
    ] = [ signupUser, signupPass, nam, fname, ema ];
    dataBanner.innerHTML = 'Cargando...';
    const results = await createUser(username, password, { name, fullName, email });
    if (!results.error) {
        alert('¡Felicidades! ¡Ahora eres parte de nuestra base de datos!'); 
        
        dataBanner.innerHTML = `
        <strong>Nombre:</strong> ${name}. <br>
        <strong>Nombre completo:</strong> ${fullName}. <br>
        <strong>Correo electrónico:</strong> ${email}. 
        `;
    }
    else {
        alert('Error.')
        console.table(results.error);
        const { status, statusText, error: { message, details } } = results;
        dataBanner.innerHTML = `
        <font color="red">
            <strong>Estado HTTP:</strong> ${status} ${statusText}. <br>
            <strong>Mensaje:</strong> ${message}. <br>
            <strong>Detalles:</strong> ${details}
        </font>
        `
    }
});
updateBtn.addEventListener('click', async () => {
    const [ 
        { value: username }, 
        { value: password }, 
        { value: name },
        { value: fullName },
        { value: email },
    ] = [ signupUser, signupPass, nam, fname, ema ];
    dataBanner.innerHTML = 'Cargando...';
    const results = await updateUser(username, password, { name, fullname: fullName, email });
    if (!results.error) {
        alert('Actualización exitosa.'); 
        const { name: n, fullname: f, email: e } = results.newData;
        console.log(results.newData);
        
        dataBanner.innerHTML = `
        <strong>Nombre:</strong> ${n}. <br>
        <strong>Nombre completo:</strong> ${f}. <br>
        <strong>Correo electrónico:</strong> ${e}. 
        `;
    }
    else {
        alert('Error.')
        console.table(results.error);
        const { status, statusText, error: { message, details } } = results;
        dataBanner.innerHTML = `
        <font color="red">
            <strong>Estado HTTP:</strong> ${status} ${statusText}. <br>
            <strong>Mensaje:</strong> ${message}. <br>
            <strong>Detalles:</strong> ${details}
        </font>
        `
    }
});
deleteBtn.addEventListener('click', async () => {
    const [ 
        { value: username }, 
        { value: password }
    ] = [ signupUser, signupPass ];
    dataBanner.innerHTML = 'Cargando...';
    const userConfirms = confirm('¿Seguro que deseas borrar tu cuenta IRREVERSIBLEMENTE?');
    if (userConfirms) {
        const results = await deleteUser(username, password);
        if (!results.error) {
            alert('Eliminación exitosa.'); 
            
            dataBanner.innerHTML = `
            Usuario eliminado.
            `;
        }
        else {
            alert('Error.')
            console.table(results.error);
            const { status, statusText, error: { message, details } } = results;
            dataBanner.innerHTML = `
            <font color="red">
                <strong>Estado HTTP:</strong> ${status} ${statusText}. <br>
                <strong>Mensaje:</strong> ${message}. <br>
                <strong>Detalles:</strong> ${details}
            </font>
            `
        }
    } else {
        alert('Operación de borrado cancelada.')
        dataBanner.innerHTML = 'Operación de borrado cancelada.'
    }
});