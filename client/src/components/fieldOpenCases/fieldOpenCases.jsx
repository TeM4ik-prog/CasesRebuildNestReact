import { useContext, useState } from "react"
import "./fieldOpenCases.scss"
// import { triggerUserDataContext, userDataContext } from "../../App"
import axios from "axios"

import OneItem from "../BoxItem/OneItem/oneItem"
import ItemsList from "../BoxItem/ItemsList/ItemsList"
import { LootService } from "../../services/loot.service"
import { toast } from "react-toastify"
import { updateData } from "../../store/user/user.slice"
import { useDispatch } from "react-redux"
import { useUserData } from "../../store/hooks/useAuth"
import { getOpenPriceFromLocalStorage, setOpenPriceToLocalStorage } from "../../helper/localstorage.helper"


export default function FieldOpenCases({ isActive = true }) {
    const dispatch = useDispatch()
    const { user } = useUserData();


    const [moneyToOpen, setMoneyToOpen] = useState(getOpenPriceFromLocalStorage())
    const [boxLoot, setBoxLoot] = useState([])
    const [isBoxOpening, setIsBoxOpening] = useState(false)

    const [isAllImagesLoaded, setIsAllImagesLoaded] = useState(false);

    const loadImage = async (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.src = url;
        });
    };



    let onOpen = async (e) => {
        e.preventDefault()
        setOpenPriceToLocalStorage(moneyToOpen)
        setIsBoxOpening(true)
        try {
            const data = await LootService.openBox(moneyToOpen)
            if (data) {
                dispatch(updateData())

                setBoxLoot(data)
                await Promise.all(data.map(image => loadImage(image.img)));
                setIsAllImagesLoaded(true)

                setTimeout(onScrollIntoView, 300);
            }
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    const scrollToElementX = (container, element, duration) => {
        const elementCenter = element.getBoundingClientRect().left + element.clientWidth / 2;
        const containerCenter = container.clientWidth / 2;

        const scrollPos = containerCenter - elementCenter;
        const lootBoxContainer = container.querySelector('.loot-box-container');

        lootBoxContainer.style.transition = `transform ${duration}ms cubic-bezier(0.075, 0.82, 0.165, 1)`;
        lootBoxContainer.style.transform = `translateX(${scrollPos}px)`;

        setTimeout(() => {
            lootBoxContainer.style.transition = '0s';
            lootBoxContainer.style.transform = 'translateX(100%)';

            setBoxLoot([]);
            setIsBoxOpening(false);
            setIsAllImagesLoaded(false);
        }, duration);
    };

    const onScrollIntoView = () => {
        const container = document.querySelector('.openCase');
        const elem = document.getElementById('loot_25');
        scrollToElementX(container, elem, 8000);
    };

    return (

        <div className="fieldOpen-container">

            <div className={`openCase ${isBoxOpening ? 'active' : ''}`}>
                <div className="line" />

                {isBoxOpening && (
                    <>
                        {!isAllImagesLoaded && <p className="text-loading-items"
                        >Загрузка предметов...</p>}
                    </>
                )}

                <div className="loot-box-container">
                    {boxLoot.map((loot, index) => (
                        <OneItem key={index} id={index} item_info={loot} />
                    ))}
                </div>
            </div>


            <form onSubmit={!isBoxOpening && isActive ? onOpen : (e) => e.preventDefault()} className="butts-container">

                <button className={`OpenButt ${!isBoxOpening ? 'active' : null}`}>
                    Открыть({moneyToOpen ? moneyToOpen : 'не указанно'})
                </button>

                <input required min={10} max={user?.money} className="input_money_value" type="number"
                    placeholder="Введите стоимось открытия"
                    value={moneyToOpen}
                    onChange={(e) => (setMoneyToOpen(e.target.value))}
                />
            </form>


        </div >


    )
}