import {
  Container,
  Content,
  Thumbnail,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Body
} from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";

const ChildTab = props => {
  console.log("kwontaehyoung");
  const menuListItem = props.menu.map((ele, index) => (
    <MenuItem key={index} image={ele.image} name={ele.name} price={ele.price} />
  ));

  console.log(menuListItem);

  return (
    <Container>
      <Content>
        <List>{menuListItem}</List>
      </Content>
    </Container>
  );
};

const MenuItem = props => {
  return (
    <ListItem style={styles.container}>
      <Left style={styles.left}>
        <Thumbnail
          square
          source={{
            uri: props.image
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Text>{props.name}</Text>
        <Text note numberOfLines={1}>
          {props.price}
        </Text>
      </Body>
      <Right style={styles.right} />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  left: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  body: {
    flex: 2,
    flexDirection: "column"
  },
  right: {
    flex: 1
  }
});

ChildTab.propTypes = {
  menu: PropTypes.array
};

MenuItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string
};

export default ChildTab;
