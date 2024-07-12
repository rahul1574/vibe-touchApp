import './Style.css';
import{Link} from "react-router-dom";
import React, { useRef, useState, useEffect } from 'react';
// import AudioPlay from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';

const AudioPlayer = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loopEnabled, setLoopEnabled] = useState(false);
    const playlist = [
        { title: "HI NANNA GLIMPSE",cast:"Hesham Abdul Wahab",image:"image4.jpg",src: "song5.mp3" },
        { title: "HOSAAHOREY",cast:"Ananth Sreeram,K.K., Lesle Lewis", image:"image5.jpeg",src: "song6.mp3",lyrics:`
        Hosahare..... Hosahore.....
        Saadhinche sattuva unnadhi gundelalo..
        Preminche mettani manasula moolalalo...
        Maa paata aksharamodalaka vinnado....
        Painunna jacksonu kindhiki diguthado
        Hosahare hosahore hey....
        Hosahare..... Hosahore.....
        Gundello na paata guitar ai mogindhe...
        Yeye yayiye yehe yayiye.....
        Chetullo na raatha chappatlai cherindhe..
        Yehe yayiye yehe yayiye.....
        Kashtam neeku nesthamavaga..
        Vijayam ninnu ishtapadadha..
        Nee sangeetham nee radham
        Mundhuku saagupadha...
        Premanna aayudham toduga undhi kada...
        Hosaho hosaho hosahore hosaho... re....
        Ye desam lo aina sandesam maa paate
        Yeye yayiye yehe he hey...
        Ye vedika pai aina veduka ra ma aate
        Yehe yayiye yehe he he hey...
        Ningi nela nadi madhyana..
        Ponge ganga ma bhavana... hey
        Pedilla gonthulu kalasina kaalam idhe...
        Pedala vedini chaatina vela idhe he he he he hey...
        Hosahare.... hosahore....
        Saadhinche sattuva unnadhi gundelalo..
        Preminche mettani manasula moolalalo..
        Maa paata aksharamodalaka vinnado...
        Painunna jacksonu kindhiki diguthado..
        Hosahare.... hosaho hosaho hosaho hosaho
        Hosaho hosaho hosaho hosaho hosaho...`},
        // Add more songs as needed
    ];

    useEffect(() => {
        const audioElement = audioRef.current;
        const updateCurrentTime = () => setCurrentTime(audioElement.currentTime);
        const updateDuration = () => setDuration(audioElement.duration);

        audioElement.addEventListener('timeupdate', updateCurrentTime);
        audioElement.addEventListener('loadedmetadata', updateDuration);

        return () => {
            audioElement.removeEventListener('timeupdate', updateCurrentTime);
            audioElement.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    useEffect(() => {
        if (currentSongIndex !== null) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [currentSongIndex]);

    const playHandler = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const pauseHandler = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    // const stopHandler = () => {
    //     audioRef.current.pause();
    //     audioRef.current.currentTime = 0;
    //     setIsPlaying(false);
    // };

    const nextSongHandler = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };

    const prevSongHandler = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    };

    const onEndedHandler = () => {
        nextSongHandler();
    };
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const [isExpanded, setIsExpanded] = useState(false);
    const [btnexpand,setbtnexpand]=useState(false)
    const handleExpand = () => {
        if (!isExpanded) {
            if(!btnexpand)
            setIsExpanded(true);
            setbtnexpand(true)
        }
    };
    const handleReset = () => {
        setIsExpanded(false);
        setbtnexpand(false);
    };
    const toggleLoop = () => {
        setLoopEnabled(!loopEnabled);
        audioRef.current.loop = !loopEnabled;

    };
    return (
        <>
        <div className="navbar">
          
          <div to="/Intro" id="photo"></div>
          <Link  to="/Power" ><i id="three" class="fa-solid fa-power-off"></i></Link>
          <Link to="/home"><i id="two" class="fa-solid fa-house"></i></Link>
       </div>
        <div>
            <div>
                {playlist.map((song, index) => (
                    <div key={index} className='box' onClick={() => setCurrentSongIndex(index)}style={{ height:"60px",fontSize:"18px",padding:"5px",backgroundColor:"transparent",cursor: 'pointer', margin: '10px',display:"flex",justifyContent:"space-equaly",flexDirection:"column",border:"1px solid black"}}>
                        {song.title}
                        <div key={index} onClick={() => setCurrentSongIndex(index)}  style={{fontFamily:"Helvetica",fontSize:"15px",color:"#8b8c89",display:"flex",flexDirection:"row",alignItems:"flex-start",justifyContent:"space-between",backgroundColor:"transparent"}}>
                          {song.cast}
                           <div key={index} onClick={() => setCurrentSongIndex(index)} style={{height:"50px",width:"50px",backgroundColor:"transparent",display:"flex",flexDirection:"row"}}>
                             <img id="image-size" src={song.image} alt=""/>
                           </div>
                        </div>
                    </div>
                ))}
    
            </div>
            <div  className={`nowplay ${isExpanded ? 'expanded' : 'collapsed'}`} >
                
                {currentSongIndex==null && (
                    <div id="man"  style={{ 
                        // backgroundColor: color, 
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"space-evenly"
                      }}>
                        <div>
                        <img id="play-walk" src="play-walk.gif" alt=" "/>
                         </div>
                    </div>
                )}
                {currentSongIndex !== null && (
                    <>
                    <div>
                       {isExpanded && <button className={`btn ${btnexpand ? 'expand' : 'collapse'}`} onClick={handleReset} style={{backgroundColor:"transparent",border:"none"}}><i  id="close" class="fa-solid fa-xmark"></i></button>}
                    </div>
                    <button onClick={handleExpand} >
                        <img id="image-play" src="play.gif" alt=" "/>
                    </button>
                        <p>{playlist[currentSongIndex].title}</p>
                        <p>
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </p>
                        <progress value={currentTime} max={duration}></progress>
                        { isExpanded && <div id="lyrics">
                            <div id="flow">{playlist[currentSongIndex].lyrics}</div></div>}
                        {isExpanded && <div id="hide"></div>}
                        <div id="controlbtn">
                           <button  className="songbtn1"onClick={prevSongHandler} disabled={currentSongIndex === null}>⏮</button>
                           {isPlaying ? (
                           <button  className="songbtn" onClick={pauseHandler} disabled={currentSongIndex === null}>⏸️</button>
                           ) : (
                           <button  className="songbtn" sonClick={playHandler} disabled={currentSongIndex === null}>▶️</button>
                           )}
                           {/* <button  className="songbtn"onClick={handleplay} disabled={currentSongIndex === null}>⏹️</button> */}
                           <button  className="songbtn1"onClick={nextSongHandler} disabled={currentSongIndex === null}>⏭</button>
                            {isExpanded && <button className="songbtn3" onClick={toggleLoop} style={{ marginLeft: '5px'}}>
                                {loopEnabled ? '🔂' : '🔁'}
                            </button>}
                        </div>
                    </>
                    
                )}
            </div>
            <audio id='play'
                ref={audioRef}
                src={currentSongIndex !== null ? playlist[currentSongIndex].src : ''}
                onEnded={onEndedHandler}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                controls 
            />
        </div>
        </>
    );
};

export default AudioPlayer;
