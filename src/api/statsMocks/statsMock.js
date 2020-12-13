
export default [
    {
        name: "inprogress",
        count: 8,
        more: [
            {
                name: "התקבל",
                count: 5,
                more: [
                    {
                        name: "adad",
                        count: 2,
                    },
                    {
                        name: "adad2",
                        count: 2,
                    }
                ]
            },
            {
                name: "לקראת סיום",
                count: 7
            }
        ]
    }, 
    {
        name: "completed",
        count: 2,
        more: [
            
        ]
    }, 
    {
        name: "failed",
        count: 1,
        more: [
            
        ]
    }, 
    {
        name: "paused",
        count: 1,
        more: [

        ]
    }
]
// export default {
//     main: [{
//         name: "בתהליך",
//         y: 8,
//         useHTML: true,
//         drilldown: "inprogress",
//     },
//     {
//         name: "הסתיים",
//         y: 2,
//         drilldown: "completed",
//     },
//     {
//         name: "נכשל",
//         y: 1,
//         drilldown: "failed",
//     },
//     {
//         name: "בהשעייה",
//         y: 1,
//         drilldown: "paused",
//     }],
//     drilldown: {
//         series: [
//             {
//                 name: "בתהליך",
//                 id: "inprogress",
//                 data: [
//                     {
//                         name: "התקבל",
//                         y: 5
//                     },
//                     {
//                         name: "aaa",
//                         drilldown: '123',
//                         y: 5
//                     },
//                     // [
//                     //     "לקראת סיום",
//                     //     7
//                     // ],
//                     // {
//                     //     "יוצר יוזר גרביים",
//                     //     drilldown: 'haha',
//                     //     2
//                     // },
//                     // [
//                     //     "יוצר יוזר אחד",
//                     //     5
//                     // ]
//                 ]
//             },
//             {
//                 name: "aaaa",
//                 id: "123",
//                 data: [
//                     {
//                         name: "התקבל",
//                         y: 5
//                     },
//                     {
//                         name: "aaa",
//                         drilldown: '123',
//                         y: 5
//                     },
//                     // [
//                     //     "לקראת סיום",
//                     //     7
//                     // ],
//                     // {
//                     //     "יוצר יוזר גרביים",
//                     //     drilldown: 'haha',
//                     //     2
//                     // },
//                     // [
//                     //     "יוצר יוזר אחד",
//                     //     5
//                     // ]
//                 ]
//             }
//         ]
//     }
// }
