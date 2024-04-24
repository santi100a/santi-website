import {
	fetchUser,
	createUser,
	deleteUser,
	sendMoney
} from './modules/fetchUser.js';

const signupUser = document.querySelector('form#signup input#username');
const loginUser = document.querySelector('form#login input#username');
const loginPass = document.querySelector('form#login input#password');
const loginForm = document.querySelector('form#login');
const signupForm = document.querySelector('form#signup');
const sendForm = document.querySelector('form#send');
const amountInput = document.querySelector('input#amount');
const deleteForm = document.querySelector('form#delete');
const dataBanner = document.querySelector('div#banner');
const payeeInput = document.querySelector('form#send input#payee');
const purposeInput = document.querySelector('form#send input#purpose');
const sendUser = document.querySelector('form#send input#username');
const sendPass = document.querySelector('form#send input#password');
const delUser = document.querySelector('form#delete input#username');
const delPass = document.querySelector('form#delete input#password');
const transactionBtn = document.querySelector('button#transactionBtn');

function finfmt(amount) {
	amount = Number(amount.toFixed(2));
	return Intl.NumberFormat('es-US', {
		maximumFractionDigits: 2,
		style: 'currency',
		currency: 'SED'
	}).format(amount);
}

function errorString(code, description, status = '') {
	return `
    <font color="red">
        ${messages[code] ?? '<em>(Error no especificado)</em>'}
        <br>
        <strong>Información técnica del error:</strong> <code>Error ${status} [${code}]: ${description}</code> 
    </font>
    `;
}

const messages = {
	UNAUTHORIZED_QUERY:
		'Imposible consultar: error de autenticación. Revisa el token o nombre de usuario.',
	UNAUTHORIZED_TRANSACTION:
		'Transacción no autorizada. Revisa el token o nombre de usuario.',
	UNAUTHORIZED_DELETION:
		'Imposible eliminar: error de autenticación. Revisa el token o nombre de usuario.',

	INVALID_USERNAME: 'El nombre de usuario no es válido.',
	USERNAME_TAKEN: 'El nombre de usuario no está disponible.',
	NO_SUCH_PAYER: 'El pagador especificado no existe.',
	NO_SUCH_PAYEE: 'El beneficiario especificado no existe.',
	INVALID_AMOUNT: 'El valor a enviar debe ser mayor que cero.',
	NONZERO_BALANCE:
		'Imposible eliminar: el saldo de la cuenta es mayor que cero.',
	DELETION_FORBIDDEN:
		'Imposible eliminar: la cuenta "admin" no puede ser eliminada.',
	INSUFFICIENT_FUNDS: 'Fondos insuficientes.',
	SELF_TRANSACTION: 'Imposible enviar: no puedes enviarte fondos a ti mismo/a.',
	SERVER_ERROR:
		'Error del servidor. Contacta a <santyrojasprieto+api@gmail.com>.'
};

transactionBtn.addEventListener('click', async (event) => {
	event.preventDefault();
	const menu = document.createElement('details');
	const label = document.createElement('summary');
	const list = document.createElement('ul');
	label.innerText = 'Historial de transacciones';
	menu.appendChild(label);
	const text = document.createElement('p');
	text.innerText = 'Cargando...';
	loginForm.appendChild(text);
	const [{ value: username }, { value: password }] = [loginUser, loginPass];

	const request = await fetch('https://santi-apis.onrender.com/my-info', {
		headers: {
			Authorization: `Basic ${btoa(`${username}:${password}`)})`
		}
	}).then((req) => req.json());
	if (request.error) {
		alert('Error.');
		text.innerHTML = errorString(
			request.error.code,
			request.error.description,
			request.status
		);
	} else {
		const { transaction_ids: transactionIds } = request.result;
		for (const id of transactionIds) {
			const element = document.createElement('li');
			const transactionInfo = await fetch(
				`https://santi-apis.onrender.com/transaction-info?transaction_id=${id}`,
				{
					headers: {
						Authorization: `Basic ${btoa(`${loginUser.value}:${loginPass.value}`)})`
					},
				}
			).then((req) => req.json());
            
			if (transactionInfo.error) {
				alert('Error.');
				text.innerText = errorString(
					request.error.code,
					request.error.description,
					request.status
				);
			}
			const paragraph = document.createElement('p');
			paragraph.innerHTML = `
        <strong>Id. de transacción: </strong> ${id} <br />
        <strong>Beneficio del Pagador: </strong> ${
					loginUser.value === transactionInfo.result.payer
						? `<span style="color: red;">${finfmt(
								-transactionInfo.result.amount
						  )}</span>`
						: `<span style="color: green;">${finfmt(
								transactionInfo.result.amount
						  )}</span>`
				} <br/>
        <strong>Beneficiario: </strong> ${transactionInfo.result.payee} <br />
        <strong>Por concepto de: </strong> ${transactionInfo.result.purpose} <br />
        <strong>Estado:</strong> ${
					transactionInfo.result.status === 'approved'
						? '<span style="color: green;">Aprobada</span>'
						: '<span style="color: red;">Rechazada</span>'
				} <br />
${
	transactionInfo.result.status === 'approved'
		? ''
		: errorString(
				transactionInfo.result.error.code,
				transactionInfo.result.error.description
		  )
}

        `;
			element.appendChild(paragraph);
			list.appendChild(element);
		}

        menu.appendChild(list);
		loginForm.appendChild(menu);
	}
});

loginForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const [{ value: username }, { value: password }] = [loginUser, loginPass];
	dataBanner.innerHTML = 'Cargando...';
	const userData = await fetchUser(username, password);
	if (!userData.error) {
		alert('¡Inic. ses. con éxito!');
		const { balance } = userData.result;
		dataBanner.innerHTML = `<strong>Tu saldo es:</strong> ${Intl.NumberFormat(
			'es-US',
			{
				maximumFractionDigits: 2,
				style: 'currency',
				currency: 'SED'
			}
		).format(balance)} <br>
        `;
	} else {
		alert('Error.');
		console.table(userData.error);
		const {
			error: { code, description },
			status
		} = userData;
		dataBanner.innerHTML = errorString(code, description, status);
	}
});
signupForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const { value: username } = signupUser;
	console.log(username);
	dataBanner.innerHTML = 'Cargando...';
	const results = await createUser(username);
	if (!results.error) {
		alert('¡Felicidades! ¡Ahora eres parte de nuestra base de datos!');

		dataBanner.innerHTML = `
        <strong>NO PIERDAS NI COMPARTAS EL TOKEN. ES TU CLAVE BANCARIA.</strong> <br />
        <strong>Token bancario:</strong> <span style="font-family: monospace;">${results.result.token}</span>
        <button onclick="navigator.clipboard.writeText('${results.result.token}')">Copiar token</button>
        `;
	} else {
		alert('Error.');
		console.table(results.error);
		const {
			error: { code, description },
			status
		} = results;
		dataBanner.innerHTML = errorString(code, description, status);
	}
});
sendForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const [
		{ value: username },
		{ value: password },
		{ value: amountString },
		{ value: inputPayee },
		{ value: inputPurpose }
	] = [sendUser, sendPass, amountInput, payeeInput, purposeInput];
	const inputAmount = Number(Number(amountString).toFixed(2));
	dataBanner.innerHTML = 'Cargando...';
	const results = await sendMoney(
		username,
		password,
		inputAmount,
		inputPayee,
		inputPurpose
	);
	const { id, amount, payee, purpose, status, error } = results.transaction;

	dataBanner.innerHTML = `
        <strong>Id. de transacción:</strong> ${id} <br />
        <strong>Monto enviado:</strong> ${finfmt(amount)} <br />
        <strong>Beneficiario:</strong> ${payee} <br />
        <strong>Por concepto de:</strong> ${
					purpose || '<em>(Sin concepto)</em>'
				} 
        </strong> <br />
        <strong>Estado:</strong> ${
					status === 'approved'
						? '<span style="color: green;">Aprobada</span>'
						: '<span style="color: red;">Rechazada</span>'
				} <br />
        ${
					status === 'approved'
						? ''
						: errorString(error.code, error.description)
				}
        `;
});
deleteForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const [{ value: username }, { value: password }] = [delUser, delPass];
	dataBanner.innerHTML = 'Cargando...';
	const userConfirms = confirm(
		'¿Seguro que deseas borrar tu cuenta IRREVERSIBLEMENTE?'
	);
	if (userConfirms) {
		const results = await deleteUser(username, password);
		if (!results.error) {
			alert('Eliminación exitosa.');

			dataBanner.innerText = `Usuario "${username}" eliminado.`;
		} else {
			alert('Error.');
			console.table(results.error);
			const {
				error: { code, description },
				status
			} = results;
			dataBanner.innerHTML = errorString(code, description, status);
		}
	} else {
		alert('Operación de borrado cancelada.');
		dataBanner.innerText = 'Operación de borrado cancelada.';
	}
});
