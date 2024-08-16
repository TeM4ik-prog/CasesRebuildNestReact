import { useContext, useState } from "react"
import "./oneItem.scss"

import { changeColorByRare } from '../../../helper/changeColorByRare.helper'


import CoinsValueBlock from "../../coinsValue/coinsValue"
import { toast } from "react-toastify"
import { LootService } from "../../../services/loot.service"
import { useDispatch } from "react-redux"
import { updateData } from "../../../store/user/user.slice"
import { updateInventory } from "../../../store/loot/loot.slice"
import Loader from "../../particals/loader/loader"
export default function OneItem({ item_info, id }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLootSelling, setIsLootSelling] = useState(false)


    const dispatch = useDispatch()

    let onSellItem = async ({ itemIdInDb, isSellAll }) => {
        setIsLootSelling(true)
        try {
            const data = await LootService.sellLoot({ itemIdInDb, isSellAll })
            console.log(data)
            if (data) {
                setIsLootSelling(false)
                setIsDialogOpen(false)

                dispatch(updateData())
                dispatch(updateInventory())

                toast.success(`Баланс пополнен на: ${data.amountReceived}`)
            }

        } catch (err) {
            toast.error(err.response.data.message)
        }

    }





    return (

        <div id={!id ? null : `loot_${id}`} className="item-container" style={{ backgroundColor: changeColorByRare(item_info?.categoryRare?.name) }}>

            <img src={item_info.img} onClick={item_info.openPrice ? () => (setIsDialogOpen(true)) : null} />

            <div className="prevue-container-info">
                {item_info.quantity ? (
                    <div className="mini-block-container">
                        <p>{item_info.quantity}</p>
                    </div>

                ) : null}

                {/* {item_info.openPrice ? (
                    <div className="mini-block-container openPrice">
                        <p>{item_info.openPrice}</p>
                    </div>

                ) : null} */}

            </div>


            {isDialogOpen ? (
                <>
                    <div className="filter-block"></div>
                    <div className="dialog-interact-item-container" style={{ filter: "none !important" }} >
                        <div className="header-info-dialog" >
                            <p></p>
                            <p className="text-title-dialog">Выберете действие</p>
                            <img onClick={() => setIsDialogOpen(false)}
                                className="close-image" src="../icons/close.png">
                            </img>
                        </div>

                        <div className="openPrice-info">
                            <header>Ваша цена открытия: </header>
                            <CoinsValueBlock value={item_info.openPrice} />
                        </div>

                        {!isLootSelling ? (
                            <>
                                <img className="item_dialog-img" src={item_info.img} />

                                <div className="sell-butts-container">
                                    <button onClick={() => onSellItem({ itemIdInDb: item_info.id, isSellAll: false })}>
                                        <div className="butt-container-info">
                                            <p>Продать одно за </p>
                                            <CoinsValueBlock value={item_info?.sellOne} />
                                        </div>
                                    </button>

                                    <button onClick={() => onSellItem({ itemIdInDb: item_info.id, isSellAll: true })}>
                                        <div className="butt-container-info">
                                            <p> Продать всё за </p>
                                            <CoinsValueBlock value={item_info?.sellAll} />
                                        </div>
                                    </button>
                                </div>
                            </>
                        ) : <Loader />}

                    </div>

                </>
            ) : null}

        </div >





    )
}