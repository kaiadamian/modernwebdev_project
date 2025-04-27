/* find a dorm by its name */

export const findDormByName = (dorms, dormName) => {
    if (!dorms || !dormName) return null
    return dorms.find(dorm => dorm.get('dormName') === dormName)
}