import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { changeState } from '../redux/placeSlice.js'

export default function ChooseState(){
    const status = useSelector(state => state.place.state)
    const [state, setState] = useState(status)
    const [allStates, setAllStates] = useState([])
    const [disabled, setDisabled] = useState(state==="")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const promise = axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        promise
        .then(res => {
            setAllStates(res.data)
        })
        .catch(err =>
            console.log(err)
        )
    }, [])

    function handleChange(e){
        console.log(e.target.value)
        if (e.target.value != ''){
            setDisabled(false)
        }
        else{
            setDisabled(true)
        }

        dispatch(changeState(e.target.value))
        setState(e.target.value)

    }


    return(
        <div className="container">
            <div className="box">
                <Title>
                    <h1>Escolha o estado</h1>
                </Title>
                <select value={state} onChange={handleChange}>
                    <option value={''}>Selecione uma opção</option>
                    {allStates.map((state, index) => 
                        <option value={state.sigla} key={index}>{state.nome}</option>
                    )}
                </select>
                <button disabled={disabled} onClick={() => navigate('/county')}>
                    <i className="fa-regular fa-circle-right"></i>
                </button>
            </div>
        </div>
    )
}


const Title = styled.div`
    width: 100%;
    height: 60px;
    position: absolute;
    top: 80px;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    h1{
        font-size: 30px;
        color: #363A36;
        font-weight: 700;
    }
`