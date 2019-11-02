import React, {Component} from 'react';
import {
  ScrollView,
  ContainerHeader,
  Avatar,
  ButttonEdit,
  Nickname,
  Name,
  Info,
  Item,
  TextLabel,
  TextValue,
  InfoTime,
  TimeDone,
  TimePending,
  Bold,
  Line,
  ButtonLogout,
  TextLogout,
  Alert,
} from './styles';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import avatar from '../../assets/images/avatar.png';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as UserActions} from '../../store/ducks/user';
import {Creators as AlertActions} from '../../store/ducks/alert';
import AsyncStorage from '@react-native-community/async-storage';

class Profile extends Component {
  state = {
    person: {
      id: '1',
      name: 'Keven Max Noronha de Lima',
      nickname: 'Kevinho',
      avatar:
        'https://instagram.fjdo10-1.fna.fbcdn.net/vp/a7c70dbb22e9cf8577554ad951241c83/5E479490/t51.2885-15/e35/71713324_937268040005072_3515962860375946059_n.jpg?_nc_ht=instagram.fjdo10-1.fna.fbcdn.net&_nc_cat=108',
      matriculation: '403258',
      course: 'Engenharia de Software',
      college: 'UFC - Russas',
      contact: '(85) 98779-9928',
      requiredHours: 130.2,
      totalHours: 288.5,
    },
    showAlert: false,
    titleAlert: '',
    messageAlert: '',
  };

  componentDidMount() {
    this.alert();
  }

  alert = () => {
    if (this.props.alert.show) {
      const {show, title, message} = this.props.alert;
      this.setState({
        showAlert: show,
        titleAlert: title,
        messageAlert: message,
      });
    }
  };

  handleConfirmAlert = () => {
    this.setState({
      showAlert: false,
      titleAlert: '',
      messageAlert: '',
    });
    this.props.alertActions.removeAlert('');
  };

  handleEdit = id => {
    this.props.userActions.setUser(id);
    this.props.navigation.navigate('Edit');
  };

  handleLogout = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate('SignIn');
  };

  render() {
    const avatarImage = this.state.person.avatar
      ? {uri: this.state.person.avatar}
      : avatar;
    return (
      <>
        <ScrollView>
          <Header name="Perfil" />
          <ContainerHeader>
            <Avatar source={avatarImage} />
            <ButttonEdit onPress={() => this.handleEdit(this.state.person.id)}>
              <Icon
                name="pencil"
                size={20}
                color="#fff"
                style={{textAlign: 'center', paddingTop: 9}}
              />
            </ButttonEdit>
          </ContainerHeader>
          <Nickname>{this.state.person.nickname}</Nickname>
          <Name>{this.state.person.name}</Name>
          <Info>
            <Item>
              <TextLabel>Matricula</TextLabel>
              <TextValue>{this.state.person.matriculation}</TextValue>
            </Item>
            <Item>
              <TextLabel>Curso</TextLabel>
              <TextValue>{this.state.person.course}</TextValue>
            </Item>
            <Item>
              <TextLabel>Campus</TextLabel>
              <TextValue>{this.state.person.college}</TextValue>
            </Item>
            <Item>
              <TextLabel>Contato</TextLabel>
              <TextValue>{this.state.person.contact}</TextValue>
            </Item>
          </Info>
          <InfoTime>
            <TimeDone>
              <Bold>{this.state.person.requiredHours} horas</Bold> realizadas
            </TimeDone>
            <Line />
            <TimePending>
              <Bold>{this.state.person.totalHours} horas</Bold> necessárias
            </TimePending>
          </InfoTime>
          <ButtonLogout onPress={() => this.handleLogout()}>
            <TextLogout>
              SAIR <Icon name="sign-out" size={20} color="#b275f4" />
            </TextLogout>
          </ButtonLogout>
        </ScrollView>
        <Menu props={this.props} />
        <Alert
          show={this.state.showAlert}
          showProgress={false}
          title={this.state.titleAlert}
          message={this.state.messageAlert}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK, entendi"
          confirmButtonColor="#b275f4"
          onConfirmPressed={() => this.handleConfirmAlert()}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
    alertActions: bindActionCreators(AlertActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
