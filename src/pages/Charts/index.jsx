import React from 'react';
import Chart from 'components/Chart'
import styles from './styles.css';
import { getGardenersStatsApi, getStatusesStatsApi, getMigrationsStatsApi, getTotalMigrationsStatsApi } from '../../api/api'
import useTheme from 'utils/ThemeProvider/UseTheme';
import useStore from 'utils/StoreProvider/useStore';
import { migratedStatsTransform, gardenersStatsTransform,
statusStatsTransform, totalMigratedStatsTransform } from 'utils/statsParser';

export default () => {

    const [gardeners, setGardeners] = React.useState(false);
    const [statuses, setStatuses] = React.useState(false);
    const [migrated, setMigrated] = React.useState(false);
    const [totalMigrations, setTotalMigrations] = React.useState(false);

    const themeProvider = useTheme();
    const storeProvider = useStore();

    React.useEffect(() => {
        async function fetchGardeners() {
            let data = await getGardenersStatsApi();
            data = gardenersStatsTransform(data);
            setGardeners(data);
        };
        async function fetchStatuses() {
            let data = await getStatusesStatsApi();
            data = statusStatsTransform(data);
            setStatuses(data)
        };
        async function fetchMigrated() {
            let data = await getMigrationsStatsApi();
            const domainsConfig = storeProvider.getDomains();
            data = migratedStatsTransform(data, domainsConfig);
            setMigrated(data)
        };
        async function fetchTotalMigrations() {
            let data = await getTotalMigrationsStatsApi();
            const domainsConfig = storeProvider.getDomains();
            data = totalMigratedStatsTransform(data, domainsConfig);
            setTotalMigrations(data)
        };
        if(storeProvider.getDomains()) {
            console.log('fetch');
            fetchGardeners();
            fetchStatuses();
            fetchMigrated();
            fetchTotalMigrations();
        }
    }, [storeProvider.getDomains()])

    const gardenersTitle = "כמות בקשות לפי גנן";
    const statusesTitle = "סטטוסים של מיגרציות";
    const migratedTitle = "רשתות מקור של אנשים שעברו";
    const totalMigratedTitle = "סהך הכל מיגרציות"; 

    return (
        <div className="totalChartContainer">
            <div className="chartsTitle">
                סטטיסטיקה של מיגרציות
            </div>
            <div className="chartContainer">
                {gardeners && <Chart data={gardeners} isDark={themeProvider.isDark} title={gardenersTitle}/>}
                {statuses && <Chart data={statuses} isDark={themeProvider.isDark} title={statusesTitle} />}
                {migrated && <Chart data={migrated} isDark={themeProvider.isDark} title={migratedTitle} />}
                {totalMigrations && <Chart data={totalMigrations} isDark={themeProvider.isDark} title={totalMigratedTitle} />}
            </div>
        </div>
    )
}