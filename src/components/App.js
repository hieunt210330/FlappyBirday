import React from 'react';
import {Provider} from 'react-redux';
import Home from './Home';
import Game from './Game';

const App = ({store}) => {

return (
	<div className='app'>
	<Provider store ={store}>
		<Home/>
	</Provider>
	</div>
);
};

export default App;