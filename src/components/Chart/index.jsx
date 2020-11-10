import React from 'react'
import './style.css'
import {getGardeners} from '../../api/api'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default () =>{
    
    const [gardeners,setGardeners] = React.useState([])
    
    React.useEffect(()=>{

        async function fetchData(){
            let gardenersArr= await getGardeners();   
            let gardenerCountArr = await gardenersArr.map((elem => elem.count))
            console.log(gardenersArr)

            setGardeners(gardenersArr)
        };
        fetchData();
    },[])

    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'כמות בקשות לפי גנן'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
            }
        },
        series: [{
            name: 'Count Percentage',
            colorByPoint: true,
            type: 'pie',
            data: gardeners,

        }],
        legend: {
           
                reversed: true,
                rtl: true,
            

        }
        
    }

    

    return(
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            
        />

    );
}