import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";


@Entity({name: 'tb_tarefa'})
export class Tarefa{
    
    @PrimaryGeneratedColumn()
    id: number


    @IsNotEmpty()
    @MaxLength(50)
    @Column({nullable: false, length: 50})
    nome: string

    @IsNotEmpty()
    @MaxLength(500)
    @Column({nullable: false, length: 500})
    descricao: string

    @IsNotEmpty()
    @MaxLength(50)
    @Column({nullable: false, length: 50})
    responsavel: string

    @Column()
    data: Date

    @Column()
    status: boolean

    @ManyToOne(() => Categoria, (categoria) => categoria.tarefa,{
        onDelete: "CASCADE"
    })
    categoria: Categoria

}