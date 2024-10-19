import React, { useState } from 'react';
import './App.css';
import { fetchUser, createUser, deleteUser, sendMoney, transactionById } from '../lib/fetchUser';
import CheckTransaction from './CheckTransaction';
import CreateForm from './CreateForm';
import LoginForm from './LoginForm';
import SendForm from './SendForm';
import DeleteForm from './DeleteForm';
import TransactionHistory from './TransactionHistory';
import financialFormat from '../lib/financialFormat';
import TransactionInfo from './TransactionInfo';
import ErrorString from './ErrorString';
import LoadingSpinner from './LoadingSpinner';

function App() {
	const [infoBannerContent, setInfoBanner] = useState(<></>);
	const [transactionHistory, setTransactionHistory] = useState(null);

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// @ts-expect-error
		const username = event.target.username.value;
		// @ts-expect-error
		const password = event.target.password.value;
		setInfoBanner(<LoadingSpinner />);
		try {
			const userData = await fetchUser(username, password);
			if (!userData.error) {
				// alert("¡Inic. ses. con éxito!");
				const { balance } = userData.result;
				setInfoBanner(
					<>
						<strong>Tu saldo es:</strong> {financialFormat(balance)} <br />
					</>
				);
			} else {
				// alert("Error.");
				console.table(userData.error);
				const {
					error: { code, description },
					status
				} = userData;
				setInfoBanner(
					<ErrorString code={code} description={description} status={status} />
				);
			}
		} catch (error) {
			setInfoBanner(
				<span style={{color: 'red'}}>
					Ha ocurrido un error de red.
					<ul>
						<li>Vuelve a intentar la operación.</li>
						<li>Verifica tu conexión a Internet.</li>
						<li>
							Si el problema persiste,{' '}
							<a href="mailto:santyrojasprieto9+bank@gmail.com">contáctanos</a>. <br />
              Adjunta la información técnica del error que se muestra a continuación: <br />
              {error.toString()}
						</li>
					</ul>
				</span>
			);
		}
	};

	const handleCheckTransaction = async (e: React.FormEvent) => {
		e.preventDefault();
		// @ts-expect-error
		const transactionId = String(e.target.id.value);
		setInfoBanner(<LoadingSpinner />);
		const results = await transactionById(
			transactionId
		);
		setInfoBanner(
			<TransactionInfo transactionObject={results.result} />
		);
	}

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		// @ts-expect-error
		const username = e.target.username.value;
		setInfoBanner(<LoadingSpinner />);
		const results = await createUser(username);
		if (!results.error) {
			// alert("¡Felicidades! ¡Ahora eres parte de nuestra base de datos!");
			setInfoBanner(
				<>
					<strong>
						NO PIERDAS NI COMPARTAS EL TOKEN. ES TU CLAVE BANCARIA.
					</strong>
					<br />
					<strong>Token bancario:</strong>{' '}
					<span style={{ fontFamily: 'monospace' }}>
						{results.result.token}
					</span>{' '}
					<button
						onClick={() => navigator.clipboard.writeText(results.result.token)}>
						Copiar token
					</button>
				</>
			);
		} else {
			// alert("Error.");
			console.table(results.error);
			const {
				error: { code, description },
				status
			} = results;
			setInfoBanner(
				<ErrorString code={code} description={description} status={status} />
			);
		}
	};

	const handleSendMoney = async (e) => {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;
		const amountString = e.target.amount.value;
		const inputPayee = e.target.payee.value;
		const inputPurpose = e.target.purpose.value;
		const inputAmount = Number(Number(amountString).toFixed(2));

		const userConfirms = confirm(
			`¿Confirmas que deseas enviar ${financialFormat(
				inputAmount
			)} a ${inputPayee}?\n
LA TRANSACCIÓN NO PUEDE SER REVERTIDA UNA VEZ EFECTUADA.`
		);
		if (!userConfirms) return;

		setInfoBanner(<LoadingSpinner />);
		try {
			const results = await sendMoney(
				username,
				password,
				inputAmount,
				inputPayee,
				inputPurpose
			);
			setInfoBanner(
				<TransactionInfo transactionObject={results.result} />
			);
		} catch (error) {
			setInfoBanner(
				<>
					Ha ocurrido un error de red.
					<ul>
						<li>Vuelve a intentar la operación.</li>
						<li>Verifica tu conexión a Internet.</li>
						<li>
							Si el problema persiste,{' '}
							<a href="mailto:santyrojasprieto9+bank@gmail.com">contáctanos</a>.
						</li>
					</ul>
				</>
			);
		}
	};

	const handleDeleteUser = async (e) => {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;
		setInfoBanner(<LoadingSpinner />);
		const userConfirms = confirm('¿Seguro que deseas borrar tu cuenta?');
		if (userConfirms) {
			const results = await deleteUser(username, password);
			if (!results.error) {
				// alert("Eliminación exitosa.");
				setInfoBanner(<>Usuario {username} eliminado.</>);
			} else {
				const {
					error: { code, description },
					status
				} = results;
				setInfoBanner(
					<ErrorString code={code} description={description} status={status} />
				);
			}
		} else {
			// alert("Operación de borrado cancelada.");
			setInfoBanner(<>Operación de borrado cancelada.</>);
		}
	};

	const handleTransactionHistory =
		(
			usernameRef: React.MutableRefObject<HTMLInputElement>,
			passwordRef: React.MutableRefObject<HTMLInputElement>
		) =>
		async (e) => {
			e.preventDefault();
			console.log(e.target);
			const username = usernameRef.current.value;
			const password = passwordRef.current.value;
			const transactionHistoryList: TransactionResponse[] = [];
			setInfoBanner(<LoadingSpinner />);
			const request: APIResponse<Transaction[]> = await fetch('https://santi-apis.onrender.com/transaction-history', {
				headers: {
					Authorization: `Basic ${btoa(`${username}:${password}`)})`
				}
			}).then((req) => req.json());
			if (request.error) {
				// alert("Error.");
				setInfoBanner(
					<ErrorString
						code={request.error.code}
						description={request.error.description}
						status={request.status}
					/>
				);
			} else {
				
				setTransactionHistory(transactionHistoryList);

				setInfoBanner(
					<TransactionHistory
						username={usernameRef.current.value}
						status={request.status}
						transactionHistory={request.result}
					/>
				);
			}
		};

	const InfoBanner = () => <>{infoBannerContent}</>;
	return (
		<div>
			<h1>Inicia sesión, regístrate y envía dinero - Banco de Santinia</h1>
			<InfoBanner />
			<CreateForm handleSignup={handleSignup} />
			<LoginForm
				handleLogin={handleLogin}
				handleTransactionHistory={handleTransactionHistory}
			/>
			<SendForm handleSendMoney={handleSendMoney} />
			<DeleteForm handleDeleteUser={handleDeleteUser} />
			<CheckTransaction handleCheckTransaction={handleCheckTransaction} />
		</div>
	);
}

export default App;
