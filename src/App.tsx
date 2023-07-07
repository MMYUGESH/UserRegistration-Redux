import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <RegistrationForm />
        <UserList />
      </div>
    </Provider>
  );
};

export default App;