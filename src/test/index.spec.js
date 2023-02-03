import { sumar, createUser } from "../lib/index.js";
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    onAuthStateChanged, } from "firebase/auth";
    // import { initializeApp } from "firebase/app";
// import { firebase } from 'firebase';

import { onNavigate } from '../main.js';

// jest.mock('firebase/app');
jest.mock('firebase/auth', () => {
    return {
        getAuth: jest.fn(() => {
            return { auth: 'TEST' }
        }),
        createUserWithEmailAndPassword: jest.fn((auth, userMail, userPass) => {
            if (!userMail || !userPass) {
                throw new Error('ERROR')
            }
            Promise.resolve({ user: 'user' })
        }),
        updateProfile: jest.fn((auth, objectToUpdate) => {
            Promise.resolve({ user: 'userName' });
        }),
        signOut: jest.fn((auth) => {
            Promise.resolve();
        }),
    }
});
jest.mock('../main.js', () => {
    return {
        onNavigate: jest.fn(() => {
            return true;
        })
    }
});

// jest.mock('../lib/index.js', () => {
//     const allAutoMocked = jest.createMockFromModule('../lib/index.js');
//     // grab all the *real* implementations of the module's functions
//     // in an object
//     const actual = jest.requireActual('../lib/index.js');

//     return {
//         ...allAutoMocked,
//         sumar: jest.fn((a, b) => {
//             return 3;
//         }),
        
//         createUser: actual.createUser,
//     }
// })

describe('adds 1 + 2 to equal 3', () => {
    const a = 4;
    const b = 2;

    it('Test for sumar in index', () => {

        expect(sumar(a, b)).toBe(3);
    })

    it('Test for create a new user with Email Pass and User', async () => {
        const email = 'test@email.com';
        const pass = 'myPass123';
        const user = 'myUser';
        await createUser(email, pass, user);
        expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    })
});