import databaseCon from '../database/databaseCon';

interface Produto {
  id ?: Number,
  nome : String,
  descricao: String,
  preco: Number,
  quantidade: Number,
}

const situacaoLimit = (situacao : String) => {
  if (situacao === 'OK') {
    return ' est.quantidade > 50 '
  } else if (situacao === 'Alerta') {
    return ' est.quantidade > 20 AND est.quantidade < 51 '
  } else if (situacao === 'Alarme') {
    return ' est.quantidade < 21  '
  } 
}

const makeSituacaoFiltro = (filtro: String, situacao : String) => { 
  if (!situacao) {
    return '';
  }

  if (!filtro) {
    return ' WHERE' + situacaoLimit(situacao);
  } 
  return ' AND' + situacaoLimit(situacao);
}

export const getProdutos = async (page: number, filter: String, situacao: String) => {
  console.log(situacao);
  const offSet = 6 * (page - 1);
  const rows = await databaseCon.query(
    `SELECT * FROM ESTOQUEPRODUTOS est ${filter ? `WHERE est.nome LIKE ?` : ''}
     ${makeSituacaoFiltro(filter, situacao)} LIMIT 6 OFFSET ${offSet}`, ['%' + filter + '%']);
  const totalProdutos : any = await databaseCon.query(
    `SELECT COUNT(*) as total FROM ESTOQUEPRODUTOS est ${filter ? `WHERE est.nome LIKE ?` : ''}
     ${makeSituacaoFiltro(filter, situacao)}`, ['%' + filter + '%']);
  const total = Math.ceil(totalProdutos[0][0].total / 6);
  return {produtos : rows[0], total};
}

export const getProdutoById = async (id : Number) => {
  const row = await databaseCon.query(`SELECT * FROM ESTOQUEPRODUTOS est WHERE est.id = ${id}`);
  return row[0];
}

export const addNovoProduto = async (produto : Produto) => {
  return await databaseCon
  .query(`INSERT INTO ESTOQUEPRODUTOS
      (nome, descricao, preco, quantidade) 
      VALUES ('${produto.nome}', '${produto.descricao}', ${produto.preco}, ${produto.quantidade})`);
}

export const updateProduto = async (produto : Produto) => {
  return await databaseCon
  .query(`UPDATE ESTOQUEPRODUTOS 
      SET nome = '${produto.nome}', descricao = '${produto.descricao}', preco = ${produto.preco}, quantidade = ${produto.quantidade} 
      WHERE id = ${produto.id}`);
}

export const deleteProduto = async (id : String) => {
  return await databaseCon.query(`DELETE FROM ESTOQUEPRODUTOS WHERE id = ${id}`)
}

export const getBagdesValues = async (filter: string, situacao: String) => {
  const rows: any = await databaseCon.query(`SELECT est.quantidade as qtd FROM ESTOQUEPRODUTOS est ${filter ? `WHERE est.nome LIKE ?` : ''} ${makeSituacaoFiltro(filter, situacao)}`, ['%' + filter + '%']);
  let alert = 0;
  let check = 0;
  let alarm = 0;
  
  rows[0].map((e: any) => {
    const qtd = e.qtd
    if (qtd < 21) {
      alarm += 1;
    } else if ( qtd < 51) {
      alert +=1 ;
    } else {
      check +=1;
    }
  })
  return {alert, check, alarm};
}