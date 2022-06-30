

describe('GET /characters', function () {

    const characters = [
        {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['x-man'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['X-man'],
            active: true
        },
        {
            name: 'Peter Parker',
            alias: 'Homen-Aranha',
            team: ['Novos Vingadores'],
            active: true
        }
    ]

    before(function () {       
        cy.populateCharacters(characters)

    });


    it('Deve retornar uma lista de personagens ', function () {
        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        })
    });

    it('Deve buscar personagem por nome', function () {
        cy.searchCharacters('Logan').then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Wolverine')
            expect(response.body[0].team).to.eql(['X-man'])
            expect(response.body[0].active).to.eql(true)
        })
    });
});

describe('GET / characters/id', function () {

  
    const tonyStark = {
        name: 'Tony Stark',
        alias: 'Homen de Ferro',
        team: [
            'Vingadores'
        ],
        active: true
    }

    context('Quando tenho um personagem cadastrado', function () {

        before(function () {
            cy.postCharacter(tonyStark).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('Deve buscar o personagem pelo id', function () {
            const id = Cypress.env('characterId')
            cy.getCharactersById(id).then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Homen de Ferro')
                expect(response.body.team).to.eql(['Vingadores'])
                expect(response.body.active).to.eql(true)
            })
        });
    });

    it('Deve retornar 404 ao buscar por Id não cadastrado', function () {
        const id = '62bd8e3d962e1a1da70f7f2d'
        cy.getCharactersById(id).then(function (response) {
            expect(response.status).to.eql(404)
        })
    });
});