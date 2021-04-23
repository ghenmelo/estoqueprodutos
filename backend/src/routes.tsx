import { Router, Request, Response } from 'express'
import { getProdutos, getProdutoById, addNovoProduto, updateProduto, deleteProduto, getBagdesValues } from './service/produtosService'

const routes = Router();

routes.get('/id/:id', async (req : Request, res: Response) => {
  console.log("requisição HTTP get /:id")
  const id = req.params.id;
  if (id) {
    getProdutoById(parseInt(id)).then((e) => {
        res.send(e);
    }).catch(() => {
      res.status(400).send("Não foi possível encontrar o produto o produto");
    })
  } else {
    res.status(400).send("Não foi possível encontrar o produto desejado");
  }
})

routes.post('/page/:page', async (req : Request, res: Response) => {
  console.log("requisição HTTP get /")
  const page = req.params.page
  const filter = req.body.filter
  const situacao = req.body.situacaoSearch
  getProdutos(parseInt(page), filter, situacao).then((e) => {
    res.send(e)
  }).catch(() => {
    res.status(400).send("Não foi possível buscar os produto");
  })
})

routes.post('/getBadges', async (req : Request, res: Response) => {
  console.log("requisição HTTP get /getBadges")
  const filter = req.body.filter;
  const situacao = req.body.situacaoSearch;
  getBagdesValues(filter, situacao).then((e) => {
    res.send(e)
  }).catch(() => {
    res.status(400).send("Não foi possível buscar os badges do produto");
  })
})

routes.post('/', (req : Request, res: Response) => {
  console.log("requisição HTTP post /")
  const produto = req.body.produto;
  if (produto) {
    addNovoProduto(produto).then((e) => {
      res.send(e);
    }).catch(() => {
      res.status(400).send("Não foi possível adicionar o produto");
    })
  } else {
    res.status(400).send("Não foi possível adicionar o produto");
  }
})

routes.put('/', (req : Request, res: Response) => {
  console.log("requisição HTTP put /")
  const produto = req.body.produto;
  if (produto && produto.id) {
    updateProduto(produto).then((e) => {
      res.send(e);
    }).catch(() => {
      res.status(400).send("Não foi possível atualizar o produto");
    })
  } else {
    res.status(400).send("Não foi possível atualizar o produto");
  }
})

routes.delete('/:id', (req : Request, res: Response) => {
  const id = req.params.id;
  console.log("requisição HTTP delete /:id")
  if (id) {
    deleteProduto(id).then((e) => {
      res.send(e)
    }).catch(() => {
      res.status(400).send("Não foi possível deletar o produto");
    });
  } else {
    res.status(400).send("Não foi possível deletar o produto");
  }
})

export default routes;