const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertUser = async function(usuario){

    try {

        let sql = `insert into tbl_usuario (nome, nickname, email, senha, foto_perfil, numero, cpf)
                   values ('${usuario.nome}', '${usuario.nickname}', '${usuario.email}', '${usuario.senha}',
                           '${usuario.foto_perfil}', '${usuario.numero}', '${usuario.cpf}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }

}

const selectUser = async function(){
    try {

        let sql = `select * from tbl_usuario`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
        
    } catch (error) {
        return false
    }
}

const searchUser = async function(search_id){
    try {

        let sql = `select * from tbl_usuario where id = ${search_id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
        
    } catch (error) {
        return false
    }
}

const updateUser = async function(usuario){
    try {

        let sql = `update tbl_usuario set nome        =        '${usuario.nome}',
                                           nickname    =       '${usuario.nickname}',
                                           senha       =       '${usuario.senha}',
                                           email       =       '${usuario.email}',
                                           cpf         =       '${usuario.cpf}',
                                           numero      =       '${usuario.numero}',
                                           foto_perfil =       '${usuario.foto_perfil}'
                                           where id    =        ${usuario.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteUser = async function(search_id){
    try {

        let sql = `delete from tbl_usuario where id = ${search_id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

module.exports = {
    insertUser,
    searchUser,
    selectUser,
    updateUser,
    deleteUser
}