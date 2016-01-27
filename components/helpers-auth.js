import Auth0Lock from 'auth0-lock'

const lock = new Auth0Lock('6epBfuNAf2YdSMlMEDRrFdb2nVmeh1xM', 'yongjun21.auth0.com')

const key = 'ZzzzMixer-User'

export function loginUser () {
  lock.show({
    callbackURL: window.location.href,
    responseType: 'token'
  })
}

export function logoutUser () {
  window.localStorage.removeItem(key)
  window.location.hash = ''
  this.setState({user: null})
}

export function getUserProfile (cb) {
  let user = JSON.parse(window.localStorage.getItem(key))
  const authHash = lock.parseHash(window.location.hash)
  window.location.hash = ''

  if (!user && authHash) {
    if (authHash.id_token) {
      lock.getProfile(authHash.id_token, function (err, profile) {
        if (err) console.error(err)
        else {
          user = {
            user_id: profile.user_id,
            nickname: profile.nickname
          }
          window.localStorage.setItem(key, JSON.stringify(user))
          cb({user: user})
        }
      })
    } else if (authHash.error) console.log('Error signing in', authHash)
  } else cb({user: user})
}
