import React from 'react';
import { render } from 'react-dom';

import UserForm from './UserForm';

const imaginaryUser = {
  email: '',
  username: '',
  imaginaryThingId: null,
};

const App = () => (
  <div className="App">
    <UserForm user={imaginaryUser} />
  </div>
);

render(<App />, document.getElementById('root'));