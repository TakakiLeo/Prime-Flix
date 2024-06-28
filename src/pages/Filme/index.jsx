import {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './filme-info.css'
import {toast} from 'react-toastify'

export default function Filme() {

  const { id }  = useParams()
  const navigation = useNavigate()
  const [filme, setFilme] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    async function loadFilme(){
      await api.get(`/movie/${id}`,{
        params:{
          api_key:'d342dd73c096d2e418067782618c6db1',
          languague: "pt-BR",
        }
      })
      .then((response) =>{
        setFilme(response.data);
        setLoading(false)
      })
      .catch(() =>{
        navigation('/', {replace:true})
        return;
      })
    }

    loadFilme()

    return ()=>{
      
    }
  }, [navigation, id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

    if( hasFilme){
      toast.warn("Esse filme ja esta na lista")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
    toast.success("Filme salvo com Sucesso")
  }

  if(loading){
    return(
      <div className='filme-info'>
        <h1>Carregando Detalhes...</h1>
      </div>
    )
  }

  return (
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}}`} alt={filme.title} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avalição: {filme.vote_average.toFixed(1)} /10</strong>

      <div className='area-buttons'>
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target='_blank' rel='external'>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}
