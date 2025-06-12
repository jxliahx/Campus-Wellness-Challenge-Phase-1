import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RoleRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth)
    const path = window.location.pathname
    // Extract the first part of the path after the first slash
    const firstPath = path.split('/')[1]
    // Get the prefix (B_, P_, or C_)
    const pagePrefix = firstPath ? firstPath.split('_')[0] : ''

    console.log('RoleRoute - Current path:', path)
    console.log('RoleRoute - First path:', firstPath)
    console.log('RoleRoute - Page prefix:', pagePrefix)
    console.log('RoleRoute - User:', user)

    // If not logged in, redirect to login
    if (!user) {
        console.log('RoleRoute - No user found, redirecting to login')
        return <Navigate to="/login" />
    }

    // Check user role from the user object
    const isCoordinator = user.role === 'coordinator'
    const isParticipant = user.role === 'participant'

    console.log('RoleRoute - User role:', user.role)
    console.log('RoleRoute - Is coordinator:', isCoordinator)
    console.log('RoleRoute - Is participant:', isParticipant)

    // Special handling for dashboard paths
    if (firstPath === 'participant-dashboard' && isParticipant) {
        console.log('RoleRoute - Participant accessing their dashboard')
        return children
    }
    if (firstPath === 'coordinator-dashboard' && isCoordinator) {
        console.log('RoleRoute - Coordinator accessing their dashboard')
        return children
    }

    // Special handling for create challenge path
    if (firstPath === 'create-challenge' && isCoordinator) {
        console.log('RoleRoute - Coordinator accessing create challenge')
        return children
    }

    // If logged in as participant
    if (isParticipant) {
        // Allow access to B_ and P_ pages
        if (pagePrefix === 'B' || pagePrefix === 'P') {
            console.log('RoleRoute - Participant accessing allowed page')
            return children
        }
        // Redirect to participant dashboard for other pages
        console.log('RoleRoute - Participant accessing restricted page, redirecting to dashboard')
        return <Navigate to="/participant-dashboard" />
    }

    // If logged in as coordinator
    if (isCoordinator) {
        // Allow access to B_ and C_ pages
        if (pagePrefix === 'B' || pagePrefix === 'C') {
            console.log('RoleRoute - Coordinator accessing allowed page')
            return children
        }
        // Redirect to coordinator dashboard for other pages
        console.log('RoleRoute - Coordinator accessing restricted page, redirecting to dashboard')
        return <Navigate to="/coordinator-dashboard" />
    }

    // If role is not recognized, redirect to login
    console.log('RoleRoute - Unknown role, redirecting to login')
    return <Navigate to="/login" />
}

export default RoleRoute 