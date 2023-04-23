import { Link } from 'react-router-dom';
import { typing } from '../components/generalFunctions';

const AddPlayer = () => {
    return (  
        <div>
            <div className="form-container">
                <form className='login-form'>
                    <label>Player name</label>
                    <input type="text" onInput={typing} placeholder="Name" className="form-input username-input"/>

                    <label>Player</label>
                    <input type="password" onInput={typing} placeholder="Password" className="form-input password-input"/>

                    <label>Enter Password</label>
                    <input type="password" onInput={typing} placeholder="Password" className="form-input password-input"/>

                    <label>Enter Password</label>
                    <input type="password" onInput={typing} placeholder="Password" className="form-input password-input"/>

                    <button type="submit" className="form-submit">Done</button>
                    <Link to="/" className="link-home"></Link>
                </form>
            </div>
        </div>
    );
}
 
export default AddPlayer;