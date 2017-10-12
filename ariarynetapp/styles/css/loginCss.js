import { StyleSheet, Dimensions } from 'react-native';
const loginCss = StyleSheet.create({
    loginScreen: {
        flex: 1,
        paddingBottom: 0,
        justifyContent: 'center'
    },
    wrapper: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: '#eee',
    },
    dialogContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:50,
    },
    inputWrap: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 0,
        height: 40,
        backgroundColor: 'transparent'
    },
    input: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#FFF',
        height:40
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    buttonFacebook: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#3b5998',
        paddingHorizontal: 0
    },
    buttonLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#00BF9A',
        paddingHorizontal: 20
    },
    signUp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#00aced',
        paddingHorizontal: 20
    },
    instructions: {
        alignItems: 'flex-end',
    },
    toutchable: {
    },
    textforgot: {
        color: '#00BF9A',
        textAlign:'right',
    },
    imageLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    seperator: {
        marginBottom: 10
    },
    annuler:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#FFC107',
        paddingHorizontal: 20
    }
});
export default loginCss;