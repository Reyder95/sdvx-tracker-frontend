import axios from 'axios'
import keys from './keys.json'

// API Calls made to the sepia database. Each function represents a different type of call being made.
// If you want to build your own API call of some kinda, it should be done here

// The API URL, please change this to what works for you.
let api = keys.api_url

// ---User Login---

// Gets a users logged in status. (This might become deprecated in the future since it is only used for one purpose)
export const getLoggedInStatus = () => {
    axios.get(`${api}/users/getloggedin`, { withCredentials: true })
      .then(() => {
        document.getElementById('loggedin').style.display = "block"
        document.getElementById('unloggedin').style.display = "none"
        
        
      })
      .catch(err => {
        if (localStorage.getItem("user_id") === null)
        {
          document.getElementById('loggedin').style.display = "none"
          document.getElementById('unloggedin').style.display = "block"
        }
        else
        {
          document.getElementById('unloggedin').style.display = "none"
          document.getElementById('loggedin').style.display = "block"
        }
      })
}

// Logs a user out of the service
export const logUserOut = () => {
    axios.get(`${api}/auth/logout`, { withCredentials: true })
      .then(() => {

        localStorage.removeItem('user_id')
        localStorage.removeItem('username')
        localStorage.removeItem('jwt_token')

        alert("Successfully logged out!")

        document.getElementById('loggedin').style.display = "none"
        document.getElementById('unloggedin').style.display = "block"

        window.location.reload(false)
      })
      .catch(err => {
          throw new Error(err)
      })
}

// Register the user
export const registerUser = async (user) => {
    let result = await axios.post(`${api}/auth/signup`, { 
        username: user.username,
        password: user.password,
        email: user.email
     })
        .then(() => {
            return true
        })
        .catch(err => {
            alert("Username or Email has been taken")
            return false
        })

    return result
}

// Login the user
export const loginUser = async (user) => {
    let result = await axios.post(`${api}/auth/login`, {
        key: user.key,
        password: user.password
    }, { withCredentials: true })
        .then(apiData => {
            return {confirm: true, user: apiData.data}
        })
        .catch(() => {
            alert("Invalid username or password!")
        })

    return result     
}

// ---Profile Editing---

// Handles the uploading of profile pictures to one's account
export const profilePictureUpload = (formData) => {
    axios.post(`${api}/api/profile_picture/` + localStorage.getItem('user_id'), formData,{
      withCredentials: true,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
        "Content-Type": "multipart/form-data"
      }
    })
    .then(() => {
      alert("Successfully uploaded profile picture!")
    })
    .catch(err => {
        throw new Error(err)
    })
}

// Allows a user to edit their own profile
export const editProfile = (postObject) => {
    axios.post(`${api}/api/edit_profile`, {postObject}, {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`
        }
      })
      .then(() => {
        alert('Successfully modified profile settings!')
      })
      .catch(err => {
        throw new Error(err)
      })
}

// ---User Information---

// Get basic user information
export const userInformation = async (userID) => {
    let result = await axios.get(`${api}/api/user?id=${userID}`)
        .then(apiData => {
            return apiData
        })
        .catch(err => {
            throw new Error(err)
        })

        return result
}

// Get user's recent scores
export const userRecentScores = async (userID) => {
    let result = axios.get(`${api}/api/user_recent?id=${userID}`)
        .then(apiData => {
            return apiData
        })
        .catch(err => {
            throw new Error(err)
        })
    
    return result;
}

export const userLibrary = async (userID) => {
    let result = axios.get(`${api}/api/user_library?id=${userID}`)
        .then(apiData => {
            return apiData
        })
        .catch(err => {
            throw new Error(err)
        })

    return result
}

// Get a count of user's grades
export const userGrades = async (userID, filter) => {
    let levelFilter = ''
    
    if (filter != 0)
        levelFilter = `&l=${filter}`

    let result = await axios.get(`${api}/api/user_grades?id=${userID}${levelFilter}`)
        .then(apiData => {
            return apiData.data.data
        })
        .catch(err => {
            throw new Error(err)
        })

    return result
}

// Change a user's username
export const changeUsername = (username) => {
    console.log(username)
    axios.post(`${api}/api/username_change`, {
        username: username
    },
    {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
    })
    .then(() => {
        localStorage.setItem('username', username)
        window.location.reload(false)
    })
    .catch(err => {
        alert('Username is taken!')
    })
}

// ---Songs and Score---

// Gets a list of songs based on various parameters
export const getSongList = async (page, search, level, game, type)  => {

    let songFilter = `?p=${page}`

    if (search != '')
        songFilter += `&s=${search}`

    if (level != 0)
        songFilter += `&l=${level}`

    if (game != '')
        songFilter += `&g=${game}`

    if (type != '')
        songFilter += `&t=${type}`

    let result = await axios.get(`${api}/api/songs${songFilter}`)
        .then(apiData => {
            const songs = apiData.data.data
            const nextPage = apiData.data.next_page

            return {songs, nextPage, page}
        })
        .catch(err => {
            throw new Error(err)
        })

    return result
}

// Adds a song to the database based on various values
export const addSong = async (postObject) => {
    let result = axios.post(`${api}/api/add_song`, {
                    postObject: postObject
                }, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                    }
                })
                .then(apiData => {
                    return apiData
                })
                .catch(err => {
                    throw new Error(err)
                })

    return result
}

export const getSong = async (songID) => {
    let result = await axios.get(`${api}/api/song_single?id=${songID}`)
        .then(apiData => {
                return apiData
        })
        .catch(err => {
            throw new Error(err)
        })

    return result
}

export const addScore = async (score, diffID, clearType) => {
    let result = await axios.post(`${api}/api/add_score`, {
                            score: score,
                            chart_id: diffID,
                            clear_id: clearType
                        }, { 
                            withCredentials: true,
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                            }
                        })
                        .then(data => {
                            return data
                        })
                        .catch(err => {
                            throw new Error(err)
                        })

    return result
}

export const editScore = (postObject) => {

    console.log()
    axios.post(`${api}/api/update_song`, {
                    postObject: postObject
                }, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                    }
                })
                .then(res => {
                    window.location.reload(false)
                })
                .catch(err => {
                    throw new Error(err)
                })
}

export const addDiffs = (postObject) => {
    axios.post(`${api}/api/add_difficulty`, { postObject: postObject },
    {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
    })
    .then(res => {
        window.location.reload(false)
    })
    .catch(err => {
        throw new Error(err)
    })
}

export const getScores = async (songID) => {
    let result = axios.get(`${api}/api/scores?sid=${songID}&uid=${localStorage.getItem('user_id')}`)
                .then(apiData => {
                    return apiData
                })
                .catch(err => {
                    throw new Error(err)
                })

    return result
}

export const deleteScore = (scoreID) => {
    axios.post(`${api}/api/delete_score`, {
            id: scoreID
        }, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(() => {
            window.location.reload(false)
        })
        .catch(err => {
            throw new Error(err)
        })
}

export const getUsers = async (page = 1, sort, search) => {
    let sortQuery = ''
    let searchQuery = ''

    if (sort != null)
        sortQuery = `&sort=${sort}`

    if (search != null)
        searchQuery = `&search=${search}`

    console.log(`${api}/api/users?p=${page}${sortQuery}${searchQuery}`)

    let result = axios.get(`${api}/api/users?p=${page}${sortQuery}${searchQuery}`)
    .then(data => {
        return data
    })

    return result
}