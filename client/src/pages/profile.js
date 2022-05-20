import Chat from './chat';

const Profile = ({user, authToken, logoutUser, timer }) => {
    const handleLogout = () => {
        clearInterval(timer)
        logoutUser()
    }

    return (
        <div id="profile">
            <Chat timer={timer} logoutUser={logoutUser} authToken={authToken} user={user} />
        </div>
    )
}

export default Profile;