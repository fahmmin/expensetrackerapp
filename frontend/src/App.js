import React, {useState, useEffect } from 'react';
import styled from 'styled-components';
import { MainLayout } from './styles/Layouts';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Transactions from './Components/ViewTransactions/ViewTransactions';
import { useGlobalContext } from './context/globalContext';
import Landing from './Components/Landing/landing';

const App = () => {
  const [active, setActive] = useState(false);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    // Fetch user data from the users collection
    const fetchUserData = async () => {
      const response = await fetch('/api/user'); // Replace with your API endpoint
      const data = await response.json();
      setFirstName(data.firstName); // Assuming the response contains a firstName field
    };

    fetchUserData();
  }, []);

  const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();
  console.log(totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses);

  const user = localStorage.getItem('user');

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    if (user) {
      switch (active) {
        case 1:
          return <Dashboard />;
        case 2:
          return <Transactions />;
        case 3:
          return <Income />;
        case 4:
          return <Expenses />;
        default:
          return <Dashboard />;
      }
    } else {
      return <Landing />;
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <AppStyled className="App">
      <MainLayout>
        <Navigation active={active} setActive={setActive} handleSignOut={handleSignOut} firstName={firstName} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
};

const AppStyled = styled.div`
  height: 100vh;
  background-color: white !important; /* Force background to black */
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
