/// <reference types="cypress" />

describe('tarefas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('deve cadastrar uma nova tarefa', () => {
    const taskName = 'Assistir ao jogo do São Paulo'
    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: {name: taskName}
    }).then(response => {
      expect(response.status).to.eql(204)
    })
    cy.get('input[placeholder="Add a new Task"]').type(taskName)
    cy.contains('button', 'Create').click()
    cy.contains('main div p', taskName).should('be.visible')
  })

  it('não deve cadastrar uma tarefa repetida', () => {
    const taskName = 'Fazer comida'
    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: {name: taskName}
    }).then(response => {
      expect(response.status).to.eql(204)
    })
    cy.get('input[placeholder="Add a new Task"]').type(taskName)
    cy.contains('button', 'Create').click()
    cy.get('input[placeholder="Add a new Task"]').type(taskName)
    cy.contains('button', 'Create').click()
    cy.contains('div', 'Task already exists!').should('be.visible')
  })

  it('deve ser possível excluir uma tarefa', () => {
    const taskName = 'Lavar roupa'
    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: {name: taskName}
    }).then(response => {
      expect(response.status).to.eql(204)
    })
    cy.get('input[placeholder="Add a new Task"]').type(taskName)
    cy.contains('button', 'Create').click()
    cy.get('main div p').contains(taskName).parent().find('button').last().click();
    cy.contains('main div p', taskName).should('not.exist')
  })

  it('deve ser possível marcar uma tarefa como concluída', () => {
    const taskName = 'Ir para a academia'
    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: {name: taskName}
    }).then(response => {
      expect(response.status).to.eql(204)
    })
    cy.get('input[placeholder="Add a new Task"]').type(taskName)
    cy.contains('button', 'Create').click()
    cy.get('main div p').contains(taskName).parent().find('button').first().click();
    cy.get('main div p').contains(taskName).parent().find('button').first().should('have.class', '_listItemToggleSelected_1kgm5_17')
  })

  it('deve ser possível desmarcar uma tarefa como concluída', () => {
    const taskName = 'Andar de bicicleta'
    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: {name: taskName}
    }).then(response => {
      expect(response.status).to.eql(204)
    })
    cy.get('input[placeholder="Add a new Task"]').type(taskName)
    cy.contains('button', 'Create').click()
    cy.get('main div p').contains(taskName).parent().find('button').first().click();
    cy.get('main div p').contains(taskName).parent().find('button').first().click();
    cy.get('main div p').contains(taskName).parent().find('button').first().should('have.class', '_listItemToggle_1kgm5_16')
  })
})