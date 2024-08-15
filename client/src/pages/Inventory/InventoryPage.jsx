import { useEffect, useState } from "react";
import ItemsList from "../../components/BoxItem/ItemsList/ItemsList";
import CoinsValueBlock from "../../components/coinsValue/coinsValue";
import Header from "../../components/particals/header/header";
import NavMainPage from "../../components/particals/navMainPage/navMainPage";
import axios from "axios";
import Loader from "../../components/particals/loader/loader";
import { LootService } from "../../services/loot.service";
import { toast } from "react-toastify";





export default function InventoryPage() {
    const [userInventory, setUserInventory] = useState([])
    const [isInventoryLoading, setIsInventoryLoading] = useState(true)

    const [triggerUpdate, setTriggerUpdate] = useState(false)

    const handleTrigger = () => {
        setTriggerUpdate(!triggerUpdate)
    }

    const getUserLoot = async () => {
        try {
            const data = await LootService.getUserInventory()
            console.log(data)
            if (data) {
                setUserInventory(data)
                setIsInventoryLoading(false)
            }
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }


    useEffect(() => {
        getUserLoot()
    }, [triggerUpdate])

    userInventory
    return (
        <>
            <Header />
            <div className="container-page">

                <p className="top-header-text-page">Инвентарь</p>

                {!isInventoryLoading ? (
                    <ItemsList array_items={userInventory} handleTrigger={handleTrigger} />
                ) : <Loader />}

            </div>

            <NavMainPage />


        </>
    )
}