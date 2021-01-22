import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home'
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import Signin from './Signin';
import Signup from './Signup';
import ShippingAddress from './ShippingAddress';
import Payment from './Payment';
import PlaceOrder from './PlaceOrder';
import Order from './Order';
import Profile from './Profile';
import OrderHistory from './OrderHistory';



function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/order/:id" component={Order}></Route>
          <Route path="/cart/:id?" component = {Cart}></Route> 
           <Route path="/product/:id" component={ProductDetails}></Route>
           <Route path="/orderhistory" component={OrderHistory}></Route>
           <Route path="/profile" component={Profile}></Route>
           <Route path="/placeorder" component={PlaceOrder}></Route>
           <Route path = '/payment'  component={Payment}></Route>
           <Route path="/shipping" component={ShippingAddress}></Route>
           <Route path="/signup" component = {Signup}></Route>
           <Route path="/signin" component = {Signin}></Route>
           <Route path="/" component={Home} exact >
          </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
