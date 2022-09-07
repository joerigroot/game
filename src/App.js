import React, { useState, useEffect, useRef } from 'react';

const CountryCapitalGame = () => {
	const answersArray = [
		{
			country: 'Germany',
			capital: 'Berlin',
		},
		{
			country: 'Azerbajan',
			capital: 'Baku',
		},
		{
			country: 'England',
			capital: 'London',
		},
		{
			country: 'Netherlands',
			capital: 'Amsterdam',
		},
	];
	let randomAnswers = answersArray
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);

	const [answers, setAnswers] = useState(randomAnswers);
	const [activeChoice, setActiveChoice] = useState(0);
	const [firstChoice, setFirstChoice] = useState('');
	const [secondChoice, setSecondChoice] = useState('');
	const [indexCountry, setIndexCountry] = useState();
	const [indexCapital, setIndexCapital] = useState();
	const [change, setChange] = useState(false);

	const handleClick = (event) => {
		event.preventDefault();
		event.target.style.backgroundColor = '#0000ff';

		let value = event.target.value;
		if (activeChoice === 0) {
			setActiveChoice(1);
			setFirstChoice(value);
		} else if (activeChoice === 1) {
			setActiveChoice(0);
			setSecondChoice(value);
			let buttons = document.querySelectorAll('button');
			buttons.forEach((button) => {
				button.style.backgroundColor = 'transparent';
			});
			setChange(!change);
		}
	};

	useEffect(() => {
		answers.map((item, index) => {
			if (activeChoice === 0) {
				item.country === firstChoice && setIndexCountry(index);
				item.capital === firstChoice && setIndexCapital(index);
				item.country === secondChoice && setIndexCountry(index);
				item.capital === secondChoice && setIndexCapital(index);
			}
		});
	}, [activeChoice]);

	useEffect(() => {
		if (indexCountry === indexCapital) {
			setAnswers(
				answers.filter(
					(item) =>
						item.country !== firstChoice && item.country !== secondChoice
				)
			);
			setAnswers(
				answers.filter(
					(item) =>
						item.capital !== firstChoice && item.capital !== secondChoice
				)
			);
		}
	}, [indexCountry, indexCapital, change]);

	const countriesMap = answers.map((item, index) => {
		return (
			<button
				key={index}
				value={item.country}
				onClick={(event) => handleClick(event)}
			>
				{item.country}
			</button>
		);
	});

	const capitalsMap = answers.map((item, index) => {
		return (
			<button
				key={index}
				value={item.capital}
				onClick={(event) => handleClick(event)}
			>
				{item.capital}
			</button>
		);
	});

	return (
		<div>
			{countriesMap}
			{capitalsMap}
			{answers.length === 0 && <div>Congratulations</div>}
		</div>
	);
};

export default CountryCapitalGame;
