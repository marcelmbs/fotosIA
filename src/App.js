import React, { useState } from 'react'
import { ReactComponent as Robot } from '../src/images/robot.svg'
import './App.css'
import Carregando from '../src/images/spinner.gif'


function App() {
  //JSX - Extensão de sintaxe JavaScript
  //Hooks - UseState (facilitador para getter/setter)*/
  const [pessoas, setpessoas] = useState([]) //Inicial com matriz
  const [carregando, setCarregando] = useState(false)
  const [etnia, setEtnia] = useState('')
  const [idade, setIdade] = useState('')



  function ListaPessoas(props) {
    const pessoas = props.pessoas
    const listagemPesssoas = pessoas.map((pessoa) =>
      <img key={pessoa.id} src={pessoa.urls[4][512]}
        title="Pessoa gerada via IA" alt="pessoa gerada via IA" />
    )

    return (
      <>{listagemPesssoas}</>
    )
  }

  async function obtemfoto() {
    setCarregando(true)
    let chaveAPI = process.env.REACT_APP_APIKEY
    const filtraetnia = etnia.length > 0 ? `&ethnicity=${etnia}` : ''
    const filtraidade = idade.length > 0 ? `&age=${idade}` : ''
    let url = `https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}${filtraetnia}${filtraidade}&order_by=random`
    await fetch(url)
      .then(Response => Response.json())
      .then(data => {
        setpessoas(data.faces)
      })
      .catch(function (error) {
        console.error('Houve um erro na requisição ' + error.message)
      })
    setCarregando(false)

  }
  return (
    <div className="app">
      <h1> Gerador de fotos com IA</h1>
      <Robot />
      {carregando &&
        <img src={Carregando} title="Aguarde..." alt="Aguarde" width="50" />
      }
      <div className='linha'>
        <ListaPessoas pessoas={pessoas} />
      </div>
      <div className='linha'>
        <label>Idade:</label>
        <select onChange={event => setIdade(event.target.value)}>
          <option value=''>Todas</option>
          <option value='infant'>Infantil</option>
          <option value='child'>Criança</option>
          <option value='young-adult'>Todas</option>
          <option value='adult'>Adulto</option>
          <option value='elderly'>Idoso</option>
        </select>

        <label>Etnia:</label>
        <select onChange={e => setEtnia(e.target.value)}>
          <option value=''>Todas</option>
          <option value='white'>Branca</option>
          <option value='latino'>Latina</option>
          <option value='asian'>Asiática</option>
          <option value='black'>Negra</option>
        </select>
      </div>

      <div className='linha'>
        <button type='button' onClick={obtemfoto}>
          Obter Imagens
    </button>
        {pessoas.length > 0 &&
          <button type='button' onClick={() => setpessoas([])}>
            Limpar imagens
    </button>
        }
      </div>

    </div>
  )
}
export default App;