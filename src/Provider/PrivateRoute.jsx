import React, { use } from 'react'
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { Loading } from '../Pages/Loading/Loading';

export const PrivateRoute = ({children}) => {

  const {user, loading} = use(AuthContext);

  const location = useLocation();

  if(loading){
    return <Loading></Loading>;
  }
  else{
    if(user && user.email){
        return children;
      }
    
      else{
        return <Navigate state={location.pathname} to='/login'></Navigate>;
      }
      
  }
  
  
}
