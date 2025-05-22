/********************************************************** 
 * Controller para gerenciar o CRUD de usuarios 
 * Data: 22/05/2025
 * Autor: Pedro
 * Versão: 1.0
***********************************************************/

//Importe do aquivo config com as menssagens de retorno
const MESSAGE = require('../modulo/config')

//Import do DAO de usuário
const usuarioDAO = require('../model/usuario.js')


//Função para inserir usuário no Banco de dados 
const inserirUsuario = async function(usuario, contentType){

    try{

        if(contentType == 'application/json'){

            if(
                usuario.email       == undefined || usuario.email       == ''|| usuario.email    == null ||usuario.email.length          > 60   ||  
                usuario.senha       == undefined || usuario.senha       == ''|| usuario.senha    == null ||usuario.senha.length          > 30   ||
                usuario.cpf         == undefined ||                                                        usuario.cpf.length            > 15   ||
                usuario.nome        == undefined || usuario.nome        == ''|| usuario.nome     == null ||usuario.nome.length           > 45   ||
                usuario.nickname    == undefined || usuario.nickname    == ''|| usuario.nickname == null ||usuario.nickname.length       > 20   ||
                usuario.numero      == undefined ||                                                        usuario.numero.length         > 20   || 
                usuario.foto_perfil == undefined ||                                                        usuario.foto_perfil.length    > 200 
            ){

                return MESSAGE.ERROR_REQUIRED_FIELDS //400

            }

            let resultUsuario = await usuarioDAO.insertUser(usuario)

            if(resultUsuario){
                
                return MESSAGE.SUCCESS_CREATED_ITEM //201
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }

        }else{
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
        
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para atualizar um usuário no banco de dados
const atualizarUsuario = async function(usuario, id, contentType) {
    
    try{
        
        if(contentType == 'application/json'){

            if(
                id                  == undefined || id                  == ''|| id               == null || isNaN(id) || id <= 0 ||
                usuario.email       == undefined || usuario.email       == ''|| usuario.email    == null ||usuario.email.length          > 60   ||  
                usuario.senha       == undefined || usuario.senha       == ''|| usuario.senha    == null ||usuario.senha.length          > 30   ||
                usuario.cpf         == undefined ||                                                        usuario.cpf.length            > 15   ||
                usuario.nome        == undefined || usuario.nome        == ''|| usuario.nome     == null ||usuario.nome.length           > 45   ||
                usuario.nickname    == undefined || usuario.nickname    == ''|| usuario.nickname == null ||usuario.nickname.length       > 20   ||
                usuario.numero      == undefined ||                                                        usuario.numero.length         > 20   || 
                usuario.foto_perfil == undefined ||                                                        usuario.foto_perfil.length    > 200 
            ){

                return MESSAGE.ERROR_REQUIRED_FIELDS //400

            }

            usuario.id = id

            let resultUsuario = await usuarioDAO.updateUser(usuario)

            if(resultUsuario){
                
                return MESSAGE.SUCCESS_CREATED_ITEM //201
            
            }else{

                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500

            }

        }else{
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para excluir um usuário no banco de dados
const excluirUsuario = async function(id) {
    
    try{

        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let resultUsuario = await buscarUsuario(parseInt(id))

            if(resultUsuario.status_code == 200){

                let result = await usuarioDAO.deleteUser(id)

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }

            }else if (resultUsuario.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return  MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }

    }else{
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const listarUsuario = async function () {
    
    try{

        let dadosUsuarios = {}

        let resultUsuario = await usuarioDAO.selectUser()

        if(resultUsuario != false || typeof (resultUsuario) == 'object'){

            if(resultUsuario.length > 0 ){

                dadosUsuarios.status = true
                dadosUsuarios.status_code = 200
                dadosUsuarios.itens = resultUsuario.length
                dadosUsuarios.usuarios = resultUsuario

                return dadosUsuarios //200

            }else{
                return MESSAGE.ERROR_NOT_FOUND // 404
            }

        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }   

}

const buscarUsuario = async function (id) {

    try{

        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let dadosUsuarios= {}

            let resultUsuario = await usuarioDAO.searchUser(parseInt(id))

            if(resultUsuario !== String(resultUsuario)){
                
                if(resultUsuario != false || typeof(resultUsuario) == 'object'){

                    if(resultUsuario.length > 0){

                        //Cria um objeto Json para retornar a lista de Desenvolvedores
                        dadosUsuarios.status = true
                        dadosUsuarios.status_code = 200
                        dadosUsuarios.Itens = resultUsuario.length
                        dadosUsuarios.usuarios = resultUsuario
        
                        return  dadosUsuarios//200
                    }else{
            
                        return MESSAGE.ERROR_NOT_FOUND //404
                    }
        
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE//415
            }
            
        }else{
            return ERROR_REQUIRED_FIELD //400
        }


    }catch(result){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
}