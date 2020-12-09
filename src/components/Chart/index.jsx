import React from 'react'
import './style.css'
// import { getGardeners } from '../../api/api'
// import Highcharts from "highcharts/highstock";
import Highcharts from 'highcharts'
import drilldow from "highcharts/modules/drilldown.js";
import HighchartsReact from 'highcharts-react-official'
import { CommentSharp } from '@material-ui/icons'


export default ({data, isDark, title}) => {


    function switchCountKeyToY(dataArray) {
        let output = dataArray.map(s => ({ y: s.count }));
        return output;

    }

    if(data.drilldown)
        drilldow(Highcharts);

    React.useEffect(() => {
        // chart.series[0].drillToNode(0);
    }, [isDark])

    const color = isDark ? 'white' : 'black';

    console.log(data);

    // const getChart = (chart) => {
    //     chart = chart;
    // }
    const options = {
        credits: {
            enabled: false,
            text: "יקסורפ השירגו קפא ימותל טידרק",


        },
        lang: { drillUpText: "<< הרזח", useHTML: true },

        chart: {
            // plotBackgroundColor: null,
            // plotBorderWidth: null,
            // plotShadow: false,
            type: 'pie',
            backgroundColor: 'transparent',
            color: color,
            // width: '100%',
            

        },
        title: {
            text: title,
            style: { color: color } ,
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
            style: { color: 'white' } ,
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: true,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f}% ',
                    useHTML: true,
                    style: { color: color } ,
                },
                // animation: {
                //     duration: 3000,
                //     // Uses Math.easeOutBounce
                //     easing: 'easeOutBounce'
                // }

            }
        },
        legend: {
            useHTML: true,
            itemStyle: { color: color }
        },
        series: [{
            name: 'כמות אחוזים',
            colorByPoint: true,
            type: 'pie',
            data: data.main,
        }],
        drilldown:{
            activeDataLabelStyle: {
                textDecoration: 'none',
                color: color
            },
            series: data?.drilldown?.series || [],
        }
        // series: [{
        //     name: 'Inner',
        //     data: data.inner,
        //     size: '50%',
        //     innerSize: '40%',
        //     slicedOffset: 10
        // }, {
        //     name: 'Outer',
        //     data: data.outer,
        //     size: '70%',
        //     innerSize: '57%',
        //     slicedOffset: 20
        // }]

        // }],



    }

    const options2 = {
        chart: {
          type: "pie"
        },
        series: [
          {
            data: [
              {
                y: 100
              },
              {
                y: 50
              }
            ]
          }
        ]
      };
      
    return (
        <div className="container">
            <HighchartsReact
                // callback={getChart}
                // containerProps={{ style: { width: "100%" } }}
                highcharts={Highcharts}
                options={options}

            />
        </div>

    );
}