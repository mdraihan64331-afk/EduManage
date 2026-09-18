import React, { useEffect } from 'react'
import axios from 'axios'
import { serverURL } from '../App'

function useGetCurrentUser() {
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(
                    `${serverURL}/api/user/current`,
                    { withCredentials: true }
                )

                console.log("User:", result.data)

            } catch (error) {
                console.log("Status:", error.response?.status)
                console.log("Backend Error:", error.response?.data)
            }
        }

        fetchUser()
    }, [])
}

export default useGetCurrentUser