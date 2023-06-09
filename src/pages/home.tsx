import { useState, useEffect } from 'react'
import { 
  collection, addDoc, deleteDoc, doc , onSnapshot, query, where, orderBy, serverTimestamp, updateDoc
} from "@firebase/firestore";
import { database } from '../firebase';
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
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
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userDocument = doc(database, "users", user.uid);

            onSnapshot(userDocument, (snapshot) => {
                setDisplayUsername(snapshot.data());
            });
            
            const userDocumentCollection = collection(userDocument, "user-team");
            const userPlayers = query(userDocumentCollection, orderBy("position", "desc"));

            onSnapshot(userPlayers, (snapshot) => {
                const newPlayersInfo: player[] = [];
                snapshot.forEach(document => {
                    newPlayersInfo.push({ ...document.data(), id: document.id });
                })
                setPlayersInfo(newPlayersInfo);
                setLoading(false); 
            });
        } else {
            navigate("/login");
        } 
    }); 

    function deletePlayer(e: string) {
        const user: any = auth.currentUser;
        const userDocument = doc(database, "users", user.uid);

        const docReference = doc(userDocument, 'user-team', e);
        deleteDoc(docReference)
        .then(() => {})
    }

    function logoutUser () {
        setLoading(true);
        signOut(auth)
        .then(() => {
            navigate("/login");
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (  
        <div className="px-[20px] ">
                <button className="button logout mt-[30px] " onClick={logoutUser}>Log out</button>

                <h1 className="mt-[40px] mb-[50px] font-bold text-blue-600 ">{`${displayUsername ? displayUsername.username : ""}'s Team`}</h1>
                <div className="flex px-[50px] w-fit mb-[30px] mx-auto font-bold text-[18px] ">
                    <div className="w-[200px] flex ">
                        <div>Name</div>
                    </div>
                    <div className="w-[200px] flex ">
                        <div>Age</div>
                    </div>
                    <div className="w-[200px] flex ">
                        <div>Club</div>
                    </div>
                    <div className="w-[200px] flex ">
                        <div>Position</div>
                    </div>
                </div>

            {loading ?
                <h1 className="animate-pulse h-screen w-screen fixed top-0 bg-[#202123] grid place-content-center ">Loading...</h1> :
                <>
                {playersInfo.map((player) => (
                    <div key={player.id} className="flex items-center px-[50px] py-[10px] w-fit mb-[10px] mx-auto bg-yellow-500 rounded text-white capitalize font-semibold ">
                        <div className="w-[200px] flex ">
                            <div>{player.name}</div>
                        </div>
                        <div className="w-[200px] flex ">
                            <div>{player.age}</div>
                        </div>
                        <div className="w-[200px] flex ">
                            <div>{player.club}</div>
                        </div>
                        <div className="w-[200px] flex ">
                            <div>{player.position}</div>
                        </div>
                        <button className="p-[5px] ml-auto " onClick={() => deletePlayer(player.id)}>Delete</button>
                    </div>
                ))}

                <Link to="/add-player"><button className="add-player text-white mt-[30px] ">Add Player</button></Link>
                </>
            }
        </div>
    );
}
 
export default Home;