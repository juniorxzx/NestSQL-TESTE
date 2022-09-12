import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/module/categoria.module';
import { Tarefa } from './tarefa/entities/tarefa.entity';
import { TarefaModule } from './tarefa/modules/tarefa.module';


//conectando o banco de dados
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '11072512',
      database: 'db_todo',
      entities: [Tarefa, Categoria],
      synchronize: true
    }),
    TarefaModule,
    CategoriaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
