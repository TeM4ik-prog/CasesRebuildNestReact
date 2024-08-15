import { useEffect, useState } from "react"
import "./mainOpenPage.scss"
import CoinsValueBlock from "../../components/coinsValue/coinsValue";
import NavMainPage from "../../components/particals/navMainPage/navMainPage";


import axios from "axios"
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../../components/particals/header/header";
import FieldOpenCases from "../../components/fieldOpenCases/fieldOpenCases";

export default function MainOpenPage() {

    // const [username, setUsername] = useState('')

    return (
        <>
            {/* <h3 style={{ color: 'white' }}>{username ? username : 'undefined'}</h3> */}


            <Header />
            
            <div className="container-page">

                <FieldOpenCases />
            </div>


            <NavMainPage />


            {/* <CoinsValueBlock value={100} /> */}
        </>
    )
}
