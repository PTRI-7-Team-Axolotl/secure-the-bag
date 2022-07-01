import React from 'react'
import { Navigate } from 'react-router-dom'

function User () {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const[user, setUser] = useState({})
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return <div>This is the user component</div>
    
    }
    
} 
    
    
    
    
    export default User;
