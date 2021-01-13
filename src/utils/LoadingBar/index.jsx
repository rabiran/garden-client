import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import useLoading from 'utils/LoadingProvider/useLoading';

export default () => {
    const loadingProvider = useLoading();

    const isLoading = loadingProvider.getLoading();
    return (
        <> {isLoading && <LinearProgress color="secondary" />} </>
    );
}