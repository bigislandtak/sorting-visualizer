import React from 'react';
import * as SortingAlgorithms from '../SortingAlgorithms/SortingAlgorithms.js';

import { Button, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SortingVisualizer.css';

const PRIMARY_COLOR = '#9da0b0';
const PRE_SCAN_COLOR = '#c4c3a1';
const SCAN_COLOR = '#d4d17f';
const SWAP_COLOR = '#4cba27';
const POST_SWAP_COLOR = '#8ba384';
const SORTED_COLOR = '#bd848b';
const SORTING_COMPLETE_COLOR = '#82997c';

export default class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
			arraySize: 50,
			speed: 20,
			algorithm: 'bubble',
			sorting: false,
		};
	}

	resetArray() {
		const array = [];
		const arrayBars = document.getElementsByClassName('array-bar');
		for (let i = 0; i < arrayBars.length; i++)
			arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
		for (let i = 0; i < this.state.arraySize; i++)
			array.push(random(10, 500));
		this.setState({
			array: array,
		});
	}

	componentDidMount() {
		this.resetArray();
	}

	bubbleSort() {
		const animations = SortingAlgorithms.bubbleSort(this.state.array);
		const arrayBars = document.getElementsByClassName('array-bar');
		for (let i = 0; i < animations.length; i++) {
			const bar1 = animations[i].pair[0];
			const bar2 = animations[i].pair[1];
			if (animations[i].type === 'scan') {
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRE_SCAN_COLOR;
					arrayBars[bar2].style.backgroundColor = PRE_SCAN_COLOR;
				}, i * this.state.speed);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = SCAN_COLOR;
					arrayBars[bar2].style.backgroundColor = SCAN_COLOR;
				}, i * this.state.speed + this.state.speed);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRIMARY_COLOR;
					arrayBars[bar2].style.backgroundColor = PRIMARY_COLOR;
				}, i * this.state.speed + this.state.speed * 2);
			}
			else if (animations[i].type === 'swap') {
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = SWAP_COLOR;
					arrayBars[bar2].style.backgroundColor = SWAP_COLOR;
				}, i * this.state.speed);
				setTimeout(() => {
					const tmp_height = arrayBars[bar1].style.height;
					arrayBars[bar1].style.height = arrayBars[bar2].style.height;
					arrayBars[bar2].style.height = tmp_height;
					const temp = this.state.array[bar1];
					this.state.array[bar1] = this.state.array[bar2];
					this.state.array[bar2] = temp;
				}, i * this.state.speed + this.state.speed * 2);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = POST_SWAP_COLOR;
					arrayBars[bar2].style.backgroundColor = POST_SWAP_COLOR;
				}, i * this.state.speed + this.state.speed * 4);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRIMARY_COLOR;
					arrayBars[bar2].style.backgroundColor = PRIMARY_COLOR;
				}, i * this.state.speed + this.state.speed * 6);
			}
			else {
				setTimeout(() => {
					for (let i = bar1; i < bar2; i++)
						arrayBars[i].style.backgroundColor = SORTED_COLOR;
				}, i * this.state.speed);
			}
		}
		setTimeout(() => {
			for (let i = 0; i < arrayBars.length; i++)
				arrayBars[i].style.backgroundColor = SORTING_COMPLETE_COLOR;
			this.setState({
				sorting: false,
			});
		}, animations.length * this.state.speed + this.state.speed * 10);
	}

	selectionSort() {
		const animations = SortingAlgorithms.selectionSort(this.state.array);
		const arrayBars = document.getElementsByClassName('array-bar');
		for (let i = 0; i < animations.length; i++) {
			const bar1 = animations[i].pair[0];
			const bar2 = animations[i].pair[1];
			if (animations[i].type === 'scan') {
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRE_SCAN_COLOR;
					arrayBars[bar2].style.backgroundColor = PRE_SCAN_COLOR;
				}, i * this.state.speed);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = SCAN_COLOR;
					arrayBars[bar2].style.backgroundColor = SCAN_COLOR;
				}, i * this.state.speed + this.state.speed);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRIMARY_COLOR;
					arrayBars[bar2].style.backgroundColor = PRIMARY_COLOR;
				}, i * this.state.speed + this.state.speed * 2);
			}
			else if (animations[i].type === 'swap') {
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = SWAP_COLOR;
					arrayBars[bar2].style.backgroundColor = SWAP_COLOR;
				}, i * this.state.speed);
				setTimeout(() => {
					const tmp_height = arrayBars[bar1].style.height;
					arrayBars[bar1].style.height = arrayBars[bar2].style.height;
					arrayBars[bar2].style.height = tmp_height;
					const temp = this.state.array[bar1];
					this.state.array[bar1] = this.state.array[bar2];
					this.state.array[bar2] = temp;
				}, i * this.state.speed + this.state.speed * 3);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = POST_SWAP_COLOR;
					arrayBars[bar2].style.backgroundColor = POST_SWAP_COLOR;
				}, i * this.state.speed + this.state.speed * 6);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRIMARY_COLOR;
					arrayBars[bar2].style.backgroundColor = PRIMARY_COLOR;
				}, i * this.state.speed + this.state.speed * 9);
			}
			else {
				setTimeout(() => {
					for (let i = bar1; i < bar2; i++)
						arrayBars[i].style.backgroundColor = SORTED_COLOR;
				}, i * this.state.speed);
			}
		}
		setTimeout(() => {
			for (let i = 0; i < arrayBars.length; i++)
				arrayBars[i].style.backgroundColor = SORTING_COMPLETE_COLOR;
			this.setState({
				sorting: false,
			});
		}, animations.length * this.state.speed + this.state.speed * 10);
	}

	insertionSort() {
		const animations = SortingAlgorithms.insertionSort(this.state.array);
		const arrayBars = document.getElementsByClassName('array-bar');
		for (let i = 0; i < animations.length; i++) {
			if (animations[i].type === 'scan') {
				const bar1 = animations[i].pair[0];
				const bar2 = animations[i].pair[1];
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRE_SCAN_COLOR;
					arrayBars[bar2].style.backgroundColor = PRE_SCAN_COLOR;
				}, i * this.state.speed);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = SCAN_COLOR;
					arrayBars[bar2].style.backgroundColor = SCAN_COLOR;
				}, i * this.state.speed + this.state.speed);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRIMARY_COLOR;
					arrayBars[bar2].style.backgroundColor = PRIMARY_COLOR;
				}, i * this.state.speed + this.state.speed * 2);
			}
			else {
				const bar = animations[i].target;
				setTimeout(() => {
					arrayBars[bar].style.backgroundColor = SWAP_COLOR;
				}, i * this.state.speed);
				setTimeout(() => {
					arrayBars[bar].style.height = animations[i].val + 'px';
					this.state.array[bar] = animations[i].val;
				}, i * this.state.speed + this.state.speed * 2);
				setTimeout(() => {
					arrayBars[bar].style.backgroundColor = POST_SWAP_COLOR;
				}, i * this.state.speed + this.state.speed * 4);
				setTimeout(() => {
					arrayBars[bar].style.backgroundColor = PRIMARY_COLOR;
				}, i * this.state.speed + this.state.speed * 6);
			}
		}
		setTimeout(() => {
			for (let i = 0; i < arrayBars.length; i++)
				arrayBars[i].style.backgroundColor = SORTING_COMPLETE_COLOR;
			this.setState({
				sorting: false,
			});
		}, animations.length * this.state.speed + this.state.speed * 10);
	}

	heapSort() {
		const animations = SortingAlgorithms.heapSort(this.state.array);
		const arrayBars = document.getElementsByClassName('array-bar');
		for (let i = 0; i < animations.length; i++) {
			const bar1 = animations[i].pair[0];
			const bar2 = animations[i].pair[1];
			if (animations[i].type === 'scan') {
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRE_SCAN_COLOR;
					arrayBars[bar2].style.backgroundColor = PRE_SCAN_COLOR;
				}, i * this.state.speed / 2);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = SCAN_COLOR;
					arrayBars[bar2].style.backgroundColor = SCAN_COLOR;
				}, i * this.state.speed / 2 + this.state.speed);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRIMARY_COLOR;
					arrayBars[bar2].style.backgroundColor = PRIMARY_COLOR;
				}, i * this.state.speed / 2 + this.state.speed * 2);
			}
			else if (animations[i].type === 'swap') {
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = SWAP_COLOR;
					arrayBars[bar2].style.backgroundColor = SWAP_COLOR;
				}, i * this.state.speed);
				setTimeout(() => {
					const tmp_height = arrayBars[bar1].style.height;
					arrayBars[bar1].style.height = arrayBars[bar2].style.height;
					arrayBars[bar2].style.height = tmp_height;
					const temp = this.state.array[bar1];
					this.state.array[bar1] = this.state.array[bar2];
					this.state.array[bar2] = temp;
				}, i * this.state.speed + this.state.speed * 2);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = POST_SWAP_COLOR;
					arrayBars[bar2].style.backgroundColor = POST_SWAP_COLOR;
				}, i * this.state.speed + this.state.speed * 4);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRIMARY_COLOR;
					arrayBars[bar2].style.backgroundColor = PRIMARY_COLOR;
				}, i * this.state.speed + this.state.speed * 6);
			}
			else {
				setTimeout(() => {
					for (let i = bar1; i < bar2; i++)
						arrayBars[i].style.backgroundColor = SORTED_COLOR;
				}, i * this.state.speed);
			}
		}
		setTimeout(() => {
			for (let i = 0; i < arrayBars.length; i++)
				arrayBars[i].style.backgroundColor = SORTING_COMPLETE_COLOR;
			this.setState({
				sorting: false,
			});
		}, animations.length * this.state.speed + this.state.speed * 10);
	}

	mergeSort() {
		const animations = SortingAlgorithms.mergeSort(this.state.array);
		const arrayBars = document.getElementsByClassName('array-bar');
		for (let i = 0; i < animations.length; i++) {
			const bar1 = animations[i].pair[0];
			const bar2 = animations[i].pair[1];
			if (animations[i].type === 'scan') {
				setTimeout(() => {
					//arrayBars[bar1].style.backgroundColor = PRE_SCAN_COLOR;
					arrayBars[bar2].style.backgroundColor = PRE_SCAN_COLOR;
				}, i * this.state.speed);
				setTimeout(() => {
					//arrayBars[bar1].style.backgroundColor = SCAN_COLOR;
					arrayBars[bar2].style.backgroundColor = SCAN_COLOR;
				}, i * this.state.speed + this.state.speed);
				setTimeout(() => {
					//arrayBars[bar1].style.backgroundColor = PRIMARY_COLOR;
					arrayBars[bar2].style.backgroundColor = PRIMARY_COLOR;
				}, i * this.state.speed + this.state.speed * 2);
			}
			else if (animations[i].type === 'insert'){
				setTimeout(() => {
					//arrayBars[bar1].style.backgroundColor = SWAP_COLOR;
					arrayBars[bar2].style.backgroundColor = SWAP_COLOR;
				}, i * this.state.speed);
				setTimeout(() => {
					arrayBars[bar2].style.height = animations[i].val + 'px';
					this.state.array[bar2] = animations[i].val;
				}, i * this.state.speed + this.state.speed * 2);
				setTimeout(() => {
					//arrayBars[bar1].style.backgroundColor = POST_SWAP_COLOR;
					arrayBars[bar2].style.backgroundColor = POST_SWAP_COLOR;
				}, i * this.state.speed + this.state.speed * 4);
				setTimeout(() => {
					//arrayBars[bar1].style.backgroundColor = PRIMARY_COLOR;
					arrayBars[bar2].style.backgroundColor = PRIMARY_COLOR;
				}, i * this.state.speed + this.state.speed * 6);
				if (animations[i].sorted)
					setTimeout(() => {
						arrayBars[bar2].style.backgroundColor = SORTED_COLOR;
					}, i * this.state.speed + this.state.speed * 8);
			}
		}
		setTimeout(() => {
			for (let i = 0; i < arrayBars.length; i++)
				arrayBars[i].style.backgroundColor = SORTING_COMPLETE_COLOR;
			this.setState({
				sorting: false,
			});
		}, animations.length * this.state.speed + this.state.speed * 10);
	}

	quickSort() {
		const animations = SortingAlgorithms.quickSort(this.state.array);
		const arrayBars = document.getElementsByClassName('array-bar');
		for (let i = 0; i < animations.length; i++) {
			const bar1 = animations[i].pair[0];
			const bar2 = animations[i].pair[1];
			if (animations[i].type === 'scan') {
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRE_SCAN_COLOR;
					arrayBars[bar2].style.backgroundColor = PRE_SCAN_COLOR;
				}, i * this.state.speed);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = SCAN_COLOR;
					arrayBars[bar2].style.backgroundColor = SCAN_COLOR;
				}, i * this.state.speed + this.state.speed);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRIMARY_COLOR;
					arrayBars[bar2].style.backgroundColor = PRIMARY_COLOR;
				}, i * this.state.speed + this.state.speed * 2);
			}
			else if (animations[i].type === 'swap') {
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = SWAP_COLOR;
					arrayBars[bar2].style.backgroundColor = SWAP_COLOR;
				}, i * this.state.speed);
				setTimeout(() => {
					const tmp_height = arrayBars[bar1].style.height;
					arrayBars[bar1].style.height = arrayBars[bar2].style.height;
					arrayBars[bar2].style.height = tmp_height;
					const temp = this.state.array[bar1];
					this.state.array[bar1] = this.state.array[bar2];
					this.state.array[bar2] = temp;
				}, i * this.state.speed + this.state.speed * 2);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = POST_SWAP_COLOR;
					arrayBars[bar2].style.backgroundColor = POST_SWAP_COLOR;
				}, i * this.state.speed + this.state.speed * 4);
				setTimeout(() => {
					arrayBars[bar1].style.backgroundColor = PRIMARY_COLOR;
					arrayBars[bar2].style.backgroundColor = PRIMARY_COLOR;
				}, i * this.state.speed + this.state.speed * 6);
			}
			else {
				setTimeout(() => {
					for (let i = bar1; i < bar2; i++)
						arrayBars[i].style.backgroundColor = SORTED_COLOR;
				}, i * this.state.speed);
			}
		}
		setTimeout(() => {
			for (let i = 0; i < arrayBars.length; i++)
				arrayBars[i].style.backgroundColor = SORTING_COMPLETE_COLOR;
			this.setState({
				sorting: false,
			});
		}, animations.length * this.state.speed + this.state.speed * 10);
	}

	sort() {
		this.setState({
			sorting: true,
		});
		if (this.state.algorithm === 'bubble')
			this.bubbleSort();
		else if (this.state.algorithm === 'selection')
			this.selectionSort();
		else if (this.state.algorithm === 'insertion')
			this.insertionSort();
		else if (this.state.algorithm === 'heap')
			this.heapSort();
		else if (this.state.algorithm === 'merge')
			this.mergeSort();
		else
			this.quickSort();
	}

	render() {
		const array = this.state.array.slice();

		const handleSizeChange = (value) => {
			this.state.arraySize = value;
			this.state.speed = 1000 / value;
			this.resetArray();
		}

		const handleAlgoChange = (value) => {
			this.setState({
				algorithm: value,
			});
		}

		return (
			<div className='app'>
				<div className='control-panel'>
					<div className='control-part'>
						<Button id='new-array-button' variant='outline-primary' onClick={() => this.resetArray()} disabled={this.state.sorting}>Refresh array</Button>
					</div>
					<div className='control-part'>
					    <input 
					      id="array-slider" 
					      type="range" 
					      min="25" max="200" 
					      //value={this.state.arraySize} 
					      onChange={e => handleSizeChange(e.target.value)}
					      step="5"
					      disabled={this.state.sorting}
					    />
					</div>
					<div className='control-part'>
						<ToggleButtonGroup type="radio" name="algorithms" onChange={handleAlgoChange} defaultValue={'bubble'}>
							<ToggleButton className='toggle-button' value={'bubble'}>Bubble Sort</ToggleButton>
							<ToggleButton className='toggle-button' value={'selection'}>Selection Sort</ToggleButton>
							<ToggleButton className='toggle-button' value={'insertion'}>Insertion Sort</ToggleButton>
							<ToggleButton className='toggle-button' value={'heap'}>Heap Sort</ToggleButton>
							<ToggleButton className='toggle-button' value={'merge'}>Merge Sort</ToggleButton>
						<ToggleButton className='toggle-button' value={'quick'}>Quick Sort</ToggleButton>
						</ToggleButtonGroup>
					</div>
					<div className='control-part'>
						<Button id='sort-button' variant='success' onClick={() => this.sort()} disabled={this.state.sorting}>Sort!</Button>
					</div>
				</div>

				<div className='display'>
					{array.map((val, idx) =>
						<div
							className='array-bar'
							key={idx}
							style={{
								backgroundColor: PRIMARY_COLOR,
								height: val + 'px',
								width: 880 / this.state.arraySize + 'px',
								margin: 100 / this.state.arraySize + 'px',
							}}
						/>
					)}
				</div>
			</div>
		);
	}
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

