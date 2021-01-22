import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from './actions/userActions';


function Header() {
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin;

    const dispatch = useDispatch();
    const signOutHandler = () => {
        dispatch(signout());
    }
    
    return (
        <nav className="header">
            <Link to="/" className="header__link" >
                <div className="header__logo">
                    <h1 className="logo">GoGet</h1>
                </div>
            </Link>
            <div className="header__search">
                <input type="text" className="header__searchInput" />
                <SearchIcon className="header__searchIcon" />
            </div>

            <div className="header__nav">
                
                    <div className="header__option ">
                        
                            { userInfo ? (
                                   <div className="dropdown">
                                   <span className="dropdown__content__options"  >{userInfo.name}</span>
                                   <div className="dropdown-content">
                                       <ul>
                                       <li>
                                     <Link to="/profile" >
                                      <p className="dropdown__content__options">Profile</p>
                                     </Link>
                                     </li>
                                        <li>
                                    <Link  onClick={signOutHandler} >
                                     <p className="dropdown__content__options" >signout</p>
                                     </Link>
                                     </li>
                                     </ul>
                                   </div>
                                 </div>
                            ):(
                                <Link to="/signin" >
                                <span className="header__optionTwo">Sign In</span> 
                                </Link>
                            )}
                    </div>
            


                <Link to="/login" className="header__link">
                    <div className="header__option">
                        
                        <Link to="/orderhistory">
                        <span className="header__optionTwo"> Orders</span>
                        </Link>

                    </div>
                </Link>

                <Link className="header__link" to="/cart/:id">
                    <div className="header__optionBasket">
                        <ShoppingCartIcon />
                        { cartItems.length >  0 &&
                             <span className="header__optionTwo  header__basketCount">{cart && cartItems.length}</span>
                        }
                       
                    </div>
                </Link>

            </div>

        </nav>
    )
}

export default Header
