import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import "./Productpage.css"
import supabase from '../../config/supabaseclient';
import cartContext from '../../context/CartContext';
import Loader from '../../components/Loader';
import logo from "../../img/gameshop.png"
import windowlogo from "../../img/windows-platform-logo-svg.svg"
import Notification from '../../components/Notification';
import ShotsViewer from '../ScreenshotView/ShotsViewer';
import YoutubeEmbed from '../../components/YoutubeEmbed';


const ProductPage = () => {
    let [game, setgame] = useState([]);
    const [cate, setcate] = useState("")
    const [msg, setMsg] = useState("")
    const navigate = useNavigate();
    const { id } = useParams();
    const cartc = useContext(cartContext);
    const [screenshots, setscreenshots] = useState(0);
    const [viewer, setviewer] = useState("none")
    const [shot, setShot] = useState(0);
    const [currentImg, setCurrentImg] = useState('');
    let num = [0, 1, 2, 3, 4];

    useEffect(() => {
        const getGame = async () => {
            const { data, error } = await supabase
                .from("games")
                .select()
                .eq('id', id)
                .single()

            if (data) {
                // console.log(data);
                setgame(data);
                setscreenshots(data.screenshots);
                getCategory(data.cat_id);
            } else {
                console.log(error);
                navigate("/");
            }
        }
        window.scrollTo(0, 0);
        getGame();
    }, [id, navigate])


    const getCategory = async (Cat_id) => {
        const { data, error } = await supabase
            .from("category")
            .select()
            .eq('id', Cat_id)
            .single()

        if (data) {
            setcate(data)
        } else {
            console.log(error);
        }
    }


    const addtocart = () => {
        var oldItems = JSON.parse(localStorage.getItem('cart')) || [];
        oldItems.push(game);
        localStorage.setItem('cart', JSON.stringify(oldItems));

        setMsg("Added Item To Cart");
        cartc.update();
    }

    const viewimage = (id) => {
        console.log('id on click image: ', id);
        setShot(id);
        console.log('setShot: ', shot);
        setviewer("block");
    }
    const closer = () => {
        setviewer("none");
    }

    return (
        <div className='game-info'>
            <Notification msg={msg} />
            {game.length < 1 ? <Loader /> : <>
                <div className="col">
                    <div className="row">
                        <img src={game.imgurl} alt="" />
                    </div>
                    <div className="row">
                        <h1>{game.name}</h1>
                        <p className='price'><b>RS. {game.price}</b></p>
                        <p style={{ whiteSpace: "pre-wrap" }}>{game.desc}</p>
                        <h4>{cate.title}</h4>
                        <div className="flexbox">
                            <button onClick={addtocart}>Add To Cart</button>
                            <img className='window-logo' src={windowlogo} alt="" /></div>
                    </div>
                </div>

                <div className="gameplay-s">
                    <h2>GamePlay</h2>
                    <div className="gameplay">
                        <img src={logo} alt="" />
                        {
                            num.map((e, i) => {
                                return (<>
                                    <img onClick={() => { viewimage(i) }} src={`https://tfnokgublfaoehupzhtc.supabase.co/storage/v1/object/public/gamespics/public/${game.name}/${i}.jpg`} onError={(e) => { console.log(e.target.remove()) }} />
                                    <img onClick={() => { viewimage(i) }} src={`https://tfnokgublfaoehupzhtc.supabase.co/storage/v1/object/public/gamespics/public/${game.id}/${i}.jpg`} onError={(e) => { console.log(e.target.remove()) }} />
                                </>)
                            })
                        }
                    </div>
                </div>
                <ShotsViewer display={viewer} gamename={game.name} id={shot} close={closer} gameid={id} />
                {(game.youtube_id !== null) && <YoutubeEmbed className="vdo" embedId={game.youtube_id} />}

                <div className="req">
                    <h2>System Requirment</h2>
                    <div className="req-cont">
                        <div className="col-left">
                            <h3>Minimum :</h3>
                            <p>Requires a 64-bit processor and operating system<br />
                                OS: 64-bit Windows 7, Windows 8.1, Windows 10<br />
                                Processor: Intel Core i5-4430 / AMD FX-6300<br />
                                Memory: 8 GB RAM<br />
                                Graphics: NVIDIA GeForce GTX 960 2GB / AMD Radeon R7 370 2GB<br />
                                DirectX: Version 11<br />
                                Storage: 90 GB available space</p>
                        </div>
                        <div className="col-right">
                            <h3>RECOMMENDED :</h3>
                            <p>Requires a 64-bit processor and operating system<br />
                                OS: 64-bit Windows 10<br />
                                Processor: AMD Ryzen 5-1600 / Intel Core i5-7600K<br />
                                Memory: 8 GB RAM<br />
                                Graphics: Nvidia GTX 1060 6GB or better<br />
                                DirectX: Version 11<br />
                                Storage: 90 GB available space
                            </p>
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default ProductPage
