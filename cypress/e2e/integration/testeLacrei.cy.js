/// <reference types = "cypress" />

//------------------------
// Massa de teste
//------------------------
const emailRegistroValido = 'email3@teste.com'
const emailRecadastramento = 'email2@teste.com';
const senhaValida = '@Ab12345';
const URL = 'https://frontend-lacrei-pessoa-usuaria.vercel.app';

context('Cadastro de nova pessoa usuária', () => {
    beforeEach(() => {
      cy.visit(URL);
    })
    describe('Cenário 1: Usuário acessa tela de Boas-vindas da Lacrei saúde', () => {
        it('Verificação da tela de Boas-vindas', () =>{
            cy.contains('E-mail');
            cy.get('#email').should('be.visible').and('be.empty');
            cy.contains('Senha');
            cy.get('#password').should('be.visible').and('be.empty');
            cy.contains('button','Entrar');
            cy.get('button[type=submit]').should('be.visible');
            cy.contains('button', 'Criar conta');
            cy.contains('a','Esqueci minha senha');
        })
    })
    describe('Cenário 2: Usuária quer criar nova conta', () =>{
        it('Verificação do redirecionamento para a página de registro', () =>{
            cy.get('.LiRAN > .sc-f3c66ae8-1')
                .should('be.visible')
                .click();
            cy.wait(200);
            cy.url()
                .should('be.equal', URL + '/register');
            cy.contains('h2', 'Cadastre-se');
            cy.get('form').should('be.visible');
            cy.get('#name').should('be.visible').and('be.empty');
        })
    })
    describe('Cenário 3:Usuária realiza cadastro de dados com sucesso', () =>{
        it.skip('Cadastramento de dados válidos', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#name').type('Maria');
            cy.get('#lastName').type('Silva');
            cy.get('#email').type(emailRegistroValido);
            cy.get('#password').type(senhaValida);
            cy.get('#confrimPassword').type(senhaValida);
            cy.get(':nth-child(6) > .sc-ed033677-1 > .sc-ed033677-2 > .sc-ed033677-3 > .sc-ed033677-4')
                .not('[disabled]')
                .click();
            cy.wait(200);
            cy.get(':nth-child(7) > .sc-ed033677-1 > .sc-ed033677-2 > .sc-ed033677-3 > .sc-ed033677-4')
                .not('[disabled]')
                .click();
            cy.wait(200);
            cy.get('.hdfRWQ > .sc-f3c66ae8-1')
                .should('be.visible')
                .click();
        cy.wait(200);
        cy.url()
            .should('be.equal', URL +'/email-verification');
        cy.contains('Estamos quase lá');
        })
    })
    describe('Cenário 4: Usuária está na tela de registro e quer retornar a tela de Boas-vindas', () =>{
        it('Verificação do funcionamento do botão "Voltar"', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('.LiRAN > .sc-f3c66ae8-1')
                .should('be.visible')
                .click();
                cy.wait(200);
            cy.url()
                .should('be.equal',URL + '/');
                cy.contains('Boas-vindas à Lacrei Saúde');
        })
    })
    describe('Cenário 5: Usuária cadastra senha válida de acordo com os requisitos', () =>{
        it('Verificação dos sinalizadores de senha válida', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#password').type(senhaValida);
            cy.get('#confrimPassword').type(senhaValida);
            cy.get('ul > :nth-child(2)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(3)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(4)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(5)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(6)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(7)').should('have.class', 'sucess')
        })
    })
    describe('Cenário 6: Usuária cadastra senha inválida de acordo com os requisitos', () =>{
        it('Verificação dos sinalizadores de senha inválida utilizando senha com menos de 8 caracteres', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#password').type('@Ab1234');
            cy.get('#confrimPassword').type('@Ab1234');
            cy.get('ul > :nth-child(2)').should('have.class', 'error')
            cy.get('ul > :nth-child(3)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(4)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(5)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(6)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(7)').should('have.class', 'sucess')
        })
        it('Verificação dos sinalizadores de senha inválida utilizando senha sem letra maiúscula', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#password').type('@b123451');
            cy.get('#confrimPassword').type('@b123451');
            cy.get('ul > :nth-child(2)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(3)').should('have.class', 'error')
            cy.get('ul > :nth-child(4)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(5)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(6)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(7)').should('have.class', 'sucess')
        })
        it('Verificação dos sinalizadores de senha inválida utilizando senha sem letra minúscula', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#password').type('@A123451');
            cy.get('#confrimPassword').type('@A123451');
            cy.get('ul > :nth-child(2)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(3)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(4)').should('have.class', 'error')
            cy.get('ul > :nth-child(5)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(6)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(7)').should('have.class', 'sucess')
        })
        it('Verificação dos sinalizadores de senha inválida utilizando senha sem número', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#password').type('@Abcdefg');
            cy.get('#confrimPassword').type('@Abcdefg');
            cy.get('ul > :nth-child(2)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(3)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(4)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(5)').should('have.class', 'error')
            cy.get('ul > :nth-child(6)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(7)').should('have.class', 'sucess')
        })
        it('Verificação dos sinalizadores de senha inválida utilizando senha sem caractere especial', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#password').type('Ab123451');
            cy.get('#confrimPassword').type('Ab123451');
            cy.get('ul > :nth-child(2)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(3)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(4)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(5)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(6)').should('have.class', 'error')
            cy.get('ul > :nth-child(7)').should('have.class', 'sucess')
        })
        it('Verificação dos sinalizadores de senha inválida utilizando senha diferente na confirmação de senha', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#password').type('@Ab123451');
            cy.get('#confrimPassword').type('@Ab123');
            cy.get('ul > :nth-child(2)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(3)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(4)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(5)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(6)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(7)').should('have.class', 'error')
        })
        it('Verificação dos sinalizadores de senha inválida verificando mais de um parâmetro faltando', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#password').type('@2345');
            cy.get('ul > :nth-child(2)').should('have.class', 'error')
            cy.get('ul > :nth-child(3)').should('have.class', 'error')
            cy.get('ul > :nth-child(4)').should('have.class', 'error')
            cy.get('ul > :nth-child(5)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(6)').should('have.class', 'sucess')
            cy.get('ul > :nth-child(7)').should('have.class', 'error')
        })
    })
    describe('Cenário 7: Usuário já cadastro tenta realizar cadastro', () =>{
        it.skip('Cadastra uma nova pessoa usúaria com dados válidos', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#name').type('Maria');
            cy.get('#lastName').type('Silva');
            cy.get('#email').type(emailRecadastramento);
            cy.get('#password').type('@Ab12345');
            cy.get('#confrimPassword').type('@Ab12345');
            cy.get(':nth-child(6) > .sc-ed033677-1 > .sc-ed033677-2 > .sc-ed033677-3 > .sc-ed033677-4')
                .not('[disabled]')
                .click();
            cy.wait(200);
            cy.get(':nth-child(7) > .sc-ed033677-1 > .sc-ed033677-2 > .sc-ed033677-3 > .sc-ed033677-4')
                .not('[disabled]')
                .click();
            cy.wait(200);
            cy.get('.hdfRWQ > .sc-f3c66ae8-1')
                .should('be.visible')
                .click();
        cy.wait(200);
        cy.url()
            .should('be.equal',URL + '/email-verification');
        cy.contains('Estamos quase lá');
        })
        it('Cadastramento de usuária utilizando e-mail já cadastrado',() =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#name').type('Maria');
            cy.get('#lastName').type('Silva');
            cy.get('#email').type(emailRecadastramento);
            cy.get('#password').type(senhaValida);
            cy.get('#confrimPassword').type(senhaValida);
            cy.get(':nth-child(6) > .sc-ed033677-1 > .sc-ed033677-2 > .sc-ed033677-3 > .sc-ed033677-4')
                .not('[disabled]')
                .click();
            cy.wait(200);
            cy.get(':nth-child(7) > .sc-ed033677-1 > .sc-ed033677-2 > .sc-ed033677-3 > .sc-ed033677-4')
                .not('[disabled]')
                .click();
            cy.wait(200);
            cy.get('.hdfRWQ > .sc-f3c66ae8-1')
                .should('be.visible')
                .click();
            cy.wait(200); 
            cy.contains('Algo deu errado, por favor, confirme os dados inseridos e tente novamente');
            cy.url()
                .should('be.equal',URL + '/register');
        })
    })
    describe('Cenário 8: Usuário acessa os Termos de uso',() =>{
        it('Verificação acesso ao link dos Termos de uso', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('a:contains(Termos de uso)').click();
            cy.wait(200); 
            cy.url()
                .should('be.equal',URL + '/security-privacy');
            cy.contains('h1','Segurança e Privacidade');
        })
    })
    describe('Cenário 9: Usuário acessa a Política de privacidade',() =>{
        it('Verificação acesso ao link dos Política de privacidade', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('a:contains(Política de privacidade)').click();
            cy.wait(200); 
            cy.url()
                .should('be.equal',URL + '/security-privacy');
            cy.contains('h1','Segurança e Privacidade');
        })
    })
    describe('Cenário 10: Usuário tenta finalizar o cadastro sem selecionar os checkbox de “Li e concordo…” e “Tenho mais de 18 anos”',() =>{
        it('Validação da não finalização do cadastro sem os checkbox selecionados', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#name').type('Maria');
            cy.get('#lastName').type('Silva');
            cy.get('#email').type(emailRecadastramento);
            cy.get('#password').type('@Ab12345');
            cy.get('#confrimPassword').type('@Ab12345');
            cy.get(':nth-child(6) > .sc-ed033677-1 > .sc-ed033677-2 > .sc-ed033677-3 > .sc-ed033677-4')
                .not('[disabled]')
                .not('selected');
            cy.wait(200);
            cy.get(':nth-child(7) > .sc-ed033677-1 > .sc-ed033677-2 > .sc-ed033677-3 > .sc-ed033677-4')
                .not('[disabled]')
                .not('selected');
            cy.wait(200);
            cy.get('.hdfRWQ > .sc-f3c66ae8-1')
                .should('be.visible')
                .click();
        cy.wait(200);
        cy.contains('Campo obrigatório');
        cy.get(':nth-child(6) > .sc-ed033677-6').should('be.visible');
        cy.get('.sc-ed033677-6').should('be.visible');
        })
    })
    describe('Cenário 11: Usuário tenta finalizar o cadastro sem selecionar os checkbox de “Li e concordo…” ',() =>{
        it('Validação da não finalização do cadastro sem o checkbox de de “Li e concordo…” selecionado', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#name').type('Maria');
            cy.get('#lastName').type('Silva');
            cy.get('#email').type(emailRecadastramento);
            cy.get('#password').type('@Ab12345');
            cy.get('#confrimPassword').type('@Ab12345');
            cy.get(':nth-child(6) > .sc-ed033677-1 > .sc-ed033677-2 > .sc-ed033677-3 > .sc-ed033677-4')
                .not('[disabled]')
                .not('selected');
            cy.wait(200);
            cy.get(':nth-child(7) > .sc-ed033677-1 > .sc-ed033677-2 > .sc-ed033677-3 > .sc-ed033677-4')
                .not('[disabled]')
                .click();
            cy.wait(200);
            cy.wait(200);
            cy.get('.hdfRWQ > .sc-f3c66ae8-1')
                .should('be.visible')
                .click();
        cy.wait(200);
        cy.contains('Campo obrigatório');
        cy.get(':nth-child(6) > .sc-ed033677-6').should('be.visible');
        })
    })
    describe('Cenário 12: Usuário tenta finalizar o cadastro sem selecionar os checkbox de “Tenho mais de 18 anos” ',() =>{
        it('Validação da não finalização do cadastro sem o checkbox de “Tenho mais de 18 anos” selecionado', () =>{
            cy.url()
            .then(urlValue => cy.visit(urlValue + '/register'));
            cy.wait(200);
            cy.get('#name').type('Maria');
            cy.get('#lastName').type('Silva');
            cy.get('#email').type(emailRecadastramento);
            cy.get('#password').type('@Ab12345');
            cy.get('#confrimPassword').type('@Ab12345');
            cy.get(':nth-child(6) > .sc-ed033677-1 > .sc-ed033677-2 > .sc-ed033677-3 > .sc-ed033677-4')
                .not('[disabled]')
                .click();
            cy.wait(200);
            cy.get(':nth-child(7) > .sc-ed033677-1 > .sc-ed033677-2 > .sc-ed033677-3 > .sc-ed033677-4')
                .not('[disabled]')
                .not('selected');
            cy.wait(200);
            cy.get('.hdfRWQ > .sc-f3c66ae8-1')
                .should('be.visible')
                .click();
        cy.wait(200);
        cy.contains('Campo obrigatório');
        cy.get('.sc-ed033677-6').should('be.visible');
        })
    })    
})