import React from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';

const Navigation = ({ active, setActive, handleSignOut, firstName }) => {
  return (
    <NavigationStyled>
      <div className="user-con">
        <img src={avatar} alt="User Avatar" />
        <div className="text">
          <h2>{firstName}</h2>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? 'active' : ''}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav">
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </NavigationStyled>
  );
};

const NavigationStyled = styled.nav`
  background-color: black !important; /* Force background to black */
  color: white !important; /* Ensure text is white */
  height: 100vh; /* Ensure it covers the full height */
  width: 250px; /* Set a width for the navigation */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  gap: 2rem;

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #FFFFFF;
      padding: .2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: white !important; /* Ensure text is white */
    }
    p {
      color: white !important; /* Ensure text is white */
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: .6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all .4s ease-in-out;
      color: white !important; /* Ensure text is white */
      padding-left: 1rem;
      position: relative;
      i {
        color: white !important; /* Ensure text is white */
        font-size: 1.4rem;
        transition: all .4s ease-in-out;
      }
    }
  }

  .active {
    color: white !important; /* Ensure text is white */
    i {
      color: white !important; /* Ensure text is white */
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }

  .bottom-nav {
    button {
      color: white !important; /* Ensure text is white */
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      transition: all .4s ease-in-out;
      &:hover {
        color: #aaa; /* Optional: Change color on hover */
      }
    }
  }
`;

export default Navigation;