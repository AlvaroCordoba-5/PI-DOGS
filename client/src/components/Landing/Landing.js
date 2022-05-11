import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import DogPhoto from '../Landing/FondoAzulDegradadoCentro(1).png';
import photodog from '../Landing/dog.png';

/*<div className='landText'>
<h1>Welcome <br></br> To Henry Dogs</h1>

</div>*/

export default function landing() {
	return (
		<React.Fragment>
			<div className="Contenedor">
				<img className="landimage" src={DogPhoto} alt="Dog" />
				<div className="texto-encima">
					<img src={photodog} alt="Dog" />
					<h1>
						Welcome <br /> To Henry Dogs
					</h1>
					<Link className="link" to="/Home">
						Home
					</Link>
				</div>
			</div>
		</React.Fragment>
	);
}
