import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';

test('Loading App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
