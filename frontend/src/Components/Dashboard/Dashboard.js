import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()
    // console.log(totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses);

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    const handleSignOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expenses</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
background-color: black !important; /* Force background to black */
  color: white !important ; /* Ensure text is white */
  overflow:hidden;
  height: 100vh; /* Ensure it covers the full height */
  padding: 1rem;
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                margin-top: 2rem;
                .income, .expense, .balance{
                    background: #1e1e1e; /* Dark background */
                    border: 1px solid #333; /* Slightly lighter border */
                    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
                    border-radius: 10px; /* Smaller border radius */
                    padding: 1rem;
                    text-align: center; /* Center text */
                    color: #fff; /* White text */
                    p{
                        font-size: 2rem; /* Smaller font size */
                        font-weight: 600; /* Slightly lighter font weight */
                    }
                    h2{
                        font-size: 1rem; /* Smaller heading size */
                        font-weight: 400; /* Lighter heading weight */
                        margin-bottom: 0.5rem; /* Space between heading and amount */
                    }
                }

                }
                    .income{
                    p{
                        color: var(--color-green);
                        opacity: 0.8; /* Slightly higher opacity */
}}
                    .expense{
                    p{
                        color: red;
                        opacity: 0.8; /* Slightly higher opacity */
                    }

            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #1e1e1e; /* Dark background */
                border: 1px solid #333; /* Slightly lighter border */
                box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
                padding: 1rem;
                border-radius: 10px; /* Smaller border radius */
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #fff; /* White text */
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard