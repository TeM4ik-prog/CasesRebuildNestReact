import { Link } from "react-router-dom";
import axios from "axios";
import "./BombDefuserGame.scss"
import { useEffect, useState } from "react";
import Bomb from "./components/bomb/bomb";

// import { RandInt } from "../../../../../utils/functions";
// import { AddUserMoney } from "../../../../../axios/addMoney";
import CoinsValueBlock from "../../../../components/coinsValue/coinsValue";
import Loader from "../../../../components/particals/loader/loader";
import { UserService } from "../../../../services/users.service";
import { toast } from "react-toastify";
import { useUserData } from "../../../../store/hooks/useAuth";
import { updateData } from "../../../../store/user/user.slice";
import { useDispatch } from "react-redux";
import { bombDefuserGameService } from "../../../../services/miniGames/bombDefuserGame.service";
import { RandInt } from "../../../../helper/utils.helper";

export default function BombDefuserGame() {
    const dispatch = useDispatch()
    const { user } = useUserData()

    const [isBoostDialogOpen, setIsBoostDialogOpen] = useState(false)
    const [dialogInfoData, setDialogInfoData] = useState('')

    const [boostsData, setBoostsData] = useState(null)
    const [isUserPlay, setIsUserPlay] = useState(false)

    const [updateBoostsTrigger, setUpdateBoostsTrigger] = useState(false)
    const [isBoostUpdating, setIsBoostUpdating] = useState(false)

    const [moneyGame, setMoneyGame] = useState(0)

    let timers = []

    // game params
    const [level, setLevel] = useState(1)
    const [bombsAr, setBombsAr] = useState([])

    const value_start_bombs = 10
    const spawn_interval = 3000//ms

    const need_clicks_default = 5

    const offsetX = 10; //max 25 // отступ от левого и правого края
    const offsetY = 10; // отступ от верхнего и нижнего края
    // 

    const handleOpenDialogBoost = ({ e, boostData, name }) => {
        setDialogInfoData({
            title: e.currentTarget.title,
            boost_price: boostData.boost_price,
            multiplier: boostData.multiplier,
            name: name
        })

        setIsBoostDialogOpen(true)
    }

    const handleBoost = async (boost_name) => {
        setIsBoostUpdating(true)
        try {
            const data = await bombDefuserGameService.addBoost(boost_name)
            console.log(data)
            if (data) {
                toast.success(`Boosted successfully by ${data.amountReceived}`)

                dispatch(updateData())
                setUpdateBoostsTrigger(!updateBoostsTrigger)
                setDialogInfoData({
                    ...dialogInfoData,
                    boost_price: data.boosted.boost_price,
                    multiplier: data.boosted.multiplier,
                })

                setIsBoostUpdating(false)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }
    }

    const LoseUser = () => {
        setLevel(1)
        setIsUserPlay(false)
        clearAllTimers()
        setBombsAr([])

        setMoneyGame(async prevMoneyGame => {
            const data = await UserService.addUserMoney(prevMoneyGame)
        
            if (data) {
                dispatch(updateData())
                toast.success(`Баланс пополнен на: ${data}`)

            }
            // AddUserMoney(prevMoneyGame);
            return prevMoneyGame;
        });
    }

    const removeBomb = (id, levelBomb) => {
        setBombsAr(prevBombs => prevBombs.filter(bomb => bomb.key !== id));

        setMoneyGame(prevMoney => {
            let newMoneyValue = prevMoney + (levelBomb * boostsData.money_boost.multiplier)

            return newMoneyValue
        })
    }


    const clearAllTimers = () => {
        timers.forEach(timer => clearTimeout(timer));
        timers = []; // Очистка массива после очистки таймеров
    };

    const onSpawnBombs = (level) => {
        let defuse_clicks = (need_clicks_default * (level / 2) / boostsData.speed_boost.multiplier).toFixed(0);
        if (defuse_clicks <= 0) defuse_clicks = 1;

        const boom_time = Number(((5000 / (level / 2)) * boostsData.time_boost.multiplier).toFixed(0))

        // ________
        const focusMultiplier = Math.sqrt(boostsData.focus_boost.multiplier);
        const offsetYNew = offsetY * focusMultiplier;
        const offsetXNew = offsetX * focusMultiplier;
        const spawnAreaY = 100 - 2 * offsetYNew;
        const spawnAreaX = 100 - 2 * offsetXNew;

        for (let i = 0; i < level * value_start_bombs; i++) {
            let spawn_timer = setTimeout(() => {
                let bombParams = {
                    id: Math.random().toString(36).substr(2, 9),
                    top: RandInt(offsetYNew, offsetYNew + spawnAreaY),
                    left: RandInt(offsetXNew, offsetXNew + spawnAreaX),
                    rotate: `${RandInt(0, 360)}deg`,
                    defuse_clicks,
                    boom_time,
                    level
                };

                setBombsAr(prevBombs => [
                    ...prevBombs,
                    <Bomb key={bombParams.id} LoseUser={LoseUser} removeBomb={removeBomb} bombParams={bombParams} />
                ]);

                if (i === (level * value_start_bombs) - 1) {
                    setLevel(prevLevel => {
                        const newLevel = prevLevel + 1;
                        console.log(newLevel);
                        onSpawnBombs(newLevel);
                        return newLevel;
                    });
                }
            }, spawn_interval / level * i);

            timers.push(spawn_timer); // Добавление ссылки на таймер в массив
        }
    };

    const onPlay = () => {
        setLevel(() => {
            setIsUserPlay(true)
            setBombsAr([])
            onSpawnBombs(level)
            setMoneyGame(0)
            return 1;
        });
    }

    const onGetBoosts = async () => {
        try {
            const data = await bombDefuserGameService.getBoosts()
            if (data) setBoostsData(data)
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    useEffect(() => {
        onGetBoosts()
    }, [updateBoostsTrigger])




    return (
        <div className="game-container">
            <div className="header-container">
                <div className="header-game">
                    <Link to={'/miniGames'}>
                        <h2>Выйти</h2>
                    </Link>
                    <p className="game-name">Bomb Defuser</p>
                </div>
                <div className="game-info-header">
                    <p>Уровень: {level}</p>

                    {isUserPlay ? (
                        <CoinsValueBlock value={moneyGame} />
                    ) : <CoinsValueBlock value={user?.money} />}
                </div>
            </div>

            {isUserPlay && user ? (
                <div className="bombs-container-field">
                    {bombsAr}
                </div>
            ) :
                <div className="button-play-container" >
                    {boostsData ? (
                        <button onClick={onPlay}>Играть</button>
                    ) : <Loader />}
                </div>}


            {boostsData && user ? (
                <>
                    {!isUserPlay ? (
                        <div className="bonus_screen">
                            <div className="boost_block" onClick={(e) => handleOpenDialogBoost({ e, boostData: boostsData.speed_boost, name: 'speed_boost' })} title="Скорость разминирования бомбы">
                                <img src="../icons/BombDefuser/speed_logo.png" />
                            </div>

                            <div className="boost_block" onClick={(e) => handleOpenDialogBoost({ e, boostData: boostsData.time_boost, name: 'time_boost' })} title="Добавление времени до взрыва бомбы" >
                                <img src="../icons/BombDefuser/time_logo.png" />
                            </div>

                            <div className="boost_block" onClick={(e) => handleOpenDialogBoost({ e, boostData: boostsData.money_boost, name: 'money_boost' })} title="Монеты за разминирование бомбы">
                                <img src="../icons/BombDefuser/money_logo.png" />
                            </div>

                            <div className="boost_block" onClick={(e) => handleOpenDialogBoost({ e, boostData: boostsData.focus_boost, name: 'focus_boost' })} title="Сужение поля, в котором появляются бомбы">
                                <img src="../icons/BombDefuser/focus_logo.png" />
                            </div>

                        </div>

                    ) : <div className="empty-container" />}
                </>
            ) : <Loader />}

            {isBoostDialogOpen ? (
                    <div className="dialog-interact-item-container" style={{ filter: "none !important" }} >
                        <div className="header-info-dialog" >
                            <p></p>
                            <p className="text-title-dialog">Подтвердите действие</p>
                            <img onClick={() => setIsBoostDialogOpen(false)}
                                className="close-image" src="../icons/close.png">
                            </img>
                        </div>

                        <p className="title-text">{dialogInfoData.title}</p>

                        <div className="boost-info">
                            <p>Цена улучшения: <CoinsValueBlock value={dialogInfoData.boost_price} /> </p>
                            <p>Множитель: {dialogInfoData.multiplier}х</p>
                        </div>

                        {!isBoostUpdating ? (
                            <button className={`${user.money > dialogInfoData.boost_price ? 'active' : null}`} onClick={user.money > dialogInfoData.boost_price ? () => handleBoost(dialogInfoData.name) : null}>
                                <div className="butt-container-info">
                                    <p>Улучшить</p>
                                    <CoinsValueBlock value={dialogInfoData.boost_price} />
                                </div>
                            </button>

                        ) : <Loader />}
                    </div>
            ) : null}


        </div >

    )
}