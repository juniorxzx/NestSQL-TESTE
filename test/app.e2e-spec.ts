import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let tarefaId: number

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '11072512',
          database: 'db_todolist_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  //Teste para inserir uma Tarefa no banco
  it('01 - Deve inserir uma Tarefa no Banco', async () => {
    let response = await request(app.getHttpServer())
      .post('/tarefa')
      .send({
        nome: 'tarefa teste',
        descricao: 'teste',
        responsavel: 'pessoa teste',
        data: '2022-09-15',
        status: true
      })
      .expect(201)

    tarefaId = response.body.id

  })

  //teste para recuperar//
  it('02 - Deve recuperar uma tarefa no banco', async () => {
    return request(app.getHttpServer())
      .get(`/tarefa/${tarefaId}`)
      .expect(200)
  })

  //atualiza tarefa no banco
  it('03 - Deve atualizar uma tarefa no banco', async () => {
    return request(app.getHttpServer())
      .put('/tarefa')
      .send({
        id: 1,
        nome: 'limpar a casa',
        descricao: 'fazer limpeza pela manhã',
        responsavel: 'Alguem',
        data: '2022-09-15',
        status: true
      })
      .expect(200)
      .then((response) => {
        expect('limpar a casa').toEqual(response.body.nome)
        expect("Alguem").toEqual(response.body.responsavel)
      })
  })
  
  //deleta tarefa no banco
  it('04 - Deve excluir uma tarefa no banco',async () => {
    return request(app.getHttpServer())
    .delete(`/tarefa/${tarefaId}`)
    .expect(204)
  })

  //para os testes
  afterAll(async () => {
    await app.close()
  })


});
