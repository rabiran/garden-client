import React from 'react'
import './style.css'
import {getGardeners} from '../../api/api'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default () =>{
    
    const [gardeners,setGardeners] = React.useState([])

    function switchCountKeyToY(dataArray){
        let output = dataArray.map( s => ({y:s.count}) );
        return output;

    }
    
    React.useEffect(()=>{

        async function fetchData(){
            let gardenersArr= await getGardeners();   
            let gardenerCountArr = gardenersArr.map((elem => elem.count))
            console.log(gardenersArr)
            let newYarray = switchCountKeyToY(gardenersArr);
            setGardeners(gardenersArr)
        };
        fetchData();
    },[])

    const options = {
        credits: {
            enabled: true,
            text: "יקסורפ השירגו קפא ימותל טידרק",
            

        },


        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',

        },
        title: {
            text: 'כמות בקשות לפי גנן',
            useHTML: true,
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            useHTML: true,
        },
        accessibility: {
            point: {
              valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f}% ',
                useHTML: true,
              },
              animation: {
                duration: 2000,
                // Uses Math.easeOutBounce
                easing: 'easeOutBounce'
            }

            }
        },
        series: [{
            name: 'כמות אחוזים',
            colorByPoint: true,
            type: 'pie',
            data: gardeners,


        }],

        
    }

    

    return(
        <div className="container">
        <HighchartsReact
            
            highcharts={Highcharts}
            options={options}
            
        />
        </div>

    );
}