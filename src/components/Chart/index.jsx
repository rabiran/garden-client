import React from 'react'
import './style.css'
// import { getGardeners } from '../../api/api'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { CommentSharp } from '@material-ui/icons'

export default ({data, isDark}) => {

    // const [gardeners, setGardeners] = React.useState([])

    function switchCountKeyToY(dataArray) {
        let output = dataArray.map(s => ({ y: s.count }));
        return output;

    }

    console.log('hello?');
    console.log(isDark);

    const color = isDark ? 'white' : 'black';
    // React.useEffect(() => {

    //     async function fetchData() {
    //         let gardenersArr = await getGardeners();
    //         let gardenerCountArr = gardenersArr.map((elem => elem.count))
    //         console.log(gardenersArr)
    //         let newYarray = switchCountKeyToY(gardenersArr);
    //         setGardeners(gardenersArr)
    //     };
    //     fetchData();
    // }, [])

    const options = {
        credits: {
            enabled: false,
            text: "יקסורפ השירגו קפא ימותל טידרק",


        },


        chart: {
            // plotBackgroundColor: null,
            // plotBorderWidth: null,
            // plotShadow: false,
            type: 'pie',
            backgroundColor: 'transparent',
            color: color,
            width: 600,
            

        },
        title: {
            text: 'כמות בקשות לפי גנן',
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
        series: [{
            name: 'כמות אחוזים',
            colorByPoint: true,
            type: 'pie',
            data: data,



        }],



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
      


      console.log(options.series)
    return (
        <div className="container">
            <HighchartsReact

                highcharts={Highcharts}
                options={options}

            />
        </div>

    );
}