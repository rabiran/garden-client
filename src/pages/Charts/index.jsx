import React from 'react';
import Chart from 'components/Chart'
import styles from './styles.css';
import { getGardenersStatsApi, getStatusesStatsApi, getMigrationsStatsApi, getTotalMigrationsStatsApi } from '../../api/api'
import useTheme from 'utils/ThemeProvider/UseTheme';

export default () => {

    const [gardeners, setGardeners] = React.useState(false);
    const [statuses, setStatuses] = React.useState(false);
    const [migrated, setMigrated] = React.useState(false);
    const [totalMigrations, setTotalMigrations] = React.useState(false);

    const themeProvider = useTheme();

    React.useEffect(() => {
        async function fetchGardeners() {
            let gardenersArr = await getGardenersStatsApi();
            // let gardenerCountArr = gardenersArr.map((elem => elem.count))
            console.log(gardenersArr)
            // let newYarray = switchCountKeyToY(gardenersArr);
            setGardeners(gardenersArr)
        };
        async function fetchStatuses() {
            let data = await getStatusesStatsApi();
            setStatuses(data)
        };
        async function fetchMigrated() {
            let data = await getMigrationsStatsApi();
            setMigrated(data)
        };
        async function fetchTotalMigrations() {
            let data = await getTotalMigrationsStatsApi();
            setTotalMigrations(data)
        };
        fetchGardeners();
        fetchStatuses();
        fetchMigrated();
        fetchTotalMigrations();
    }, [])

    const gardenersTitle = "כמות בקשות לפי גנן";
    const statusesTitle = "סטטוסים של מיגרציות";
    const migratedTitle = "רשתות מקור של אנשים שעברו";
    const totalMigratedTitle = "סהך הכל מיגרציות"; 

    return (
        <>
            <div className="chartContainer">
                {gardeners && <Chart data={gardeners} isDark={themeProvider.isDark} title={gardenersTitle}/>}
                {statuses && <Chart data={statuses} isDark={themeProvider.isDark} title={statusesTitle} />}
                {migrated && <Chart data={migrated} isDark={themeProvider.isDark} title={migratedTitle} />}
                {totalMigrations && <Chart data={totalMigrations} isDark={themeProvider.isDark} title={totalMigratedTitle} />}
            </div>
        </>
    )
}