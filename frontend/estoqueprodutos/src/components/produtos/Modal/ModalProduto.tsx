import React from 'react'
import { Button, TextField, Typography, Modal } from "@material-ui/core";
import NumberFormatCustom from '../../NumberFormatCustom';
import './ModalProduto.scss'

interface Produto {
  id ?: Number,
  nome : String,
  descricao: String,
  preco: Number,
  quantidade: Number,
}

interface propTypes{
  modalValues : Produto,
  clearFields : Function,
  setModalValues: Function,
  setEditing: Function,
  setModal: Function,
  salvarNovoProduto: Function,
  modal: boolean,
  editing: boolean
}

const ModalProduto = (props : propTypes) => {

  return <Modal
            open={props.modal}
            onClose={() => {
               props.clearFields();
               props.setEditing(false);
               props.setModal(false)
            }}
            >
            <div className='containerModal'>
               <div className='containerElementos'>
                  <Typography className="titulo"> ESTOQUE DE PRODUTOS </Typography>
                  <Typography className="subTitulo"> { props.editing ? 'Editar' : 'Incluir'} Produto </Typography>

                  <div className="blockModal">
                     <TextField value={props.modalValues.nome} onChange={(e) => props.setModalValues({...props.modalValues, nome: e.target.value})} label="Nome"/>
                     <TextField value={props.modalValues.preco}  InputProps={{ inputComponent: NumberFormatCustom as any }}onChange={(e) => props.setModalValues({...props.modalValues, preco: parseInt(e.target.value)})} label="Preço"/>
                     <TextField value={props.modalValues.quantidade} onChange={(e) => props.setModalValues({...props.modalValues, quantidade: parseInt(e.target.value)})} label="Quantidade" type="number"/>
                  </div>
                  <TextField value={props.modalValues.descricao} onChange={(e) => props.setModalValues({...props.modalValues, descricao: e.target.value})} className="descricaoInput" label="Descrição" />

                  <div className="buttonsModal">
                     <Button className="buttonCancelar" onClick={() => {
                        props.setModal(false);
                        props.clearFields();
                        props.setEditing(false);
                     }}> Cancelar </Button>
                     <Button className="buttonSalvar" onClick={() => props.salvarNovoProduto()}> Salvar </Button>
                  </div>
               </div>
            </div>
         </Modal>
};

export default ModalProduto;