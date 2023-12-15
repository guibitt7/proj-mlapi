import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import OnlineStoreContext from '../context/OnlineStoreContext';
import styles from '../modules/Checkout.module.css';

function Checkout() {
  const history = useHistory();
  const { cartList, setCartList } = useContext(OnlineStoreContext);
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    cpf: '',
    email: '',
    telefone: '',
    cep: '',
    endereço: '',
    complemento: '',
    numero: '',
    cidade: '',
    estado: '',
  });
  const [sumCart, setSumCart] = useState(0);

  const ESTADOS = ['Acre', 'Alagoas', 'Amapá',
    'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
    'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso',
    'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba',
    'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
    'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia',
    'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins',
  ];

  useEffect(() => {
    const sum = cartList.reduce((acc, item) => (acc + (item.price * item.quantity)), 0)
      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setSumCart(sum);
  }, [cartList]);

  const handleForm = ({ target }) => {
    const { name, value } = target;
    setBuyerInfo({
      ...buyerInfo,
      [name]: value,
    });
  };

  const comprar = (e) => {
    e.preventDefault();
    setCartList([]);
    history.push('/');
  };

  const { name, cpf, email, telefone, cep, endereço, complemento,
    numero, cidade, estado } = buyerInfo;

  return (
    <div className={ styles.container }>
      <div className={ styles.revisao }>
        <h3>Revise seus Produtos</h3>
        <div className={ styles.produtos }>
          {cartList.map((item, index) => (
            <div key={ index } className={ styles.produtosItems }>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>{`Quantidade: ${item.quantity}`}</p>
              <p>
                {`${item.price
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} `}
              </p>
            </div>
          ))}
          <p className={ styles.total }>
            {`Total: ${sumCart}`}
          </p>
        </div>
      </div>
      <form className={ styles.form }>
        <h3>Informações do Comprador</h3>
        <input
          type="text"
          name="name"
          data-testid="checkout-fullname"
          value={ name }
          placeholder="Nome Completo"
          onChange={ (e) => handleForm(e) }
        />
        <input
          type="text"
          name="cpf"
          data-testid="checkout-cpf"
          value={ cpf }
          placeholder="CPF"
          onChange={ (e) => handleForm(e) }
        />
        <input
          type="email"
          name="email"
          data-testid="checkout-email"
          value={ email }
          placeholder="Email"
          onChange={ (e) => handleForm(e) }
        />
        <input
          type="text"
          name="telefone"
          data-testid="checkout-phone"
          value={ telefone }
          placeholder="Telefone"
          onChange={ (e) => handleForm(e) }
        />
        <input
          type="text"
          name="cep"
          data-testid="checkout-cep"
          value={ cep }
          placeholder="CEP"
          onChange={ (e) => handleForm(e) }
        />
        <input
          type="text"
          name="endereço"
          value={ endereço }
          data-testid="checkout-address"
          placeholder="Endereço"
          onChange={ (e) => handleForm(e) }
        />
        <input
          type="text"
          name="complemento"
          value={ complemento }
          placeholder="Complemento"
          onChange={ (e) => handleForm(e) }
        />
        <input
          type="text"
          name="numero"
          value={ numero }
          placeholder="Número"
          onChange={ (e) => handleForm(e) }
        />
        <input
          type="text"
          name="cidade"
          value={ cidade }
          placeholder="Cidade"
          onChange={ (e) => handleForm(e) }
        />
        <select
          id="estado"
          name="estado"
          value={ estado }
          onChange={ (e) => handleForm(e) }
        >
          { ESTADOS.map((state) => (
            <option key={ state } value={ state }>{ state }</option>)) }
        </select>
      </form>
      <div className={ styles.pagamento }>
        <h3>Metodo de Pagamento</h3>
        <div>
          <label htmlFor="boleto">
            Boleto
            <input
              type="radio"
              id="boleto"
              value="1"
              name="rating"
            />
          </label>
          <label htmlFor="pix">
            Pix
            <input
              type="radio"
              id="pix"
              value="2"
              name="rating"
            />
          </label>
          <label htmlFor="cc">
            Cartão Credito
            <input
              type="radio"
              id="cc"
              value="3"
              name="rating"
            />
          </label>
        </div>
      </div>
      <button
        type="button"
        className={ styles.button }
        onClick={ (e) => comprar(e) }
      >
        COMPRAR
      </button>
    </div>
  );
}

export default Checkout;