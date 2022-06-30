describe('DELETE / characters/id', function () {

    const tochaHumana = {
        name: 'Johnny Storm',
        alias: 'Tocha Humana',
        team: [
            'Quarteto Fantastico'
        ],
        active: true
    }

    context('Quando tenho um personagem cadastrado', function () {

        before(function () {
            cy.postCharacter(tochaHumana).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('Deve remover o personagem pelo id', function () {
            const id = Cypress.env('characterId')
            cy.deleteCharactersById(id).then(function (response) {
                expect(response.status).to.eql(204)
            })
        });

        after(function () {
            const id = Cypress.env('characterId')
            cy.getCharactersById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    });

    it('Deve retornar 404 ao remover por Id não cadastrado', function () {
        const id = '62bd8e3d962e1a1da70f7f2d'
        cy.getCharactersById(id).then(function (response) {
            expect(response.status).to.eql(404)
        })
    });
});