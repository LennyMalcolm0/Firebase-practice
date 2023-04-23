import { useState, useRef, useEffect } from 'react'
import { 
  collection, addDoc, deleteDoc, doc , onSnapshot, query, where, orderBy, serverTimestamp, updateDoc
} from "@firebase/firestore";
import { database } from '../firebase'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

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
    const [loadedPlayersInfo, setLoadedPlayersInfo]= useState<boolean>(false);

    const collectionReference = collection(database, 'Players');
    const marriedPlayers = query(collectionReference, orderBy("createdAt"))

    useEffect(() => {
        onSnapshot(marriedPlayers, (snapshot) => {
            const newPlayersInfo: player[] = [];
            snapshot.forEach(document => {
                newPlayersInfo.push({ ...document.data(), id: document.id })
            })
            setPlayersInfo(newPlayersInfo);
            setLoadedPlayersInfo(true);
        })
    }, [])

    function addPlayer() {
        const inputsData = document.querySelectorAll('input');

        addDoc(collectionReference, {
            name: inputsData[0].value.toString(),
            age: Number(inputsData[1].value),
            married: inputsData[2].value.toLowerCase() === "single" ? false : true,
            club: inputsData[3].value.toString(),
            createdAt: serverTimestamp()
        })
        .then(() => {
            inputsData.forEach(inputData => {
            inputData.value = ""
            })
        })
    }

    function deletePlayer() {
        const playerID = document.querySelector('.delete-player input') as HTMLInputElement;

        const docReference = doc(database, 'Players', playerID.value);
        deleteDoc(docReference)
        .then(() => {
            playerID.value = "";
        })
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

    function logoutUser () {
        signOut(auth)
        .then(() => {
            console.log("User signed out")
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (  
        <div className="px-[20px] ">
            <button className="logout" onClick={logoutUser}>Log out</button>

            <h1 className="mt-[40px] mb-[50px] font-bold text-blue-600 ">Emmy's Team</h1>
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

            {loadedPlayersInfo ? 
                playersInfo.map((player) => (
                    <div key={player.id} className="flex mb-[10px] px-[50px] py-[10px] bg-yellow-500 rounded text-white capitalize font-semibold ">
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
                    </div>
                )) :
                <div className="animate-pulse h-screen w-screen fixed top-0 bg-[#202123] "></div>
            }
            
            <button className="mt-[30px] add-player ">Add Player</button>
        </div>
    );
}
 
export default Home;