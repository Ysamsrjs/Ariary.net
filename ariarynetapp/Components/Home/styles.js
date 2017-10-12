const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
    imageContainer: {
        flex: 1,
        width: null,
        height: null
    },
    logoContainer: {
        marginTop: deviceHeight / 8,
        backgroundColor: "#FFF",
        borderRadius: 100,
        alignItems:'center',
        justifyContent:'center',
        width:120,
        height:120
    },
    logo: {
        width: 100,
        height: 100
    },
    text: {
        color: "white",
        fontWeight:'bold',
        fontSize:20,
        bottom: 6,
        marginTop: 5
    },
    buttonAccueil: {
        marginVertical: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height:60,
        paddingVertical:20,
    },
    mainText: {
        flex:1,
        alignItems: "center",
        justifyContent:'center',
        backgroundColor:'#FFF',
        marginBottom:10,
        width:300,
    }
};
