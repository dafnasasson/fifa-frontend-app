import React from 'react';
import Chart from './components/Chart';
import playersSortedByAgeAscd from './data/playersData';
import Button from '@material-ui/core/Button';
import RangeSlider from './UI/RangeSlider';
import Spinner from './UI/Spinner/Spinner';
import CONSTANTS from './constants';


const App = () => {
	const [players, setPlayers] = React.useState(playersSortedByAgeAscd);
	const [playersInCurrentAgeRange, setPlayersInCurrentAgeRange] = React.useState([]);
	const [wageRange, setWageRange] = React.useState({ min: 0, max: 100 });
	const [ageRange, setAgeRange] = React.useState({});
	const [isPlayed, setIsPlayed] = React.useState(false);
	const [spinner, setSpinner] = React.useState(false);

	const sliderValueChangedHandler = (minValue, maxValue) => {
		setWageRange({ min: minValue, max: maxValue });
	};

	const showPlayersHandler = () => {
		let intervals = [];
		setIsPlayed(true);
		setSpinner(true);

		//prepare the age group data
		for (let i = CONSTANTS.MIN_POSSIBLE_AGE; i < CONSTANTS.MIN_POSSIBLE_AGE + CONSTANTS.NUM_INTERVALS; i++) {
			intervals.push({ minAge: i, maxAge: i + CONSTANTS.AGE_INTERVAL });
		}

		let delay = CONSTANTS.DELAY;
		for (let i = 0; i < intervals.length; i++) {
			let [minAge, maxAge] = [intervals[i].minAge, intervals[i].maxAge];
			//get players in relevant ages
			let filterdPlayers = players.filter(
				(player) =>
					player.Age >= minAge &&
					player.Age <= maxAge &&
					player.Wage >= wageRange.min &&
					player.Wage <= wageRange.max
			);

			filterdPlayers = filterdPlayers.sort(() => Math.random() - Math.random()).slice(0, 30);

			setTimeout(() => {
				setAgeRange({ min: minAge, max: maxAge });
				setPlayersInCurrentAgeRange(filterdPlayers);
				if (maxAge == CONSTANTS.MAX_POSSIBLE_AGE) setIsPlayed(false);
				if (minAge == CONSTANTS.MIN_POSSIBLE_AGE) setSpinner(false);
			}, delay * i);
		}
	};
	return (
		<div style={{ marginBottom: '12vw', marginTop: '1vw', marginLeft: '12vw', marginRight: '16vw' }}>
			<div style={{ height: '500px' }}>
				<Chart
					players={playersInCurrentAgeRange}
					onShowPlayers={showPlayersHandler}
					ageRanges={{ min: ageRange.min, max: ageRange.max }}
					wageRanges={{ min: wageRange.min, max: wageRange.max }}
					onSliderChanged={sliderValueChangedHandler}
				/>
			</div>

			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '50px' }}>
				<RangeSlider onSliderChanged={sliderValueChangedHandler} disabled={isPlayed} />
				{spinner ?
					<Spinner /> :
					<Button variant="contained" size="large" color="primary" onClick={showPlayersHandler} disabled={isPlayed}>
						Play</Button>
				}
			</div>
		</div>
	);
};

export default App;
