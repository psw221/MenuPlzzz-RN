import { AppLoading, Font } from "expo";

import React, { Component } from "react";
import {
  View,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import Spinner from "react-native-loading-spinner-overlay";

import { Actions } from "react-native-router-flux";

import SwiperFlatList from "react-native-swiper-flatlist";

import { IP_ADDRESS } from "../../Service/service";
import { deviceHeight, deviceWidth, layout } from "../../Styles/layout";
import StoreList from "./Presenter";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      spinner: true,
      items: [
        // {
        //   key: "menu",
        //   name: "맥도날드",
        //   image:
        //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAA9CAMAAAD1ReXsAAAAYFBMVEX////7yAv7xQD7yAD+67/++ev+9d3+//37wwD+9+X97Lz++/D834z97sX//PT84JP70lP70Ef98tL85qr81WH96LD7zDP7yyr82XX83Yb845z701n96rb723v95KP82G39OaYZAAAC0ElEQVRYhe1X6ZqrIAxlqXWrWrV2X97/LS9J0AJiC87P2/N942AGDyE5CQxjP/zwXyONsEah22eZbGZEV55lbfU36iaTnEshtpY15wLNj79QXwQQS/XoTGq0qId4raceFLWs8jOsUE7WVCrWQ95x9eu6ljoRnGM0Xor8OJlv6u2mfpfjn9fgphzbTZ722loBZQ2jp1qkXUfdTSTAwoUWCx9XpGGxirtVGTvTMAXuBoc9DBMy75Tjp9Vuj/J4Kc2J0Ve519YcpqxRuaKTfHzBIEPENzAYRvPRWCgCoIIxJBQU3P5evkOCQeEij+bGuN6nV+TcsjLjZoirdx5i0FoOsiuw7Egwl8laC74im4nzFWRWSlpx43gQWz8DcB3e7+Chkg0+jQA/gDu28A/uRyfofEoX6um6EFmbKZeOdM9ICz+m6La4kdL9/CPom8SwQBYRY8EjKFRx5fPE1JnHTTVxD+ZEiJK12ndAuO045hO3eUxAr4wNOGbOOlXSiduMFJxMamYdQZ1gGO2Ck1JzW9YeZ8YoHINrBxarHqXydeZnXD3pf2jum2UlQV1YOKBduw2uoYA7F4dSuJL/hha57Qz1mtvOAhZZTLuiD7h9m9ICd2N79LjxCSgT49aA6DT3xjbTFsOFgjRuRejisUuHiifmtL+LuSAoa3MXHyiUZzA39qX3YUnQhWmXpZZPREe5eOdrbidt5MeBheKAMXSPE+kpeTodYroV5b53rHgyzLgLn6Y+gDTrNgm0WicaAGXv1sIy0pNXV62ct6pR9sFdtqbNuycVKnlW3tiswo/MWviKhDI8iyyVlKvMRVCVzOoYm+NMEYl/8hLyGO7Sv8kl6BC699Pz7HZicIdeIxa4X5kQInP9ruO4O3966hLgik1zF6y7hjTDBW4/NPedFc0QkNAKNi+yUG6cfGd9NwSIPCk2CkVYqaU4eZOzuor/5+SHHxj7B5nyF6KsxsArAAAAAElFTkSuQmCC",
        // },
      ],
      imageList: [
        "http://www.mcdonalds.co.kr/uploadFolder/banner/banner_201906070330434080.jpg?timestamp=1559985327696",
        "http://www.mcdonalds.co.kr/uploadFolder/banner/banner_201906040801014110.jpg",
        "http://www.mcdonalds.co.kr/uploadFolder/banner/banner_201906040739140260.jpg",
        "http://www.mcdonalds.co.kr/uploadFolder/banner/banner_201905301256117210.jpg"
      ]
    };
  }

  componentDidMount() {
    this.getHomeApiAsync();
  }

  getHomeApiAsync = () => {
    return fetch(IP_ADDRESS + "/api/home")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          items: responseJson,
          spinner: false
        });
      });
  };

  render() {
    const { isLoadingComplete, items, spinner, imageList } = this.state;

    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    const ImageList = imageList.map((url, index) => (
      <View key={index} style={[styles.child, { backgroundColor: "#ff5000" }]}>
        <Image
          source={{
            uri: url
          }}
          style={{
            width: deviceHeight,
            height: deviceHeight * 0.6
          }}
        />
      </View>
    ));

    return (
      <React.Fragment>
        <Spinner
          visible={spinner}
          texContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <StatusBar backgroundColor="rgba(0,0,0,0.24)" animated />
        <View style={[layout.navBar]}>
          <View style={{ flex: 0.2 }} />
          <View>
            <Image
              //style={{ width: 100, height: 20 }}
              source={require("../../assets/images/menu_plzzz_logo.png")}
              resizeMode={"cover"}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              Actions.push("likes");
            }}
          >
            <Image
              style={{ marginRight: 20 }}
              source={require("../../assets/images/likesButton.png")}
              resizeMode={"cover"}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <View style={[styles.swipeContainer]}>
            <SwiperFlatList
              autoplay
              autoplayLoop
              autoplayDelay={2}
              index={0}
              showPagination
            >
              {ImageList}
            </SwiperFlatList>
          </View>
          <StoreList items={items} />
        </View>
      </React.Fragment>
    );
  }
  _loadAssetsAsync = async () => {
    return Promise.all([
      //Asset.loadAsync([require("../../assets/images/icon.png")]),
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font
      })
    ]);
  };

  _handleLoadingError = error => {
    console.log(err);
  };

  _handleFinishLoading = async () => {
    this.setState({
      isLoadingComplete: true
    });
  };
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF"
  },
  swipeContainer: {
    backgroundColor: "white",
    paddingTop: 10
  },
  child: {
    height: deviceHeight * 0.6,
    width: deviceWidth,
    justifyContent: "center"
  }
});

export default Home;
