import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createDog, getAllTemperaments } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Card from '../Card/Card';
import './CreateDog.css';

function validate(input) {
	let errors = {};
	if (!input.name) {
		errors.name = 'name is requiere';
	} 
  if (!input.life) {
		errors.life = 'life is requiere';
	} else if (!input.height_min) {
		errors.height_min = 'height min is requiere';
	} else if (!input.height_max) {
		errors.height_max = 'height max is requiere ';
	}else if(input.height_max<input.height_min){
		errors.height_max="can't be less than height min";
	} else if (!input.weight_min) {
		errors.weight_min = 'weight_min is requiere ';
	} else if (!input.weight_max) {
		errors.weight_max = 'weight_max is requiere ';
	} else if (input.weight_max < input.weight_min) {
		errors.weight_min = "can't be less than weight min";
	} else if (input.temperaments.length === 0) {
		errors.temperaments = 'Please choose one or more temperament';
	}

	return errors;
}

export default function CreateDog() {
	const dispatch = useDispatch();
	const history = useHistory();
	const allTemperaments = useSelector((state) => state.temperaments);

	const [ errors, setErrors ] = useState({ name: 'Please complete all the fields' });
	const [ input, setInput ] = useState({
		name: '',
		image: '',
		temperaments: [],
		height_min: '',
		height_max: '',
		weight_min: '',
		weight_max: '',
		life: ''
	});

	useEffect(
		() => {
			
			dispatch(getAllTemperaments());
		},
		[ dispatch ]
	);

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value
			})
		);
	};

	const handleSelect = (e) => {
		setInput({
			...input,
			temperaments: [ ...input.temperaments, e.target.value ]
		});
		setErrors(
			validate({
				...input,
				temperaments: [ ...input.temperaments, e.target.value ]
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			!errors.name &&
			!errors.life &&
			!errors.height_min &&
			!errors.height_max &&
			!errors.weight_max &&
			!errors.weight_max &&
			!errors.temperaments
		) {
			dispatch(createDog(input));
			alert('Dog Created!');
			setInput({
				name: '',
				image: '',
				temperaments: [],
				height_min: '',
				height_max: '',
				weight_min: '',
				weight_max: '',
				life: ''
			});
			history.push('/Home');
		} else {
			alert('Faltan Datos');
		}
	};

	const handleDelete = (el) => {
		setInput({
			...input,
			temperaments: input.temperaments.filter((aux) => aux !== el)
		});
	};

	return (
		<React.Fragment>
			<NavBar />

			<div className="box">
				<form className="form" onSubmit={(e) => handleSubmit(e)}>
					<h1>Create your Dog</h1>
					{errors.name && <h4 className="error">{errors.name}</h4>}

					<div className="inputs">
						<input
							className="input"
							type="text"
							value={input.name}
							name="name"
							placeholder="Name..."
							onChange={handleChange}
						/>
					</div>

					<div className="inputs">
						<input
							className="input"
							type="text"
							value={input.life}
							name="life"
							placeholder="Life Span..."
							onChange={handleChange}
						/>
						{errors.life && <p>{errors.life}</p>}
					</div>
					<div className="inputs">
						<input
							className="input"
							type="text"
							value={input.height_min}
							name="height_min"
							placeholder="Height Min..."
							onChange={handleChange}
						/>
						{errors.height_min && <p>{errors.height_min}</p>}
					</div>

					<div className="inputs">
						<input
							className="input"
							type="text"
							value={input.height_max}
							name="height_max"
							placeholder="Height Max..."
							onChange={handleChange}
						/>
						{errors.height_max && <p>{errors.height_max}</p>}
					</div>

					<div className="inputs">
						<input
							className="input"
							type="text"
							value={input.weight_min}
							name="weight_min"
							placeholder="Weight Min..."
							onChange={handleChange}
						/>
						{errors.weight_min && <p>{errors.weight_min}</p>}
					</div>
					<div className="inputs">
						<input
							className="input"
							type="text"
							value={input.weight_max}
							name="weight_max"
							placeholder="Weight Max..."
							onChange={handleChange}
						/>
						{errors.weight_max && <p>{errors.weight_max}</p>}
					</div>

					<div className="inputs">
						<input
							className="input"
							type="text"
							value={input.image}
							name="image"
							placeholder="Image Url..."
							onChange={handleChange}
						/>
					</div>

					<div className="temcontainer">
						{errors.temperaments && <p>{errors.temperaments}</p>}

						<h4>Choose one or more temperaments:</h4>

						<select onChange={(e) => handleSelect(e)}>
							{allTemperaments &&
								allTemperaments.map((e) => {
									return (
										<option key={e.id} value={e.name}>
											{e.name}
										</option>
									);
								})}
						</select>
					</div>
					<button className="bot" type="submit">
						Create Dog
					</button>
				</form>

				<div className="card1">
					<h1>Look how it's doing</h1>
					<Card
						image={
							input.image ? (
								input.image
							) : (
								'https://i.pinimg.com/originals/28/1a/af/281aaf73c5b37d8be3b0ed20caade1c9.jpg'
							)
						}
						name={input.name}
						temperaments={input.temperaments.toString()}
						weight_min={input.weight_min}
						weight_max={input.weight_max}
					/>
				</div>
			</div>

			<div className="tempCont">
				{input.temperaments.map((el) => (
					<div className="delete">
						<h4>{el}</h4>
						<button className="but" onClick={() => handleDelete(el)}>
							x
						</button>
					</div>
				))}
			</div>
		</React.Fragment>
	);
}
