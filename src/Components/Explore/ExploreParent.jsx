/* ExploreParent - Stateful Parent Component */
import { useEffect, useState } from 'react'
import { getAllDorms } from '../../Common/Services/DormsService.js'
import { getEventsByDormId } from '../../Common/Services/EventsService.js'
import ExploreDropdown from './ExploreDropdown'

const ExploreParent = () => {
    const [dorms, setDorms] = useState([])
    const [selectedDorm, setSelectedDorm] = useState(null) 
    const [events, setEvents] = useState([])

    const findDormByName = (dorms, dormName) => {
        if (!dorms || !dormName) return null
        return dorms.find(dorm => dorm.get('dormName') === dormName)
    }

    const dormNameFromURL = new URLSearchParams(location.search).get('dormName')

    useEffect(() => {
        getAllDorms()
        .then(fetchedDorms => {
            setDorms(fetchedDorms)
    
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
        <ExploreDropdown 
            dorms={dorms} 
            selectedDorm={selectedDorm} 
            events={events} 
            onDormSelect={handleDormSelection} 
        />
    )
}

export default ExploreParent
