import Realm from 'realm';

const userDetails = new Realm({
    schema: [
        {
            name: 'userDetails',
            properties: {
                walletName: 'string',
                mobile: 'string',
                password: 'string'
            },
        },
    ],
});

const loginDetails = new Realm({
    schema: [
        {
            name: 'loginDetails',
            properties: {
                walletName: 'string',
                password: 'string'
            },
        },
    ],
});

const DBServices = {
    saveUserInfo(data) {
        console.log(data);
        userDetails.write(() => {
            userDetails.create(
                'userDetails',
                data,
                true,
            );
        });
    },

    fetchUserDB() {
        const query = userDetails.objects('userDetails');
        const array = Array.from(query);
        return array;
    },

    saveLoginInfo(data) {
        console.log(data);
        loginDetails.write(() => {
            loginDetails.create(
                'loginDetails',
                data,
                true,
            );
        });
    },

    fetchLoginDB() {
        const query = loginDetails.objects('loginDetails');
        const array = Array.from(query);
        return array;
    }
};

export default DBServices;