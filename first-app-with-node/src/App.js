import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

	const [users, setUsers] = useState([]);
	const nameRef = useRef();

	useEffect(() => {

		fetch('http://localhost:5000/users')
			.then(res => res.json())
			.then(data => setUsers(data));

	}, []);

	const handleEvent = (e) => {
		e.preventDefault();
		const name = nameRef.current.value;

		const newUser = { name };

		fetch('http://localhost:5000/users', {
			method: 'post',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(newUser)
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				const addedUser = data;
				const newUser = [...users, addedUser];
				setUsers(newUser);

				nameRef.current.value = '';

			});


	};

	return (

		<div className="App">

			<form onSubmit={handleEvent} >

				<input ref={nameRef} type="text" placeholder="Your Name" />
				<input type="submit" value="Submit" />

			</form>

			<div >

				{
					users.map(user => <h1>{user.id}. {user.name}</h1>)
				}

			</div>

		</div>

	);

}

export default App;
