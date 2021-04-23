import React, {useEffect, useState} from 'react';
import './Tabela.scss'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search' ;
import { Badge, Button, CircularProgress, TableCell, TableRow } from '@material-ui/core';
import { getAllProdutos, getBadges, deleteProduto, addNovoProduto, updateProduto } from '../../../service/axios/produtos/produtosCrud'
import check from '../../../img/check.svg'
import alarm from '../../../img/alarm.svg'
import alert from '../../../img/alert.svg'
import { Delete, Edit } from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';
import { errorToast, sucessToast, warningToast  } from '../ToastersProdutos';
import ModalProduto from '../Modal/ModalProduto';

interface Produto {
   id ?: Number,
   nome : String,
   descricao: String,
   preco: Number,
   quantidade: Number,
}

enum ColorBadge {
   Critico = 'rgba(204, 37, 87, 0.20)',
   Alerta = 'rgba(234, 187, 34, 0.20)',
   Ok = 'rgba(85, 154, 76, 0.20)',
 }

 interface BadgesNumbers {
   alert : Number;
   alarm: Number;
   check: Number;
 }

const Tabela = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [produtos, setProdutos] = useState<Produto[]>([])
   const [page, setPage] = useState<number>(1);
   const [total, setTotal] = useState<number>(0);
   const [modal, setModal] = useState<boolean>(false);
   const [badgesNumber, setBadgesNumber] = useState<BadgesNumbers>({alert: 0, alarm: 0, check: 0});
   const [filter, setFilter] = useState<string>('');
   const [modalValues, setModalValues] = useState<Produto>({ nome: '', descricao: '', preco: 0, quantidade: 0})
   const [editing, setEditing] = useState<boolean>(false);
   const [situacaoSearch, setSituacaoSearch] = useState<string>('');

   const updateTable = async () => {
      setLoading(true)
      getAllProdutos(page, filter, situacaoSearch).then((e) => {
         const response = e.data;
         setProdutos(response.produtos);
         setTotal(response.total);
         setLoading(false);
      });   
      getBadges(filter, situacaoSearch).then((e) => {
         setBadgesNumber(e.data)
      });
   }

   useEffect(() => {
      updateTable();
   }, [page, situacaoSearch]);

   const clearFields = () => {
      setModalValues({ nome: '', descricao: '', preco: 0, quantidade: 0});
   }

   const deleteProdutoFromTable = async (id : Number) => {
      deleteProduto(id).then(() => {
         updateTable();
      })
   }

   const allFieldsFilleds = () => {
      if (modalValues.nome.length === 0) {
         warningToast('nome');
         return false;
      } else if (modalValues.descricao.length === 0) {
         warningToast('descricao');
         return false;
      } else if (modalValues.preco === 0) {
         warningToast('preco');
         return false;
      } else if (modalValues.quantidade === 0) {
         warningToast('quantidade');
         return false;
      }
      return true;
   }

   const salvarNovoProduto = async () => {
      if (!allFieldsFilleds()) {
         return
      }
      console.log(editing)
      if (editing) {
         updateProduto(modalValues).then((e) => {
            sucessToast('alterado');
            updateTable();
         }).catch(() => {
            errorToast('alterado');
         });
         clearFields();
         setModal(false);
      } else {
         addNovoProduto(modalValues).then((e) => {
            sucessToast('cadastrado');
            updateTable();
         }).catch(() => {
            errorToast('cadastrado');
         });
         clearFields();
         setModal(false);
      }
   }

   const typeBadge = (quantidade : Number): any => {
      let color = '';
      let icon = null;
      if (quantidade < 21) {
         color = ColorBadge.Critico;
         icon = alarm;
      } else if (quantidade < 51) {
         color = ColorBadge.Alerta;
         icon = alert;
      } else {
         color = ColorBadge.Ok;
         icon = check;
      }
      return [color, icon];
   }

   return <div className="container">
      <h1 className="title">Estoque de Produtos</h1>

      <div className="divider"></div>

      <div className='block'>
         <Paper component="form" className="paper">
            <InputBase
            type='text'
            className='input'
            placeholder="Digite palavra chave para pesquisa"
            value={filter}
            onChange={(e) => { setFilter(e.target.value)}}
            onKeyPress={(e) => { 
               e.key === 'Enter' && e.preventDefault();
               if (e.key === 'Enter') {
                  setPage(1);
                  updateTable();
               }
             }}
            />
            <IconButton className='icon' aria-label="search" onClick={ () =>{ 
               setPage(1);
               updateTable();
               }}>
            <SearchIcon />
            </IconButton>
         </Paper>
         <Button className="cadastrar" onClick={() => setModal(true)}>
            ADICIONAR PRODUTO
         </Button>
      </div>
      
      <ModalProduto
            modalValues={modalValues}
            clearFields={clearFields}
            modal={modal}
            setModal={setModal}
            setEditing={setEditing}
            salvarNovoProduto={salvarNovoProduto}
            setModalValues={setModalValues}
         />

      <div className="doubleDivider"></div>

      <div className='iconsBadge'>
         <Badge badgeContent={badgesNumber.alarm} className="alarm" >
            <Paper className="bagdeContainer" onClick={() => {
            if(situacaoSearch !== 'Alarme') {
               setSituacaoSearch('Alarme');
            } else {
               setSituacaoSearch('');
            }
            setPage(1);
         }}>
               <img src={alarm} alt='alarm'/>
               Crítico
            </Paper>
         </Badge>
         <Badge badgeContent={badgesNumber.alert} className="alert" >
            <Paper className="bagdeContainer" onClick={() => {
            if(situacaoSearch !== 'Alerta') {
               setSituacaoSearch('Alerta');
            } else {
               setSituacaoSearch('');
            }
            setPage(1);
         }}>
               <img src={alert} alt='alert'/>
               Alerta
            </Paper>
         </Badge>
         <Badge badgeContent={badgesNumber.check} className="check" >
            <Paper className="bagdeContainer" onClick={() => {
            if(situacaoSearch !== 'OK') {
               setSituacaoSearch('OK');
            } else {
               setSituacaoSearch('');
            }
            setPage(1);
         }}>
               <img src={check} alt='check'/>
               Ok
            </Paper>
         </Badge>
      </div>

      <div className="tabelaHeader">
         <TableRow className = "tableRowStyleHeader">
            <TableCell align="center" className='badgeCell'>
               SITUAÇÃO
            </TableCell>
            <TableCell align="center">
                  NOME
            </TableCell>
            <TableCell align="center">DESCRIÇÃO</TableCell>
            <TableCell align="center">R$ PREÇO</TableCell>
            <TableCell align="center">QUANTIDADE U</TableCell>      
            <TableCell align="center" className='badgeCell'></TableCell>  
         </TableRow>
      </div>

      <div className="tabela">  
         {!loading && produtos ? produtos.map( (row) => { 
            const [color, icon] = typeBadge(row.quantidade);
            return <TableRow className = "tableRowStyle">
                     <TableCell align="center" className='badgeCell' style={{backgroundColor : color, borderTopLeftRadius :'6px',borderBottomLeftRadius :'6px' }}>
                        <img src={icon} alt='check'/>
                     </TableCell>
                     <TableCell align="center">
                        {row.nome}
                     </TableCell>
                     <TableCell align="center">{row.descricao}</TableCell>
                     <TableCell align="center">R$ {row.preco}</TableCell>
                     <TableCell align="center">{row.quantidade} U</TableCell>      
                     <TableCell align="center" className='badgeCell'>
                        <div className="blockIcons">
                           <IconButton
                              aria-controls="simple-menu" aria-haspopup="true"
                              onClick={() => {
                                 console.log('setando true')
                                 setEditing(true);
                                 setModalValues({nome: row.nome, preco: row.preco, quantidade: row.quantidade, descricao: row.descricao, id : row.id});
                                 setModal(true);
                              }}
                              >
                              <Edit />
                           </IconButton>
                           <IconButton
                              aria-controls="simple-menu" aria-haspopup="true"
                              onClick={() => row.id ? deleteProdutoFromTable(row.id) : ''}
                              >
                              <Delete />
                           </IconButton>
                        </div>
                     </TableCell>  
                  </TableRow>}
         ) : <CircularProgress />}
      </div>
      <Pagination className="paginator"count={total} page={page} onChange={(e, newPage) => setPage(newPage)}/>
   </div>
}

export default Tabela;