import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

// pages
import Home from "./pages/HomePage/HomePage";
import About from "./pages/AboutPage/AboutPage";
import Service from "./pages/ServicesPage/ServicesPage";

import Articles from "./pages/ArticlePage/ArticlePage";
import DailyUpdate from "./pages/DailyUpdatePage/DailyUpdatePage";
import DailyStockPick from "./pages/DailyStockPage/DailyStockPage";
import Login from "./pages/auth/LoginPage/LoginPage";
import Signup from "./pages/auth/SignUpPage/SignUpPage";
import SignOut from "./pages/auth/SignOutPage/SignOutPage";

import Activate from "./pages/auth/Activate";
import Private from "./pages/core/Private";
import Admin from "./pages/core/Admin";
import PrivateRoute from "./pages/auth/PrivateRoute";
import AdminRoute from "./pages/auth/AdminRoute";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import "./App.scss";
import "./index.scss";

// components
import ViewArticle from "./components/Article/ViewArticle";
import Footer from "./pages/Footer/Footer";
import StripeLogin from "./pages/Stripe/StripeLogin";
import Prices from "./pages/Stripe/Prices";
import Account from "./pages/Stripe/Account";
import Subscriptions from "./pages/Stripe/Subscriptions";

import { UserProvider } from "./context/userContext";
import AdminBoardPage from "./pages/core/AdminBoard";
import SubscriberBoard from "./pages/core/SubscriberBoard";
import { AuthProvider } from "./context/authContext";
import { StripeProvider } from "./context/StripeContext";
import AddDailyStock from "./pages/DailyStockPage/AddDailyStock";
import ViewDailyStock from "./pages/DailyStockPage/ViewDailySock";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          {/* Auth Routes */}
          <Login exact path="/login" component={Login} />
          <Signup exact path="/signup" component={Signup} />
          <SignOut exact path="/signout" component={SignOut} />
          <Route path="/auth/activate/:token" exact component={Activate} />
          <PrivateRoute path="/private" exact component={Private} />
          <AdminRoute path="/admin" exact component={Admin} />
          <AdminBoardPage path="/adminboard" exact component={AdminBoardPage} />
          <SubscriberBoard
            path="/subscriberboard"
            exact
            component={SubscriberBoard}
          />
          <Route path="/auth/password/forgot" exact component={Forgot} />
          <Route path="/auth/password/reset/:token" exact component={Reset} />

          {/* Public Routes */}
          <Home exact path="/" component={Home} />
          <About exact path="/about" component={About} />
          <Service exact path="/services" component={Service} />
          {/* <PrivateRoute path="/services" exact component={Service} /> */}

          <DailyUpdate exact path="/daily-update" component={DailyUpdate} />
          <Articles exact path="/articles" component={Articles} />
          <ViewArticle exact path="/article/view/:id" component={ViewArticle} />
          {/* <Articles exact path="/articles/edit/:id" component={Articles} /> */}

          {/* Paid Service Routes */}
          <DailyStockPick
            exact
            path="/daily-stock-pick"
            component={DailyStockPick}
          />
          <ViewDailyStock
            exact
            path="/view/dailystock"
            component={ViewDailyStock}
          />
          <AddDailyStock
            exact
            path="/add/dailystock"
            component={AddDailyStock}
          />

          {/* Stripe Payment Routes*/}
          <Route exact path="/stripe">
            <StripeLogin />
          </Route>
          {/* <Route path="/prices">
            <Prices />
          </Route> */}

          <PrivateRoute exact path="/prices" component={Prices} />
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/subscriptions">
            <Subscriptions />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

// export default App;
export default () => (
  <StripeProvider>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </StripeProvider>
);
