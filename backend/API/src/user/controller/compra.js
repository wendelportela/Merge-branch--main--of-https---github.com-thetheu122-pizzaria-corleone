
import { Router } from "express";
import { alterarCompra, deleteCompra, listarCompra, novaCompra, verificarCompra } from "../repository/compra.js";



const endpoints = Router()


endpoints.post ('/corleone/pedido/produto' , async (req,resp)=>{
    try {
        const compra   = req.body
        // console.log('post :'+ compra)
        const resposta = await novaCompra(compra) 
     

        resp.send(resposta)
    } catch (err) {
        resp.status(400).send({error:err.message})
    }
})


endpoints.get('/corleone/pedido/cliente/:id', async ( req , resp ) =>{
    try {
        const {id} = req.params
        const resposta = await listarCompra(id)

        resp.send(resposta)
    } catch (error) {
        resp.status(400).send({error:error.message})
    }
})


endpoints.get('/corleone/pedido/cliente/verificar/:idp/:idc', async ( req , resp ) =>{
    try {
        const {idp,idc} = req.params
//  console.log('post:' +compra)
        const resposta = await verificarCompra(idp,idc)
 
        resp.send(resposta)
    } catch (error) {
        resp.status(400).send({error:error.message})
    }
})

endpoints.put('/corleone/altera/pedido/:id' , async ( req , resp ) =>{
    try {
        
        const {id}   = req.params
        const compra = req.body
        const resposta = await alterarCompra( compra , id )
        resp.send(resposta)

    } catch (error) {
        resp.status(500).send({ errr: error.message })

    }
})

endpoints.delete('/corleone/deletar/compra/:id', async (req,resp) =>{
    try {
        const {id} = req.params
        const resposta  = await deleteCompra(id)

        resp.send(resposta)
    } catch (error) {
        resp.status(500).send({err:error.message})
    }
})
export default endpoints