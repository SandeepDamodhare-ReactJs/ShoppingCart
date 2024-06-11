//App.js

import React, { useState } from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent';
import ShowCourseComponent from './components/ShowCourseComponent';
import UserCartComponent from './components/UserCartComponent';

function App() {
	const [courses, setCourses] = useState([
		{ id: 1, 
		name: 'Rolls-Royce', 
		price: 35080000, 
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxu4JDtMoTEqRd09ak0Ke8wCQhzNX7gfB6Hg&s'
		},
		{ id: 2, 
		name: 'Mercedes', 
		price: 12358000, 
		image: 
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ47T6i-M2y2gx7LKLIsycMYELgo19QS66xEQ&s'
		},
		{ id: 3, 
		name: 'Maruti', 
		price: 290000, 
		image: 
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBRdcYP2oncznO9JpecI3abNUJd7RhrBbZpQ&s'
		},
		
		{ id: 4, 
			name: 'BMW', 
			price: 24358000, 
			image: 
	'https://akm-img-a-in.tosshub.com/businesstoday/images/story/201502/bmw_660_021915014858.jpg?size=948:533'
			},
	]);

	const [cartCourses, setCartCourses] = useState([]);
	const [searchCourse, setSearchCourse] = useState('');

	const addCourseToCartFunction = (GFGcourse) => {
		const alreadyCourses = cartCourses
							.find(item => item.product.id === GFGcourse.id);
		if (alreadyCourses) {
			const latestCartUpdate = cartCourses.map(item =>
				item.product.id === GFGcourse.id ? { 
				...item, quantity: item.quantity + 1 } 
				: item
			);
			setCartCourses(latestCartUpdate);
		} else {
			setCartCourses([...cartCourses, {product: GFGcourse, quantity: 1}]);
		}
	};

	const deleteCourseFromCartFunction = (GFGCourse) => {
		const updatedCart = cartCourses
							.filter(item => item.product.id !== GFGCourse.id);
		setCartCourses(updatedCart);
	};

	const totalAmountCalculationFunction = () => {
		return cartCourses
			.reduce((total, item) => 
						total + item.product.price * item.quantity, 0);
	};

	const courseSearchUserFunction = (event) => {
		setSearchCourse(event.target.value);
	};

	const filterCourseFunction = courses.filter((course) =>
		course.name.toLowerCase().includes(searchCourse.toLowerCase())
	);

	return (
		<div className="App">
			<SearchComponent searchCourse={searchCourse} 
							courseSearchUserFunction=
								{courseSearchUserFunction} />
			<main className="App-main">
				<ShowCourseComponent
					courses={courses}
					filterCourseFunction={filterCourseFunction}
					addCourseToCartFunction={addCourseToCartFunction}
				/>

				<UserCartComponent
					cartCourses={cartCourses}
					deleteCourseFromCartFunction={deleteCourseFromCartFunction}
					totalAmountCalculationFunction={
						totalAmountCalculationFunction
					}
					setCartCourses={setCartCourses}
				/>
			</main>
		</div>
	);
}

export default App;
