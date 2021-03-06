import axios from 'axios';
import store from '../store'
import * as userCreators from './userCreators'

const stubCurrentUser = {"id": 1, "email": "edsger@dijkstra.com", "password": "iluvswpp",
"name": "Edsger Dijkstra", "logged_in": true}

describe('userCreators', () => {
    const fflushPromises = () => {
        return new Promise(resolve => setImmediate(resolve));
    }
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('should get a single user', async () => {
        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200,
                    data: stubCurrentUser
                }
                setImmediate(resolve(result));
            })
        })   
        store.dispatch(userCreators.getUser());
        fflushPromises();
        expect(axios.get).toHaveBeenCalledTimes(1)
    })

    it('should sign in', async() => {
        axios.post = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 204
                }
                setImmediate(resolve(result));
            })
        })
        store.dispatch(userCreators.signIn());
        fflushPromises();
        expect(axios.post).toHaveBeenCalledTimes(1);
    })

    it('should sign up', async() => {
        axios.post = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 204
                }
                setImmediate(resolve(result));
            })
        })
        store.dispatch(userCreators.signUp());
        fflushPromises();
        expect(axios.post).toHaveBeenCalledTimes(1);
    })

    it('should sign out', async() => {
        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 204
                }
                setImmediate(resolve(result));
            })
        })
        store.dispatch(userCreators.signOut());
        fflushPromises();
        expect(axios.get).toHaveBeenCalledTimes(1);
    })

    it('should change password', async() => {
        let userCredential = {id: 1, new_password: 'oops'}
        axios.put = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200
                }
                setImmediate(resolve(result));
            })
        })
        store.dispatch(userCreators.changePassword(userCredential));
        fflushPromises();
        expect(axios.put).toHaveBeenCalledTimes(1);
    })

    it('should isLogin', async() => {
        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200
                }
                setImmediate(resolve(result));
            })
        })
        store.dispatch(userCreators.isLogin());
        fflushPromises();
        expect(axios.get).toHaveBeenCalledTimes(1);
    })
})