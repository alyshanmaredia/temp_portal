import React from 'react';
import {Provider} from 'react-redux';
import reducer from './reducer/indexReducer'
import {createStore} from 'redux';

const dataStore = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
function DataStore({children}) {
    return (
        <Provider store={dataStore}>
            {children}
        </Provider>
    )
}
export default DataStore;
