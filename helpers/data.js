export const nsmData = {
    uniqueFile: '120223/001',
    claimType: {
        nsm: 'Non-standard magistrates\' court payment',
        boi: 'Breach of injunction',
    },
    officeInUndesignatedArea: 'No',
    repOrderDate: {
        default: {
            day: '27',
            month: '3',
            year: '2021'
        },
        youthCourtFee: {
            day: '6',
            month: '12',
            year: '2024'
        }
    },
    breachOfInjunction: {
        cntp: 'CNTP1234',
        repOrderDate: {
            default: {
                day: '27',
                month: '3',
                year: '2021'
            },
            youthCourtFee: {
                day: '6',
                month: '12',
                year: '2024'
            }
        }
    },
    firmName: 'Test Automate',
    firmAccountNumber: '1A123B',
    addressLine1: '102 Petty France',
    townOrCity: 'London',
    postcode: 'SW1H 9AJ',
    vatRegistered: 'Yes',
    solicitorFirstName: 'Any',
    solicitorLastName: 'Testname',
    solicitorReferenceNumber: '2P341B',
    contactFirstName: 'Joe',
    contactLastName: 'Bloggs',
    contactEmailAddress: 'joe@bloggs.com',
    defendant: {
        firstName: 'Lex',
        lastName: 'Luthor',
        maatId: '1234567'
    },
    mainOffenceDate: {
        day: '1',
        month: '1',
        year: '2015'
    },
    hearingDate: {
        day: '1',
        month: '5',
        year: '2015'
    },
    hearingCount: '1',
    hearingOutcome: 'CP19',
    matterType: '9',
    evidencePages: {
        prosecution: '10',
        defence: '10',
    },
    witnesses: '1',

};

export const priorAuthorityData = {
    ufn: '120223/001',
    firmAccountNumber: '1A123B',
    caseContact: {
        firstName: 'Clark',
        lastName: 'Kent',
        email: 'superman@krypton.com',
        firmName: 'Daily Planet',
    },
    clientDetails: {
        firstName: 'Bruce',
        lastName: 'Wayne',
        dob: {
            day: '1',
            month: '1',
            year: '1980'
        }
    },
    serviceProvider: {
        firstName: 'Barry',
        lastName: 'Allen',
        organisation: 'Central City Police Department',
        town: 'Central City',
        postcode: 'SW1H 9AJ',
    },
    serviceCost: {
        granted: 'No',
        serviceType: {
            name: 'Transcription (recording)',
            numberOfMinutes: '10',
            costPerMinute: '5.00',
        }
    }
};