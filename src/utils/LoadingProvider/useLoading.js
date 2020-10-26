 
import React from 'react';
import loadingCtx from './LoadingContext';

export default function useLoading () {
    return React.useContext(loadingCtx)
}