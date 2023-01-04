import styled from "styled-components"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { changeState } from '../redux/placeSlice.js'
import axios from "axios"

export default function ShowInfo(){
    const [countyData, setCountyData] = useState([])
    const place = useSelector(state => state.place)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {
        const promise = axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${place.county}/distritos`)
        promise
        .then((res) => {
            setCountyData([res.data[0]])
            
        })
        .catch((err) => console.log(err.data))
    }, [])
    
    function refazer(){
        dispatch(changeState(""));
        navigate("/")
    }

    return(
        <>
            {countyData.length > 0 ? 
            <Container>
                <div>
                    <BixBox><h1>{countyData[0].nome}</h1></BixBox>
                </div>
                <div>
                    <MediumBox><p>{countyData[0].municipio.microrregiao.mesorregiao.UF.sigla} - {countyData[0].municipio.microrregiao.mesorregiao.UF.nome}</p></MediumBox>
                    <MediumBox><p>Região {countyData[0].municipio.microrregiao.mesorregiao.UF.regiao.nome}</p></MediumBox>
                </div>
                <div>
                    <SmallBox>
                        <p>Microrregião: </p>
                        <p>{countyData[0].municipio.microrregiao.nome}</p>
                    </SmallBox>
                    <SmallBox>
                        <p>Mesorregião:</p>
                        <p>{countyData[0].municipio.microrregiao.mesorregiao.nome}</p>
                    </SmallBox>
                    <SmallBox>
                        <p>Região-imediata:</p>
                        <p>{countyData[0].municipio['regiao-imediata'].nome}</p>
                    </SmallBox>
                </div>
                <button onClick={refazer}>Refazer</button>
                
            </Container>
            : 
            <Container></Container>
            }
        </>
    )
}


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #4E544E;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &>div{
        display: flex;
        justify-content: space-between;
        width: 70vw;
    }
    h1{
        color: #FFFFFF;
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
    }
    p{
        color: #FFFFFF;
        font-size: 15px;
        font-weight: 700;
        text-transform: uppercase;
    }
    button{
        margin-top: 80px;
        background-color: #00A651;
        border: none;
        color: #FFFFFF;
        width: 115px;
        height: 40px;
        border-radius: 3px;
        text-transform: uppercase;
        font-weight: 700;
        cursor: pointer;
    }
`


const SmallBox = styled.div`
    width: 30%;
    height: 200px;
    background-color: #353A35;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 15px 0;
    &:hover{
        transition: ease-in 0.1s;
        background-color: #00A651
    }
`

const MediumBox = styled.div`
    width: 49%;
    height: 160px;
    background-color: #353A35;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 0;
    &:hover{
        transition: ease-in 0.1s;
        background-color: #00A651
    }
`

const BixBox = styled.div`
    width: 100%;
    height: 110px;
    background-color: #353A35;
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
        transition: ease-in 0.1s;
        background-color: #00A651
    }
`



const Section = styled.div`
    background-color: #353A35;
    width: 90%;
    height: 90px;
    display: flex;
    justify-content: space-between;
    div{
        width: 50%;
        background-color: red;
        &:hover{
        transition: ease-in 0.1s;
        background-color: #00A651;
    }
    }
`