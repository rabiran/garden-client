 
import React from 'react';
import authCtx from './authContext';

export default function useAuth () {
    return React.useContext(authCtx)
}