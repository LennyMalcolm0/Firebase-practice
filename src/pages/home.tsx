import { useState, useEffect } from 'react'
import { 
  collection, addDoc, deleteDoc, doc , onSnapshot, query, where, orderBy, serverTimestamp, updateDoc
} from "@firebase/firestore";
import { database } from '../firebase';
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom';

const Home = () => {
    interface player{
      age?: number
      club?: string
      createdAt?: any
      id: string
      position?: string
      name?: string
    }
    const [playersInfo, setPlayersInfo] = useState<player[]>([]);
    const [displayUsername, setDisplayUsername] = useState<{username: string} | any>();
    const [loading, setLoading]= useState<boolean>(true);
    
    const user: any | null = auth.currentUser,
    userDocument = doc(database, "users", user.uid);

    useEffect(() => {
        onSnapshot(userDocument, (snapshot) => {
            setDisplayUsername(snapshot.data());
        })
    }, [])
    
    const userDocumentCollection = collection(userDocument, "user-team");
    const userPlayers = query(userDocumentCollection, orderBy("position", "desc"));

    useEffect(() => {
        onSnapshot(userPlayers, (snapshot) => {
            const newPlayersInfo: player[] = [];
            snapshot.forEach(document => {
                newPlayersInfo.push({ ...document.data(), id: document.id });
            })
            setPlayersInfo(newPlayersInfo);
            setLoading(false);
        })
    }, []);

    function deletePlayer(e: string) {

        const docReference = doc(userDocument, 'user-team', e);
        deleteDoc(docReference)
        .then(() => {})
    }

    function updatePlayer() {
        const playerID = document.querySelector('.update-player input') as HTMLInputElement;

        const docReference = doc(database, 'Players', playerID.value);
        updateDoc(docReference, {
            age: 25
        })
        .then((doc) => {
            playerID.value = "";
        })
    }

    const goToLoginPage= document.querySelector('.login-link') as HTMLElement;
    function logoutUser () {
        setLoading(true);
        signOut(auth)
        .then(() => {
            console.log("User signed out");
            goToLoginPage.click();
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (  
        <div className="px-[20px] ">
            <button className="button logout mt-[30px] " onClick={logoutUser}>Log out</button>
            <Link to="/login" className="login-link"></Link>

            <h1 className="mt-[40px] mb-[50px] font-bold text-blue-600 ">{`${displayUsername ? displayUsername.username : ""} Team`}</h1>
            <div className="flex mb-[30px] px-[50px] font-bold text-[18px] ">
                <div className="w-[200px] ">
                    <div>Name</div>
                </div>
                <div className="w-[200px] ">
                    <div>Age</div>
                </div>
                <div className="w-[200px] ">
                    <div>Club</div>
                </div>
                <div className="w-[200px] ">
                    <div>Position</div>
                </div>
            </div>

            {loading ? <div className="animate-pulse h-screen w-screen fixed top-0 bg-[#202123] "></div> : <></>}

            {!loading ? 
                playersInfo.map((player) => (
                    <div key={player.id} className="flex items-center mb-[10px] px-[50px] py-[10px] bg-yellow-500 rounded text-white capitalize font-semibold ">
                        <div className="w-[200px] ">
                            <div>{player.name}</div>
                        </div>
                        <div className="w-[200px] ">
                            <div>{player.age}</div>
                        </div>
                        <div className="w-[200px] ">
                            <div>{player.club}</div>
                        </div>
                        <div className="w-[200px] ">
                            <div>{player.position}</div>
                        </div>
                        <button className="p-[5px] " onClick={() => deletePlayer(player.id)}>Delete</button>
                    </div>
                )) :
                <></>
            }
            
            <Link to="/add-player"><button className="add-player text-white mt-[30px] ">Add Player</button></Link>
        </div>
    );
}
 
export default Home;