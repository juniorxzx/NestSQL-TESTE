import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

export class CategoriaService{
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository : Repository<Categoria>
    ){}

    async findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            relations: {
                tarefa: true
            }
        })
    }

    async findById(id: number): Promise<Categoria> {
        let categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
            relations: {
                tarefa: true
            }
        })

        if (!categoria)
            throw new HttpException("Categoria não encontrada", HttpStatus.NOT_FOUND)
        return categoria
    }

    async findByDescricao(descricao: string): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                tarefa: true
            }
        })
    }

    async create(Categoria: Categoria): Promise<Categoria> {
        return this.categoriaRepository.save(Categoria)
    }

    async update(Categoria: Categoria): Promise<Categoria> {
        let CategoriaUpdate = await this.findById(Categoria.id)

        if (!CategoriaUpdate || Categoria.id)
            throw new HttpException("Categoria não encontrada", HttpStatus.NOT_FOUND)

            return this.categoriaRepository.save(Categoria)
    }

    async delete(id: number): Promise<DeleteResult>{
        let CategoriaDelete = await this.findById(id)

        if(!CategoriaDelete)
        throw new HttpException("Categoria não encontrada", HttpStatus.NOT_FOUND)

        return this.categoriaRepository.delete(id)
    }
}