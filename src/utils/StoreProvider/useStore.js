 
import React from 'react';
import storeCtx from './storeContext';

export default function useStore () {
    return React.useContext(storeCtx)
}