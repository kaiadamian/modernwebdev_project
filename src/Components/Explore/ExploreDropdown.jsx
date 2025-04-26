import { useEffect, useState } from 'react'
import { getAllDorms } from '../../Common/Services/ExploreService.js'

/* retrieves all dorms and displays them */
const ExploreDropdown = () => {
  const [dorms, setDorms] = useState([])
  const [selectedDorm, setSelectedDorm] = useState(null) 

  useEffect(() => {
    getAllDorms()
      .then(setDorms)
      .catch((error) => console.error('Error fetching dorms:', error))
  }, [])

  const handleDormSelection = (e) => {
    const dormId = e.target.value
    const selectedDorm = dorms.find((dorm) => dorm.id === dormId)
    setSelectedDorm(selectedDorm)
  }

  return (
    <div>
      <h2>Select a Dorm</h2>
      <select 
        value={selectedDorm ? selectedDorm.id : ''} 
        onChange={handleDormSelection}
      >
        <option value="" disabled>Select a Dorm</option>
        {dorms.map((dorm) => (
          <option key={dorm.id} value={dorm.id}>
            {dorm.get('ageGroup')} Hall 
          </option>
        ))}
      </select>

      {selectedDorm && <p>Selected Dorm: {selectedDorm.get('ageGroup')}</p>}
    </div>
  )
}

export default ExploreDropdown
