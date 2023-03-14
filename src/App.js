import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import MovieItemDetails from './components/MovieItemDetails'
import SearchFilter from './components/SearchFilter'
import AccountRoute from './components/AccountRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
    <ProtectedRoute exact path="/search" component={SearchFilter} />
    <ProtectedRoute exact path="/account" component={AccountRoute} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
