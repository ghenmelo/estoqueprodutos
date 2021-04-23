import axios, {AxiosResponse} from 'axios'
import env from "react-dotenv";

interface Produto {
  id ?: Number,
  nome : String,
  descricao: String,
  preco: Number,
  quantidade: Number,
}

interface Pagination {
  produtos : Produto[];
  total : number;
}

interface BadgesNumbers {
  alert : Number;
  alarm: Number;
  check: Number;
}

const {BACKEND_URL, BACKEND_PORT} = env;

const axiosCaller = axios.create({
  baseURL: `http://${BACKEND_URL}:${BACKEND_PORT}/`,
})

export const getAllProdutos  = async (page : number, filter: string, situacaoSearch: string) : Promise<AxiosResponse<Pagination>> => {
  return await axiosCaller.post<Pagination>(`/page/${page}`, { filter, situacaoSearch }).then((e) => {
    return e;
  });
}

export const getProdutoById  = async (id: Number) : Promise<AxiosResponse<Produto[]>> => {
  return await axiosCaller.get<Produto[]>(`/${id}`).then((e) => {
    return e;
  });
}

export const addNovoProduto  = async (produto: Produto) : Promise<AxiosResponse<Produto[]>> => {
  return await axiosCaller.post<Produto[]>(`/`, { produto }).then((e) => {
    return e;
  });
}

export const updateProduto  = async (produto: Produto) : Promise<AxiosResponse<Produto[]>> => {
  return await axiosCaller.put<Produto[]>(`/`, { produto }).then((e) => {
    return e;
  });
}

export const deleteProduto  = async (id: Number) : Promise<AxiosResponse<Produto[]>> => {
  return await axiosCaller.delete<Produto[]>(`/${id}`).then((e) => {
    return e;
  });
}

export const getBadges = async (filter: string, situacaoSearch: string) : Promise<AxiosResponse<BadgesNumbers>> => {
  return await axiosCaller.post<BadgesNumbers>(`/getBadges`, { filter, situacaoSearch }).then((e) => {
    return e;
  });
}