const domainToHebrew = (domain, domainsConfig) => {
    switch(domain) {
        case domainsConfig.ads: return 'שירותים';
        case domainsConfig.es: return 'גרביים';
        default: return domain; 
    }
}

const drillTransform = (data) => {
    
}
export const migratedStatsTransform = (statsData, domainsConfig) => {
    const chartData = statsData.map(obj => {
        return {name: domainToHebrew(obj.name, domainsConfig), y: obj.count}
    });
    return {main: chartData};
}

export const gardenersStatsTransform = (statsData) => {
    const chartData = statsData.map(obj => {
        return {name: obj.name, y: obj.count}
    });
    return {main: chartData};
}

export const totalMigratedStatsTransform = (statsData, domainsConfig) => {
    const chartData = statsData.map(obj => {
        let hebrewDomain;
        if(!obj.name) hebrewDomain = "לא עברו";
        else hebrewDomain = domainToHebrew(obj.name, domainsConfig);

        return {name: hebrewDomain, y: obj.count}
    });
    return {main: chartData};
}

export const statusStatsTransform = (statsData) => {
    let chartDrillData = {series: []};
    const chartData = statsData.map(obj => {
        let hebrewName;
        let color;
        let finalObject;

        switch(obj.name) {
            case 'inprogress': { hebrewName = "בתהליך"; color='lightblue'; break; }
            case 'completed': { hebrewName = "הסתיים"; color='green'; break;}
            case 'paused': { hebrewName = "בהשעיה"; color='orange'; break; }
            case 'failed': { hebrewName = "נכשל"; color='red'; break; }
            default: hebrewName = obj.name; 
        }
        finalObject = { name: hebrewName, color: color, y: obj.count};

        // let currentParent = finalObject;
        // let current = obj;

        if(obj.more) {
            finalObject.drilldown = obj.name;
            const moreTransform = obj.more.map(obj => {
                let finalObject = {name: obj.name, y: obj.count};
                if(obj.more) {
                    finalObject.drilldown = obj.name;
                    const moreTransform = obj.more.map(obj => ({name: obj.name, y: obj.count}))
                    let drillDownObj = {name: hebrewName, id: obj.name, data: moreTransform};
                    chartDrillData.series.push(drillDownObj);
                }
                return finalObject;
            });
            let drillDownObj = {name: hebrewName, id: obj.name, data: moreTransform};
            chartDrillData.series.push(drillDownObj);
        }
        return finalObject;
    });
    console.log(chartData);
    console.log(chartDrillData);
    return {main: chartData, drilldown: chartDrillData};
}