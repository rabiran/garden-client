export default [
    {
        id: 1,
        phone: '035932937',
        mobilePhone: '35345354',
        status: {
            progress: 'completed',
            step: 'target',
            subStep: 'הסתיים',
        },
        primaryDomainUser: 'ads',
        hierarchy: 'חברת הירקות/טיפשים/צוות חציל',
        shadowUsers: ['es', 'target'], 
        fullName: 'חציל אפוי',
        identifier: 1234521,
        // startDate: '02/12/1421, 00:00:00',
        startDate: undefined,
        endDate: '02/08/1529, 00:00:00',
        steps: [
            {
                name: "יוצר תיבת מייל",
                progress: "completed",
                subSteps: [
                    {
                        name: "מדבר עם שרת",
                        progress: "completed"
                    },
                    {
                        name: "מעביר דברים",
                        progress: "completed"
                    },
                    {
                        name: "מסיים",
                        progress: "completed"
                    },
                ]
            },
            {
                name: "יוצר יוזר",
                progress: "inprogress",
                subSteps: [
                    {
                        name: "מדבר עם שרת",
                        progress: "completed"
                    },
                    {
                        name: "מחבר את תיבת המייל",
                        progress: "failed"
                    },
                    {
                        name: "מסיים",
                        progress: "inprogress"
                    },
                ]
            },
            {
                name: "סתם עושה משהו",
                progress: "inprogress",
                subSteps: [
                    {
                        name: "מדבר עם שרת",
                        progress: "inprogress"
                    },
                    {
                        name: "בודק שהכל טוב",
                        progress: "inprogress"
                    },
                ]
            }
        ],
        viewed: true,
    },
    {
        id: 285435435345,
        phone: '035932334',
        mobilePhone: '35345354',
        status: {
            progress: 'inprogress',
            step: 'target',
            subStep: 'מכין פיצה',
        },
        paused: true,
        primaryDomainUser: 'es',
        hierarchy: 'חברת הירקות/טיפשים/צוות חציל',
        shadowUsers: ['es'],
        fullName: 'ביצה קשה',
        identifier: 1234522,
        startDate: '12/05/1523',
        endDate: '02/08/4810',steps: [
            {
                name: "יוצר תיבת מייל",
                progress: "completed",
                subSteps: [
                    {
                        name: "מדבר עם שרת",
                        progress: "completed"
                    },
                    {
                        name: "מעביר דברים",
                        progress: "completed"
                    },
                    {
                        name: "מסיים",
                        progress: "completed"
                    },
                ]
            },
            {
                name: "יוצר יוזר",
                progress: "inprogress",
                subSteps: [
                    {
                        name: "מדבר עם שרת",
                        progress: "completed"
                    },
                    {
                        name: "מחבר את תיבת המייל",
                        progress: "failed"
                    },
                    {
                        name: "מסיים",
                        progress: "inprogress"
                    },
                ]
            },
            {
                name: "סתם עושה משהו",
                progress: "inprogress",
                subSteps: [
                    {
                        name: "מדבר עם שרת",
                        progress: "inprogress"
                    },
                    {
                        name: "בודק שהכל טוב",
                        progress: "inprogress"
                    },
                ]
            }
        ],
    },
    {
        id: 325435435345,
        phone: '035932914',
        status: {
            progress: 'failed',
            step: 'es',
            subStep: 'לובש גרביים',
        },
        primaryDomainUser: 'ads',
        hierarchy: 'חברת הירקות/טיפשים/צוות חציל',
        shadowUsers: [],
        fullName: 'תפוח אדמה',
        identifier: 1234523,
        startDate: '12/02/1001',
        endDate: '02/08/2020',
        viewed: true
    },
    {
        id: 125435435346,
        phone: '035932936',
        status: {
            progress: 'paused',
            step: 'target',
            subStep: 'הסתיים',
        },
        primaryDomainUser: 'ads',
        hierarchy: 'חברת הירקות/טיפשים/צוות חציל',
        shadowUsers: ['es', 'target'], 
        fullName: 'חציל אפוי',
        identifier: 1234521,
        startDate: '12/02/1428',
        endDate: '02/08/0002',
        viewed: false
    },
    {
        id: 225435435349,
        phone: '035932924',
        status: {
            progress: 'inprogress',
            step: 'target',
            subStep: 'מכין פיצה',
        },
        primaryDomainUser: 'es',
        hierarchy: 'חברת הירקות/טיפשים/צוות חציל',
        shadowUsers: ['es'],
        fullName: 'ביצה קשה',
        identifier: 1234522,
        startDate: '12/05/1521',
        endDate: '02/08/4810',
        viewed: true
    },
    {
        id: 3254354353452,
        phone: '035932932',
        status: {
            progress: 'failed',
            step: 'es',
            subStep: 'לובש גרביים',
        },
        primaryDomainUser: 'ads',
        hierarchy: 'חברת הירקות/טיפשים/צוות חציל',
        shadowUsers: [],
        fullName: 'תפוח אדמה',
        identifier: 1234523,
        startDate: '12/02/1021',
        endDate: '02/08/2020',
        viewed: false
    },
]

// export const AuthData = {
//     id: '1',
//     displayName: 'חציל אפוי',
//     isAdmin: false
// }