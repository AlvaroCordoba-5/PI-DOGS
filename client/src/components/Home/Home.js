import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllDogs,
	getDogDetail,
	orderByAlphabet,
	FilterByWeight,
	getAllTemperaments,
	FilterByTemperament,
	FilterApiOrDatabase,
	removeDetail
} from '../../redux/action';
import { Link } from 'react-router-dom';
import Card from '../Card/Card.js';
import NavBar from '../NavBar/NavBar';
import Paginado from '../Paginado/Paginado';
import Loading from '../Loading/Loading';
import ima from './dog-time400.gif';

import './Home.css';

export default function Home() {
	const dispatch = useDispatch();
	const allDogs = useSelector((state) => state.dogs);
	const allTemperaments = useSelector((state) => state.temperaments);
	const [ orden, setOrden ] = useState('');
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ dogsPerPage, setDogsPerPage ] = useState(8);
	const indexOfLastDog = currentPage * dogsPerPage;
	const indexOfFirstDog = indexOfLastDog - dogsPerPage;
	const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog);
	const [ name, setName ] = useState('');

	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	

	useEffect(
		() => {
			dispatch(getAllDogs());
			dispatch(removeDetail());
			dispatch(getAllTemperaments());
		},
		[ dispatch ]
	);


	

	function handleClick(e) {
		
		e.preventDefault();
		dispatch(getAllDogs());
		setCurrentPage(1);
	}

	const handleInputChange = (e) => {
		e.preventDefault();
		setName(e.target.value);
	};
	

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(getDogDetail(name));
		setName('');
		setCurrentPage(1);
	};
	

	const handleSort = (e) => {
		e.preventDefault();
		dispatch(orderByAlphabet(e.target.value));
		setCurrentPage(1);
		setOrden(`Ordenado ${e.target.value}`);
	};

	const handleFilterW = (e) => {
		e.preventDefault();
		dispatch(FilterByWeight(e.target.value));
		setCurrentPage(1);
		setOrden(`Ordenado ${e.target.value}`);
	};

	const handleFilterT = (e) => {
		e.preventDefault();
		dispatch(FilterByTemperament(e.target.value));
	};

	const handleFilterA = (e) => {
		e.preventDefault();
		dispatch(FilterApiOrDatabase(e.target.value));
		setCurrentPage(1);
	};

	return (
		<React.Fragment>
			<NavBar />
			

			<form className="searchdog">
				<div className="contSearch">
					<input
						className="input"
						type="text"
						name="name"
						value={name}
						placeholder="SearchDog..."
						onChange={(e) => handleInputChange(e)}
					/>

					<input className="input" type="submit" value="Search" onClick={(e) => handleSubmit(e)} />
				
				</div>
			</form>

	

			<div className="filtros">
				<div className="Temperament">
					<select className="selects" onChange={(e) => handleFilterT(e)}>
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

				<div>
					<select className="selects" onChange={(e) => handleFilterA(e)}>
						<option value="Api">Dogs Api</option>
						<option value="Data Base">Dogs Data Base</option>
					</select>
				</div>

				<div>
					<select className="selects" onChange={(e) => handleSort(e)}>
						<option value="acs">Sort A-Z</option>
						<option value="des">Sort Z-A</option>
					</select>
				</div>

				<div>
					<select className="selects " onChange={(e) => handleFilterW(e)}>
						<option value="asc">Sort Weight Min</option>
						<option value="des">Sort Weight Max</option>
					</select>
				</div>

				<button
					className="input"
					onClick={(e) => {
						handleClick(e);
					}}
				>
					Reset Filters
				</button>
			</div>

			<div className="containerall">
				<div className="container-card">
					{currentDog.length ? (
						currentDog.map((d) => {
							if (typeof d.id === 'string') {
								if (d.temperaments.length >= 1) {
									let tem = d.temperaments.map((c) => c.name).toString();
									
									return (
										<Link to={'Home/' + d.id}>
											<Card
												name={d.name}
												weight_min={d.weight_min}
												weight_max={d.weight_max}
												temperaments={tem}
												image={
													d.image ? (
														d.image
													) : (
														(d.image =
															'https://i.pinimg.com/originals/28/1a/af/281aaf73c5b37d8be3b0ed20caade1c9.jpg')
													)
												}
												key={d.id}
												id={d.id}
											/>
										</Link>
									);
								}
							}
							return (
								<Link to={'Home/' + d.id}>
									<Card
										name={d.name}
										weight_min={d.weight_min}
										weight_max={d.weight_max}
										temperaments={d.temperament}
										key={d.id}
										image={d.image}
										id={d.id}
									/>
								</Link>
							);
						})
					) : (
						<div className="loadhome">
						<Loading image={ima} text='No Dogs Available'/>
						</div>
					)}
				</div>
			</div>
			<div className="paginado">
				<Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
			</div>
		</React.Fragment>
	);
}
