import React from 'react';
import {Provider} from 'react-redux';
import Display from './Display';
import Game from './Game';

const App = ({store}) => {

return (
	<div className='app'>
	<Provider store ={store}>
		<Display/>
	</Provider>
	</div>
);
};

export default App;