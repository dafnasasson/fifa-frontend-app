import React from 'react';
import './App.css';
import Chart from './components/Chart';
import playersSortedByAgeAscd from './data/playersData';

const App = () => {
	const [ players, setPlayers ] = React.useState(playersSortedByAgeAscd);
	const [ playersInCurrentAgeRange, setPlayersInCurrentAgeRange ] = React.useState([]);
	const [ ageRange, setAgeRange ] = React.useState({});

	const showPlayersHandler = () => {
		let intervals = [];

		//prepare the age group data
		for (let i = 15; i < 30; i++) {
			intervals.push({ minAge: i, maxAge: i + 5 });
		}

		let delay = 5000;
		for (let i = 0; i < intervals.length; i++) {
			let [ min, max ] = [ intervals[i].minAge, intervals[i].maxAge ];
			//get players in relevant ages
			let playerz = players.filter((player) => player.Age >= min && player.Age <= max);

			playerz = playerz.sort(() => Math.random() - Math.random()).slice(0, 30);

			setTimeout(() => {
				setAgeRange({ min: min, max: max });
				setPlayersInCurrentAgeRange(playerz);
			}, delay * i);
		}
	};
	return (
		<div className="App">
			<Chart
				players={playersInCurrentAgeRange}
				onShowPlayers={showPlayersHandler}
				ageRanges={{ min: ageRange.min, max: ageRange.max }}
			/>
		</div>
	);
};

export default App;
