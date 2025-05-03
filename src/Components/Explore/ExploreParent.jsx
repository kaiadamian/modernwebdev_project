/* ExploreParent - Stateful Parent Component */
import { useEffect, useState } from 'react'
import { getAllDorms } from '../../Common/Services/DormsService.js'
import { getEventsByDormId } from '../../Common/Services/EventsService.js'
import ExploreDropdown from './ExploreDropdown'

const ExploreParent = () => {
    // get list of dorms from the backend
    const [dorms, setDorms] = useState([])

    // keep track of the dorm the user selected
    const [selectedDorm, setSelectedDorm] = useState(null) 
    const [events, setEvents] = useState([])

    // helper function to find the dorm that matches the dormName
    const findDormByName = (dorms, dormName) => {
        if (!dorms || !dormName) return null
        return dorms.find(dorm => dorm.get('dormName') === dormName)
    }

    // extract the dorm name from the browser's url string for links on home page
    const dormNameFromURL = new URLSearchParams(location.search).get('dormName')

    // fetch all dorms
    useEffect(() => {
        getAllDorms()
        .then(fetchedDorms => {
            setDorms(fetchedDorms)
    
            // if there is a dorm name in the url, find and select it then display its events
            if (dormNameFromURL) {
                const matchedDorm = findDormByName(fetchedDorms, dormNameFromURL)
                if (matchedDorm) {
                    setSelectedDorm(matchedDorm)
    
                    getEventsByDormId(matchedDorm.id)
                        .then(setEvents)
                        .catch((error) => console.error('Error fetching events:', error))
                }
            }
        })
        .catch((error) => console.error('Error fetching dorms:', error))
    }, [dormNameFromURL])

    // sets the selected dorm then displays that dorm's events 
    const handleDormSelection = (event, newValue) => {
        setSelectedDorm(newValue)

        if (newValue) {
            getEventsByDormId(newValue.id)
            .then(setEvents)
            .catch((error) => console.error('Error fetching events:', error))
        } else {
            setEvents([])
        }
    }

    return (
        // passes data down to dropdown
        <ExploreDropdown 
            dorms={dorms} 
            selectedDorm={selectedDorm} 
            events={events} 
            onDormSelect={handleDormSelection} 
        />
    )
}

export default ExploreParent
