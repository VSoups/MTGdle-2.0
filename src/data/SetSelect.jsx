// Color identifier for set options menu
const SET_COLOR_LEGEND = {
    standard: 'green',
    supplimental: 'blue',
    modern: 'orange',
    commander: 'red',
    compilation: 'purple',
    un_set: 'gray',
}

export const Sets = [
    /*
    Example Set Obj
    {
        name: "Bloomburrow",
        acronym: "blb",
        cardCount: 397, // check Scryfall set page for count
        date: 2024-08-02,
        type: SET_COLOR_LEGEND.standard,
    }
    */
    {
        name: 'Bloomburrow',
        acronym: 'blb',
        cardCount: 397,
        date: Date('2024-08-02'),
        type: SET_COLOR_LEGEND.standard,
        
    },
    {
        name: 'Assassin\'s Creed',
        acronym: 'acr',
        cardCount: 309,
        date: Date('2024-07-05'),
        type: SET_COLOR_LEGEND.modern,
    },
    {
        name: 'Modern Horizons 3',
        acronym: 'mh3',
        cardCount: 527,
        date: Date('2024-06-14'),
        type: SET_COLOR_LEGEND.modern,
    },
    {
        name: 'Outlaws of Thunder Junction',
        acronym: 'otj',
        cardCount: 374,
        date: Date('2024-04-19'),
        type: SET_COLOR_LEGEND.standard,
    },
    {
        name: 'The Big Score',
        acronym: 'big',
        cardCount: 95,
        date: Date('2024-04-19'),
        type: SET_COLOR_LEGEND.supplimental,
    },
    {
        name: 'Fallout',
        acronym: 'pip',
        cardCount: 1068,
        date: Date('2024-03-08'),
        type: SET_COLOR_LEGEND.commander,
    },
    {
        name: 'Murders at Karlov Manor',
        acronym: 'mkm',
        cardCount: 450,
        date: Date('2024-02-09'),
        type: SET_COLOR_LEGEND.standard,
    },
    {
        name: 'Ravnica: Clue Edition',
        acronym: 'clu',
        cardCount: 284,
        date: Date('2024-02-23'),
        type: SET_COLOR_LEGEND.supplimental,
    },
    {
        name: 'Ravnica Remastered',
        acronym: 'rvr',
        cardCount: 531,
        date: Date('2024-01-12'),
        type: SET_COLOR_LEGEND.compilation,
    },
    {
        name: 'The Lost Caverns of Ixalan',
        acronym: 'lci',
        cardCount: 416,
        date: Date('2023-11-17'),
        type: SET_COLOR_LEGEND.standard,
    },
    {
        name: 'Jurrasic World Collection',
        acronym: 'rex',
        cardCount: 45,
        date: Date('2023-11-17'),
        type: SET_COLOR_LEGEND.supplimental,
    },
    {
        name: 'Doctor Who',
        acronym: 'who',
        cardCount: 1178,
        date: Date('2023-10-13'),
        type: SET_COLOR_LEGEND.commander,
    },
    {
        name: 'Wilds of Eldraine',
        acronym: 'woe',
        cardCount: 381,
        date: Date('2023-09-08'),
        type: SET_COLOR_LEGEND.standard,
    },
    {
        name: 'Commander Masters',
        acronym: 'cmm',
        cardCount: 1067,
        date: Date('2023-08-04'),
        type: SET_COLOR_LEGEND.commander,
    },
    {
        name: 'The Lord of the Rings: Tales of Middle-Earth',
        acronym: 'ltr',
        cardCount: 856,
        date: Date('2023-06-23'),
        type: SET_COLOR_LEGEND.modern,
    },
    {
        name: 'March of the Machine',
        acronym: 'mom',
        cardCount: 387,
        date: Date('2023-04-21'),
        type: SET_COLOR_LEGEND.standard,
    },
    {
        name: 'March of the Machine: The Aftermath',
        acronym: 'mat',
        cardCount: 230,
        date: Date('2023-05-12'),
        type: SET_COLOR_LEGEND.supplimental,
    },
    {
        name: 'Shadows Over Innistrad Remastered',
        acronym: 'sir',
        cardCount: 294,
        date: Date('2023-03-21'),
        type: SET_COLOR_LEGEND.compilation,
    },
    {
        name: 'Phyrexia: All Will Be One',
        acronym: 'one',
        cardCount: 479,
        date: Date('2023-02-03'),
        type: SET_COLOR_LEGEND.standard,
    },
    {
        name: 'Dominaria Remastered',
        acronym: 'dmr',
        cardCount: 457,
        date: Date('2023-01-13'),
        type: SET_COLOR_LEGEND.compilation,
    },
    {
        name: 'Jumpstart 2022',
        acronym: 'j22',
        cardCount: 835,
        date: Date('2022-12-02'),
        type: SET_COLOR_LEGEND.supplimental,
    },
    {
        name: 'The Brother\'s War',
        acronym: 'bro',
        cardCount: 399,
        date: Date('2022-11-18'),
        type: SET_COLOR_LEGEND.standard,
    },
    {
        name: 'Transformers',
        acronym: 'bot',
        cardCount: 29,
        date: Date('2022-11-18'),
        type: SET_COLOR_LEGEND.supplimental,
    },
    {
        name: 'Unfinity',
        acronym: 'unf',
        cardCount: 639,
        date: Date('2022-10-07'),
        type: SET_COLOR_LEGEND.un_set,
    },
    {
        name: 'Warhammer 40,000 Commander',
        acronym: '40k',
        cardCount: 618,
        date: Date('2022-10-07'),
        type: SET_COLOR_LEGEND.commander,
    },
    {
        name: 'Dominaria United',
        acronym: 'dmu',
        cardCount: 453,
        date: Date('2022-09-09'),
        type: SET_COLOR_LEGEND.standard,
    },
    {
        name: 'Double Masters 2022',
        acronym: '2x2',
        cardCount: 579,
        date: Date('2022-07-08'),
        type: SET_COLOR_LEGEND.compilation,
    },
    {
        name: 'Commander Legends: Battle for Baldur\'s Gate',
        acronym: 'clb',
        cardCount: 936,
        date: Date('2022-06-10'),
        type: SET_COLOR_LEGEND.commander,
    },
    {
        name: 'Streets of New Capenna',
        acronym: 'snc',
        cardCount: 513,
        date: Date('2022-04-29'),
        type: SET_COLOR_LEGEND.standard,
    },
    {
        name: 'Kamigawa: Neon Dynasty',
        acronym: 'neo',
        cardCount: 531,
        date: Date('2022-02-18'),
        type: SET_COLOR_LEGEND.standard,
    },
]


export default {
    Sets,
}