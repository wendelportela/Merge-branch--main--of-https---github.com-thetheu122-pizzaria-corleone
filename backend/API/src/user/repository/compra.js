import { con } from "../../conection.js";

export async function novaCompra(compra) {
  const comando = `
    INSERT INTO tb_pedido_produto (id_cliente, ds_produtos, ds_subtotal, ds_total, ds_desconto, ds_frete, ds_qtd,ds_status)
    VALUES (?, ?, ?, ?, ?, ?, ?,?)
  `;
  
  const [resposta] = await con.query(comando, [
    compra.id_cliente,
    JSON.stringify(compra.ds_produtos),
    compra.subtotal,
    compra.total_compra,
    compra.desconto,
    compra.frete,
    compra.ds_qtd,
    compra.ds_status
  ]);

  compra.id = resposta.insertId;
  return compra;
}

export async function listarPedido_produto() {
  // Se necessário, adicione lógica para listar pedidos específicos
}

export async function listarCompra(id) {
  const comando = `
    SELECT
      tb_pedido_produto.id_pedido_produto,
      tb_cliente.id_cliente,
      tb_pedido_produto.ds_desconto AS desconto,
      tb_cliente.nm_cliente AS nome_cliente,
      tb_pedido_produto.ds_total,
      JSON_UNQUOTE(tb_pedido_produto.ds_produtos) AS ds_produtos,
      tb_pedido_produto.ds_subtotal,
      tb_pedido_produto.ds_frete,
      tb_pedido_produto.ds_qtd
    FROM tb_pedido_produto
    INNER JOIN tb_cliente ON tb_pedido_produto.id_cliente = tb_cliente.id_cliente
    WHERE tb_cliente.id_cliente = ?
    AND   tb_pedido_produto.ds_status = false;
  `;
  
  const [resposta] = await con.query(comando, [id]);
  return resposta;
}

export async function alterarCompra(compra, id) {
  const comando = `
    UPDATE tb_pedido_produto
    SET
      ds_desconto = ?,
      ds_produtos = ?,
      ds_subtotal = ?,
      ds_total = ?,
      ds_frete = ?,
      ds_qtd = ?
    WHERE id_pedido_produto = ?;
  `;
  
  const [resposta] = await con.query(comando, [
    compra.desconto,
    JSON.stringify(compra.produtos),
    compra.subtotal,
    compra.total,
    compra.frete,
    compra.ds_qtd,
    id,
  ]);

  if (resposta.affectedRows === 1) {
    return 'alterado com sucesso';
  } else {
    return 'erro. não foi possível alterar';
  }
}

export async function deleteCompra(id) {
  const comando = `
    DELETE FROM tb_pedido_produto
    WHERE id_pedido_produto = ?;
  `;
  
  const [resposta] = await con.query(comando, [id]);
  return resposta;
}

export async function verificarCompra(idp, idc) {
  const comando = `
    SELECT * 
    FROM  tb_pedido_produto
    INNER JOIN tb_cliente ON tb_pedido_produto.id_cliente = tb_cliente.id_cliente
    WHERE tb_pedido_produto.id_pedido_produto = ?
    AND tb_cliente.id_cliente = ?;
  `;
  
  const [resposta] = await con.query(comando, [idp, idc]);
  return resposta;
}
