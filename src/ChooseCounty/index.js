import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { changeCounty } from "../redux/placeSlice.js"

export default function ChooseCounty(){
    const [county, setCounty] = useState('')
    const [allCounties, setAllCounties] = useState([])
    const [disabled, setDisabled] = useState(true)
    const state = useSelector(state => state.place.state)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
        promise
        .then(res => {
            setAllCounties(res.data)
        })
        .catch(err =>
            console.log(err)
        )
    }, [])

    function handleChange(e){
        if (e.target.value != ''){
            setDisabled(false)
        }
        else{
            setDisabled(true)
        }
        setCounty(e.target.value)
        dispatch(changeCounty(e.target.value))
    }


    return(
        <div className="container">
            <div className="box">
                <Title>
                    <h1>Escolha o município</h1>
                </Title>
                <select value={county} onChange={handleChange}>
                    <option value={''}>Selecione uma opção</option>
                    {allCounties.map((county, index) => 
                        <option value={county.id} key={index}>{county.nome}</option>
                    )}
                </select>
                <BackButton onClick={() => navigate('/')}>
                <i className="fa-regular fa-circle-left"></i>
                </BackButton>
                <button disabled={disabled} onClick={() => navigate('/info')}>
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

const BackButton = styled.button`
    position: absolute;
    height: 75px;
    width: 75px;
    bottom: 30px;
    left: 40px;
    background: none;
    border: none;
    border-radius: 50%;
`