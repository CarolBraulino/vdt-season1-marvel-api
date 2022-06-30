

describe('POST /characters', function () {

    it('Deve cadastrar um personagem', function () {

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })


    });

    context('Quando o personagem já existe', function () {

        const character = {

            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [
                'Vingadores da Costa Oeste',
                'Irmandade de Mutantes'
            ],
            active: true

        }

        before(function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(201)
            })

        })

        it('Não deve cadastrar duplicado', function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        });

    });
    
//DESAFIO 
    context('quando tento cadastrar um personagem com alguma informação faltante', function () {

        const characterIncomplete = [
            {
                age: 17,
                alias: 'Anna Marie LeBeau',
                team: ['X-man'],
                active: true
            },
            {
                age: 17,
                name: 'Anna Marie LeBeau',
                team: ['X-man'],
                active: true
            },
            {
                age: 17,
                name: 'Anna Marie LeBeau',
                alias: 'Vampira',
                active: true
            },
            {
                age: 17,
                name: 'Anna Marie LeBeau',
                alias: 'Vampira',
                team: ['X-man']
            },
            {
                name: 'Anna Marie LeBeau',
                alias: 'Vampira',
                team: ['X-man'],
                active: true
            }

        ]

        it('não deve permitir cadastro de personagem sem nome', function () {
            cy.postCharacter(characterIncomplete[0])
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"name\" is required')
                })
        })

        it('não deve permitir cadastro de personagem sem codinome', function () {
            cy.postCharacter(characterIncomplete[1])
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"alias\" is required')
                })
        })

        it('não deve permitir cadastro de personagem sem time/filiação', function () {
            cy.postCharacter(characterIncomplete[2])
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"team\" is required')
                })
        })

        it('não deve permitir cadastro de personagem sem active', function () {
            cy.postCharacter(characterIncomplete[3])
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"active\" is required')
                })
        })

        it('deve permitir cadastro de personagem sem idade', function () {
            cy.postCharacter(characterIncomplete[4])
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body.character_id.length).to.eql(24)
                })
        })
    })

});


