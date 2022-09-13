import { useEffect, useState } from 'preact/hooks';
import type { ChangeEvent, FormEvent } from 'react';
import './generator-styles.css';
import generatorObject from './genArray';

const StrengthGauge = ({ gaugeFill }: { gaugeFill: boolean }) => {
	console.log(gaugeFill);

	return (
		<span className={`strength-gauge ${gaugeFill ? 'filled' : ''}`}></span>
	);
};

export const Generator = () => {
	const [password, setPassword] = useState<string>('hj12frjah!"#h');
	const [charLength, setCharLength] = useState<number>(12);
	const [uppercase, setUppercase] = useState<boolean>(true);
	const [lowercase, setLowercase] = useState<boolean>(false);
	const [numbers, setNumbers] = useState<boolean>(false);
	const [symbols, setSymbols] = useState<boolean>(false);

	const genRandomNumb = (interval: number) => {
		return Math.floor(Math.random() * interval);
	};

	const genOptions = [
		{ name: 'uppercase', value: uppercase },
		{ name: 'lowercase', value: lowercase },
		{ name: 'symbols', value: symbols },
		{ name: 'numbers', value: numbers },
	];

	const strengthNumber = genOptions.reduce((prev, curr) => {
		if (curr.value === true) {
			return (prev += 1);
		}
		return prev;
	}, 0);

	console.log(strengthNumber);

	if (!uppercase && !lowercase && !symbols && !numbers) {
		setUppercase(true);
		alert('At least one modulator needs to be selected');
	}

	const genPassword = (length: number) => {
		const passwordLengthArr = new Array(length).fill('0');

		let genArray: string[] = [];

		genOptions.forEach((opt) => {
			return opt.value === true
				? (genArray = [...genArray, ...generatorObject[opt.name]])
				: null;
		});

		let password: string = '';
		passwordLengthArr.forEach((_) => {
			const randomNumb = genRandomNumb(genArray.length);
			return (password += genArray[randomNumb]);
		});
		return password;
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = e.currentTarget;

		if (name === 'uppercase' && typeof checked === 'boolean')
			return setUppercase(checked);

		if (name === 'lowercase' && typeof checked === 'boolean')
			return setLowercase(checked);

		if (name === 'numbers' && typeof checked === 'boolean')
			return setNumbers(checked);

		if (name === 'symbols' && typeof checked === 'boolean')
			return setSymbols(checked);

		if (name === 'characters' && typeof value === 'string')
			return setCharLength(parseInt(value));
	};

	const clickToGenerate = (e: FormEvent) => {
		e.preventDefault();
		setPassword(genPassword(charLength));
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(password);
	};

	useEffect(() => {
		setPassword(genPassword(charLength));
	}, [charLength, uppercase, lowercase, numbers, symbols]);

	return (
		<div className='generator'>
			<h1 className='title'>password generator</h1>
			<div className='flex header'>
				<p className='generated-pw'>{password}</p>
				<button className='copy-button' onClick={copyToClipboard}>
					Copy
				</button>
			</div>
			<form onSubmit={clickToGenerate}>
				<div>
					<div className='flex'>
						<label id='characters' htmlFor='characters'>
							character length
						</label>
						<p>{charLength}</p>
					</div>
					<input
						type='range'
						onChange={handleChange}
						min={5}
						max={20}
						value={charLength}
						id='characters'
						name='characters'
					/>
				</div>
				<div className='checkboxes'>
					<div>
						<input
							type='checkbox'
							id='includeUppercase'
							name='uppercase'
							onChange={handleChange}
							checked={uppercase}
						/>
						<label htmlFor='includeUppercase'>include uppercase letters</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='includeLowercase'
							name='lowercase'
							onChange={handleChange}
							checked={lowercase}
						/>
						<label htmlFor='includeLowercase'>include lowercase letters</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='includeNumbers'
							name='numbers'
							onChange={handleChange}
							checked={numbers}
						/>
						<label htmlFor='includeNumbers'>include Numbers</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='includeSymbols'
							name='symbols'
							onChange={handleChange}
							checked={symbols}
						/>
						<label htmlFor='includeSymbols'>include Symbols</label>
					</div>
				</div>
				<div className='strength'>
					<p>strength</p>
					<div className='strength-gauges'>
						{genOptions.map((_, i) => {
							console.log(i + 1);

							return (
								<StrengthGauge
									gaugeFill={i + 1 <= strengthNumber && charLength >= 8}
								/>
							);
						})}
					</div>
				</div>
				<button className='submit-button' type='submit'>
					generate
				</button>
			</form>
		</div>
	);
};
