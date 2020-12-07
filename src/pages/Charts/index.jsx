import React from 'react';
import Chart from 'components/Chart'
// import styles from './styles';
import { getGardeners } from '../../api/api'
import useTheme from 'utils/ThemeProvider/UseTheme';

export default () => {

    const [gardeners, setGardeners] = React.useState(false)
    const themeProvider = useTheme();

    React.useEffect(() => {
        async function fetchData() {
            let gardenersArr = await getGardeners();
            // let gardenerCountArr = gardenersArr.map((elem => elem.count))
            console.log(gardenersArr)
            // let newYarray = switchCountKeyToY(gardenersArr);
            setGardeners(gardenersArr)
        };
        fetchData();
    }, [])

    console.log(gardeners)
    return (
        <>
            hey
            {gardeners && <Chart data={gardeners} isDark={themeProvider.isDark} />}
            {/* <Chart data={gardeners}/> */}
        </>
    )
}